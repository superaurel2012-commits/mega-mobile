
const CACHE="mega-mobile-1792093005386",FILES=["./.nojekyll","./apple-touch-icon.png","./assets/index-B6U_kSba.js","./assets/index-DEngg5Jb.css","./assets/index-o3goKA7h.js","./assets/ort-local.wasm.gz","./assets/pdf-ByGOPXT8.js","./assets/pdf.worker.min-wgc6bjNh.mjs","./assets/text-worker-C3Z5Hquv.js","./assets/vision-worker-BYteRJxO.js","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest","./runtime/ort-wasm-simd-threaded.jsep.mjs","./runtime/paths.json","./THIRD_PARTY_NOTICES.txt"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mega-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith((async()=>{const cached=await caches.match(e.request);if(cached)return cached;try{return await fetch(e.request);}catch{return e.request.mode==='navigate'?(await caches.match('./index.html'))||Response.error():Response.error();}})());
});