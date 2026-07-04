import { useState } from 'react'
import { faqPais, faqCriancas } from '../data/faq'
import { SUPPORT } from '../config/support'

export default function FAQButton({ tipo = 'pai' }) {
  const [aberto, setAberto] = useState(false)
  const [aba, setAba] = useState(tipo === 'crianca' ? 'crianca' : 'pai')
  const [busca, setBusca] = useState('')
  const [abertos, setAbertos] = useState({})

  const lista = aba === 'pai' ? faqPais : faqCriancas
  const filtrada = busca.trim()
    ? lista.filter(f => f.pergunta.toLowerCase().includes(busca.toLowerCase()) || f.resposta.toLowerCase().includes(busca.toLowerCase()))
    : lista

  function toggleItem(i) {
    setAbertos(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(true)}
        title="Ajuda / FAQ"
        className="faq-float-btn"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998,
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #6d28d9)',
          border: 'none', color: 'white', fontSize: '20px', fontWeight: '900',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,58,237,0.7)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.5)' }}
      >?</button>

      {/* Overlay */}
      {aberto && (
        <div
          onClick={() => setAberto(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Modal / Drawer */}
      {aberto && (
        <div style={{
          position: 'fixed', zIndex: 10000,
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '90%', maxWidth: '560px', maxHeight: '85vh',
          background: '#13103a', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          animation: 'ns-slide-up 0.25s ease',
        }}>
          {/* Header */}
          <div style={{ padding: '20px 24px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ color: 'white', fontWeight: '900', fontSize: '18px' }}>Central de Ajuda</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Perguntas frequentes</div>
              </div>
              <button onClick={() => setAberto(false)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', color: 'rgba(255,255,255,0.6)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            {/* Abas */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              {[['pai','👨‍💼 Para Pais'],['crianca','👧 Para Crianças']].map(([k,l]) => (
                <button key={k} onClick={() => { setAba(k); setAbertos({}) }} style={{
                  flex: 1, padding: '8px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '700', fontSize: '12px',
                  background: aba === k ? '#7C3AED' : 'rgba(255,255,255,0.06)',
                  color: aba === k ? 'white' : 'rgba(255,255,255,0.45)',
                  boxShadow: aba === k ? '0 4px 12px rgba(124,58,237,0.4)' : 'none',
                  transition: 'all 0.15s',
                }}>{l}</button>
              ))}
            </div>

            {/* Busca */}
            <input
              type="text"
              placeholder="Buscar pergunta..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'white', fontSize: '13px', outline: 'none', marginBottom: '16px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Lista */}
          <div style={{ overflowY: 'auto', padding: '0 24px', flex: 1 }}>
            {filtrada.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Nenhuma pergunta encontrada.</div>
            ) : filtrada.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '2px' }}>
                <button
                  onClick={() => toggleItem(i)}
                  style={{
                    width: '100%', padding: '14px 0', background: 'none', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'white', flex: 1, lineHeight: 1.4 }}>{item.pergunta}</span>
                  <span style={{ color: '#a78bfa', fontSize: '16px', flexShrink: 0, transition: 'transform 0.2s', transform: abertos[i] ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                </button>
                {abertos[i] && (
                  <div style={{ paddingBottom: '14px', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, animation: 'ns-slide-up 0.15s ease' }}>
                    {item.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rodapé */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, display: 'flex', gap: '10px' }}>
            <a
              href={SUPPORT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, padding: '12px', borderRadius: '12px', textDecoration: 'none',
                background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)',
                color: '#4ade80', fontWeight: '700', fontSize: '13px', textAlign: 'center',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >💬 WhatsApp</a>
            <a
              href={`mailto:${SUPPORT.email}`}
              style={{
                flex: 1, padding: '12px', borderRadius: '12px', textDecoration: 'none',
                background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                color: '#a5b4fc', fontWeight: '700', fontSize: '13px', textAlign: 'center',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >✉️ E-mail</a>
          </div>
        </div>
      )}
    </>
  )
}
