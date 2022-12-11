/**
 * root reducer
 */

import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';

import storage from "redux-persist/lib/storage";

// imports reducers
import shopReducer from './shop/shop.reducer';
import gamesReducer from './games/games.reducer';
import authReducer from './auth/auth.reducer';
import sellerReducer from './seller/seller.reducer';
import messageReducer from './message/message.reducer';
import announcementReducer from "./announcement/announcement.reducer";
import configReducer from "./config/config.reducer";
import cartReducer from './cart/cart.reducer';
import orderReducer from './order/order.reducer';
import notificationReducer from './notification/notification.reducer';

/*
   persist config
*/
// root persist config
const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["auth", 'games', 'shop', 'seller', 'message', 'announcement', 'config', 'cart', 'orders', 'notification'],
}


const rootReducer = combineReducers({
    shop: shopReducer,
    games: gamesReducer,
    auth: authReducer,
    seller: sellerReducer,
    message: messageReducer,
    announcement: announcementReducer,
    config: configReducer,
    cart: cartReducer,
    orders: orderReducer,
    notification: notificationReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
