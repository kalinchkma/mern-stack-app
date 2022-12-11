/**
 * product model
 */
'use strict';

// external imports
const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gener: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    videoLink: {
        type: String
    },
    description: {
        type:[String],
        required: true
    }
}, {
    timestamps: true
});



module.exports = gameSchema;

