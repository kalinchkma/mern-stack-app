/**
 * message reducer
 */

import OrderType from "./order.type"

// initial state
const INITAL_STATE = {
    orders: null,
    isFetching: false,
    errorMessage: undefined
}


// message reducer
const orderReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case(OrderType.ORDER_FETCH_START):
            return {
                ...state,
                isFetching: true
            }
        case (OrderType.ORDER_FETCH_SUCCESS):
            return {
                ...state,
                orders: action.payload
            }
        case (OrderType.ORDER_FETCH_ERROR):
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}



export default orderReducer;