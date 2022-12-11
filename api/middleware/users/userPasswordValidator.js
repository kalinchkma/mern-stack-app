/**
 * user validator
 */

// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');


// check user inputs
const userPasswordValidator = [
    // check user name
    check('oldPassword')
    .isLength({min: 1})
    .withMessage("Old password is required")
    .trim(),
    check('newPassword')
    .isLength({min: 1})
    .withMessage("New password is required")
    .isStrongPassword()
    .withMessage("Password must be at least 8 character long & should contain at least 1 lowercase, 1 uppercase, 1 number & Symbol")
    .trim(),
];



module.exports = userPasswordValidator;
