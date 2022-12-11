/**
 * token
 */

import AuthType from "./auth.type";


export const setToken = token => ({
    type: AuthType.SET_AUTH_TOKEN,
    payload: token
});

