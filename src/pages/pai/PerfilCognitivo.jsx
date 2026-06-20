import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import PerfilCognitivoView from '../../components/PerfilCognitivoView'
import '../../styles/pai.css'

export default function PerfilCognitivo() {
  const { childId } = useParams()
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [confirmarRefazer, setConfirmarRefazer] = useState(false)

  useEffect(() => {
    if (!childId) { navigate('/dashboard'); return }
    supabase.from('children').select('nome, perfil_cognitivo').eq('id', childId).single()
      .then(({ data }) => { setChild(data || null); setCarregando(false) })
  }, [childId])

  if (carregando) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ color: '#9ca3af', fontSize: '14px' }}>Carregando...</div>
    </div>
  )

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}>← Voltar</button>
        <span style={{ fontWeight: '800', fontSize: '16px', color: '#0f0a1e' }}>Perfil Cognitivo</span>
      </header>
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '28px 24px' }}>
        {child?.perfil_cognitivo ? (
          <>
            <PerfilCognitivoView perfil={child.perfil_cognitivo} nome={child.nome} />
            <button onClick={() => setConfirmarRefazer(true)} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #c4b5fd', background: '#faf5ff', color: '#7C3AED', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔄 Refazer questionário
            </button>

            {confirmarRefazer && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 200 }}>
                <div style={{ background: 'white', borderRadius: '24px', padding: '28px', maxWidth: '360px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                  <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '12px' }}>🔄</div>
                  <h3 style={{ fontWeight: '900', fontSize: '18px', color: '#0f0a1e', marginBottom: '8px', textAlign: 'center' }}>Refazer o questionário?</h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', textAlign: 'center' }}>
                    O perfil atual de <strong>{child.nome}</strong> será substituído pelas novas respostas. Esta ação não pode ser desfeita.
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
  )
}
