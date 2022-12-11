/**
 * Token reducer
 */

import AuthType from "./auth.type";

const INITIAL_STATE = {
    token: null
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case(AuthType.SET_AUTH_TOKEN):
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;
