import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

const ATIVIDADE = {
  id: 'zona-emocoes',
  tipo: 'zona-emocoes',
  emoji: '💗',
  titulo: 'Zona das Emoções',
  habilidade: 'Inteligência Emocional',
  historinha: 'Cada emoção tem uma cor! Descubra como cada personagem se sente em cada cena e escolha o que ajuda a se sentir melhor.',
  tempo_estimado: 5,
  xp_reward: 75,
  coins_reward: 13,
}

const EMOCOES = [
  { id: 'feliz',      emoji: '😊', label: 'Feliz',      cor: '#FBBF24' },
  { id: 'triste',     emoji: '😢', label: 'Triste',     cor: '#3B82F6' },
  { id: 'bravo',      emoji: '😠', label: 'Bravo',      cor: '#EF4444' },
  { id: 'assustado',  emoji: '😨', label: 'Assustado',  cor: '#8B5CF6' },
  { id: 'calmo',      emoji: '😌', label: 'Calmo',      cor: '#10B981' },
]

const ESTRATEGIAS = [
  { id: 'respirar',   emoji: '🌬️', label: 'Respirar fundo',       afirmacao: 'Respirar fundo ajuda seu corpo a ficar mais calmo. Muito bem!' },
  { id: 'contar',     emoji: '🔢', label: 'Contar até 10',         afirmacao: 'Contar devagar dá um tempinho pro seu cérebro pensar antes de agir. Ótima escolha!' },
  { id: 'abracar',    emoji: '🤗', label: 'Pedir um abraço',       afirmacao: 'Um abraço de quem a gente ama sempre ajuda o coração. Que legal!' },
  { id: 'conversar',  emoji: '💬', label: 'Conversar sobre isso',  afirmacao: 'Falar sobre o que sentimos ajuda a entender melhor as emoções. Excelente!' },
  { id: 'desenhar',   emoji: '🎨', label: 'Desenhar o que sinto',  afirmacao: 'Desenhar é uma forma linda de colocar os sentimentos pra fora. Adorei!' },
]

const CENAS = [
  { texto: 'Você ganhou de presente o brinquedo que mais queria!',                                  ilustracao: '🎁', correta: 'feliz' },
  { texto: 'Seu brinquedo favorito quebrou sem querer.',                                             ilustracao: '🧸', correta: 'triste' },
  { texto: 'Seu irmão pegou seu brinquedo sem pedir licença.',                                        ilustracao: '🚫', correta: 'bravo' },
  { texto: 'Você ouviu um trovão bem forte lá fora.',                                                 ilustracao: '⛈️', correta: 'assustado' },
  { texto: 'Você está deitado no sofá ouvindo uma música tranquila.',                                  ilustracao: '🎶', correta: 'calmo' },
  { texto: 'Você conseguiu terminar sozinho uma atividade difícil!',                                   ilustracao: '🏆', correta: 'feliz' },
  { texto: 'Seu amigo disse que não quer mais brincar com você hoje.',                                 ilustracao: '🙁', correta: 'triste' },
  { texto: 'Alguém bagunçou seu quarto de propósito, depois que você tinha acabado de arrumar tudo.', ilustracao: '🧹', correta: 'bravo' },
]

export default function ZonaEmocoesAtividade() {
  const navigate  = useNavigate()
  const inicioRef = useRef(null)

  const [iniciou,   setIniciou]   = useState(false)
  const [cenaIdx,   setCenaIdx]   = useState(0)
  const [fase,      setFase]      = useState('emocao') // 'emocao' | 'estrategia' | 'fim'
  const [tentativas, setTentativas] = useState(0)
  const [erroId,    setErroId]    = useState(null)
  const [acertosPrimeiraTentativa, setAcertosPrimeiraTentativa] = useState(0)
  const [estrategiaEscolhida, setEstrategiaEscolhida] = useState(null)
  const [concluido, setConcluido] = useState(false)

  const handleComecar = useCallback(() => {
    setIniciou(true)
    inicioRef.current = Date.now()
  }, [])

  const cena = CENAS[cenaIdx]

  const escolherEmocao = useCallback((emocaoId) => {
    if (emocaoId === cena.correta) {
      if (tentativas === 0) setAcertosPrimeiraTentativa(prev => prev + 1)
      setFase('estrategia')
    } else {
      setErroId(emocaoId)
      setTentativas(prev => prev + 1)
      setTimeout(() => setErroId(null), 450)
    }
  }, [cena, tentativas])

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
  }, [cenaIdx])

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
            Reconhecer o que sentimos é o primeiro passo para cuidar bem das nossas emoções.
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

      {fase === 'emocao' ? (
        <>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 14, fontWeight: 700 }}>
            Como você acha que essa pessoa se sente?
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
      ) : (
        <>
          {!estrategiaEscolhida ? (
            <>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 14, fontWeight: 700 }}>
                O que ajuda a se sentir melhor nessa hora?
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 560 }}>
                {ESTRATEGIAS.map(estr => (
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
                {ESTRATEGIAS.find(e => e.id === estrategiaEscolhida)?.emoji}
              </div>
              <p style={{ color: 'white', fontSize: 15.5, lineHeight: 1.5, marginBottom: 20 }}>
                {ESTRATEGIAS.find(e => e.id === estrategiaEscolhida)?.afirmacao}
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
