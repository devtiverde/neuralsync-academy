import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import '../../styles/crianca.css'

const menu = [{"icon":"🏠","label":"Início","path":"/home-crianca"},{"icon":"🗺️","label":"Trilha","path":"/trilha"},{"icon":"🎬","label":"Kids","path":"/kids"},{"icon":"🏆","label":"Ranking","path":"/ranking"},{"icon":"🏪","label":"Loja","path":"/loja"},{"icon":"👤","label":"Perfil","path":"/perfil-crianca"}]

const nomeFaixa = {
  exploradores: 'Exploradores 🔍', construtores: 'Construtores 🔧',
  criadores: 'Criadores 🎨', inventores: 'Inventores 💡',
}

const AVATAR_MAP = {
  'explorer':'🧭','av_explorer':'🧭','cientista':'🔬','av_cientista':'🔬',
  'astronauta':'🚀','av_astronauta':'🚀','mago':'🧙','av_mago':'🧙',
  'artista':'🎨','av_artista':'🎨','robô':'🤖','robo':'🤖','av_robo':'🤖',
  'dino':'🦕','av_dino':'🦕','ninja':'🥷','av_ninja':'🥷',
}
const resolverAvatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)

const TIPO_HABILIDADE = {
  quiz: ['Lógica', 'Memória'], quizia: ['Lógica', 'Comunicação'],
  memoria: ['Memória', 'Concentração'], sequencia: ['Problemas', 'Lógica'],
  labirinto: ['Concentração', 'Problemas'], robo: ['Problemas', 'Computacional'],
  padrao: ['Concentração', 'Memória'], inventor: ['Criatividade', 'Comunicação'],
  blocos: ['Computacional', 'Lógica'],
}

const HABILIDADES_BASE = ['Lógica', 'Criatividade', 'Problemas', 'Computacional', 'Concentração', 'Memória', 'Comunicação', 'Emocional']

function calcularHabilidades(historico) {
  const contagem = Object.fromEntries(HABILIDADES_BASE.map(h => [h, 0]))
  historico.forEach(h => {
    ;(TIPO_HABILIDADE[h.tipo] || []).forEach(s => { if (s in contagem) contagem[s]++ })
  })
  const MAX = Math.max(...Object.values(contagem), 1)
  return HABILIDADES_BASE.map(skill => ({
    skill,
    value: contagem[skill] === 0 ? 15 : Math.round(20 + (contagem[skill] / MAX) * 65),
  }))
}

const BADGES = [
  { nome: 'Primeira Missão', icone: '🌟', xp: 0, desc: 'Completar a primeira atividade' },
  { nome: 'Explorador', icone: '🗺️', xp: 100, desc: 'Ganhar 100 XP' },
  { nome: 'Streaker', icone: '🔥', streak: 3, desc: 'Estudar 3 dias seguidos' },
  { nome: 'Cerebro Ativo', icone: '🧠', atividades: 5, desc: 'Completar 5 atividades' },
  { nome: 'Mestre Quiz', icone: '❓', tipo: 'quiz', n: 3, desc: 'Completar 3 quizzes' },
  { nome: 'Inventor', icone: '💡', tipo: 'inventor', n: 1, desc: 'Completar atividade de invenção' },
  { nome: 'Programador', icone: '💻', tipo: 'blocos', n: 2, desc: 'Completar 2 atividades de blocos' },
  { nome: 'Memória Boa', icone: '🃏', tipo: 'memoria', n: 2, desc: 'Completar 2 jogos de memória' },
  { nome: 'Herói do XP', icone: '⭐', xp: 500, desc: 'Ganhar 500 XP total' },
]

function verificarBadge(badge, child, historico) {
  if (badge.xp !== undefined && (child?.xp ?? 0) >= badge.xp) return true
  if (badge.streak && (child?.streak_maximo ?? 0) >= badge.streak) return true
  if (badge.atividades && historico.length >= badge.atividades) return true
  if (badge.tipo) {
    const count = historico.filter(h => h.tipo === badge.tipo).length
    return count >= (badge.n || 1)
  }
  return false
}

export default function PerfilCrianca() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [habilidades, setHabilidades] = useState(HABILIDADES_BASE.map(skill => ({ skill, value: 15 })))
  const [historico, setHistorico] = useState([])

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (cached) {
      setChild(cached)
      supabase.from('ns_historico')
        .select('tipo, xp, coins, titulo, timestamp')
        .eq('child_id', cached.id)
        .order('timestamp', { ascending: false })
        .limit(100)
        .then(({ data }) => {
          const hist = data && data.length > 0
            ? data
            : (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
              .filter(h => !h.child_id || h.child_id === cached.id)
          setHistorico(hist)
          setHabilidades(calcularHabilidades(hist))
        })
    } else {
      supabase.from('children').select('*').limit(1).then(({ data }) => {
        if (data?.[0]) { setChild(data[0]); localStorage.setItem('ns_active_child', JSON.stringify(data[0])) }
      })
    }
  }, [])

  if (!child) return (
    <div className="page-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <div style={{color: '#7C3AED', fontWeight: '700'}}>Carregando...</div>
    </div>
  )

  const avatar = resolverAvatar(child.avatar)
  const corPerfil = child.cor_perfil || '#7C3AED'
  const badges = BADGES.map(b => ({ ...b, desbloqueado: verificarBadge(b, child, historico) }))

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{paddingBottom: '90px'}}>

      <div className="header-gradient" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <button onClick={() => navigate('/home-crianca')} style={{background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>←</button>
        <h2 style={{color: 'white', fontSize: '18px', fontWeight: '900'}}>Meu Perfil</h2>
      </div>

      <div style={{padding: '0 16px', marginTop: '-14px'}}>

        <div className="card-white" style={{padding: '20px', marginBottom: '12px', textAlign: 'center'}}>
          <div style={{width: '72px', height: '72px', borderRadius: '20px', background: corPerfil, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 12px', boxShadow: '0 4px 16px ' + corPerfil + '44'}}>
            {avatar}
          </div>
          <h3 style={{fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '3px'}}>{child.nome}</h3>
          <p style={{color: '#7C3AED', fontWeight: '600', fontSize: '13px', marginBottom: child.bio ? '4px' : '16px'}}>
            {nomeFaixa[child.faixa_etaria] || '🔧 Construtores'} • Nível {child.nivel}
          </p>
          {child.bio && <p style={{color: '#9ca3af', fontSize: '13px', marginBottom: '16px'}}>{child.bio}</p>}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px'}}>
            {[['XP', child.xp, '#7C3AED'],['Coins', child.neural_coins, '#F07A20'],['Streak', child.streak_atual + ' 🔥', '#10b981']].map(([label, val, cor]) => (
              <div key={label} style={{background: '#f9fafb', borderRadius: '10px', padding: '10px', border: '1px solid #f3f4f6'}}>
                <div style={{fontWeight: '900', fontSize: '16px', color: cor}}>{val}</div>
                <div style={{fontSize: '11px', color: '#9ca3af', fontWeight: '500'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
          <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '4px'}}>🧠 Habilidades Cognitivas</h4>
          <p style={{fontSize: '11px', color: '#9ca3af', marginBottom: '8px'}}>
            {historico.length === 0 ? 'Complete atividades para ver seu radar!' : `Baseado em ${historico.length} atividade${historico.length > 1 ? 's' : ''}`}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={habilidades}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 600}} />
              <Radar dataKey="value" stroke={corPerfil} fill={corPerfil} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
          <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '12px'}}>🏅 Conquistas</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px'}}>
            {badges.map((badge) => (
              <div key={badge.nome} title={badge.desc} style={{
                background: badge.desbloqueado ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : '#f9fafb',
                borderRadius: '12px', padding: '12px', textAlign: 'center',
                border: badge.desbloqueado ? '1.5px solid #fcd34d' : '1.5px solid #f3f4f6',
                opacity: badge.desbloqueado ? 1 : 0.4,
              }}>
                <div style={{fontSize: '22px', marginBottom: '3px'}}>{badge.desbloqueado ? badge.icone : '🔒'}</div>
                <div style={{fontSize: '10px', color: badge.desbloqueado ? '#92400e' : '#9ca3af', fontWeight: '600', lineHeight: '1.3'}}>{badge.nome}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-purple" onClick={() => navigate('/personalizar')}>✨ Personalizar perfil</button>
      </div>

      <div className="menu-bottom">
        {menu.map(item => (
          <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
            style={{color: item.path === '/perfil-crianca' ? '#7C3AED' : '#9ca3af'}}>
            <span style={{fontSize: '20px'}}>{item.icon}</span>
            <span style={{fontWeight: item.path === '/perfil-crianca' ? '700' : '500'}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}
