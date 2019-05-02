

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}


/* if ('caches' in window) {
    
    // Create / Open cache
    caches.open('prueba-1');
    caches.open('prueba-2');

    caches.open('cache-v1.1')
        .then(cache => {
            cache.addAll([
                '/css/style.css',
                '/img/main.jpg',
                '/index.html'
            ]).then(res => {
                console.log('All requests are cached');

                // Delete certain request of a cache
                // cache.delete('/img/main.jpg');

                cache.match('/img/main.jpg')
                    .then(res => {
                        if (res) {
                            cache.delete('/img/main.jpg');
                        }
                    });
            });
        });


    // Get certain cache.
    caches.has('prueba-2')
        .then(console.log);
    

    // Delete Caches
    console.log('Creating cache: prueba-3');
    caches.open('prueba-3');
    caches.delete('prueba-3')
        .then(res => {
            res && console.log('Cache prueba-3 is deleted');
        });
    

    // Get all existing caches.
    caches.keys()
        .then(console.log);

} */