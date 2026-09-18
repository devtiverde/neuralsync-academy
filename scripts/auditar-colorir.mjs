/**
 * auditar-colorir.mjs — mede o tamanho REAL, em pixels de tela, de cada região
 * pintável das atividades de Colorir.
 *
 * POR QUE POR CÁLCULO E NÃO PELO NAVEGADOR
 * ----------------------------------------
 * O `auditar-toque.mjs` já acusa "3 alvos < 40px" no colorir, mas ele abre UMA
 * atividade (a primeira do tipo) e não diz qual desenho nem qual região. Aqui a
 * conta é direta: o SVG é `width:100%` com `viewBox` quadrado, então
 *
 *     pixels na tela = unidades do viewBox × (largura do SVG ÷ viewBox)
 *
 * e dá pra medir as 12 atividades de uma vez, sem subir servidor.
 *
 * A LARGURA DE REFERÊNCIA
 * -----------------------
 * Pior caso realista, celular de 360px:
 *   360 − 32 (padding do .game-content no celular) − 40 (padding do cartão) = 288px
 * O `maxWidth: 400px` do SVG só limita em tela grande, então 288 é o que a
 * criança pequena realmente tem na mão.
 *
 * 🪤 A PRIMEIRA VERSÃO DESTE SCRIPT REPROVOU 61 DE 86 REGIÕES, e a maior parte
 * era lixo. O critério era "menor lado < alvo da faixa", que reprova FORMA
 * ALONGADA: o corpo do foguete (38×106) e o tabuleiro da ponte (211×17) caíam
 * como "pequenos", quando na prática o dedo acerta os dois com folga pelo lado
 * comprido. Mesmo erro do `auditar-alfabeto` na primeira rodada.
 *
 * O QUE SE MEDE AGORA, em dois níveis separados
 * ---------------------------------------------
 *  🔴 REPROVA — algum lado abaixo de 24px. É o piso do WCAG 2.5.8 (AA) e pega
 *     o que é genuinamente difícil: olho, botão, bolha, maçã, poste fino. Num
 *     alvo assim a criança precisa de precisão nos DOIS eixos.
 *  🟡 APONTA — cabe num quadrado menor que o alvo da faixa, ou seja os dois
 *     lados são modestos ao mesmo tempo. Não é falha: é candidato a crescer
 *     quando a faixa é pequena. Forma comprida não entra aqui.
 *
 * Errar o alvo no Colorir CUSTA POUCO — pinta o vizinho e dá pra repintar. Por
 * isso o piso duro é 24px (AA) e não 44px (AAA): reprovar tudo abaixo de 44
 * transformaria desenho legítimo em erro e afogaria o que importa.
 *
 * O TERCEIRO CRITÉRIO É O QUE O CLÁUDIO PEDIU DE VERDADE
 * ------------------------------------------------------
 * "escalar a dificuldade por faixa etária" — o número de regiões pintáveis tem
 * que CRESCER com a idade. Criança de 4 anos quer poucas áreas grandes; de 12
 * aguenta um desenho detalhado. Isso é medido por atividade, no fim.
 *
 * 🪤 A região `radial` (os raios do sol) é um `<g>` com UM onClick para N
 * triângulos. Medir a rosca inteira daria "190px" e esconderia que a criança
 * está mirando numa ponta fina. Aqui mede-se UM triângulo, que é o que o dedo
 * precisa acertar.
 *
 * Uso: node scripts/auditar-colorir.mjs
 * Sai com código ≠ 0 se houver reprovação dura ou contagem fora da faixa.
 */
import { colorirExtraPorFaixa as exploradores } from '../src/data/extra/exploradores.js'
import { colorirExtraPorFaixa as construtores } from '../src/data/extra/construtores.js'
import { colorirExtraPorFaixa as criadores }    from '../src/data/extra/criadores.js'
import { colorirExtraPorFaixa as inventores }   from '../src/data/extra/inventores.js'

const LARGURA_SVG = 288

/** Piso duro, WCAG 2.5.8 (AA). Abaixo disso é difícil em qualquer idade. */
const PISO_DURO = 24

const FAIXAS = [
  // `confortavel` = lado do quadrado que a região deveria comportar nesta idade.
  // `regioes` = quantas áreas PINTÁVEIS o desenho deve ter (a dificuldade que
  // o Cláudio pediu para escalar).
  { nome: 'exploradores', idade: '4–5',  confortavel: 64, regioes: [3, 5],  lista: exploradores },
  { nome: 'construtores', idade: '6–8',  confortavel: 52, regioes: [4, 7],  lista: construtores },
  { nome: 'criadores',    idade: '9–11', confortavel: 44, regioes: [6, 10], lista: criadores },
  { nome: 'inventores',   idade: '12+',  confortavel: 40, regioes: [8, 14], lista: inventores },
]

/**
 * Mesma fórmula do componente — se ela mudar lá, muda aqui.
 * 🪤 `largura` foi esquecido aqui numa primeira versão: o script media com o
 * 0.32 fixo enquanto o desenho já usava 0.46, e reprovava uma pétala que na
 * tela estava certa. Medida errada acusando desenho certo.
 */
function pontosDoTriangulo(cx, cy, rInner, rOuter, n, i, largura = 0.32) {
  const passo = (2 * Math.PI) / n
  const meio = passo * largura
  const centro = passo * i
  return [
    [cx + rOuter * Math.cos(centro),        cy + rOuter * Math.sin(centro)],
    [cx + rInner * Math.cos(centro - meio), cy + rInner * Math.sin(centro - meio)],
    [cx + rInner * Math.cos(centro + meio), cy + rInner * Math.sin(centro + meio)],
  ]
}

const caixaDePontos = pts => {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1])
  return [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)]
}

/** Devolve [largura, altura] em unidades do viewBox, ou null se o tipo for desconhecido. */
function medir(regiao) {
  const p = regiao.props || {}
  switch (regiao.tipo) {
    case 'circle':  return [p.r * 2, p.r * 2]
    case 'rect':    return [p.width, p.height]
    case 'ellipse': return [p.rx * 2, p.ry * 2]
    case 'polygon':
      return caixaDePontos(String(p.points).trim().split(/\s+/).map(par => par.split(',').map(Number)))
    case 'radial':
      return caixaDePontos(pontosDoTriangulo(p.cx, p.cy, p.rInner, p.rOuter, p.n, 0, p.largura ?? 0.32))
    case 'path':
      // 🔑 Bézier não se mede por regra de três. O importador grava o `bbox` já
      // calculado; sem ele, devolvemos null DE PROPÓSITO — o desenho aparece como
      // "não medida" em vez de passar calado. Medida que não existe não pode virar ✅.
      return Array.isArray(p.bbox) && p.bbox.length === 2 ? p.bbox : null
    default:
      return null
  }
}

let reprovadas = 0
let apontadas = 0
let contagemErrada = 0
let balderros = 0
let totalRegioes = 0
const desconhecidas = []

console.log(`\n🖍️  Colorir — regiões medidas a ${LARGURA_SVG}px (celular de 360px)`)
console.log(`   🔴 reprova abaixo de ${PISO_DURO}px em algum lado (WCAG 2.5.8 AA)`)
console.log(`   🟡 aponta quando os DOIS lados ficam abaixo do confortável da faixa\n`)

for (const faixa of FAIXAS) {
  const [minR, maxR] = faixa.regioes
  console.log(`━━ ${faixa.nome} (${faixa.idade}) · confortável ${faixa.confortavel}px · ${minR}–${maxR} regiões pintáveis ━━`)

  for (const atividade of faixa.lista) {
    const desenho = atividade?.dados?.desenho
    // Atividade do modo BALDE não tem regiões declaradas — é imagem. Ela é medida
    // na seção de baixo, com o rotulador do app. 🪤 Antes caía aqui como
    // "sem desenho", o que LIA como defeito em 11 atividades saudáveis e, pior,
    // deixava o modo novo sem auditoria nenhuma.
    if (!desenho && atividade?.dados?.imagem) continue
    if (!desenho) { console.log(`  ⚠️  ${atividade.id}: sem desenho e sem imagem`); continue }

    const escala = LARGURA_SVG / desenho.viewBox
    const duros = []
    const modestos = []
    let pintaveis = 0

    for (const regiao of desenho.regioes) {
      totalRegioes++
      // Região decorativa é desenhada mas não é clicável nem entra no progresso
      // — é traço, não área de pintura. Não faz sentido cobrar alvo dela.
      if (regiao.decorativo) continue
      pintaveis++

      const bruto = medir(regiao)
      if (!bruto) { desconhecidas.push(`${atividade.id}/${regiao.id} (tipo "${regiao.tipo}")`); continue }

      const [l, a] = bruto.map(v => Math.round(v * escala))
      const menor = Math.min(l, a)

      if (menor < PISO_DURO) duros.push({ id: regiao.id, l, a })
      else if (l < faixa.confortavel && a < faixa.confortavel) modestos.push({ id: regiao.id, l, a })
    }

    const foraDaContagem = pintaveis < minR || pintaveis > maxR
    reprovadas += duros.length
    apontadas  += modestos.length
    if (foraDaContagem) contagemErrada++

    const icone = duros.length || foraDaContagem ? '🔴' : modestos.length ? '🟡' : '✅'
    const nota = foraDaContagem ? ` ← fora de ${minR}–${maxR}` : ''
    console.log(`  ${icone} ${atividade.id.padEnd(26)} ${String(pintaveis).padStart(2)} pintáveis${nota}`)
    for (const p of duros)    console.log(`       🔴 ${p.id.padEnd(20)} ${p.l}×${p.a}px`)
    for (const p of modestos) console.log(`       🟡 ${p.id.padEnd(20)} ${p.l}×${p.a}px`)
  }
  console.log('')
}

// ════════════════════════════════════════════════════════════════════════════
// MODO BALDE (dados.imagem) — a conta é outra: as áreas não são declaradas, são
// DESCOBERTAS na imagem pelo mesmo rotulador que o app usa em tempo de execução.
//
// 🔑 O que se mede aqui, e por quê: a atividade só termina quando TODAS as áreas
// contáveis são pintadas. Então o número que importa não é "quantas áreas tem" —
// é "todas elas são alcançáveis pelo dedo?". Se uma não for, a criança pinta tudo
// o que vê, o progresso empaca e a tela de "Ficou lindo!" (com o XP) nunca vem.
// Foi exatamente o que acontecia com as 11 do lote de 15/09.
// ════════════════════════════════════════════════════════════════════════════
const balde = FAIXAS.flatMap(f => f.lista.filter(a => a?.dados?.imagem).map(a => ({ faixa: f, a })))

if (balde.length) {
  const { default: sharp } = await import('sharp')
  const { rotularAreas, discosInscritos, DISCO_MINIMO_REL } = await import('../src/lib/balde.js')
  const { readFileSync, existsSync } = await import('node:fs')

  // Piso e teto DUROS. Fora deles o desenho não serve: abaixo de 4 áreas é pobre
  // de pintar, acima de 60 vira caça-níquel para qualquer idade.
  const MIN_AREAS = 4
  const MAX_AREAS = 60
  // Faixa confortável (só 🟡): quantas áreas a idade aguenta pintar ATÉ O FIM.
  const CONFORTAVEL = {
    exploradores: 20, construtores: 30, criadores: 40, inventores: 60,
  }

  console.log('🪣 Modo balde de tinta (desenho de traço, áreas descobertas na imagem)')
  console.log(`   piso de alcance: disco de ${(DISCO_MINIMO_REL * 100).toFixed(1)}% da largura da folha`)
  console.log(`   medido aqui a ${LARGURA_SVG}px de tela, junto com o resto (o motor decide em`)
  console.log(`   pixels da imagem, então a régua da tela é a mesma nos dois lados da conta)\n`)

  for (const { faixa, a } of balde) {
    const caminho = `public${a.dados.imagem.src}`
    if (!existsSync(caminho)) {
      console.log(`  🔴 ${a.id.padEnd(24)} arquivo não existe: ${caminho}`)
      balderros++
      continue
    }
    const { data, info } = await sharp(readFileSync(caminho))
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const r = rotularAreas({ width: info.width, height: info.height, data })
    const raios = r.raios ?? discosInscritos(r.rotulos, info.width, info.height)
    const escalaTela = LARGURA_SVG / info.width
    const menorDisco = Math.min(...[...r.contaveis].map(rot => (raios.get(rot)?.raio ?? 0) * 2 * escalaTela))
    const piso = DISCO_MINIMO_REL * info.width * escalaTela

    const problemas = []
    if (a.dados.imagem.areas !== r.total) {
      problemas.push(`o dado diz ${a.dados.imagem.areas} áreas e a imagem tem ${r.total} — o progresso é calculado na imagem, então o dado está desatualizado`)
    }
    if (r.total < MIN_AREAS) problemas.push(`só ${r.total} área(s) contável(eis)`)
    if (r.total > MAX_AREAS) problemas.push(`${r.total} áreas para pintar até o fim — caça-níquel`)
    if (menorDisco + 0.01 < piso) problemas.push(`área de ${menorDisco.toFixed(1)}px abaixo do piso de ${piso.toFixed(1)}px — inalcançável, trava a conclusão`)
    if (!a.dados.imagem.fonte) problemas.push('sem campo `fonte`: origem e licença não declaradas')

    const folgado = r.total > (CONFORTAVEL[faixa.nome] ?? 60)
    const icone = problemas.length ? '🔴' : folgado ? '🟡' : '✅'
    console.log(`  ${icone} ${a.id.padEnd(24)} ${String(r.total).padStart(3)} áreas · menor alcance ${menorDisco.toFixed(0)}px · ${r.candidatas.length - r.total} fresta(s) ignorada(s)`)
    if (folgado && !problemas.length) console.log(`       🟡 ${r.total} áreas é muito para ${faixa.nome} pintar até o fim (confortável: ${CONFORTAVEL[faixa.nome]})`)
    for (const p of problemas) console.log(`       🔴 ${p}`)
    balderros += problemas.length
  }
  console.log('')
}

if (desconhecidas.length) {
  console.log('❓ Tipos que este script não sabe medir (e portanto NÃO foram verificados):')
  for (const d of desconhecidas) console.log(`   ${d}`)
  console.log('')
}

console.log(`${totalRegioes} regiões analisadas.`)
console.log(`🔴 ${reprovadas} abaixo de ${PISO_DURO}px · 🟡 ${apontadas} modestas para a faixa · ${contagemErrada} desenho(s) com contagem fora da faixa · ${balderros} problema(s) no modo balde (${balde.length} desenho(s) medido(s))`)

const falhou = reprovadas > 0 || contagemErrada > 0 || desconhecidas.length > 0 || balderros > 0
console.log(falhou ? '' : '✅ Colorir dentro do esperado em todas as faixas.\n')
process.exit(falhou ? 1 : 0)
