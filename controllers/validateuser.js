const Joi = require('@hapi/joi')

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user)

}
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(data)

}

module.exports = {
    validateUser,
    loginValidation
}