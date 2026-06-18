import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/crianca.css'

const menu = [{"icon":"🏠","label":"Início","path":"/home-crianca"},{"icon":"🗺️","label":"Trilha","path":"/trilha"},{"icon":"🎬","label":"Kids","path":"/kids"},{"icon":"🏆","label":"Ranking","path":"/ranking"},{"icon":"🏪","label":"Loja","path":"/loja"},{"icon":"👤","label":"Perfil","path":"/perfil-crianca"}]

const historico = [
  { tipo: 'ganho', descricao: 'Labirinto Lógico concluído', valor: 100, data: 'hoje' },
  { tipo: 'ganho', descricao: 'Vídeo assistido', valor: 30, data: 'hoje' },
  { tipo: 'gasto', descricao: 'Avatar Astronauta', valor: -300, data: 'ontem' },
  { tipo: 'ganho', descricao: 'Inventor Maluco concluído', valor: 150, data: 'ontem' },
  { tipo: 'ganho', descricao: 'Streak de 7 dias', valor: 70, data: '3 dias atrás' },
]

export default function Coins() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)

  useEffect(() => {
    supabase.from('children').select('*').eq('nome', 'Lia').single().then(({ data }) => setChild(data))
  }, [])

  const saldo = child?.neural_coins || 324

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

        <div className="card-white" style={{padding: '16px', marginBottom: '12px'}}>
          <div style={{fontSize: '12px', color: '#9ca3af', fontWeight: '500', marginBottom: '6px'}}>🎯 Próxima recompensa</div>
          <div style={{fontWeight: '700', fontSize: '14px', color: '#0f0a1e', marginBottom: '8px'}}>Avatar Astronauta</div>
          <div style={{background: '#e5e7eb', borderRadius: '999px', height: '7px', overflow: 'hidden', marginBottom: '6px'}}>
            <div style={{background: 'linear-gradient(90deg, #7C3AED, #a78bfa)', width: '65%', height: '100%', borderRadius: '999px'}} />
          </div>
          <div style={{fontSize: '12px', color: '#9ca3af', fontWeight: '500'}}>Faltam 176 coins • 324 de 500</div>
        </div>

        <button className="btn-purple" style={{marginBottom: '20px'}} onClick={() => navigate('/loja')}>🏪 Ir para a Loja</button>

        <h4 style={{fontWeight: '800', fontSize: '14px', marginBottom: '12px', color: '#0f0a1e'}}>Histórico</h4>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          {historico.map((item, i) => (
            <div key={i} className="card-white" style={{padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{width: '32px', height: '32px', borderRadius: '10px', background: item.tipo === 'ganho' ? '#f0fdf4' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'}}>{item.tipo === 'ganho' ? '💚' : '🔴'}</div>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px', color: '#0f0a1e'}}>{item.descricao}</div>
                  <div style={{fontSize: '11px', color: '#9ca3af'}}>{item.data}</div>
                </div>
              </div>
              <div style={{fontWeight: '800', color: item.tipo === 'ganho' ? '#10b981' : '#ef4444', fontSize: '14px'}}>
                {item.valor > 0 ? '+' : ''}{item.valor}
              </div>
            </div>
          ))}
        </div>
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