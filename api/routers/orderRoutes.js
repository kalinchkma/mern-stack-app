/**
 * messenger routes
 */
const express = require('express');

// order controller
const { updateOrderStatus, getOrder, sendOrder, getOrderById } = require('../controllers/orderController');


const validationErrorHandler = require('../middleware/common/validationErrorHandler');

const orderValidator = require("../middleware/order/orderValidator");
const statusValidator = require("../middleware/order/statusValidator");
const idValidator = require("../middleware/order/idValidator");

// login creadential check
const {
    checkLogin,
    checkSeller
} = require('../middleware/common/checkLogin');


const router = express.Router();

// send order 
router.post('/', checkLogin, orderValidator,validationErrorHandler, sendOrder);

// get order by seller id and buyer id
router.get('/:id', getOrder);

// set order status by seller
router.put('/',checkLogin,checkSeller,statusValidator,validationErrorHandler, updateOrderStatus);

router.get('/find/:id', getOrderById);



module.exports = router;
