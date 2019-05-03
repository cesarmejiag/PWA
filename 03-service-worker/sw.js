
// Ciclo de vida del SW

// Install
self.addEventListener('install', event => {
    console.log('SW: Installing');

    const instalation = new Promise((res, rej) => {
        setTimeout(() => {
            console.log('SW: Instalation finished');
            self.skipWaiting();
            res();
        }, 5);
    });

    event.waitUntil(instalation);
});


// Activate
self.addEventListener('activate', event => {
    console.log('SW2: Ready to controlate the app');
});


// Fetch
self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/users')) {
        const response = new Response(
            `{ "foo": false, "message": "this is my message" }`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        event.respondWith(response);
    }
});


// Sync
self.addEventListener('sync', event => {
    console.log('SW: Tenemos conexión!!');
    console.log(event);
    console.log(event.tag);
    
});


// Push
self.addEventListener('push', event => {
    console.log('Notificación recibida');
});