/**
 * order controller
 */

// config 
import config from "../config";


// send order
export const sendOrder = async (orderObject) => {
    // construct order object
    try {
        const res = await fetch(`${config.API_DOMAIN}/order`, {
            method: "POST",
            body: JSON.stringify(orderObject),
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


// get order by id
export const getOrderById = async (id) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/order/find/${id}`, {
            method: "GET",
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err.message;
    }
}

// set order status
export const setOrderStatus = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/order`, {
            method: "PUT",
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err.message;
    }
}
