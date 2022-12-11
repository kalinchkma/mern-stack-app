/**
 * Token reducer
 */

import CartType from "./cart.type";

const INITIAL_STATE = {
    cart: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case(CartType.SET_CART):
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;
