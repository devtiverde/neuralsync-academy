import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function RecuperarSenha() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

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

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth',
    })
    if (error) {
      setError('Não foi possível enviar o email. Verifique o endereço digitado.')
    } else {
      setEnviado(true)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(145deg, #faf5ff 0%, #ede9fe 30%, #e0f2fe 65%, #d1fae5 100%)',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', cursor: 'pointer', justifyContent: 'center' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧠</div>
          <span style={{ fontWeight: '800', fontSize: '18px' }}>
            <span style={{ color: '#0f0a1e' }}>NeuralSync </span>
            <span style={{ color: '#7C3AED' }}>Academy</span>
          </span>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
          {enviado ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>📧</div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f0a1e', marginBottom: '12px' }}>Email enviado!</h2>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                O link expira em 1 hora.
              </p>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '14px', marginBottom: '24px' }}>
                <p style={{ color: '#166534', fontSize: '14px', margin: 0 }}>
                  Não recebeu? Verifique a pasta de spam ou aguarde alguns minutos.
                </p>
              </div>
              <button onClick={() => navigate('/auth')} className="auth-btn">
                ← Voltar ao login
              </button>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f0a1e', marginBottom: '10px' }}>
                Recuperar senha
              </h1>
              <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px', lineHeight: '1.5' }}>
                Digite seu email para receber as instruções de redefinição de senha.
              </p>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>Email cadastrado</label>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: '8px' }}>
                  {loading ? 'Enviando...' : 'Enviar link de recuperação →'}
                </button>
              </form>

              <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280', fontSize: '14px' }}>
                Lembrou a senha?{' '}
                <button onClick={() => navigate('/auth')} style={{ background: 'none', border: 'none', color: '#7C3AED', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
                  Voltar ao login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
