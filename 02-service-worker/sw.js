
self.addEventListener('fetch', event => {

    const resp = fetch(event.request)
        .then(res => {
            return res.ok ? res : fetch('/img/main.jpg');
        });

    event.respondWith( resp );

});