
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
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


const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

// Handle 'install' event.
self.addEventListener('install', e => {

    const openStaticCache = caches.open(STATIC_CACHE)
        .then(cache => cache.addAll(APP_SHELL));

    const openInmutableCache = caches.open(INMUTABLE_CACHE)
        .then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([openStaticCache, openInmutableCache]));

});


// Handle 'fetch' event.
self.addEventListener('fetch', e => {

    const handleFetch = caches.match(e.request)
        .then(res => {
            if (res) {
                return res;
            } else {
                return fetch(e.request)
                    .then(res => {
                        updateDynamicCache(DYNAMIC_CACHE, e.request, res);
                    });
            }
        });

    e.respondWith(handleFetch);

});


// Handle 'activate' event.
self.addEventListener('activate', e => {

    // Remove old static cache.
    const removeOldStaticCache = caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if (key !== STATIC_CACHE && key.includes('static')) {
                    return caches.delete(key);
                }
            });
        });

    e.waitUntil(removeOldStaticCache);

});
