const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    Date: {
        type: Date,
        Default: Date.now()
    }
})

module.exports = mongoose.model('users', UserSchema)