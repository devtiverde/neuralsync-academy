/**
 * redesenhar-colorir.mjs — aplica os desenhos novos do Colorir, escalando a
 * dificuldade por faixa etária (autorizado pelo Cláudio em 03/08).
 *
 * Rodado UMA vez para reescrever o bloco `desenho` de cada uma das 12
 * atividades. Fica no repositório como registro do que foi feito e por quê —
 * as decisões de geometria estão comentadas na tabela abaixo, não no commit.
 *
 * COMO ELE ESCREVE
 * ----------------
 * Não regenera o arquivo inteiro nem o array inteiro: localiza `desenho: {` de
 * cada atividade pelo id e troca só até a chave que fecha, contando
 * profundidade. O diff fica restrito ao desenho, e o resto do arquivo (que tem
 * centenas de outras atividades) não é tocado. O serializador emite chave sem
 * aspas para casar com o estilo do arquivo — `JSON.stringify` produziria
 * `"id":` e sujaria o diff inteiro.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const RAIZ = 'E:/DEV/neuralsync-academy/src/data/extra'

// ── Os desenhos novos ────────────────────────────────────────────────────────
// Regra: nada abaixo de 24px na tela de um celular de 360px (piso do WCAG
// 2.5.8), e o NÚMERO de áreas pintáveis cresce com a idade. Detalhe pequeno que
// não é área de pintura (olho, boca, botão) virou `decorativo` — desenhado, sem
// clique, fora da contagem de progresso.
// Como o viewBox é 300 em todos e o SVG rende a 288px no celular, unidade ≈ px.

const DESENHOS = {
  // ── EXPLORADORES (4–5) — poucas áreas, todas enormes ──────────────────────
  // Os olhos (r=8 → 15px) e a boca (50×10 → 48×10px) eram os alvos que o
  // auditar-toque acusava. Viraram traço. Para o desenho não ficar com só duas
  // áreas, entraram duas nuvens grandes: mais para pintar, e nada pequeno.
  exp_colorir_sol: {
    viewBox: 300, nome: 'Sol',
    regioes: [
      { id: 'nucleo', tipo: 'circle', props: { cx: 150, cy: 118, r: 52 } },
      // largura 0.44 engorda a ponta: com o padrão 0.32 o raio dava 37×28px.
      { id: 'raios', tipo: 'radial', props: { cx: 150, cy: 118, rInner: 50, rOuter: 112, n: 6, largura: 0.44 } },
      // Chamadas de colina, e não de nuvem, porque é o que elas parecem na
      // tela: dois montes embaixo do sol. Nome de dado que não bate com o que
      // se vê é o que faz a próxima pessoa "consertar" a posição errada.
      { id: 'colina_esquerda', tipo: 'ellipse', props: { cx: 62, cy: 262, rx: 52, ry: 34 } },
      { id: 'colina_direita', tipo: 'ellipse', props: { cx: 238, cy: 262, rx: 52, ry: 34 } },
      { id: 'olho_esquerdo', tipo: 'circle', decorativo: true, props: { cx: 132, cy: 108, r: 9 } },
      { id: 'olho_direito', tipo: 'circle', decorativo: true, props: { cx: 168, cy: 108, r: 9 } },
      { id: 'boca', tipo: 'rect', decorativo: true, props: { x: 128, y: 136, width: 44, height: 11, rx: 5 } },
    ],
  },

  // Tinha 6 áreas (uma a mais que o teto da faixa) e a chaminé a 19×38px.
  // As duas janelas viraram uma só, maior: menos alvos e cada um maior.
  exp_colorir_casa: {
    viewBox: 300, nome: 'Casa',
    regioes: [
      { id: 'parede', tipo: 'rect', props: { x: 70, y: 150, width: 160, height: 100 } },
      { id: 'telhado', tipo: 'polygon', props: { points: '58,150 150,76 242,150' } },
      { id: 'chamine', tipo: 'rect', props: { x: 186, y: 88, width: 30, height: 50 } },
      { id: 'porta', tipo: 'rect', props: { x: 126, y: 182, width: 48, height: 68 } },
      { id: 'janela', tipo: 'rect', props: { x: 82, y: 172, width: 38, height: 42 } },
    ],
  },

  // O caule tinha 10 unidades de largura (10px) e as pétalas 32×16px.
  // 🪤 A primeira tentativa engordou as pétalas para rOuter=92 e a flor DEIXOU
  // DE PARECER UMA FLOR: a cabeça descia até y=224 e engolia o caule e as duas
  // folhas. Passou na auditoria de tamanho e estava visivelmente quebrada — só
  // apareceu ao renderizar. Cabeça subiu para cy=110 com rOuter=80, e o caule e
  // as folhas ficaram inteiramente abaixo de y=190.
  exp_colorir_flor: {
    viewBox: 300, nome: 'Flor',
    regioes: [
      { id: 'caule', tipo: 'rect', props: { x: 136, y: 186, width: 28, height: 90 } },
      { id: 'folha_esquerda', tipo: 'polygon', props: { points: '136,206 84,226 136,248' } },
      { id: 'folha_direita', tipo: 'polygon', props: { points: '164,206 216,226 164,248' } },
      { id: 'petalas', tipo: 'radial', props: { cx: 150, cy: 110, rInner: 30, rOuter: 80, n: 6, largura: 0.46 } },
      { id: 'miolo', tipo: 'circle', props: { cx: 150, cy: 110, r: 30 } },
    ],
  },

  // ── CONSTRUTORES (6–8) ────────────────────────────────────────────────────
  // Olho (15px) e as duas bolhas (12px e 8px) eram os menores alvos de todo o
  // Colorir. São detalhe de cena, não área de pintura.
  con_colorir_peixe: {
    viewBox: 300, nome: 'Peixe',
    regioes: [
      { id: 'cauda', tipo: 'polygon', props: { points: '205,150 252,108 252,192' } },
      { id: 'corpo', tipo: 'ellipse', props: { cx: 140, cy: 150, rx: 70, ry: 45 } },
      { id: 'barbatana_superior', tipo: 'polygon', props: { points: '112,108 145,62 172,110' } },
      { id: 'barbatana_inferior', tipo: 'polygon', props: { points: '112,192 145,238 172,190' } },
      { id: 'olho', tipo: 'circle', decorativo: true, props: { cx: 100, cy: 138, r: 9 } },
      { id: 'bolha1', tipo: 'circle', decorativo: true, props: { cx: 252, cy: 88, r: 7 }, cor: '#BAE6FD' },
      { id: 'bolha2', tipo: 'circle', decorativo: true, props: { cx: 270, cy: 66, r: 5 }, cor: '#BAE6FD' },
    ],
  },

  // A chama tinha 23px de largura — ficava logo abaixo do piso.
  con_colorir_foguete: {
    viewBox: 300, nome: 'Foguete',
    regioes: [
      { id: 'chama', tipo: 'polygon', props: { points: '130,198 150,252 170,198' } },
      { id: 'aleta_esquerda', tipo: 'polygon', props: { points: '126,168 88,226 126,198' } },
      { id: 'aleta_direita', tipo: 'polygon', props: { points: '174,168 212,226 174,198' } },
      { id: 'corpo', tipo: 'rect', props: { x: 126, y: 90, width: 48, height: 110, rx: 22 } },
      { id: 'ponta', tipo: 'polygon', props: { points: '126,90 174,90 150,32' } },
      { id: 'janela', tipo: 'circle', props: { cx: 150, cy: 130, r: 17 } },
    ],
  },

  // O corpo tinha 10 unidades de largura; a cabeça, 19px.
  con_colorir_borboleta: {
    viewBox: 300, nome: 'Borboleta',
    regioes: [
      { id: 'asa_sup_esq', tipo: 'ellipse', props: { cx: 104, cy: 118, rx: 46, ry: 33 } },
      { id: 'asa_sup_dir', tipo: 'ellipse', props: { cx: 196, cy: 118, rx: 46, ry: 33 } },
      { id: 'asa_inf_esq', tipo: 'ellipse', props: { cx: 110, cy: 176, rx: 36, ry: 26 } },
      { id: 'asa_inf_dir', tipo: 'ellipse', props: { cx: 190, cy: 176, rx: 36, ry: 26 } },
      { id: 'corpo', tipo: 'rect', props: { x: 137, y: 100, width: 26, height: 110, rx: 13 } },
      { id: 'cabeca', tipo: 'circle', decorativo: true, props: { cx: 150, cy: 92, r: 12 } },
    ],
  },

  // ── CRIADORES (9–11) ──────────────────────────────────────────────────────
  // Era o pior caso: 12 áreas pintáveis (teto da faixa é 10) e 8 delas abaixo
  // do piso. Rosto, botões e antena viraram traço; braços e pernas engordaram.
  cri_colorir_robo: {
    viewBox: 300, nome: 'Robô',
    regioes: [
      { id: 'braco_esquerdo', tipo: 'rect', props: { x: 48, y: 136, width: 42, height: 30, rx: 12 } },
      { id: 'braco_direito', tipo: 'rect', props: { x: 210, y: 136, width: 42, height: 30, rx: 12 } },
      { id: 'perna_esquerda', tipo: 'rect', props: { x: 102, y: 222, width: 32, height: 48, rx: 8 } },
      { id: 'perna_direita', tipo: 'rect', props: { x: 166, y: 222, width: 32, height: 48, rx: 8 } },
      { id: 'corpo', tipo: 'rect', props: { x: 90, y: 130, width: 120, height: 90, rx: 14 } },
      { id: 'cabeca', tipo: 'rect', props: { x: 110, y: 60, width: 80, height: 60, rx: 10 } },
      { id: 'antena', tipo: 'rect', decorativo: true, props: { x: 146, y: 34, width: 8, height: 26, rx: 4 } },
      { id: 'antena_bola', tipo: 'circle', decorativo: true, props: { cx: 150, cy: 30, r: 9 }, cor: '#F87171' },
      { id: 'olho_esquerdo', tipo: 'circle', decorativo: true, props: { cx: 132, cy: 90, r: 11 }, cor: '#7DD3FC' },
      { id: 'olho_direito', tipo: 'circle', decorativo: true, props: { cx: 168, cy: 90, r: 11 }, cor: '#7DD3FC' },
      { id: 'botao1', tipo: 'circle', decorativo: true, props: { cx: 130, cy: 172, r: 10 }, cor: '#FCD34D' },
      { id: 'botao2', tipo: 'circle', decorativo: true, props: { cx: 170, cy: 172, r: 10 }, cor: '#FCD34D' },
    ],
  },

  // As três maçãs tinham r=8 (15px). Cresceram em vez de virar traço: maçã é
  // coisa que criança quer pintar, e nesta faixa 29px já é alvo confortável.
  cri_colorir_arvore: {
    viewBox: 300, nome: 'Árvore',
    regioes: [
      { id: 'tronco', tipo: 'rect', props: { x: 135, y: 180, width: 30, height: 90, rx: 6 } },
      { id: 'copa_baixa', tipo: 'circle', props: { cx: 150, cy: 170, r: 60 } },
      { id: 'copa_meio', tipo: 'circle', props: { cx: 150, cy: 120, r: 48 } },
      { id: 'copa_topo', tipo: 'circle', props: { cx: 150, cy: 80, r: 35 } },
      { id: 'maca1', tipo: 'circle', props: { cx: 112, cy: 152, r: 15 } },
      { id: 'maca2', tipo: 'circle', props: { cx: 188, cy: 140, r: 15 } },
      { id: 'maca3', tipo: 'circle', props: { cx: 150, cy: 98, r: 15 } },
    ],
  },

  cri_colorir_carro: {
    viewBox: 300, nome: 'Carro',
    regioes: [
      { id: 'carroceria', tipo: 'rect', props: { x: 60, y: 140, width: 180, height: 60, rx: 16 } },
      { id: 'cabine', tipo: 'polygon', props: { points: '100,140 120,100 190,100 210,140' } },
      { id: 'janela_esquerda', tipo: 'polygon', props: { points: '106,136 124,106 148,106 148,136' } },
      { id: 'janela_direita', tipo: 'polygon', props: { points: '152,136 152,106 176,106 194,136' } },
      { id: 'roda_esquerda', tipo: 'circle', props: { cx: 105, cy: 205, r: 25 } },
      { id: 'roda_direita', tipo: 'circle', props: { cx: 205, cy: 205, r: 25 } },
      { id: 'farol', tipo: 'circle', props: { cx: 232, cy: 160, r: 14 } },
    ],
  },

  // ── INVENTORES (12+) — pode ter mais áreas, menores, mas nunca sob o piso ──
  // As duas janelinhas de 12×12px viraram uma grade decorativa de 6, que dá
  // mais cara de cidade do que duas manchas cinzas esperando dedo. Entraram
  // chão e mais dois prédios: a faixa pede 8–14 áreas e havia 8, das quais 2
  // reprovavam.
  inv_colorir_cidade: {
    viewBox: 300, nome: 'Cidade',
    regioes: [
      { id: 'ceu', tipo: 'rect', props: { x: 0, y: 0, width: 300, height: 300 } },
      { id: 'sol_fundo', tipo: 'circle', props: { cx: 250, cy: 60, r: 25 } },
      { id: 'predio5', tipo: 'rect', props: { x: 0, y: 175, width: 36, height: 95 } },
      { id: 'predio1', tipo: 'rect', props: { x: 40, y: 140, width: 50, height: 130 } },
      { id: 'predio2', tipo: 'rect', props: { x: 100, y: 90, width: 55, height: 180 } },
      { id: 'predio3', tipo: 'rect', props: { x: 165, y: 120, width: 45, height: 150 } },
      { id: 'predio4', tipo: 'rect', props: { x: 220, y: 160, width: 50, height: 110 } },
      { id: 'predio6', tipo: 'rect', props: { x: 274, y: 145, width: 26, height: 125 } },
      { id: 'chao', tipo: 'rect', props: { x: 0, y: 270, width: 300, height: 30 } },
      { id: 'janela1', tipo: 'rect', decorativo: true, props: { x: 110, y: 106, width: 14, height: 14 }, cor: '#FDE68A' },
      { id: 'janela2', tipo: 'rect', decorativo: true, props: { x: 132, y: 106, width: 14, height: 14 }, cor: '#FDE68A' },
      { id: 'janela3', tipo: 'rect', decorativo: true, props: { x: 110, y: 136, width: 14, height: 14 }, cor: '#FDE68A' },
      { id: 'janela4', tipo: 'rect', decorativo: true, props: { x: 132, y: 136, width: 14, height: 14 }, cor: '#FDE68A' },
      { id: 'janela5', tipo: 'rect', decorativo: true, props: { x: 110, y: 166, width: 14, height: 14 }, cor: '#FDE68A' },
      { id: 'janela6', tipo: 'rect', decorativo: true, props: { x: 132, y: 166, width: 14, height: 14 }, cor: '#FDE68A' },
    ],
  },

  // Os planetas menores (23px, 19px) e o anel (73×17px) ficavam sob o piso.
  // Todos cresceram e as órbitas foram reespaçadas para não encostar.
  inv_colorir_sistema_solar: {
    viewBox: 300, nome: 'Sistema Solar',
    regioes: [
      { id: 'fundo_espaco', tipo: 'rect', props: { x: 0, y: 0, width: 300, height: 300 } },
      { id: 'sol', tipo: 'circle', props: { cx: 40, cy: 150, r: 30 } },
      { id: 'planeta1', tipo: 'circle', props: { cx: 100, cy: 150, r: 15 } },
      { id: 'planeta2', tipo: 'circle', props: { cx: 142, cy: 150, r: 17 } },
      { id: 'planeta3', tipo: 'circle', props: { cx: 182, cy: 150, r: 14 } },
      { id: 'anel_planeta4', tipo: 'ellipse', props: { cx: 234, cy: 150, rx: 36, ry: 16 } },
      { id: 'planeta4', tipo: 'circle', props: { cx: 234, cy: 150, r: 20 } },
      { id: 'planeta5', tipo: 'circle', props: { cx: 285, cy: 150, r: 15 } },
    ],
  },

  // Torres (13px), pilares (17px) e o tabuleiro (17px de altura) eram todos
  // barras finas demais. Engordaram; os cabos acompanharam a nova posição.
  inv_colorir_ponte: {
    viewBox: 300, nome: 'Ponte',
    regioes: [
      { id: 'ceu', tipo: 'rect', props: { x: 0, y: 0, width: 300, height: 210 } },
      { id: 'agua', tipo: 'rect', props: { x: 0, y: 210, width: 300, height: 90 } },
      { id: 'cabo_esquerdo', tipo: 'polygon', props: { points: '68,56 150,124 78,124' } },
      { id: 'cabo_direito', tipo: 'polygon', props: { points: '232,56 150,124 222,124' } },
      { id: 'torre_esquerda', tipo: 'rect', props: { x: 54, y: 56, width: 28, height: 86 } },
      { id: 'torre_direita', tipo: 'rect', props: { x: 218, y: 56, width: 28, height: 86 } },
      { id: 'pilar_esquerdo', tipo: 'rect', props: { x: 58, y: 164, width: 28, height: 76 } },
      { id: 'pilar_direito', tipo: 'rect', props: { x: 214, y: 164, width: 28, height: 76 } },
      { id: 'tabuleiro', tipo: 'rect', props: { x: 38, y: 132, width: 224, height: 32, rx: 6 } },
    ],
  },
}

const ARQUIVO_DA_FAIXA = {
  exp: 'exploradores.js', con: 'construtores.js',
  cri: 'criadores.js',    inv: 'inventores.js',
}

// ── Serializador: chave sem aspas, para casar com o estilo do arquivo ────────
function emitir(valor, nivel) {
  const ind = '  '.repeat(nivel)
  const indInterno = '  '.repeat(nivel + 1)

  if (Array.isArray(valor)) {
    if (valor.length === 0) return '[]'
    return `[\n${valor.map(v => indInterno + emitir(v, nivel + 1)).join(',\n')}\n${ind}]`
  }
  if (valor && typeof valor === 'object') {
    const pares = Object.entries(valor).map(([k, v]) => `${indInterno}${k}: ${emitir(v, nivel + 1)}`)
    return `{\n${pares.join(',\n')}\n${ind}}`
  }
  return JSON.stringify(valor)
}

/** Acha o fim do objeto que começa em `abre` (índice da `{`), contando profundidade. */
function fimDoObjeto(texto, abre) {
  let n = 0
  for (let i = abre; i < texto.length; i++) {
    if (texto[i] === '{') n++
    else if (texto[i] === '}') { n--; if (n === 0) return i }
  }
  throw new Error('chave não fecha')
}

let trocados = 0

for (const [id, desenho] of Object.entries(DESENHOS)) {
  const arquivo = `${RAIZ}/${ARQUIVO_DA_FAIXA[id.slice(0, 3)]}`
  const texto = readFileSync(arquivo, 'utf8')

  const posId = texto.indexOf(`id: "${id}"`)
  if (posId === -1) { console.log(`⚠️  ${id}: não encontrado em ${arquivo}`); continue }

  const posDesenho = texto.indexOf('desenho: {', posId)
  if (posDesenho === -1) { console.log(`⚠️  ${id}: sem bloco desenho`); continue }

  const abre = texto.indexOf('{', posDesenho)
  const fecha = fimDoObjeto(texto, abre)

  // A indentação real do `desenho:` no arquivo, para o bloco novo encaixar.
  const inicioDaLinha = texto.lastIndexOf('\n', posDesenho) + 1
  const recuo = texto.slice(inicioDaLinha, posDesenho)
  const nivel = Math.round(recuo.length / 2)

  const novo = emitir(desenho, nivel)
  writeFileSync(arquivo, texto.slice(0, abre) + novo + texto.slice(fecha + 1), 'utf8')

  const pintaveis = desenho.regioes.filter(r => !r.decorativo).length
  const decorativas = desenho.regioes.length - pintaveis
  console.log(`✅ ${id.padEnd(26)} ${pintaveis} pintáveis + ${decorativas} decorativas`)
  trocados++
}

console.log(`\n${trocados} desenhos reescritos.`)
