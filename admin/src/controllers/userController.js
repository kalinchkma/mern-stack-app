/**
 * user request
 */
// app configureation
import config from "../config";


// signup from admin
export const adminSignup = async (userInfo) => {
   
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/admin-signup`, {
            method: "POST",
            body: JSON.stringify(userInfo),
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


// change type from admin
export const adminUserTypeChange = async (type, id, token) => {
    // prepare request object
    const requestObject = {
        userType: type,
        uid: id,
        token: token
    }
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/${id}`, {
            method: "PUT",
            body: JSON.stringify(requestObject),
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


// remove user by id for admin only
export const adminRemoveUserById = async (id, token) => {
    // request object
    const requestObject = {
        token: token
    }
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/${id}`, {
            method: "DELETE",
            body: JSON.stringify(requestObject),
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



