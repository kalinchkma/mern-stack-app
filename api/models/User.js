/**
 * User model
 */
'use strict';

// external imports
const mongoose = require('mongoose');

// internal imports
const userSchema = require('../schemas/userSchema');

const User = mongoose.model('User', userSchema);


module.exports = User;

