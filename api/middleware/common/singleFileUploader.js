/**
 * Product file uploader 
 */

const uploader = require("../../utilities/singleFileUpload");

function singleFileUploader(req, res, next) {
   
    const upload = uploader(
        '',
        ['image/jpeg', 'image/jpg', 'image/png'],
        1000000,
        "Only .jpg .jpeg or .png format allowed!"
    );
    // call middleware function
    upload.any()(req, res, (err) => {
        if(err) {
            res.status(500).json({
                errors: {
                    image: {
                        msg: "Error cannot upload file"
                    }
                }
            })
        } else {
            next();
        }
    });

}

module.exports = singleFileUploader;
