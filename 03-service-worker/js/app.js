

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
        .then(res => {
            /* setTimeout(() => {
                res.sync.register('posteo-gatitos');
                console.log('Se enviaron fotos de gatitos');
            }, 5000); */

            Notification.requestPermission()
                .then(notificationRes => {
                    console.log(notificationRes);
                    res.showNotification('Hello World!');
                });
        });
}

/* fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(console.log); */