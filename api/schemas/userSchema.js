/**
 * User schema
 */
'use strict'

//external imports
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    userType: {
        type: String,
        enum: ['admin', 'buyer', 'seller','block'],
        default: "buyer"
    },
    transactionNumbers: {
        type: Map,
        of: String
    },
    totalBuy: {
        type: Number,
        default: 0
    },
    totalSells: {
        type: Number,
        default: 0
    },
    assignedProducts: {
        type: [String]
    },
    status: {
     type: String,
     enum: ['active', 'inactive'],
     default: "inactive"
    },
    lavel: {
        type: String,
        enum: ['0','1', '2', '3'],
        default: '0'
    }
}, {
    timestamps: true
});



module.exports = userSchema;
