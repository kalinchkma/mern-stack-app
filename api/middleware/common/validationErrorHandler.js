/**
 * Validation error handler
 */
const { validationResult } = require('express-validator');


// handler user input validate error
const validationErrorHandler = (req, res, next) => {
    const errors =validationResult(req);
    const errorMapped = errors.mapped();
    if(Object.keys(errorMapped).length === 0) {
        next();
    } else {
        // handle error
        return res.status(500).json(errorMapped);
    }

}

module.exports = validationErrorHandler;