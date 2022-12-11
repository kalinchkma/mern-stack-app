/**
 * productListInfoValidator 
 */

 const { check } = require("express-validator");


 // check product list info
 const idValidator = [
    // uid validator
    check('uid')
    .isString()
    .withMessage("Invalid id")
    .trim(),
 ]
 
 
 
 module.exports = idValidator;
 
 