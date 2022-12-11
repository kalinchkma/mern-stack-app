/**
 * Validate product info
 */


const { check } = require('express-validator');


// check product info

const gameInfoValidator = [
  
    // validate title
    check('name')
    .isString()
    .withMessage("Game Title must be a string").trim().escape(),

    // validate categoru
    check('gener')
    .isString()
    .withMessage("Game category must be a string").trim().escape(),

    // validate description
    check('description')
    .isString()
    .withMessage("Game Description must be a string"),
    
    // check video link
    check('videoLink')
    .isURL()
    .withMessage("Invalid video link")
];


module.exports = gameInfoValidator;



