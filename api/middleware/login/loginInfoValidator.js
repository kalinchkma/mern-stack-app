/**
 * Login info validator
 */

const {check} = require("express-validator");


// check user cridential

const loginInfoValidator = [
    // username validator
    check('username')
    .isString()
    .withMessage("Login failed invalid user!")
    .isLength({max: 50})
    .withMessage("Login failed invalid user!")
    .escape().trim(),
    // check passwrod
    check('password')
    .isString()
    .withMessage("Login failed invalid user!")
    .escape().trim()
]

module.exports = loginInfoValidator;
