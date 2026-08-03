/**
 * testar-kids-merge.mjs — a mesclagem de `ns_kids` com o conteúdo local não pode APAGAR conteúdo.
 *
 * Por que existe: para publicar um vídeo do Kids TV numa categoria que ainda não tem linha no
 * banco, o caminho natural é inserir uma linha só com `id` e `video_id`. Com a mesclagem antiga
 * isso substituía o objeto local inteiro e a categoria perdia título, seções, fatos e o QUIZ —
 * em silêncio, sem erro nenhum, e o botão que paga as 30 moedas simplesmente sumia da tela.
 *
 * O teste roda contra as DUAS versões de propósito. Se a versão antiga também passasse, o teste
 * não estaria medindo nada — ver a lição "validar o instrumento antes da medida".
 *
 * Rodar:  node testar-kids-merge.mjs
 */
import { mesclarKids } from './src/lib/kidsMerge.js'
import { kidsData } from './src/data/kidsData.js'

// A implementação ANTIGA, preservada só para provar que o teste distingue as duas.
function mesclarAntiga(local, rows) {
  const merged = { ...local }
  if (rows && rows.length > 0) {
    rows.forEach(row => {
      merged[row.id] = {
        titulo:     row.titulo,
        emoji:      row.emoji,
        cor:        row.cor,
        introducao: row.introducao,
        secoes:     row.secoes,
        fatos:      row.fatos,
        quiz:       row.quiz,
        video_id:   row.video_id || null,
      }
    })
  }
  return merged
}

// Uma linha COMPLETA, como as 8 que já existem hoje em produção.
const linhaCompleta = {
  id: 'dinossauros',
  titulo: 'Dinossauros do banco',
  emoji: '🦖',
  cor: '#111111',
  introducao: 'introducao vinda do banco',
  secoes: [{ titulo: 's1' }],
  fatos: ['f1'],
  quiz: [{ pergunta: 'p1', opcoes: ['a', 'b'], correta: 0 }],
  video_id: 'VIDEO_COMPLETO',
}

// Uma linha PARCIAL: exatamente o que se insere para publicar um vídeo novo.
const linhaParcial = { id: 'tecnologia', video_id: 'VIDEO_NOVO', ativo: true, ordem: 9 }

const casos = [
  {
    nome: 'linha parcial mantém o QUIZ da categoria (senão o botão de +30 moedas some)',
    checar: (m) => Array.isArray(m.tecnologia?.quiz) && m.tecnologia.quiz.length === kidsData.tecnologia.quiz.length,
  },
  {
    nome: 'linha parcial mantém título, seções e fatos',
    checar: (m) =>
      m.tecnologia?.titulo === kidsData.tecnologia.titulo &&
      m.tecnologia?.secoes?.length === kidsData.tecnologia.secoes.length &&
      m.tecnologia?.fatos?.length === kidsData.tecnologia.fatos.length,
  },
  {
    nome: 'linha parcial aplica o video_id novo',
    checar: (m) => m.tecnologia?.video_id === 'VIDEO_NOVO',
  },
  {
    nome: 'linha completa continua sobrescrevendo tudo (não pode ter regressão nas 8 de hoje)',
    checar: (m) =>
      m.dinossauros?.titulo === 'Dinossauros do banco' &&
      m.dinossauros?.video_id === 'VIDEO_COMPLETO' &&
      m.dinossauros?.quiz?.length === 1,
  },
  {
    nome: 'categoria sem linha nenhuma fica intacta',
    checar: (m) => m.filosofia?.quiz?.length === kidsData.filosofia.quiz.length && m.filosofia?.video_id == null,
  },
]

function rodar(fn, rows) {
  const m = fn(kidsData, rows)
  return casos.map(c => {
    let ok = false
    try { ok = c.checar(m) === true } catch { ok = false }
    return { nome: c.nome, ok }
  })
}

const rows = [linhaCompleta, linhaParcial]
const nova   = rodar(mesclarKids, rows)
const antiga = rodar(mesclarAntiga, rows)

console.log('\n  MESCLAGEM ATUAL (src/hooks/useKids.js)\n')
nova.forEach(r => console.log(`   ${r.ok ? 'PASSOU ' : 'FALHOU '} ${r.nome}`))

console.log('\n  MESCLAGEM ANTIGA — precisa FALHAR, senão o teste não mede nada\n')
antiga.forEach(r => console.log(`   ${r.ok ? 'passou ' : 'falhou '} ${r.nome}`))

const passouTudo   = nova.every(r => r.ok)
const antigaFalhou = antiga.some(r => !r.ok)

console.log('')
if (!passouTudo) {
  console.error(`  ERRO: ${nova.filter(r => !r.ok).length} de ${nova.length} falharam na mesclagem atual.\n`)
  process.exit(1)
}
if (!antigaFalhou) {
  console.error('  ERRO: a mesclagem ANTIGA passou em tudo — o teste não distingue as duas e não prova nada.\n')
  process.exit(1)
}
console.log(`  OK — ${nova.length}/${nova.length} na atual, e a antiga falha em ${antiga.filter(r => !r.ok).length}. O teste mede.\n`)
