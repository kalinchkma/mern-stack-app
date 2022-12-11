/**
 * user update type validator
 */
// external imports
const {check} = require('express-validator');
const createError = require('http-errors');


// check update type 
const userUpdateTypeValidator = [
    check('userType')
    .isString()
    .withMessage('User type should be string')
    .escape()
    .custom((value) => {
        const typeList = ['admin', 'buyer', 'seller', 'block'];
        if(typeList.includes(value)) {
            return true
        }
        throw createError("Invaild user type");
    })
];


module.exports = userUpdateTypeValidator;

