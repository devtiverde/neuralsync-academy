import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getEbook, MATERIAS } from '../../data/ebooks'
import '../../styles/pai.css'

export default function EbookLeitura() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  // `?id=` escolhe o ebook. Sem id, cai no "A Tela Certa" para não quebrar
  // links antigos (o botão do ebook original apontava para /ebook/leitura seco).
  const ebook = getEbook(params.get('id') || 'tela-certa') || getEbook('tela-certa')
  const [capAtual, setCapAtual] = useState(0)

  const capitulos = ebook.capitulos
  const cap = capitulos[capAtual]
  const materia = MATERIAS[ebook.materia] || MATERIAS.pais
  const cor = materia.cor

  const imprimirPDF = () => window.print()

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-content { max-width: 100% !important; padding: 20px !important; }
          body { font-family: Georgia, serif; }
        }
      `}</style>

      <header className="pai-header no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => navigate('/ebook')} className="btn-secondary">← Biblioteca</button>
          <h2 style={{ fontWeight: '800', fontSize: '16px', color: '#0f0a1e' }}>{ebook.emoji} {ebook.titulo}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: '600' }}>{capAtual + 1}/{capitulos.length}</span>
          <button className="btn-secondary" onClick={imprimirPDF} style={{ fontSize: '12px', padding: '6px 12px' }}>⬇ PDF</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Índice de capítulos */}
        <div className="no-print" style={{ width: '240px', background: 'white', borderRight: '1px solid #f3f4f6', padding: '16px', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', padding: '0 10px' }}>
            {materia.emoji} {materia.label}
          </div>
          {capitulos.map((c, i) => (
            <button key={i} onClick={() => setCapAtual(i)} style={{
              background: capAtual === i ? cor + '14' : 'none',
              border: 'none', borderRadius: '8px', padding: '10px',
              color: capAtual === i ? cor : '#6b7280',
              cursor: 'pointer', textAlign: 'left', fontSize: '12px',
              width: '100%', marginBottom: '4px', lineHeight: '1.4',
              fontWeight: capAtual === i ? '700' : '500',
              borderLeft: capAtual === i ? `3px solid ${cor}` : '3px solid transparent',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>{c.titulo}</button>
          ))}
        </div>

        {/* Conteúdo do capítulo */}
        <div className="print-content" style={{ flex: 1, padding: '40px', maxWidth: '680px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '24px', color: cor, letterSpacing: '-0.3px' }}>{cap.titulo}</h2>
          {cap.conteudo.split('\n\n').map((p, i) => (
            <p key={i} style={{ color: '#374151', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>{p}</p>
          ))}

          {/* Dica de conversa — só nos ebooks para ler com a criança */}
          {cap.conversa && (
            <div style={{ background: cor + '10', border: `1px solid ${cor}33`, borderRadius: '14px', padding: '16px 18px', marginTop: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: cor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                💬 Converse com seu filho
              </div>
              <p style={{ color: '#374151', lineHeight: '1.7', margin: 0, fontSize: '14px' }}>{cap.conversa}</p>
            </div>
          )}

          {/* `flexWrap` porque "← Anterior" + "Próximo →" lado a lado passavam
              10px da borda em 390px, e o "Próximo" ficava sem como alcançar. */}
          <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '40px' }}>
            {capAtual > 0 && <button className="btn-secondary" onClick={() => setCapAtual(c => c - 1)}>← Anterior</button>}
            {capAtual < capitulos.length - 1 && <button className="btn-primary" style={{ marginLeft: 'auto', background: cor }} onClick={() => setCapAtual(c => c + 1)}>Próximo →</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
