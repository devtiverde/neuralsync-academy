const CACHE = 'neuralsync-v6'
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

  // 🔴 SÓ MEXEMOS NO QUE É NOSSO.
  //
  // Pedido para outra origem — Google Fonts, Supabase, YouTube, qualquer terceiro — sai daqui
  // sem ser tocado: `return` sem `respondWith` devolve o pedido ao navegador, que sabe fazer
  // isso melhor do que nós.
  //
  // Isto é a correção de um bug real (08/08/2026): o `fetch` daqui atendia TAMBÉM o que era de
  // terceiro, e a fonte da marca (Fredoka One, em fonts.gstatic.com) passou a falhar com
  // net::ERR_FAILED sempre que esta página estava sob controle do Service Worker. Como
  // `--ns-font-display` terminava em `cursive`, o iPhone desenhava a interface inteira em letra
  // MANUSCRITA — títulos dos cards, tela de erro, tudo. Medido: 0 de 6 visitas limpas traziam a
  // fonte com o SW ligado, e 6 de 6 traziam com ele desligado.
  //
  // 🪤 O defeito é antigo (o arquivo não muda desde 19/06) e ficou escondido enquanto o próprio
  // cache HTTP do navegador tinha a fonte guardada. Quando essa cópia expira ou é descartada,
  // todo pedido passa a vir para cá — e aí quebra "do nada", sem nada ter sido publicado.
  //
  // Interceptar terceiro não trazia benefício nenhum: nada disso era cacheável de qualquer jeito.
  if (url.origin !== self.location.origin) return

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
