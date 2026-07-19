// ─────────────────────────────────────────────────────────────────────────────
// MUNDOS — vocabulário ÚNICO de navegação da área da criança.
//
// Problema que isto resolve (reportado pelo usuário em 2026-07-19):
// existiam DOIS eixos de filtro concorrentes, aplicados em AND na Trilha:
//   1. `materiaConfig` (16 matérias: "sobre O QUE é")     — vinha de getKidsLink()
//   2. `tipoOrder`     (16 tipos: "COMO se joga")          — vinha de atividade.tipo
// e um TERCEIRO na Home (`CATEGORIAS`, 7 grupos) que não batia com nenhum dos dois.
//
// Pior: `formas`, `cores`, `ingles` e `tecnologia` existiam nos DOIS eixos com nome e
// emoji quase idênticos. A criança não tinha como saber que eram coisas diferentes.
//
// Agora existe UM eixo só — estes mundos — usado igual na Home e na Trilha.
// ─────────────────────────────────────────────────────────────────────────────

export const MUNDOS = [
  { id: 'tudo',      label: 'Tudo',      icon: '🌟', cor: '#a78bfa' },
  { id: 'logica',    label: 'Números',   icon: '🔢', cor: '#3b82f6' },
  { id: 'letras',    label: 'Letras',    icon: '📖', cor: '#f59e0b' },
  { id: 'natureza',  label: 'Natureza',  icon: '🌍', cor: '#10b981' },
  { id: 'tecnologia',label: 'Tecnologia',icon: '🤖', cor: '#7C3AED' },
  { id: 'arte',      label: 'Arte',      icon: '🎨', cor: '#ec4899' },
  { id: 'emocoes',   label: 'Emoções',   icon: '💗', cor: '#f43f5e' },
  { id: 'descobrir', label: 'Descobrir', icon: '🎬', cor: '#06b6d4' },
]

export const MUNDO_POR_ID = Object.fromEntries(MUNDOS.map(m => [m.id, m]))

// ── Tamanho dos cards por faixa etária ───────────────────────────────────────
// Antes era fixo: tile 110px com ícone de 28px — o ícone ocupava ~8% da área, e é o
// ícone que a criança mira e reconhece, não a caixa.
// Âncora: a Nielsen Norman Group recomenda ~2cm (≈76px) de alvo para crianças pequenas,
// cerca do dobro dos 44px do nível AAA da WCAG (que é medida pensada em adulto).
// `sub` desliga o contador "N ativ." nas faixas que ainda não leem número com fluência.
// `filtro` desliga os chips por completo: nenhuma das 7 plataformas infantis de
// referência (Khan Kids, Duolingo ABC, PBS Kids, Toca Boca...) dá filtro pra criança
// pequena — o padrão é grade visual grande e navegação direta.
export const TAMANHOS = {
  exploradores: { tile: 168, icone: 72, label: 17, gap: 16, sub: false, filtro: false },
  construtores: { tile: 148, icone: 60, label: 16, gap: 14, sub: false, filtro: true },
  criadores:    { tile: 128, icone: 44, label: 14, gap: 12, sub: true,  filtro: true },
  inventores:   { tile: 112, icone: 34, label: 13, gap: 10, sub: true,  filtro: true },
}

export const tamanhoDaFaixa = faixa => TAMANHOS[faixa] || TAMANHOS.construtores

// ── De onde vinham as taxonomias antigas ─────────────────────────────────────

// as 16 matérias de `getKidsLink()` (src/lib/kidsLinks.js) colapsadas nos mundos.
// Toda matéria precisa estar aqui — o que faltar cai em 'descobrir' via getMundo().
export const MATERIA_PARA_MUNDO = {
  matematica: 'logica',
  fisica: 'logica',
  formas_cores: 'logica',   // geometria mora com números; a cor em si mora em Arte
  tecnologia: 'tecnologia',
  ingles: 'letras',
  filosofia: 'letras',
  animais: 'natureza',
  planeta_terra: 'natureza',
  frutas: 'natureza',
  corpo_humano: 'natureza',
  golfinhos: 'natureza',
  historia_brasil: 'natureza',
  transporte: 'natureza',
  profissoes: 'natureza',
  arte: 'arte',
  outros: 'descobrir',
}

// os `tipo` de atividade colapsados nos mesmos mundos.
// É isto que elimina a confusão: tipo deixa de ser um EIXO DE FILTRO próprio e passa a
// ser só mais uma coisa que aponta pra um mundo.
export const TIPO_PARA_MUNDO = {
  quiz: 'logica', memoria: 'logica', sequencia: 'logica', labirinto: 'logica',
  padrao: 'logica', blocos: 'logica', numeros: 'logica', formas: 'logica',
  'quebra-cabeca': 'logica', 'conectar-pontos': 'logica',
  'classificar-objetos': 'logica', 'sequencia-magica': 'logica',

  alfabeto: 'letras', silabas: 'letras', ingles: 'letras',
  'caca-palavras': 'letras', digitacao: 'letras', diario: 'letras',

  robo: 'tecnologia', quizia: 'tecnologia', 'neural-ai': 'tecnologia',

  cores: 'arte', colorir: 'arte', inventor: 'arte', musica: 'arte',

  'zona-emocoes': 'emocoes', 'historia-interativa': 'emocoes',

  kids: 'descobrir', ebook: 'descobrir', offline: 'descobrir',
}

// as 7 CATEGORIAS antigas da Home, pra não precisar reescrever os 29 hubItens de uma vez
export const CAT_ANTIGA_PARA_MUNDO = {
  tudo: 'tudo',
  raciocinio: 'logica',
  tecnologia: 'tecnologia',
  letras: 'letras',
  emocional: 'emocoes',
  conteudo: 'descobrir',
  offline: 'descobrir',
}

// Matérias do kidsLinks que são baldes genéricos demais pra virar mundo.
// `formas_cores` sozinha tem 137 atividades e mistura três coisas bem diferentes:
// alfabeto (que é Letras), cores (que é Arte) e formas (que é Números/geometria).
// Se a gente confiasse nela, o mundo Números engolia 214 das 399 atividades e Arte
// ficava com 2 — navegação inútil. Nesses casos o `tipo` da atividade é mais informativo.
const MATERIAS_GENERICAS = new Set(['formas_cores', 'outros'])

// ── Resolvedor único ─────────────────────────────────────────────────────────
// Aceita qualquer um dos vocabulários antigos e devolve sempre um id de mundo válido.
// Fallback é 'descobrir' (e não 'outros') porque 'descobrir' é um mundo de verdade que a
// criança enxerga — nada some da tela por falta de mapeamento.
export function getMundo(chave) {
  if (!chave) return 'descobrir'
  return (
    TIPO_PARA_MUNDO[chave] ||
    MATERIA_PARA_MUNDO[chave] ||
    CAT_ANTIGA_PARA_MUNDO[chave] ||
    (MUNDO_POR_ID[chave] ? chave : 'descobrir')
  )
}

// Resolve o mundo de uma atividade cruzando os dois sinais disponíveis.
// Regra: a MATÉRIA (tema) ganha, porque é o que a criança reconhece — um quiz sobre
// animais deve morar em Natureza, não em Números. A exceção são as matérias genéricas,
// onde o TIPO é mais informativo.
export function mundoDaAtividade(tipo, materia) {
  if (materia && !MATERIAS_GENERICAS.has(materia) && MATERIA_PARA_MUNDO[materia]) {
    return MATERIA_PARA_MUNDO[materia]
  }
  return getMundo(tipo) !== 'descobrir' ? getMundo(tipo) : getMundo(materia)
}
