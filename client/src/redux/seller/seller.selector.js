/**
 * users selector
 */
import { createSelector } from "reselect";
import findById from "../../utils/findById";

const selectSellers = state => state.seller;

export const selectSellerList = createSelector(
    [selectSellers],
    seller => seller.sellers
);

export const selectSellerIsFetching = createSelector(
    [selectSellers],
    seller => seller.isFetching
);


export const selectSellerById = userId => createSelector(
    [selectSellerList],
    sellers => findById(userId, sellers)
);

export const selectSellerIsLoaded = createSelector(
    [selectSellerList],
    sellers => !!sellers
);







