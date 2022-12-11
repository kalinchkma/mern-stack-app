
/**
 * Token selector
 */
import { createSelector } from "reselect"; 


const selectNot = state => state.notification;


export const selectNotification = createSelector(
    [selectNot],
    notification => notification.notification
)
