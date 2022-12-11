/**
 * productListUpdateInfoValidator
 */
 "use strict";

const createError = require('http-errors');

const {check} = require('express-validator');


// internal import
const Product = require("../../models/Product");


// check update info
const productUpdateInfoValidator = [
    check('id')
    .isString()
    .withMessage("Product id must be a string")
    .escape()
    .custom(async (value) => {
        try {
            const product = await Product.findById({_id: value});
            if(product){
                return true;
            }
            throw createError("System busy cannot perform operation");
        } catch(err) {
            throw createError("System busy cannot perform operation!");
        }
    }),
    // validate title
    check('title')
    .isString()
    .withMessage("Title must be a string")
    .isLength({max: 100, min: 1})
    .withMessage("Product Title too long").trim(),
    // validate price
    check('price')
    .isString()
    .withMessage("Price Invalid")
    .isLength({min: 1, max: 100})
    .withMessage("Invalid price").trim(),
    // category
    check('category')
    .isString()
    .withMessage("Category must be a string")
    .isLength({min: 1, max: 100})
    .withMessage("Category must be at most 100 characters").trim(),

    
]


module.exports = productUpdateInfoValidator;
