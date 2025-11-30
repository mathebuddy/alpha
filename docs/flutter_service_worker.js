'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "a5d32ced342b571a7bc1f21bc2831179",
"version.json": "a304a7e570a39fbeb8e8e4ebf1026c53",
"index.html": "49f84ad11d1a02ca7043bae47cf817fb",
"/": "49f84ad11d1a02ca7043bae47cf817fb",
"main.dart.js": "898faab5e392e7ce83728a62a3ec96cc",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "57636d4e34335a64ce9af295bcb06c1b",
"logo.png": "5244282b4556da033d86dd0c8d14bd49",
"icons/Icon-192.png": "36b1e294fb6b5382f7cca170b0706b1f",
"icons/Icon-maskable-192.png": "36b1e294fb6b5382f7cca170b0706b1f",
"icons/Icon-maskable-512.png": "80a63e82edf6feb8d45e13b007ed275b",
"icons/Icon-512.png": "80a63e82edf6feb8d45e13b007ed275b",
"manifest.json": "0b8cdf6696761a827099227e842c5a1e",
"assets/AssetManifest.json": "c434d49b33ed81fef4348a0e9a960f9e",
"assets/NOTICES": "e7a7480631938f26dfdbcc1987c4bda9",
"assets/FontManifest.json": "27e106c9cb46b5c2f9296186faf614df",
"assets/AssetManifest.bin.json": "5a63e010e8d8b3082cfb4a05f79a6a3b",
"assets/packages/material_design_icons_flutter/lib/fonts/materialdesignicons-webfont.ttf": "d10ac4ee5ebe8c8fff90505150ba2a76",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "3a7a66e79b11d13d393378228bc73022",
"assets/fonts/RobotoMono-Regular.ttf": "7e173cf37bb8221ac504ceab2acfb195",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/bundle-smoke.json": "6291f0ce63d4cc47dea05167dbc8a937",
"assets/assets/bundle-alpha.json": "c07c46ee66f5a9b1c36c5b0b840cbe2f",
"assets/assets/bundle-websim.json": "f25cba4878019bb905eb0ec25e282452",
"assets/assets/sfx/pass.wav": "129360b222e81e7f3a729f9c74f091aa",
"assets/assets/sfx/fail.wav": "0cdedbf7dc520334c5d530ed01264e28",
"assets/assets/img/logo-white-bg.png": "18749b40a83c7c29b3e38c9b2da534a9",
"assets/assets/img/logoSmall.png": "82b9a45f27b91939b785cfba21a32f2a",
"assets/assets/img/logo-large-no-text.png": "1d30cfcfc57d39de341d0ffb659e5b6a",
"assets/assets/img/logo-large-en.png": "b7db5cfa2e0b36c5f3af60502680c381",
"assets/assets/img/background.jpg": "9b4590e4b049fc229ab425905d9547df",
"assets/assets/img/logo-appstore.png": "2b2e2a4033d51525f9ef46701a22e91a",
"assets/assets/img/logo-large-de.png": "d6f3bc08d9e46df2395fea58876b7132",
"assets/assets/img/logo.png": "5244282b4556da033d86dd0c8d14bd49",
"assets/assets/img/logo-android-foreground.png": "d414afd55be90d94d42d984a9b30a514",
"assets/assets/img/go.svg": "eb02c1c49ceadcf83dc731aabe8aa55b",
"assets/assets/img/logo-institutes.png": "641fb36e4a79fe9144fcc67755e0c0d4",
"assets/assets/bundle-debug.json": "870f56a0af63b7c8498963d34c5649e8",
"assets/assets/bundle-bochum.json": "fe81676c57680ef46ef78d598176419f",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
