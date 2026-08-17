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
// 🪤 `colorirExtra2` e `musicaExtra` ficam FORA do barril `atividadesExtra`. Enquanto a
// bancada lia só os dois primeiros módulos, `?id=` de qualquer uma das 40 atividades desses
// dois (28 colorir + 12 musica) não encontrava nada e caía no fallback silencioso abaixo —
// a auditoria abria OUTRA atividade e relatava sucesso. É o mesmo esquecimento que deixou
// essas 28 fora do seed da economia até 08/08.
import * as colorir2 from '../data/colorirExtra2'
import * as musica from '../data/musicaExtra'

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']

/** Achata todos os `*PorFaixa` dos módulos de dados numa lista só. */
function todasAtividades() {
  const out = []
  for (const mod of [base, extra, colorir2, musica]) {
    // Módulo que exporta o mesmo objeto como named e como `default` entraria duas vezes.
    const vistos = new Set()
    for (const valor of Object.values(mod)) {
      if (!valor || typeof valor !== 'object' || Array.isArray(valor)) continue
      if (vistos.has(valor)) continue
      vistos.add(valor)
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
      // 🔑 `?id=` que não existe NÃO cai no fallback. Antes caía, e o efeito era mudo:
      // a auditoria pedia uma atividade, recebia outra, media a outra e relatava sucesso
      // com o nome da pedida. Um id errado tem que aparecer como falha, não virar acerto.
      return todas.find(a => a.id === idAlvo) || null
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
          faixa_etaria: faixaAlvo || atividade?._faixa || 'construtores',
        }))
      }
      sessionStorage.setItem('ns_dev_bypass', '1')
      // A auditoria confere ISTO em vez de confiar na URL: qual atividade foi REALMENTE
      // resolvida. Sem um sinal assim, "abri 528" e "abri a mesma 528 vezes" são
      // indistinguíveis de fora. Vai no `sessionStorage` (e não no `window`) pelo mesmo
      // motivo do `ns_dev_bypass` logo acima: sobrevive à navegação e não é escrita em
      // objeto global durante o render.
      sessionStorage.setItem('ns_dev_atividade', JSON.stringify(
        atividade ? { id: atividade.id, tipo: atividade.tipo, faixa: atividade._faixa } : null
      ))
    } catch { /* modo privado */ }
    return null
  }, [atividade, faixaAlvo])

  if (idAlvo && !atividade) {
    return (
      <div data-dev-erro="id-nao-encontrado" style={{ padding: 40, color: '#fca5a5', fontFamily: 'monospace', background: '#0f0a1e', minHeight: '100vh' }}>
        <h1 style={{ fontSize: 20, marginBottom: 12 }}>Atividade não encontrada</h1>
        <p>Nenhuma atividade com <code>id={idAlvo}</code> existe nos módulos de dados.</p>
        <p style={{ marginTop: 12, opacity: 0.75 }}>
          Se ela existe no repositório, o módulo dela provavelmente não está importado aqui
          em <code>src/dev/DevAtividade.jsx</code>.
        </p>
      </div>
    )
  }

  return <Navigate to={`/atividade/${tipo}`} state={{ atividade }} replace />
}
