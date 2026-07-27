import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { gravar } from '../../lib/gravar'
import { tipoConfig } from '../../data/atividadesData'
import { hasEffect, consumePowerup } from '../../lib/powerups'
import { foiAssistido } from '../atividades/IntroAtividade'
import { useAtividades } from '../../hooks/useAtividades'
import { getTrilhaSemanal, getTemaAtual, isDiaConcluido, getDiaHoje, DIAS_CURTO, getFaixaConfig } from '../../lib/trilhaSemanal'
import { temas } from '../../data/temasData'
import { useAuth } from '../../contexts/AuthContext'
import LayoutCrianca from '../../components/LayoutCrianca'
import { Target, Star, CheckCircle, Trophy, MagnifyingGlass } from '@phosphor-icons/react'
import '../../styles/crianca.css'


const nomeFaixa = {
  exploradores: 'Exploradores 🔍',
  construtores: 'Construtores 🔧',
  criadores:    'Criadores 🎨',
  inventores:   'Inventores 💡',
}

function semanaAtual() {
  const d = new Date()
  const start = new Date(d.getFullYear(), 0, 0)
  const day = Math.floor((d - start) / 86400000)
  return `${d.getFullYear()}-W${Math.floor(day / 7)}`
}

function semanaDoTimestamp(ts) {
  const d = new Date(ts)
  const start = new Date(d.getFullYear(), 0, 0)
  const day = Math.floor((d - start) / 86400000)
  return `${d.getFullYear()}-W${Math.floor(day / 7)}`
}

function hojeStr() { return new Date().toISOString().slice(0, 10) }

function hashStr(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

function gerarMissao(atividades, childId, timerMin) {
  const seed = hashStr(hojeStr() + (childId || 'anonimo'))
  const shuffled = [...atividades].sort((a, b) => hashStr(seed + a.id) - hashStr(seed + b.id))
  let tempoAcum = 0
  const selecionadas = []
  const tiposUsados = new Set()
  for (const at of shuffled) {
    const t = at.tempo_estimado || 10
    if (tempoAcum + t <= timerMin && !tiposUsados.has(at.tipo)) {
      selecionadas.push(at); tempoAcum += t; tiposUsados.add(at.tipo)
      if (selecionadas.length >= 4) break
    }
  }
  if (selecionadas.length < 2) {
    for (const at of shuffled) {
      if (!selecionadas.find(s => s.id === at.id)) { selecionadas.push(at); if (selecionadas.length >= 2) break }
    }
  }
  return selecionadas
}

export default function Trilha() {
  const navigate = useNavigate()
  const { state: navState } = useLocation()
  const { user } = useAuth()

  const [faixa, setFaixa] = useState('construtores')
  const [concluidas, setConcluidas] = useState([])
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState(() => new URLSearchParams(window.location.search).get('tipo') || 'todos')
  const [gridKey, setGridKey] = useState(0)
  const [child, setChild] = useState(null)
  const [desafioReivindicado, setDesafioReivindicado] = useState(false)
  const [missao, setMissao] = useState([])
  const [missaoBonusReivindicado, setMissaoBonusReivindicado] = useState(false)
  const [trilhaSemanal, setTrilhaSemanal] = useState(null)
  const [temaAtual, setTemaAtual] = useState(null)
  // Resgate e pulo agora esperam a gravacao: estes estados travam o botao no
  // intervalo e avisam quando nao deu, em vez de marcar como resgatado a seco.
  const [resgatando, setResgatando] = useState(null)
  const [pulando, setPulando] = useState(null)
  const [falhaGravacao, setFalhaGravacao] = useState(false)

  function avisarFalha() {
    setFalhaGravacao(true)
    setTimeout(() => setFalhaGravacao(false), 4500)
  }

  const { atividades: activities } = useAtividades(faixa)

  useEffect(() => {
    const c = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    setChild(c)
    if (c?.faixa_etaria) setFaixa(c.faixa_etaria)
    else if (user?.id) {
      supabase.from('children').select('faixa_etaria').eq('parent_id', user.id).limit(1).then(({ data }) => {
        setFaixa(data?.[0]?.faixa_etaria || 'construtores')
      })
    }
    if (c?.id) {
      const chave = `ns_desafio_${c.id}_${semanaAtual()}`
      setDesafioReivindicado(!!localStorage.getItem(chave))
      // o filtro de tipo agora vem SÓ da URL (deep-link vindo do hub da Home).
      // antes ele era restaurado do localStorage, e como a Trilha da Semana, a Missão do
      // Dia e o Desafio só aparecem sem filtro, a criança voltava dias depois e achava a
      // tela "quebrada" sem entender por quê.
      const params = new URLSearchParams(window.location.search)
      const urlTipo = params.get('tipo')
      if (urlTipo) setFiltroTipo(urlTipo)
    }
  }, [])

  useEffect(() => {
    try {
      const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
      const c = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
      if (!c?.id) return
      const semana = semanaAtual()
      const ids = new Set()
      hist.filter(h => h.child_id === c.id && h.atividade_id && semanaDoTimestamp(h.timestamp) === semana).forEach(h => ids.add(h.atividade_id))
      setConcluidas([...ids])
    } catch {}
  }, [])

  useEffect(() => {
    if (!activities.length || !child?.id) return
    const tema = getTemaAtual()
    setTemaAtual(tema)
    const trilha = getTrilhaSemanal(activities, child.id, faixa)
    setTrilhaSemanal(trilha)
  }, [activities, child])

  useEffect(() => {
    if (!activities.length || !child?.id) return
    const hoje = hojeStr()
    const chave = `ns_missao_${child.id}_${hoje}`
    const saved = (() => { try { return JSON.parse(localStorage.getItem(chave) || 'null') } catch { return null } })()
    if (saved?.bonus_claimed) setMissaoBonusReivindicado(true)
    let missionIds = saved?.atividades
    if (!missionIds || missionIds.length === 0) {
      const timerConfig = (() => { try { return JSON.parse(localStorage.getItem('ns_timer_config') || 'null') } catch { return null } })()
      const timerMin = timerConfig?.duracao ?? 30
      const geradas = gerarMissao(activities, child.id, timerMin)
      missionIds = geradas.map(a => a.id)
      localStorage.setItem(chave, JSON.stringify({ atividades: missionIds, bonus_claimed: false }))
    }
    setMissao(missionIds.map(id => activities.find(a => a.id === id)).filter(Boolean))
  }, [activities, child])

  // GRAVAR PRIMEIRO, MARCAR DEPOIS.
  //
  // Os dois bônus abaixo são de resgate único: gravam uma marca em localStorage
  // que impede pedir de novo. Antes, a marca era escrita mesmo quando a gravação
  // falhava (o `await` estava lá, mas ninguém olhava o `error`) — resultado: a
  // criança clicava em "resgatar", o servidor não recebia o XP, e ela **nunca
  // mais** conseguia resgatar aquele bônus. Perda definitiva e silenciosa.
  //
  // Invertendo a ordem, uma falha vira apenas "não deu, tenta de novo".

  async function pularAtividade(at) {
    if (!child?.id || pulando) return
    setPulando(at.id)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setPulando(null); return }

    const agora = Date.now()
    const dataBr = new Date().toLocaleDateString('pt-BR')
    const ok = await gravar(
      supabase.from('ns_historico').insert({ child_id: child.id, parent_id: user.id, titulo: at.titulo, xp: 0, coins: 0, emoji: at.emoji || '⭐', tipo: at.tipo, data: dataBr, timestamp: agora }),
      'trilha:pular-atividade',
    )
    setPulando(null)
    if (!ok) { avisarFalha(); return } // o power-up de pular continua com ela

    try {
      const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
      hist.unshift({ child_id: child.id, titulo: at.titulo, xp: 0, coins: 0, emoji: at.emoji || '⭐', tipo: at.tipo, atividade_id: at.id, timestamp: agora, data: dataBr })
      localStorage.setItem('ns_historico', JSON.stringify(hist.slice(0, 50)))
    } catch { /* modo privado: o servidor já tem a linha */ }
    consumePowerup(child.id, 'pu_pular')
    setConcluidas(prev => [...prev, at.id])
  }

  async function reivindicarDesafio() {
    if (!child?.id || desafioReivindicado || resgatando) return
    setResgatando('desafio')
    const novoXp = (child.xp || 0) + 500
    const novasCoins = (child.neural_coins || 0) + 500

    const ok = await gravar(
      supabase.from('children').update({ xp: novoXp, neural_coins: novasCoins }).eq('id', child.id),
      'trilha:bonus-desafio-semanal',
    )
    setResgatando(null)
    if (!ok) { avisarFalha(); return }

    const updated = { ...child, xp: novoXp, neural_coins: novasCoins }
    setChild(updated)
    try {
      localStorage.setItem('ns_active_child', JSON.stringify(updated))
      localStorage.setItem(`ns_desafio_${child.id}_${semanaAtual()}`, '1')
    } catch { /* modo privado */ }
    setDesafioReivindicado(true)
  }

  async function reivindicarMissao() {
    if (!child?.id || missaoBonusReivindicado || resgatando) return
    setResgatando('missao')
    const BONUS_XP = 75, BONUS_COINS = 75
    const novoXp = (child.xp || 0) + BONUS_XP
    const novasCoins = (child.neural_coins || 0) + BONUS_COINS

    const ok = await gravar(
      supabase.from('children').update({ xp: novoXp, neural_coins: novasCoins }).eq('id', child.id),
      'trilha:bonus-missao-do-dia',
    )
    setResgatando(null)
    if (!ok) { avisarFalha(); return }

    const updated = { ...child, xp: novoXp, neural_coins: novasCoins }
    setChild(updated)
    try {
      localStorage.setItem('ns_active_child', JSON.stringify(updated))
      const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
      hist.unshift({ child_id: child.id, titulo: 'Missão do Dia Concluída!', xp: BONUS_XP, coins: BONUS_COINS, emoji: '🎯', tipo: 'missao', data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }), timestamp: Date.now() })
      localStorage.setItem('ns_historico', JSON.stringify(hist))
      const chave = `ns_missao_${child.id}_${hojeStr()}`
      const saved = (() => { try { return JSON.parse(localStorage.getItem(chave) || 'null') } catch { return null } })()
      localStorage.setItem(chave, JSON.stringify({ ...saved, bonus_claimed: true }))
    } catch { /* modo privado */ }
    setMissaoBonusReivindicado(true)
  }

  function changeTipo(tipo) {
    setFiltroTipo(tipo)
    setGridKey(k => k + 1)
    const url = new URL(window.location.href)
    if (tipo === 'todos') url.searchParams.delete('tipo')
    else url.searchParams.set('tipo', tipo)
    window.history.replaceState({}, '', url.toString())
  }
  const atividadesVisiveis = activities
    .filter(a => filtroTipo === 'todos' || a.tipo === filtroTipo)
    .filter(a => {
      const q = busca.trim().toLowerCase()
      if (!q) return true
      // normaliza acento: criança digita "matematica" e deve achar "Matemática"
      const semAcento = t => (t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      const alvo = semAcento(a.titulo) + ' ' + semAcento(a.descricao)
      return alvo.includes(semAcento(q))
    })
  const getStatus = (act) => concluidas.includes(act.id) ? 'concluido' : 'andamento'
  const totalConcluidas = activities.filter(a => getStatus(a) === 'concluido').length
  const total = activities.length
  const pct = total > 0 ? Math.round((totalConcluidas / total) * 100) : 0
  // ordena na MESMA sequência em que os mundos aparecem na Home — a criança vê os
  // mesmos ícones, na mesma ordem, nas duas telas
  // agrupa e ordena por TIPO, na mesma ordem do tipoConfig que a Home usa —
  // categoria/tema deixou de ser eixo de navegação
  const ordemTipos = Object.keys(tipoConfig)
  const tiposDisponiveis = [...new Set(activities.map(a => a.tipo))]
    .filter(t => tipoConfig[t])
    .sort((a, b) => ordemTipos.indexOf(a) - ordemTipos.indexOf(b))
  const missaoConcluidas = missao.filter(a => concluidas.includes(a.id)).length
  const missaoCompleta = missao.length > 0 && missaoConcluidas === missao.length
  const tempoMissao = missao.reduce((s, a) => s + (a.tempo_estimado || 10), 0)

  function iniciarAtividade(act) {
    navigate(`/atividade/${act.tipo}`, { state: { atividade: act, refazendo: getStatus(act) === 'concluido' } })
  }

  const renderCard = (act) => {
    const s = getStatus(act)
    const tc = tipoConfig[act.tipo]
    const naMissao = missao.some(m => m.id === act.id)
    const isDone = s === 'concluido'
    const accentColor = isDone ? '#10b981' : tc.cor
    const estudouAntes = foiAssistido(child?.id, act.id)

    return (
      <div key={act.id} style={{
        background: isDone ? 'rgba(16,185,129,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isDone ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: '16px', padding: '18px',
        position: 'relative', transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: isDone ? '0 0 20px rgba(16,185,129,0.06)' : 'none',
      }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.2)` }}
        onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isDone ? '0 0 20px rgba(16,185,129,0.06)' : 'none' }}
      >
        {naMissao && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 3 }}><Target weight="duotone" size={12} color="#F97316" /> MISSÃO</div>
        )}
        {estudouAntes && !naMissao && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 3 }}><Star weight="duotone" size={12} color="#F59E0B" className="ns-icon-bounce" /> ESTUDOU ANTES</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: accentColor + '20', color: accentColor, fontSize: '10px', fontWeight: '700', padding: '3px 9px', borderRadius: '99px', border: `1px solid ${accentColor}35` }}>
            {tc.icon} {tc.label}
          </span>
          {act.habilidade && (
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: '600' }}>{act.habilidade}</span>
          )}
          <div style={{ marginLeft: 'auto', fontSize: '18px' }}>{isDone ? <CheckCircle weight="duotone" size={20} color="#10B981" /> : '▶️'}</div>
        </div>

        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          <div style={{ fontSize: '38px', lineHeight: 1, flexShrink: 0 }}>{act.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '5px', color: 'white' }}>{act.titulo}</div>
            {act.historinha && (
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, margin: 0 }}>
                {act.historinha.length > 80 ? act.historinha.substring(0, 80) + '...' : act.historinha}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: '600' }}>⏱ ~{act.tempo_estimado}min</span>
            <span style={{ background: 'rgba(251,191,36,0.1)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', color: '#fbbf24', fontWeight: '700' }}>+{act.xp_reward} XP</span>
          </div>
          <button onClick={() => iniciarAtividade(act)} style={{
            background: isDone ? 'rgba(107,114,128,0.3)' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            border: 'none', borderRadius: '8px', padding: '8px 16px',
            color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '12px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: isDone ? 'none' : `0 4px 12px ${accentColor}40`,
          }}>
            {isDone ? '🔁 Refazer' : 'Começar →'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <LayoutCrianca child={child}>
      <div style={{ minHeight: '100vh', background: '#0f0a1e' }}>
        <div>

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="ns-trilha-cabecalho" style={{
          background: 'linear-gradient(135deg, #3b0764 0%, #5b21b6 50%, #7C3AED 100%)',
          padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '20px',
          boxShadow: '0 4px 24px rgba(124,58,237,0.3)',
        }}>
          {/* Voltar pro início. A sidebar do LayoutCrianca some abaixo de 767px e a
              criança ficava sem saída óbvia da Trilha no celular. */}
          <button
            onClick={() => navigate('/home-crianca')}
            aria-label="Voltar para o início"
            style={{
              width: '48px', height: '48px', flexShrink: 0, borderRadius: '14px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', fontSize: '22px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'inherit', lineHeight: 1,
            }}
          >
            ←
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '4px' }}>Minha Trilha 🗺️</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>{nomeFaixa[faixa]}</p>
          </div>

          <div className="ns-trilha-stats" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ color: '#a78bfa', fontWeight: '900', fontSize: '22px', lineHeight: 1 }}>{pct}%</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: '600', marginTop: '3px' }}>concluído</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '22px', lineHeight: 1 }}>{totalConcluidas}/{total}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: '600', marginTop: '3px' }}>atividades</div>
            </div>

            {/* Mini progress bar — escondida no celular (ns-trilha-barra):
                os 120px fixos dela eram o que empurrava o bloco pra fora da
                tela, e o "%" ao lado já diz a mesma coisa. */}
            <div className="ns-trilha-barra" style={{ width: '120px' }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: '600', textAlign: 'right' }}>{totalConcluidas} feitas</div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #10b981, #34d399)', width: pct + '%', height: '100%', borderRadius: '999px', transition: 'width 0.6s ease' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Resgate e pulo agora podem falhar de verdade. Sem este aviso, a criança
            clicaria de novo achando que o toque não pegou. */}
        {falhaGravacao && (
          <div style={{ margin: '14px 16px 0', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '12px', padding: '12px 18px', color: '#fca5a5', fontWeight: '700', fontSize: '14px', textAlign: 'center' }}>
            😕 Não deu pra salvar agora. Nada foi perdido — tente de novo em instantes.
          </div>
        )}

        {/* ── BUSCA + FILTRO POR TIPO ───────────────────────────
            Dentro de um mundo o TIPO volta a ser um filtro útil e não confunde: aqui ele
            não disputa espaço com "categoria", porque a categoria já foi escolhida na
            tela anterior ao entrar no mundo. */}
        <div style={{
          background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 28px', display: 'flex', gap: '10px', alignItems: 'center',
          flexWrap: 'wrap', flexShrink: 0,
        }}>
          <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔎</span>
            <input
              type="search"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Procurar atividade..."
              aria-label="Procurar atividade pelo nome"
              style={{
                width: '100%', boxSizing: 'border-box', minHeight: '48px',
                padding: '0 14px 0 40px', borderRadius: '99px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'white', fontSize: '15px', fontWeight: '600',
                fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none',
              }}
            />
          </div>

          {(() => {
            // só oferece tipos que realmente existem no recorte atual
            const base = activities
                      const tipos = [...new Set(base.map(a => a.tipo))].filter(t => tipoConfig[t])
            if (tipos.length < 2) return null
            return (
              <select
                value={filtroTipo}
                onChange={e => changeTipo(e.target.value)}
                aria-label="Filtrar por tipo de atividade"
                style={{
                  minHeight: '48px', padding: '0 14px', borderRadius: '99px',
                  background: filtroTipo === 'todos' ? 'rgba(255,255,255,0.07)' : 'rgba(124,58,237,0.35)',
                  border: '1px solid ' + (filtroTipo === 'todos' ? 'rgba(255,255,255,0.14)' : 'rgba(124,58,237,0.7)'),
                  color: 'white', fontSize: '14px', fontWeight: '700',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer', outline: 'none',
                }}
              >
                <option value="todos">Todos os tipos</option>
                {tipos.map(t => (
                  <option key={t} value={t}>{tipoConfig[t].icon} {tipoConfig[t].label}</option>
                ))}
              </select>
            )
          })()}
        </div>

        <div style={{ padding: '24px 32px' }}>

          {/* ── TRILHA DA SEMANA ───────────────────────────────── */}
          {filtroTipo === 'todos' && !busca.trim() && temaAtual && trilhaSemanal && (() => {
            const diaHoje = getDiaHoje()
            const temaObj = temas.find(t => t.id === trilhaSemanal.temaId) || temaAtual
            const diasLabels = ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex']
            return (
              <div style={{ marginBottom: '28px', borderRadius: '20px', overflow: 'hidden', border: `1px solid ${temaObj.cor}35` }}>
                {/* Banner do tema */}
                <div style={{ background: temaObj.banner, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '36px', lineHeight: 1 }}>{temaObj.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px' }}>Trilha da Semana</div>
                    <div style={{ color: 'white', fontWeight: '900', fontSize: '17px', lineHeight: 1.2 }}>{temaObj.nome}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '3px' }}>{temaObj.descricao}</div>
                    <div style={{ marginTop: '6px', display: 'inline-flex', background: 'rgba(255,255,255,0.12)', borderRadius: '99px', padding: '2px 10px', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>{getFaixaConfig(faixa).dica}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '8px 14px', textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ color: 'white', fontWeight: '900', fontSize: '18px', lineHeight: 1 }}>
                      {trilhaSemanal.dias.filter(d => isDiaConcluido(d.atividadeId, child?.id)).length}/{trilhaSemanal.dias.length}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', fontWeight: '700', marginTop: '2px' }}>concluídas</div>
                  </div>
                </div>
                {/* Cards dos 5 dias */}
                {/* `1fr` sozinho e `minmax(auto,1fr)`: a coluna nao encolhe abaixo
                    do titulo da atividade e a fileira de dias estourava 24px pra
                    fora em telas de 360px. `minmax(0,1fr)` deixa encolher. */}
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px 20px', display: 'grid', gridTemplateColumns: `repeat(${trilhaSemanal.dias.length}, minmax(0,1fr))`, gap: '10px' }}>
                  {trilhaSemanal.dias.map((diaItem, idx) => {
                    const at = activities.find(a => a.id === diaItem.atividadeId)
                    const tc = tipoConfig[diaItem.tipo] || { icon: '🎮', label: diaItem.tipo, cor: '#6b7280' }
                    const feito = isDiaConcluido(diaItem.atividadeId, child?.id)
                    const eHoje = diaHoje === diaItem.dia
                    const passado = diaHoje !== null && diaItem.dia < diaHoje
                    return (
                      <div
                        key={idx}
                        onClick={() => at && iniciarAtividade(at)}
                        style={{
                          borderRadius: '14px', padding: '12px 10px', textAlign: 'center', cursor: at ? 'pointer' : 'default',
                          background: feito ? 'rgba(16,185,129,0.15)' : eHoje ? `${temaObj.cor}20` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${feito ? 'rgba(16,185,129,0.35)' : eHoje ? temaObj.cor + '50' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: eHoje ? `0 0 16px ${temaObj.cor}30` : 'none',
                          transition: 'transform 0.15s',
                          position: 'relative',
                        }}
                        onMouseOver={e => at && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
                      >
                        {eHoje && <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', background: temaObj.cor, color: 'white', fontSize: '8px', fontWeight: '900', padding: '2px 8px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>HOJE</div>}
                        <div style={{ fontSize: '10px', fontWeight: '800', color: feito ? '#34d399' : eHoje ? 'white' : 'rgba(255,255,255,0.35)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{diasLabels[diaItem.dia]}</div>
                        <div style={{ fontSize: '26px', lineHeight: 1, marginBottom: '8px' }}>{feito ? <CheckCircle weight="duotone" size={26} color="#10B981" /> : at ? at.emoji : tc.icon}</div>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: feito ? '#34d399' : 'white', marginBottom: '6px', lineHeight: 1.3, minHeight: '26px' }}>
                          {at ? (at.titulo.length > 18 ? at.titulo.slice(0, 17) + '…' : at.titulo) : '—'}
                        </div>
                        <div style={{ fontSize: '9px', background: tc.cor + '25', color: tc.cor, padding: '2px 6px', borderRadius: '99px', fontWeight: '700', display: 'inline-block' }}>
                          {tc.icon} {tc.label}
                        </div>
                        {!feito && at && eHoje && (
                          <div style={{ marginTop: '8px', background: temaObj.cor, borderRadius: '8px', padding: '5px', fontSize: '10px', fontWeight: '800', color: 'white' }}>Jogar →</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          {/* ── MISSÃO DO DIA ──────────────────────────────────── */}
          {filtroTipo === 'todos' && !busca.trim() && missao.length > 0 && (
            <div style={{
              borderRadius: '20px', marginBottom: '28px', overflow: 'hidden',
              border: `1px solid ${missaoCompleta ? 'rgba(16,185,129,0.4)' : 'rgba(124,58,237,0.4)'}`,
              background: missaoCompleta ? 'rgba(16,185,129,0.07)' : 'rgba(124,58,237,0.07)',
              boxShadow: missaoCompleta ? '0 4px 24px rgba(16,185,129,0.1)' : '0 4px 24px rgba(124,58,237,0.1)',
            }}>
              <div style={{
                background: missaoCompleta ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #7C3AED, #6d28d9)',
                padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{missaoCompleta ? <Trophy weight="duotone" size={24} color="#F59E0B" className="ns-icon-bounce" /> : <Target weight="duotone" size={24} color="#F97316" />}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: '900', fontSize: '15px' }}>Missão do Dia</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}>⏱ ~{tempoMissao} min • {missaoConcluidas}/{missao.length} concluídas</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '6px 14px', color: 'white', fontSize: '12px', fontWeight: '700' }}>
                  +75 XP bônus
                </div>
              </div>

              <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {missao.map(at => {
                  const done = concluidas.includes(at.id)
                  const tc = tipoConfig[at.tipo]
                  return (
                    <div key={at.id} style={{
                      display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 16px',
                      background: done ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                      borderRadius: '12px', border: `1px solid ${done ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>{done ? <CheckCircle weight="duotone" size={20} color="#10B981" /> : '⬜'}</span>
                      <span style={{ fontSize: '24px', flexShrink: 0 }}>{at.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: done ? '#34d399' : 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{at.titulo}</div>
                        <div style={{ fontSize: '11px', color: tc.cor, fontWeight: '700', marginTop: '2px' }}>{tc.icon} {tc.label} • ~{at.tempo_estimado}min</div>
                      </div>
                      {!done && (
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                          {hasEffect(child?.id, 'skip') && (
                            <button onClick={() => pularAtividade(at)} disabled={pulando === at.id} style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '9px', padding: '8px 10px', color: '#a5b4fc', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                              ⏭️
                            </button>
                          )}
                          <button onClick={() => iniciarAtividade(at)} style={{ background: 'var(--color-action)', border: 'none', borderRadius: '9px', padding: '8px 16px', color: 'white', fontWeight: '700', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)', minHeight: '36px' }}>
                            Fazer →
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}

                {missaoBonusReivindicado ? (
                  <div style={{ textAlign: 'center', padding: '12px', color: '#34d399', fontWeight: '800', fontSize: '14px' }}>
                    🎉 Bônus de hoje já resgatado!
                  </div>
                ) : missaoCompleta ? (
                  <button onClick={reivindicarMissao} disabled={resgatando === 'missao'} style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', fontWeight: '900', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 16px rgba(16,185,129,0.4)', marginTop: '4px' }}>
                    <Trophy weight="duotone" size={20} color="#F59E0B" className="ns-icon-bounce" /> Resgatar bônus: +75 XP e +75 Coins!
                  </button>
                ) : (
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', paddingTop: '4px' }}>
                    Complete todas as atividades acima para ganhar o bônus do dia!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── LISTA DE ATIVIDADES ────────────────────────────── */}
          <div key={gridKey} style={{ animation: 'ns-fade-filter 0.2s ease' }}>
          {atividadesVisiveis.length === 0 ? (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
              <MagnifyingGlass weight="duotone" size={48} color="#7C3AED" style={{ marginBottom: '14px' }} />
              <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>Nenhuma atividade aqui ainda. Toque em Tudo para ver todas.</p>
            </div>
          ) : filtroTipo === 'todos' && !busca.trim() ? (
            <div>
              {tiposDisponiveis.map(m => {
                const mcfg = tipoConfig[m] || { label: m, icon: '🎮', cor: '#6b7280' }
                const mActs = activities.filter(a => a.tipo === m)
                if (!mActs.length) return null
                const mConcluidas = mActs.filter(a => getStatus(a) === 'concluido').length
                return (
                  <div key={m} style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: mcfg.cor + '20', border: `1px solid ${mcfg.cor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{mcfg.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'white' }}>{mcfg.label}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>{mConcluidas}/{mActs.length} concluídas</div>
                      </div>
                      <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: (mConcluidas / mActs.length * 100) + '%', background: mcfg.cor, borderRadius: '99px', transition: 'width 0.5s' }} />
                      </div>
                      <button onClick={() => changeTipo(m)} style={{ background: mcfg.cor + '15', border: `1px solid ${mcfg.cor}30`, borderRadius: '99px', padding: '5px 14px', color: mcfg.cor, fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}>
                        Ver só →
                      </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '12px' }}>
                      {mActs.map(act => renderCard(act))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '12px' }}>
              {atividadesVisiveis.map(act => renderCard(act))}
            </div>
          )}
          </div>

          {/* ── DESAFIO DA SEMANA ──────────────────────────────── */}
          {filtroTipo === 'todos' && !busca.trim() && (
            <div style={{
              marginTop: '16px',
              background: desafioReivindicado ? 'rgba(16,185,129,0.08)' : 'rgba(251,191,36,0.06)',
              border: `1px solid ${desafioReivindicado ? 'rgba(16,185,129,0.3)' : 'rgba(251,191,36,0.25)'}`,
              borderRadius: '20px', padding: '24px',
              boxShadow: desafioReivindicado ? '0 0 24px rgba(16,185,129,0.08)' : '0 0 24px rgba(251,191,36,0.06)',
            }}>
              <div style={{ fontSize: '11px', color: desafioReivindicado ? '#34d399' : '#fbbf24', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: 4 }}><Star weight="duotone" size={14} color="#F59E0B" className="ns-icon-bounce" /> Desafio da Semana</div>
              <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: '8px', color: 'white' }}>Completar todas as atividades</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '18px', lineHeight: 1.5 }}>Complete todas as {total} atividades da trilha esta semana para ganhar o bônus máximo!</div>
              {desafioReivindicado ? (
                <div style={{ fontSize: '14px', color: '#34d399', fontWeight: '800', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle weight="duotone" size={18} color="#10B981" /> Bônus resgatado esta semana!</div>
              ) : totalConcluidas === total && total > 0 ? (
                <button onClick={reivindicarDesafio} disabled={resgatando === 'desafio'} style={{ background: 'var(--color-action)', border: 'none', borderRadius: 'var(--radius-lg)', padding: '13px 24px', color: 'white', fontWeight: '800', fontSize: 'var(--text-sm)', cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(249,115,22,0.4)', minHeight: '48px' }}>
                  <Trophy weight="duotone" size={20} color="#F59E0B" className="ns-icon-bounce" /> Resgatar +500 XP e +500 Coins!
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: '800', display: 'flex', alignItems: 'center', gap: 4 }}><Trophy weight="duotone" size={16} color="#F59E0B" className="ns-icon-bounce" /> +500 XP • +500 Coins</div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: (totalConcluidas / total * 100) + '%', background: 'linear-gradient(90deg, #fbbf24, #fb923c)', borderRadius: '99px', transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', whiteSpace: 'nowrap' }}>{totalConcluidas}/{total}</div>
                </div>
              )}
            </div>
          )}
        </div>
        </div>{/* zIndex wrapper */}
      </div>
    </LayoutCrianca>
  )
}
