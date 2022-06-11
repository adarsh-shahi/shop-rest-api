// const express = require('express')
// const router = express.Router()

const router = require('express').Router()
const verifyTokenAndAuth = require('./verifyTokenAndAuth')


router.patch('/', verifyTokenAndAuth, async (req, res) => {
    const allowed = ['username', 'email', 'password']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => {
        return allowed.includes(update)
    })

    if(!isValid) res.status(404).send({error: 'invalid updates'})

    try{
        const user = req.user

        updates.forEach(update => {
            user[update] = req.body[update]
        })

        await user.save()
        res.send(user)
    }
    catch(e) {
        res.status(500).send()
    }


})

module.exports = router