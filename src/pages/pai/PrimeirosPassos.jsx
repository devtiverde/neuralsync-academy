import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { lerProgresso, montarPassos, passoAtual, minutosRestantes } from '../../lib/primeirosPassos'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

// Guia de configuração inicial (rota /primeiros-passos).
//
// Até 31/07/2026 não existia NADA de acolhimento: quem terminava de pagar caía direto no
// painel e tinha que adivinhar a ordem das coisas. A ordem não é óbvia — o relatório só
// tem conteúdo depois da primeira atividade, e a agenda não faz sentido antes do timer.
//
// Decisão que sustenta a tela desde o início: cada passo se marca sozinho lendo o dado
// REAL. Uma lista de caixinhas manuais viraria enfeite — a pessoa marca tudo e o produto
// continua sem timer configurado. Aqui, se está verde é porque aconteceu no banco.
//
// ── 24/09/2026: DE LISTA PARA GUIA ──────────────────────────────────────────────
// Relato do Cláudio, depois de um amigo testar: *"os seis passos iniciais não estão
// intuitivos"*, *"tem que ter um GUIA de configuração inicial com passo a passo"*.
//
// O que estava errado não era a informação, era a FORMA. Seis cartões do mesmo tamanho,
// com o mesmo peso visual e seis botões roxos iguais, obrigam quem chegou agora a ler os
// seis e decidir por onde começar — justamente a decisão que o guia deveria tomar por
// ela. E cada cartão dizia O QUE fazer sem dizer o que ela ia ENCONTRAR ao chegar lá.
//
// Agora: um passo em foco por vez, com o que vai aparecer na tela de destino; os feitos
// viram uma linha fina; os que faltam ficam listados, mas quietos. A soma do tempo vai
// no topo, porque "9 minutos" e "seis passos" pedem coragens muito diferentes.
//
// 🪤 O rodapé mandava usar "o balão 💬 no canto". Esse balão deixou de existir hoje de
// manhã, quando os dois círculos fixos viraram um "?". Instrução que aponta para um
// botão que não existe mais é pior que instrução nenhuma — a pessoa procura, não acha,
// e conclui que o problema é ela.

const VIOLETA = '#7C3AED'

function Passo({ p, i, foco, onIr }) {
  const travado = p.travado && !p.feito

  // ── EM FOCO: o único cartão grande da tela ────────────────────────────────
  if (foco) {
    return (
      <article style={{
        background: 'white', border: `2px solid ${VIOLETA}`, borderRadius: '18px',
        padding: '26px 24px', boxShadow: '0 8px 28px rgba(124,58,237,0.13)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            background: VIOLETA, color: 'white', fontSize: '12px', fontWeight: 800,
            padding: '4px 11px', borderRadius: '999px', letterSpacing: '0.04em',
          }}>
            PASSO {i + 1}
          </span>
          <span style={{ fontSize: '13px', color: '#8b8496', fontWeight: 600 }}>
            leva cerca de {p.minutos} minuto{p.minutos > 1 ? 's' : ''}
          </span>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f0a1e', margin: '0 0 8px', letterSpacing: '-0.4px', textWrap: 'balance' }}>
          {p.titulo}
        </h2>
        <p style={{ margin: '0 0 18px', color: '#5b5273', fontSize: '15px', lineHeight: 1.6, maxWidth: '58ch' }}>
          {p.texto}
        </p>

        {/* O que a pessoa vai ENCONTRAR. É isto que separa guiar de apontar. */}
        <div style={{ background: '#faf8ff', border: '1px solid #ece6fd', borderRadius: '12px', padding: '15px 17px', marginBottom: '20px' }}>
          <p style={{ margin: '0 0 9px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', color: VIOLETA }}>
            O que você vai ver
          </p>
          <ol style={{ margin: 0, paddingLeft: '19px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {p.comoFazer.map((linha, n) => (
              <li key={n} style={{ color: '#5b5273', fontSize: '14.5px', lineHeight: 1.5 }}>{linha}</li>
            ))}
          </ol>
        </div>

        <button
          onClick={() => onIr(p)}
          disabled={travado}
          style={{
            minHeight: '50px', width: '100%', padding: '0 20px', borderRadius: '12px',
            border: 'none', background: travado ? '#d8d3e3' : VIOLETA, color: 'white',
            fontSize: '15.5px', fontWeight: 800, cursor: travado ? 'not-allowed' : 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            boxShadow: travado ? 'none' : '0 4px 16px rgba(124,58,237,0.3)',
          }}
        >
          {travado ? 'Faça o passo anterior antes' : `${p.rotulo} →`}
        </button>
        {travado && p.porqueTravado && (
          <p style={{ margin: '10px 0 0', fontSize: '13.5px', color: '#8b8496', lineHeight: 1.5 }}>{p.porqueTravado}</p>
        )}
        <p style={{ margin: '12px 0 0', fontSize: '13px', color: '#8b8496', lineHeight: 1.5 }}>
          Quando terminar, volte aqui — este guia já vai estar no próximo passo.
        </p>
      </article>
    )
  }

  // ── FORA DE FOCO: linha fina, sem competir com o cartão em destaque ───────
  return (
    <button
      onClick={() => !travado && onIr(p)}
      disabled={travado}
      style={{
        display: 'flex', alignItems: 'center', gap: '13px', width: '100%',
        background: 'white', border: '1.5px solid #ece9f2', borderRadius: '12px',
        padding: '13px 16px', textAlign: 'left',
        cursor: travado ? 'default' : 'pointer', opacity: travado ? 0.5 : 1,
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      <span style={{
        flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: p.feito ? '#22c55e' : '#f3f0ff',
        color: p.feito ? 'white' : '#9a92ab',
        fontSize: p.feito ? '14px' : '12.5px', fontWeight: 800,
      }}>
        {p.feito ? '✓' : i + 1}
      </span>
      <span style={{
        flex: 1, minWidth: 0, fontSize: '14.5px', fontWeight: 700,
        color: p.feito ? '#9a92ab' : '#3f3a4d',
        textDecoration: p.feito ? 'line-through' : 'none', textDecorationColor: '#bbf7d0',
      }}>
        {p.titulo}
      </span>
      <span style={{ flexShrink: 0, fontSize: '12.5px', color: '#b5aec4', fontWeight: 600 }}>
        {p.feito ? 'feito' : travado ? 'depois' : `${p.minutos} min`}
      </span>
    </button>
  )
}

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
  const atual = passoAtual(passos)
  const faltamMin = minutosRestantes(passos)
  const iAtual = atual ? passos.indexOf(atual) : -1

  return (
    <LayoutPai>
      <div className="pai-content" style={{ padding: '28px 24px 64px' }}>

        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLETA, marginBottom: '6px' }}>
            Guia de configuração
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f0a1e', margin: '0 0 8px', textWrap: 'balance' }}>
            {completo ? 'Tudo pronto. Bom proveito!' : 'Vamos configurar juntos'}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px', margin: 0, maxWidth: '62ch', lineHeight: 1.55 }}>
            {completo
              ? 'Você configurou tudo o que importa. Este guia continua aqui caso precise revisar alguma coisa depois.'
              : <>Um passo de cada vez, na ordem em que um depende do outro. <strong style={{ color: '#3f3a4d' }}>Falta{faltamMin === 1 ? '' : 'm'} cerca de {faltamMin} minuto{faltamMin > 1 ? 's' : ''} no total.</strong> Cada passo se marca sozinho quando você faz — não precisa clicar em nada aqui.</>}
          </p>
        </div>

        {/* progresso */}
        <div style={{
          background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '14px',
          padding: '15px 19px', marginBottom: '22px',
          display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap',
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

        {/* ── O PASSO DE AGORA, sozinho em destaque ─────────────────────────── */}
        {atual && (
          <div style={{ marginBottom: '26px' }}>
            <Passo p={atual} i={iAtual} foco onIr={pp => pp.ir()} />
          </div>
        )}

        {/* ── Os outros, quietos ────────────────────────────────────────────── */}
        {(() => {
          const outros = passos.map((p, i) => ({ p, i })).filter(({ i }) => i !== iAtual)
          if (!outros.length) return null
          return (
            <>
              <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b5aec4', margin: '0 0 10px' }}>
                {completo ? 'Todos os passos' : 'Os outros passos'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {outros.map(({ p, i }) => (
                  <Passo key={p.id} p={p} i={i} foco={false} onIr={pp => pp.ir()} />
                ))}
              </div>
            </>
          )
        })()}

        <div style={{
          marginTop: '28px', background: '#f3f0ff', border: '1.5px solid #ddd6fe',
          borderRadius: '14px', padding: '18px 20px',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f0a1e', margin: '0 0 6px' }}>
            Travou em alguma coisa?
          </h3>
          <p style={{ margin: 0, color: '#5b5273', fontSize: '14.5px', lineHeight: 1.55 }}>
            O botão <strong>?</strong> no canto da tela abre a ajuda e o "Relatar um problema",
            de qualquer página — e a mensagem já vai com a informação de onde você estava,
            então não precisa explicar o caminho.
          </p>
        </div>
      </div>
    </LayoutPai>
  )
}
