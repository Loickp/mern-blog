const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60*1000

const register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({
      username, email, password
    })

    const token = user.getSignedToken()
    res.cookie('jwt', token, { httpOnly: true, maxAge })

    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  
  if(!email || !password){
    return next(new ErrorResponse("Merci de renseigner une adresse mail et un mot de passe", 400))
  }

  try {
    const user = await User.findOne({
      email
    }).select("+password")

    if(!user){
      return next(new ErrorResponse("Email ou mot de passe invalide", 404))
    }

    const isMatch = await user.matchPasswords(password)

    if(!isMatch){
      return next(new ErrorResponse("Mauvais mot de passe", 401))
    }

    const token = user.getSignedToken()
    res.cookie('jwt', token, { httpOnly: true, maxAge })

    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
}

const logout = (req, res) => {
  res.clearCookie("jwt")
  res.status(200).json({
    success: true
  })
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({email})

    if(!user){
      return next(new ErrorResponse("L'email ne peut pas être envoyer", 404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `http://localhost:3000/reset/${resetToken}`

    const message = `
      <h1>You have requested a passsword reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Réinitialisation du mot de passe",
        text: message
      })

      res.status(200).json({
        success: true,
        data: "Email sent"
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      return next(new ErrorResponse("L'email n'a pas pu être envoyé", 500))
    }
  } catch (err) {
    next(err)
  }
}

const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now()
      }
    })

    if(!user){
      return next(new ErrorResponse("Token invalide", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      data: "Mot de passe réinitialiser"
    })
  } catch (err) {
    next(err)
  }
}

const getUser = async (req, res, next) => {
  const token = req.cookies.jwt

  if(!token){
    res.status(200).json({
      status: "no token",
      user: null
    })
  } else{
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
  
      if(!user){
        return next(new ErrorResponse("Utilisateur non trouvé", 404))
      }
  
      res.status(200).json({
        status: "success",
        user
      })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser
}