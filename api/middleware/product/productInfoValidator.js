/**
 * productListInfoValidator 
 */

const { check } = require("express-validator");


// check product list info
const productInfoValidator = [
    // validate title
    check('title')
    .isString()
    .withMessage("Title must be a string")
    .isLength({max: 100, min: 1})
    .withMessage("Product Title is too long").trim(),
    // validate price
    check('price')
    .isLength({min: 1, max: 100})
    .withMessage("Price Must be provided!")
    .isString()
    .withMessage("Price Invalid")
    .trim(),
    // category
    check('category')
    .isLength({min: 1, max: 100})
    .withMessage("Category must be at most 100 characters")
    .isString()
    .withMessage("Category must be a string")
    .trim(),
     // gener
     check('gener')
     .isLength({min: 1, max: 100})
     .withMessage("Genter must be a string")
     .isString()
     .withMessage("Gener must be a string")
     .trim(),

     
];



module.exports =productInfoValidator;






