/**
 * productListInfoValidator 
 */

 const { check } = require("express-validator");


 // check product list info
 const statusValidator = [
    // id price
    check('id')
    .isString()
    .withMessage("Invalid id")
    .trim(),
     // seller id price
     check('status')
     .isString()
     .withMessage("Invalid id")
     .trim()
 ]
 
 
 
 module.exports = statusValidator;
 
 