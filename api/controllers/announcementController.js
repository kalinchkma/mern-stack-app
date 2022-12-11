/**
 * announcemnet controller
 */

const Announcement = require('../models/Announcement');
const { unlink } = require('fs');

// create announcement
exports.createAnnouncement = async (req, res) => {
    
    try {
        // construct announcement onject
        const obj = {};
        if(req.body.note) {
            obj.note = JSON.parse(req.body.note);
        } 
        if(req.body.link) {
            obj.link = JSON.parse(req.body.link);
        }
        // announcement object
        const announcement = {
            title: req.body.title,
            text: req.body.text,
            image: req.files.length > 0 ? process.env.STATIC_FILE_PATH + req.files[0].filename : "",
            list: obj
        }

        const newAnnouncement = new Announcement(announcement);

        const result = await newAnnouncement.save();

        // emit socket for announcement
        global.io.emit("announcement", "announcement has been given");

        return res.status(200).json({
            success: {
                msg: "announcement created successfully"
            }
        })

    } catch(err) {

        return res.status(500).json({
            errors: {
                msg: "failed to create announcement"
            }
        })
    }
}

//  update announcement
// @TODO implement it
exports.updateAnnouncement = async (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        success: {
            msg: "announcement has been updated successfully!"
        }
    })
}



// get all announcement 
exports.getAllAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find();
       
        return res.status(200).json({
            success: {
                announcements: announcements,
                msg: "announcements fetch success!"
            }
        })

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "failed to fetch announcement!"
            }
        })
    }
}

// delete announcement by id
exports.deleteById = async (req, res) => {

    try {
        const announcement = await Announcement.findByIdAndDelete({_id: req.body.id});
        
        const announcementImage = announcement.image.replace(process.env.STATIC_FILE_PATH, "");

        if(announcementImage !== "") {
            unlink(
                path.join(__dirname,`/../public/uploads/${announcementImage}`),
                (err) => {
                    if(err) console.log(err);
                }
            );
        }

        // emit socket for announcement
        global.io.emit("announcement", "announcement has been given");

        
        return res.status(200).json({
            success: {
                msg: "announcement has been deleted!"
            }
        });
    } catch(err) {
        return res.status(400).json({
            errors: {
                msg: "failed to delete announcement!"
            }
        });
    }

  
}

