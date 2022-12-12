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
import usersReducer from './users/users.reducer';
import announcementReducer from './announcement/announcement.reducer';
import configReducer from "./config/config.reducer";

/*
    persist config 
*/
// root persist config
const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth', 'games', 'auth', 'users', 'announcement', 'config'],
}


const rootReducer = combineReducers({
    shop: shopReducer,
    games: gamesReducer,
    auth: authReducer,
    users: usersReducer,
    announcement: announcementReducer,
    config: configReducer
});

export default persistReducer(rootPersistConfig, rootReducer);