// announcement controllers

import config from "../config";


// creating announcement
export const createAnnouncement = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/announcement`, {
            method: "POST",
            body: reqObject
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err;
    }
}


// update announcement
export const updateAnnouncement = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/announcement`, {
            method: "PUT",
            body: reqObject
        });
        const result = await res.json();
        result.status = res.status;
        return result;

    } catch(err) {
        return err;
    }
}


// delete announcemnet by id
export const deleteAnnouncement = async (id, token) => {
    const reqObject = {
        id: id,
        token: token
    }
 
    try {
        const res = await fetch(`${config.API_DOMAIN}/announcement`, {
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

