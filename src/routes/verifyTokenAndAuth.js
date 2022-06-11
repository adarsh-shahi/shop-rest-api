const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { findOne } = require('../models/user')
const User = require('../models/user')

router.use( async (req, res, next) => {
    try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decodeDataFromToken = jwt.verify(token, process.env.JWT_KEY)
    const user = await User.findOne({_id: decodeDataFromToken._id, 'tokens.token': token, isAdmin: decodeDataFromToken.isAdmin})
   
    if(!user) res.status(404).send({error: 'please authenticate'})
    req.user = user
    req.token = token
    next()
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router