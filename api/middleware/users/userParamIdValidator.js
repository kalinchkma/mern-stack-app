/**
 * User delete id validator
 */
// external imports
const { param } = require('express-validator');
const createError = require('http-errors');

// internal imports
const User = require('../../models/User');

// validate user params id
const userParamIdValidator = [
    param('id')
    .isString()
    .withMessage("User Id must be a string")
    .escape()
    .custom( async (value) => {
        try {
            const user = await User.findById({_id: value});
            if(user) {
                return true;
            }
            throw createError("System busy!");
        } catch(err) {
            throw  createError('System busy!');
        }
    })
]

module.exports = userParamIdValidator



