const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

const protect = async (req, res, next) => {
  const token = req.cookies.jwt

  if(!token){
    return next(new ErrorResponse("Vous n'êtes pas autoriser à être ici", 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if(!user){
      return next(new ErrorResponse("Utilisateur non trouvé", 404))
    }

    req.user = user

    next()
  } catch (err) {
    return next(new ErrorResponse("Vous n'êtes pas autoriser à être ici", 401))
  }
}

module.exports = {
  protect
}