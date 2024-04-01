const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// middle ware to catch and check token in header bearer
const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify token with secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user from the token, the jwt has the id
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            // unauthorized
            res.status(401)
            throw new Error('Not auhorized')
        }


    }

    if(!token){
        // unauthorized
        res.status(401)
        throw new Error('Not auhorized')
        } 

})

module.exports = {protect}