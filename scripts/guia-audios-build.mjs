// Monta o guia de gravação de áudios (HTML auto-contido, fontes em base64).
// Rodar: node scripts/guia-audios-build.mjs
// Saída: E:\DEV\guia-audios-narracao.html

import { readFileSync, writeFileSync } from 'fs'

const FONT_DIR = 'C:/Users/C#/AppData/Local/Temp/fonts-nix-kit'
const b64 = f => readFileSync(`${FONT_DIR}/${f}`).toString('base64')
const fredoka = b64('fredoka.woff2')
const jakarta = b64('jakarta.woff2')
const grotesk = b64('grotesk.woff2')

const storias = JSON.parse(readFileSync('E:/DEV/kids_storias_export.json', 'utf8'))

const LABEL = {
  dinossauros: 'Dinossauros', corpo_humano: 'Corpo Humano', animais: 'Animais',
  planeta_terra: 'Planeta Terra', esportes: 'Esportes', coracao: 'Coração',
  golfinhos: 'Golfinhos', vulcoes: 'Vulcões', tecnologia: 'Tecnologia',
  matematica: 'Matemática', arte: 'Arte', historia_brasil: 'História do Brasil',
  frutas: 'Frutas', fisica: 'Física', profissoes: 'Profissões',
  filosofia: 'Filosofia', formas_cores: 'Formas e Cores', transporte: 'Transporte',
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

let total = 0
const secoes = Object.entries(storias).map(([cat, h]) => {
  const linhas = h.cenas.map((c, i) => {
    total++
    const arquivo = `${cat}/${i + 1}.mp3`
    const id = `${cat}-${i + 1}`
    return `
      <div class="linha" data-id="${id}">
        <input type="checkbox" class="chk" id="c-${id}" aria-label="Marcar ${esc(arquivo)} como gravado">
        <div class="linha-corpo">
          <div class="linha-topo">
            <code class="arquivo">${esc(arquivo)}</code>
            <span class="cena">${esc(c.emoji || '')} ${esc(c.scene || `Cena ${i + 1}`)} — ${esc(c.titulo || '')}</span>
          </div>
          <p class="texto" id="t-${id}">${esc(c.texto)}</p>
          <button class="copiar" data-alvo="t-${id}">Copiar texto</button>
        </div>
      </div>`
  }).join('')

  return `
    <section class="historia" id="h-${cat}">
      <header class="historia-cab">
        <h3>${esc(LABEL[cat] || cat)}</h3>
        <p class="historia-titulo">${esc(h.titulo)}</p>
        <span class="contador" data-cat="${cat}">0/${h.cenas.length}</span>
      </header>
      ${linhas}
    </section>`
}).join('')

const html = `<title>Guia de gravação — Narrações Kids TV | NeuralSync</title>
<style>
  @font-face{font-family:'Fredoka';src:url(data:font/woff2;base64,${fredoka}) format('woff2');font-display:swap}
  @font-face{font-family:'Jakarta';src:url(data:font/woff2;base64,${jakarta}) format('woff2');font-display:swap}
  @font-face{font-family:'Grotesk';src:url(data:font/woff2;base64,${grotesk}) format('woff2');font-display:swap}

  :root{
    --ground:#0f0a1e; --surface:#1a1030; --surface-2:#241640;
    --line:#33265c; --text:#f2effa; --soft:#a89ec4;
    --violet:#8b5cf6; --violet-strong:#7C3AED; --cyan:#22d3ee; --amber:#fbbf24;
  }
  @media (prefers-color-scheme:light){
    :root{--ground:#faf8ff;--surface:#fff;--surface-2:#f3efff;--line:#e2daf5;
      --text:#1a1030;--soft:#6b5f8c;--violet:#7C3AED;--violet-strong:#6d28d9;--cyan:#0891b2;--amber:#b45309}
  }
  :root[data-theme="dark"]{--ground:#0f0a1e;--surface:#1a1030;--surface-2:#241640;--line:#33265c;
    --text:#f2effa;--soft:#a89ec4;--violet:#8b5cf6;--violet-strong:#7C3AED;--cyan:#22d3ee;--amber:#fbbf24}
  :root[data-theme="light"]{--ground:#faf8ff;--surface:#fff;--surface-2:#f3efff;--line:#e2daf5;
    --text:#1a1030;--soft:#6b5f8c;--violet:#7C3AED;--violet-strong:#6d28d9;--cyan:#0891b2;--amber:#b45309}

  body{background:var(--ground);color:var(--text);font-family:'Jakarta',system-ui,sans-serif;
    line-height:1.6;margin:0;padding:0 20px 80px}
  .wrap{max-width:820px;margin:0 auto}

  header.topo{padding:48px 0 32px;border-bottom:1px solid var(--line)}
  .eyebrow{font-family:'Grotesk',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;
    color:var(--violet);margin:0 0 12px}
  h1{font-family:'Fredoka',sans-serif;font-size:clamp(28px,5vw,42px);line-height:1.15;margin:0 0 12px;
    text-wrap:balance;font-weight:400}
  .sub{color:var(--soft);font-size:17px;max-width:62ch;margin:0}

  .barra{position:sticky;top:0;z-index:10;background:var(--ground);border-bottom:1px solid var(--line);
    padding:14px 0;margin-bottom:8px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .prog-track{flex:1;min-width:160px;height:8px;background:var(--surface-2);border-radius:99px;overflow:hidden}
  .prog-fill{height:100%;width:0;background:linear-gradient(90deg,var(--violet-strong),var(--cyan));
    border-radius:99px;transition:width .35s ease}
  .prog-num{font-family:'Grotesk',monospace;font-variant-numeric:tabular-nums;font-size:14px;
    font-weight:700;color:var(--text)}
  .reset{background:none;border:1px solid var(--line);color:var(--soft);border-radius:8px;
    padding:6px 12px;font-size:12px;cursor:pointer;font-family:'Jakarta',sans-serif}
  .reset:hover{border-color:var(--violet);color:var(--violet)}

  h2{font-family:'Fredoka',sans-serif;font-weight:400;font-size:24px;margin:48px 0 16px}

  ol.passos{padding-left:0;list-style:none;counter-reset:p;display:flex;flex-direction:column;gap:14px;margin:0}
  ol.passos li{counter-increment:p;display:flex;gap:14px;background:var(--surface);border:1px solid var(--line);
    border-radius:12px;padding:16px 18px}
  ol.passos li::before{content:counter(p);font-family:'Grotesk',monospace;font-weight:700;font-size:13px;
    color:var(--violet);background:var(--surface-2);width:26px;height:26px;border-radius:7px;
    display:grid;place-items:center;flex-shrink:0}
  ol.passos p{margin:0}
  ol.passos strong{color:var(--text)}

  .aviso{background:var(--surface-2);border-left:3px solid var(--amber);border-radius:0 10px 10px 0;
    padding:16px 18px;margin:24px 0;color:var(--soft);font-size:15px}
  .aviso strong{color:var(--text)}

  .historia{margin:32px 0;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden}
  .historia-cab{padding:18px 20px;background:var(--surface-2);display:flex;align-items:baseline;
    gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--line)}
  .historia-cab h3{font-family:'Fredoka',sans-serif;font-weight:400;font-size:19px;margin:0}
  .historia-titulo{color:var(--soft);font-size:14px;font-style:italic;margin:0;flex:1}
  .contador{font-family:'Grotesk',monospace;font-variant-numeric:tabular-nums;font-size:12px;
    font-weight:700;color:var(--soft);background:var(--ground);padding:3px 9px;border-radius:99px}
  .contador.completo{color:var(--cyan)}

  .linha{display:flex;gap:14px;padding:18px 20px;border-top:1px solid var(--line)}
  .linha:first-of-type{border-top:none}
  .linha.feito{opacity:.5}
  .chk{width:19px;height:19px;accent-color:var(--violet-strong);flex-shrink:0;margin-top:3px;cursor:pointer}
  .linha-corpo{flex:1;min-width:0}
  .linha-topo{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin-bottom:8px}
  .arquivo{font-family:'Grotesk',monospace;font-size:13px;font-weight:700;color:var(--cyan);
    background:var(--ground);padding:3px 8px;border-radius:6px}
  .cena{font-size:13px;color:var(--soft)}
  .texto{margin:0 0 10px;font-size:15.5px;max-width:64ch}
  .copiar{background:none;border:1px solid var(--line);color:var(--soft);border-radius:8px;
    padding:5px 12px;font-size:12.5px;cursor:pointer;font-family:'Jakarta',sans-serif}
  .copiar:hover{border-color:var(--violet);color:var(--violet)}
  .copiar.ok{border-color:var(--cyan);color:var(--cyan)}

  :focus-visible{outline:2px solid var(--violet);outline-offset:2px;border-radius:4px}
  @media (prefers-reduced-motion:reduce){*{transition:none!important}}
  @media (max-width:600px){.linha{padding:16px 14px}.historia-cab{padding:16px 14px}}
</style>

<div class="wrap">
  <header class="topo">
    <p class="eyebrow">NeuralSync Academy · Produção de áudio</p>
    <h1>Narrações das histórias do Kids TV</h1>
    <p class="sub">São ${total} áudios, um para cada cena das 18 histórias. Cada bloco abaixo traz o
    nome exato do arquivo e o texto que deve ser narrado. Seu progresso fica salvo neste navegador.</p>
  </header>

  <div class="barra">
    <span class="prog-num" id="prog-num">0 / ${total}</span>
    <div class="prog-track"><div class="prog-fill" id="prog-fill"></div></div>
    <button class="reset" id="reset">Limpar progresso</button>
  </div>

  <h2>Como gerar cada áudio</h2>
  <ol class="passos">
    <li><p>Abra o <strong>painel administrativo da GoTo</strong> e vá até a ferramenta de geração de
      áudio da URA (a mesma usada para as mensagens da telefonia).</p></li>
    <li><p>Clique em <strong>Copiar texto</strong> no item que for gravar e cole no campo de texto
      da ferramenta.</p></li>
    <li><p>Gere o áudio e <strong>ouça antes de baixar</strong>. Se algum nome próprio sair com
      pronúncia estranha, tente escrever foneticamente (ex.: escrever <em>"Zito"</em> como
      <em>"Zíto"</em>) até soar natural.</p></li>
    <li><p>Baixe o arquivo e <strong>renomeie exatamente</strong> como está no rótulo azul —
      incluindo a pasta. Exemplo: o arquivo <code class="arquivo">dinossauros/1.mp3</code> deve ficar
      dentro de uma pasta chamada <code class="arquivo">dinossauros</code>.</p></li>
    <li><p>Marque a caixinha do item. Quando terminar uma história inteira, pode mandar a pasta —
      não precisa esperar as 18 ficarem prontas.</p></li>
  </ol>

  <div class="aviso">
    <strong>Formato:</strong> MP3, uma cena por arquivo. Não junte duas cenas no mesmo áudio —
    o app toca cada cena separadamente conforme a criança avança na história.
  </div>

  <h2>Os ${total} áudios</h2>
  ${secoes}
</div>

<script>
  const KEY = 'ns_guia_audios_narracao'
  const salvos = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
  const caixas = [...document.querySelectorAll('.chk')]

  function persistir() {
    const marcados = caixas.filter(c => c.checked).map(c => c.closest('.linha').dataset.id)
    localStorage.setItem(KEY, JSON.stringify(marcados))
  }

  function pintar() {
    const feitos = caixas.filter(c => c.checked).length
    document.getElementById('prog-num').textContent = feitos + ' / ' + caixas.length
    document.getElementById('prog-fill').style.width = (feitos / caixas.length * 100) + '%'
    for (const c of caixas) c.closest('.linha').classList.toggle('feito', c.checked)
    for (const cont of document.querySelectorAll('.contador')) {
      const sec = cont.closest('.historia')
      const cs = [...sec.querySelectorAll('.chk')]
      const n = cs.filter(c => c.checked).length
      cont.textContent = n + '/' + cs.length
      cont.classList.toggle('completo', n === cs.length)
    }
  }

  for (const c of caixas) {
    if (salvos.has(c.closest('.linha').dataset.id)) c.checked = true
    c.addEventListener('change', () => { persistir(); pintar() })
  }

  for (const btn of document.querySelectorAll('.copiar')) {
    btn.addEventListener('click', async () => {
      const texto = document.getElementById(btn.dataset.alvo).textContent
      try { await navigator.clipboard.writeText(texto) } catch { return }
      const antes = btn.textContent
      btn.textContent = 'Copiado'
      btn.classList.add('ok')
      setTimeout(() => { btn.textContent = antes; btn.classList.remove('ok') }, 1600)
    })
  }

  document.getElementById('reset').addEventListener('click', () => {
    if (!confirm('Desmarcar todos os itens?')) return
    for (const c of caixas) c.checked = false
    persistir(); pintar()
  })

  pintar()
</script>`

writeFileSync('E:/DEV/guia-audios-narracao.html', html)
console.log(`Guia gerado: E:/DEV/guia-audios-narracao.html (${total} áudios, ${(html.length / 1024).toFixed(0)} KB)`)
