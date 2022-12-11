/**
 * messenger routes
 */
const express = require('express');

// message controller
const {  sendMessage , getAllMessageByOrderId} = require('../controllers/messageController');

// middlerware imports
const singleFileUploader = require("../middleware/common/singleFileUploader");
const fileUploadValidationErrorHandler = require("../middleware/common/fileUploadValidationErrorHandler");

const messageValidator = require("../middleware/message/messageValidator");

// login creadential check
const {
    checkLogin
} = require('../middleware/common/checkLogin');


const router = express.Router();

// send message
router.post("/send",singleFileUploader, checkLogin, messageValidator, fileUploadValidationErrorHandler, sendMessage);

// fetch message by orderId
router.get("/:id", getAllMessageByOrderId);


module.exports = router;
