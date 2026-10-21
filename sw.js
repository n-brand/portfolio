// --- Service Worker: Portfolio offline verfügbar ---
// Eigene Dateien kommen zuerst aus dem Netz (immer aktuell), ohne Netz oder nach 4 s aus dem Speicher.
// Schriften von Google Fonts kommen aus dem Speicher. VERSION erhöhen, wenn sich die Logik hier ändert.

const VERSION = 'v1';
const CACHE = `portfolio-${VERSION}`;

// PRECACHE-START (wird von tools/build-pages.js geschrieben)
const PRECACHE = [
    './',
    './index.html',
    './ueber-mich.html',
    './manifest.webmanifest',
    './projekte/swan-calisthenics.html',
    './projekte/minecraft-skin-merger.html',
    './projekte/gamehub.html',
    './projekte/strategiespiel.html',
    './projekte/watch-shop.html',
    './projekte/jarvis-anleitung.html',
    './projekte/escape-room.html',
    './projekte/textbased-game.html',
    './projekte/hofladen-webshop.html',
    './projekte/influencer.html',
    './projekte/mediensammlung.html',
    './css/styles.css',
    './javascript/main.js',
    './assets/icons/apple-touch-icon.png',
    './assets/icons/icon-192.png',
    './assets/icons/icon-32.png',
    './assets/icons/icon-512.png',
    './assets/icons/icon-maskable-512.png',
    './assets/icons/icon.svg',
    './assets/images/swan-arm-left.png',
    './assets/images/swan-arm-right.png',
    './assets/images/swan-bar.png',
    './assets/images/swan-bg.png',
    './assets/images/swan-body.png',
    './assets/images/swan-calisthenics.png',
    './assets/images/swan-fists.png',
];
// PRECACHE-END

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

const fromNetwork = (request, timeout) => new Promise((resolve, reject) => {
    const timer = setTimeout(reject, timeout);
    fetch(request).then(response => {
        clearTimeout(timer);
        if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        resolve(response);
    }, error => {
        clearTimeout(timer);
        reject(error);
    });
});

const fromCache = async request => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) {
        return cached;
    }
    if (request.mode === 'navigate') {
        return caches.match('./index.html');
    }
    return Response.error();
};

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') {
        return;
    }
    const url = new URL(request.url);

    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(caches.match(request).then(cached => cached || fromNetwork(request, 10000)));
        return;
    }

    if (url.origin === self.location.origin) {
        event.respondWith(fromNetwork(request, 4000).catch(() => fromCache(request)));
    }
});
