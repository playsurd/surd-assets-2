const cacheVersion = 'static-v12';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheVersion)
      .then(cache => cache.addAll([
        '/',
        '/manifest.json',
        '/img/ico48.png',
        '/img/ico72.png',
        '/img/ico96.png',
        '/img/ico144.png',
        '/img/ico192.png',
        '/img/ico512.png',
		'/img/laugh.png',
		'/img/rich.png',
		'/img/money.png',
		'/img/friends.png',
		'/img/snakelogic.png',
		'/main.js',
        '/flip.mp3',
        '/point.mp3',
        '/boom.mp3',
		'/click.mp3'
      ]))
  );
});


self.addEventListener('activate', event => {

  var cacheWhitelist = ['static-v12'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});