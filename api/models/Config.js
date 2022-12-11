/**
 * Config model
 */
 'use strict';

 const mongoose = require('mongoose');
 
 const configSchema = require('../schemas/configSchema');
 
 
 const Config = mongoose.model("Config", configSchema);
 
 
 module.exports = Config;
 