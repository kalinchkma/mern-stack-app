/**
 * Announcement router
 */

// external imports
const express = require('express');

// controllers
const { 
    createAnnouncement,
    getAllAnnouncement,
    updateAnnouncement,
    deleteById
} = require("../controllers/announcementController");

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

// public 
router.get("/", getAllAnnouncement);

// create announcement
router.post('/', singleFileUploader, checkLogin, checkAdmin, fileUploadValidationErrorHandler, createAnnouncement);

// update announcement
router.put('/', singleFileUploader, checkLogin, checkAdmin, fileUploadValidationErrorHandler, updateAnnouncement);

// delete announcement
router.delete('/', checkLogin, checkAdmin, deleteById);


module.exports = router;