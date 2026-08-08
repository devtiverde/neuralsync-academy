// ──────────────────────────────────────────────────────────────────────
// BARRIL DE COMPATIBILIDADE — não edite atividade aqui.
//
// As atividades moram em `src/data/extra/<faixa>.js`, um arquivo por faixa.
// Este arquivo só junta as quatro de novo, com os mesmos nomes de export de
// antes, para quem precisa de TODAS as faixas de uma vez (o painel do pai
// procurando a atividade recomendada, a bancada de teste, o checador de ids).
//
// ⚠️ Quem precisa de UMA faixa só NÃO deve importar este arquivo: ele arrasta
// as quatro. Importe `src/data/extra/<faixa>.js` direto, como o useAtividades faz.
// ──────────────────────────────────────────────────────────────────────

import * as exploradores from './extra/exploradores.js'
import * as construtores from './extra/construtores.js'
import * as criadores from './extra/criadores.js'
import * as inventores from './extra/inventores.js'

export const alfabetoExtraPorFaixa = {
  exploradores: exploradores.alfabetoExtraPorFaixa,
  construtores: construtores.alfabetoExtraPorFaixa,
  criadores: criadores.alfabetoExtraPorFaixa,
  inventores: inventores.alfabetoExtraPorFaixa,
}
export const atividadesExtraPorFaixa = {
  exploradores: exploradores.atividadesExtraPorFaixa,
  construtores: construtores.atividadesExtraPorFaixa,
  criadores: criadores.atividadesExtraPorFaixa,
  inventores: inventores.atividadesExtraPorFaixa,
}
export const colorirExtraPorFaixa = {
  exploradores: exploradores.colorirExtraPorFaixa,
  construtores: construtores.colorirExtraPorFaixa,
  criadores: criadores.colorirExtraPorFaixa,
  inventores: inventores.colorirExtraPorFaixa,
}
export const coresExtraPorFaixa = {
  exploradores: exploradores.coresExtraPorFaixa,
  construtores: construtores.coresExtraPorFaixa,
  criadores: criadores.coresExtraPorFaixa,
  inventores: inventores.coresExtraPorFaixa,
}
export const fase2ExtraPorFaixa = {
  exploradores: exploradores.fase2ExtraPorFaixa,
  construtores: construtores.fase2ExtraPorFaixa,
  criadores: criadores.fase2ExtraPorFaixa,
  inventores: inventores.fase2ExtraPorFaixa,
}
export const fase3ExtraPorFaixa = {
  exploradores: exploradores.fase3ExtraPorFaixa,
  construtores: construtores.fase3ExtraPorFaixa,
  criadores: criadores.fase3ExtraPorFaixa,
  inventores: inventores.fase3ExtraPorFaixa,
}
export const fase4ExtraPorFaixa = {
  exploradores: exploradores.fase4ExtraPorFaixa,
  construtores: construtores.fase4ExtraPorFaixa,
  criadores: criadores.fase4ExtraPorFaixa,
  inventores: inventores.fase4ExtraPorFaixa,
}
export const fase5ExtraPorFaixa = {
  exploradores: exploradores.fase5ExtraPorFaixa,
  construtores: construtores.fase5ExtraPorFaixa,
  criadores: criadores.fase5ExtraPorFaixa,
  inventores: inventores.fase5ExtraPorFaixa,
}
export const formasExtraPorFaixa = {
  exploradores: exploradores.formasExtraPorFaixa,
  construtores: construtores.formasExtraPorFaixa,
  criadores: criadores.formasExtraPorFaixa,
  inventores: inventores.formasExtraPorFaixa,
}
export const inglesExtraPorFaixa = {
  exploradores: exploradores.inglesExtraPorFaixa,
  construtores: construtores.inglesExtraPorFaixa,
  criadores: criadores.inglesExtraPorFaixa,
  inventores: inventores.inglesExtraPorFaixa,
}
export const numerosExtraPorFaixa = {
  exploradores: exploradores.numerosExtraPorFaixa,
  construtores: construtores.numerosExtraPorFaixa,
  criadores: criadores.numerosExtraPorFaixa,
  inventores: inventores.numerosExtraPorFaixa,
}
export const silabasExtraPorFaixa = {
  exploradores: exploradores.silabasExtraPorFaixa,
  construtores: construtores.silabasExtraPorFaixa,
  criadores: criadores.silabasExtraPorFaixa,
  inventores: inventores.silabasExtraPorFaixa,
}
export const raciocinioExtraPorFaixa = {
  exploradores: exploradores.raciocinioExtraPorFaixa,
  construtores: construtores.raciocinioExtraPorFaixa,
  criadores: criadores.raciocinioExtraPorFaixa,
  inventores: inventores.raciocinioExtraPorFaixa,
}
export const quizExtraPorFaixa = {
  exploradores: exploradores.quizExtraPorFaixa,
  construtores: construtores.quizExtraPorFaixa,
  criadores: criadores.quizExtraPorFaixa,
  inventores: inventores.quizExtraPorFaixa,
}
