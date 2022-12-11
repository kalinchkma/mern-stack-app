/**
 * all users action
 */

import config from "../../config";

import UsersType from "./users.type";

export const fetchUsersStart = () => ({
    type: UsersType.FETCH_USERS_START
});

export const fetchUsersSuccess = (usersMap) => ({
    type: UsersType.FETCH_USERS_SUCCESS,
    payload: usersMap
});

export const fetchUsersFailure = (errorMessage) => ({
    type: UsersType.FETCH_USERS_ERROR,
    payload: errorMessage
});


export const fetchUsersStartAsync = () => {
    return async dispatch => {

        dispatch(fetchUsersStart());

        try {
            const res = await fetch(`${config.API_DOMAIN}/user`,
            {
                method: "GET"
            });
            const result = await res.json();
            if(res.status === 200) {
        
                dispatch(fetchUsersSuccess(result.success.users));
            }else {
                dispatch(fetchUsersFailure(result.errors));
            }

        } catch(err) {
            dispatch(fetchUsersFailure(err.message));
        }

    }
}


