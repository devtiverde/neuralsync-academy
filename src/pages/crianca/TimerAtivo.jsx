import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../styles/crianca.css'

export default function TimerAtivo() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const config = (() => { try { return JSON.parse(localStorage.getItem('ns_timer_config') || 'null') } catch { return null } })()
  const duracaoMin = config?.duracao ?? 30
  const aviso5min = config?.aviso5min ?? true
  const encerramentoAuto = config?.encerramentoAuto ?? true
  const titulo = state?.titulo || 'Sessão de aprendizado'
  const totalSeg = duracaoMin * 60

  const [segundos, setSegundos] = useState(totalSeg)
  const [ativo, setAtivo] = useState(true)
  const [coins, setCoins] = useState(0)

  useEffect(() => {
    if (!ativo || segundos <= 0) return
    const interval = setInterval(() => {
      setSegundos(s => s - 1)
      setCoins(c => c + (duracaoMin >= 30 ? 0.1 : 0.067))
    }, 1000)
    return () => clearInterval(interval)
  }, [ativo, segundos])

  useEffect(() => {
    if (segundos <= 0 && encerramentoAuto) {
      navigate('/encerramento', { state: { xp: Math.floor(coins * 2), coins: Math.floor(coins), titulo, tipo: 'timer' } })
    }
  }, [segundos])

  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  const progresso = ((totalSeg - segundos) / totalSeg) * 100
  const circunferencia = 2 * Math.PI * 90
  const dashoffset = circunferencia - (progresso / 100) * circunferencia
  const alerta = aviso5min && segundos <= 300 && segundos > 0

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px'}}>

      <h2 style={{fontSize: '14px', color: '#9ca3af', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px'}}>Sessão em andamento</h2>
      <h3 style={{fontSize: '18px', fontWeight: '800', marginBottom: '4px', color: '#7C3AED'}}>{titulo}</h3>
      <p style={{fontSize: '12px', color: '#9ca3af', marginBottom: '28px'}}>{duracaoMin} minutos configurados pelo responsável</p>

      {/* CÍRCULO */}
      <div style={{position: 'relative', marginBottom: '32px'}}>
        <svg width="220" height="220" style={{transform: 'rotate(-90deg)'}}>
          <circle cx="110" cy="110" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle cx="110" cy="110" r="90" fill="none"
            stroke={alerta ? '#ef4444' : '#7C3AED'}
            strokeWidth="12"
            strokeDasharray={circunferencia}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            style={{transition: 'stroke-dashoffset 1s linear, stroke 0.3s'}}
          />
        </svg>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center'}}>
          <div style={{fontSize: '42px', fontWeight: '900', color: alerta ? '#ef4444' : '#0f0a1e', letterSpacing: '-2px'}}>
            {String(minutos).padStart(2,'0')}:{String(segs).padStart(2,'0')}
          </div>
          <div style={{fontSize: '12px', color: '#9ca3af', fontWeight: '600'}}>restantes</div>
        </div>
      </div>

      {alerta && (
        <div style={{background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '14px', padding: '12px 20px', marginBottom: '20px', fontWeight: '700', fontSize: '14px', color: '#dc2626', textAlign: 'center'}}>
          ⚠️ Faltam 5 minutos! Salve seu projeto!
        </div>
      )}

      <div className="card-white" style={{padding: '16px 32px', marginBottom: '28px', textAlign: 'center'}}>
        <div style={{fontSize: '26px', fontWeight: '900', color: '#F07A20'}}>💰 +{Math.floor(coins)}</div>
        <div style={{fontSize: '12px', color: '#9ca3af', fontWeight: '500'}}>NeuralCoins acumulados</div>
      </div>

      <div style={{display: 'flex', gap: '12px'}}>
        <button onClick={() => setAtivo(!ativo)} style={{
          background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px',
          padding: '13px 24px', color: '#0f0a1e', cursor: 'pointer',
          fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>{ativo ? '⏸ Pausar' : '▶ Continuar'}</button>
        <button onClick={() => navigate('/encerramento', { state: { xp: Math.floor(coins * 2), coins: Math.floor(coins), titulo, tipo: 'timer' } })} style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          border: 'none', borderRadius: '12px', padding: '13px 24px',
          color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 4px 14px rgba(239,68,68,0.3)'
        }}>⏹ Encerrar</button>
      </div>
    </div>
    </div>
  )
}
