declare const self: ServiceWorkerGlobalScope & {
  __WB_DISABLE_DEV_LOGS: boolean;
  __WB_MANIFEST: { url: string }[];
};
self.__WB_DISABLE_DEV_LOGS = true;

const manifest = self.__WB_MANIFEST;

const urlsToPrecache = ["/", ...(manifest ?? []).map(({ url }) => url)];

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
  ".ico",
  ".svg",
];

const HASH_REGEX = /~.{8}\.[a-zA-Z0-9]+$/;

const isCacheFirstWithHash = (filename: string) => HASH_REGEX.test(filename);

const isCacheFirstWithoutHash = (filename: string) =>
  cacheFirstWithoutHashFileTypes.some(fileType =>
    filename.toLowerCase().endsWith(fileType.toLowerCase()),
  );

const isCacheFirstRequest = (request: Request) => {
  const { pathname } = new URL(request.url);
  if (isCacheFirstWithoutHash(pathname)) return true;
  if (isCacheFirstWithHash(pathname)) return true;
  return false;
};

const getFromCache = async (request: Request | string) => {
  const cache = await caches.open(cacheName);
  return await cache.match(request, { ignoreVary: true });
};

const isSafeToCache = (res: Response) => {
  if (res.status === 206 || res.type === "opaque" || res.type === "opaqueredirect") return false;
  if (/no-store/i.test(res.headers.get("cache-control") ?? "")) return false;
  return true;
};

const cacheResponse = (request: Request, res: Response) => {
  if (request.method === "GET" && res.ok && isSafeToCache(res)) {
    caches
      .open(cacheName)
      .then(cache => cache.put(request, res.clone()))
      .catch(error => console.error(`SW cache write failed for ${request.url}`, error));
  }
  return res;
};

const fetchAndCacheResponse = async (request: Request) =>
  cacheResponse(request, await fetch(request));

const cacheFirstStrategy = async (request: Request) => {
  try {
    const res = await getFromCache(request);
    if (!res) throw new Error(`Cache miss for ${request.url}`);
    return res;
  } catch (_error) {
    return await fetchAndCacheResponse(request);
  }
};

const networkFirstStrategy = async (request: Request) => {
  try {
    return await fetchAndCacheResponse(request);
  } catch (_error) {
    return await getFromCache(request);
  }
};

const precacheUrls = async (urlsToPrecache: string[]) => {
  const cache = await caches.open(cacheName);
  // Settle individually so one missing/failed asset doesn't abort precaching for everything else
  const results = await Promise.allSettled(urlsToPrecache.map(url => cache.add(url)));
  for (const [i, result] of results.entries()) {
    if (result.status === "rejected")
      console.error(`SW precache failed for ${urlsToPrecache[i]}`, result.reason);
  }
};

const deleteOldCaches = async (newCacheName: string) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.filter(name => name !== newCacheName).map(name => caches.delete(name)),
  );
};

const handleFetchRequest = async (event: FetchEvent) => {
  const { request } = event;
  if (isCacheFirstRequest(request)) return await cacheFirstStrategy(request);

  if (request.mode === "navigate") {
    const preloadRes = await event.preloadResponse;
    if (preloadRes) return cacheResponse(request, preloadRes);
  }

  const res = await networkFirstStrategy(request);
  if (res) return res;

  // Offline with no exact cache match — for navigations, fall back to the precached app shell
  // so client-side routing can still boot instead of surfacing a raw network error.
  if (request.mode === "navigate") {
    const shell = await getFromCache("/");
    if (shell) return shell;
  }

  return Response.error();
};

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(precacheUrls(urlsToPrecache));
});

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
  const { request } = event;
  const { origin, pathname } = new URL(request.url);
  if (origin !== self.location.origin) return;
  if (pathname.startsWith("/api/") || pathname.startsWith("/socket.io/")) return;
  event.respondWith(handleFetchRequest(event));
});
