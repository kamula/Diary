const express = require('express')
const bcrypt = require('bcrypt')
const userModel = require('../models/users_model')

const router = express.Router()

/*
register user
login user
*/
router.post('/register', async(req, res) => {
    // const passwordHash = awaitb
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        // password: await bcrypt.hash(req.body.password, 10, (err, res))
    })

})