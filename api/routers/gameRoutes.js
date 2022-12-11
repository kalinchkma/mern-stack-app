/**
 * Title: users routes
 */

// external imports
const express = require('express');

// internal imports
const {
    createGame,
    deleteGameById,
    getAllGame,
    getGameById,
    updateGameById
} = require('../controllers/gameController');

// validator imports
const {
    gameInfoValidator,
    gameUpdateInfoVaildator,
    gameParamIdValidor
}  = require('../middleware/game/index');

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


// create game (only for admin) checkLogin, checkAdmin,
router.post("/",singleFileUploader, checkLogin, checkAdmin,  gameInfoValidator, fileUploadValidationErrorHandler, createGame);

// update game by id (only for admin)checkLogin, checkAdmin,
router.put("/", singleFileUploader,checkLogin, checkAdmin, gameUpdateInfoVaildator, validationErrorHandler, updateGameById);

// delele game by id (only for admin)checkLogin, checkAdmin,
router.delete("/:id", checkLogin, checkAdmin,  gameParamIdValidor, validationErrorHandler, deleteGameById);

// get all game (public routes)
router.get("/", getAllGame);

// get game by Id (public routes)
router.get("/:id", gameParamIdValidor, validationErrorHandler, getGameById);



module.exports = router;