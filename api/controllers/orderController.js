/**
 * order controller
 */

const Order = require("../models/Order");
const User = require("../models/User");


// send order
exports.sendOrder = async (req, res) => {
    try {
        const newOrderObject = {
            sellerId: req.body.sellerId,
            buyerId: req.body.buyerId,
            playerId: req.body.playerId,
            orderedProduct: req.body.orderedProduct,
            transactionLastDigit: req.body.transactionLastDigit,
            transactionMethod: req.body.transactionMethod,
            totalPrice: req.body.totalPrice,
            status: "pending"
        };
        const newOrder = new Order(newOrderObject);
        await newOrder.save();

        // ack user to change there data
        global.io.emit(req.body.sellerId, "order");
        global.io.emit(req.body.buyerId, "order");

      

        return res.status(200).json({
            success: {
                id: newOrder._id,
                msg: "Order sent successfully!"
            }
        })
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "Internal server error"
            }
        })
    }
}


// get order by id
exports.getOrder = async (req, res) => {
    try {
        const id = String(req.params.id);
        const user = await User.findById({_id: id}).exec();
        if(user.userType === "seller" || user.userType === "admin") {
            const order = await Order.find({sellerId: id}).exec();
            return res.status(200).json({
                success: {
                    orders: order,
                    msg: "Order fetch succesfull"
                }
            })
        } else if(user.userType === "buyer") {
            const order = await Order.find({buyerId: id}).exec();
            return res.status(200).json({
                success: {
                    orders: order,
                    msg: "Order fetch succesfull"
                }
            })
        } else {
            return res.status(400).json({
                errors: {
                    msg: "Something went wrong"
                }
            })
        }
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "internal server errors!"
            }
        })
    }
}


// update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate({_id: req.body.id}, {
            status: req.body.status
        });

        // ack user to update there data
        global.io.emit(req.body.id, "updated");

        return res.status(200).json({
            success: {
                msg: "order status updated"
            }
        })
        

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "internal server errors!"
            }
        })
    }
}

// get order by id
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById({_id: req.params.id}).exec();
        
        if(order) {

            return res.status(200).json({
                success: {
                    order: order,
                    msg: "Order fetch success"
                }
            })
        } else {
            return res.status(400).json({
                errors: {
                    msg: "order not found"
                }
            })
        }

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "internal server errors!"
            }
        })
    }
}
