//files to cache
const cacheName = 'v1';

// call install event
self.addEventListener('install', e => {
  console.log('serviceWorker: installed');
});
//call activate event
self.addEventListener('activate', e => {
  console.log('serviceWorker: activated');
  //remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('serviceWorker: clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
// call fetch event
self.addEventListener('fetch', e => {
  console.log('serviceWorker: fetching');
  //check if the live site is live otherwise yous the cache to look for the requested file
  e.respondWith(
    fetch(e.request)
    .then(res => {
      //make copy/clone of response
      const resClone = res.clone();
      //open a cache
        caches
        .open(cacheName)
        .then(cache => {
          //add the response to the cache
          cache.put(e.request, resClone)
        });
        return res;
    }).catch(erro => caches.match(e.request).then(res => res))
  );
});







// //files to cache
// const cacheName = 'v1';
// const cacheAssets = [
//   'index.html',
//   'restaurant.html',
//   '/css/styles.css',
//   '/img/1.jpg',
//   '/img/2.jpg',
//   '/img/3.jpg',
//   '/img/4.jpg',
//   '/img/5.jpg',
//   '/img/6.jpg',
//   '/img/7.jpg',
//   '/img/8.jpg',
//   '/img/9.jpg',
//   '/img/10.jpg',
//   '/data/restaurants.json',
//   '/js/dbhealer.js',
//   '/js/main.js',
//   '/js/sw.js'
// ]
//
// // call install event
// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches
//     .open(cacheName)
//     .then(cache => {
//       console.log('serviceWorker: caching files');
//       cache.addAll(cacheAssets);
//     })
//     .then(() => self.skipWaiting())
//   );
// });
// //call activate event
// self.addEventListener('activate', e => {
//   console.log('serviceWorker: activated');
//   //remove unwanted caches
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cache => {
//           if (cache !== cacheName) {
//             console.log('serviceWorker: clearing old cache');
//             return caches.delete(cache);
//
//           }
//         })
//       );
//     })
//   );
// });
// // call fetch event
// self.addEventListener('fetch', e => {
//   console.log('serviceWorker: fetching');
//   //check if the live site is live otherwise yous the cache to look for the requested file
//   e.respondWith(
//     fetch(e.request).catch(() => caches.match(e.request))
//   );
// });
