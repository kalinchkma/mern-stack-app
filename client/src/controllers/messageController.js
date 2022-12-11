/**
 * message controller
 */


import config from "../config";

// send message
export const sendMessage = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/messenger/send`, {
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

// get all message
export const getMessageById = async (id) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/messenger/${id}`, {
            method: "GET",
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err;
    }
}


