const CACHE = 'neuralsync-v4'
const PRECACHE = ['/manifest.webmanifest']

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)

  // Supabase e YouTube: sempre network
  if (url.hostname.includes('supabase') || url.hostname.includes('youtube')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
    return
  }

  // HTML (index.html, /): network-first para sempre pegar versão atualizada
  const isHTML = e.request.headers.get('accept')?.includes('text/html')
  if (isHTML || url.pathname === '/' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()))
          return res
        })
        .catch(() => caches.match(e.request))
    )
    return
  }

  // Assets com hash no nome (JS/CSS): cache-first, seguros porque hash muda com conteúdo
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()))
        return res
      })
      return cached || network
    })
  )
})
