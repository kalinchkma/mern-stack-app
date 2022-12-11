export default function swDev() {

    function urlBase64ToUint8Array(base64String) {
        let padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g,'+').replace(/_/g,'/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray
    }
    
    function determineAppServerKey() {
        let vapidPublickey = "BIwgL9iD4ks9AqJUDWE8IQJ7R83VPCEVSa5kUTZzHd7qrlRwsa9Qx3qcHu2BMTOzv35JgkI-AlklODq5HuY65ck";
    
        return urlBase64ToUint8Array(vapidPublickey);
    }



    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).then((res) => {
        console.warn("response", res);
        return res.pushManager.getSubscription()
        .then((subscription) => {
            return res.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: determineAppServerKey()
            })
        })
    })
}



