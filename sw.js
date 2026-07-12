const CACHE_NAME = 'goglobal-cache-v4';
const CACHE_ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.svg',
  'icon-512.svg',
  'icon-192.png',
  'icon-512.png',
  'offline.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Bypass the browser's HTTP cache so a fresh deploy is never masked by
      // a stale disk-cached response during precache.
      cache.addAll(CACHE_ASSETS.map((url) => new Request(url, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first for static assets, with offline fallback page for navigation requests.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('offline.html');
          }
        });
    })
  );
});
