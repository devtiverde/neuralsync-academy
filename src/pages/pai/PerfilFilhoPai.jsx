import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import { Button, Card } from '../../components/ui'
import { Bell } from '@phosphor-icons/react'
import '../../styles/pai.css'

const AVATAR_MAP = {
  'explorer':'🧭','av_explorer':'🧭','cientista':'🔬','av_cientista':'🔬',
  'astronauta':'🚀','av_astronauta':'🚀','mago':'🧙','av_mago':'🧙',
  'artista':'🎨','av_artista':'🎨','robô':'🤖','robo':'🤖','av_robo':'🤖',
  'dino':'🦕','av_dino':'🦕','ninja':'🥷','av_ninja':'🥷',
}
const resolverAvatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)

const normalizarFaixa = (faixa, idade) => {
  const f = (faixa || '').toString().trim().toLowerCase()
  if (f.startsWith('explor')) return 'exploradores'
  if (f.startsWith('constr')) return 'construtores'
  if (f.startsWith('criad'))  return 'criadores'
  if (f.startsWith('invent')) return 'inventores'
  const n = parseInt(idade)
  if (n <= 5) return 'exploradores'
  if (n >= 6 && n <= 8) return 'construtores'
  if (n >= 9 && n <= 11) return 'criadores'
  return 'inventores'
}

const faixaInfo = {
  exploradores: { label: 'Exploradores', range: '4–5 anos', icon: '🌱', cor: '#10b981', bg: '#d1fae5', tempoRec: '30–45 min' },
  construtores:  { label: 'Construtores', range: '6–8 anos', icon: '🧩', cor: '#3b82f6', bg: '#dbeafe', tempoRec: '45–60 min' },
  criadores:     { label: 'Criadores',    range: '9–11 anos', icon: '🎨', cor: '#ec4899', bg: '#fce7f3', tempoRec: '60–90 min' },
  inventores:    { label: 'Inventores',   range: '12–15 anos', icon: '🚀', cor: '#7C3AED', bg: '#ede9fe', tempoRec: '90–120 min' },
}

const BADGES = [
  { nome: 'Primeira Missão', icone: '🌟', desc: 'Completar a primeira atividade',     check: (c, h) => h.length >= 1 },
  { nome: 'Explorador',      icone: '🗺️', desc: 'Ganhar 100 XP',                      check: (c) => (c?.xp ?? 0) >= 100 },
  { nome: 'Streaker',        icone: '🔥', desc: 'Estudar 3 dias seguidos',             check: (c) => (c?.streak_maximo ?? 0) >= 3 },
  { nome: 'Cérebro Ativo',   icone: '🧠', desc: 'Completar 5 atividades',             check: (c, h) => h.length >= 5 },
  { nome: 'Mestre Quiz',     icone: '❓', desc: 'Completar 3 quizzes',                 check: (c, h) => h.filter(a => a.tipo === 'quiz').length >= 3 },
  { nome: 'Inventor',        icone: '💡', desc: 'Completar atividade de invenção',     check: (c, h) => h.some(a => a.tipo === 'inventor') },
  { nome: 'Programador',     icone: '💻', desc: 'Completar 2 atividades de blocos',   check: (c, h) => h.filter(a => a.tipo === 'blocos').length >= 2 },
  { nome: 'Memória Boa',     icone: '🃏', desc: 'Completar 2 jogos de memória',       check: (c, h) => h.filter(a => a.tipo === 'memoria').length >= 2 },
  { nome: 'Herói do XP',     icone: '⭐', desc: 'Ganhar 500 XP total',                check: (c) => (c?.xp ?? 0) >= 500 },
]

const SERIES_OPCOES = ['', '1ª série', '2ª série', '3ª série', '4ª série', '5ª série', '6ª série', '7ª série', '8ª série', '9ª série', '1º ano EM', '2º ano EM', '3º ano EM', 'Pré-escola']

export default function PerfilFilhoPai() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [child, setChild] = useState(null)
  const [historico, setHistorico] = useState([])
  const [loadingHistorico, setLoadingHistorico] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ nome: '', idade: '', faixa_etaria: 'construtores', serie: '' })
  const [timerDuration, setTimerDuration] = useState(45)
  const [notifAtiva, setNotifAtiva] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [excluindo, setExcluindo] = useState(false)

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
      if (!cached) { navigate('/dashboard'); return }
      setChild(cached)
      setForm({
        nome: cached.nome || '',
        idade: cached.idade || '',
        faixa_etaria: normalizarFaixa(cached.faixa_etaria, cached.idade),
        serie: cached.serie || '',
      })

      // Load timer config
      try {
        const config = JSON.parse(localStorage.getItem('ns_timer_config') || '{}')
        if (config.duracao) setTimerDuration(config.duracao)
      } catch { /* ignore */ }

      // Load historico for badges
      setLoadingHistorico(true)
      supabase.from('ns_historico')
        .select('tipo, xp, timestamp')
        .eq('child_id', cached.id)
        .order('timestamp', { ascending: false })
        .limit(200)
        .then(({ data }) => {
          setHistorico(data || [])
          setLoadingHistorico(false)
        })
    } catch { navigate('/dashboard') }
  }, [])

  const showToast = (msg, tipo = 'ok') => {
    setToast({ msg, tipo })
    setTimeout(() => setToast(null), 3000)
  }

  const salvarPerfil = async () => {
    if (!child || !form.nome.trim()) { showToast('Informe o nome.', 'erro'); return }
    const idadeNum = parseInt(form.idade)
    if (isNaN(idadeNum) || idadeNum < 4 || idadeNum > 15) { showToast('Idade entre 4 e 15 anos.', 'erro'); return }
    setSalvando(true)
    const { error } = await supabase.from('children')
      .update({ nome: form.nome.trim(), idade: idadeNum, faixa_etaria: form.faixa_etaria, serie: form.serie || null })
      .eq('id', child.id)
    setSalvando(false)
    if (error) { showToast('Erro ao salvar.', 'erro'); return }
    const updated = { ...child, ...form, idade: idadeNum }
    setChild(updated)
    localStorage.setItem('ns_active_child', JSON.stringify(updated))
    showToast('Perfil atualizado com sucesso!')
  }

  const salvarTimer = () => {
    try {
      const config = JSON.parse(localStorage.getItem('ns_timer_config') || '{}')
      localStorage.setItem('ns_timer_config', JSON.stringify({ ...config, duracao: timerDuration }))
      showToast('Tempo de sessão salvo!')
    } catch { showToast('Erro ao salvar.', 'erro') }
  }

  const excluirFilho = async () => {
    if (!child || !user) return
    setExcluindo(true)
    const { error } = await supabase.from('children').delete().eq('id', child.id).eq('parent_id', user.id)
    setExcluindo(false)
    if (error) { showToast('Erro ao excluir.', 'erro'); setShowDeleteConfirm(false); return }
    localStorage.removeItem('ns_active_child')
    navigate('/dashboard')
  }

  const faixa = child ? normalizarFaixa(child.faixa_etaria, child.idade) : 'construtores'
  const fi = faixaInfo[faixa]

  return (
    <LayoutPai>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 400, background: toast.tipo === 'erro' ? 'var(--ns-error)' : 'var(--ns-green)', color: 'white', borderRadius: 12, padding: '12px 22px', fontWeight: 700, fontSize: 14, boxShadow: '0 4px 24px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
          {toast.tipo === 'erro' ? '⚠️' : '✅'} {toast.msg}
        </div>
      )}

      <div className="pai-content">

        {/* ── BACK + TITLE ──────────────────────────── */}
        <div className="pai-fade-in" style={{ marginBottom: 28 }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ns-text-muted)', fontSize: 14, fontWeight: 600, padding: '0 0 12px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--ns-font-body)' }}>
            ← Voltar ao painel
          </button>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 6 }}>Configurações</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ns-text)', letterSpacing: '-0.5px', fontFamily: 'var(--ns-font-body)' }}>
            Perfil de {child?.nome?.split(' ')[0] || '…'}
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Avatar + info card */}
            <Card variant="light" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                {/* Avatar with gradient border */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--ns-violet), #a78bfa, #06b6d4)', padding: 3 }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
                      {resolverAvatar(child?.avatar)}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--ns-text)', marginBottom: 4, fontFamily: 'var(--ns-font-body)' }}>{child?.nome || '…'}</h2>
                  <span style={{ background: fi.bg, color: fi.cor, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, border: `1px solid ${fi.cor}30` }}>
                    {fi.icon} {fi.label} · {fi.range}
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
                {[
                  ['Nível', child?.nivel || 1, 'var(--ns-violet)'],
                  ['XP', (child?.xp || 0).toLocaleString('pt-BR'), '#f59e0b'],
                  ['Sequência', `${child?.streak_atual || 0}d`, 'var(--ns-green)'],
                ].map(([l, v, cor]) => (
                  <div key={l} style={{ background: 'var(--ns-bg)', borderRadius: 10, padding: '12px 8px', textAlign: 'center', border: '1px solid var(--ns-violet-light)' }}>
                    <div style={{ fontFamily: 'var(--ns-font-ui)', fontWeight: 700, fontSize: 18, color: cor }}>{v}</div>
                    <div style={{ fontSize: 11, color: 'var(--ns-text-muted)', fontWeight: 500, marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Data início */}
              {child?.created_at && (
                <div style={{ fontSize: 12, color: 'var(--ns-text-muted)', marginBottom: 0 }}>
                  🗓️ Membro desde {new Date(child.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </div>
              )}
            </Card>

            {/* Edit form */}
            <Card variant="light" style={{ padding: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16 }}>Dados do perfil</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nome</label>
                  <input className="input-field" placeholder="Nome do filho" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Idade</label>
                    <input className="input-field" type="number" placeholder="Ex: 8" min="4" max="15" value={form.idade} onChange={e => setForm({ ...form, idade: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Série</label>
                    <select className="input-field" value={form.serie} onChange={e => setForm({ ...form, serie: e.target.value })}>
                      {SERIES_OPCOES.map(s => <option key={s} value={s}>{s || 'Não informado'}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Faixa etária</label>
                  <select className="input-field" value={form.faixa_etaria} onChange={e => setForm({ ...form, faixa_etaria: e.target.value })}>
                    <option value="exploradores">🌱 Exploradores (4–5 anos)</option>
                    <option value="construtores">🧩 Construtores (6–8 anos)</option>
                    <option value="criadores">🎨 Criadores (9–11 anos)</option>
                    <option value="inventores">🚀 Inventores (12–15 anos)</option>
                  </select>
                </div>
              </div>

              <Button variant="primary" onClick={salvarPerfil} disabled={salvando} style={{ width: '100%', marginTop: 20 }}>
                {salvando ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </Card>

            {/* Danger zone */}
            <Card variant="light" style={{ padding: 24, border: '1.5px solid #fecaca' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>Zona de risco</div>
              <p style={{ fontSize: 13, color: 'var(--ns-text-muted)', lineHeight: 1.6, marginBottom: 14 }}>
                Excluir o perfil de <strong>{child?.nome?.split(' ')[0]}</strong> apaga todo o histórico, conquistas e dados cognitivos de forma irreversível.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{ padding: '10px 18px', borderRadius: 10, border: '1.5px solid #fecaca', background: 'transparent', color: '#ef4444', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--ns-font-body)', transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                🗑️ Excluir perfil de {child?.nome?.split(' ')[0]}
              </button>
            </Card>
          </div>

          {/* ── RIGHT COLUMN ────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Session config */}
            <Card variant="light" style={{ padding: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 18 }}>Configurações de sessão</div>

              {/* Timer slider */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontWeight: 700, fontSize: 14, color: 'var(--ns-text)' }}>⏱️ Tempo máximo diário</label>
                  <span style={{ fontFamily: 'var(--ns-font-ui)', fontWeight: 700, fontSize: 18, color: 'var(--ns-violet)' }}>{timerDuration} min</span>
                </div>
                <input
                  type="range"
                  min="15" max="120" step="15"
                  value={timerDuration}
                  onChange={e => setTimerDuration(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--ns-violet)', height: 4, cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ns-text-muted)', marginTop: 4 }}>
                  <span>15 min</span><span>120 min</span>
                </div>
                {/* Recommendation tip */}
                <div style={{ background: fi.bg, border: `1px solid ${fi.cor}30`, borderRadius: 10, padding: '10px 14px', marginTop: 12 }}>
                  <p style={{ fontSize: 12, color: fi.cor, fontWeight: 600 }}>
                    💡 Recomendado para {fi.label}: <strong>{fi.tempoRec}</strong>
                  </p>
                </div>
                <Button variant="secondary" onClick={salvarTimer} style={{ marginTop: 14 }} size="sm">Salvar tempo</Button>
              </div>

              {/* Notifications toggle */}
              <div style={{ borderTop: '1px solid var(--ns-violet-light)', paddingTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--ns-text)', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}><Bell weight="fill" size={16} color="#7C3AED" /> Notificações de progresso</p>
                    <p style={{ fontSize: 12, color: 'var(--ns-text-muted)', lineHeight: 1.5 }}>Receba um email semanal com o resumo de atividades</p>
                  </div>
                  <button
                    onClick={() => setNotifAtiva(!notifAtiva)}
                    style={{ width: 46, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', background: notifAtiva ? 'var(--ns-green)' : '#d1d5db', transition: 'background 0.2s', flexShrink: 0 }}
                  >
                    <div style={{ position: 'absolute', top: 3, left: notifAtiva ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Achievements grid */}
            <Card variant="light" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2px', textTransform: 'uppercase' }}>Conquistas</div>
                {!loadingHistorico && (
                  <span style={{ fontSize: 12, color: 'var(--ns-text-muted)' }}>
                    {BADGES.filter(b => b.check(child, historico)).length}/{BADGES.length} desbloqueadas
                  </span>
                )}
              </div>

              {loadingHistorico ? (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--ns-text-muted)', fontSize: 13 }}>Carregando conquistas...</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {BADGES.map((badge, i) => {
                    const earned = badge.check(child, historico)
                    return (
                      <div
                        key={badge.nome}
                        title={badge.desc}
                        style={{
                          background: earned ? 'linear-gradient(135deg, var(--ns-violet-light), #f5f3ff)' : '#f9fafb',
                          border: earned ? '1.5px solid #ddd6fe' : '1.5px solid #e5e7eb',
                          borderRadius: 14,
                          padding: '14px 10px',
                          textAlign: 'center',
                          opacity: earned ? 1 : 0.45,
                          filter: earned ? 'none' : 'grayscale(1)',
                          transition: 'all 0.2s',
                          cursor: 'default',
                          animationDelay: `${i * 40}ms`,
                        }}
                      >
                        <div style={{ fontSize: 26, marginBottom: 6 }}>{badge.icone}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: earned ? 'var(--ns-violet)' : '#9ca3af', lineHeight: 1.3 }}>{badge.nome}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>

            {/* Quick links */}
            <Card variant="light" style={{ padding: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Acesso rápido</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: '🧠', label: 'Ver Perfil Cognitivo', path: child ? `/perfil-cognitivo/${child.id}` : null },
                  { icon: '📊', label: 'Ver Relatório Detalhado', path: '/relatorio' },
                  { icon: '⏱️', label: 'Configurar Timer', path: '/timer' },
                  { icon: '🎮', label: 'Entrar na área de ' + (child?.nome?.split(' ')[0] || '…'), path: '/home-crianca', setChild: true },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.setChild) localStorage.setItem('ns_active_child', JSON.stringify(child))
                      if (item.path) navigate(item.path)
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--ns-violet-light)', background: 'var(--ns-bg)', color: 'var(--ns-text)', fontWeight: 600, fontSize: 13, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--ns-font-body)', transition: 'all 0.15s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'var(--ns-violet-light)'; e.currentTarget.style.color = 'var(--ns-violet)' }}
                    onMouseOut={e => { e.currentTarget.style.background = 'var(--ns-bg)'; e.currentTarget.style.color = 'var(--ns-text)' }}
                  >
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    {item.label}
                    <span style={{ marginLeft: 'auto', opacity: 0.4 }}>→</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ── MODAL EXCLUIR ───────────────────────────── */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,10,30,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 300 }}>
          <div style={{ background: 'white', borderRadius: 24, padding: 40, width: '100%', maxWidth: 400, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, color: 'var(--ns-text)' }}>Excluir {child?.nome?.split(' ')[0]}?</h3>
            <p style={{ color: 'var(--ns-text-muted)', fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>
              Todo o histórico, conquistas e perfil cognitivo de <strong>{child?.nome}</strong> serão apagados permanentemente.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: 13, color: '#374151', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--ns-font-body)', fontSize: 14 }}>Cancelar</button>
              <Button variant="danger" onClick={excluirFilho} disabled={excluindo} style={{ flex: 1 }}>
                {excluindo ? 'Excluindo...' : 'Sim, excluir'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </LayoutPai>
  )
}
