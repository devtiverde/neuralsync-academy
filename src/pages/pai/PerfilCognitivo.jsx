import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import PerfilCognitivoView from '../../components/PerfilCognitivoView'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

const avatarPadrao = ['🦊', '👧', '👦', '🐱', '🐶', '🦁', '🐸', '🐧', '🦄', '🦉']

const FAIXA_LABEL = {
  exploradores: '4–5 anos',
  construtores: '6–8 anos',
  criadores: '9–11 anos',
  inventores: '12+ anos',
}

export default function PerfilCognitivo() {
  const { childId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [child, setChild] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [confirmarRefazer, setConfirmarRefazer] = useState(false)

  useEffect(() => {
    if (!childId || !user) { navigate('/dashboard'); return }
    supabase
      .from('children')
      .select('id, nome, idade, faixa_etaria, nivel, xp, neural_coins, streak_atual, perfil_cognitivo')
      .eq('id', childId)
      .eq('parent_id', user.id)
      .single()
      .then(({ data }) => { setChild(data || null); setCarregando(false) })
  }, [childId, user])

  if (carregando) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-secondary)' }}>
      <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Carregando...</div>
    </div>
  )

  const emoji = child ? avatarPadrao[child.nome.charCodeAt(0) % avatarPadrao.length] : '🧠'

  return (
    <LayoutPai>
      <div className="pai-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}>← Voltar</button>
          <h2 style={{ fontWeight: '900', fontSize: '20px', color: '#0f0a1e' }}>Perfil Cognitivo</h2>
        </div>

        <div style={{ maxWidth: '560px' }}>

          {/* Header visual cognitivo — cérebro espacial */}
          {child && (
            <div style={{
              background: 'linear-gradient(135deg, #0f0a1e, #1a0a3e)',
              borderRadius: 20,
              padding: '24px',
              marginBottom: 16,
            }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700,
                          letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 4px' }}>
                Relatório Cognitivo
              </p>
              <h2 style={{ color: 'white', fontFamily: "'Fredoka One', cursive", fontSize: 24, margin: '0 0 4px' }}>
                {child.nome}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0 }}>
                Análise baseada em neurociência
              </p>
            </div>
          )}

          {/* Header da criança */}
          {child && (
            <div style={{
              background: 'linear-gradient(135deg, #7C3AED, #a78bfa)',
              borderRadius: '20px', padding: '24px', marginBottom: '20px', color: 'white',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '18px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  {emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    Relatório Cognitivo
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: '900', lineHeight: 1.1, marginBottom: '4px' }}>
                    {child.nome}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                    {child.idade ? `${child.idade} anos · ` : ''}{FAIXA_LABEL[child.faixa_etaria] || child.faixa_etaria} · Nível {child.nivel}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {[['⭐', child.xp, 'XP'], ['🔥', child.streak_atual, 'Streak']].map(([ic, v, l]) => (
                    <div key={l} style={{ marginBottom: '6px' }}>
                      <div style={{ fontWeight: '900', fontSize: '15px' }}>{ic} {v}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {child?.perfil_cognitivo ? (
            <>
              <PerfilCognitivoView perfil={child.perfil_cognitivo} nome={child.nome} />

              <button onClick={() => setConfirmarRefazer(true)} className="btn-secondary" style={{ width: '100%', marginTop: '8px' }}>
                🔄 Refazer questionário
              </button>

              {confirmarRefazer && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 200 }}>
                  <div style={{ background: 'white', borderRadius: '24px', padding: '28px', maxWidth: '360px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                    <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '12px' }}>🔄</div>
                    <h3 style={{ fontWeight: '900', fontSize: '18px', color: '#0f0a1e', marginBottom: '8px', textAlign: 'center' }}>Refazer o questionário?</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', textAlign: 'center' }}>
                      O perfil atual de <strong>{child.nome}</strong> será substituído. Esta ação não pode ser desfeita.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => setConfirmarRefazer(false)} style={{ flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cancelar</button>
                      <button onClick={() => navigate(`/questionario/${childId}`)} style={{ flex: 1, background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '12px', padding: '13px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sim, refazer</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧠</div>
              <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>Este filho ainda não tem perfil cognitivo.</p>
              <button onClick={() => navigate(`/questionario/${childId}`)} className="btn-primary">Criar perfil agora →</button>
            </div>
          )}
        </div>
      </div>
    </LayoutPai>
  )
}
