const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModel = require('../models/users_model');
const { validateUser, loginValidation } = require('../controllers/validateuser');

const router = express.Router();

/*
register user
login user
*/
router.post('/register', async(req, res) => {
    const { err } = validateUser(req.body);
    if (err) {
        return res.status(400).send(err.details[0].message);
    }
    // check if user exists in db
    // eslint-disable-next-line prefer-const
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
        res.status(400).send('The user already exists');
    } else {
        user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        });
        await user.save();
        res.send(user);
    }
});
//login
router.post('/login', async(req, res) => {
    const { err } = loginValidation(req.body);
    if (err) return res.status(400).send(err.details[0]);
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('user not found');


    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) return res.status(400).send('user not found');
    const token = await jwt.sign({ name: userModel.username }, process.env.SECRET)
    res.header("auth-token").send(token);

});
module.exports = router;