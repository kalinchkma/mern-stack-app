/**
 * message action
 */

import OrderType from "./order.type";
import config from "../../config";


export const orderFetchStart = () => ({
    type: OrderType.ORDER_FETCH_START
});

export const orderFetchSuccess = (orderMap) => ({
    type: OrderType.ORDER_FETCH_SUCCESS,
    payload: orderMap
});

export const orderFetchError = (errorMessage) => ({
    type: OrderType.ORDER_FETCH_ERROR,
    payload: errorMessage
});


export const orderFetchStartByIdAsync = (id) => {
    return async dispatch => {
        dispatch(orderFetchStart())
        try {
            const res = await fetch(`${config.API_DOMAIN}/order/${id}`, {
                method: "GET"
            });
            const result = await res.json();
            if(res.status === 200) {
                dispatch(orderFetchSuccess(result.success.orders))
            }else {
                dispatch(orderFetchError(result.errors.msg))
            }
            
        } catch(err) {
            dispatch(orderFetchError(err))
        }
    }
}

