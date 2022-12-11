
/**
 * Token selector
 */
import { createSelector } from "reselect"; 


const selectToken = state => state.auth;


export const selectAuthToken = createSelector(
    [selectToken],
    auth => auth.token
)
