
/**
 * Token selector
 */
import { createSelector } from "reselect"; 


const selectCartState = state => state.cart;


export const selectCart = createSelector(
    [selectCartState],
    cart => cart.cart
)
