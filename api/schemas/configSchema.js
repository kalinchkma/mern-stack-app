/**
 * product model
 */
 'use strict';

 // external imports
 const mongoose = require('mongoose');
 
 
 const configSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    obj: {
         type: String,
         required: true
    }
 }, {
     timestamps: true
 });
 
 
 
 module.exports = configSchema;
  