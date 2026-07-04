import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LayoutCrianca from '../../components/LayoutCrianca'
import { CoinVertical } from '@phosphor-icons/react'
import '../../styles/crianca.css'

export default function TimerAtivo() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const config = (() => { try { return JSON.parse(localStorage.getItem('ns_timer_config') || 'null') } catch { return null } })()
  const duracaoMin = config?.duracao ?? 30
  const aviso5min = config?.aviso5min ?? true
  const permiteExtensao = config?.permiteExtensao ?? true
  const encerramentoAuto = config?.encerramentoAuto ?? true
  const titulo = state?.titulo || 'Sessão de aprendizado'
  const totalSeg = duracaoMin * 60

  const [segundos, setSegundos] = useState(totalSeg)
  const [ativo, setAtivo] = useState(true)
  const [coins, setCoins] = useState(0)
  const [extendido, setExtendido] = useState(false)

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
  }, [segundos, encerramentoAuto, navigate, coins, titulo])

  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  const totalSegAtual = totalSeg + (extendido ? 15 * 60 : 0)
  const progresso = Math.min(100, ((totalSegAtual - segundos) / totalSegAtual) * 100)
  const circunferencia = 2 * Math.PI * 90
  const dashoffset = circunferencia - (progresso / 100) * circunferencia
  const alerta = aviso5min && segundos <= 300 && segundos > 0

  return (
    <LayoutCrianca child={child}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 24px' }}>

        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Sessão em andamento</p>
        <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '4px', color: 'white' }}>{titulo}</h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '36px' }}>{duracaoMin} minutos configurados pelo responsável</p>

        {/* CÍRCULO */}
        <div style={{ position: 'relative', marginBottom: '36px' }}>
          <svg width="240" height="240" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="120" cy="120" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
            <circle cx="120" cy="120" r="90" fill="none"
              stroke={alerta ? '#ef4444' : '#7C3AED'}
              strokeWidth="12"
              strokeDasharray={circunferencia}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s', filter: alerta ? 'drop-shadow(0 0 8px #ef4444)' : 'drop-shadow(0 0 8px #7C3AED)' }}
            />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '900', color: alerta ? '#ef4444' : 'white', letterSpacing: '-2px' }}>
              {String(minutos).padStart(2,'0')}:{String(segs).padStart(2,'0')}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>restantes</div>
          </div>
        </div>

        {alerta && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid rgba(239,68,68,0.4)', borderRadius: '14px', padding: '12px 24px', marginBottom: '20px', fontWeight: '700', fontSize: '14px', color: '#fca5a5', textAlign: 'center' }}>
            ⚠️ Faltam 5 minutos! Salve seu projeto!
          </div>
        )}

        <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', padding: '18px 40px', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><CoinVertical weight="duotone" size={32} color="#F59E0B" /> +{Math.floor(coins)}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>NeuralCoins acumulados</div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setAtivo(!ativo)} style={{
            background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '14px',
            padding: '14px 28px', color: 'white', cursor: 'pointer',
            fontWeight: '700', fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>{ativo ? '⏸ Pausar' : '▶ Continuar'}</button>
          {permiteExtensao && !extendido && (
            <button onClick={() => { setSegundos(s => s + 15 * 60); setExtendido(true) }} style={{
              background: 'rgba(16,185,129,0.15)', border: '1.5px solid rgba(16,185,129,0.4)', borderRadius: '14px',
              padding: '14px 20px', color: '#34d399', cursor: 'pointer',
              fontWeight: '700', fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>+15 min</button>
          )}
          <button onClick={() => navigate('/encerramento', { state: { xp: Math.floor(coins * 2), coins: Math.floor(coins), titulo, tipo: 'timer' } })} style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: 'none', borderRadius: '14px', padding: '14px 28px',
            color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '15px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: '0 6px 20px rgba(239,68,68,0.35)',
          }}>⏹ Encerrar</button>
        </div>
      </div>
    </LayoutCrianca>
  )
}
