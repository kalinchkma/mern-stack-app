/**
 * Title: users routes
 */

// external imports
const express = require('express');

// internal imports
const {
    getUserAll,
    getUserById,
    postSignUpUser,
    deleteUserById,
    updateUserById,
    updateUserTypeById,
    postAdminSignUpUser,
    getAllSeller,
    changeUserDisplayName,
    changePassword,
    addSellerTransactionNumber,
    setStatus
} = require("../controllers/userController");


// user input validation 
const {
    userInputsValidator,
    userUpdateValidator,
    userParamIdValidator,
    userUpdateTypeValidator,
    userNameValidator,
    userPasswordValidator,
    userTransactionNumberValidator
} = require('../middleware/users/index');

const validationErrorHandler = require('../middleware/common/validationErrorHandler');

// login creadential check
const {
    checkLogin,
    checkAdmin
} = require('../middleware/common/checkLogin');

const router = express.Router();

// creat/signup user (public)
router.post('/signup', userInputsValidator, validationErrorHandler, postSignUpUser);

// creat/signup user admin (only for admin)
router.post('/admin-signup', checkLogin, checkAdmin, userInputsValidator, validationErrorHandler, postAdminSignUpUser);

// update user by id (only for admin) checkLogin, checkAdmin,
router.put("/",  userUpdateValidator, validationErrorHandler, updateUserById);

// delete user (only for admin)  checkLogin, checkAdmin,
router.delete("/:id", checkLogin, checkAdmin, userParamIdValidator, validationErrorHandler, deleteUserById);

// get all user (for normal user)
router.get("/", getUserAll);

// get user by id (for normal user) checkLogin,
router.get('/:id', userParamIdValidator, validationErrorHandler, getUserById);

// update user type by id (only for admin) checkLogin, checkAdmin,
router.put('/:id',checkLogin, checkAdmin, userParamIdValidator, userUpdateTypeValidator, validationErrorHandler, updateUserTypeById);

// get all seller (public)
router.patch('/seller', getAllSeller);

// change user display name (for normal user)
router.post('/name',checkLogin, userNameValidator,validationErrorHandler, changeUserDisplayName);

// change user password (for normal user)
router.post('/password',  checkLogin, userPasswordValidator, validationErrorHandler, changePassword);

// add transaction number (for seller)
router.post('/transaction', checkLogin, userTransactionNumberValidator, validationErrorHandler, addSellerTransactionNumber);

// set active inactive status for seller
router.post('/status', checkLogin, setStatus);








module.exports = router;