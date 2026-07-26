import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { FAIXA_LABELS } from '../lib/faixaGuard'

/**
 * Confirma que quem está na frente da tela é o responsável, pedindo a senha da
 * conta já logada.
 *
 * Nasceu para liberar atividade de faixa superior, e por isso o texto padrão
 * fala disso. `titulo`, `descricao`, `icone` e `rotuloConfirmar` permitem
 * reaproveitar o mesmo modal em outros contextos — hoje também é usado para
 * liberar tempo extra na tela de bloqueio e para estender a sessão no timer.
 * Sem esses parâmetros o comportamento é exatamente o de antes.
 */
export default function ParentUnlockModal({
  atividadeFaixa, atividadeTitulo, childNome, onSuccess, onCancel,
  titulo, descricao, icone, rotuloConfirmar,
}) {
  const { user } = useAuth()
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleAutorizar(e) {
    e.preventDefault()
    if (!senha.trim()) return
    setErro('')
    setCarregando(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: senha,
      })
      if (error) {
        setErro('Senha incorreta. Tente novamente.')
      } else {
        onSuccess()
      }
    } catch {
      setErro('Erro ao verificar senha. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  const faixaLabel = FAIXA_LABELS[atividadeFaixa] || atividadeFaixa

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #1a1040 0%, #0f0a28 100%)',
        border: '1px solid rgba(124,58,237,0.35)',
        borderRadius: '24px', padding: '36px 32px', maxWidth: '420px', width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)',
      }}>
        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)',
            fontSize: '32px', marginBottom: '16px',
          }}>{icone || '🔐'}</div>
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: '0 0 8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {titulo || 'Autorização necessária'}
          </h2>
          {descricao ? (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{descricao}</p>
          ) : (
            <>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: 'rgba(255,255,255,0.75)' }}>{atividadeTitulo}</strong> é uma atividade para{' '}
                <strong style={{ color: '#a78bfa' }}>{faixaLabel}</strong>.
              </p>
              {childNome && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '6px' }}>
                  {childNome} ainda não chegou nessa fase — peça para um adulto liberar o acesso.
                </p>
              )}
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleAutorizar}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Senha do responsável
          </label>
          <input
            type="password"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErro('') }}
            placeholder="Digite a senha da conta"
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.07)', border: `1.5px solid ${erro ? 'rgba(239,68,68,0.5)' : 'rgba(124,58,237,0.3)'}`,
              borderRadius: '12px', padding: '13px 16px',
              color: 'white', fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => { if (!erro) e.target.style.borderColor = 'rgba(124,58,237,0.7)' }}
            onBlur={e => { if (!erro) e.target.style.borderColor = 'rgba(124,58,237,0.3)' }}
          />

          {erro && (
            <div style={{
              marginTop: '10px', padding: '10px 14px', borderRadius: '10px',
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#fca5a5', fontSize: '13px', fontWeight: '600',
            }}>
              ⚠️ {erro}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={carregando}
              style={{
                flex: 1, padding: '13px', borderRadius: '12px', cursor: 'pointer',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: '14px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={carregando || !senha.trim()}
              style={{
                flex: 2, padding: '13px', borderRadius: '12px', cursor: carregando || !senha.trim() ? 'not-allowed' : 'pointer',
                background: carregando || !senha.trim() ? 'rgba(124,58,237,0.3)' : 'linear-gradient(135deg, #7C3AED, #a78bfa99)',
                border: 'none', color: 'white', fontWeight: '900', fontSize: '14px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s',
                boxShadow: carregando || !senha.trim() ? 'none' : '0 6px 20px rgba(124,58,237,0.4)',
              }}
            >
              {carregando ? '⏳ Verificando...' : (rotuloConfirmar || '✅ Autorizar acesso')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
