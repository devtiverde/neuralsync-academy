/**
 * Bancada de teste das atividades — SÓ EXISTE EM DESENVOLVIMENTO.
 *
 * As 25 atividades só são alcançáveis clicando na Trilha, e cada uma recebe o
 * objeto `atividade` pelo state da navegação (`useLocation().state`). Quem abre
 * `/atividade/quiz` direto na barra de endereço cai num `navigate(-1)` imediato.
 * Isso torna impossível auditar as telas de forma automatizada: não há URL que
 * leve a um jogo montado.
 *
 * Esta rota resolve isso: `/dev/atividade/:tipo` escolhe uma atividade real
 * daquele tipo (opcionalmente de uma faixa etária específica via `?faixa=`) e
 * redireciona para a rota verdadeira já com o state preenchido. O jogo que roda
 * é o de produção, sem nenhuma alteração — muda só a porta de entrada.
 *
 * O arquivo inteiro é importado atrás de `import.meta.env.DEV`, que o Vite
 * substitui por `false` no build de produção: a rota, o atalho de autenticação
 * e este módulo somem do bundle publicado.
 */
import { useMemo } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import * as base from '../data/atividadesData'
import * as extra from '../data/atividadesExtra'

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']

/** Achata todos os `*PorFaixa` dos dois módulos numa lista só. */
function todasAtividades() {
  const out = []
  for (const mod of [base, extra]) {
    for (const valor of Object.values(mod)) {
      if (!valor || typeof valor !== 'object' || Array.isArray(valor)) continue
      for (const faixa of FAIXAS) {
        for (const at of valor[faixa] || []) out.push({ ...at, _faixa: faixa })
      }
    }
  }
  return out
}

/**
 * Alguns jogos não vêm da Trilha e não têm entrada nos dados — montam o próprio
 * conteúdo. Para esses basta um objeto mínimo com o que o GameShell/Intro leem.
 */
function atividadeSintetica(tipo) {
  return {
    id: `dev_${tipo}`,
    tipo,
    emoji: '🧪',
    titulo: `Teste — ${tipo}`,
    habilidade: 'Auditoria',
    historinha: 'Atividade aberta pela bancada de teste de desenvolvimento.',
    tempo_estimado: 5,
    xp_reward: 50,
    coins_reward: 10,
  }
}

export default function DevAtividade() {
  const { tipo } = useParams()
  const [params] = useSearchParams()
  const faixaAlvo = params.get('faixa')
  // `?id=` mira UMA atividade específica. Sem isto a bancada abre sempre a primeira
  // do tipo, e auditoria que só vê a primeira não vale muito: os casos que quebram
  // são justamente os extremos (a história mais longa, o desenho com mais regiões).
  const idAlvo = params.get('id')

  const atividade = useMemo(() => {
    const todas = todasAtividades()
    if (idAlvo) {
      const exata = todas.find(a => a.id === idAlvo)
      if (exata) return exata
    }
    const candidatas = todas.filter(a => a.tipo === tipo)
    const daFaixa = faixaAlvo ? candidatas.filter(a => a._faixa === faixaAlvo) : candidatas
    return (daFaixa[0] || candidatas[0] || atividadeSintetica(tipo))
  }, [tipo, faixaAlvo, idAlvo])

  // A criança ativa é lida do localStorage por várias atividades (faixa etária,
  // avatar, XP). Sem ela algumas caem em ramos de erro que não são o que se quer
  // auditar. Só preenche se não houver uma de verdade.
  useMemo(() => {
    try {
      if (!localStorage.getItem('ns_active_child')) {
        localStorage.setItem('ns_active_child', JSON.stringify({
          id: 'dev-child', nome: 'Teste QA', avatar: '🦊', nivel: 3, xp: 420,
          neural_coins: 120, streak_atual: 4,
          faixa_etaria: faixaAlvo || atividade._faixa || 'construtores',
        }))
      }
      sessionStorage.setItem('ns_dev_bypass', '1')
    } catch { /* modo privado */ }
    return null
  }, [atividade, faixaAlvo])

  return <Navigate to={`/atividade/${tipo}`} state={{ atividade }} replace />
}
