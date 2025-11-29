const { checkResourceExists } = require("../helpers");
const { Subreddit, SubredditUsers } = require("../models/subredditSchema");
const grpc = require("@grpc/grpc-js");

const subredditImplementation = {
  createSubreddit: async (call, callback) => {
    const { name, description, creator_id } = call.request;

    try {
      const newSubreddit = await Subreddit.create({
        name,
        description,
        creator_id,
      });
      const response = {
        id: newSubreddit._id.toString(),
        name: newSubreddit.name,
        description: newSubreddit.description,
        creator_id: newSubreddit.creator_id,
      };
      callback(null, response);
    } catch (err) {
      console.error("Error creating subreddit:", err);
      if (err.code === 11000) {
        return callback({
          code: grpc.status.ALREADY_EXISTS,
          details: `Subreddit with name '${name}' already exists.`,
        });
      }
      if (err.name === "ValidationError") {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: err.message,
        });
      }
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while creating subreddit.",
      });
    }
  },
  getSubredditById: async (call, callback) => {
    const { id } = call.request;
    try {
      const subreddit = await checkResourceExists(Subreddit, id);

      if (!subreddit) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: `Subreddit with ID '${id}' not found.`,
        });
      }

      const response = {
        id: subreddit._id.toString(),
        name: subreddit.name,
        description: subreddit.description,
      };

      return callback(null, response);
    } catch (err) {
      console.error("Error fetching subreddit by ID:", err);

      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while fetching subreddit.",
      });
    }
  },
  updateSubreddit: async (call, callback) => {
    const { id, description, updater_id } = call.request;

    try {
      // 1. ✅ تصحيح: إضافة await
      // الدالة دي هترجع المستند لو موجود، أو هترمي خطأ لو مش موجود أو الـ ID غلط
      const subreddit = await checkResourceExists(Subreddit, id, "Subreddit");
      if (subreddit.creator_id.toString() !== updater_id) {
        console.log(
          `Unauthorized update attempt by user ${updater_id} on subreddit ${id}`
        );
        return callback({
          code: grpc.status.PERMISSION_DENIED,
          details: "Only the creator of this subreddit can update it.",
        });
      }

      const updatedSubreddit = await Subreddit.findByIdAndUpdate(
        id,
        { description },
        { new: true, runValidators: true }
      );

      const response = {
        id: updatedSubreddit._id.toString(),
        name: updatedSubreddit.name,
        description: updatedSubreddit.description,
        creator_id: updatedSubreddit.creator_id.toString(),
        subscribers_count: updatedSubreddit.subscribers_count,
      };

      return callback(null, response);
    } catch (err) {
      console.error("Error updating subreddit:", err);

      if (err.code && err.details) {
        return callback(err);
      }

      if (err.name === "ValidationError") {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: err.message,
        });
      }

      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while updating subreddit.",
      });
    }
  },
  subscribe: async (call, callback) => {
    const { user_id, subreddit_id } = call.request;

    try {
      // 1. التحقق من وجود الـ Subreddit
      await checkResourceExists(Subreddit, subreddit_id, "Subreddit");

      await SubredditUsers.create({
        subredditId: subreddit_id,
        userId: user_id,
      });

      await Subreddit.findByIdAndUpdate(subreddit_id, {
        $inc: { subscribers_count: 1 }, // زيادة الحقل بمقدار 1
      });

      // 4. الرد بالنجاح
      return callback(null, { success: true });
    } catch (err) {
      if (err.code && err.details) {
        return callback(err);
      }
      if (err.code === 11000) {
        return callback({
          code: grpc.status.ALREADY_EXISTS,
          details: "User is already subscribed to this subreddit.",
        });
      }
      console.error("Error subscribing to subreddit:", err);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while subscribing.",
      });
    }
  },
};

module.exports = subredditImplementation;
