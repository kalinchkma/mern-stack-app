/**
 * user validator
 */

// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');



// check user inputs
const userNameValidator = [
    // check user name
    check('type')
    .isLength({min: 1})
    .withMessage("transaction number error")
    .trim().custom((value) => {
        if(value === "nogod" || value === "bkash") {
            return true
        } else {
            throw createError("Invalid transaction number");
        }
    }),
    check('number')
    .isMobilePhone('bn-BD', {
        strictMode: true
    })
    .withMessage("Invalid transaction number")
    .trim()

];



module.exports = userNameValidator;
