import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { tipoConfig } from '../../data/atividadesData'
import { useAtividades } from '../../hooks/useAtividades'
import LayoutCrianca from '../../components/LayoutCrianca'
import SplashScreen from '../../components/SplashScreen'
import { StatCard, XPBar, Card, Button, Badge } from '../../components/ui'
import { RocketLaunch, Target, Fire, Trophy } from '@phosphor-icons/react'
import '../../styles/crianca.css'

function dentroDoHorario(agenda) {
  if (!agenda || !Array.isArray(agenda)) return true
  const agora = new Date()
  const diaIdx = agora.getDay()
  const horaAtual = agora.getHours() * 60 + agora.getMinutes()
  const slot = agenda[diaIdx]
  if (!slot || !slot.ativo) return false
  const [hIni, mIni] = (slot.inicio || '00:00').split(':').map(Number)
  const [hFim, mFim] = (slot.fim || '23:59').split(':').map(Number)
  return horaAtual >= hIni * 60 + mIni && horaAtual <= hFim * 60 + mFim
}

const nomeFaixa = {
  exploradores: 'Exploradores 🔍',
  construtores: 'Construtores 🔧',
  criadores:    'Criadores 🎨',
  inventores:   'Inventores 💡',
}

const tipoGradiente = {
  quiz:               'linear-gradient(135deg, #4f46e5, #7C3AED)',
  memoria:            'linear-gradient(135deg, #0284c7, #0ea5e9)',
  sequencia:          'linear-gradient(135deg, #059669, #10b981)',
  labirinto:          'linear-gradient(135deg, #dc2626, #ef4444)',
  robo:               'linear-gradient(135deg, #4338ca, #6366f1)',
  padrao:             'linear-gradient(135deg, #b45309, #f59e0b)',
  quizia:             'linear-gradient(135deg, #7C3AED, #a855f7)',
  inventor:           'linear-gradient(135deg, #c2410c, #f97316)',
  blocos:             'linear-gradient(135deg, #065f46, #10b981)',
  numeros:            'linear-gradient(135deg, #4c1d95, #7F77DD)',
  formas:             'linear-gradient(135deg, #4c1d95, #7F77DD)',
  cores:              'linear-gradient(135deg, #831843, #D4537E)',
  alfabeto:           'linear-gradient(135deg, #064e3b, #1D9E75)',
  'sequencia-magica': 'linear-gradient(135deg, #0891b2, #06b6d4)',
  'conectar-pontos':  'linear-gradient(135deg, #7c3aed, #a78bfa)',
  'classificar':      'linear-gradient(135deg, #047857, #34d399)',
  'quebra-cabeca':    'linear-gradient(135deg, #b45309, #fbbf24)',
  'caca-palavras':    'linear-gradient(135deg, #0369a1, #38bdf8)',
  'historia-interativa': 'linear-gradient(135deg, #5b21b6, #d946ef)',
  ingles:               'linear-gradient(135deg, #1e3a5f, #3B82F6)',
  colorir:              'linear-gradient(135deg, #4d7c0f, #84CC16)',
  silabas:              'linear-gradient(135deg, #0e7490, #06B6D4)',
  'zona-emocoes':       'linear-gradient(135deg, #9d174d, #EC4899)',
}

// Tamanho dos cards do hub por faixa etária.
// Antes era fixo: tile 110px com ícone de 28px — o ícone ocupava ~8% da área do card, e é
// justamente o ícone que a criança mira e reconhece, não a caixa.
// Âncora: a Nielsen Norman Group recomenda ~2cm (≈76px) de alvo para crianças pequenas,
// cerca do dobro dos 44px do nível AAA da WCAG (que vale para adultos).
// `sub` desliga o contador "N ativ." nas faixas que ainda não leem número com fluência.
const TAMANHOS = {
  exploradores: { tile: 168, icone: 72, label: 17, gap: 16, sub: false },
  construtores: { tile: 148, icone: 60, label: 16, gap: 14, sub: false },
  criadores:    { tile: 128, icone: 44, label: 14, gap: 12, sub: true },
  inventores:   { tile: 112, icone: 34, label: 13, gap: 10, sub: true },
}

const CATEGORIAS = [
  { id: 'tudo',       label: 'Tudo',       icon: '🌟' },
  { id: 'raciocinio', label: 'Raciocínio', icon: '🧠' },
  { id: 'tecnologia', label: 'Tecnologia', icon: '🤖' },
  { id: 'letras',     label: 'Letras',     icon: '📖' },
  { id: 'emocional',  label: 'Emoções',    icon: '💗' },
  { id: 'conteudo',   label: 'Conteúdo',   icon: '🎬' },
  { id: 'offline',    label: 'Offline',    icon: '🌿' },
]

function navTrilha(navigate, tipo) {
  return () => navigate('/trilha?tipo=' + tipo)
}

export default function HomeCrianca() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [child, setChild] = useState(null)
  const [faixa, setFaixa] = useState('construtores')
  const [historico, setHistorico] = useState([])
  const [posicaoRanking, setPosicaoRanking] = useState(null)
  const [filtro, setFiltro] = useState('tudo')

  const { atividades } = useAtividades(faixa)

  useEffect(() => {
    async function init() {
      const stored = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
      const childId = stored?.id

      if (user) {
        const localAgenda = (() => { try { return JSON.parse(localStorage.getItem('ns_agenda_config') || 'null') } catch { return null } })()
        let agendaConfig = localAgenda
        if (!localAgenda) {
          const { data: userData } = await supabase.from('users').select('agenda_config').eq('id', user.id).single()
          if (userData?.agenda_config && Array.isArray(userData.agenda_config)) {
            agendaConfig = userData.agenda_config
            localStorage.setItem('ns_agenda_config', JSON.stringify(agendaConfig))
          }
        }
        if (agendaConfig && Array.isArray(agendaConfig)) {
          if (!dentroDoHorario(agendaConfig)) { navigate('/bloqueio'); return }
        }
      }

      const { data } = await supabase.from('children').select('*').eq('parent_id', user?.id)
      if (!data || data.length === 0) { navigate('/dashboard'); return }

      let c = (childId && data.find(ch => ch.id === childId)) || data[0]

      const hoje = new Date().toDateString()
      const ontem = new Date(Date.now() - 86400000).toDateString()
      const ultimoAtivo = localStorage.getItem('ns_ultimo_ativo_' + c.id)
      if (ultimoAtivo && ultimoAtivo !== hoje && ultimoAtivo !== ontem && (c.streak_atual || 0) > 0) {
        c = { ...c, streak_atual: 0 }
        supabase.from('children').update({ streak_atual: 0 }).eq('id', c.id).then(() => {})
      }

      setChild(c)
      localStorage.setItem('ns_active_child', JSON.stringify(c))
      setFaixa(c.faixa_etaria || 'construtores')

      const sorted = [...data].sort((a, b) => (b.neural_coins || 0) - (a.neural_coins || 0))
      const pos = sorted.findIndex(ch => ch.id === c.id) + 1
      if (data.length > 1) setPosicaoRanking(pos)

      const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
      setHistorico(hist.slice(0, 5))
    }
    init()
  }, [user])

  const contsPorTipo = useMemo(() => {
    const c = {}
    atividades.forEach(a => { c[a.tipo] = (c[a.tipo] || 0) + 1 })
    return c
  }, [atividades])

  const missaoAtual = useMemo(() => {
    const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')
    const idsRecentes = new Set(hist.slice(0, 10).map(h => h.atividade_id).filter(Boolean))
    return atividades.find(a => !idsRecentes.has(a.id)) || atividades[0]
  }, [atividades])

  if (!child) return <SplashScreen />

  const xpMax = (child.nivel || 1) * 500

  const hubItens = [
    { id: 'quiz',      label: 'Quiz',       icon: '🧩', cat: 'raciocinio', grad: tipoGradiente.quiz,      sub: contsPorTipo.quiz      ? contsPorTipo.quiz      + ' ativ.' : null, show: !!contsPorTipo.quiz,      nav: navTrilha(navigate, 'quiz') },
    { id: 'memoria',   label: 'Memória',    icon: '🧠', cat: 'raciocinio', grad: tipoGradiente.memoria,   sub: contsPorTipo.memoria   ? contsPorTipo.memoria   + ' ativ.' : null, show: !!contsPorTipo.memoria,   nav: navTrilha(navigate, 'memoria') },
    { id: 'sequencia', label: 'Sequência',  icon: '🔗', cat: 'raciocinio', grad: tipoGradiente.sequencia, sub: contsPorTipo.sequencia ? contsPorTipo.sequencia + ' ativ.' : null, show: !!contsPorTipo.sequencia, nav: navTrilha(navigate, 'sequencia') },
    { id: 'labirinto', label: 'Labirinto',  icon: '🌀', cat: 'raciocinio', grad: tipoGradiente.labirinto, sub: contsPorTipo.labirinto ? contsPorTipo.labirinto + ' ativ.' : null, show: !!contsPorTipo.labirinto, nav: navTrilha(navigate, 'labirinto') },
    { id: 'padrao',    label: 'Padrão',     icon: '🔷', cat: 'raciocinio', grad: tipoGradiente.padrao,    sub: contsPorTipo.padrao    ? contsPorTipo.padrao    + ' ativ.' : null, show: !!contsPorTipo.padrao,    nav: navTrilha(navigate, 'padrao') },
    { id: 'blocos',    label: 'Blocos',     icon: '🧱', cat: 'raciocinio', grad: tipoGradiente.blocos,    badge: 'IA', sub: contsPorTipo.blocos ? contsPorTipo.blocos + ' ativ.' : null, show: !!contsPorTipo.blocos, nav: navTrilha(navigate, 'blocos') },
    { id: 'robo',      label: 'Robô',       icon: '🤖', cat: 'tecnologia', grad: tipoGradiente.robo,      sub: contsPorTipo.robo      ? contsPorTipo.robo      + ' ativ.' : null, show: !!contsPorTipo.robo,      nav: navTrilha(navigate, 'robo') },
    { id: 'quizia',    label: 'Quiz IA',    icon: '🧩', cat: 'tecnologia', grad: tipoGradiente.quizia,    badge: 'IA', sub: 'Livre', show: true, nav: () => navigate('/quiz-ia') },
    { id: 'inventor',  label: 'Inventor',   icon: '💡', cat: 'tecnologia', grad: tipoGradiente.inventor,  badge: 'IA', sub: contsPorTipo.inventor ? contsPorTipo.inventor + ' ativ.' : null, show: !!contsPorTipo.inventor, nav: navTrilha(navigate, 'inventor') },
    { id: 'neural-ai', label: 'NeuralAI',   icon: '🤖', cat: 'tecnologia', grad: 'linear-gradient(135deg, #0e7490, #0891b2, #7C3AED)', badge: 'IA', sub: 'Chat IA', show: faixa === 'inventores', nav: () => navigate('/neural-ai') },
    { id: 'alfabeto',  label: 'Alfabeto',   icon: '🔤', cat: 'letras',     grad: tipoGradiente.alfabeto,  sub: contsPorTipo.alfabeto  ? contsPorTipo.alfabeto  + ' ativ.' : null, show: !!contsPorTipo.alfabeto,  nav: navTrilha(navigate, 'alfabeto') },
    { id: 'numeros',   label: 'Números',    icon: '🔢', cat: 'letras',     grad: tipoGradiente.numeros,   sub: contsPorTipo.numeros   ? contsPorTipo.numeros   + ' ativ.' : null, show: !!contsPorTipo.numeros,   nav: navTrilha(navigate, 'numeros') },
    { id: 'formas',    label: 'Formas',     icon: '🔷', cat: 'letras',     grad: tipoGradiente.formas,    sub: contsPorTipo.formas    ? contsPorTipo.formas    + ' ativ.' : null, show: !!contsPorTipo.formas,    nav: navTrilha(navigate, 'formas') },
    { id: 'cores',     label: 'Cores',      icon: '🎨', cat: 'letras',     grad: tipoGradiente.cores,     sub: contsPorTipo.cores     ? contsPorTipo.cores     + ' ativ.' : null, show: !!contsPorTipo.cores,     nav: navTrilha(navigate, 'cores') },
    { id: 'colorir',   label: 'Colorir',    icon: '🖍️', cat: 'letras',    grad: tipoGradiente.colorir,   sub: contsPorTipo.colorir   ? contsPorTipo.colorir   + ' ativ.' : null, show: !!contsPorTipo.colorir,   nav: navTrilha(navigate, 'colorir') },
    { id: 'silabas',   label: 'Sílabas',    icon: '🔡', cat: 'letras',     grad: tipoGradiente.silabas,   sub: contsPorTipo.silabas   ? contsPorTipo.silabas   + ' ativ.' : null, show: !!contsPorTipo.silabas,   nav: navTrilha(navigate, 'silabas') },
    { id: 'digitacao', label: 'Digitação',  icon: '⌨️', cat: 'letras',     grad: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', sub: 'Jogo',    show: true, nav: () => navigate('/digitacao') },
    { id: 'diario',    label: 'Meu Diário', icon: '📔', cat: 'letras',     grad: 'linear-gradient(135deg, #5b21b6, #7C3AED)',  sub: 'Escreva', show: true, nav: () => navigate('/diario') },
    { id: 'kids',      label: 'Kids TV',    icon: '🎬', cat: 'conteudo',   grad: 'linear-gradient(135deg, #4338ca, #6366f1)',  sub: 'Artigos', show: true, nav: () => navigate('/kids') },
    { id: 'ebook',     label: 'Ebooks',     icon: '📚', cat: 'conteudo',   grad: 'linear-gradient(135deg, #065f46, #10b981)',  sub: 'Leitura', show: true, nav: () => navigate('/ebook') },
    { id: 'offline',   label: 'Offline',    icon: '🌿', cat: 'offline',    grad: 'linear-gradient(135deg, #92400e, #f59e0b)',  sub: 'Sem tela', show: true, nav: () => navigate('/atividades-offline') },
    // Jogos independentes (rota direta)
    { id: 'sequencia-magica',    label: 'Sequência',   icon: '🌈', cat: 'raciocinio', grad: tipoGradiente['sequencia-magica'],    sub: 'Memória',   show: true, nav: () => navigate('/atividade/sequencia-magica') },
    { id: 'quebra-cabeca',       label: 'Quebra-Cabeça',icon: '🧩', cat: 'raciocinio', grad: tipoGradiente['quebra-cabeca'],       sub: 'Puzzle',    show: true, nav: () => navigate('/atividade/quebra-cabeca') },
    { id: 'conectar-pontos',     label: 'Conectar',    icon: '✏️', cat: 'raciocinio', grad: tipoGradiente['conectar-pontos'],     sub: 'Desenho',   show: true, nav: () => navigate('/atividade/conectar-pontos') },
    { id: 'classificar-objetos', label: 'Classificar', icon: '📦', cat: 'raciocinio', grad: tipoGradiente['classificar'],         sub: 'Organizar', show: true, nav: () => navigate('/atividade/classificar-objetos') },
    { id: 'ingles',              label: 'Inglês',       icon: '🇺🇸', cat: 'letras',    grad: tipoGradiente.ingles,                sub: contsPorTipo.ingles ? contsPorTipo.ingles + ' ativ.' : '4 ativ.', show: true, nav: navTrilha(navigate, 'ingles') },
    { id: 'caca-palavras',       label: 'Caça-Palavras',icon: '🔍', cat: 'letras',     grad: tipoGradiente['caca-palavras'],       sub: 'Palavras',  show: true, nav: () => navigate('/atividade/caca-palavras') },
    { id: 'historia-interativa', label: 'História',    icon: '📖', cat: 'conteudo',   grad: tipoGradiente['historia-interativa'], sub: 'Aventura',  show: true, nav: () => navigate('/atividade/historia-interativa') },
    { id: 'zona-emocoes',        label: 'Emoções',     icon: '💗', cat: 'emocional',  grad: tipoGradiente['zona-emocoes'],         sub: 'Sentimentos', show: true, nav: () => navigate('/atividade/zona-emocoes') },
  ].filter(item => item.show)

  const itensFiltrados = filtro === 'tudo' ? hubItens : hubItens.filter(item => item.cat === filtro)
  const T = TAMANHOS[faixa] || TAMANHOS.construtores

  const statCards = [
    { emoji: '💰', value: child.neural_coins || 0, label: 'NeuralCoins', color: '#fbbf24', onClick: () => navigate('/coins'), delay: 0 },
    { emoji: '🔥', value: child.streak_atual || 0, label: 'Dias seguidos', color: '#fb923c', delay: 80 },
    posicaoRanking ? { emoji: '🏆', value: `#${posicaoRanking}`, label: 'Ranking', color: '#fbbf24', delay: 160 } : null,
  ].filter(Boolean)

  return (
    <LayoutCrianca child={child}>
      <div style={{ padding: '28px 32px', minHeight: '100vh', background: 'var(--ns-dark)' }}>

        {/* ── HERO BANNER ──────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #3b0764 0%, #5b21b6 40%, #7C3AED 100%)',
          borderRadius: 'var(--ns-radius-xl)',
          padding: '28px 32px',
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--ns-shadow-glow-violet)',
        }}>
          {/* decorative orbs */}
          <div style={{ position: 'absolute', top: -40, right: 140, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -50, right: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          {/* left: name + XP */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, marginBottom: 6, fontFamily: 'var(--ns-font-ui)' }}>
              {nomeFaixa[faixa]}
            </div>
            <h1 style={{
              color: 'white',
              fontSize: 32,
              fontFamily: "'Fredoka One', cursive",
              fontWeight: 400,
              letterSpacing: '0.5px',
              marginBottom: 20,
              lineHeight: 1.1,
            }}>
              Olá, {child.nome}! <RocketLaunch weight="duotone" size={20} color="#F97316" />
            </h1>
            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 14, padding: '14px 20px', display: 'inline-block', minWidth: 300 }}>
              <XPBar current={child.xp || 0} max={xpMax} level={child.nivel || 1} dark />
            </div>
          </div>

          {/* right: staggered StatCards */}
          <div style={{ display: 'flex', gap: 12, position: 'relative', zIndex: 1, flexShrink: 0 }}>
            {statCards.map((s, idx) => (
              <div
                key={idx}
                style={{
                  animation: 'ns-slide-up 0.4s ease forwards',
                  animationDelay: `${s.delay}ms`,
                  opacity: 0,
                }}
              >
                <StatCard emoji={s.emoji} value={s.value} label={s.label} color={s.color} onClick={s.onClick} />
              </div>
            ))}
          </div>
        </div>

        {/* ── GRID PRINCIPAL ───────────────────────────── */}
        <div className="ns-two-col" style={{ alignItems: 'start' }}>

          {/* ── COLUNA ESQUERDA ──────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Missão do Dia */}
            {missaoAtual && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(240,122,32,0.18) 0%, rgba(10,6,24,0.6) 60%)',
                border: '1.5px solid rgba(240,122,32,0.5)',
                borderRadius: 'var(--ns-radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(240,122,32,0.2)',
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(240,122,32,0.12)', pointerEvents: 'none' }} />

                {/* missão header */}
                <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(240,122,32,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Target weight="duotone" size={16} color="#F97316" />
                    <span style={{ fontSize: 11, color: '#fb923c', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'var(--ns-font-ui)' }}>Missão do Dia</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Badge variant="tag" size="sm">
                      {tipoConfig[missaoAtual.tipo]?.icon} {tipoConfig[missaoAtual.tipo]?.label}
                    </Badge>
                    <Badge variant="xp" size="sm">+{missaoAtual.xp_reward} XP</Badge>
                  </div>
                </div>

                {/* missão body */}
                <div style={{ padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ fontSize: 56, lineHeight: 1, flexShrink: 0, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>
                    {missaoAtual.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 400,
                      fontSize: 20,
                      color: 'white',
                      fontFamily: "'Fredoka One', cursive",
                      marginBottom: 6,
                      lineHeight: 1.2,
                    }}>
                      {missaoAtual.titulo}
                    </div>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 14, lineHeight: 1.6, margin: '0 0 14px' }}>
                      {(missaoAtual.historinha || '').substring(0, 100)}{missaoAtual.historinha?.length > 100 ? '...' : ''}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '4px 10px', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                        ⏱ ~{missaoAtual.tempo_estimado}min
                      </span>
                      <Button
                        variant="dark"
                        size="sm"
                        style={{ marginLeft: 'auto' }}
                        onClick={() => navigate(`/atividade/${missaoAtual.tipo}`, { state: { atividade: missaoAtual } })}
                      >
                        Jogar agora →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hub Unificado */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 20, fontWeight: 400, color: 'white', fontFamily: "'Fredoka One', cursive" }}>Explorar</h3>
                <Button variant="secondary" size="sm" onClick={() => navigate('/trilha')}>Ver trilha →</Button>
              </div>

              {/* filtros por categoria */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {CATEGORIAS.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFiltro(cat.id)}
                    style={{
                      background: filtro === cat.id ? 'rgba(124,58,237,0.85)' : 'rgba(255,255,255,0.07)',
                      border: '1px solid ' + (filtro === cat.id ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.12)'),
                      borderRadius: 'var(--ns-radius-pill)',
                      // chip tinha ~29px de altura — abaixo do mínimo AAA da WCAG (44px)
                      minHeight: 48, padding: '0 18px',
                      color: filtro === cat.id ? 'white' : 'rgba(255,255,255,0.5)',
                      fontSize: 14, fontWeight: 700, cursor: 'pointer',
                      fontFamily: 'var(--ns-font-body)',
                      transition: 'all 0.15s', whiteSpace: 'nowrap',
                    }}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>

              {/* grid de atividades */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${T.tile}px, 1fr))`, gap: T.gap }}>
                {itensFiltrados.map(item => (
                  <button
                    key={item.id}
                    onClick={item.nav}
                    className="ns-hub-card"
                    style={{
                      background: item.grad || 'rgba(255,255,255,0.06)',
                      border: 'none', borderRadius: 'var(--ns-radius-md)',
                      padding: '18px 10px', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                      position: 'relative', transition: 'transform 0.15s, box-shadow 0.15s',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                      minHeight: T.tile, justifyContent: 'center',
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)' }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)' }}
                  >
                    {item.badge && (
                      <span style={{ position: 'absolute', top: 7, right: 7 }}>
                        <Badge variant="ai" size="sm">{item.badge}</Badge>
                      </span>
                    )}
                    <div style={{ fontSize: T.icone, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{item.icon}</div>
                    <div style={{
                      fontSize: T.label,
                      fontFamily: "'Fredoka One', cursive",
                      color: 'white', textAlign: 'center', lineHeight: 1.2,
                      textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    }}>{item.label}</div>
                    {item.sub && T.sub && (
                      <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 99, padding: '2px 7px', fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 700 }}>{item.sub}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── COLUNA DIREITA ────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Streak — mantém tint laranja */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(234,88,12,0.2), rgba(251,146,60,0.1))',
              border: '1px solid rgba(251,146,60,0.3)',
              borderRadius: 'var(--ns-radius-lg)',
              padding: 20,
              boxShadow: '0 4px 20px rgba(234,88,12,0.1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 20, fontFamily: "'Fredoka One', cursive", color: '#fb923c', marginBottom: 6 }}>
                    <Fire weight="duotone" size={20} color="#F97316" className="ns-icon-bounce" /> {child.streak_atual || 0} dias seguidos!
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    Recorde: <span style={{ fontFamily: 'var(--ns-font-ui)', fontWeight: 800, color: '#fb923c' }}>{child.streak_maximo || 0}</span> dias<br />Não pare agora!
                  </div>
                </div>
                <div style={{ fontSize: 46, filter: 'drop-shadow(0 0 12px rgba(251,146,60,0.5))' }}>⚡</div>
              </div>
            </div>

            {/* Progresso */}
            <Card variant="dark" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 11, fontWeight: 800, color: '#a78bfa', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'var(--ns-font-ui)' }}>Meu progresso</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  [child.xp || 0,            'XP Total',    '#a78bfa', '⭐'],
                  [child.neural_coins || 0,  'NeuralCoins', '#fbbf24', '💰'],
                  [child.streak_maximo || 0, 'Recorde',     '#fb923c', '🔥'],
                  [atividades.length,         'Atividades',  '#34d399', '🗺️'],
                ].map(([val, label, cor, icon]) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 14, marginBottom: 4 }}>{icon}</div>
                    <div style={{ fontSize: 20, fontFamily: 'var(--ns-font-ui)', fontWeight: 900, color: cor, marginBottom: 3 }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Ranking */}
            <Card variant="dark" style={{ padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--ns-font-ui)', display: 'flex', alignItems: 'center', gap: 4 }}><Trophy weight="duotone" size={16} color="#F59E0B" className="ns-icon-bounce" /> Ranking</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#fbbf24', marginBottom: 6 }}>
                {posicaoRanking === 1 && '🥇 1º lugar!'}
                {posicaoRanking === 2 && '🥈 2º lugar!'}
                {posicaoRanking === 3 && '🥉 3º lugar!'}
                {posicaoRanking > 3 && `${posicaoRanking}º lugar`}
                {!posicaoRanking && 'Continue jogando! 🚀'}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 16, lineHeight: 1.5 }}>Continue ganhando NeuralCoins!</p>
              <Button variant="secondary" size="sm" style={{ width: '100%' }} onClick={() => navigate('/ranking')}>
                Ver ranking completo →
              </Button>
            </Card>

            {/* Histórico */}
            {historico.length > 0 && (
              <Card variant="dark" style={{ padding: 20 }}>
                <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--ns-font-ui)' }}>Últimas atividades</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {historico.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{item.emoji || '⭐'}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.titulo}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2, fontFamily: 'var(--ns-font-ui)' }}>{item.data}</div>
                      </div>
                      <Badge variant="xp" size="sm">+{item.xp}XP</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </LayoutCrianca>
  )
}
