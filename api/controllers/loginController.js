/**
 * Login controller
 */
// external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal imports
const User = require("../models/User");


// process login
exports.loginUser = async (req, res, next) => {
    try {
        // find user with email/username
        const user = await User.findOne({
            $or: [{email: req.body.username}, {phone: req.body.username}, {username: req.body.username}]
        }).exec();
       
        if(user && user._id) {
            if(user.userType === "block") {
                return res.status(405).json({
                    errors: {
                        msg:  "You have been blocked! by Gontop"
                    }
                })
            } else {
                
                const validatePassword = await bcrypt.compare(req.body.password, user.password);
                
                if(validatePassword) {
                    // create user object
                    const userObject = {
                        uid: user.id,
                        name: user.name,
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        userType: user.userType,
                        avatar: user.avatar ? user.avatar : "",
                        transactionNumbers: user.transactionNumbers,
                        totalBuy: user.totalBuy,
                        totalSells: user.totalSells,
                        status: user.status
                    }
    
                    // generate login token
                    const token = jwt.sign(userObject, process.env.AUTH_SECRET, {
                        expiresIn: "1000d"
                    });
    
                    // user object
                    userObject.token = token
                    
                    // return auth token
                    return res.status(200).json({
                        success: {
                            auth_user: userObject,
                            msg: "User Login successfully"
                        }
                    });
    
                } else {
                    return res.status(400).json({
                        errors: {
                            msg: "Login failed, Invaid user!"
                        } 
                    });
                }
            }
        } else {
            return res.status(400).json({
                errors: {
                    msg:  "Login failed, Invaid user!"
                }
            })
        }

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        });
    }
}

// process login
exports.adminLogin = async (req, res, next) => {
    try {
        // find user with email/username
        const user = await User.findOne({
            $or: [{email: req.body.username}, {phone: req.body.username}, {username: req.body.username}]
        }).exec();
       
        if(user && user.userType === "admin") {
            const validatePassword = await bcrypt.compare(req.body.password, user.password);
            
            if(validatePassword) {
                // create user object
                const userObject = {
                    uid: user.id,
                    name: user.name,
                    username: user.username,
                    phone: user.phone,
                    email: user.email,
                    userType: user.userType,
                    avatar: user.avatar ? user.avatar : "",
                    transactionNumbers: user.transactionNumbers,
                    totalBuy: user.totalBuy,
                    totalSells: user.totalSells,
                    status: user.status
                }

                // generate login token
                const token = jwt.sign(userObject, process.env.AUTH_SECRET, {
                    expiresIn: "1000d"
                });

                // user object
                userObject.token = token
                
                // return auth token
                return res.status(200).json({
                    success: {
                        auth_user: userObject,
                        msg: "User Login successfully"
                    }
                });

            } else {
                return res.status(400).json({
                    errors: {
                        msg: "Login failed, Invaid user!"
                    } 
                });
            }
        } else {
            return res.status(400).json({
                errors: {
                    msg:  "Login failed, Invaid user!"
                }
            })
        }

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        });
    }
}


// process login
exports.verifyLogin = async (req, res, next) => {
    try {
        // find user with email/username
        const user = await User.findOne({
            $or: [{email: req.body.auth.email}, {phone: req.body.auth.phone}, {username: req.body.auth.username}]
        }).exec();
       
        if(user && user._id) {
            if(user.userType === "block") {
                return res.status(405).json({
                    errors: {
                        msg:  "You have been blocked! by Gontop"
                    }
                })
            } else {
            
                // create user object
                const userObject = {
                    uid: user.id,
                    name: user.name,
                    username: user.username,
                    phone: user.phone,
                    email: user.email,
                    userType: user.userType,
                    avatar: user.avatar ? user.avatar : "",
                    transactionNumbers: user.transactionNumbers,
                    totalBuy: user.totalBuy,
                    totalSells: user.totalSells,
                    status: user.status
                }

                // generate login token
                const token = jwt.sign(userObject, process.env.AUTH_SECRET, {
                    expiresIn: "1000d"
                });

                // user object
                userObject.token = token
                
                // return auth token
                return res.status(200).json({
                    success: {
                        auth_user: userObject,
                        msg: "User is ok"
                    }
                });
    
               
            }
        } else {
            return res.status(400).json({
                errors: {
                    msg:  "Server error!"
                }
            })
        }

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        });
    }
}


// process logout
exports.logoutUser = (req, res, next) => {
    res.clearCookie(process.env.AUTH_COOKIE);
    return res.status(200).json({
        message: "User logout successfully"
    });
}


