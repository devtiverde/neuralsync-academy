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
            <button onClick={() => navigate(`/questionario/${childId}`)} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px solid #c4b5fd', background: '#faf5ff', color: '#7C3AED', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔄 Refazer questionário
            </button>
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
