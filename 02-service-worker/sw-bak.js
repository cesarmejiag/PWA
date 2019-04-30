
self.addEventListener('fetch', event => {

    // Ejercicio 3
    /* if (event.request.url.includes('/img/main.jpg')) {
        event.respondWith(fetch('/img/main-patas-arriba.jpg'));
    } else {
        event.respondWith(fetch(event.request));
    } */


    // Ejercicio 2
    /* if (event.request.url.includes('style.css')) {
        let res = new Response(`
            body {
                background-color: #f00 !important;
                color: pink !important;
            }
        `, {
            headers: {
                'Content-Type': 'text/css'
            }
        });

        event.respondWith(res);
    } */


    // Ejercicio 1
    /* if (event.request.url.includes('jpg')) {
        // event.respondWith( fetch('img/main.jpg') );
        // event.respondWith( fetch(event.request.url) );
        event.respondWith( fetch(event.request) );
        
        console.log(event.request.url);
    } else {
        event.respondWith(fetch(event.request));
    } */

});