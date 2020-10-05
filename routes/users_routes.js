const express = require('express')
const bcrypt = require('bcrypt')
const userModel = require('../models/users_model')
const validateuser = require('../controllers/validateuser')

const router = express.Router()

/*
register user
login user
*/
router.post('/register', async(req, res) => {
    const { err } = validateuser(req.body)
    if (err) {
        return res.status(400).send(err.details[0].message)
    }
    // check if user exists in db
    // eslint-disable-next-line prefer-const
    let user = await userModel.findOne({ email: req.body.email })
    if (user) {
        res.status(400).send('The user already exists')
    } else {
        user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })
        await user.save()
        res.send(user)
    }
})
module.exports = router