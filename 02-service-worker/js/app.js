
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(res => {
            console.log('Service worker registered');
        });
}