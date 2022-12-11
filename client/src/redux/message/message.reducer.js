/**
 * message reducer
 */

import MessageType from "./message.type";

// initial state
const INITAL_STATE = {
    messages: null,
    isFetching: false,
    errorMessage: undefined
}


// message reducer
const messageReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case(MessageType.MESSAGE_FETCH_START):
            return {
                ...state,
                isFetching: true
            }
        case (MessageType.MESSAGE_FETCH_SUCCESS):
            return {
                ...state,
                messages: action.payload
            }
        case (MessageType.MESSAGE_FETCH_ERROR):
            return {
                ...state,
                errorMessage: action.payload
            }
        case (MessageType.MESSAGE_APPEND):
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state;
    }
}



export default messageReducer;