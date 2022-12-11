/**
 * ProducList router
 */
// external imports
const express = require('express');

// internal imports
const {
    createProduct,
    deleteProductById,
    getAllProduct,
    getProductById,
    updateProductById,
    assignUserToProduct,
    removedUserToProduct
} = require("../controllers/productController");

// validator
const {
    productInfoValidator,
    productParamIdValidator,
    productUpdateInfoValidator
} = require("../middleware/product/index");

const validationErrorHandler = require('../middleware/common/validationErrorHandler');
const fileUploadValidationErrorHandler = require("../middleware/common/fileUploadValidationErrorHandler");
// product image upload middleware
const singleFileUploader = require("../middleware/common/singleFileUploader");


// login creadential check
const {
    checkLogin,
    checkAdmin
} = require('../middleware/common/checkLogin');

// initalize router
const router = express.Router();

// create product (only for admin) checkLogin, checkAdmin,
router.post("/", checkLogin, checkAdmin, productInfoValidator, validationErrorHandler, createProduct);

// update product by id (only for admin) checkLogin, checkAdmin,
router.put("/",checkLogin, checkAdmin, productUpdateInfoValidator, validationErrorHandler, updateProductById);

// delete product by id (only for admin)checkLogin, checkAdmin,
router.delete("/:id",checkLogin, checkAdmin,  productParamIdValidator, validationErrorHandler, deleteProductById);

// get all product  (for normal user)
router.get("/", getAllProduct);

// get product by id (for normal user)
router.get("/:id", productParamIdValidator, validationErrorHandler, getProductById);

// assigned product to users
router.post("/assign", checkLogin, checkAdmin, assignUserToProduct);

// assigned product to users
router.delete("/assign/remove", checkLogin, checkAdmin, removedUserToProduct);


module.exports = router;