/**
 * user validator
 */

// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');



// check user inputs
const userNameValidator = [
    // check user name
    check('name')
    .isLength({min: 1})
    .withMessage("Name is required")
    .trim(),
];



module.exports = userNameValidator;
