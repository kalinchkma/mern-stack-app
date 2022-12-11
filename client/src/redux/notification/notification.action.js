/**
 * token
 */

import NotificationType from "./notification.type";


export const setNotification = notification => ({
    type: NotificationType.SET_NOTIFICATION,
    payload: notification
});

