import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/crianca.css'

const menu = [{"icon":"🏠","label":"Início","path":"/home-crianca"},{"icon":"🗺️","label":"Trilha","path":"/trilha"},{"icon":"🎬","label":"Kids","path":"/kids"},{"icon":"🏆","label":"Ranking","path":"/ranking"},{"icon":"🏪","label":"Loja","path":"/loja"},{"icon":"👤","label":"Perfil","path":"/perfil-crianca"}]

const PROXIMOS_ALVOS = [200, 300, 400, 500, 600, 700, 900, 1200, 1800, 3000, 5000]

const nomeAlvo = {
  200: 'Moldura Estrelas ⭐', 300: 'Avatar Cientista 🔬', 400: 'Moldura Fogo 🔥',
  500: 'Avatar Astronauta 🚀', 600: 'Avatar Robô 🤖', 700: 'Tema Oceano 🌊',
  900: 'Moldura Arco-íris 🌈', 1200: 'Caderno de Missões 📓',
  1800: 'Caneca Espacial ☕', 3000: 'Camiseta NeuralSync 👕', 5000: 'Mochila NeuralSync 🎒',
}

function tempoRelativo(ts) {
  if (!ts) return ''
  const diff = Date.now() - ts
  if (diff < 60000) return 'agora'
  if (diff < 3600000) return `há ${Math.floor(diff / 60000)} min`
  if (diff < 86400000) return `há ${Math.floor(diff / 3600000)}h`
  if (diff < 172800000) return 'ontem'
  return `há ${Math.floor(diff / 86400000)} dias`
}

export default function Coins() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [historico, setHistorico] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (!cached) { setLoading(false); return }
    setChild(cached)

    supabase.from('ns_historico')
      .select('titulo, coins, xp, tipo, data, timestamp')
      .eq('child_id', cached.id)
      .order('timestamp', { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHistorico(data)
        } else {
          const local = (() => { try { return JSON.parse(localStorage.getItem('ns_historico') || '[]') } catch { return [] } })()
          setHistorico(local.filter(h => !h.child_id || h.child_id === cached.id).slice(0, 30))
        }
        setLoading(false)
      })
  }, [])

  const saldo = child?.neural_coins ?? 0
  const proximoIdx = PROXIMOS_ALVOS.findIndex(a => a > saldo)
  const proximoAlvo = proximoIdx >= 0 ? PROXIMOS_ALVOS[proximoIdx] : null
  const alvoAnterior = proximoIdx > 0 ? PROXIMOS_ALVOS[proximoIdx - 1] : 0
  const progressoPct = proximoAlvo ? Math.round(((saldo - alvoAnterior) / (proximoAlvo - alvoAnterior)) * 100) : 100

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{paddingBottom: '90px'}}>

      <div className="header-gradient" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <button onClick={() => navigate('/home-crianca')} style={{background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>←</button>
        <h2 style={{color: 'white', fontSize: '18px', fontWeight: '900'}}>Carteira 💰</h2>
      </div>

      <div style={{padding: '0 16px', marginTop: '-14px'}}>

        <div style={{background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '18px', padding: '24px', textAlign: 'center', marginBottom: '12px', border: '1.5px solid #fcd34d', boxShadow: '0 4px 16px rgba(251,191,36,0.2)'}}>
          <div style={{fontSize: '12px', color: '#92400e', fontWeight: '600', marginBottom: '6px'}}>Saldo atual</div>
          <div style={{fontSize: '44px', fontWeight: '900', color: '#92400e', letterSpacing: '-2px'}}>💰 {saldo}</div>
          <div style={{fontSize: '13px', color: '#78350f', fontWeight: '600'}}>NeuralCoins</div>
        </div>

        {proximoAlvo && (
          <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
            <div style={{fontSize: '12px', color: '#9ca3af', fontWeight: '500', marginBottom: '6px'}}>🎯 Próxima recompensa</div>
            <div style={{fontWeight: '700', fontSize: '14px', color: '#0f0a1e', marginBottom: '8px'}}>{nomeAlvo[proximoAlvo]}</div>
            <div style={{background: '#e5e7eb', borderRadius: '999px', height: '7px', overflow: 'hidden', marginBottom: '6px'}}>
              <div style={{background: 'linear-gradient(90deg, #7C3AED, #a78bfa)', width: Math.max(progressoPct, 2) + '%', height: '100%', borderRadius: '999px', transition: 'width 0.5s'}} />
            </div>
            <div style={{fontSize: '12px', color: '#9ca3af', fontWeight: '500'}}>{saldo} de {proximoAlvo} coins • Faltam {proximoAlvo - saldo}</div>
          </div>
        )}

        <button className="btn-purple" style={{marginBottom: '20px'}} onClick={() => navigate('/loja')}>🏪 Ir para a Loja</button>

        <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '12px', color: '#0f0a1e'}}>Histórico</h4>

        {loading ? (
          <div style={{textAlign: 'center', padding: '24px', color: '#9ca3af', fontWeight: '600'}}>Carregando...</div>
        ) : historico.length === 0 ? (
          <div className="card-white" style={{padding: '24px', textAlign: 'center', color: '#9ca3af'}}>
            <div style={{fontSize: '32px', marginBottom: '8px'}}>💰</div>
            <div style={{fontWeight: '700'}}>Nenhuma atividade ainda</div>
            <div style={{fontSize: '12px', marginTop: '4px'}}>Complete atividades para ganhar NeuralCoins!</div>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {historico.map((item, i) => (
              <div key={i} className="card-white" style={{padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{width: '32px', height: '32px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>💚</div>
                  <div>
                    <div style={{fontWeight: '600', fontSize: '13px', color: '#0f0a1e'}}>{item.titulo}</div>
                    <div style={{fontSize: '11px', color: '#9ca3af'}}>{item.data || tempoRelativo(item.timestamp)}</div>
                  </div>
                </div>
                <div style={{fontWeight: '800', color: '#10b981', fontSize: '14px'}}>+{item.coins}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="menu-bottom">
        {menu.map(item => (
          <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
            style={{color: '#9ca3af'}}>
            <span style={{fontSize: '20px'}}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}
