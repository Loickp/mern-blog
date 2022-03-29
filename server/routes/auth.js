const express = require('express')
const router = express.Router()

const { register, login, logout, forgotPassword, resetPassword, getUser } =  require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot', forgotPassword)
router.post('/reset/:token', resetPassword)
router.get('/user', getUser)

module.exports = router