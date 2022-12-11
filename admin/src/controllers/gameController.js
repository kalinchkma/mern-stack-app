/**
 * game controller
 */

import config from "../config";



// only for admin 
export const adminAddGame = async (gameInfo) => {
    const requestObject = gameInfo;
    try {
        const res = await fetch(`${config.API_DOMAIN}/game`, {
            method: "POST",
            body: requestObject
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {  
        return err.message;
    }
}

// remove game only for admin
export const adminRemoveGameById = async (gameId, token) => {
    const requestObject = {
        token: token
    }
    try {
        const res = await fetch(`${config.API_DOMAIN}/game/${gameId}`, {
            method: 'DELETE',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        result.status = res.status;
        return result;

    } catch(err) {
        return err.message
    }

}

// update game only for admin
export const adminUpdateGameById = async (gameObject) => {
    const requestObject = gameObject;
    try {
        const res = await fetch(`${config.API_DOMAIN}/game`, {
            method: "PUT",
            body: requestObject
        });
        const result = await res.json();
        result.status = res.status;
        return result;
    } catch(err) {
        return err.message;
    }

}





