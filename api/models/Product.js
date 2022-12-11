/**
 * ProductList medel
 */
'use strict';

// external model
const mongoose = require('mongoose');

// internal model
const productSchema = require("../schemas/productSchema");

const Product = mongoose.model('Product', productSchema);


module.exports = Product;

