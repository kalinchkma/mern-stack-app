/**
 * config controller
 */
const Config = require("../models/Config");
const {unlink} = require('fs');
const path = require('path');


// get all config
exports.getConfig = async (req, res, next) => {
    try {

        const configs = await Config.find();

        return res.status(200).json({
            success: {
                config: configs,
                msg: "config fetch successful"
            }
        })

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "failed to fetch configuration!"
            }
        });
    }
}


// post config
exports.postConfig = async (req, res) => {
 
    try {
        const findConfig = await Config.findOne({name: req.body.name});
        if(findConfig) {
            // update config
            await Config.findOneAndUpdate({name: req.body.name}, {
                obj: req.body.obj
            });
            return res.status(200).json({
                success: {
                    msg: "config updated successfully"
                }
            })
        } else {
            // construct new config
            const configObj = {
                name: req.body.name,
                obj: req.body.obj
            }
            const newConfig = new Config(configObj);
            const result = await newConfig.save();
            return res.status(200).json({
                success: {
                    msg: "config posted successfully"
                }
            })
        }
       
       
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "error posting config"
            }
        })
    }
   
}

// delete config 
exports.deleteConfig = async (req, res) => {
    try {
        await Config.findOneAndDelete({name: req.body.name});

        return res.status(200).json({
            success: {
                msg: "successfully deleted socail link"
            }
        })

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "Internal server errors!"
            }
        })
    }
}

// update config
exports.updateConfig = async (req, res) => {
    
}

// imagte upload
exports.imageUpload = async (req, res) => {
    try {
        if(req.files.length > 0) {
            const findConfig = await Config.findOne({name: req.body.name});
            if(findConfig) {
                const images = JSON.parse(findConfig.obj);
                images.push(process.env.STATIC_FILE_PATH + req.files[0].filename);
                await Config.findOneAndUpdate({name: req.body.name}, {
                    obj: JSON.stringify(images)
                });
                return res.status(200).json({
                    success: {
                        msg: "image uploaded successfully!"
                    }
                })
            } else {
                const images = [];
                images.push(process.env.STATIC_FILE_PATH + req.files[0].filename);
                
                const imagesObject = {
                    name: req.body.name,
                    obj: JSON.stringify(images)
                }
                const newImages = new Config(imagesObject);
                await newImages.save();
                return res.status(200).json({
                    success: {
                        msg: "image uploaded successfully!"
                    }
                })
            }
        } else {
            return res.status(404).json({
                errors: {
                    msg: "failed to upload image!"
                }
            })
        }
       
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "failed to upload image!"
            }
        })
    }
}

// image delete
exports.imageDelete = async (req, res) => {
    try {
        const findConfig = await Config.findOne({name: req.body.name});

        if(findConfig) {
            const newImageObject = [];
            // construct new array elements of images
            JSON.parse(findConfig.obj).forEach(image => {
                if(image !== req.body.obj) {
                    newImageObject.push(image);
                }
            });

            await Config.findOneAndUpdate({name: req.body.name}, {
                obj: JSON.stringify(newImageObject)
            });

            const deletingImage = req.body.obj.replace(process.env.STATIC_FILE_PATH, "");
    
            if(deletingImage !== "none") {
                unlink(
                    path.join(__dirname,`/../public/uploads/${deletingImage}`),
                    (err) => {
                        if(err) console.log(err);
                    }
                );
            }

            return res.status(200).json({
                success: {
                    msg: "image deleted successfully!"
                }
            })
        } else {
            return res.status(500).json({
                errors: {
                    msg: "failed to delete image"
                }
            })
        }

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "Internal server errors!"
            }
        })
    }
}

