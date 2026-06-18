import { useNavigate } from 'react-router-dom'
import '../../styles/crianca.css'

export default function Bloqueio() {
  const navigate = useNavigate()
  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center',
      background: 'linear-gradient(135deg, #7C3AED, #6d28d9)'
    }}>
      <div style={{fontSize: '72px', marginBottom: '20px'}}>🌙</div>
      <h2 style={{color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-0.5px'}}>Ei, Lia!</h2>
      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '6px'}}>Agora não é hora de usar a plataforma.</p>
      <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '14px'}}>Sua próxima sessão começa às 14h de segunda-feira ⭐</p>

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