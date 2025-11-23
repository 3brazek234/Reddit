const postRepository = require("../repositories/postRepository");

const postServices = {
  createPost: async (call, callback) => {
    const { title, authorId, subreddit_id, description } = call.request;
    if (!title || !authorId || !subreddit_id) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Missing required fields (title, authorId, subreddit_id).",
      });
    }

    try {
      const newPost = await postRepository.create(
        title,
        authorId,
        subreddit_id,
        description
      );

      return callback(null, { post: newPost });
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.code === "23503") {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Author or Subreddit does not exist.",
        });
      }
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while creating post.",
      });
    }
  },

  getPost: async (call, callback) => {
    const { id } = call.request;

    try {
      const post = await postRepository.findByIdWithDetails(id);
      if (post) {
        const postResponse = {
          id: post.id,
          title: post.title,
          author_name: post.author_name,
          subreddit_name: post.subreddit_name,
          description: post.description,
          likes: post.likes,
        };

        callback(null, { post: postResponse });
      } else {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: `Post with ID ${id} not found.`,
        });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while fetching post.",
      });
    }
  },

  updatePost: async (call, callback) => {
    const { id, title, description, user_id } = call.request;
    if (!id) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Post ID is required for update.",
      });
    }
    try {
      const existingPost = await postRepository.findByIdWithDetails(id);
      if (!existingPost) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: `Post with ID ${id} not found.`,
        });
      }
      if (existingPost.author !== user_id) {
        return callback({
          code: grpc.status.UNAUTHORIZED,
          details: "لا تملك الصلاحيه لابرام هذا الاجراء",
        });
      }
      const updatedTitle = title || existingPost.title;
      const updatedDescription = description || existingPost.description;
      const updatedPost = await postRepository.update(
        id,
        updatedTitle,
        updatedDescription
      );
      return callback(null, { post: updatedPost });
    } catch (error) {
      console.error("Error updating post:", error);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error while updating post.",
      });
    }
  },
};
module.exports = postServices;
