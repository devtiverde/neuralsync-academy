/**
 * lib-fala.mjs — O ÚNICO lugar que decide, para cada tipo de atividade falada,
 * QUAL ARQUIVO o app pede e QUAL TEXTO ele contém.
 *
 * 🔑 POR QUE ISTO PRECISOU EXISTIR.
 * Essa regra estava copiada em quatro scripts (`gerar-audios-temas.mjs`,
 * `audios-deriva.mjs`, `regravar-cores.mjs`, `auditar-audio-arquivos.mjs`), cada um
 * jurando no comentário que seguia "as mesmas regras do gerador". Eles divergiram três
 * vezes, e as três viraram voz errada no ouvido da criança:
 *
 *  1. jul/2026 — `triangulino` narrando queijo: o texto do item mudou e o áudio velho
 *     ficou congelado.
 *  2. 15/09 — cores dizendo "Vermelho Morango. undefined.": `audios-deriva` montava a
 *     frase com `${c.frase}`, campo que NÃO existe no dado de cores (é `exemplo`).
 *     `undefined` virou fala, e ficou meses no ar.
 *  3. 18/09 — `numeros` deslocado em um: `audios-deriva` nomeava o arquivo pelo NÚMERO
 *     (`n`) e gravava o `display`, enquanto o componente pede pelo ÍNDICE e espera a
 *     `word`. A criança clicava no 2 e ouvia "um".
 *
 * As três têm a mesma causa: não era o mesmo código decidindo. Agora é.
 *
 * 🔑 A AUTORIDADE DO CAMINHO É O COMPONENTE, não este arquivo. Cada regra abaixo cita a
 * linha do componente que monta a URL. Se mudar lá, muda aqui — e é por isso que o
 * `conferir()` existe: ele lê os componentes e reclama se as duas pontas discordarem.
 */
import { readFileSync } from 'node:fs'

export const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/**
 * Cada tipo declara: onde estão os itens dentro de `dados`, como se chama o arquivo e
 * qual é o texto falado. `arquivo` recebe (item, índice) porque `numeros` — e só ele —
 * é endereçado pela POSIÇÃO na lista.
 */
export const REGRAS = {
  // AlfabetoAtividade.jsx: `${base}/${letra}.mp3` e `${base}/${letra}-palavra.mp3`
  alfabeto: {
    lista: 'letras',
    falas: (it) => {
      const l = String(it?.letra ?? '').trim()
      const p = String(it?.palavra ?? '').trim()
      return [
        { arquivo: `${l.toLowerCase()}.mp3`, texto: `${l}.`, campo: 'letra' },
        { arquivo: `${l.toLowerCase()}-palavra.mp3`, texto: `${p}.`, campo: 'palavra' },
      ]
    },
  },
  // FormasAtividade.jsx:114 — `/audio/formas/_temas/${slug(id)}/${slug(forma.id)}.mp3`
  formas: {
    lista: 'formas',
    falas: (it) => [{ arquivo: `${slug(it?.id ?? '')}.mp3`, texto: `${String(it?.nome ?? '').trim()}. ${String(it?.frase ?? '').trim()}`, campo: 'nome+frase' }],
  },
  // NumerosAtividade.jsx:51 — `/audio/numeros/_temas/${slug(id)}/${indice}.mp3`
  // 🔑 ÍNDICE, não `n`. Várias atividades repetem o mesmo `n` em itens diferentes
  // (frações com numerador 1, negativos e positivos), então `n` não é chave.
  numeros: {
    lista: 'numeros',
    falas: (it, i) => [{ arquivo: `${i}.mp3`, texto: String(it?.word ?? '').trim(), campo: 'word' }],
  },
  // CoresAtividade.jsx:61 — `/audio/cores/_temas/${slug(id)}/${slug(cor.id)}.mp3`
  // 🔑 O `exemplo` entra só se existir. Concatenar sem conferir foi o que pôs a palavra
  // "undefined" na boca da narradora por meses.
  cores: {
    lista: 'cores',
    falas: (it) => {
      const nome = String(it?.nome ?? '').trim()
      const ex = String(it?.exemplo ?? '').trim()
      return [{ arquivo: `${slug(it?.id ?? '')}.mp3`, texto: ex ? `${nome}. ${nome}, ${ex}.` : `${nome}.`, campo: 'nome+exemplo' }]
    },
  },
}

/** Carrega todas as atividades (dados base + as 4 faixas), sem repetir id. */
export async function todasAtividades() {
  const todas = []
  for (const f of ['exploradores', 'construtores', 'criadores', 'inventores']) {
    const m = await import(`../src/data/extra/${f}.js`)
    for (const v of Object.values(m)) if (Array.isArray(v)) todas.push(...v)
  }
  const base = await import('../src/data/atividadesData.js')
  for (const v of Object.values(base)) {
    const listas = Array.isArray(v) ? [v] : (v && typeof v === 'object' ? Object.values(v) : [])
    for (const l of listas) if (Array.isArray(l)) todas.push(...l)
  }
  const vistos = new Set()
  return todas.filter(a => a?.id && !vistos.has(a.id) && vistos.add(a.id))
}

/**
 * A lista completa do que DEVE existir: { tipo, atividade, pasta, arquivo, caminho,
 * texto, indice }. `caminho` é a chave usada no manifesto e na URL.
 *
 * 🔴 Fala vazia ou com "undefined" é ERRO, não aviso: gravar isso é pôr a palavra na
 * boca da narradora. Quem chama decide se aborta, mas o defeito vem marcado.
 */
export async function falasEsperadas(tipos = Object.keys(REGRAS)) {
  const atividades = await todasAtividades()
  const out = []
  for (const tipo of tipos) {
    const regra = REGRAS[tipo]
    if (!regra) throw new Error(`tipo desconhecido: ${tipo}`)
    for (const a of atividades.filter(x => x.tipo === tipo)) {
      const itens = a?.dados?.[regra.lista]
      if (!Array.isArray(itens)) continue          // sem override usa a lista padrão
      itens.forEach((it, i) => {
        for (const f of regra.falas(it, i)) {
          const texto = f.texto.trim()
          out.push({
            tipo, atividade: a.id, indice: i,
            pasta: `public/audio/${tipo}/_temas/${slug(a.id)}`,
            arquivo: f.arquivo,
            caminho: `${tipo}/_temas/${slug(a.id)}/${f.arquivo}`,
            texto,
            defeito: !texto ? `sem ${f.campo}` : /\bundefined\b/i.test(texto) ? `"undefined" na fala (${f.campo})` : null,
          })
        }
      })
    }
  }
  return out
}

/**
 * 🔑 VALIDA A REGRA CONTRA O COMPONENTE. Lê o .jsx e confirma que o trecho que monta a
 * URL continua sendo o que este arquivo assume. Não prova que a fala está certa — prova
 * que não estamos falando de um caminho que o app abandonou, que é como o
 * `auditar-audio-arquivos.mjs` passou meses dizendo "✅ todos existem" enquanto
 * procurava um nome que o app nunca pediu.
 */
export function conferir() {
  const checagens = [
    ['numeros', 'src/pages/atividades/NumerosAtividade.jsx', '_temas/${slug(atividadeId)}/${indice}.mp3'],
    ['cores', 'src/pages/atividades/CoresAtividade.jsx', '_temas/${slug(atividadeId)}/${slug(cor.id)}.mp3'],
    ['formas', 'src/pages/atividades/FormasAtividade.jsx', '_temas/${slug(atividadeId)}/${slug(forma.id)}.mp3'],
    ['alfabeto', 'src/pages/atividades/AlfabetoAtividade.jsx', '_temas/${slug(atividadeId)}'],
  ]
  const erros = []
  for (const [tipo, arquivo, trecho] of checagens) {
    let fonte = ''
    try { fonte = readFileSync(arquivo, 'utf8') } catch { erros.push(`${tipo}: não li ${arquivo}`); continue }
    if (!fonte.includes(trecho)) erros.push(`${tipo}: ${arquivo} não monta mais a URL como \`${trecho}\` — a regra aqui pode ter ficado para trás`)
  }
  return erros
}
