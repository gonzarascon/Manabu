/**
 * DOCS:
 * https://developers.google.com/web/tools/workbox/guides/common-recipes
 * https://www.npmjs.com/package/next-offline
 */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js',
);

const PRECACHE_FILES = [
  //STYLES
  '/static/main.css',
];

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉');

  // PreCache
  workbox.precaching.precacheAndRoute(PRECACHE_FILES);

  // Google Analytics
  workbox.googleAnalytics.initialize();

  // Cache CSS & JS
  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate(),
  );

  // Cache Images
  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg', '|jpeg', '|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
}
