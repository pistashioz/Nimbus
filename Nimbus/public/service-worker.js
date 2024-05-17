const CACHE_NAME = 'weather-data-cache-v1';
const ICONS_URL = 'https://openweathermap.org/img/wn/';
const DATA_URL = 'https://api.openweathermap.org/data/2.5/';
const ASSETS_URL = '/assets/icons/logo.svg'; // Add this line

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (
    event.request.url.startsWith(ICONS_URL) || 
    event.request.url.startsWith(DATA_URL) ||
    event.request.url.includes(ASSETS_URL) // Add this line
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log(`Serving cached: ${event.request.url}`);
          return response;
        }
        console.log(`Fetching from network: ${event.request.url}`);
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
