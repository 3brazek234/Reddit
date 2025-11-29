const { subredditClient } = require("../grpcClient");

const createSubreddit = async (req, res) => {
  const { description, name } = req.body;
  try {
    const subreddit = await subredditClient.createSubreddit(name, description);
    res.status(201).json({
      success: true,
      data: subreddit,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = createSubreddit;
