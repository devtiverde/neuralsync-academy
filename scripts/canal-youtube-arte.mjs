/**
 * canal-youtube-arte.mjs — gera a arte do canal do YouTube do NeuralSync.
 *
 * Sai em `E:\DEV\neuralsync-canal-youtube\`:
 *   avatar-800.png            800 × 800    (foto do canal)
 *   banner-2560x1440.png      2560 × 1440  (arte do canal / banner)
 *   banner-conferencia.png    2560 × 1440  com a área segura marcada, SÓ para conferir
 *
 * Mesma técnica do `nix-export.mjs`: o Nix só existe como CSS, então quem rasteriza é o
 * navegador. Aqui ele é desenhado direto na arte — o porquê está junto do `NIX_CSS`.
 *
 * 🪤 A fonte da marca (Fredoka One) NÃO está instalada nesta máquina e o navegador do Playwright
 * não alcança o Google Fonts. Ela é baixada pelo Node e embutida em base64 — e o script CONFERE
 * se carregou mesmo, abortando se caiu em substituta. Banner com a fonte trocada passa
 * despercebido e vira a cara do canal.
 *
 * Rodar: node scripts/canal-youtube-arte.mjs
 */
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SAIDA = 'E:/DEV/neuralsync-canal-youtube'

// Paleta da marca — igual à do app e à do kit do Nix.
const VIOLETA   = '#7C3AED'
const VIOLETA_2 = '#a78bfa'
const CIANO     = '#06B6D4'
const DOURADO   = '#FBBF24'
const ESPACO    = '#0A0415'
const ESPACO_2  = '#1a0a3e'

// Banner do YouTube: a arte é 2560×1440, mas só 1546×423 no centro aparece em TODO aparelho.
// Nada essencial pode sair dessa caixa.
const BANNER_L = 2560
const BANNER_A = 1440
const SEGURA_L = 1546
const SEGURA_A = 423

// O Nix é DESENHADO aqui, não trazido dos PNGs de `neuralsync-nix-assets`.
//
// Aqueles PNGs têm o brilho embutido — e o `nix-export.html` recorta a `.stage` de 600px
// enquanto o `.glow` mede 840px (`inset:-120px`). O gradiente é cortado no meio do caminho,
// então os cantos do PNG saem opacos: sobre fundo claro ninguém nota, sobre o espaço escuro
// do banner vira um QUADRADO claro atrás do mascote. Redesenhar sai mais barato que remendar
// o PNG, e o brilho de verdade quem faz é o fundo da própria arte.
//
// O CSS abaixo é o mesmo do `scripts/nix-export.html`, sem o `.glow`.
const NIX_CSS = `
  .nix-caixa { position:relative; flex-shrink:0; }
  .stage { position:absolute; left:0; top:0; width:600px; height:600px; transform-origin:0 0;
           filter: drop-shadow(0 24px 70px rgba(6,182,212,.45)); }
  .corpo { position:absolute; inset:0;
           border-radius:42% 58% 55% 45% / 48% 42% 58% 52%;
           background:linear-gradient(150deg, #67e8f9 0%, #7C3AED 55%, #7C3AED 100%);
           box-shadow: inset -54px -54px 120px rgba(76,29,149,.5),
                       inset 42px 42px 96px rgba(255,255,255,.35); }
  .rosto { position:absolute; inset:0; display:flex; flex-direction:column;
           align-items:center; justify-content:center; gap:30px; }
  .olhos { display:flex; gap:78px; }
  .olho  { width:48px; height:66px; background:#1b0b33; border-radius:50%; }
  .boca  { width:90px; height:45px; border-radius:0 0 90px 90px;
           border:18px solid #1b0b33; border-top:none; box-sizing:border-box; }
  .boca.pequena { border-width:12px; }
  .fagulha { position:absolute; border-radius:50%; }
  .fagulha.ouro  { width:36px; height:36px; top:6%;  right:8%; background:#FBBF24; }
  .fagulha.ciano { width:30px; height:30px; top:55%; right:2%; background:#67e8f9; }
`

function nixInline(pose, px) {
  const boca = pose === 'cheer' ? '<div class="boca"></div>' : '<div class="boca pequena"></div>'
  const fagulhas = pose === 'cheer'
    ? ''
    : '<div class="fagulha ouro"></div><div class="fagulha ciano"></div>'
  return `
    <div class="nix-caixa" style="width:${px}px;height:${px}px">
      <div class="stage" style="transform:scale(${(px / 600).toFixed(4)})">
        <div class="corpo"></div>
        <div class="rosto">
          <div class="olhos"><div class="olho"></div><div class="olho"></div></div>
          ${boca}
        </div>
        ${fagulhas}
      </div>
    </div>`
}

// As fontes são BAIXADAS pelo Node e embutidas em base64, em vez de referenciadas por <link>.
// O navegador do Playwright não alcança o Google Fonts nesta máquina — e o modo silencioso da
// falha é o pior possível: a página renderiza numa fonte substituta sem avisar nada.
// Baixando aqui, ou vem a fonte certa ou o script quebra na cara.
const CACHE_FONTES = 'E:/DEV/neuralsync-canal-youtube/.fontes'

async function baixarFonte(familia, arquivo) {
  const local = join(CACHE_FONTES, arquivo)
  if (existsSync(local)) return readFileSync(local)

  // O `css2` devolve woff2 só quando o User-Agent é de navegador moderno; sem isso vem TTF.
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${familia}`, {
    headers: { 'User-Agent': ua },
  })).text()

  // O css2 devolve um @font-face por subconjunto (cyrillic, greek, latin-ext, latin...) e o
  // PRIMEIRO quase nunca é o latino. Pegar o primeiro url que aparecer traz uma fonte de
  // 1 kB sem os nossos glifos — que renderiza em silêncio como substituta.
  // `U+0000-00FF` é a faixa do subconjunto latino básico — é ele que tem os nossos glifos.
  const blocos = css.split('@font-face').slice(1)
  const latino = blocos.find(b => b.includes('U+0000-00FF')) || blocos[blocos.length - 1]

  const url = latino.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1]
  if (!url) throw new Error(`Não achei o woff2 latino de ${familia} no CSS do Google Fonts.`)

  const bytes = Buffer.from(await (await fetch(url)).arrayBuffer())
  mkdirSync(CACHE_FONTES, { recursive: true })
  writeFileSync(local, bytes)
  return bytes
}

// Um arquivo por peso: pedir dois pesos numa URL só devolve dois @font-face e a extração
// pegaria apenas o primeiro — o outro peso viraria negrito sintético, que é falso e feio.
const fredoka     = await baixarFonte('Fredoka+One', 'fredoka-one.woff2')
const jakarta500  = await baixarFonte('Plus+Jakarta+Sans:wght@500', 'jakarta-500.woff2')
const jakarta700  = await baixarFonte('Plus+Jakarta+Sans:wght@700', 'jakarta-700.woff2')

const FONTES = `
<style>
  @font-face {
    font-family: "Fredoka One"; font-style: normal; font-weight: 400; font-display: block;
    src: url(data:font/woff2;base64,${fredoka.toString('base64')}) format("woff2");
  }
  @font-face {
    font-family: "Plus Jakarta Sans"; font-style: normal; font-weight: 500; font-display: block;
    src: url(data:font/woff2;base64,${jakarta500.toString('base64')}) format("woff2");
  }
  @font-face {
    font-family: "Plus Jakarta Sans"; font-style: normal; font-weight: 700; font-display: block;
    src: url(data:font/woff2;base64,${jakarta700.toString('base64')}) format("woff2");
  }
</style>
`

// Estrelas determinísticas: sem Math.random, senão cada geração sai diferente e não dá
// para comparar duas versões da arte.
function estrelas(quantidade, semente) {
  let s = semente
  const proximo = () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
  const partes = []
  for (let i = 0; i < quantidade; i++) {
    const x = (proximo() * 100).toFixed(2)
    const y = (proximo() * 100).toFixed(2)
    const r = (proximo() * 1.8 + 0.7).toFixed(2)
    const o = (proximo() * 0.5 + 0.18).toFixed(2)
    partes.push(
      `<div style="position:absolute;left:${x}%;top:${y}%;width:${r * 2}px;height:${r * 2}px;` +
      `border-radius:50%;background:#fff;opacity:${o}"></div>`
    )
  }
  return partes.join('')
}

const paginaAvatar = () => `
${FONTES}
<style>
  html, body { margin:0; padding:0; }
  ${NIX_CSS}
  .quadro {
    width:800px; height:800px; position:relative; overflow:hidden;
    background:
      radial-gradient(circle at 50% 44%, rgba(124,58,237,.55) 0%, rgba(124,58,237,0) 58%),
      radial-gradient(circle at 50% 50%, ${ESPACO_2} 0%, ${ESPACO} 78%);
  }
  .aro {
    position:absolute; inset:56px; border-radius:50%;
    border:3px solid rgba(167,139,250,.34);
    box-shadow: 0 0 90px rgba(124,58,237,.5) inset;
  }
  .nix-centro { position:absolute; left:50%; top:52%; transform:translate(-50%,-50%); }
</style>
<div class="quadro">
  ${estrelas(46, 20260803)}
  <div class="aro"></div>
  <div class="nix-centro">${nixInline('cheer', 460)}</div>
</div>
`

const paginaBanner = (comGuia) => `
${FONTES}
<style>
  html, body { margin:0; padding:0; }
  ${NIX_CSS}
  .quadro {
    width:${BANNER_L}px; height:${BANNER_A}px; position:relative; overflow:hidden;
    background:
      radial-gradient(ellipse 1500px 900px at 28% 50%, rgba(124,58,237,.42) 0%, rgba(124,58,237,0) 62%),
      radial-gradient(ellipse 1100px 700px at 76% 44%, rgba(6,182,212,.24) 0%, rgba(6,182,212,0) 60%),
      linear-gradient(135deg, ${ESPACO} 0%, ${ESPACO_2} 52%, ${ESPACO} 100%);
  }
  .segura {
    position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
    width:${SEGURA_L}px; height:${SEGURA_A}px;
    display:flex; align-items:center; gap:56px;
  }
  .guia {
    position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
    width:${SEGURA_L}px; height:${SEGURA_A}px;
    border:3px dashed rgba(251,191,36,.9); pointer-events:none;
  }
  .guia::after {
    content:"área segura 1546 × 423 — o que sai daqui some no celular";
    position:absolute; left:0; top:-42px; color:${DOURADO};
    font:700 24px "Plus Jakarta Sans", sans-serif; letter-spacing:.02em;
  }
  .texto { min-width:0; }
  .marca {
    font-family:"Fredoka One", cursive; font-size:106px; line-height:1;
    color:#fff; letter-spacing:-.012em; margin:0;
    text-shadow: 0 6px 40px rgba(124,58,237,.6);
  }
  .marca em { font-style:normal; color:${VIOLETA_2}; }
  .sub {
    font:700 27px "Plus Jakarta Sans", sans-serif; letter-spacing:.42em;
    text-transform:uppercase; color:${CIANO}; margin:16px 0 0;
  }
  .frase {
    font:500 33px "Plus Jakarta Sans", sans-serif; color:rgba(255,255,255,.8);
    margin:22px 0 0; letter-spacing:.004em;
  }
</style>
<div class="quadro">
  ${estrelas(150, 785412)}
  <div class="segura">
    ${nixInline('idle', 292)}
    <div class="texto">
      <p class="marca">Neural<em>Sync</em></p>
      <p class="sub">Academy</p>
      <p class="frase">Ciência e curiosidade para crianças de 4 a 15 anos</p>
    </div>
  </div>
  ${comGuia ? '<div class="guia"></div>' : ''}
</div>
`

async function render(navegador, html, largura, altura, arquivo) {
  const pagina = await navegador.newPage({
    viewport: { width: largura, height: altura },
    deviceScaleFactor: 1,
  })
  await pagina.setContent(html, { waitUntil: 'networkidle' })
  await pagina.evaluate(() => document.fonts.ready)

  // Conferir se a fonte da marca está mesmo valendo — se cair em substituta, a arte sai com
  // outra cara e ninguém percebe. É preciso PEDIR a carga antes de checar: o navegador só
  // baixa a fonte quando algum texto a usa, e o avatar não tem texto nenhum — checar direto
  // dava falso negativo justo na peça sem tipografia.
  const temFredoka = await pagina.evaluate(async () => {
    await document.fonts.load('400 100px "Fredoka One"')
    return document.fonts.check('400 100px "Fredoka One"')
  })
  if (!temFredoka) {
    await pagina.close()
    throw new Error(
      'A fonte "Fredoka One" NÃO carregou (sem rede?). Abortei: o banner sairia com fonte trocada.'
    )
  }

  const buffer = await pagina.screenshot({ type: 'png' })
  writeFileSync(join(SAIDA, arquivo), buffer)
  await pagina.close()
  console.log(`  ${arquivo.padEnd(26)} ${largura}×${altura}  ${(buffer.length / 1024).toFixed(0)} kB`)
}

mkdirSync(SAIDA, { recursive: true })

const navegador = await chromium.launch()
console.log(`\n  Arte do canal — saída em ${SAIDA}\n`)
await render(navegador, paginaAvatar(),      800,      800,      'avatar-800.png')
await render(navegador, paginaBanner(false), BANNER_L, BANNER_A, 'banner-2560x1440.png')
await render(navegador, paginaBanner(true),  BANNER_L, BANNER_A, 'banner-conferencia.png')
await navegador.close()

console.log('\n  Fonte da marca conferida em todas: Fredoka One carregou.\n')
