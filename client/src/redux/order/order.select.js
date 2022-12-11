/**
 * message selector
 */

import { createSelector } from "reselect";

const selectOrder = state => state.orders;


export const selectOrders = createSelector(
    [selectOrder],
    orders => orders.orders
);

export const selectOrderIsFetching = createSelector(
    [selectOrder],
    orders => orders.isFetching
);


