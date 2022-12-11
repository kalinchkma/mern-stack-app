/**
 * message model
 */
 'use strict';

 // external imports
 const mongoose = require('mongoose');
 
 
 const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
     reciverId: {
         type: String,
         required: true
     },
     orderId: {
        type: String
     },
     messageImage: {
         type: String,
     },
     messageContent: {
         type: String,
     }
 }, {
     timestamps: true
 });
 
 
 
 module.exports = messageSchema;
 
 