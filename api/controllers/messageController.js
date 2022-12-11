/**
 * message controllers
 */
const Message = require('../models/Message');
const User = require("../models/User");


// send message 
exports.sendMessage = async (req, res) => {
 
    try {
           // construct new message
        const newMessage = new Message({
            senderId: String(req.body.senderId),
            reciverId: String(req.body.reciverId),
            orderId: String(req.body.orderId),
            messageContent: String(req.body.messageContent),
            messageImage: req.files.length > 0 ? process.env.STATIC_FILE_PATH + req.files[0].filename : "",
        });

        const result = await newMessage.save();
        
        global.io.emit(req.body.orderId, JSON.stringify(newMessage));
        global.io.emit(req.body.orderId, JSON.stringify(newMessage));

        return res.status(200).json({
            success: {
                msg: "message has beed send!"
            }
        });

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "message cannot send right now!"
            }
        })
    }

}


// get message by order id
exports.getAllMessageByOrderId = async (req, res, next) => {
   
    try {
        const orderId = String(req.params.id);
        
        const messages = await Message.find({orderId: orderId});
        return res.status(200).json({
            success: {
                messages: messages,
                msg: "message fetch success"
            }
        })
        
    } catch(err) {
        res.status(500).json({
            errors: {
                msg: "message fetch errors!"
            }
        })
    }
}

