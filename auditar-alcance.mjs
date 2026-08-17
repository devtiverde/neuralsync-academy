/**
 * Auditoria de ALCANCE: o que a criança precisa clicar está clicável?
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * POR QUE ESTE ARQUIVO EXISTE (o que os outros dois NÃO mediam)
 *
 * `auditar-telas.mjs`  → mede só a HORIZONTAL. Percorre os elementos procurando
 *   `r.right > largura`. Nunca olha `r.bottom`. Conteúdo cortado embaixo, que é
 *   o sintoma relatado ("nas últimas não chega até lá, a tela corta"), passava
 *   limpo pelas 32 telas nos 4 tamanhos.
 *
 * `auditar-atividades.mjs` → mede a vertical, mas:
 *   1. abre `/dev/atividade/:tipo` SEM `?id=`, ou seja **a primeira atividade de
 *      cada tipo**: 24 de 528. As outras 504 nunca foram abertas por auditoria
 *      nenhuma, e "24/24 passou" nunca disse nada sobre elas;
 *   2. guarda só o PIOR elemento cortado (`cortado`), então uma tela com 12
 *      botões inalcançáveis relata 1;
 *   3. considera alcançável qualquer coisa cujo ancestral tenha
 *      `overflow-y: auto` — sem conferir se esse ancestral REALMENTE rola
 *      (`scrollHeight > clientHeight`). O `auditar-telas` faz essa conferência
 *      na horizontal; aqui ela faltava. Contêiner com `auto` que não rola
 *      esconde conteúdo exatamente como `hidden`.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * COMO ESTE MEDE — tentar chegar, e então tentar acertar
 *
 * Modelar as regras de CSS para deduzir o que é alcançável é o caminho que já
 * produziu falso positivo em massa neste projeto (o `auditar-toque` acusou 20 de
 * 22 telas na 1ª rodada; o `auditar-colorir` reprovou 61 de 86). Então aqui não
 * se deduz nada: para cada controle, o teste
 *
 *   1. chama `scrollIntoView({ block: 'center' })` — se existe QUALQUER caminho
 *      de rolagem até ele, o próprio navegador o encontra;
 *   2. confere se o centro dele caiu dentro da janela;
 *   3. chama `document.elementFromPoint()` nesse centro e pergunta se quem está
 *      lá é o próprio controle ou um descendente dele.
 *
 * Isso pega, com uma medida só e sem lista de regras: conteúdo cortado por
 * `overflow: hidden`, contêiner com `auto` que não rola, elemento coberto por
 * modal/overlay invisível, e elemento fora do viewport sem rolagem que alcance.
 * É a mesma pergunta que o Playwright faz antes de clicar de verdade.
 *
 * 🔑 VALIDAÇÃO DO INSTRUMENTO — `--autoteste`
 * Antes de medir a plataforma, o script monta uma página sintética com 4 defeitos
 * conhecidos e 3 controles sadios, e **se recusa a rodar** se não reprovar os 4 e
 * aprovar os 3. Auditoria que aprova tudo não prova que está tudo certo; prova
 * que ela não mede. Rodar `--autoteste` sozinho para ver o instrumento se testar.
 *
 * Uso:
 *   node auditar-alcance.mjs --autoteste           valida só o instrumento
 *   node auditar-alcance.mjs <porta>               telas + atividades (tudo)
 *   node auditar-alcance.mjs <porta> --telas       só as telas
 *   node auditar-alcance.mjs <porta> --atividades  só as 528 atividades
 *   node auditar-alcance.mjs <porta> --rapido      só os 2 tamanhos críticos
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { prepararContexto, CRIANCA_TESTE } from './harness-teste.mjs'

const args = process.argv.slice(2)
const PORTA = args.find(a => /^\d+$/.test(a))
const SO_AUTOTESTE = args.includes('--autoteste')
const SO_TELAS = args.includes('--telas')
const SO_ATIVIDADES = args.includes('--atividades')
const RAPIDO = args.includes('--rapido')
const SAIDA = 'auditoria-alcance'

if (!PORTA && !SO_AUTOTESTE) {
  console.error('Falta a porta. Ex.: node auditar-alcance.mjs 5173')
  console.error('Ou:  node auditar-alcance.mjs --autoteste')
  process.exit(2)
}
const BASE = `http://localhost:${PORTA}`

const TELAS = RAPIDO
  ? [
      { nome: 'celular-p', largura: 360, altura: 640 },
      { nome: 'notebook', largura: 1366, altura: 768 },
    ]
  : [
      { nome: 'celular-p', largura: 360, altura: 640 },  // Android pequeno + barra do navegador
      { nome: 'celular', largura: 390, altura: 844 },
      { nome: 'tablet', largura: 820, altura: 1180 },
      { nome: 'janela', largura: 1100, altura: 720 },    // PC não maximizado
      { nome: 'notebook', largura: 1366, altura: 768 },
    ]

const ROTAS = [
  { rota: '/', nome: 'landing', area: 'publica' },
  { rota: '/auth', nome: 'login', area: 'publica' },
  { rota: '/planos', nome: 'planos', area: 'publica' },
  { rota: '/termos', nome: 'termos', area: 'publica' },
  { rota: '/privacidade', nome: 'privacidade', area: 'publica' },
  { rota: '/recuperar-senha', nome: 'recuperar', area: 'publica' },
  { rota: '/home-crianca', nome: 'home-crianca', area: 'crianca' },
  { rota: '/trilha', nome: 'trilha', area: 'crianca' },
  { rota: '/ranking', nome: 'ranking', area: 'crianca' },
  { rota: '/perfil-crianca', nome: 'perfil-crianca', area: 'crianca' },
  { rota: '/loja', nome: 'loja', area: 'crianca' },
  { rota: '/personalizar', nome: 'personalizar', area: 'crianca' },
  { rota: '/coins', nome: 'coins', area: 'crianca' },
  { rota: '/diario', nome: 'diario', area: 'crianca' },
  { rota: '/digitacao', nome: 'digitacao', area: 'crianca' },
  { rota: '/atividades-offline', nome: 'offline', area: 'crianca' },
  { rota: '/kids', nome: 'kids-tv', area: 'crianca' },
  { rota: '/kids/dinossauros', nome: 'kids-categoria', area: 'crianca' },
  { rota: '/ebook', nome: 'ebooks', area: 'crianca' },
  { rota: '/ebook/leitura?id=corpo-humano', nome: 'ebook-leitura', area: 'crianca' },
  { rota: '/quiz-ia', nome: 'quiz-ia-livre', area: 'crianca' },
  { rota: '/neural-ai', nome: 'neural-ai', area: 'crianca' },
  { rota: '/bloqueio', nome: 'bloqueio', area: 'crianca' },
  { rota: '/timer-ativo', nome: 'timer-ativo', area: 'crianca' },
  { rota: '/dashboard', nome: 'dashboard', area: 'pai' },
  { rota: '/timer', nome: 'timer', area: 'pai' },
  { rota: '/agenda', nome: 'agenda', area: 'pai' },
  { rota: '/notificacoes', nome: 'notificacoes', area: 'pai' },
  { rota: '/relatorio', nome: 'relatorio', area: 'pai' },
  { rota: '/relatorio-ia', nome: 'relatorio-ia', area: 'pai' },
  { rota: '/perfil-filho', nome: 'perfil-filho', area: 'pai' },
  { rota: '/trilha-pai', nome: 'trilha-pai', area: 'pai' },
  { rota: '/perfil-cognitivo', nome: 'perfil-cognitivo', area: 'pai' },
  { rota: '/questionario', nome: 'questionario', area: 'pai' },
  { rota: '/configuracoes', nome: 'configuracoes', area: 'pai' },
  { rota: '/primeiros-passos', nome: 'primeiros-passos', area: 'pai' },
  { rota: '/feedbacks', nome: 'feedbacks', area: 'pai' },
  { rota: '/ebook/leitura?id=tela-certa', nome: 'ebook-pais', area: 'pai' },
]

// Atividades que não vêm dos módulos de dados — montam o próprio conteúdo e só
// existem como rota. Entram pelo :tipo, sem `?id=`.
const TIPOS_AVULSOS = [
  'sequencia-magica', 'quebra-cabeca', 'caca-palavras', 'historia-interativa',
  'classificar-objetos', 'conectar-pontos', 'zona-emocoes',
]

// ─────────────────────────────────────────────────────────────────────────────
// A MEDIDA — roda dentro da página
// ─────────────────────────────────────────────────────────────────────────────
const MEDIR = `(${async function medirAlcance() {
  const SEL = [
    'button', 'a[href]', 'input', 'select', 'textarea',
    '[role=button]', '[role=tab]', '[role=link]', '[role=checkbox]',
    '[onclick]', '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  // 🪤 O MENU LATERAL FECHADO ESTAVA VIRANDO 2.000 ACHADOS. Ele existe em TODA tela, fica
  // em `translateX(-100%)` quando fechado, e seus ~14 itens caíam como "fora da janela" nas
  // 28 telas — o mesmo afogamento que a 1ª rodada do `auditar-toque` produziu em 02/08.
  //
  // O filtro NÃO é por nome (`nav`, `menu`): filtrar por nome esconderia bug de verdade na
  // barra, e a alça do próprio menu já foi um achado real (36×36 em 08/08). O filtro é pela
  // única coisa que decide de fato se o clique chega: `pointer-events`. O painel fechado usa
  // `pointer-events: none`, que herda para os filhos, então o navegador não entrega clique
  // ali de jeito nenhum — e a alça, que continua clicável, declara `auto` e permanece medida.
  // `elementFromPoint` já ignora camada com `pointer-events: none`, então "coberto por
  // overlay decorativo" continua sendo detectado normalmente.
  let inertes = 0
  const visivel = el => {
    const e = getComputedStyle(el)
    if (e.display === 'none' || e.visibility === 'hidden') return false
    if (parseFloat(e.opacity) === 0) return false
    // 🪤 `<details>` FECHADO mantém caixa de layout. Os 9 botões do laboratório de
    // `inv_musica_fisica` e os 7 de `inv_musica_tonalidade` mediam 149×48, passavam por
    // display/visibility/opacity e caíam como "coberto por outro elemento" — 16 achados que
    // eram só um acordeão fechado, que o usuário abre clicando no `<summary>`. Perguntar ao
    // NAVEGADOR com `checkVisibility` resolve a família inteira (details fechado,
    // `content-visibility`, `hidden=until-found`) sem lista de casos especiais.
    if (el.checkVisibility && !el.checkVisibility({
      contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true,
    })) return false
    if (e.pointerEvents === 'none' || el.closest('[inert]')) { inertes++; return false }
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  }

  const rotulo = el =>
    ((el.textContent || '').trim() ||
      el.getAttribute('aria-label') ||
      el.getAttribute('placeholder') ||
      el.getAttribute('title') ||
      el.tagName).slice(0, 45)

  const caminho = el => {
    const partes = []
    for (let p = el; p && p !== document.body && partes.length < 4; p = p.parentElement) {
      const cls = (typeof p.className === 'string' ? p.className : '').trim().split(/\s+/)[0]
      partes.unshift(p.tagName.toLowerCase() + (cls ? '.' + cls : ''))
    }
    return partes.join(' > ')
  }

  // Um controle dentro de outro (span clicável dentro do botão) mediria duas
  // vezes o mesmo alvo. Fica só o mais externo.
  const brutos = [...document.querySelectorAll(SEL)].filter(visivel)
  const alvos = brutos.filter(el => !brutos.some(o => o !== el && o.contains(el)))

  const inalcancaveis = []
  const cobertos = []

  // 🔑 A ARMADILHA QUE O AUTOTESTE PEGOU: `scrollIntoView` rola TAMBÉM contêiner com
  // `overflow: hidden`. Rolagem programática funciona ali; o dedo e a roda do mouse, não.
  // Confiar no `scrollIntoView` sozinho fazia o navegador "alcançar" o que a criança nunca
  // alcança, e a 1ª versão deste script aprovou os dois defeitos de corte por causa disso.
  // Então: anota a posição de rolagem de cada ancestral ANTES, e depois verifica QUEM
  // precisou se mexer. Se quem se mexeu não é rolável pelo usuário, o alcance foi ilegítimo.
  // 🪤 CONFERIR O EIXO QUE SE MEXEU, não só a vertical. A 1ª versão olhava apenas
  // `overflowY` e por isso acusou `.menu-bottom` — a barra inferior do celular, que é
  // `overflow-x: auto` com `overflow-y: hidden` de propósito. Ela rola com o dedo na
  // horizontal (é o padrão de chips scroláveis do projeto), e ainda assim entrou como
  // "o usuário não pode rolar" em 6 telas. Medida errada acusando tela certa.
  const podeRolarEixo = (p, eixo) => {
    if (p === document.documentElement || p === document.body) {
      const eb = getComputedStyle(document.body)
      const eh = getComputedStyle(document.documentElement)
      const prop = eixo === 'y' ? 'overflowY' : 'overflowX'
      return !['hidden', 'clip'].includes(eb[prop]) && !['hidden', 'clip'].includes(eh[prop])
    }
    const e = getComputedStyle(p)
    const prop = eixo === 'y' ? e.overflowY : e.overflowX
    return ['auto', 'scroll'].includes(prop) || ['auto', 'scroll'].includes(e.overflow)
  }

  // Acerta o clique na posição ATUAL, sem rolar nada?
  const acertaAgora = el => {
    const r = el.getBoundingClientRect()
    const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2)
    if (cy < 0 || cy > window.innerHeight || cx < 0 || cx > window.innerWidth) return false
    const noPonto = document.elementFromPoint(cx, cy)
    return !!noPonto && (el === noPonto || el.contains(noPonto))
  }

  for (const el of alvos) {
    // 🔑 ORDEM IMPORTA: perguntar PRIMEIRO se o alvo já está clicável onde está. A versão
    // anterior ia direto para o `scrollIntoView` e, se a rolagem tivesse sido ilegítima,
    // condenava o alvo — inclusive quando ele já estava perfeitamente clicável antes de
    // qualquer rolagem. Foi o que aconteceu com o "🚀 Começar Atividade" do /digitacao: o
    // centro dele está DENTRO da janela (só os 17px de baixo passam), o dedo acerta, e ele
    // aparecia como inalcançável. O corte de 211px naquela tela é real e continua sendo
    // relatado — mas como CONTEÚDO CORTADO, que é o que ele é, não como botão inacessível.
    if (acertaAgora(el)) continue

    const ancestrais = []
    for (let p = el.parentElement; p; p = p.parentElement) ancestrais.push(p)
    const antes = ancestrais.map(p => ({ p, top: p.scrollTop, left: p.scrollLeft }))
    const janelaAntes = { x: window.scrollX, y: window.scrollY }

    // 1. Deixar o navegador achar o caminho de rolagem, se existir algum.
    try { el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }) } catch { el.scrollIntoView() }

    // 2. Quem se mexeu que o usuário não pode mexer?
    const movidosIlegalmente = antes.filter(a => {
      const moveuY = a.p.scrollTop !== a.top
      const moveuX = a.p.scrollLeft !== a.left
      if (!moveuY && !moveuX) return false
      return (moveuY && !podeRolarEixo(a.p, 'y')) || (moveuX && !podeRolarEixo(a.p, 'x'))
    })
    const janelaMoveuIlegal =
      (window.scrollY !== janelaAntes.y && !podeRolarEixo(document.body, 'y')) ||
      (window.scrollX !== janelaAntes.x && !podeRolarEixo(document.body, 'x'))

    // Desfazer o que o usuário não poderia ter feito e perguntar de novo. `scrollIntoView`
    // centraliza o alvo em TODOS os contêineres de rolagem de uma vez, então ele mexe no
    // contêiner com `overflow: hidden` mesmo quando a rolagem legítima da PÁGINA já bastava
    // para deixar o alvo clicável. Sem desfazer e reconferir, todo alvo abaixo da primeira
    // dobra dentro de uma caixa que corta virava achado.
    for (const a of movidosIlegalmente) { a.p.scrollTop = a.top; a.p.scrollLeft = a.left }
    if (acertaAgora(el)) continue

    if (movidosIlegalmente.length || janelaMoveuIlegal) {
      const culpa = movidosIlegalmente[0]?.p
      const e = culpa ? getComputedStyle(culpa) : null
      const cls = culpa && typeof culpa.className === 'string' ? culpa.className.trim().split(/\s+/)[0] : ''
      inalcancaveis.push({
        rotulo: rotulo(el), caminho: caminho(el),
        w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height),
        motivo: janelaMoveuIlegal && !culpa
          ? 'só aparece se a PÁGINA rolar, e a página está travada'
          : 'só aparece rolando um contêiner que o usuário não pode rolar',
        culpado: culpa
          ? {
              seletor: culpa.tagName.toLowerCase() + (cls ? '.' + cls : ''),
              overflowY: e.overflowY, overflow: e.overflow,
              scrollHeight: culpa.scrollHeight, clientHeight: culpa.clientHeight,
              motivo: 'rola só por código (overflow hidden/clip) — sem barra, sem roda, sem dedo',
            }
          : { seletor: 'body', motivo: 'body travado (data-atividade) e o alvo exige rolagem de página' },
      })
      continue
    }

    const r = el.getBoundingClientRect()
    const cx = Math.round(r.left + r.width / 2)
    const cy = Math.round(r.top + r.height / 2)

    const info = {
      rotulo: rotulo(el),
      caminho: caminho(el),
      w: Math.round(r.width), h: Math.round(r.height),
      topo: Math.round(r.top), base: Math.round(r.bottom),
    }

    // 2. Mesmo depois de pedir rolagem, o centro caiu fora da janela?
    //    Então não existe caminho de rolagem que o traga — está preso.
    const foraDaJanela =
      cy < 0 || cy > window.innerHeight || cx < 0 || cx > window.innerWidth
    if (foraDaJanela) {
      // Quem está segurando: o ancestral mais próximo que corta.
      let culpado = null
      for (let p = el.parentElement; p && p !== document.documentElement; p = p.parentElement) {
        const e = getComputedStyle(p)
        const corta = ['hidden', 'clip'].includes(e.overflowY) || ['hidden', 'clip'].includes(e.overflow)
        const rolaSemPoder =
          ['auto', 'scroll'].includes(e.overflowY) && p.scrollHeight <= p.clientHeight + 2
        if (corta || rolaSemPoder) {
          const cls = (typeof p.className === 'string' ? p.className : '').trim().slice(0, 40)
          culpado = {
            seletor: p.tagName.toLowerCase() + (cls ? '.' + cls.split(/\s+/)[0] : ''),
            overflowY: e.overflowY, overflow: e.overflow,
            scrollHeight: p.scrollHeight, clientHeight: p.clientHeight,
            motivo: corta ? 'corta (overflow hidden/clip)' : 'tem overflow auto mas não rola',
          }
          break
        }
      }
      inalcancaveis.push({ ...info, motivo: 'fora da janela mesmo após rolar', culpado })
      continue
    }

    // 3. Quem responde ao clique nesse ponto?
    const noPonto = document.elementFromPoint(cx, cy)
    if (!noPonto) {
      inalcancaveis.push({ ...info, motivo: 'nada responde no ponto (recortado)' })
      continue
    }
    if (el === noPonto || el.contains(noPonto)) continue // acertou

    // Coberto por outra coisa. Overlay de modal aberto é legítimo — só conta
    // quando NÃO há diálogo na tela, senão todo modal geraria dezenas de falsos.
    const temModal = !!document.querySelector('[role=dialog], [aria-modal=true], .ns-modal, .modal')
    const clsCobre = (typeof noPonto.className === 'string' ? noPonto.className : '').slice(0, 40)
    const reg = {
      ...info,
      motivo: 'coberto por outro elemento',
      cobertoPor: noPonto.tagName.toLowerCase() + (clsCobre ? '.' + clsCobre.trim().split(/\s+/)[0] : ''),
      textoDeQuemCobre: (noPonto.textContent || '').trim().slice(0, 30),
    }
    if (temModal) cobertos.push({ ...reg, comModalAberto: true })
    else inalcancaveis.push(reg)
  }

  // ── CONTEÚDO ILEGÍVEL (texto/imagem cortado e sem como alcançar) ────────────────
  // 🪤 A 1ª versão media `scrollHeight > clientHeight` do contêiner e chamava isso de "a
  // tela corta". Errado: TODA intro de atividade acusava exatamente 1055 contra 844 — o
  // mesmo número em todas, que é o sinal clássico de falso positivo neste projeto. A sobra
  // vinha da DECORAÇÃO (brilhos e partículas, `pointer-events: none`) que sangra de
  // propósito, enquanto o `.intro-cols` de verdade rolava normalmente com o dedo.
  //
  // A pergunta certa não é se a caixa corta, é se sobrou CONTEÚDO fora do alcance. Então
  // aplica-se aos textos e imagens o mesmo teste dos controles: já está visível? se não,
  // a rolagem que o traria é rolagem que o usuário consegue fazer?
  // 🪤 ESTADO DE ROLAGEM VAZA DE UMA PASSADA PARA A OUTRA. A passada dos controles rola
  // painéis legítimos (`.game-content` virou `auto`) e deixa tudo deslocado; a passada de
  // conteúdo, rodando em seguida, herdava essa posição e acusava texto que numa carga limpa
  // está perfeitamente visível — 23 atividades de `numeros` entraram assim, e o funfato
  // delas está em t=551 numa janela de 640. Voltar ao estado de página recém-carregada
  // (tudo em zero) antes de medir conteúdo.
  window.scrollTo(0, 0)
  for (const el of document.querySelectorAll('*')) {
    if (el.scrollTop) el.scrollTop = 0
    if (el.scrollLeft) el.scrollLeft = 0
  }

  const conteudoCortado = []
  const candidatos = [...document.querySelectorAll('h1,h2,h3,h4,p,span,li,td,label,strong,img,canvas,svg')]
    .filter(el => {
      if (el.querySelector('h1,h2,h3,h4,p,span,li,img,canvas,svg')) return false // só folhas
      const e = getComputedStyle(el)
      if (e.display === 'none' || e.visibility === 'hidden' || e.pointerEvents === 'none') return false
      if (parseFloat(e.opacity) === 0) return false
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return false
      const temTexto = (el.textContent || '').trim().length > 1
      return temTexto || ['IMG', 'CANVAS', 'SVG'].includes(el.tagName)
    })
    .slice(0, 400) // teto de custo: página com milhares de spans não vale o tempo

  // 🔑 TEXTO NÃO SE MEDE COM O CRITÉRIO DE CLIQUE. Para um controle, se `elementFromPoint`
  // devolve um ANCESTRAL, o clique não chega nele — é defeito. Para texto é o contrário: o
  // ancestral que responde no ponto é o próprio contêiner do texto, ou seja o texto está
  // exposto ali e é perfeitamente legível. Aplicar o critério estrito marcou 23 atividades de
  // `numeros`: o funfato é um `span` inline cujo centro geométrico cai em área do `div` pai,
  // e ele está em t=429 numa janela de 640 — visível a olho nu. Só conta como escondido se
  // quem está por cima NÃO tem parentesco com o texto.
  // Sobra quanto do retângulo depois de recortar por TODOS os ancestrais que cortam e pela
  // janela? Critério geométrico, não hit-test: aceitar "quem responde no ponto é um
  // ancestral" seria frouxo demais, porque o `body` contém tudo e praticamente nada seria
  // reportado. Aqui a pergunta é direta — sobrou área do texto na tela?
  const textoExposto = el => {
    const r = el.getBoundingClientRect()
    let top = r.top, left = r.left, bottom = r.bottom, right = r.right
    for (let p = el.parentElement; p; p = p.parentElement) {
      const e = getComputedStyle(p)
      const corta = e.overflowY !== 'visible' || e.overflowX !== 'visible'
      if (!corta) continue
      const pr = p.getBoundingClientRect()
      top = Math.max(top, pr.top); left = Math.max(left, pr.left)
      bottom = Math.min(bottom, pr.bottom); right = Math.min(right, pr.right)
    }
    top = Math.max(top, 0); left = Math.max(left, 0)
    bottom = Math.min(bottom, window.innerHeight); right = Math.min(right, window.innerWidth)
    return (right - left) > 4 && (bottom - top) > 4
  }

  for (const el of candidatos) {
    if (textoExposto(el)) continue
    const anc = []
    for (let p = el.parentElement; p; p = p.parentElement) anc.push(p)
    const antes = anc.map(p => ({ p, top: p.scrollTop, left: p.scrollLeft }))
    try { el.scrollIntoView({ block: 'center', behavior: 'instant' }) } catch { el.scrollIntoView() }
    const ilegais = antes.filter(a => {
      const mY = a.p.scrollTop !== a.top, mX = a.p.scrollLeft !== a.left
      if (!mY && !mX) return false
      return (mY && !podeRolarEixo(a.p, 'y')) || (mX && !podeRolarEixo(a.p, 'x'))
    })
    for (const a of ilegais) { a.p.scrollTop = a.top; a.p.scrollLeft = a.left }
    if (textoExposto(el)) continue
    if (!ilegais.length) continue // fora de vista por outro motivo (carrossel, etc.)
    const culpa = ilegais[0].p
    const cls = typeof culpa.className === 'string' ? culpa.className.trim().split(/\s+/)[0] : ''
    conteudoCortado.push({
      texto: (el.textContent || '').trim().slice(0, 50) || el.tagName.toLowerCase(),
      tag: el.tagName.toLowerCase(),
      culpado: culpa.tagName.toLowerCase() + (cls ? '.' + cls : ''),
      sobra: culpa.scrollHeight - culpa.clientHeight,
    })
  }

  return {
    totalAlvos: alvos.length,
    // Quantos foram descartados como inertes fica no relatório de propósito: filtro que
    // ninguém vê é filtro que esconde. Se este número explodir, é sinal de que algo que
    // deveria ser clicável ficou com `pointer-events: none`.
    inertesIgnorados: inertes,
    inalcancaveis,
    cobertos,
    conteudoCortado: conteudoCortado.slice(0, 8),
    atividadeAberta: (() => {
      try { return JSON.parse(sessionStorage.getItem('ns_dev_atividade') || 'null') } catch { return null }
    })(),
    erroBancada: document.querySelector('[data-dev-erro]')?.getAttribute('data-dev-erro') || null,
    // `document.body` pode ser null se a página navegar no meio da medição (a bancada
    // redireciona). Sem esta guarda o `evaluate` estourava e a combinação ficava SEM MEDIDA,
    // aparecendo como "falha" — 4 atividades ficaram assim na varredura anterior.
    corpoVazio: ((document.body && document.body.innerText) || '').trim().length < 20,
  }
}})()`

// ─────────────────────────────────────────────────────────────────────────────
// AUTOTESTE — o instrumento tem que reprovar defeito e aprovar o que está bom
// ─────────────────────────────────────────────────────────────────────────────
const PAGINA_TESTE = `<!doctype html><html><head><meta charset="utf-8"><style>
  body { margin:0; font-family: sans-serif; }
  .caixa-corta { height:120px; overflow:hidden; border:1px solid #ccc; }
  .caixa-rola  { height:120px; overflow-y:auto;  border:1px solid #ccc; }
  .auto-que-nao-rola { height:200px; overflow-y:auto; }
  .alto { height:400px; }
  button { display:block; margin:8px; padding:10px; }
</style></head><body>
  <button id="ok-topo">SADIO no topo</button>

  <div class="caixa-corta"><div class="alto">
    <button id="ok-dentro-corta">SADIO dentro do corte (visivel)</button>
    <div style="height:300px"></div>
    <button id="ruim-cortado">DEFEITO cortado por overflow hidden</button>
    <p id="ruim-texto">TEXTO ILEGIVEL cortado sem rolagem</p>
  </div>
  <!-- Decoracao que sangra de proposito: e o que fazia TODA intro de atividade acusar
       "corta 211px". Tem pointer-events:none e nao pode ser contada como conteudo. -->
  <div style="position:absolute; top:0; left:0; width:40px; height:900px; pointer-events:none; background:rgba(0,0,255,0.08)"></div>
  </div>

  <div class="caixa-rola"><div class="alto">
    <div style="height:300px"></div>
    <button id="ok-rolavel">SADIO alcancavel rolando</button>
  </div></div>

  <!-- O caso real de "auto que nao rola": o contorno interno TEM overflow-y:auto mas o
       conteudo cabe nele (scrollHeight == clientHeight), entao ele nunca rola; quem corta e
       o PAI, com overflow:hidden. E a forma exata de .game-content dentro de .game-center. -->
  <div class="caixa-corta-2" style="height:100px; overflow:hidden">
    <div class="auto-que-nao-rola" style="height:300px; overflow-y:auto">
      <div style="height:200px"></div>
      <button id="ruim-auto-morto">DEFEITO auto que nao rola</button>
    </div>
  </div>

  <!-- Cortado embaixo mas com o CENTRO visivel: o dedo acerta a parte de cima. E a forma do
       "Comecar Atividade" do /digitacao, que a 1a versao condenou por engano. Cortar conteudo
       ali e defeito (entra como conteiner que corta), mas o botao em si nao e inalcancavel. -->
  <div style="height:80px; overflow:hidden; position:relative; border:1px solid #ccc">
    <button id="ok-parcial" style="position:absolute; top:50px; margin:0">SADIO cortado embaixo centro visivel</button>
  </div>

  <!-- Barra que rola na HORIZONTAL (o padrao .menu-bottom / chips scrolaveis do projeto):
       overflow-x:auto com overflow-y:hidden. A 1ª versao do script olhava so overflowY e
       acusou essa forma em 6 telas. Fica como teste permanente contra a regressao. -->
  <div class="rola-horizontal" style="width:200px; overflow-x:auto; overflow-y:hidden; white-space:nowrap">
    <div style="width:700px">
      <button id="ok-horizontal" style="margin-left:500px; display:inline-block">SADIO rolando na horizontal</button>
    </div>
  </div>

  <!-- Acordeao FECHADO: mantem caixa de layout mas nao e clicavel nem visivel. Nao pode
       virar achado — foram 16 falsos positivos nas duas atividades de musica. -->
  <details>
    <summary>abrir laboratorio</summary>
    <button id="ok-details-fechado">SADIO dentro de details fechado</button>
  </details>

  <button id="ruim-coberto">DEFEITO coberto por overlay</button>
  <div id="overlay" style="position:absolute; z-index:99; background:rgba(255,0,0,0.3)"></div>

  <div style="position:fixed; left:-9999px; top:0">
    <button id="ruim-fora">DEFEITO fora da tela sem rolagem</button>
  </div>

  <script>
    // Overlay posicionado exatamente sobre o botão "ruim-coberto".
    const b = document.getElementById('ruim-coberto').getBoundingClientRect()
    const o = document.getElementById('overlay')
    o.style.left = (b.left + window.scrollX) + 'px'
    o.style.top = (b.top + window.scrollY) + 'px'
    o.style.width = b.width + 'px'
    o.style.height = b.height + 'px'
  </script>
</body></html>`

async function autoteste(navegador) {
  const ctx = await navegador.newContext({ viewport: { width: 800, height: 600 } })
  const pagina = await ctx.newPage()
  await pagina.setContent(PAGINA_TESTE)
  await pagina.waitForTimeout(150)
  const m = await pagina.evaluate(MEDIR)
  await ctx.close()

  const achados = new Set(
    [...m.inalcancaveis, ...m.cobertos].map(i => i.rotulo)
  )
  const pegou = rot => [...achados].some(a => a.includes(rot))

  const DEVE_REPROVAR = [
    ['cortado por overflow hidden', 'DEFEITO cortado'],
    ['auto que nao rola', 'DEFEITO auto que nao rola'],
    ['coberto por overlay', 'DEFEITO coberto'],
    ['fora da tela sem rolagem', 'DEFEITO fora da tela'],
  ]
  const DEVE_APROVAR = [
    ['botao no topo', 'SADIO no topo'],
    ['visivel dentro do corte', 'SADIO dentro do corte'],
    ['alcancavel rolando', 'SADIO alcancavel rolando'],
    ['alcancavel rolando na horizontal', 'SADIO rolando na horizontal'],
    ['cortado embaixo mas com centro clicavel', 'SADIO cortado embaixo centro visivel'],
    ['dentro de <details> fechado', 'SADIO dentro de details fechado'],
  ]

  let ok = true
  console.log('\n🔬 AUTOTESTE DO INSTRUMENTO')
  console.log('   (auditoria que aprova tudo pode estar medindo nada)\n')
  for (const [nome, marca] of DEVE_REPROVAR) {
    const achou = pegou(marca)
    if (!achou) ok = false
    console.log(`   ${achou ? '✅' : '⛔'} reprova: ${nome}`)
  }
  for (const [nome, marca] of DEVE_APROVAR) {
    const achou = pegou(marca)
    if (achou) ok = false
    console.log(`   ${!achou ? '✅' : '⛔'} aprova:  ${nome}`)
  }

  // O detector de "corta sem rolagem" tem que nomear a caixa que corta e NÃO a
  // que rola — senão ele estaria só contando divs altas.
  // O detector de conteúdo ilegível: tem que achar o TEXTO cortado, apontar quem corta, e
  // não confundir decoração que sangra (o falso positivo que inflou toda intro) nem
  // contêiner que rola de verdade.
  const achouTexto = m.conteudoCortado.some(c => c.texto.includes('TEXTO ILEGIVEL'))
  const culpouCaixaCerta = m.conteudoCortado.some(c => (c.culpado || '').includes('caixa-corta'))
  const culpouRolavel = m.conteudoCortado.some(c => (c.culpado || '').includes('caixa-rola'))
  const contouDecoracao = m.conteudoCortado.some(c => c.tag === 'div' && !c.texto.trim())
  if (!achouTexto || !culpouCaixaCerta || culpouRolavel || contouDecoracao) ok = false
  console.log(`   ${achouTexto ? '✅' : '⛔'} acha texto cortado sem rolagem`)
  console.log(`   ${culpouCaixaCerta ? '✅' : '⛔'} aponta o contêiner que corta`)
  console.log(`   ${!culpouRolavel ? '✅' : '⛔'} ignora o contêiner que rola`)
  console.log(`   ${!contouDecoracao ? '✅' : '⛔'} ignora decoração com pointer-events:none`)

  if (!ok) {
    console.log('\n   achados brutos do autoteste (para depurar o instrumento):')
    for (const i of [...m.inalcancaveis, ...m.cobertos]) {
      console.log(`     · "${i.rotulo}" → ${i.motivo}${i.cobertoPor ? ` por ${i.cobertoPor}` : ''}` +
        `${i.culpado ? ` [${i.culpado.seletor} sh=${i.culpado.scrollHeight} ch=${i.culpado.clientHeight}]` : ''}`)
    }
    console.log('\n⛔ O INSTRUMENTO NÃO PASSOU NO PRÓPRIO TESTE. Nada foi medido.')
    console.log('   Corrigir a medição antes de auditar a plataforma.\n')
    process.exit(2)
  }
  console.log('\n✅ Instrumento validado: reprova os 4 defeitos e aprova os 3 sadios.\n')
}

// ─────────────────────────────────────────────────────────────────────────────
function resumir(m) {
  const problemas = []
  if (m.erroBancada) problemas.push(`BANCADA: ${m.erroBancada}`)
  if (m.corpoVazio) problemas.push('TELA VAZIA')
  if (m.inalcancaveis?.length) problemas.push(`${m.inalcancaveis.length} inalcançável(is)`)
  if (m.conteudoCortado?.length) problemas.push(`${m.conteudoCortado.length} conteúdo(s) cortado(s)`)
  return problemas
}

/**
 * Espera o LAYOUT parar de mudar, em vez de esperar por relógio ou por `networkidle`.
 *
 * 🪤 `networkidle` custou horas: quase toda atividade toca áudio (`new Audio(...)`) e as
 * requisições de mp3 mantêm a rede ocupada, então o `networkidle` batia no teto de 12s em
 * CADA página — 1070 combinações × 12s daria mais de 3 horas. E esperar por relógio fixo é o
 * erro que já fez um teste deste projeto reprovar uma tela correta ("esperava por relógio em
 * vez de esperar o seletor"). Aqui a condição é a que importa para medir geometria: a altura
 * do documento e a contagem de controles pararem de mudar entre dois quadros.
 */
async function esperarLayoutEstavel(pagina, tetoMs = 4000) {
  const inicio = Date.now()
  let anterior = null
  let estaveis = 0
  while (Date.now() - inicio < tetoMs) {
    const agora = await pagina.evaluate(() => ({
      h: document.documentElement.scrollHeight,
      n: document.querySelectorAll('button,a[href],input,[role=button]').length,
      t: (document.body?.innerText || '').trim().length,
    })).catch(() => null)
    if (!agora) return

    // 🪤 "ESTÁVEL" SOZINHO NÃO SERVE. A 1ª versão comparava duas amostras e voltava na
    // primeira igualdade — e página em branco é perfeitamente estável: as 54 atividades da
    // amostra voltaram com `corpoVazio: true` e ZERO controles, ou seja a auditoria mediu
    // nada e teria dito que estava tudo bem se o `corpoVazio` não existisse. Só conta como
    // estável DEPOIS que apareceu conteúdo, e exige duas amostras iguais seguidas.
    const temConteudo = agora.t > 20 || agora.n > 0
    if (temConteudo && anterior && anterior.h === agora.h && anterior.n === agora.n && anterior.t === agora.t) {
      if (++estaveis >= 2) return
    } else {
      estaveis = 0
    }
    anterior = agora
    await pagina.waitForTimeout(100)
  }
}

async function medirPagina(ctx, url, extra = {}) {
  const pagina = await ctx.newPage()
  const erros = []
  pagina.on('pageerror', e => erros.push(String(e.message).slice(0, 110)))
  const reg = { url, ...extra, erros }
  try {
    await pagina.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
    await esperarLayoutEstavel(pagina)

    // Entrar no jogo: o que interessa auditar é a atividade, não a introdução.
    if (extra.tipo) {
      const b = pagina.getByRole('button', { name: /come[çc]ar|vamos|jogar|iniciar/i }).first()
      if (await b.count().catch(() => 0)) {
        await b.click({ timeout: 2500 }).catch(() => {})
        await esperarLayoutEstavel(pagina, 2000)
      }
    }
    reg.urlFinal = new URL(pagina.url()).pathname
    Object.assign(reg, await pagina.evaluate(MEDIR))
  } catch (e) {
    reg.falha = String(e.message).split('\n')[0].slice(0, 110)
  }
  await pagina.close()
  return reg
}

// ─────────────────────────────────────────────────────────────────────────────
/**
 * Áudio e vídeo não mudam geometria e eram o gargalo: as atividades de alfabeto, cores,
 * números, inglês, sílabas e música baixam mp3 no `mount`. Cortar isso não altera nada do
 * que se mede aqui (posição, corte, quem recebe o clique) e derruba o tempo da varredura.
 * Fonte NÃO entra na lista: fonte muda a métrica do texto e portanto o layout.
 */
async function semMidia(ctx) {
  await ctx.route('**/*.{mp3,wav,ogg,m4a,aac,mp4,webm,mov}', r => r.abort().catch(() => {}))
}

const navegador = await chromium.launch()
await autoteste(navegador)
if (SO_AUTOTESTE) { await navegador.close(); process.exit(0) }

mkdirSync(SAIDA, { recursive: true })
const resultados = []
const fazerTelas = !SO_ATIVIDADES
const fazerAtividades = !SO_TELAS

let atividades = []
if (fazerAtividades) {
  try {
    atividades = JSON.parse(readFileSync('scripts/saida/atividades.json', 'utf8')).atividades
  } catch {
    console.error('⛔ Falta scripts/saida/atividades.json — rode `node scripts/listar-atividades.mjs` antes.')
    process.exit(2)
  }
}

const totalPrevisto =
  (fazerTelas ? ROTAS.length * TELAS.length : 0) +
  (fazerAtividades ? (atividades.length + TIPOS_AVULSOS.length) * TELAS.length : 0)
console.log(`Medindo ${totalPrevisto} combinações (${TELAS.length} tamanhos)…\n`)

let feitos = 0
const marcar = () => {
  feitos++
  if (feitos % 100 === 0) console.log(`  … ${feitos}/${totalPrevisto}`)
}

for (const tela of TELAS) {
  // ── telas ──
  if (fazerTelas) {
    const ctx = await navegador.newContext({
      viewport: { width: tela.largura, height: tela.altura },
      isMobile: tela.largura < 800, hasTouch: tela.largura < 800, deviceScaleFactor: 1,
    })
    await prepararContexto(ctx)
    await semMidia(ctx)
    for (const r of ROTAS) {
      resultados.push({ ...(await medirPagina(ctx, BASE + r.rota, { tela: tela.nome, largura: tela.largura, altura: tela.altura, nome: r.nome, area: r.area, kind: 'tela' })) })
      marcar()
    }
    await ctx.close()
  }

  // ── atividades ──
  if (fazerAtividades) {
    // Uma criança por faixa: atividade de faixa SUPERIOR à da criança cai no
    // `faixaGuard` e mostra o pedido de senha do responsável. Medir isso seria
    // medir a trava de segurança e chamar de bug de conteúdo — foi o que fez a
    // 1ª versão do `testar-quiz-novos` reprovar 15 das 30 sem haver defeito.
    const porFaixa = {}
    for (const faixa of ['exploradores', 'construtores', 'criadores', 'inventores']) {
      const ctx = await navegador.newContext({
        viewport: { width: tela.largura, height: tela.altura },
        isMobile: tela.largura < 800, hasTouch: tela.largura < 800, deviceScaleFactor: 1,
      })
      await prepararContexto(ctx, {})
      await semMidia(ctx)
      await ctx.addInitScript(c => {
        try { localStorage.setItem('ns_active_child', c) } catch { /* modo privado */ }
      }, JSON.stringify({ ...CRIANCA_TESTE, faixa_etaria: faixa }))
      porFaixa[faixa] = ctx
    }

    for (const a of atividades) {
      const ctx = porFaixa[a.faixa] || porFaixa.construtores
      const url = `${BASE}/dev/atividade/${a.tipo}?id=${encodeURIComponent(a.id)}`
      const reg = await medirPagina(ctx, url, { tela: tela.nome, largura: tela.largura, altura: tela.altura, nome: a.id, tipo: a.tipo, faixa: a.faixa, kind: 'atividade' })
      // Conferir que a bancada abriu a atividade PEDIDA, e não outra.
      if (reg.atividadeAberta && reg.atividadeAberta.id !== a.id) {
        reg.abriuOutra = reg.atividadeAberta.id
      }
      resultados.push(reg)
      marcar()
    }
    for (const tipo of TIPOS_AVULSOS) {
      resultados.push(await medirPagina(porFaixa.construtores, `${BASE}/dev/atividade/${tipo}`, { tela: tela.nome, largura: tela.largura, altura: tela.altura, nome: tipo, tipo, kind: 'atividade-avulsa' }))
      marcar()
    }
    for (const ctx of Object.values(porFaixa)) await ctx.close()
  }
}

await navegador.close()
writeFileSync(`${SAIDA}/resultado.json`, JSON.stringify(resultados, null, 2))

// ── relatório ────────────────────────────────────────────────────────────────
const falhas = resultados.filter(r => r.falha)
if (falhas.length === resultados.length) {
  console.log(`\n⛔ NENHUMA página foi medida — as ${resultados.length} tentativas falharam.`)
  console.log(`   O servidor está no ar em ${BASE}?\n`)
  process.exit(2)
}

const comProblema = resultados.filter(r => r.falha || r.abriuOutra || resumir(r).length)
console.log(`\n${resultados.length} combinações medidas · ${comProblema.length} com problema\n`)

const abriuOutra = resultados.filter(r => r.abriuOutra)
if (abriuOutra.length) {
  console.log(`⛔ ${abriuOutra.length} atividade(s) abriram OUTRA no lugar — a medida delas não vale:`)
  for (const r of abriuOutra.slice(0, 10)) console.log(`   ${r.nome} → abriu ${r.abriuOutra}`)
  console.log('')
}

// Agrupar por alvo: o mesmo defeito aparece em vários tamanhos e repetir a linha
// 5 vezes esconde quantos alvos DISTINTOS estão quebrados.
const porAlvo = new Map()
for (const r of comProblema) {
  if (!porAlvo.has(r.nome)) porAlvo.set(r.nome, { nome: r.nome, kind: r.kind, tipo: r.tipo, area: r.area, telas: [], detalhe: null, motivos: [] })
  const g = porAlvo.get(r.nome)
  g.telas.push(`${r.tela}${r.inalcancaveis?.length ? `(${r.inalcancaveis.length})` : ''}`)
  if (!g.detalhe && r.inalcancaveis?.length) g.detalhe = r.inalcancaveis[0]
  if (!g.corte && r.conteudoCortado?.length) g.corte = r.conteudoCortado[0]
  if (!g.falha && r.falha) g.falha = r.falha
  // Toda linha do relatório precisa dizer POR QUE entrou. A versão anterior imprimia
  // `nome · ` sem motivo nenhum quando a causa era "tela vazia" ou erro da bancada,
  // porque só sabia formatar inalcançável/corte/falha. Linha sem motivo é pior que
  // nenhuma linha: parece ruído e faz ignorar o achado.
  for (const m of resumir(r)) if (!g.motivos.includes(m)) g.motivos.push(m)
  if (r.erros?.length && !g.erroJs) g.erroJs = r.erros[0]
  if (r.abriuOutra) g.abriuOutra = r.abriuOutra
}

for (const grupo of ['tela', 'atividade', 'atividade-avulsa']) {
  const doGrupo = [...porAlvo.values()].filter(g => g.kind === grupo)
  if (!doGrupo.length) continue
  console.log(`\n═══ ${grupo.toUpperCase()} — ${doGrupo.length} com problema ═══`)
  for (const g of doGrupo.slice(0, 60)) {
    const partes = []
    if (g.falha) partes.push(`FALHOU: ${g.falha}`)
    if (g.detalhe) partes.push(`"${g.detalhe.rotulo}" ${g.detalhe.motivo}${g.detalhe.culpado ? ` [${g.detalhe.culpado.seletor} ${g.detalhe.culpado.motivo}]` : ''}`)
    if (g.corte) partes.push(`texto cortado: "${g.corte.texto}" [${g.corte.culpado}]`)
    if (g.abriuOutra) partes.push(`A BANCADA ABRIU OUTRA: ${g.abriuOutra}`)
    if (g.erroJs) partes.push(`JS: ${g.erroJs.slice(0, 60)}`)
    if (!partes.length) partes.push(g.motivos.join(' · ') || '(motivo não formatado)')
    console.log(`  ${String(g.nome).padEnd(26)} ${g.telas.join(' ')} · ${partes.join(' · ')}`)
  }
  if (doGrupo.length > 60) console.log(`  … e mais ${doGrupo.length - 60} (ver ${SAIDA}/resultado.json)`)
}

const totalInalcancaveis = resultados.reduce((s, r) => s + (r.inalcancaveis?.length || 0), 0)
console.log(`\n${totalInalcancaveis} controle(s) inalcançáveis somando todas as combinações.`)
console.log(`Relatório completo em ${SAIDA}/resultado.json\n`)
process.exit(comProblema.length ? 1 : 0)
