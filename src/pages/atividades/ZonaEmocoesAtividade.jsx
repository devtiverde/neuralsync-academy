import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import {
  EMOCOES_BASE, FUNCAO_EMOCAO, EMOCOES_POR_FAIXA,
  ESTRATEGIAS_NEGATIVAS_BASE, ESTRATEGIAS_POSITIVAS_BASE, ESTRATEGIAS_MISTAS_BASE,
  ESTRATEGIAS_NEGATIVAS_POR_FAIXA, ESTRATEGIAS_POSITIVAS_POR_FAIXA,
  CENAS_POR_FAIXA,
} from '../../data/zonaEmocoesData'

const ATIVIDADE = {
  id: 'zona-emocoes',
  tipo: 'zona-emocoes',
  emoji: '💗',
  titulo: 'Zona das Emoções',
  habilidade: 'Inteligência Emocional',
  historinha: 'Cada emoção existe por um motivo! Descubra como cada cena te faz sentir, entenda pra que serve essa emoção e escolha o que ajuda a lidar bem com ela.',
  tempo_estimado: 6,
  xp_reward: 75,
  coins_reward: 13,
}

function getFaixaAtiva() {
  try {
    const c = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
    const faixa = c?.faixa_etaria
    if (faixa && EMOCOES_POR_FAIXA[faixa]) return faixa
  } catch { /* ignora */ }
  return 'construtores'
}

export default function ZonaEmocoesAtividade() {
  const navigate  = useNavigate()
  const inicioRef = useRef(null)

  const faixa = useMemo(getFaixaAtiva, [])
  const CENAS = CENAS_POR_FAIXA[faixa]
  const EMOCOES = useMemo(
    () => EMOCOES_POR_FAIXA[faixa].map(id => ({ id, ...EMOCOES_BASE[id] })),
    [faixa],
  )

  const [iniciou,   setIniciou]   = useState(false)
  const [cenaIdx,   setCenaIdx]   = useState(0)
  const [fase,      setFase]      = useState('emocao') // 'emocao' | 'explicacao' | 'estrategia'
  const [tentativas, setTentativas] = useState(0)
  const [erroId,    setErroId]    = useState(null)
  const [acertosPrimeiraTentativa, setAcertosPrimeiraTentativa] = useState(0)
  const [estrategiaEscolhida, setEstrategiaEscolhida] = useState(null)
  const [concluido, setConcluido] = useState(false)

  // Evita que um toque impreciso perto do topo da tela dispare o gesto nativo de
  // "puxar para atualizar" do navegador mobile — escopado só a esta atividade
  // (uma tentativa anterior fez isso globalmente e quebrou o scroll de outras páginas).
  useEffect(() => {
    const anterior = document.body.style.overscrollBehaviorY
    document.body.style.overscrollBehaviorY = 'contain'
    return () => { document.body.style.overscrollBehaviorY = anterior }
  }, [])

  const handleComecar = useCallback(() => {
    setIniciou(true)
    inicioRef.current = Date.now()
  }, [])

  const cena = CENAS[cenaIdx]

  const escolherEmocao = useCallback((emocaoId) => {
    if (emocaoId === cena.correta) {
      if (tentativas === 0) setAcertosPrimeiraTentativa(prev => prev + 1)
      setFase('explicacao')
    } else {
      setErroId(emocaoId)
      setTentativas(prev => prev + 1)
      setTimeout(() => setErroId(null), 450)
    }
  }, [cena, tentativas])

  const irParaEstrategia = useCallback(() => setFase('estrategia'), [])

  const escolherEstrategia = useCallback((estrategiaId) => {
    setEstrategiaEscolhida(estrategiaId)
  }, [])

  const proximaCena = useCallback(() => {
    const proximo = cenaIdx + 1
    if (proximo < CENAS.length) {
      setCenaIdx(proximo)
      setFase('emocao')
      setTentativas(0)
      setEstrategiaEscolhida(null)
    } else {
      setConcluido(true)
    }
  }, [cenaIdx, CENAS.length])

  const verResultado = useCallback(() => {
    const xp    = ATIVIDADE.xp_reward + acertosPrimeiraTentativa
    const coins = Math.round(xp / 6)
    navigate('/encerramento', {
      state: {
        xp,
        coins,
        titulo: ATIVIDADE.titulo,
        emoji: ATIVIDADE.emoji,
        tipo: ATIVIDADE.tipo,
        atividade_id: ATIVIDADE.id,
      },
    })
  }, [acertosPrimeiraTentativa, navigate])

  if (!iniciou) {
    return (
      <IntroAtividade
        atividade={ATIVIDADE}
        onComecar={handleComecar}
        onVoltar={() => navigate('/home-crianca')}
      />
    )
  }

  if (concluido) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg,#1a0a12 0%,#3b0f28 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 16px',
        fontFamily: 'Nunito, sans-serif',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 24,
          padding: '40px 36px',
          textAlign: 'center',
          maxWidth: 420,
        }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>💗</div>
          <h3 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 26, margin: '0 0 8px' }}>
            Você conheceu todas as cenas!
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 12 }}>
            Reconhecer o que sentimos — e entender por que sentimos — é o primeiro passo pra cuidar bem das nossas emoções.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 28 }}>
            Você identificou {acertosPrimeiraTentativa} de {CENAS.length} emoções de primeira!
          </p>
          <button
            onClick={verResultado}
            style={{
              background: 'var(--ns-violet, #EC4899)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '14px 32px',
              fontSize: 16,
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Ver resultado →
          </button>
        </div>
      </div>
    )
  }

  const emocaoCorreta = EMOCOES_BASE[cena.correta]
  const valencia = emocaoCorreta.valencia

  let poolEstrategias
  if (cena.estrategiasOverride) {
    poolEstrategias = cena.estrategiasOverride.map(id => ({ id, ...ESTRATEGIAS_MISTAS_BASE[id] }))
  } else if (valencia === 'positiva') {
    poolEstrategias = ESTRATEGIAS_POSITIVAS_POR_FAIXA[faixa].map(id => ({ id, ...ESTRATEGIAS_POSITIVAS_BASE[id] }))
  } else {
    poolEstrategias = ESTRATEGIAS_NEGATIVAS_POR_FAIXA[faixa].map(id => ({ id, ...ESTRATEGIAS_NEGATIVAS_BASE[id] }))
  }

  const perguntaEstrategia = valencia === 'positiva'
    ? 'O que você pode fazer com esse sentimento bom?'
    : valencia === 'mista'
      ? 'Como lidar com dois sentimentos ao mesmo tempo?'
      : 'O que ajuda a se sentir melhor nessa hora?'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg,#1a0a12 0%,#3b0f28 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '28px 16px',
      fontFamily: 'Nunito, sans-serif',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20, maxWidth: 600, width: '100%' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '0 0 4px' }}>
          Cena {cenaIdx + 1} de {CENAS.length}
        </p>
        <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 24, margin: 0 }}>
          Zona das Emoções
        </h2>
      </div>

      {/* Cena */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 20,
        padding: '24px 28px',
        maxWidth: 560,
        width: '100%',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{cena.ilustracao}</div>
        <p style={{ color: 'white', fontSize: 18, lineHeight: 1.5, margin: 0 }}>{cena.texto}</p>
      </div>

      {fase === 'emocao' && (
        <>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 14, fontWeight: 700 }}>
            Como você se sente nessa hora?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 560 }}>
            {EMOCOES.map(emo => {
              const temErro = erroId === emo.id
              const mostrarDica = tentativas >= 2 && emo.id === cena.correta
              return (
                <button
                  key={emo.id}
                  onClick={() => escolherEmocao(emo.id)}
                  style={{
                    width: 96,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    background: temErro ? 'rgba(239,68,68,0.2)' : `${emo.cor}18`,
                    border: `2px solid ${temErro ? '#EF4444' : mostrarDica ? emo.cor : `${emo.cor}55`}`,
                    borderRadius: 16,
                    padding: '14px 8px',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, border-color 0.2s',
                    animation: mostrarDica ? 'ns-emo-pulse 1.2s ease-in-out infinite' : 'none',
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{ fontSize: 36 }}>{emo.emoji}</span>
                  <span style={{ color: emo.cor, fontSize: 13, fontWeight: 700 }}>{emo.label}</span>
                </button>
              )
            })}
          </div>
          {tentativas >= 2 && (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 14 }}>
              💡 Dica: repare no brilho ao redor da resposta certa
            </p>
          )}
          <style>{`
            @keyframes ns-emo-pulse {
              0%, 100% { box-shadow: 0 0 0 rgba(255,255,255,0); }
              50% { box-shadow: 0 0 16px 2px currentColor; }
            }
          `}</style>
        </>
      )}

      {fase === 'explicacao' && (
        <div style={{
          background: `${emocaoCorreta.cor}14`,
          border: `1px solid ${emocaoCorreta.cor}55`,
          borderRadius: 20,
          padding: '24px 28px',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>{emocaoCorreta.emoji}</div>
          <p style={{ color: emocaoCorreta.cor, fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
            {emocaoCorreta.label}
          </p>
          <p style={{ color: 'white', fontSize: 15.5, lineHeight: 1.6, marginBottom: 20 }}>
            {FUNCAO_EMOCAO[cena.correta]?.[faixa]}
          </p>
          <button
            onClick={irParaEstrategia}
            style={{
              background: emocaoCorreta.cor,
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 15,
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Entendi →
          </button>
        </div>
      )}

      {fase === 'estrategia' && (
        <>
          {!estrategiaEscolhida ? (
            <>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 14, fontWeight: 700 }}>
                {perguntaEstrategia}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 560 }}>
                {poolEstrategias.map(estr => (
                  <button
                    key={estr.id}
                    onClick={() => escolherEstrategia(estr.id)}
                    style={{
                      width: 110,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(255,255,255,0.06)',
                      border: '2px solid rgba(255,255,255,0.15)',
                      borderRadius: 16,
                      padding: '14px 8px',
                      cursor: 'pointer',
                      transition: 'transform 0.15s',
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{ fontSize: 32 }}>{estr.emoji}</span>
                    <span style={{ color: 'white', fontSize: 12.5, fontWeight: 700, textAlign: 'center' }}>{estr.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.4)',
              borderRadius: 20,
              padding: '24px 28px',
              maxWidth: 480,
              width: '100%',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>
                {poolEstrategias.find(e => e.id === estrategiaEscolhida)?.emoji}
              </div>
              <p style={{ color: 'white', fontSize: 15.5, lineHeight: 1.5, marginBottom: 20 }}>
                {poolEstrategias.find(e => e.id === estrategiaEscolhida)?.afirmacao?.[faixa]}
              </p>
              <button
                onClick={proximaCena}
                style={{
                  background: 'var(--ns-violet, #EC4899)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 28px',
                  fontSize: 15,
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {cenaIdx + 1 < CENAS.length ? 'Próxima cena →' : 'Concluir →'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
