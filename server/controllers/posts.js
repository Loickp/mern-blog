const Post = require('../models/Post')
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId
const ErrorResponse = require('../utils/errorResponse')

const getPosts = async(req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt').populate({ path: "user" })
    res.send(posts)
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
}

const addPost = async(req, res) => {
  const user = toId(req.body.user_id)
  const title = req.body.title
  const content = req.body.content

  const post = new Post({user, title, content})

  try {
    await post.save()

    res.status(200).json({
      succes: true
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
}

const getPost = async(req, res) => {
  const id = req.params.id

  try{
    const post = await Post.findById(id).populate({ path: "user" })
    res.send(post);
  } catch(err){
    res.status(404).json({ 
      message: err.message 
    })
  }
}

const editPost = async(req, res) => {
  const id = toId(req.params.id)
  const user_id = req.body.user_id

  const title = req.body.title
  const content = req.body.content

  try {
    const post = await Post.findById(id)

    if(String(post.user) == String(user_id)){
      try{
        await Post.updateOne({_id: id}, {title, content})
    
        res.status(200).json({
          succes: true,
          title,
          content
        })
      } catch (err){
        res.status(409).json(
          { message: err.message}
        );
      }
    } else{
      return next(new ErrorResponse("Vous n'êtes pas autoriser à supprimer ceci", 401))
    }
  } catch (err) {
    res.status(409).json(
      { message: err.message}
    );
  }
}

const deletePost = async(req, res) => {
  const id = req.params.id

  try{
    await Post.deleteOne({_id: id})

    res.status(200).json({
      succes: true
    })
  } catch (err){
    res.status(409).json(
      { message: err.message}
    );
  }
}

module.exports = {
  getPosts,
  addPost,
  getPost,
  editPost,
  deletePost
}