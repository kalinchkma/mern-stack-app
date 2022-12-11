/**
 * product controller
 */

import config from "../config";

// add product to database
export const adminCreateProduct = async (productObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/product`, {
            method: "POST",
            body: JSON.stringify(productObject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err.message;
    }
}

// update product by its id
export const updateProductById = async (reqObject) => {
  
    try {
        const res = await fetch(`${config.API_DOMAIN}/product`, {
            method: "PUT",
            body: JSON.stringify(reqObject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err.message;
    }
}

// remove product by id only for admin
export const removeProductById = async (id, token) => {
    // request object 
    const reqObject = {
        token: token
    } 
    try {
        const res = await fetch(`${config.API_DOMAIN}/product/${id}`, {
            method: "DELETE",
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': "application/json"
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err.message;
    }
}


