/**
 * check login
 */

const jwt = require('jsonwebtoken');
const User = require('../../models/User');


const checkLogin = async (req, res, next) => {
    const body = req.body;
   
    if(body) {
        try {
            const token = body.token;
            // decode cookie
            const decodeUser = jwt.verify(token, process.env.AUTH_SECRET);
            
            // login user
            req.user = decodeUser;
           
            return next();

        } catch(err) {
            return res.status(400).json({
                errors: {
                    msg: "Autentication failed!"
                } 
            });
        }
    } 
    else {
        return res.status(500).json({
            errors: {
                msg: "Autentication failed!"
            }
        });
    } 
}

const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.uid});
      
        if(user.userType === "admin") {
            return next();
        }else {
            return res.status(500).json({
                errors: {
                    msg: "Restricted User!"
                } 
            });
        }
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "Restricted User!"
            } 
        })
    }
}

// check seller
const checkSeller = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.uid});
        
        if(user.userType === "admin" || user.userType === "seller") {
            return next();
        }else {
            return res.status(500).json({
                errors: {
                    msg: "Restricted User!"
                } 
            });
        }
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "Restricted User!"
            } 
        })
    }
}



module.exports = {
    checkLogin,
    checkAdmin,
    checkSeller
}