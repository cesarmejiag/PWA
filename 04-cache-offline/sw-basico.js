
self.addEventListener('fetch', event => {

    const offlineResponse = new Response(`
            Bienvenido a mi página Web
            Lo sentimos pero necesitas conexión a internet para navegarla :(
        `);

    const res = fetch(event.request)
        .catch(() => offlineResponse);

    event.respondWith(res);
});

