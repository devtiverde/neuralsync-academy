// Mesclagem do conteúdo local do Kids TV (`src/data/kidsData.js`) com as linhas de `ns_kids`.
//
// Vive em módulo próprio, e não dentro do `useKids.js`, porque aquele arquivo importa o cliente
// do Supabase — um teste que importasse o hook subiria o cliente junto e não rodaria fora do
// Vite. Mesmo motivo que levou o `chave.ts` a sair de dentro do `kiwify-webhook/index.ts`.

// Campos que uma linha de `ns_kids` pode sobrescrever no conteúdo local.
const CAMPOS_DO_BANCO = ['titulo', 'emoji', 'cor', 'introducao', 'secoes', 'fatos', 'quiz', 'video_id']

/**
 * A linha do banco sobrescreve CAMPO A CAMPO, e só o que ela realmente preencheu.
 *
 * Antes isto substituía o objeto local INTEIRO. O efeito ficava invisível enquanto todas as 8
 * linhas do banco vinham completas: bastava inserir uma linha só com `id` e `video_id` — que é
 * exatamente o que se faz para publicar um vídeo novo numa categoria — para a categoria perder
 * título, seções, fatos e o QUIZ. Sem quiz, `KidsVideo.jsx` não desenha o botão (o gate é
 * `perguntas.length > 0`), a criança não ganha as 30 moedas e a tela vira um beco sem saída.
 * Nada disso daria erro: a tela só ficaria vazia.
 *
 * Coberto por `testar-kids-merge.mjs`.
 */
export function mesclarKids(local, rows) {
  const merged = { ...local }
  if (!rows || rows.length === 0) return merged

  rows.forEach(row => {
    const doBanco = {}
    for (const campo of CAMPOS_DO_BANCO) {
      if (row[campo] != null) doBanco[campo] = row[campo]
    }
    merged[row.id] = { ...(merged[row.id] || {}), ...doBanco }
  })

  return merged
}
