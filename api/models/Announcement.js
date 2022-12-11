/**
 * Announcement model
 */
 'use strict';

 const mongoose = require('mongoose');
 
 const announcementSchema = require('../schemas/announcementSchema');
 
 
 const Announcement = mongoose.model("Announcement", announcementSchema);
 
 
 module.exports = Announcement;
 