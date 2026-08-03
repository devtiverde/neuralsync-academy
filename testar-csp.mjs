// Serve o `dist/` com a CSP do `public/_headers` VALENDO (não em modo relatório) e
// navega pelas telas coletando violações.
//
// POR QUE ISTO É NECESSÁRIO
// A CSP nasceu em Report-Only porque uma política errada quebra a produção inteira, e o
// próprio `_headers` manda validar em navegador antes de ligar. "Abrir o app e olhar o
// console" é o procedimento escrito lá — e é o tipo de conferência que se faz uma vez,
// numa tela só, e depois se declara pronta. Isto faz nas 20 telas, com a política real
// extraída do arquivo real, sobre o bundle de produção.
//
// ⚠️ Report-Only e enforcing dão os MESMOS relatórios de violação. O que muda é que aqui
// a violação realmente bloqueia — então uma tela que "só reportava" aparece quebrada.
//
// Uso:  npm run build && node testar-csp.mjs

import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'

const RAIZ = resolve('dist')
if (!existsSync(RAIZ)) {
  console.error('❌ Rode `npm run build` antes: não existe dist/')
  process.exit(1)
}

// Lê a política do arquivo de verdade. Copiar para cá daria o resultado de uma política
// que não é a publicada — exatamente o erro que este script existe para evitar.
const headers = readFileSync('public/_headers', 'utf8')
// 🪤 Pular comentário é obrigatório, não estética: o cabeçalho do arquivo EXPLICA como
// alternar entre `Content-Security-Policy-Report-Only:` e `Content-Security-Policy:`, e
// essas duas palavras dentro de um comentário casavam com a busca. A primeira versão
// deste script extraía a política de uma linha de instrução, testava aquele trecho sem
// sentido, não achava violação nenhuma e dizia "pode ligar". Falso positivo perfeito.
const linha = headers
  .split('\n')
  .find(l => !l.trimStart().startsWith('#') && /Content-Security-Policy(-Report-Only)?:\s*default-src/.test(l))
if (!linha) { console.error('❌ Não achei a diretiva de CSP em public/_headers'); process.exit(1) }
const POLITICA = linha.split(/Content-Security-Policy(?:-Report-Only)?:/)[1].trim()
const jaValendo = !/Content-Security-Policy-Report-Only:/.test(linha)

if (!POLITICA.startsWith('default-src')) {
  console.error('❌ A política extraída não começa em default-src — provavelmente veio da linha errada:')
  console.error('   ' + POLITICA.slice(0, 120))
  process.exit(1)
}

console.log(jaValendo ? '• A CSP já está valendo no _headers' : '• A CSP está em Report-Only; testando como se estivesse valendo')

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
}

const servidor = createServer(async (req, res) => {
  const caminho = decodeURIComponent(req.url.split('?')[0])
  let arquivo = join(RAIZ, caminho)
  // SPA: rota desconhecida cai no index, como o Cloudflare Pages faz
  if (!existsSync(arquivo) || !extname(arquivo)) arquivo = join(RAIZ, 'index.html')
  try {
    const conteudo = await readFile(arquivo)
    res.writeHead(200, {
      'Content-Type': MIME[extname(arquivo)] ?? 'application/octet-stream',
      'Content-Security-Policy': POLITICA,   // sempre VALENDO aqui, esse é o ponto
    })
    res.end(conteudo)
  } catch {
    res.writeHead(404); res.end('nao encontrado')
  }
})

await new Promise(r => servidor.listen(4599, r))
const BASE = 'http://localhost:4599'

const ROTAS = [
  '/', '/auth', '/planos', '/privacidade', '/termos', '/recuperar-senha',
  '/dashboard', '/timer', '/agenda', '/relatorio', '/relatorio-ia', '/notificacoes',
  '/trilha-pai', '/configuracoes', '/perfil-filho', '/primeiros-passos', '/feedbacks',
  '/home-crianca', '/trilha', '/ranking', '/loja', '/perfil-crianca', '/personalizar',
  '/coins', '/diario', '/digitacao', '/atividades-offline', '/kids', '/quiz-ia',
  '/ebook', '/bloqueio',
]

const navegador = await chromium.launch()
const contexto = await navegador.newContext({ viewport: { width: 1280, height: 900 } })
// `ns_dev_bypass` NÃO existe no bundle de produção (sai pelo import.meta.env.DEV), então
// as telas atrás de login vão redirecionar. Ainda assim vale visitá-las: o que se está
// medindo é o carregamento do app — bundle, fontes, worker, conexão com o Supabase —
// e isso acontece antes de qualquer redirecionamento.
const violacoes = new Map()

for (const rota of ROTAS) {
  const pagina = await contexto.newPage()
  pagina.on('console', m => {
    const t = m.text()
    if (!/Content Security Policy|Refused to/i.test(t)) return
    const chave = t.slice(0, 180)
    if (!violacoes.has(chave)) violacoes.set(chave, new Set())
    violacoes.get(chave).add(rota)
  })
  try {
    await pagina.goto(BASE + rota, { waitUntil: 'networkidle', timeout: 20000 })
    await pagina.waitForTimeout(700)
  } catch { /* rota que redireciona ou demora: as violações já foram capturadas */ }
  await pagina.close()
}

await navegador.close()
servidor.close()

if (violacoes.size === 0) {
  console.log(`\n✅ ${ROTAS.length} rotas, nenhuma violação de CSP.`)
  console.log(jaValendo
    ? '   A política já está bloqueando e nada quebrou no carregamento.'
    : '   Pode trocar `Content-Security-Policy-Report-Only:` por `Content-Security-Policy:`.')
  console.log('   ⚠️ Falta a passada logado (Kids TV com vídeo, atividade com áudio, Loja, um jogo):')
  console.log('      o bundle de produção não tem atalho de login, então essas telas redirecionam aqui.')
  process.exit(0)
}

console.log(`\n❌ ${violacoes.size} violação(ões) — NÃO ligar a CSP antes de resolver:\n`)
for (const [texto, rotas] of violacoes) {
  console.log('  •', texto)
  console.log('    em:', [...rotas].join(', '), '\n')
}
process.exit(1)
