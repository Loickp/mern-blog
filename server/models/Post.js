const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  content: {
    type: String,
    required: [true, "Please provide a content."],
    maxlength: 500,
    trim: true
  }
}, {
  timestamps: true,
})

const Post = mongoose.model('posts', PostSchema)
module.exports = Post