/**
 * Token reducer
 */

import NotificationType from "./notification.type";

const INITIAL_STATE = {
    notification: null
}

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case(NotificationType.SET_NOTIFICATION):
            return {
                ...state,
                notification: action.payload
            }
        default:
            return state;
    }
}

export default notificationReducer;
