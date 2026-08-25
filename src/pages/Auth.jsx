import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/auth.css'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // `ativado=1` é o retorno antigo do pagamento. Hoje quem paga recebe a conta
  // criada pelo webhook da Kiwify e um link de acesso por e-mail (leva ao
  // /nova-senha) — não há mais auto-cadastro nesta tela. O parâmetro sobrevive só
  // em links antigos, então mostramos um aviso apontando para o e-mail.
  const veioDoPagamento = searchParams.get('ativado') === '1'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    if (error) setError('Email ou senha inválidos. Verifique seus dados.')
    else navigate('/dashboard')
    setLoading(false)
  }

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

        {veioDoPagamento && (
          <div className="auth-success-banner">
            <div className="auth-success-icon">📧</div>
            <div>
              <div className="auth-success-title">Pagamento confirmado!</div>
              <div className="auth-success-sub">Enviamos um link de acesso para o seu e-mail. Clique nele para definir sua senha e entrar. Já definiu? É só entrar abaixo.</div>
            </div>
          </div>
        )}

        <h1 className="auth-heading">Bem-vindo de volta!</h1>
        <p className="auth-subheading">Entre para acompanhar a evolução do seu filho.</p>

        {error && (
          <div className="auth-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
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
              <button
                type="button"
                className="auth-link"
                onClick={() => navigate('/recuperar-senha')}
              >
                Esqueci minha senha
              </button>
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
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar →'}
          </button>
        </form>

        {/* A conta é criada ao assinar (o acesso chega por e-mail). Não há
            auto-cadastro aqui: sem assinatura não há conta a criar. */}
        <p className="auth-switch">
          Ainda não assinou?{' '}
          <button onClick={() => navigate('/planos')} className="auth-link">
            Ver planos →
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
            Desenvolvida para crianças de 4 a 15 anos. Gamificação real, aprendizado que fica.
          </p>

          <div className="auth-stats">
            {[['300+','Atividades'],['8','Habilidades'],['4','Faixas etárias'],['100%','Seguro']].map(([num, label]) => (
              <div key={label} className="auth-stat">
                <div className="auth-stat-num">{num}</div>
                <div className="auth-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Havia aqui um depoimento com nome, avatar e cinco estrelas — inventado.
              Trocado por um fato verificável, que sustenta a mesma promessa sem
              atribuir uma frase a uma pessoa que não existe. */}
          <div className="auth-testimonial">
            <p className="auth-testimonial-text">
              Cada atividade alimenta um relatório com seis habilidades cognitivas —
              memória, atenção, lógica, linguagem, raciocínio espacial e coordenação.
              Você acompanha a evolução sem precisar ficar do lado.
            </p>
            <div className="auth-testimonial-author">
              <div className="auth-testimonial-avatar">📊</div>
              <div>
                <div className="auth-testimonial-name">Relatório para os pais</div>
                <div className="auth-testimonial-role">Incluído nos planos Família e Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
