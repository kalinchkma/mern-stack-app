/**
 * Validation error handler
 */
const { validationResult } = require('express-validator');
const { unlink }  = require('fs');
const path = require('path');

// handler user input validate error
const fileUploadValidationErrorHandler = (req, res, next) => {
    const errors =validationResult(req);
    const errorMapped = errors.mapped();
    if(Object.keys(errorMapped).length === 0) {
        next();
    } else {
        // remove uploaded file since error occures
        if(req.files.length > 0) {
            const  {filename} = req.files[0];
            unlink(
                path.join(__dirname,`/../../public/uploads/${filename}`),
                (err) => {
                    if(err) console.log(err);
                }
            );
        }
        return res.status(500).json(errorMapped);
    }

}

module.exports = fileUploadValidationErrorHandler;