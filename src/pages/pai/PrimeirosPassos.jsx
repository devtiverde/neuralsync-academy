import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { lerProgresso, montarPassos } from '../../lib/primeirosPassos'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

// Primeiros passos (rota /primeiros-passos).
//
// Até 31/07/2026 não existia NADA de acolhimento: quem terminava de pagar caía direto no
// painel e tinha que adivinhar a ordem das coisas. A ordem não é óbvia — o relatório só
// tem conteúdo depois da primeira atividade, e a agenda não faz sentido antes do timer.
//
// Decisão que sustenta a tela: cada passo se marca sozinho lendo o dado REAL. Uma lista de
// caixinhas manuais viraria enfeite — a pessoa marca tudo e o produto continua sem timer
// configurado. Aqui, se está verde é porque aconteceu de verdade no banco.

export default function PrimeirosPassos() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [progresso, setProgresso] = useState(null)

  useEffect(() => {
    let vivo = true
    lerProgresso(user?.id).then(p => { if (vivo) setProgresso(p) })
    return () => { vivo = false }
  }, [user])

  if (!progresso) {
    return (
      <LayoutPai>
        <div className="pai-content" style={{ padding: '48px 24px', color: '#6b7280' }}>
          Carregando…
        </div>
      </LayoutPai>
    )
  }

  const passos = montarPassos(progresso, navigate)
  const feitos = passos.filter(p => p.feito).length
  const pct = Math.round((feitos / passos.length) * 100)
  const completo = feitos === passos.length

  return (
    <LayoutPai>
      <div className="pai-content" style={{ padding: '28px 24px 64px' }}>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C3AED', marginBottom: '6px' }}>
            Primeiros passos
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f0a1e', margin: '0 0 8px', textWrap: 'balance' }}>
            {completo ? 'Tudo pronto. Bom proveito!' : 'Seis passos e está tudo configurado'}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px', margin: 0, maxWidth: '62ch', lineHeight: 1.55 }}>
            {completo
              ? 'Você configurou tudo o que importa. Esta tela continua aqui caso precise revisar alguma coisa depois.'
              : 'Nesta ordem, porque um passo depende do anterior. Cada item se marca sozinho quando você faz — não precisa clicar em nada aqui.'}
          </p>
        </div>

        {/* progresso */}
        <div style={{
          background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '14px',
          padding: '16px 20px', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 200px', minWidth: 0, height: '10px', borderRadius: '99px', background: '#ede9fe', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: pct + '%', borderRadius: '99px',
              background: 'linear-gradient(90deg, #7C3AED, #a78bfa)',
              transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f0a1e', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
            {feitos} de {passos.length}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {passos.map((p, i) => (
            <article key={p.id} style={{
              background: 'white',
              border: '1.5px solid ' + (p.feito ? '#bbf7d0' : '#e5e7eb'),
              borderRadius: '14px', padding: '18px 20px',
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              opacity: p.travado && !p.feito ? 0.55 : 1,
            }}>
              <div style={{
                flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: p.feito ? '#22c55e' : '#f3f0ff',
                color: p.feito ? 'white' : '#7C3AED',
                fontSize: p.feito ? '17px' : '14px', fontWeight: 800,
              }}>
                {p.feito ? '✓' : i + 1}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{
                  fontSize: '16.5px', fontWeight: 800, color: '#0f0a1e', margin: '0 0 6px',
                  textDecoration: p.feito ? 'line-through' : 'none',
                  textDecorationColor: '#86efac',
                }}>
                  {p.titulo}
                </h2>
                <p style={{ margin: '0 0 14px', color: '#6b7280', fontSize: '14.5px', lineHeight: 1.55 }}>
                  {p.texto}
                </p>

                <button
                  onClick={p.ir}
                  disabled={p.travado && !p.feito}
                  style={{
                    minHeight: '42px', padding: '0 18px', borderRadius: '10px',
                    border: '1.5px solid ' + (p.feito ? '#e5e7eb' : '#7C3AED'),
                    background: p.feito ? 'white' : '#7C3AED',
                    color: p.feito ? '#6b7280' : 'white',
                    fontSize: '14px', fontWeight: 700,
                    cursor: (p.travado && !p.feito) ? 'not-allowed' : 'pointer',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  {p.travado && !p.feito ? 'Faça o passo anterior antes' : p.rotulo}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{
          marginTop: '28px', background: '#f3f0ff', border: '1.5px solid #ddd6fe',
          borderRadius: '14px', padding: '18px 20px',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f0a1e', margin: '0 0 6px' }}>
            Travou em alguma coisa?
          </h3>
          <p style={{ margin: 0, color: '#5b5273', fontSize: '14.5px', lineHeight: 1.55 }}>
            O balão 💬 no canto da tela fala direto com a gente, de qualquer página — e já vem
            com a informação de onde você estava, então não precisa explicar o caminho.
          </p>
        </div>
      </div>
    </LayoutPai>
  )
}
