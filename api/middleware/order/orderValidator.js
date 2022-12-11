/**
 * productListInfoValidator 
 */

 const { check } = require("express-validator");


 // check product list info
 const orderValidator = [
    // seller id price
    check('sellerId')
    .trim()
    .isString()
    .withMessage("Invalid seller id"),

    // buyer id price
    check('buyerId')
    .trim()
    .isString()
    .withMessage("Invalid buyer id"),
    // player id
    check('playerId')
    .trim()
    .isString()
    .withMessage("Invalid player id"),
    // transactionLastDigit
    check('transactionLastDigit')
    .trim(),
    // transactionMethod
    check('transactionMethod')
    .trim(),
    // transactionMethod
    check('totalPrice')
    .trim(),
 ];
 
 
 
 module.exports = orderValidator;
 
 