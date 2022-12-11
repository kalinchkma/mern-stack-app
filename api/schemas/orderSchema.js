/**
 * message model
 */
 'use strict';

 // external imports
 const mongoose = require('mongoose');
 
 
 const orderSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: true
    },
     buyerId: {
         type: String,
         required: true
     },
     playerId: {
        type: String
     },
     orderedProduct: {
        type: [Object],
        required: true
     },
     status: {
        type: String,
        enum: ["accepted", "pending", "completed", "cancel"]
     },
     transactionLastDigit: {
        type: String
     },
     transactionMethod: {
        type: String
     },
     totalPrice: {
        type: String
     }
 }, {
     timestamps: true
 });
 
 
 
 module.exports = orderSchema;
 
 