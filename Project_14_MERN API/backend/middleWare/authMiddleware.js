const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token
    //Check header for authorization object, and name is bearer
    console.log("1")
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from bearer header
            token = req.headers.authorization.split(' ')[1]
            console.log("2")

            // Verify token with the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log("3")
            console.log(decoded.id)
            // Get user from the token payload
            req.user = await User.findById(decoded.id).select('-password')
            console.log("4")

            // Continue middleware
            next()
        } catch (error) {
            console.log(error)
            // Not authorized
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}