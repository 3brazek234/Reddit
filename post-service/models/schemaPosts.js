const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true      
  },
  content: { 
    type: String,
    required: true
  },
author: {
    type: Number,
    required: true
  },
  subreddit: { 
    type: Number,
    ref: 'Subreddit'
  },
}, {
  timestamps: true 
});

postSchema.index({ author: 1 });  
postSchema.index({ subreddit: 1 }); 

const Post = mongoose.model("Post", postSchema);
module.exports = Post;