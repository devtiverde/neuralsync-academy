/**
 * audioUrl.js — carimba a versão do acervo de áudio na URL do mp3.
 *
 * 🔴 POR QUE ISTO PRECISOU EXISTIR: consertar o arquivo no disco NÃO alcança a criança.
 *
 * Os mp3 são servidos de `/audio/...`, um caminho que nunca muda de nome, e estão
 * cercados por DOIS caches que supõem o contrário:
 *   1. `public/_headers` manda `Cache-Control: public, max-age=604800` em `/audio/*` —
 *      sete dias no cache do próprio navegador.
 *   2. `public/sw.js` atende tudo que não é HTML com cache-first, justificando-se com
 *      "seguro porque o hash muda com o conteúdo". Isso vale para `/assets/`, que o Vite
 *      renomeia a cada build. Para `/audio/`, que não tem hash, o arquivo antigo fica
 *      guardado no aparelho INDEFINIDAMENTE.
 *
 * Resultado prático, medido em 18/09: 165 falas de `numeros` estavam erradas em
 * produção; regravar os arquivos e publicar teria deixado quem já abriu a atividade
 * ouvindo exatamente o mesmo erro. Subir o `CACHE` do Service Worker resolve a camada 2;
 * só a URL nova resolve as duas.
 *
 * 🔑 MEXEU NO CONTEÚDO DE ALGUM MP3? SOBE `AUDIO_V`. É a única coisa que faz o aparelho
 * de quem já jogou buscar o arquivo de novo. Editar a fonte não é publicar —
 * ver [[feedback_editar_a_fonte_nao_e_publicar]].
 */

// v2 (18/09/2026): regravação dos 341 áudios de `numeros`, que estavam deslocados em um.
export const AUDIO_V = '2'

/** `/audio/x.mp3` → `/audio/x.mp3?v=2`. Preserva query que já exista. */
export function audioUrl(caminho) {
  if (!caminho) return caminho
  return `${caminho}${caminho.includes('?') ? '&' : '?'}v=${AUDIO_V}`
}
