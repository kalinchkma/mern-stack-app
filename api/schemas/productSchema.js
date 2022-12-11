/**
 * product list schema
 */
'use strict'

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "close"],
        default: "open"
    },
    category: {
        type: String,
        required: true
    },
    gener: {
        type: String,
        required: true
    },
    assignedUsers: {
        type: [String],
    },
    totalSells: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


module.exports = productSchema;
