/**
 * productParamIdValidator
 */
// external imports
const { param } = require('express-validator');
const createError = require('http-errors');

// internal imports
const Product = require('../../models/Product');

// validate user params id
const productParamIdValidator = [
    param('id')
    .isString()
    .withMessage("productList Id must be a string")
    .escape()
    .custom( async (value) => {
        try {
            const product = await Product.findById({_id: value});
            if(product) {
                return true;
            }
            throw createError("System busy cannot perform the operations");
        } catch(err) {
            throw  createError('System busy cannot perform the operations!');
        }
    })
]

module.exports = productParamIdValidator;

