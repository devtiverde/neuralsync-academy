import { useNavigate } from 'react-router-dom'
import '../../styles/crianca.css'

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function proximaSessao() {
  try {
    const agenda = JSON.parse(localStorage.getItem('ns_agenda_config') || 'null')
    if (!agenda || !Array.isArray(agenda)) return null
    const hoje = new Date()
    const diaHoje = hoje.getDay()
    const horaAtual = hoje.getHours() * 60 + hoje.getMinutes()

    for (let d = 0; d < 7; d++) {
      const dia = (diaHoje + d) % 7
      const slot = agenda[dia]
      if (!slot || !slot.ativo) continue
      const [h, m] = (slot.inicio || '14:00').split(':').map(Number)
      const minSlot = h * 60 + m
      if (d === 0 && minSlot <= horaAtual) continue
      return `${h}h${m > 0 ? String(m).padStart(2, '0') : ''} de ${DIAS[dia]}`
    }
    return null
  } catch {
    return null
  }
}

export default function Bloqueio() {
  const navigate = useNavigate()
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()
  const nome = child?.nome || 'estudante'
  const proxima = proximaSessao()

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center',
      background: 'linear-gradient(135deg, #7C3AED, #6d28d9)'
    }}>
      <div style={{fontSize: '72px', marginBottom: '20px'}}>🌙</div>
      <h2 style={{color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.5px'}}>Ei, {nome}!</h2>
      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '6px'}}>Agora não é hora de usar a plataforma.</p>
      {proxima
        ? <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '14px'}}>Sua próxima sessão começa às {proxima} ⭐</p>
        : <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '14px'}}>Peça ao responsável para liberar o acesso ⭐</p>
      }

      <div style={{background: 'rgba(255,255,255,0.1)', borderRadius: '18px', padding: '20px 28px', maxWidth: '300px', width: '100%', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '24px'}}>
        <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '8px', fontWeight: '600'}}>Mensagem dos seus pais:</p>
        <p style={{fontSize: '15px', color: 'white', fontStyle: 'italic'}}>Aproveite para brincar lá fora! 😊</p>
      </div>

      <button onClick={() => navigate('/auth')} style={{background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '12px 24px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>
        Entrar como responsável
      </button>
    </div>
    </div>
  )
}
