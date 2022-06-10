const router = require('express').Router()
const userModel = require('../models/user')

// Register
router.post('/register', async (req, res) => {
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try{
     const savedUser = await user.save()
     res.status(201).json(savedUser)
    }
    catch(e){
        res.status(500).json(e)
    }
})

module.exports = router