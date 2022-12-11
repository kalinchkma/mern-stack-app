/**
 * product model
 */
 'use strict';

 // external imports
 const mongoose = require('mongoose');
 
 
 const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    interestedList: {
        type: [String]
    },
    notInterestedList: {
        type: [String]
    },
    list: {
        type: Map,
    }
 }, {
     timestamps: true
 });
 
 
 
 module.exports = announcementSchema;
  