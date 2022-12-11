/**
 * Produc list actions
 */

import ShopType from "./shop.type";

import config from "../../config";

export const fetchCollectionStart = () => ({
    type: ShopType.FETCH_COLLECTION_START
});


export const fetchCollectionSuccess = (collectionMap) => ({
    type: ShopType.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionError = (errorMessage) => ({
    type: ShopType.FETCH_COLLECTION_ERROR,
    payload: errorMessage
});



export const fetchCollectionStartAsync = () => {
    return async dispatch =>  {
            dispatch(fetchCollectionStart());
            try {
                const res = await fetch(`${config.API_DOMAIN}/product`, {
                    method: "GET"
                });
                const result = await res.json();
                if(res.status === 200) {
                    dispatch(fetchCollectionSuccess(result.success.products));
                } else {
                    dispatch(fetchCollectionError(result.errors));
                }
            } catch(err) {
                dispatch(fetchCollectionError(err.message));
            }
             
    }
}

