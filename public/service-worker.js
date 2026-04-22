// public/service-worker.js
// PWA service worker with safe cache strategy for deployments

const CACHE_NAME = 'courtbooker-cache-v1';

// Activate immediately — do not wait for existing tabs to close
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Clean up old caches and take control of all open clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // Navigation requests (HTML): always fetch from network to avoid serving stale index.html.
  // Fall back to cached index.html only when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Cache-first for fingerprinted static assets (JS, CSS).
  // Safe because filenames change on every build, so stale entries are never served.
  if (request.url.includes('/static/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
    return;
  }

  // Cache-first for images and fonts (immutable, long-lived assets).
  if (request.url.includes('/images/') || request.url.includes('/fonts/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default: network-first, fall back to cache for all other requests.
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
