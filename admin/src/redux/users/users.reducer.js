/**
 * all user reducer
 */

import UsersType from "./users.type";

const INITAL_STATE = {
    users: null,
    isFetching: false,
    errorMessage: undefined
}


const usersReducer = (state = INITAL_STATE, action) => {
    switch(action.type) {
        case(UsersType.FETCH_USERS_START):
            return {
                ...state,
                isFetching: true
            }
        case(UsersType.FETCH_USERS_SUCCESS):
            return {
                ...state,
                users: action.payload,
                isFetching: false
            }
        case (UsersType.FETCH_USERS_ERROR):
            return {
                ...state,
                errorMessage: action.payload,
                isFetching: false
            }

        default:
            return state;
    }
}

export default usersReducer;







