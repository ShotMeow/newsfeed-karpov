// @ts-ignore
const _self = self as unknown as ServiceWorkerGlobalScope;

const date = new Date();
const firstJan = new Date(date.getFullYear(), 0, 1);
const version = [
  'v',
  date.getFullYear(),
  Math.floor((date.getTime() - firstJan.getTime()) / (1000 * 60 * 60 * 24 * 7)),
].join('.');
const cachePrefix = 'newsfeed-cache';
const cacheName = cachePrefix + '_' + version;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

_self.addEventListener('install', (event) => {
  // eslint-disable-next-line no-console
  console.log('Installing [Service Worker]', event);

  _self.skipWaiting();

  // будем грузить данные для кеша только чер з5 сек после инстала, чтоюы не тратить сеть
  sleep(5000).then(() => {
    return caches.open(cacheName).then((cache) => {
      // console.log('[Service Worker] Precaching App Shell');
      return cache.addAll([
        '/',
        'https://frontend.karpovcourses.net/api/v3/ru/news',
        'https://frontend.karpovcourses.net/api/v3/ru/trends',
        'https://frontend.karpovcourses.net/api/v3/ru/news/6',
      ]);
    });
  });
});

_self.addEventListener('activate', function (event) {
  console.log('activating [Service Worker]', event);
  _self.clients.claim();
  event.waitUntil(
    caches.keys().then(function (keys) {
      // Remove caches whose name is no longer valid
      return Promise.all(
        keys
          .filter(function (key) {
            return key.startsWith(cachePrefix) && key !== cacheName;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
});

_self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  // console.log(url);
  const request = e.request;
  if (url.startsWith('http') && e.request.method === 'GET') {
    const isHtmlPageRequest =
      request.headers.get('Accept')?.indexOf('text/html') !== -1 && url.startsWith(_self.origin);
    const isCacheFirstRequest =
      !isHtmlPageRequest &&
      (request.headers.get('Accept')?.indexOf('image/') !== -1 ||
        (url.startsWith(_self.origin) && url.match(/(\.js|\.css)$/)) ||
        url.match(/\.woff.$/));

    const cacheKey = isHtmlPageRequest ? '/' : e.request;
    // console.log('SW fetch', url, isHtmlPageRequest, isImageRequest, request.headers.get('Accept'));
    e.respondWith(
      (async () => {
        if (isCacheFirstRequest) {
          const cacheResponse = await caches.match(cacheKey);
          if (cacheResponse) {
            // console.log(`[Service Worker] Return cache resource: ${url}`);
            return cacheResponse;
          }
        }

        try {
          const response = await fetch(e.request);
          const cache = await caches.open(cacheName);
          // console.log(`[Service Worker] Caching new resource: ${url}`);
          cache.put(cacheKey, response.clone());
          return response;
        } catch (e) {
          // do nothing
        }

        // OFFLINE
        const r = await caches.match(cacheKey);
        // console.log(`[Service Worker] Fetching resource: ${url}`);
        if (r) {
          // console.log(`[Service Worker] Return cache resource: ${url}`);
          return r;
        }
        return new Response('', {
          status: 404,
          statusText: 'Not Found',
        });
      })()
    );
  }
});
