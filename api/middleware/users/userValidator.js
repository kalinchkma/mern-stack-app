/**
 * user validator
 */

// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

// internal imports
const User = require('../../models/User');

// check user inputs
const userInputsValidator = [
    // check user name
    check('name')
    .isLength({min: 1})
    .withMessage("Name is required")
    .trim(),
    // validate username
    check('username')
    .isLength({min: 1})
    .withMessage("username is required")
    .isLength({max: 50})
    .withMessage("Username is too long!")
    .trim()
    .custom(async (value) => {
        try {
            const user = await User.findOne({username: value});
            if(user) {
                throw createError("Username already in use!");
            } else {
                return true;
            }

        } catch(err) {
            throw createError(err.message);
        }
    }),
   
    // validate email
    check('email')
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
        try {
            const user = await User.findOne({email: value});
            if(user) {
                throw createError("Email already in use!");
            } else {
                return true;
            }
        } catch(err) {
            throw createError(err.message);
        }
    }),
    // validate password
    check('password')
    .isStrongPassword()
    .withMessage("Password must be at least 8 character long & should contain at least 1 lowercase, 1 uppercase, 1 number & Symbol")
    .trim(),
      // validate mobile number
    check('phone')
    .isMobilePhone('bn-BD', {
          strictMode: true
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .trim()
    .custom(async (value) => {
        try {
            const user = await User.findOne({phone: String(value).replace("+88", "")});
            if(user) {
                throw createError("Phone number already in use!");
            } else {
                return true;
            }
        } catch(err) {
            throw createError(err.message);
        }
    })

];



module.exports = userInputsValidator;
