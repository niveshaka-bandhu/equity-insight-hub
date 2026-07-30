/* Service worker.
   Static assets (logo, icons, fonts) — cache-first, since they never change and this makes
   repeat visits noticeably faster (instant load from cache instead of a network round-trip).
   Everything else — the HTML page itself, and ALL data fetches (Google Sheets, Yahoo Finance,
   CORS proxies) — stays network-only. This app's data needs to be live and fresh on every
   load, so nothing data-related is ever cached, only truly static files. */

const STATIC_CACHE = 'nb-static-v1';
const STATIC_EXTENSIONS = /\.(png|jpg|jpeg|svg|webp|ico|woff2?|ttf)$/i;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== STATIC_CACHE).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isStaticAsset = isSameOrigin && STATIC_EXTENSIONS.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // HTML page + every data fetch: always network, never cached.
  event.respondWith(fetch(event.request));
});
