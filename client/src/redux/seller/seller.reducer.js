/**
 * all user reducer
 */

import SellerType from "./seller.type";

const INITAL_STATE = {
    sellers: null,
    isFetching: false,
    errorMessage: undefined
}


const sellerReducer = (state = INITAL_STATE, action) => {
    switch(action.type) {
        case(SellerType.FETCH_SELLER_START):
            return {
                ...state,
                isFetching: true
            }
        case(SellerType.FETCH_SELLER_SUCCESS):
            return {
                ...state,
                sellers: action.payload,
                isFetching: false
            }
        case (SellerType.FETCH_SELLER_ERROR):
            return {
                ...state,
                errorMessage: action.payload,
                isFetching: false
            }
        default:
            return state;
    }
}

export default sellerReducer;







