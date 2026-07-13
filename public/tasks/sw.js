/* Tasks mobile — offline app shell.
   Install caches only same-origin assets so a cross-origin CDN fetch can't
   fail the install; the fetch handler caches everything else opportunistically. */
const CACHE = "tasks-mobile-v2";
const CORE = [
  "/track",
  "/track/manifest.webmanifest",
  "/track/icon-192.png",
  "/track/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(CORE.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Network-first for page navigations / the HTML doc, so code updates
  // always reach the user; fall back to cache only when offline.
  const isDoc = req.mode === "navigate" ||
    req.destination === "document" ||
    req.url.includes("/track");
  if (isDoc) {
    e.respondWith(
      fetch(req).then((res) => {
        try { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } catch {}
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first for everything else (icons, assets).
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        try {
          if (res && (res.ok || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
        } catch {}
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
