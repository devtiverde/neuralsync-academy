import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

function embaralhar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function criarCartas(pares) {
  const items = pares.map(p => typeof p === 'string' ? { emoji: p, nome: '', info: '' } : p)
  return embaralhar([...items, ...items].map((item, id) => ({
    id, emoji: item.emoji, nome: item.nome || '', info: item.info || '',
    virada: false, encontrada: false,
  })))
}

export default function MemoriaAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [cartas, setCartas] = useState([])
  const [abertaIdx, setAbertaIdx] = useState(null)
  const [bloqueado, setBloqueado] = useState(false)
  const [movimentos, setMovimentos] = useState(0)
  const [paresEncontrados, setParesEncontrados] = useState(0)
  const [tempo, setTempo] = useState(0)
  const [ganhou, setGanhou] = useState(false)

  useEffect(() => {
    if (!atividade) { navigate(-1); return }
    setCartas(criarCartas(atividade.pares))
  }, [])

  useEffect(() => {
    if (!iniciou || ganhou) return
    const t = setInterval(() => setTempo(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [iniciou, ganhou])

  useEffect(() => {
    if (!atividade || paresEncontrados === 0) return
    if (paresEncontrados === atividade.pares.length) {
      playSound('complete')
      setTimeout(() => setGanhou(true), 600)
    }
  }, [paresEncontrados])

  const clicarCarta = useCallback((idx) => {
    if (bloqueado) return
    if (cartas[idx].virada || cartas[idx].encontrada) return
    if (abertaIdx === idx) return

    const novas = cartas.map((c, i) => i === idx ? { ...c, virada: true } : c)
    setCartas(novas)

    if (abertaIdx === null) {
      setAbertaIdx(idx)
      return
    }

    setMovimentos(m => m + 1)
    setBloqueado(true)

    if (cartas[abertaIdx].emoji === cartas[idx].emoji) {
      playSound('correct')
      setTimeout(() => {
        setCartas(prev => prev.map((c, i) =>
          i === idx || i === abertaIdx ? { ...c, virada: false, encontrada: true } : c
        ))
        setParesEncontrados(p => p + 1)
        setAbertaIdx(null)
        setBloqueado(false)
      }, 500)
    } else {
      playSound('wrong')
      setTimeout(() => {
        setCartas(prev => prev.map((c, i) =>
          i === idx || i === abertaIdx ? { ...c, virada: false } : c
        ))
        setAbertaIdx(null)
        setBloqueado(false)
      }, 1000)
    }
  }, [cartas, abertaIdx, bloqueado])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={getKidsLink(atividade.id)} />

  function reiniciar() {
    setCartas(criarCartas(atividade.pares))
    setAbertaIdx(null)
    setBloqueado(false)
    setMovimentos(0)
    setParesEncontrados(0)
    setTempo(0)
    setGanhou(false)
  }

  const totalPares = atividade.pares.length
  const estrelas = movimentos <= totalPares + 2 ? 3 : movimentos <= totalPares * 2 ? 2 : 1
  const xpGanho = Math.round((estrelas / 3) * atividade.xp_reward)
  const coinsGanho = Math.round((estrelas / 3) * atividade.coins_reward)
  const min = String(Math.floor(tempo / 60)).padStart(2, '0')
  const seg = String(tempo % 60).padStart(2, '0')
  const cols = totalPares <= 4 ? 4 : 4
  const progresso = Math.round((paresEncontrados / totalPares) * 100)

  if (ganhou) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '24px', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', letterSpacing: '6px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>{'⭐'.repeat(estrelas)}</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '30px', fontWeight: '900', marginBottom: '6px' }}>
              {estrelas === 3 ? 'Perfeito! 🧠' : estrelas === 2 ? 'Muito bem! 👏' : 'Concluído! 💪'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>Todos os pares encontrados!</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '420px' }}>
            {[
              ['+' + xpGanho + ' XP', 'Experiência', '#3b82f6'],
              ['+' + coinsGanho + ' 💰', 'Coins', '#f59e0b'],
              [movimentos, 'Movimentos', '#10b981'],
              [min + ':' + seg, 'Tempo', '#a855f7'],
            ].map(([val, label, cor]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: cor, marginBottom: '4px' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button onClick={reiniciar} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              🔄 Repetir
            </button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#3b82f6,#60a5fa)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(59,130,246,0.4)' }}>
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${paresEncontrados}/${totalPares} pares`}
      onVoltar={() => navigate(-1)}
      sidebarRight={
        <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: '800', marginBottom: '8px' }}>⏱ TEMPO</div>
          <div style={{ color: 'white', fontSize: '28px', fontWeight: '900', letterSpacing: '1px' }}>{min}:{seg}</div>
        </div>
      }
    >
      {/* Coluna flex com `minHeight: 0` para o tabuleiro poder encolher até
          caber na altura da tela. Sem isso o grid mantinha o tamanho natural
          (as cartas eram quadradas pela LARGURA disponível) e o tabuleiro
          media 700px — em notebook de 768px a última fileira de cartas ficava
          abaixo da dobra, e com a tela travada virava carta inalcançável. */}
      <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexShrink: 0 }}>
          {[
            [movimentos, 'Movimentos', '#3b82f6'],
            [paresEncontrados + '/' + totalPares, 'Pares', '#10b981'],
            ['+' + atividade.xp_reward + ' XP', 'Recompensa', '#a855f7'],
          ].map(([val, lbl, cor]) => (
            <div key={lbl} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: cor }}>{val}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', marginTop: '2px' }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabuleiro: `aspectRatio` + `maxHeight/maxWidth: 100%` fazem o grid
            se ajustar à MENOR das duas dimensões disponíveis, mantendo as
            cartas quadradas. Em tela larga e baixa ele encolhe pela altura; em
            tela estreita, pela largura. É o que garante que as 16 cartas
            apareçam inteiras sem precisar rolar. */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${Math.ceil(cartas.length / cols)}, 1fr)`,
          gap: '12px',
          // `flex: 1` dá ao grid uma altura DEFINIDA (a sobra da coluna).
          // Isso é o que faz as fileiras `1fr` terem tamanho real — com
          // altura indefinida elas colapsam para o conteúdo mínimo e as
          // cartas viram tiras de 36px. Com a altura definida, o
          // `aspectRatio` deriva a largura e `maxWidth` impede que o
          // tabuleiro fique mais largo que a área em telas baixas e largas.
          flex: 1, minHeight: 0,
          aspectRatio: `${cols} / ${Math.ceil(cartas.length / cols)}`,
          maxWidth: '100%', margin: '0 auto',
        }}>
          {cartas.map((carta, idx) => {
            const mostrar = carta.virada || carta.encontrada
            return (
              <div key={carta.id} onClick={() => clicarCarta(idx)} style={{ perspective: '600px', cursor: carta.encontrada ? 'default' : 'pointer' }}>
                <div style={{
                  // `height: 100%` e não `paddingBottom: 100%`: o truque do
                  // padding deriva a altura da LARGURA, o que ignora a altura
                  // disponível. Agora quem define o quadrado é o próprio grid.
                  position: 'relative', width: '100%', height: '100%',
                  transformStyle: 'preserve-3d',
                  transform: mostrar ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.35s ease',
                }}>
                  {/* Face down */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
                    borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
                    border: '1px solid rgba(59,130,246,0.4)',
                  }}>🧩</div>
                  {/* Face up */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: carta.encontrada ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.1)',
                    borderRadius: '14px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid ' + (carta.encontrada ? '#10b981' : 'rgba(255,255,255,0.3)'),
                    boxShadow: carta.encontrada ? '0 4px 16px rgba(16,185,129,0.3)' : '0 4px 16px rgba(255,255,255,0.05)',
                    padding: '6px', gap: '3px',
                  }}>
                    <div style={{ fontSize: carta.nome ? '22px' : '30px', lineHeight: 1 }}>{carta.emoji}</div>
                    {carta.nome && <div style={{ fontSize: '9px', fontWeight: '800', color: carta.encontrada ? '#6ee7b7' : 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.2 }}>{carta.nome}</div>}
                    {carta.info && carta.encontrada && <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.2 }}>{carta.info}</div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {totalPares > 4 && (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '20px', fontWeight: '500', flexShrink: 0 }}>
            Clique nas cartas para virá-las e encontrar os pares! 🧠
          </p>
        )}
      </div>
    </GameShell>
  )
}

