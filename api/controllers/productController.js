/**
 * ProductList Controller
 */


// internal imports
const Product = require('../models/Product');
const User = require('../models/User');


// create product list
exports.createProduct = async (req, res, next) => {
    
    try {  
        const newProductObject = {
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            gener: req.body.gener,
        }
    
        const newProduct = new Product(newProductObject);
        
        const result = await newProduct.save();
        return res.status(200).json({
            success: {
                product: result,
                msg: "New product created successfully"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        })
    }
}

// update product by id
exports.updateProductById = async (req, res, next) => {
    try {

        await Product.findByIdAndUpdate({_id: req.body.id}, {
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
        });

        const updatedProduct = await Product.findById({_id: req.body.id});
        return res.status(200).json({
            success: {
                product: updatedProduct,
                msg: "New product create successfully"
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

// delete product list by id
exports.deleteProductById = async (req, res, next) => {
   
    try {
        await Product.findByIdAndDelete({_id: req.params.id})
       
        return res.status(200).json({
            success: {
                msg: "Product List deleted successfully"
            }
        })
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        });
    }
}

// get all product list 
exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
       
        return res.status(200).json({
            success: {
                products: products,
                msg: "Product fetch successfully"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            }
        })
    }
}


// get product list by id
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById({_id: req.params.id});
        return res.status(200).json( {
            success: {
                product: product,
                msg: "Product fetch successfully"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            }
        })
    }
}


// assign user to product
exports.assignUserToProduct = async (req, res) => {
    try {
        const product = await Product.findById({_id: req.body.productId});
        const user = await User.findById({_id: req.body.userId});
         await Product.findByIdAndUpdate({_id: req.body.productId}, {
            assignedUsers: [...product.assignedUsers, req.body.userId]
        });
        await User.findByIdAndUpdate({_id: req.body.userId}, {
            assignedProducts: [...user.assignedProducts, req.body.productId]
        })
        return res.status(200).json({
            success: {
                msg: "user has been added to product"
            }
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            errors: {
                msg: "Internal server error!"
            }
        })
    }
  
}

// remove user to product
exports.removedUserToProduct = async (req, res) => {
    
    try {
        const product = await Product.findById({_id: req.body.productId});
        const user = await User.findById({_id: req.body.userId});

        const newProductAssign = [];
        const newUserAssign = [];

        user.assignedProducts.forEach(product => {
            if(product !== req.body.productId) {
                newProductAssign.push(product);
            }
        });

        product.assignedUsers.forEach(user => {
            if(user !== req.body.userId) {
                newUserAssign.push(user);
            }
        });

        await Product.findByIdAndUpdate({_id: req.body.productId}, {
            assignedUsers: newUserAssign
        });
        await User.findByIdAndUpdate({_id: req.body.userId}, {
            assignedProducts: newProductAssign
        })
        return res.status(200).json({
            success: {
                msg: "user has been added to product"
            }
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            errors: {
                msg: "Internal server error!"
            }
        })
    }
}

