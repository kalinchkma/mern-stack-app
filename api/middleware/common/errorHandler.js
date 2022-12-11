/**
 * Title: error handler middlerwares
 */

// external import
const createError = require("http-errors");


// 404 error handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, "Requested content not found or content has been removed!"));
}


// default error handler
const defaultErrorHandler = (err, req, res, next) => {
    const errorMessage = process.env.NODE_ENV === "development" ? err : err.message;
    // http error code
    res.status(err.status || 500);
    res.json({
        errors: {
            errorMessage
        } 
    })
}


module.exports = {
    notFoundHandler,
    defaultErrorHandler
}