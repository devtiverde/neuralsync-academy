import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import '../../styles/crianca.css'

export default function Encerramento() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [mostrarBadge, setMostrarBadge] = useState(false)
  const [levelUp, setLevelUp] = useState(null)

  const xp = state?.xp ?? 0
  const coins = state?.coins ?? 0
  const titulo = state?.titulo ?? null

  useEffect(() => {
    if (!titulo) { navigate('/trilha', { replace: true }); return }

    setTimeout(() => setMostrarBadge(true), 900)

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
      const nivelAtual = child.nivel || 1
      const novoNivel = Math.max(nivelAtual, Math.floor(novoXP / 500) + 1)
      if (novoNivel > nivelAtual) {
        setTimeout(() => setLevelUp({ de: nivelAtual, para: novoNivel }), 600)
      }
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
      const childAtualizado = { ...child, xp: novoXP, neural_coins: novasCoins, nivel: novoNivel, streak_atual: novoStreak, streak_maximo: novoStreakMax }
      localStorage.setItem('ns_active_child', JSON.stringify(childAtualizado))
      supabase.from('children')
        .update({ xp: novoXP, neural_coins: novasCoins, nivel: novoNivel, streak_atual: novoStreak, streak_maximo: novoStreakMax })
        .eq('id', child.id)
        .then(() => {})
    }

    hist.unshift(entrada)
    localStorage.setItem('ns_historico', JSON.stringify(hist.slice(0, 50)))

    // Persiste no Supabase para o relatório PDF usar dados reais
    if (child) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return
        supabase.from('ns_historico').insert({
          child_id: child.id,
          parent_id: user.id,
          titulo: entrada.titulo,
          xp: entrada.xp,
          coins: entrada.coins,
          emoji: entrada.emoji,
          tipo: entrada.tipo,
          data: entrada.data,
          timestamp: entrada.timestamp,
        }).then(() => {})
      })
    }
  }, [])

  return (
    <div style={{background: 'var(--color-bg)', minHeight: '100vh'}}>
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

      {levelUp && (
        <div style={{
          background: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
          borderRadius: 'var(--r-lg)', padding: '18px 28px', marginBottom: '12px',
          border: '2px solid #a78bfa', width: '100%',
          animation: 'ns-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <style>{`@keyframes ns-pop{0%{transform:scale(0.7);opacity:0}100%{transform:scale(1);opacity:1}}`}</style>
          <div style={{fontSize: '36px', marginBottom: '6px'}}>🚀</div>
          <div style={{fontWeight: '900', color: 'white', fontSize: '18px', letterSpacing: '-0.5px'}}>LEVEL UP!</div>
          <div style={{color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '4px'}}>
            Nível {levelUp.de} → <strong style={{color: '#fde68a'}}>Nível {levelUp.para}</strong> 🎊
          </div>
        </div>
      )}

      {mostrarBadge && (
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
          borderRadius: 'var(--r-lg)', padding: '18px 28px', marginBottom: '28px',
          border: '1.5px solid #fcd34d', width: '100%',
        }}>
          <div style={{fontSize: '32px', marginBottom: '6px'}}>🏆</div>
          <div style={{fontWeight: '800', color: '#92400e', fontSize: '15px'}}>Nova conquista desbloqueada!</div>
          <div style={{color: '#78350f', fontSize: '13px', marginTop: '2px'}}>Explorador de Atividades</div>
        </div>
      )}

      <div style={{display: 'flex', gap: '10px', width: '100%'}}>
        <button onClick={() => navigate('/trilha')} className="btn-purple" style={{flex: 1}}>Próxima atividade →</button>
        <button onClick={() => navigate('/home-crianca')} style={{flex: 1, background: 'var(--color-surface)', border: '1.5px solid var(--color-border-2)', borderRadius: 'var(--r-md)', padding: '13px', color: 'var(--color-text-1)', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>Início</button>
      </div>
    </div>
    </div>
  )
}
