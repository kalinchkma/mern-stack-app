/**
 * message validator 
 */

 const { check } = require("express-validator");


 // check product list info
 const orderValidator = [
    // seller id price
    check('senderId')
    .trim()
    .isString()
    .withMessage("Invalid seller id"),
    // buyer id price
    check('reciverId')
    .isString()
    .withMessage("Invalid buyer id"),
   
    // player id
    check('orderId')
    .trim()
    .isString()
    .withMessage("Invalid orderid id"),
   
 ];
 
 
 
 module.exports = orderValidator;
 
 