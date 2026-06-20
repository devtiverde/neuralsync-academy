import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ativado = searchParams.get('ativado') === '1'
  const planoParam = searchParams.get('plano')

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.textContent = `
      * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
      .auth-input {
        width: 100%; padding: 14px 16px; border-radius: 12px;
        border: 1.5px solid #e5e7eb; background: #f9fafb;
        font-size: 15px; color: #0f0a1e; outline: none;
        transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .auth-input:focus { border-color: #7C3AED; background: white; box-shadow: 0 0 0 4px rgba(124,58,237,0.08); }
      .auth-btn {
        width: 100%; padding: 15px; border-radius: 12px; border: none;
        background: linear-gradient(135deg, #7C3AED, #6d28d9);
        color: white; font-weight: 700; font-size: 16px; cursor: pointer;
        box-shadow: 0 4px 20px rgba(124,58,237,0.35);
        transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .auth-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,58,237,0.5); }
      .auth-btn:disabled { opacity: 0.7; transform: none; }
    `
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    if (ativado) setIsLogin(false)
  }, [ativado])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (isLogin) {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
      else navigate('/dashboard')
    } else {
      const { error } = await signUp(email, password, nome)
      if (error) setError(error.message)
      else navigate('/dashboard')
    }
    setLoading(false)
  }

  const subtituloSignup = ativado
    ? `Pagamento confirmado${planoParam ? ` — plano ${planoParam}` : ''}! Preencha seus dados para ativar o acesso.`
    : 'Crie sua conta e comece com 7 dias de garantia.'

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(145deg, #faf5ff 0%, #ede9fe 30%, #e0f2fe 65%, #d1fae5 100%)'
    }}>
      {/* LADO ESQUERDO */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 80px'}}>
        <div onClick={() => navigate('/')} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '60px', cursor: 'pointer'}}>
          <div style={{width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'}}>🧠</div>
          <span style={{fontWeight: '800', fontSize: '18px'}}>
            <span style={{color: '#0f0a1e'}}>NeuralSync </span>
            <span style={{color: '#7C3AED'}}>Academy</span>
          </span>
        </div>

        {ativado && (
          <div style={{background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '24px'}}>✅</div>
            <div>
              <div style={{fontWeight: '800', fontSize: '14px', color: '#166534'}}>Pagamento confirmado!</div>
              <div style={{fontSize: '13px', color: '#15803d'}}>Crie sua conta abaixo para ativar o acesso imediatamente.</div>
            </div>
          </div>
        )}

        <h1 style={{fontSize: '40px', fontWeight: '900', letterSpacing: '-1.5px', color: '#0f0a1e', marginBottom: '12px', lineHeight: '1.1'}}>
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h1>
        <p style={{color: '#6b7280', fontSize: '16px', marginBottom: '40px'}}>
          {isLogin ? 'Entre para acompanhar a evolução do seu filho.' : subtituloSignup}
        </p>

        {error && (
          <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', marginBottom: '20px'}}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {!isLogin && (
            <div>
              <label style={{fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block'}}>Seu nome</label>
              <input className="auth-input" type="text" placeholder="Como podemos te chamar?" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
          )}
          <div>
            <label style={{fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block'}}>Email</label>
            <input className="auth-input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block'}}>Senha</label>
            <input className="auth-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn" disabled={loading} style={{marginTop: '8px'}}>
            {loading ? 'Carregando...' : isLogin ? 'Entrar →' : ativado ? 'Criar conta e ativar plano →' : 'Criar conta →'}
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '28px', color: '#6b7280', fontSize: '14px'}}>
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} style={{background: 'none', border: 'none', color: '#7C3AED', fontWeight: '700', cursor: 'pointer', fontSize: '14px'}}>
            {isLogin ? 'Criar agora' : 'Entrar'}
          </button>
        </p>
      </div>

      {/* LADO DIREITO */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #7C3AED 0%, #6d28d9 50%, #4c1d95 100%)',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)'}} />
        <div style={{position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)'}} />

        <div style={{position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', maxWidth: '360px'}}>
          <div style={{fontSize: '64px', marginBottom: '24px'}}>🧠</div>
          <h2 style={{fontSize: '28px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '16px', lineHeight: '1.2'}}>
            Transforme o tempo de tela em inteligência
          </h2>
          <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.7', marginBottom: '40px'}}>
            Mais de 50.000 crianças já desenvolvem habilidades cognitivas com a NeuralSync Academy.
          </p>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px'}}>
            {[['+50k','Crianças ativas'],['8','Habilidades'],['4.9★','Avaliação'],['200+','Atividades']].map(([num, label]) => (
              <div key={label} style={{background: 'rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px', backdropFilter: 'blur(8px)'}}>
                <div style={{fontSize: '22px', fontWeight: '900', marginBottom: '4px'}}>{num}</div>
                <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.6)'}}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', backdropFilter: 'blur(8px)', textAlign: 'left'}}>
            <div style={{color: '#F07A20', fontSize: '14px', marginBottom: '10px'}}>★★★★★</div>
            <p style={{fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginBottom: '14px'}}>
              Minha filha pediu para fazer mais um desafio antes de dormir. Não acreditei!
            </p>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>🌸</div>
              <div>
                <div style={{fontSize: '13px', fontWeight: '700'}}>Marina S.</div>
                <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.6)'}}>Mãe da Sofia, 7 anos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
