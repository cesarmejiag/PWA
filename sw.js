
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v4';
const INMUTABLE_CACHE = 'inmutable-v1';
const DYNAMIC_CACHE = 'dynamic-v2';

const STATIC_CACHE_FILES = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

const INMUTABLE_CACHE_FILES = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];


// Handle 'install' event.
self.addEventListener('install', e => {
    const staticCache = caches.open(STATIC_CACHE)
        .then(cache => cache.addAll(STATIC_CACHE_FILES));

    const inmutableCache = caches.open(INMUTABLE_CACHE)
        .then(cache => cache.addAll(INMUTABLE_CACHE_FILES));

    e.waitUntil(Promise.all([staticCache, inmutableCache]));
});

// Handle 'activate' event.
self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        const keys = await caches.keys();

        keys.forEach(async key => {
            if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                await caches.delete(key);
            }
        });
    })());
});

// Handle 'fetch' event.
self.addEventListener('fetch', e => {
    e.respondWith((async ({ request }) => {
        const cacheRes = await caches.match(request);

        if (cacheRes) {
            return cacheRes;
        }

        const fetchRes = await fetch(request);

        await updateDynamicCache(DYNAMIC_CACHE, request, fetchRes);
        return fetchRes;
    })(e));
});
