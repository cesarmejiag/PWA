
/**
 * Update dynamic cache.
 * @param {string} cacheName 
 * @param {Request} req 
 * @param {Response} res 
 */
async function updateDynamicCache(cacheName, req, res) {
    if (res.ok) {
        return caches.open(cacheName)
            .then(cache => {
                cache.put(req, res.clone());

                return res.clone();
            });
    }

    return res;
}