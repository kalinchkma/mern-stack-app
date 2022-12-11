/**
 * Title: user controller
 */
// external imports
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


// internal imports
const User = require('../models/User');



// signup user
exports.postSignUpUser = async (req, res, next) => {
   
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
 
        const newUserObject = {
             name: req.body.name,
             username: req.body.username,
             userType: "buyer",
             email: req.body.email,
             password: hashedPassword,
             phone: req.body.phone.replace("+88",""),
             transactionNumbers: {},
             status: "inactive"
        };
        const newUser = new User(newUserObject);
        const result = await newUser.save();
        return res.status(200).json({
            success: {
                user: result,
                msg: "User Created successfully"
            }
        });
    } catch(err) {
         res.status(500).json({
            errors:{
                msg: err.message
            } 
         });
    }
 
 }

 // admin signup user controller
exports.postAdminSignUpUser = async (req, res, next) => {
   
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
 
        const newUserObject = {
             name: req.body.name,
             username: req.body.username,
             userType: req.body.userType,
             email: req.body.email,
             password: hashedPassword,
             phone: req.body.phone.replace("+88",""),
             transactionNumbers: {},
             status: "inactive"
        };
        const newUser = new User(newUserObject);
        const result = await newUser.save();
        return res.status(200).json({
            success: {
                user: result,
                msg: "User Created successfully"
            }
        });
    } catch(err) {
         res.status(500).json({
            errors:{
                msg: err.message
            } 
         });
    }
 
 }
 

// update user by id
exports.updateUserById = async (req, res, next) => {
    try {
        // update user
        await User.findByIdAndUpdate({_id: req.body.uid},{
            name: req.body.name,
        });
        const updatedUser = await User.findById({_id: req.body.uid});
        return res.status(200).json({
            success: {
                user: updatedUser,
                msg: "user updated successfully"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            }
        });
    }

}

// delete user by id
exports.deleteUserById = async (req, res, next) => {
    try {
        const uid = req.params.id
        await User.findByIdAndDelete({_id: uid});
        return res.status(200).json({
            success: {
                msg: "Users Deleted sussefully"
            } 
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            }
        });
    }
    
}

// get all user
exports.getUserAll = async (req, res, next) => {
    try {
        const users = await User.find().select({
            password: 0
        });
        return res.status(200).json({
            success: {
                users: users,
                msg: "Users fetch successfull"
            }
        });
     
    } catch(err) {
        return res.status(400).json({
            errors: {
                msg:  err.message
            }
        });
    }

}

// get user by id
exports.getUserById = async (req, res, next) => {
    try {
        const uid = req.params.id;
        const user = await User.findById({_id: uid}).select({
            password: 0
        });
        return res.status(200).json({
            success: {
                user: user,
                msg: "User fetch successfull"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            }
        });
    }

}


// update user type
exports.updateUserTypeById = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate({_id: req.params.id}, {
            userType: req.body.userType
        });
        
        return res.status(200).json({
            success: {
                msg: "User updated successfully"
            }
        });
    } catch (err) {
        return res.status(200).json({
            errors: {
                msg: err.message
            }
        });
    }
    
}


// get all seller
exports.getAllSeller = async (req, res) => {
    try {
        const users = await User.find({
            $and: [{
                $or: [{userType: "seller"}, {userType: "admin"}]
            }, {status: "active"}]
        }).select({
            password: 0
        });
        return res.status(200).json({
            success: {
                users: users,
                msg: "Seller fetch successfull"
            }
        });
     
    } catch(err) {
        return res.status(400).json({
            errors: {
                msg:  err.message
            }
        });
    }
}


// update user display name by id
exports.changeUserDisplayName = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate({_id: req.body.uid}, {
            name: req.body.name
        });
        const user = await User.findById({_id: req.body.uid}).exec();
        
        // send updated user with login creadential
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

        console.log(userObject);
        return res.status(200).json({
            success: {
                user: userObject,
                msg: "name has been changed"
            }
        });
    } catch(err) {
        res.status(500).json({
            errors: {
                msg: err.message
            }
        })
    }
    
}

// update user password
exports.changePassword = async (req, res, next) => {
    try {

        // find user by requested id
        const user = await User.findById({_id: req.body.uid}).exec();

        if(user) {
            const validatePassword = await bcrypt.compare(req.body.oldPassword, user.password);
            if(validatePassword) {
                const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
                await User.findByIdAndUpdate({_id: req.body.uid}, {
                    password: hashedPassword
                });
                return res.status(200).json({
                    success: {
                        msg: "Password changed successfully!"
                    }
                });
            } else {
                return res.status(403).json({
                    errors: {
                        oldPassword: {
                            msg: "Invaid password!"
                        }
                    }
                });
            }
        } else {
            return res.status(400).json({
                errors: {
                    msg: "Error changing password!"
                }
            })
        }      
    } catch(err) {
        return res.status(400).json({
            errors: {
                msg: "Error changing password!"
            }
        })
    }
    
}


// add seller transaction number
exports.addSellerTransactionNumber = async (req, res, next) => {

    try {
        // find user by requested id
        let user = await User.findById({_id: req.body.uid}).exec();
        if(user) {
           
            // prepare transaction number
            const trObject = JSON.parse(JSON.stringify(user.transactionNumbers));
            trObject[req.body.type] = req.body.number.replace("+88",""); 

            await User.findByIdAndUpdate({_id: req.body.uid}, {
                transactionNumbers: trObject
            });
            user = await User.findById({_id: req.body.uid}).exec();
            // send updated user with login creadential
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

            return res.status(200).json({
                success: {
                    user: userObject,
                    msg: "transaction number added successfully!"
                }
            })
        } else {
            return res.status(403).json({
                errors: {
                    msg: "failed! to add transaction number"
                }
            })
        }
        
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "failed! to add transaction number"
            }
        })
    }
   
}

// set status for user
exports.setStatus = async (req, res) => {
    try {
          // find user by requested id
          let user = await User.findById({_id: req.body.uid}).exec();
          if(user) {
  
              await User.findByIdAndUpdate({_id: req.body.uid}, {
                  status: req.body.status
              });
              user = await User.findById({_id: req.body.uid}).exec();
      
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
  
              return res.status(200).json({
                  success: {
                      user: userObject,
                      msg: "status has been set successfully"
                  }
              })
            } else {
                return res.status(500).json({
                    errors: {
                        msg: "errors setting status"
                    }
                });
            }
       
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: "errors setting status"
            }
        });
    }
}
