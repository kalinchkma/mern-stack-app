// config controllers

import config from "../config";

// add config controller
export const addConfig = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/config`, {
            method: "POST",
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err;
    }
}

// upload image controllers
export const uploadImage = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/config/image`, {
            method: "POST",
            body: reqObject,
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err;
    }
}


// delete social links
export const deleteSocialLink = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/config`, {
            method: "DELETE",
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result; 
    } catch(err) {
        return err;
    }
}

// delete image
export const deleteBannerImage = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/config/image`, {
            method: "DELETE",
            body: JSON.stringify(reqObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result; 
    } catch(err) {
        return err;
    }
}