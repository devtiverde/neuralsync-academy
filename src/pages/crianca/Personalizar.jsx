import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/crianca.css'

const menu = [{"icon":"🏠","label":"Início","path":"/home-crianca"},{"icon":"🗺️","label":"Trilha","path":"/trilha"},{"icon":"🎬","label":"Kids","path":"/kids"},{"icon":"🏆","label":"Ranking","path":"/ranking"},{"icon":"🏪","label":"Loja","path":"/loja"},{"icon":"👤","label":"Perfil","path":"/perfil-crianca"}]

const avatares = ['🦊', '🐱', '🐶', '🐸', '🦁', '🐼', '🦄', '🐯', '🦋', '🐬', '⭐', '🎨']
const AVATAR_MAP = {
  'Explorer':'🧭','av_explorer':'🧭','Cientista':'🔬','av_cientista':'🔬',
  'Astronauta':'🚀','av_astronauta':'🚀','Mago':'🧙','av_mago':'🧙',
  'Artista':'🎨','av_artista':'🎨','Robô':'🤖','Robo':'🤖','av_robo':'🤖',
  'Dino':'🦕','av_dino':'🦕','Ninja':'🥷','av_ninja':'🥷',
}
const resolverAvatar = av => (!av ? '🦊' : AVATAR_MAP[av] || av)
const cores = ['#7C3AED', '#F07A20', '#10b981', '#3b82f6', '#ef4444', '#ec4899', '#f59e0b', '#06b6d4', '#8b5cf6', '#84cc16', '#f97316', '#14b8a6']

export default function Personalizar() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [avatarSel, setAvatarSel] = useState(0)
  const [corSel, setCorSel] = useState('#7C3AED')
  const [bio, setBio] = useState('Adoro aprender coisas novas!')
  const [salvo, setSalvo] = useState(false)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (cached) {
      setChild(cached)
      const resolvedAvatar = resolverAvatar(cached.avatar)
      const idx = avatares.indexOf(resolvedAvatar)
      setAvatarSel(idx >= 0 ? idx : 0)
      setCorSel(cached.cor_perfil || '#7C3AED')
      setBio(cached.bio || 'Adoro aprender coisas novas!')
    }
  }, [])

  const salvar = async () => {
    if (!child || salvando) return
    setSalvando(true)
    const avatar = avatares[avatarSel]
    const atualizado = { ...child, avatar, cor_perfil: corSel, bio }
    localStorage.setItem('ns_active_child', JSON.stringify(atualizado))
    await supabase.from('children').update({ avatar, cor_perfil: corSel, bio }).eq('id', child.id)
    setSalvando(false)
    setSalvo(true)
    setTimeout(() => { setSalvo(false); navigate('/perfil-crianca') }, 1500)
  }

  if (!child) return (
    <div className="page-wrapper" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <div style={{color: '#7C3AED', fontWeight: '700'}}>Carregando...</div>
    </div>
  )

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{paddingBottom: '90px'}}>

      <div className="header-gradient" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <button onClick={() => navigate('/perfil-crianca')} style={{background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>←</button>
        <h2 style={{color: 'white', fontSize: '18px', fontWeight: '900'}}>✨ Personalizar Perfil</h2>
      </div>

      <div style={{padding: '16px'}}>

        {/* PREVIEW */}
        <div className="card-white" style={{padding: '20px', marginBottom: '12px', textAlign: 'center'}}>
          <div style={{width: '72px', height: '72px', borderRadius: '20px', background: corSel, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 10px', boxShadow: '0 4px 16px ' + corSel + '44'}}>
            {avatares[avatarSel]}
          </div>
          <div style={{fontWeight: '800', fontSize: '16px', color: '#0f0a1e', marginBottom: '3px'}}>{child.nome}</div>
          <div style={{fontSize: '13px', color: '#9ca3af'}}>{bio}</div>
        </div>

        {/* AVATARES */}
        <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
          <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '12px', color: '#0f0a1e'}}>Avatar</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '8px'}}>
            {avatares.map((av, i) => (
              <button key={i} onClick={() => setAvatarSel(i)} style={{
                background: avatarSel === i ? corSel : '#f9fafb',
                border: avatarSel === i ? '2px solid ' + corSel : '2px solid #f3f4f6',
                borderRadius: '12px', padding: '10px', fontSize: '22px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: avatarSel === i ? '0 4px 12px ' + corSel + '44' : 'none'
              }}>{av}</button>
            ))}
          </div>
        </div>

        {/* CORES */}
        <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
          <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '12px', color: '#0f0a1e'}}>Cor do perfil</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '10px'}}>
            {cores.map((cor, i) => (
              <button key={i} onClick={() => setCorSel(cor)} style={{
                background: cor,
                border: corSel === cor ? '3px solid #0f0a1e' : '3px solid transparent',
                borderRadius: '50%', width: '40px', height: '40px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: corSel === cor ? '0 0 0 2px white, 0 0 0 4px ' + cor : 'none'
              }} />
            ))}
          </div>
        </div>

        {/* BIO */}
        <div className="card-white" style={{padding: '16px', marginBottom: '16px'}}>
          <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '10px', color: '#0f0a1e'}}>
            Bio <span style={{color: '#9ca3af', fontWeight: '500', fontSize: '12px'}}>({bio.length}/60)</span>
          </h4>
          <input
            value={bio}
            onChange={e => e.target.value.length <= 60 && setBio(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: '10px',
              border: '1.5px solid #e5e7eb', background: '#f9fafb',
              fontSize: '14px', color: '#0f0a1e', outline: 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s'
            }}
            onFocus={e => { e.target.style.borderColor = '#7C3AED'; e.target.style.background = 'white' }}
            onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb' }}
          />
        </div>

        <button className="btn-purple" onClick={salvar} disabled={salvando} style={{
          background: salvo ? 'linear-gradient(135deg, #10b981, #059669)' : undefined,
          opacity: salvando ? 0.7 : 1
        }}>
          {salvo ? '✓ Perfil salvo!' : salvando ? 'Salvando...' : 'Salvar perfil'}
        </button>
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
