// external imports

const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

function uploader(subfolder_path, allowed_file_types, max_file_size, error_msg) {
    // File upload folder
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    // define file storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            // create unique file name for each file
            const filename = file.originalname
                                .replace(fileExt, "")
                                .replace("(", "")
                                .replace(")", "")
                                .toLowerCase()
                                .split(" ")
                                .join("-") + "-" + Date.now();
            cb(null,filename + fileExt);
        }
    });

    // create final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fieldSize: max_file_size
        },
        fileFilter: (req, file, cb) => {
            if(allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_msg));
            }
        }
    });

    

    return upload;
    
    
}



module.exports = uploader;






