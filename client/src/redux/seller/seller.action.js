/**
 * all users action
 */

import config from "../../config";

import SellerType from "./seller.type";

export const fetchSellerStart = () => ({
    type: SellerType.FETCH_SELLER_START
});

export const fetchSellerSuccess = (sellerMap) => ({
    type: SellerType.FETCH_SELLER_SUCCESS,
    payload: sellerMap
});

export const fetchSellerFailure = (errorMessage) => ({
    type: SellerType.FETCH_SELLER_ERROR,
    payload: errorMessage
});


export const fetchSellerStartAsync = () => {
    return async dispatch => {

        dispatch(fetchSellerStart());

        try {
            const res = await fetch(`${config.API_DOMAIN}/user/seller`,
            {
                method: "PATCH"
            });
            const result = await res.json();
            if(res.status === 200) {
                dispatch(fetchSellerSuccess(result.success.users));
            }else {
                dispatch(fetchSellerFailure(result.errors));
            }

        } catch(err) {
            dispatch(fetchSellerFailure(err.message));
        }

    }
}


