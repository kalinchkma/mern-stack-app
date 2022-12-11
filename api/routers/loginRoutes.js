/**
 * Login routes
 */

// external imports
const express = require('express');

// internal imports
const {
    loginUser,
    logoutUser,
    adminLogin,
    verifyLogin
} = require('../controllers/loginController');

// validator
const { loginInfoValidator } = require("../middleware/login/index");
const validationErrorHandler = require("../middleware/common/validationErrorHandler");

// login check middleware
const {checkLogin} = require('../middleware/common/checkLogin');


// initialize router
const router = express.Router()

// normal user login
router.post("/login", loginInfoValidator, validationErrorHandler, loginUser);

// admin user login
router.post("/admin/login", loginInfoValidator, validationErrorHandler, adminLogin);

// logout
router.delete("/logout", checkLogin, logoutUser);

// verify login
router.post("/verify", checkLogin, verifyLogin);


module.exports = router;