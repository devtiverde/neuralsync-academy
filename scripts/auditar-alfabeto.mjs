/**
 * As atividades de alfabeto estão coerentes?
 *
 * Relato do Cláudio (03/08): "tem atividades do alfabeto com a palavra errada de
 * acordo com desenho e áudio errado".
 *
 * O critério central é objetivo e não depende de opinião: numa atividade de
 * alfabeto, `palavra` TEM QUE COMEÇAR com `letra`. É a única coisa que a atividade
 * ensina. Se a letra é C e a palavra é "Água", a criança aprende errado.
 *
 * Os outros critérios pegam a marca de copiar-e-colar, que é como esse tipo de erro
 * entra: emoji repetido para palavras diferentes, letra repetida, letra faltando.
 *
 * Uso: node scripts/auditar-alfabeto.mjs
 */
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'

const raiz = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const carregar = rel => import(pathToFileURL(resolve(raiz, rel)).href)

// "Água" começa com A, "Ônibus" com O. Sem tirar o acento, toda palavra acentuada
// viraria falso positivo e afogaria os erros de verdade.
const semAcento = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
const inicial = s => semAcento(s).trim().charAt(0).toUpperCase()

const atividades = []
for (const f of FAIXAS) {
  const m = await carregar(`src/data/extra/${f}.js`)
  for (const chave of Object.keys(m)) {
    for (const a of m[chave]) if (a?.dados?.letras) atividades.push({ ...a, _faixa: f })
  }
}
// A atividade padrão de cada faixa não tem `dados.letras` — usa a lista embutida no
// componente. Ela também precisa ser conferida, senão o erro mais visível escapa.
const compEsc = (await import('node:fs')).readFileSync(resolve(raiz, 'src/pages/atividades/AlfabetoAtividade.jsx'), 'utf8')
const blocoPadrao = compEsc.match(/const LETRAS = \[([\s\S]*?)\n\]/)
if (blocoPadrao) {
  const itens = [...blocoPadrao[1].matchAll(/letra: '([^']+)',\s*palavra: '([^']+)',\s*emoji: '([^']+)'/g)]
    .map(([, letra, palavra, emoji]) => ({ letra, palavra, emoji }))
  if (itens.length) atividades.push({ id: '(padrão embutido no componente)', titulo: 'LETRAS', _faixa: 'todas', dados: { letras: itens } })
}

const achados = []
const alertas = []
function anotar(atividade, tipo, detalhe) {
  achados.push({ id: atividade.id, faixa: atividade._faixa, titulo: atividade.titulo, tipo, detalhe })
}

for (const a of atividades) {
  const itens = a.dados.letras
  const vistasLetras = new Map()
  const vistosEmojis = new Map()

  for (const it of itens) {
    const letra = (it.letra || '').toUpperCase()

    // 1. O ERRO QUE O CLÁUDIO VIU: a palavra não começa pela letra.
    if (letra && it.palavra && inicial(it.palavra) !== semAcento(letra).toUpperCase()) {
      anotar(a, 'palavra não começa com a letra', `${letra} → "${it.palavra}" ${it.emoji || ''}`)
    }

    // 2. Letra repetida dentro da mesma atividade.
    if (vistasLetras.has(letra)) {
      anotar(a, 'letra repetida', `${letra}: "${vistasLetras.get(letra)}" e "${it.palavra}"`)
    } else vistasLetras.set(letra, it.palavra)

    // 3. Emoji reaproveitado. ATENÇÃO: isto NÃO é erro por si só — o Unicode não tem
    //    emoji para cada flor nem distingue "Delfim" de "Golfinho", e tratar cada
    //    repetição como defeito produziu 223 "achados" que afogaram os 8 reais.
    //    Só vira problema de verdade quando o MESMO desenho serve a muitas letras: aí
    //    a criança vê a mesma figura a atividade inteira e ela deixa de ensinar algo.
    if (it.emoji) {
      vistosEmojis.set(it.emoji, [...(vistosEmojis.get(it.emoji) || []), it.palavra])
    } else {
      anotar(a, 'sem emoji', `${letra} → "${it.palavra}"`)
    }

    if (!it.palavra) anotar(a, 'sem palavra', `letra ${letra}`)
  }

  // Limiar de 3: dois sinônimos dividindo um emoji é limitação do Unicode; a mesma
  // figura em três letras ou mais é a atividade perdendo sentido.
  for (const [emoji, palavras] of vistosEmojis) {
    const distintas = [...new Set(palavras)]
    if (distintas.length >= 3) {
      alertas.push({ id: a.id, faixa: a._faixa, tipo: 'mesmo desenho em muitas letras',
        detalhe: `${emoji} usado em ${distintas.length}: ${distintas.join(', ')}` })
    }
  }
}

// ── relatório ───────────────────────────────────────────────────────────────────
console.log(`${atividades.length} atividades de alfabeto · ${atividades.reduce((t, a) => t + a.dados.letras.length, 0)} itens\n`)

function mostrarAlertas() {
  if (!alertas.length) return
  console.log(`
⚠️  ${alertas.length} ALERTA(S) — julgamento, não erro objetivo:`)
  for (const x of alertas) console.log(`   ${x.id} (${x.faixa}): ${x.detalhe}`)
}

if (!achados.length) {
  console.log('✅ Nenhum erro objetivo.')
  mostrarAlertas()
  process.exit(0)
}

const porTipo = {}
for (const x of achados) (porTipo[x.tipo] ||= []).push(x)

for (const [tipo, lista] of Object.entries(porTipo).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n❌ ${tipo} — ${lista.length}`)
  const porAtividade = {}
  for (const x of lista) (porAtividade[`${x.id} (${x.faixa})`] ||= []).push(x.detalhe)
  for (const [ativ, ds] of Object.entries(porAtividade)) {
    console.log(`   ${ativ}`)
    for (const d of ds) console.log(`     · ${d}`)
  }
}
console.log(`\nTotal: ${achados.length} ERRO(S) em ${new Set(achados.map(a => a.id)).size} atividades`)
mostrarAlertas()
process.exit(1)
