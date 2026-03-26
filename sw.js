const CACHE_NAME = 'ant-freight-v2.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  // 必须包含所有远程 JS 库，否则断网无法计算和导出
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js',
  'https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js',
  'https://unpkg.com/jspdf-font-source-han-sans@1.0.0/dist/SourceHanSansCN-Normal.js',
  'https://unpkg.com/jspdf-font-montserrat@1.0.0/dist/Montserrat-Regular.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 核心：拦截所有请求，没网也从缓存拿
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
