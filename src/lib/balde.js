/**
 * balde.js — o motor de pintar por área, como num app de colorir de verdade.
 *
 * POR QUE ISTO EXISTE
 * O Colorir antigo pinta REGIÕES: cada peça do desenho é uma forma fechada declarada
 * no dado, e o toque acerta a forma. Isso obriga a desenhar tudo à mão e não aceita
 * desenho de livro de colorir, que é TRAÇO — um contorno só, sem peças por dentro.
 * Aqui a conta é outra: o desenho é uma imagem, e o toque preenche a área fechada
 * onde o dedo caiu. Com isso qualquer desenho serve.
 *
 * COMO FUNCIONA, E POR QUE NÃO É UM FLOOD FILL SIMPLES
 * Um balde ingênuo sai preenchendo pixel a pixel a cada toque. Dois problemas:
 *  1. não dá para saber QUANTAS áreas o desenho tem, e sem isso não há progresso;
 *  2. borda suavizada (anti-aliasing) deixa um halo claro em volta do traço.
 * Então o trabalho pesado é feito UMA vez, quando a imagem carrega: todo pixel claro
 * recebe um RÓTULO de área (componentes conexos). Depois, cada toque só descobre o
 * rótulo daquele ponto e pinta os pixels daquele rótulo — instantâneo e exato.
 *
 * O halo é tratado no fim: os pixels de meia-luz que encostam na área pintada recebem
 * a cor MISTURADA com o traço, na proporção do quanto eles já eram claros. Sem isso
 * sobra uma auréola branca entre a tinta e o contorno, que é a marca registrada de
 * balde mal feito.
 */

/** Acima disto o pixel é considerado "papel" (pintável). */
export const LIMIAR_CLARO = 200
/** Abaixo disto é traço puro; entre os dois é a borda suavizada. */
export const LIMIAR_TRACO = 110
/** Área menor que isto (em pixels) não conta para o progresso — é respingo do traço. */
export const AREA_MINIMA = 120
/**
 * Diâmetro mínimo, em FRAÇÃO DA LARGURA da folha, do maior círculo que cabe dentro
 * da área para ela contar no progresso.
 *
 * 🔑 POR QUE ISTO EXISTE (e por que `AREA_MINIMA` não bastava)
 * `AREA_MINIMA` conta PIXELS, e uma rachadura do traço tem pixels de sobra: no
 * esquilo havia uma fenda de 36×1px (197px²) que passava folgado pelos 120. Como a
 * atividade só termina quando TODAS as áreas contáveis são pintadas, essas frestas
 * — invisíveis e impossíveis de acertar com o dedo — tornavam o desenho
 * INCONCLUÍVEL: a criança pintava tudo que vê, a barra parava em 7 de 56 e a tela
 * de "Ficou lindo!" (e o XP) nunca chegava.
 *
 * 🔑 E por que DISCO, não lado da caixa: forma comprida (a moldura de uma janela,
 * 200×20) é perfeitamente alcançável pelo lado longo, e medir pelo lado menor a
 * reprovaria. O que decide é o maior círculo que cabe dentro — mesmo erro que o
 * `auditar-colorir.mjs` já documenta ter cometido na 1ª versão.
 *
 * O número: no pior caso realista a folha ocupa 312px (celular de 360px menos os
 * paddings), e 10px de tela com o anel de 12px do `areaPerto` dá alvo efetivo de
 * ~34px — acima do piso de 24px do WCAG 2.5.8 (AA). 10 ÷ 312 ≈ 0,032.
 */
export const DISCO_MINIMO_REL = 0.032

const luz = (d, i) => (d[i] * 299 + d[i + 1] * 587 + d[i + 2] * 114) / 1000

/**
 * Raio do maior círculo que cabe dentro de cada área, em pixels da imagem.
 *
 * Transformada de distância em duas varreduras (chamfer 3-4, dividido por 3 ≈
 * euclidiana). Semente = traço e pixel de borda da própria área; para o pixel de
 * dentro, a borda mais próxima É a borda da área dele.
 *
 * Devolve Map(rótulo → { raio, x, y }), onde (x, y) é o centro desse círculo — o
 * ponto mais "gordo" da área, que é onde um dedo tem mais chance de acertar (o
 * teste de jogabilidade toca exatamente ali). Área de 1px de espessura não aparece
 * no Map (raio 0), que é justamente o caso que não se alcança com o dedo.
 */
export function discosInscritos(rotulos, w, h) {
  const d = new Int32Array(w * h).fill(0x3fffffff)

  for (let p = 0; p < w * h; p++) {
    const rot = rotulos[p]
    if (rot === 0) { d[p] = 0; continue }
    const x = p % w, y = (p / w) | 0
    if (x === 0 || y === 0 || x === w - 1 || y === h - 1) { d[p] = 0; continue }
    if (rotulos[p - 1] !== rot || rotulos[p + 1] !== rot ||
        rotulos[p - w] !== rot || rotulos[p + w] !== rot) d[p] = 0
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x
      if (d[p] === 0) continue
      if (x > 0) d[p] = Math.min(d[p], d[p - 1] + 3)
      if (y > 0) d[p] = Math.min(d[p], d[p - w] + 3)
      if (x > 0 && y > 0) d[p] = Math.min(d[p], d[p - w - 1] + 4)
      if (x < w - 1 && y > 0) d[p] = Math.min(d[p], d[p - w + 1] + 4)
    }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) {
      const p = y * w + x
      if (x < w - 1) d[p] = Math.min(d[p], d[p + 1] + 3)
      if (y < h - 1) d[p] = Math.min(d[p], d[p + w] + 3)
      if (x < w - 1 && y < h - 1) d[p] = Math.min(d[p], d[p + w + 1] + 4)
      if (x > 0 && y < h - 1) d[p] = Math.min(d[p], d[p + w - 1] + 4)
    }
  }

  const raios = new Map()
  for (let p = 0; p < w * h; p++) {
    const rot = rotulos[p]
    if (!rot) continue
    const v = d[p] / 3
    if (v > (raios.get(rot)?.raio ?? 0)) raios.set(rot, { raio: v, x: p % w, y: (p / w) | 0 })
  }
  return raios
}

/**
 * Rotula as áreas fechadas do desenho.
 *
 * Devolve:
 *   rotulos     Int32Array — 0 = traço/borda, >0 = número da área
 *   total       quantas áreas contáveis existem
 *   contaveis   Set dos rótulos que contam para o progresso
 *   fundo       o rótulo da área de fora (encostada na moldura), ou 0
 *
 * 🔑 A área de FORA é descoberta, não adivinhada: é a que toca a borda da imagem.
 * Ela fica pintável (a criança pode colorir o fundo), mas não entra na conta do
 * progresso — senão "faltava 1 área" para sempre em quem não pintasse o fundo.
 */
export function rotularAreas(imageData, opts = {}) {
  const claro = opts.limiarClaro ?? LIMIAR_CLARO
  const minima = opts.areaMinima ?? AREA_MINIMA
  const { width: w, height: h, data } = imageData
  const rotulos = new Int32Array(w * h)
  const tamanhos = [0]           // índice = rótulo; a posição 0 não é usada
  const tocaBorda = [false]
  const fila = new Int32Array(w * h)
  let proximo = 0

  for (let p0 = 0; p0 < w * h; p0++) {
    if (rotulos[p0] !== 0) continue
    if (luz(data, p0 * 4) < claro) continue      // traço ou borda: não é área

    proximo++
    let cabeca = 0, cauda = 0, tamanho = 0, borda = false
    fila[cauda++] = p0
    rotulos[p0] = proximo

    // Varredura iterativa (nada de recursão: desenho grande estoura a pilha).
    while (cabeca < cauda) {
      const p = fila[cabeca++]
      tamanho++
      const x = p % w, y = (p / w) | 0
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) borda = true
      if (x > 0)     { const q = p - 1; if (rotulos[q] === 0 && luz(data, q * 4) >= claro) { rotulos[q] = proximo; fila[cauda++] = q } }
      if (x < w - 1) { const q = p + 1; if (rotulos[q] === 0 && luz(data, q * 4) >= claro) { rotulos[q] = proximo; fila[cauda++] = q } }
      if (y > 0)     { const q = p - w; if (rotulos[q] === 0 && luz(data, q * 4) >= claro) { rotulos[q] = proximo; fila[cauda++] = q } }
      if (y < h - 1) { const q = p + w; if (rotulos[q] === 0 && luz(data, q * 4) >= claro) { rotulos[q] = proximo; fila[cauda++] = q } }
    }
    tamanhos[proximo] = tamanho
    tocaBorda[proximo] = borda
  }

  // A maior área encostada na moldura é o fundo. Pode haver mais de uma tocando a
  // borda (um desenho cortado nas laterais), então vale a MAIOR, não a primeira.
  let fundo = 0, maiorBorda = -1
  for (let r = 1; r <= proximo; r++) {
    if (tocaBorda[r] && tamanhos[r] > maiorBorda) { maiorBorda = tamanhos[r]; fundo = r }
  }

  // Candidatas: tudo que não é o fundo e tem pixels de sobra.
  const candidatas = []
  for (let r = 1; r <= proximo; r++) {
    if (r !== fundo && tamanhos[r] >= minima) candidatas.push(r)
  }

  // 🔑 O segundo filtro é o que torna o desenho CONCLUÍVEL: área que o dedo não
  // alcança não pode entrar no progresso, senão a criança pinta tudo o que vê e a
  // atividade nunca termina. Ver DISCO_MINIMO_REL.
  const discoMinimo = opts.discoMinimo ?? (DISCO_MINIMO_REL * w)
  const raios = discoMinimo > 0 ? discosInscritos(rotulos, w, h) : null

  const contaveis = new Set()
  for (const r of candidatas) {
    if (!raios) { contaveis.add(r); continue }
    if ((raios.get(r)?.raio ?? 0) * 2 >= discoMinimo) contaveis.add(r)
  }

  return { rotulos, total: contaveis.size, contaveis, fundo, tamanhos, raios, candidatas }
}

/** Converte '#RRGGBB' em [r,g,b]. */
export function corParaRGB(hex) {
  const s = String(hex).replace('#', '')
  const n = parseInt(s.length === 3 ? s.split('').map(c => c + c).join('') : s, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/**
 * Pinta de uma cor todos os pixels do rótulo indicado, tratando a borda suavizada.
 * Escreve direto no `imageData` recebido. Devolve quantos pixels mudaram.
 */
export function pintarArea(imageData, rotulos, rotulo, hex, opts = {}) {
  if (!rotulo) return 0
  const traco = opts.limiarTraco ?? LIMIAR_TRACO
  const claro = opts.limiarClaro ?? LIMIAR_CLARO
  const { width: w, height: h, data } = imageData
  const [cr, cg, cb] = corParaRGB(hex)
  let mudou = 0

  for (let p = 0; p < w * h; p++) {
    if (rotulos[p] !== rotulo) continue
    const i = p * 4
    data[i] = cr; data[i + 1] = cg; data[i + 2] = cb; data[i + 3] = 255
    mudou++
  }

  // Auréola: pixel de meia-luz encostado no que acabou de ser pintado recebe a cor
  // misturada na proporção do quanto ele já era claro. É o que cola a tinta no traço.
  for (let p = 0; p < w * h; p++) {
    if (rotulos[p] !== 0) continue
    const i = p * 4
    const l = luz(data, i)
    if (l <= traco || l >= claro) continue
    const x = p % w, y = (p / w) | 0
    const vizinho =
      (x > 0 && rotulos[p - 1] === rotulo) ||
      (x < w - 1 && rotulos[p + 1] === rotulo) ||
      (y > 0 && rotulos[p - w] === rotulo) ||
      (y < h - 1 && rotulos[p + w] === rotulo)
    if (!vizinho) continue
    const t = (l - traco) / (claro - traco)          // 0 = traço, 1 = papel
    data[i]     = Math.round(data[i]     * (1 - t) + cr * t)
    data[i + 1] = Math.round(data[i + 1] * (1 - t) + cg * t)
    data[i + 2] = Math.round(data[i + 2] * (1 - t) + cb * t)
    mudou++
  }
  return mudou
}

/** Qual área está em (x, y)? 0 quando o toque cai em cima do traço. */
export function areaEm(rotulos, largura, x, y) {
  const p = (y | 0) * largura + (x | 0)
  return rotulos[p] ?? 0
}

/**
 * Procura área pintável perto do ponto tocado.
 * 🔑 Dedo de criança cai em cima do contorno com frequência; sem isto o toque
 * "não faz nada" e ela conclui que travou — o mesmo sintoma dos alvos de 28px
 * que já derrubaram o Alfabeto. Procura em anel crescente até 12px.
 */
export function areaPerto(rotulos, w, h, x, y, raio = 12) {
  const direto = areaEm(rotulos, w, x, y)
  if (direto) return direto
  for (let r = 2; r <= raio; r += 2) {
    for (let a = 0; a < 16; a++) {
      const ang = (a / 16) * Math.PI * 2
      const nx = Math.round(x + Math.cos(ang) * r)
      const ny = Math.round(y + Math.sin(ang) * r)
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
      const rot = areaEm(rotulos, w, nx, ny)
      if (rot) return rot
    }
  }
  return 0
}
