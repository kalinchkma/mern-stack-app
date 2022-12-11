/**
 * produc list sector
 */

import findById from "../../utils/findById";

import { createSelector } from "reselect"; 


const selectShop = state => state.shop;
 

export const selectCollections = createSelector(
        [selectShop],
        shop => shop.collections
);

export const selectCollectionById = collectionId => createSelector(
   [selectCollections],
   collection => findById(collectionId, collection)
);


export const selectShopIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectShopIsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);


