self.__WB_DISABLE_DEV_LOGS = true;

// Increment this version to invalidate cache and force clients to refetch all assets
const CACHE_VERSION = "v1";

const cacheName = `sw-cache-${CACHE_VERSION}`;

const cacheFirstWithoutHashFileTypes = [
  ".ttf",
  ".woff",
  ".woff2",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
];

const HASH_REGEX = /-.{8}\.[a-zA-Z0-9]+$/;

const isCacheFirstWithHash = filename => HASH_REGEX.test(filename);

const isCacheFirstWithoutHash = filename =>
  cacheFirstWithoutHashFileTypes.some(fileType =>
    filename.toLowerCase().endsWith(fileType.toLowerCase()),
  );

const isCacheFirstRequest = request => {
  const { url } = request;
  if (isCacheFirstWithoutHash(url)) return true;
  if (isCacheFirstWithHash(url)) return true;
  return false;
};

const getFromCache = async request => {
  const cache = await caches.open(cacheName);
  return await cache.match(request, { ignoreVary: true });
};

const fetchAndCacheResponse = async request => {
  const res = await fetch(request);
  if (request.method !== "GET" || !res?.ok) return res;
  const resClone = res.clone();
  // To avoid delaying response, do not await async cache write
  caches.open(cacheName).then(cache => cache.put(request, resClone));
  return res;
};

const cacheFirstStrategy = async request => {
  try {
    const res = await getFromCache(request);
    if (!res) throw new Error(`Cache miss for ${request.url}`);
    return res;
  } catch (_error) {
    return await fetchAndCacheResponse(request);
  }
};

const networkFirstStrategy = async request => {
  try {
    return await fetchAndCacheResponse(request);
  } catch (_error) {
    return await getFromCache(request);
  }
};

const deleteOldCaches = async newCacheName => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.filter(name => name !== newCacheName).map(name => caches.delete(name)),
  );
};

const handleFetchRequest = async request => {
  if (isCacheFirstRequest(request)) return await cacheFirstStrategy(request);
  const res = await networkFirstStrategy(request);
  if (!res || !res.ok) throw new Error(`Failed to fetch ${request.url}`);
  return res;
};

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      deleteOldCaches(cacheName),
      self.clients.claim(),
      self.registration.navigationPreload?.enable(),
    ]),
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(handleFetchRequest(event.request));
});
