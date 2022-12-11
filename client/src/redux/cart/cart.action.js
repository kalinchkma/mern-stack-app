/**
 * token
 */

import CartType from "./cart.type";

export const setCart = cart => ({
    type: CartType.SET_CART,
    payload: cart
});

