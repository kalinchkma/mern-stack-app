/**
 * show notification
 */
import config from "../config";

export  function showNotification(msg) {
    const notification = new Notification("New messaage from gontop", {
        body: msg,
        icon: "/favicon.png"
    });
    notification.onclick = (e) => {
        window.location.href = `${config.MY_DOMAIN}/history`
    }
}
export  function showMsgNotification(msg, id) {
    const notification = new Notification("New messaage from gontop", {
        body: msg,
        icon: "/favicon.png"
    });
    notification.onclick = (e) => {
        window.location.href = `${config.MY_DOMAIN}/order/messages/${id}`
    }
}

export function getPermission() {
    if(Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if(permission === 'granted') {
               return;
            }
        })
    }
}
