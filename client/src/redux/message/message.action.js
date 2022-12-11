/**
 * message action
 */

import MessageType from "./message.type";
import config from "../../config";



export const messageFetchStart = () => ({
    type: MessageType.MESSAGE_FETCH_START
});

export const messageFetchSuccess = (messageMap) => ({
    type: MessageType.MESSAGE_FETCH_SUCCESS,
    payload: messageMap
});

export const messageFetchError = (errorMessage) => ({
    type: MessageType.MESSAGE_FETCH_ERROR,
    payload: errorMessage
});

export const appendMessage = (message) => ({
    type: MessageType.MESSAGE_APPEND,
    payload: message
})


export const messageFetchStartAsync = (id) => {
    return async dispatch => {
        dispatch(messageFetchStart())
        try {
            const res = await fetch(`${config.API_DOMAIN}/messenger/${id}`, {
                method: "GET"
            });
            const result = await res.json();
            if(res.status === 200) {
                dispatch(messageFetchSuccess(result.success.messages))
            }else {
                dispatch(messageFetchError(result.errors))
            }
            
        } catch(err) {
            dispatch(messageFetchError(err.message))
        }
    }
}

