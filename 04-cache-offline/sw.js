
// const CACHE_NAME = 'app-cache-v1';

const CACHE_STATIC_NAME = 'app-cache-static-v2';
const CACHE_DYNAMIC_NAME = 'app-cache-dynamic-v1';
const CACHE_IMMUTABLE_NAME = 'app-cache-immutable-v1';

const cacheStaticFiles = [
    '/',
    '/index.html',
    '/css/style.css',
    '/img/main.jpg',
    '/img/no-img.jpg',
    '/js/app.js',
    '/pages/offline.html'
];

const cacheImmutableFiles = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
];


const clearCache = (cacheName, total = 5) => {
    if ("string" !== typeof cacheName) {
        throw 'Cache name is needed';
    }

    caches.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(keys => {
                    if (keys.length > total) {
                        cache.delete(keys[0])
                            .then(res => {
                                console.log('Element deleted');
                                clearCache(cacheName);
                            });
                    }
                });
        });
};


// Handle install event of service worker.
self.addEventListener('install', event => {

    // Store static files of the application.
    const storeStaticFiles = caches.open(CACHE_STATIC_NAME)
        .then(cache => cache.addAll(cacheStaticFiles));


    // Store immutable files of the application.
    const storeImmutableFiles = caches.open(CACHE_IMMUTABLE_NAME)
        .then(cache => cache.addAll(cacheImmutableFiles));


    // Wait untill caches store all requests.
    event.waitUntil(Promise.all([storeStaticFiles, storeImmutableFiles]));

});


// Handle fetch event of service worker.
self.addEventListener('fetch', event => { 
    
    // 5. Cache and Network race
    const response = new Promise((res, rej) => {
        let fail = false;
        const failOnce = () => {
            if (fail) {
                if (/\.(png|jpg)$/i.test(event.request.url)) {
                    res(caches.match('/img/no-img.jpg'));
                } else {
                    rej('No se encontró respuesta');
                }
            } else {
                fail = true;
            }
        };

        // Try to get the resource from network
        fetch(event.request)
            .then(response => {
                response.ok ? res(response) : failOnce();
            })
            .catch(failOnce);

        // Try to get the resource from cache
        caches.match(event.request)
            .then(response => {
                response ? res(response) : failOnce();
            })
            .catch(failOnce);

    });

    event.respondWith(response);


    // 4. Cache with network update
    // Se utiliza cuando el rendimiento es crítico
    /* if (event.request.url.includes('bootstrap')) {
        return event.respondWith(caches.match(event.request));
    }

    const response = caches.open(CACHE_STATIC_NAME)
        .then(cache => {

            // Store resorce possible update in the cache
            fetch(event.request)
                .then(res => {
                    cache.put(event.request, res);
                });

            // Returns request from cache.
            return cache.match(event.request);
        });


    event.respondWith( response ); */

    // 3. Network with cache fallback
    /* const responseNetwork = fetch(event.request)
        .then(res => {
            if (!res) {
                return caches.match(event.request);
            }

            caches.open(CACHE_DYNAMIC_NAME)
                .then(cache => {
                    cache.put(event.request, res);
                    clearCache(CACHE_DYNAMIC_NAME);
                });

            return res.clone();
        })
        .catch(err => {
            return caches.match(event.request);
        });

    event.respondWith(responseNetwork); */


    // 2. Cache with fallback
    /* const resources = caches.match(event.request)
        .then(res => {
            
            if (res) {
                return res;
            }

            return fetch(event.request)
                .then(res => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(event.request, res)
                                .then(res => {
                                    clearCache(CACHE_DYNAMIC_NAME);
                                });
                        });

                    return res.clone();
                });
        });

    event.respondWith( resources ); */


    // 1. Cache only
    // event.respondWith( caches.match(event.request) );

});
