/**
 * user request
 */
// app configureation
import config from "../config";


// signup from normal user
export const signup = async (userInfo) => {
    // prepare request object
    const userObject = {
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        phone: `+88${userInfo.phone}`
    }
  
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/signup`, {
            method: "POST",
            body: JSON.stringify(userObject),
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


// login from normal user
export const login = async (userInfo) => {
     // prepare request object
     const userObject = {
        username: userInfo.username,
        password: userInfo.password,
    }
    try {
        const res = await fetch(`${config.API_DOMAIN}/login`, {
            method: "POST",
            body: JSON.stringify(userObject),
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


// user full name change action controller
export const changeName = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/name`, {
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
        return err.message;
    }
}


// user change password
export const changePassword = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/password`, {
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
        return err.message;
    }
}

// add transaction number
export const addTransactionNumber = async (reqObject) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/user/transaction`, {
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
        return err.message;
    }
}


// verify login
export const verifyLogin = async (auth) => {
    try {
        const res = await fetch(`${config.API_DOMAIN}/verify`, {
            method: "POST",
            body: JSON.stringify(auth),
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
