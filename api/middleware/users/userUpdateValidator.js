/**
 * validate update info of user
 */
// external imports
const {check} = require('express-validator');
const createError = require('http-errors');

// internal imports
const User = require('../../models/User');


// validate update user info
const userUpdateValidator = [
    check('uid')
    .isString()
    .withMessage("User is not updateable")
    .trim()
    .custom( async (value) => {
        try {
            const user = await User.findOne({_id: value});
            if(user) {
                return true;
            }
            throw createError("Cannot update user system is busy!");
        } catch(err) {
            throw createError("Cannot update user system is busy!")
        }
    }),
     // check user name
     check('name')
     .isLength({min: 1})
     .withMessage("Name is required")
     .isAlpha('en-US', {ignore: " "})
     .withMessage("Name must not contain anything other than alphbet")
     .trim(),
];




module.exports = userUpdateValidator;




