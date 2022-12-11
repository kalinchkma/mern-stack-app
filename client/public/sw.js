
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html", "logo.png"];

// install apps
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Open chache")
            return cache.addAll(urlsToCache);
        })
    )
});

// fetch offline page
this.addEventListener("fetch", (event) => {
    // offline file
    if(!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then(() => {
                return fetch(event.request).catch(() => caches.match('offline.html'))
            })
        );
    }

  
});

// activate 
this.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
            if(!cacheWhiteList.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    )))
});