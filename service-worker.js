const CACHE_NAME = 'vocabulary-v3';
const urlsToCache = [
  '/Vocabulary/',  // Adjusted for GitHub Pages
  '/Vocabulary/index.html',
  '/Vocabulary/styles4.css',
  '/Vocabulary/dark.css',
  '/Vocabulary/app4.js',
  '/Vocabulary/dark.js',
  '/Vocabulary/install.js',
  '/Vocabulary/manifest.json',
  '/Vocabulary/paragraphs.json',
  
  '/Vocabulary/css/all.min.css',
  '/Vocabulary/css/fontawesome.css',
  
  '/Vocabulary/webfonts/fa-brands-400.ttf',
  '/Vocabulary/webfonts/fa-brands-400.woff2',
  '/Vocabulary/webfonts/fa-regular-400.ttf',
  '/Vocabulary/webfonts/fa-regular-400.woff2',
  '/Vocabulary/webfonts/fa-solid-900.ttf',
  '/Vocabulary/webfonts/fa-solid-900.woff2',
  '/Vocabulary/webfonts/fa-v4compatibility.ttf',
  '/Vocabulary/webfonts/fa-v4compatibility.woff2',
  
  '/Vocabulary/assets/icon-512.png',
  '/Vocabulary/assets/icon-192.png',
  '/Vocabulary/assets/vocabulary-screens.png',
  '/Vocabulary/assets/icon.png'
];




// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
