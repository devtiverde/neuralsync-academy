import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/crianca.css'

export default function Encerramento() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [mostrarBadge, setMostrarBadge] = useState(false)

  const xp = state?.xp ?? 100
  const coins = state?.coins ?? 100
  const titulo = state?.titulo ?? 'Atividade'

  useEffect(() => {
    setTimeout(() => setMostrarBadge(true), 900)

    if (!state?.titulo) return

    const entrada = {
      titulo: state.titulo,
      xp: state.xp || 0,
      coins: state.coins || 0,
      emoji: state.emoji || '⭐',
      tipo: state.tipo || '',
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
    }

    const hist = JSON.parse(localStorage.getItem('ns_historico') || '[]')

    const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
    if (child) {
      entrada.child_id = child.id
      const novoXP = (child.xp || 0) + (state.xp || 0)
      const novasCoins = (child.neural_coins || 0) + (state.coins || 0)
      const hoje = new Date().toDateString()
      const ultimoAtivoKey = 'ns_ultimo_ativo_' + child.id
      const ultimoAtivo = localStorage.getItem(ultimoAtivoKey)
      let novoStreak = child.streak_atual || 0
      if (ultimoAtivo !== hoje) {
        const ontem = new Date(Date.now() - 86400000).toDateString()
        novoStreak = ultimoAtivo === ontem ? novoStreak + 1 : 1
        localStorage.setItem(ultimoAtivoKey, hoje)
      }
      const novoStreakMax = Math.max(child.streak_maximo || 0, novoStreak)
      const childAtualizado = { ...child, xp: novoXP, neural_coins: novasCoins, streak_atual: novoStreak, streak_maximo: novoStreakMax }
      localStorage.setItem('ns_active_child', JSON.stringify(childAtualizado))
      supabase.from('children')
        .update({ xp: novoXP, neural_coins: novasCoins, streak_atual: novoStreak, streak_maximo: novoStreakMax })
        .eq('id', child.id)
        .then(() => {})
    }

    hist.unshift(entrada)
    localStorage.setItem('ns_historico', JSON.stringify(hist.slice(0, 50)))
  }, [])

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center'}}>

      <div style={{fontSize: '64px', marginBottom: '14px'}}>🎉</div>
      <h2 style={{fontSize: '26px', fontWeight: '900', marginBottom: '6px', color: '#0f0a1e', letterSpacing: '-0.5px'}}>Atividade concluída!</h2>
      <p style={{color: '#6b7280', marginBottom: '6px', fontSize: '14px'}}>Incrível trabalho!</p>
      <p style={{color: '#a78bfa', marginBottom: '28px', fontSize: '13px', fontWeight: '700'}}>{titulo}</p>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px', width: '100%'}}>
        {[
          ['+' + xp, 'XP ganho', '#7C3AED'],
          ['+' + coins + ' 💰', 'NeuralCoins', '#F07A20'],
        ].map(([val, label, cor]) => (
          <div key={label} className="card-white" style={{padding: '18px'}}>
            <div style={{fontSize: '24px', fontWeight: '900', color: cor}}>{val}</div>
            <div style={{fontSize: '11px', color: '#9ca3af', fontWeight: '500'}}>{label}</div>
          </div>
        ))}
      </div>

      {mostrarBadge && (
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
          borderRadius: '18px', padding: '18px 28px', marginBottom: '28px',
          border: '1.5px solid #fcd34d', width: '100%',
        }}>
          <div style={{fontSize: '32px', marginBottom: '6px'}}>🏆</div>
          <div style={{fontWeight: '800', color: '#92400e', fontSize: '15px'}}>Nova conquista desbloqueada!</div>
          <div style={{color: '#78350f', fontSize: '13px', marginTop: '2px'}}>Explorador de Atividades</div>
        </div>
      )}

      <div style={{display: 'flex', gap: '10px', width: '100%'}}>
        <button onClick={() => navigate('/trilha')} className="btn-purple" style={{flex: 1}}>Próxima atividade →</button>
        <button onClick={() => navigate('/home-crianca')} style={{flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>Início</button>
      </div>
    </div>
    </div>
  )
}
