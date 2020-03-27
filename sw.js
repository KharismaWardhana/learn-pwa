const CACHE_NAME = 'arlite-pwa-v1';
var urlsToCache = [
  '/',
  // revisi add manifest.json
  './manifest.json',
  // revisi add all assets images and icons
  './favicon.ico',
  './assets/icons/icon-128x128.png',
  './assets/icons/icon-144x144.png',
  './assets/icons/icon-152x152.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-384x384.png',
  './assets/icons/icon-512x512.png',
  './assets/icons/icon-72x72.png',
  './assets/icons/icon-96x96.png',
  './assets/splash/apple-splash-1125-2436.jpg',
  './assets/splash/apple-splash-1242-2208.jpg',
  './assets/splash/apple-splash-1242-2688.jpg',
  './assets/splash/apple-splash-1536-2048.jpg',
  './assets/splash/apple-splash-1668-2224.jpg',
  './assets/splash/apple-splash-1668-2388.jpg',
  './assets/splash/apple-splash-2048-2732.jpg',
  './assets/splash/apple-splash-640-1136.jpg',
  './assets/splash/apple-splash-750-1334.jpg',
  './assets/splash/apple-splash-828-1792.jpg',
  './assets/images/Image_Chair.svg',
  './assets/images/Image_Chair_Wood.svg',
  './assets/images/Image_Desk.svg',
  './assets/images/Image_Lamp.svg',
  './assets/images/Image_Sofa.svg',
  './assets/images/Image_Sofa_Orange.svg',
  './assets/images/Image_Sofa_Red.svg',
  './assets/images/Logo.svg',
  './assets/images/Logo.png',
  './nav.html',
  './index.html',
  './pages/home/home.html',
  './pages/about/about.html',
  './pages/contact/contact.html',
  './pages/product/product.html',
  './pages/product/details.html',
  './css/styles.css',
  './libs/materialize/css/materialize.min.css',
  './libs/materialize/js/materialize.min.js',
  './js/nav.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then(function(response) {
      if (response) {
        console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
        return response;
      }

      console.log('ServiceWorker: Memuat aset dari server: ', event.request.url);
      return fetch(event.request);
    })
  );
});
