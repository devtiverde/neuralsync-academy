import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/auth.css'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [consentido, setConsentido] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ativado = searchParams.get('ativado') === '1'
  const planoParam = searchParams.get('plano')

  useEffect(() => {
    if (ativado) setIsLogin(false)
  }, [ativado])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (!isLogin && password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }
    if (!isLogin && !consentido) {
      setError('Você precisa aceitar os termos e o consentimento de dados para continuar.')
      setLoading(false)
      return
    }
    if (isLogin) {
      const { error } = await signIn(email, password)
      if (error) setError('Email ou senha inválidos. Verifique seus dados.')
      else navigate('/dashboard')
    } else {
      const { error } = await signUp(email, password, nome)
      if (error) {
        if (error.message?.includes('already registered')) setError('Este email já está cadastrado. Tente fazer login.')
        else setError('Não foi possível criar a conta. Verifique seus dados.')
      } else navigate('/dashboard')
    }
    setLoading(false)
  }

  const subtituloSignup = ativado
    ? `Pagamento confirmado${planoParam ? ` — plano ${planoParam}` : ''}! Preencha seus dados para ativar o acesso.`
    : 'Crie sua conta e comece com 7 dias de garantia.'

  return (
    <div className="auth-page">
      {/* LADO ESQUERDO — formulário */}
      <div className="auth-left">
        <div className="auth-logo" onClick={() => navigate('/')}>
          <div className="auth-logo-icon">🧠</div>
          <span className="auth-logo-text">
            NeuralSync <span>Academy</span>
          </span>
        </div>

        {ativado && (
          <div className="auth-success-banner">
            <div className="auth-success-icon">✅</div>
            <div>
              <div className="auth-success-title">Pagamento confirmado!</div>
              <div className="auth-success-sub">Crie sua conta abaixo para ativar o acesso imediatamente.</div>
            </div>
          </div>
        )}

        <h1 className="auth-heading">
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h1>
        <p className="auth-subheading">
          {isLogin ? 'Entre para acompanhar a evolução do seu filho.' : subtituloSignup}
        </p>

        {error && (
          <div className="auth-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label className="auth-label">Seu nome</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Como podemos te chamar?"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </div>
          )}
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <div className="auth-label-row">
              <label className="auth-label">Senha</label>
              {isLogin && (
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => navigate('/recuperar-senha')}
                >
                  Esqueci minha senha
                </button>
              )}
            </div>
            <input
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#f5f3ff', borderRadius: '10px', border: '1px solid #e0d9ff', marginTop: '4px' }}>
              <input
                id="consentimento"
                type="checkbox"
                checked={consentido}
                onChange={e => setConsentido(e.target.checked)}
                style={{ marginTop: '3px', accentColor: '#7C3AED', width: '16px', height: '16px', flexShrink: 0, cursor: 'pointer' }}
              />
              <label htmlFor="consentimento" style={{ fontSize: '12px', color: '#374151', lineHeight: '1.5', cursor: 'pointer' }}>
                Sou o responsável legal pelas crianças que vou cadastrar e consinto com o tratamento de seus dados conforme a{' '}
                <Link to="/privacidade" target="_blank" style={{ color: '#7C3AED', fontWeight: '700', textDecoration: 'underline' }}>Política de Privacidade</Link>.
                Li e aceito os{' '}
                <Link to="/termos" target="_blank" style={{ color: '#7C3AED', fontWeight: '700', textDecoration: 'underline' }}>Termos de Uso</Link>.
              </label>
            </div>
          )}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Entrar →' : ativado ? 'Criar conta e ativar plano →' : 'Criar conta →'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError('') }}
            className="auth-link"
          >
            {isLogin ? 'Criar agora' : 'Entrar'}
          </button>
        </p>
      </div>

      {/* LADO DIREITO — painel de marketing */}
      <div className="auth-right">
        <div className="auth-right-orb auth-right-orb--top" />
        <div className="auth-right-orb auth-right-orb--bottom" />

        <div className="auth-right-content">
          <div className="auth-right-icon">🧠</div>
          <h2 className="auth-right-title">
            Transforme o tempo de tela em inteligência
          </h2>
          <p className="auth-right-sub">
            Desenvolvida para crianças de 3 a 15 anos. Gamificação real, aprendizado que fica.
          </p>

          <div className="auth-stats">
            {[['300+','Atividades'],['8','Habilidades'],['4','Faixas etárias'],['100%','Seguro']].map(([num, label]) => (
              <div key={label} className="auth-stat">
                <div className="auth-stat-num">{num}</div>
                <div className="auth-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="auth-testimonial">
            <div className="auth-stars">★★★★★</div>
            <p className="auth-testimonial-text">
              "Minha filha pediu para fazer mais um desafio antes de dormir. Não acreditei!"
            </p>
            <div className="auth-testimonial-author">
              <div className="auth-testimonial-avatar">🌸</div>
              <div>
                <div className="auth-testimonial-name">Marina S.</div>
                <div className="auth-testimonial-role">Mãe da Sofia, 7 anos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
