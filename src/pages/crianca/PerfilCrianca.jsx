import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import '../../styles/crianca.css'

const menu = [{"icon":"🏠","label":"Início","path":"/home-crianca"},{"icon":"🗺️","label":"Trilha","path":"/trilha"},{"icon":"🎬","label":"Kids","path":"/kids"},{"icon":"🏆","label":"Ranking","path":"/ranking"},{"icon":"🏪","label":"Loja","path":"/loja"},{"icon":"👤","label":"Perfil","path":"/perfil-crianca"}]

const habilidades = [
  { skill: 'Lógica', value: 75 }, { skill: 'Criatividade', value: 60 },
  { skill: 'Problemas', value: 55 }, { skill: 'Computacional', value: 45 },
  { skill: 'Concentração', value: 80 }, { skill: 'Memória', value: 65 },
  { skill: 'Comunicação', value: 50 }, { skill: 'Emocional', value: 70 },
]

export default function PerfilCrianca() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [badges, setBadges] = useState([])

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (cached) {
      setChild(cached)
    } else {
      supabase.from('children').select('*').limit(1).then(({ data }) => {
        if (data?.[0]) { setChild(data[0]); localStorage.setItem('ns_active_child', JSON.stringify(data[0])) }
      })
    }
    supabase.from('badges').select('*').limit(9).then(({ data }) => setBadges(data || []))
  }, [])

  if (!child) return (
    <div className="page-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{color: '#7C3AED', fontWeight: '700'}}>Carregando...</div>
    </div>
  )

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{paddingBottom: '90px'}}>

      <div className="header-gradient" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <button onClick={() => navigate('/home-crianca')} style={{background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>←</button>
        <h2 style={{color: 'white', fontSize: '18px', fontWeight: '900'}}>Meu Perfil</h2>
      </div>

      <div style={{padding: '0 16px', marginTop: '-14px'}}>

        <div className="card-white" style={{padding: '20px', marginBottom: '12px', textAlign: 'center'}}>
          <div style={{width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 12px'}}>🦊</div>
          <h3 style={{fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '3px'}}>{child.nome}</h3>
          <p style={{color: '#7C3AED', fontWeight: '600', fontSize: '13px', marginBottom: '16px'}}>🧩 Construtora • Nível {child.nivel}</p>
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
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={habilidades}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 600}} />
              <Radar dataKey="value" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
          <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '12px'}}>🏅 Conquistas</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px'}}>
            {badges.map((badge, i) => (
              <div key={badge.id} style={{
                background: i === 0 ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : '#f9fafb',
                borderRadius: '12px', padding: '12px', textAlign: 'center',
                border: i === 0 ? '1.5px solid #fcd34d' : '1.5px solid #f3f4f6',
                opacity: i > 1 ? 0.4 : 1
              }}>
                <div style={{fontSize: '22px', marginBottom: '3px'}}>{i > 1 ? '🔒' : badge.icone}</div>
                <div style={{fontSize: '10px', color: i === 0 ? '#92400e' : '#9ca3af', fontWeight: '600', lineHeight: '1.3'}}>{badge.nome}</div>
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