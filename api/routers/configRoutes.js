/**
 * Config router
 */
// external imports
const express = require('express');

// config controller
const {
    getConfig,
    deleteConfig,
    postConfig,
    updateConfig,
    imageUpload,
    imageDelete
} = require("../controllers/configController");

// validation error handlers
const validationErrorHandler = require('../middleware/common/validationErrorHandler');
const fileUploadValidationErrorHandler = require("../middleware/common/fileUploadValidationErrorHandler");

// product image upload middleware
const singleFileUploader = require("../middleware/common/singleFileUploader");

// login creadential check
const {
    checkLogin,
    checkAdmin
} = require('../middleware/common/checkLogin');


// router creation
const router = express.Router();

// get all configuration
router.get("/", getConfig);

// set configuration
router.post("/",checkLogin, checkAdmin, postConfig);

// delete config
router.delete("/",checkLogin, checkAdmin, deleteConfig);

// update config
router.put("/",checkLogin, checkAdmin, updateConfig);

// set banner image
router.post("/image",singleFileUploader,checkLogin, checkAdmin,fileUploadValidationErrorHandler,imageUpload);

// set banner image
router.delete("/image",checkLogin, checkAdmin,imageDelete);


module.exports = router;