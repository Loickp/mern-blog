const express = require('express')
const router = express.Router()

const { getPosts, addPost, getPost, editPost, deletePost } =  require('../controllers/posts')
const { protect } = require('../middleware/auth')

router.get('/', getPosts)
router.post('/add', protect, addPost)
router.get('/:id', getPost)
router.put('/:id', protect, editPost)
router.delete('/:id', deletePost)

module.exports = router