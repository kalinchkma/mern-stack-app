/**
 * Product list reducer
 */
import ShopType from "./shop.type";

const INITAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
}

const shopReducer = (state = INITAL_STATE, action) => {
    switch(action.type) {
        case (ShopType.FETCH_COLLECTION_START):
            return {
                ...state,
                isFetching: true
            }
        case (ShopType.FETCH_COLLECTION_SUCCESS):
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case (ShopType.FETCH_COLLECTION_ERROR):
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;
