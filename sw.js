/* Minimal service worker — required for "Add to Home Screen" / installable PWA behavior,
   but intentionally does NOT cache anything. This app's data (IPOs, GMP, market movers,
   dividends, etc.) needs to stay live and fresh on every load, so every fetch is passed
   straight through to the network untouched. */

self.addEventListener('install', (event) => {
  // Activate this service worker immediately, without waiting for old tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of any already-open pages right away
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // No-op passthrough: just let the request go to the network as normal.
  // (Not calling event.respondWith() at all would also work, but being
  // explicit here makes the "no caching" intent clear.)
  event.respondWith(fetch(event.request));
});
