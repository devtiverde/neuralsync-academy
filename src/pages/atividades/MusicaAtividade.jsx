import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound, getPrefs } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import { tamanhoDaFaixa } from '../../data/mundos'
import '../../styles/crianca.css'

// ═══════════════════════════════════════════════════════════════════════════
// MOTOR DE ÁUDIO
//
// `sounds.js` não exporta `_tone`/`_seq` (são privados do módulo), então este
// arquivo tem o próprio motor, espelhando a mesma construção osc+envelope e
// respeitando as mesmas preferências (`ns_sound_prefs`: muted / sfxVol).
//
// Regras que valem para TODO o arquivo:
//   • nada toca sozinho ao montar a tela — o AudioContext só é criado dentro
//     de um handler de clique (política de gesto do usuário dos navegadores);
//   • `pararSom()` roda antes de qualquer nova reprodução: criança clica
//     rápido e áudios sobrepostos já foram problema recorrente aqui;
//   • toda nota agendada dispara um callback visual no mesmo instante, para
//     quem está sem som (ou não ouve) conseguir jogar.
// ═══════════════════════════════════════════════════════════════════════════

let _ctx = null
let _gain = null
let _vozes = []
let _timers = []

function volumeGlobal() {
  const p = getPrefs()
  if (p.muted) return 0
  return Math.min(1, p.sfxVol ?? 0.6)
}

// só é chamado a partir de um clique — nunca no mount
function contexto() {
  try {
    if (!_ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      _ctx = new AC()
      _gain = _ctx.createGain()
      _gain.connect(_ctx.destination)
    }
    if (_ctx.state === 'suspended') _ctx.resume()
    _gain.gain.value = volumeGlobal()
    return _ctx
  } catch {
    return null
  }
}

// relógio monotônico do ritmo — fora do componente para não ser lido em render
function agoraSegundos() {
  return performance.now() / 1000
}

function pararSom() {
  _timers.forEach(clearTimeout)
  _timers = []
  _vozes.forEach(osc => { try { osc.stop() } catch { /* já parou */ } })
  _vozes = []
}

// { freq, dur, onda, vol, freqFinal } — mesmo formato dos dados de musicaExtra
function _voz(c, som, quando) {
  if (!som || !som.freq) return
  const { freq, dur = 0.5, onda = 'triangle', vol = 0.3, freqFinal } = som
  const osc = c.createOscillator()
  const env = c.createGain()
  osc.type = onda
  osc.frequency.setValueAtTime(freq, quando)
  if (freqFinal != null) osc.frequency.linearRampToValueAtTime(freqFinal, quando + dur)
  env.gain.setValueAtTime(0, quando)
  env.gain.linearRampToValueAtTime(vol, quando + 0.015)
  env.gain.linearRampToValueAtTime(0, quando + dur)
  osc.connect(env)
  env.connect(_gain)
  osc.start(quando)
  osc.stop(quando + dur + 0.03)
  _vozes.push(osc)
}

// plano = [{ t: offset em segundos, soms: [som], marca: qualquer coisa }]
// `aoMarcar(marca, indice)` é chamado no instante de cada passo e, no fim,
// com (null, -1) para apagar o destaque.
function tocarPlano(plano, aoMarcar) {
  pararSom()
  const c = contexto()
  if (!c) {
    // sem áudio disponível: ainda assim roda o feedback visual no tempo certo
    if (aoMarcar) {
      plano.forEach((p, i) => _timers.push(setTimeout(() => aoMarcar(p.marca, i), p.t * 1000)))
      const fim = plano.reduce((m, p) => Math.max(m, p.t + (p.dur || 0.4)), 0)
      _timers.push(setTimeout(() => aoMarcar(null, -1), fim * 1000))
    }
    return
  }
  const t0 = c.currentTime + 0.06
  let fim = 0
  plano.forEach((p, i) => {
    ;(p.soms || []).forEach(s => _voz(c, s, t0 + p.t))
    const durPasso = p.dur || Math.max(...(p.soms || [{ dur: 0.4 }]).map(s => s.dur || 0.4))
    fim = Math.max(fim, p.t + durPasso)
    if (aoMarcar) _timers.push(setTimeout(() => aoMarcar(p.marca, i), Math.max(0, p.t * 1000)))
  })
  if (aoMarcar) _timers.push(setTimeout(() => aoMarcar(null, -1), Math.max(0, fim * 1000)))
}

function tocarUm(som, aoMarcar, marca) {
  tocarPlano([{ t: 0, soms: [som], marca, dur: som?.dur }], aoMarcar)
}

// ═══════════════════════════════════════════════════════════════════════════
// VISUAL
// ═══════════════════════════════════════════════════════════════════════════

const ACCENT = '#a855f7'
const ACCENT_SOFT = 'rgba(168,85,247,0.18)'
const FONTE_TITULO = 'var(--ns-font-display)'
const FONTE_UI = 'var(--ns-font-ui, "Plus Jakarta Sans", sans-serif)'

function useMovimentoReduzido() {
  const [reduz, setReduz] = useState(() => {
    try { return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false }
    catch { return false }
  })
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = e => setReduz(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduz
}

function Card({ children, style }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 18,
      padding: 18,
      width: '100%',
      ...style,
    }}>
      {children}
    </div>
  )
}

function Enunciado({ texto, sub }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'white', fontFamily: FONTE_TITULO, fontSize: 22, lineHeight: 1.3, margin: 0 }}>{texto}</h2>
      {sub && <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 8, fontFamily: FONTE_UI }}>{sub}</p>}
    </div>
  )
}

function BotaoOuvir({ onClick, tocando, rotulo = 'Ouvir', alvo, reduz }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: Math.max(56, Math.round(alvo * 0.75)),
        padding: '0 28px',
        borderRadius: 99,
        border: `2px solid ${tocando ? ACCENT : 'rgba(168,85,247,0.45)'}`,
        background: tocando ? 'linear-gradient(135deg,#a855f7,#d8b4fe)' : ACCENT_SOFT,
        color: tocando ? '#1a0a2e' : '#e9d5ff',
        fontFamily: FONTE_TITULO,
        fontSize: 18,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: tocando ? '0 0 28px rgba(168,85,247,0.55)' : 'none',
        transition: reduz ? 'none' : 'all 0.18s',
      }}
    >
      <span style={{ fontSize: 22 }}>{tocando ? '🔊' : '▶️'}</span> {rotulo}
    </button>
  )
}

// Grade de opções — usada por escuta / quiz / montar(apontar)
function Opcoes({ opcoes, escolhida, onEscolher, alvo, reduz, travado }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(130, alvo + 50)}px, 1fr))`,
      gap: 12,
      width: '100%',
    }}>
      {opcoes.map(o => {
        const esta = escolhida === o.id
        const revelar = travado && o.correta
        let borda = 'rgba(255,255,255,0.14)'
        let fundo = 'rgba(255,255,255,0.06)'
        if (revelar) { borda = '#22c55e'; fundo = 'rgba(34,197,94,0.2)' }
        if (esta && !o.correta) { borda = '#ef4444'; fundo = 'rgba(239,68,68,0.2)' }
        return (
          <button
            key={o.id}
            onClick={() => onEscolher(o)}
            disabled={travado}
            style={{
              minHeight: alvo,
              borderRadius: 16,
              border: `2px solid ${borda}`,
              background: fundo,
              color: 'white',
              cursor: travado ? 'default' : 'pointer',
              padding: '12px 14px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: FONTE_UI, fontWeight: 800, fontSize: 16,
              transition: reduz ? 'none' : 'all 0.15s',
            }}
          >
            {o.emoji && <span style={{ fontSize: 30, lineHeight: 1 }}>{o.emoji}</span>}
            <span>{o.texto}</span>
            {revelar && <span style={{ fontSize: 13, color: '#86efac' }}>✓ certo</span>}
            {esta && !o.correta && <span style={{ fontSize: 13, color: '#fca5a5' }}>✗</span>}
          </button>
        )
      })}
    </div>
  )
}

function Dica({ texto }) {
  if (!texto) return null
  return (
    <div style={{
      background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)',
      borderRadius: 14, padding: '12px 16px', color: '#fde68a', fontSize: 14,
      fontFamily: FONTE_UI, lineHeight: 1.6, textAlign: 'center', width: '100%',
    }}>
      💡 {texto}
    </div>
  )
}

// ── Figuras rítmicas em SVG ────────────────────────────────────────────────
// Os caracteres Unicode 𝅝 (U+1D15D) e 𝅗𝅥 (U+1D157+U+1D165) estão fora do BMP e
// não têm glifo na maioria das fontes de sistema (viram ▯ ou somem). Aqui as
// quatro figuras são desenhadas em SVG para renderizar igual em todo lugar.
function FiguraMusical({ id, tamanho = 64, cor = 'white' }) {
  const w = tamanho * 0.62
  const comStem = id !== 'semibreve'
  const cheia = id === 'seminima' || id === 'colcheia'
  return (
    <svg width={w} height={tamanho} viewBox="0 0 40 62" aria-hidden="true">
      <g transform="rotate(-18 15 46)">
        <ellipse
          cx="15" cy="46" rx={id === 'semibreve' ? 12 : 10} ry={id === 'semibreve' ? 8 : 7}
          fill={cheia ? cor : 'none'} stroke={cor} strokeWidth={cheia ? 0 : 3.5}
        />
      </g>
      {comStem && <rect x="23" y="8" width="3.4" height="40" rx="1.7" fill={cor} />}
      {id === 'colcheia' && (
        <path d="M26 9 C 34 15, 37 22, 33 30 C 35 21, 31 16, 26 14 Z" fill={cor} />
      )}
    </svg>
  )
}

// ── Pentagrama em SVG ──────────────────────────────────────────────────────
// Convenção de `posicao` conforme os dados de cri_musica_pauta:
// 1.5 = 1ª linha (mi4), 2.0 = 1º espaço, 2.5 = 2ª linha (sol4) ... 5.5 = 5ª linha.
// 0.5 = 1ª linha suplementar inferior (dó central).
const PAUTA_L = 16          // espaçamento entre linhas
const PAUTA_BASE = 96       // y da 1ª linha (a de baixo)
const yDaPosicao = pos => PAUTA_BASE - (pos - 1.5) * (PAUTA_L / 2)

function Pentagrama({ nota, aceso }) {
  const cor = aceso ? '#f0abfc' : 'white'
  const y = nota ? yDaPosicao(nota.posicao) : 0
  const stemUp = nota ? nota.posicao < 3.5 : true
  return (
    <svg width="100%" viewBox="0 0 240 130" style={{ maxWidth: 320 }} role="img" aria-label={nota ? `nota ${nota.nome} na pauta` : 'pentagrama'}>
      {[1.5, 2.5, 3.5, 4.5, 5.5].map(p => (
        <line key={p} x1="10" x2="230" y1={yDaPosicao(p)} y2={yDaPosicao(p)} stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" />
      ))}
      {/* clave de sol estilizada (o caractere 𝄞 também está fora do BMP) */}
      <path
        d="M40 106 C 30 100, 28 86, 38 80 C 50 73, 60 82, 55 92 C 51 100, 38 101, 32 92 C 24 80, 30 60, 39 46 C 46 35, 48 26, 44 20 C 37 27, 36 42, 41 56 L 49 104 C 52 116, 42 121, 36 116"
        fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      {nota && (
        <g>
          {nota.suplementar && (
            <line x1="132" x2="168" y1={y} y2={y} stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" />
          )}
          <g transform={`rotate(-18 150 ${y})`}>
            <ellipse cx="150" cy={y} rx="9" ry="6.6" fill={cor} />
          </g>
          <rect
            x={stemUp ? 158 : 141}
            y={stemUp ? y - 40 : y}
            width="3" height="40" rx="1.5" fill={cor}
          />
        </g>
      )}
    </svg>
  )
}

// ── Teclas / notas coloridas ───────────────────────────────────────────────
function Tecla({ nota, aceso, onClick, alvo, reduz, desabilitada, rotuloSecundario }) {
  const cor = nota.cor || ACCENT
  return (
    <button
      onClick={onClick}
      disabled={desabilitada}
      style={{
        minWidth: alvo, minHeight: alvo,
        borderRadius: 18,
        border: `3px solid ${aceso ? '#fff' : cor}`,
        background: aceso ? cor : `${cor}33`,
        color: 'white',
        fontFamily: FONTE_TITULO,
        fontSize: Math.max(15, Math.round(alvo * 0.22)),
        cursor: desabilitada ? 'default' : 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
        boxShadow: aceso ? `0 0 26px ${cor}` : 'none',
        transform: aceso && !reduz ? 'scale(1.08)' : 'none',
        transition: reduz ? 'none' : 'transform 0.12s, box-shadow 0.12s, background 0.12s',
        opacity: desabilitada ? 0.45 : 1,
        padding: 6,
      }}
    >
      {nota.emoji && <span style={{ fontSize: Math.round(alvo * 0.28) }}>{nota.emoji}</span>}
      <span>{nota.nome}</span>
      {rotuloSecundario && <span style={{ fontSize: 11, opacity: 0.75, fontFamily: FONTE_UI }}>{rotuloSecundario}</span>}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK DE PARTIDA — comum aos 5 modos
// ═══════════════════════════════════════════════════════════════════════════

function usePartida(total, aoTerminar, onProgresso) {
  const [indice, setIndice] = useState(0)
  const [acertos, setAcertos] = useState(0)
  // publica o progresso para a barra do GameShell (estado mora no pai)
  useEffect(() => { onProgresso?.(indice) }, [indice, onProgresso])
  const avancar = useCallback(acertou => {
    if (acertou) setAcertos(a => a + 1)
    if (indice < total - 1) {
      setIndice(i => i + 1)
    } else {
      playSound('complete')
      aoTerminar(acertou ? acertos + 1 : acertos)
    }
  }, [indice, total, acertos, aoTerminar])
  return { indice, acertos, avancar }
}

// ═══════════════════════════════════════════════════════════════════════════
// MODO: ESCUTA
// Toca `som` (nota única), `sequencia` (notas em fila) ou `notas` (intervalo /
// acorde, com `simultaneo` e `duracaoNota`) e a criança escolhe entre `opcoes`.
// Cada opção pode ter o próprio `som`, tocado ao ser escolhida.
// ═══════════════════════════════════════════════════════════════════════════

function ModoEscuta(props) {
  const partida = usePartida(props.dados.rodadas.length, props.onFim, props.onProgresso)
  // a `key` remonta a rodada: todo estado local nasce limpo, sem efeito de reset
  return <RodadaEscuta key={partida.indice} {...props} partida={partida} />
}

function RodadaEscuta({ dados, alvo, reduz, partida }) {
  const rodadas = dados.rodadas
  const { indice, acertos, avancar } = partida
  const r = rodadas[indice]

  const [escolhida, setEscolhida] = useState(null)
  const [travado, setTravado] = useState(false)
  const [aceso, setAceso] = useState(null)
  const [jaOuviu, setJaOuviu] = useState(false)
  const [mostrarDica, setMostrarDica] = useState(false)

  useEffect(() => pararSom, [])

  function planoDaRodada() {
    const onda = dados.onda || 'triangle'
    if (r.som) return [{ t: 0, soms: [r.som], marca: 'a', dur: r.som.dur }]
    if (r.sequencia) {
      let t = 0
      return r.sequencia.map((n, i) => {
        const passo = { t, soms: [{ ...n, onda: n.onda || onda, vol: n.vol ?? 0.3 }], marca: i, dur: n.dur }
        t += (n.dur || 0.4) + 0.05
        return passo
      })
    }
    if (r.notas) {
      const d = r.duracaoNota || 0.6
      if (r.simultaneo) {
        return [{ t: 0, dur: d, marca: 'acorde', soms: r.notas.map(n => ({ freq: n.freq, dur: d, onda, vol: 0.22 })) }]
      }
      return r.notas.map((n, i) => ({
        t: i * (d + 0.08), dur: d, marca: i,
        soms: [{ freq: n.freq, dur: d, onda, vol: 0.3 }],
      }))
    }
    return []
  }

  function ouvir() {
    setJaOuviu(true)
    tocarPlano(planoDaRodada(), marca => setAceso(marca))
  }

  function escolher(o) {
    if (travado) return
    setEscolhida(o.id)
    setTravado(true)
    if (o.som) tocarUm(o.som)
    setTimeout(() => {
      playSound(o.correta ? 'correct' : 'wrong')
      if (!o.correta) setMostrarDica(true)
    }, o.som ? 500 : 0)
    setTimeout(() => { pararSom(); avancar(!!o.correta) }, o.correta ? 1200 : 2600)
  }

  // visualização auxiliar: escada de notas (con_musica_notas)
  const escada = dados.escada

  return (
    <Palco
      indice={indice} total={rodadas.length} acertos={acertos}
      instrucao={dados.instrucao}
    >
      <Enunciado texto={r.pergunta} />

      <BotaoOuvir onClick={ouvir} tocando={aceso !== null} rotulo={jaOuviu ? 'Ouvir de novo' : 'Ouvir'} alvo={alvo} reduz={reduz} />

      {/* feedback visual da reprodução — funciona com o som desligado */}
      {r.sequencia && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {r.sequencia.map((n, i) => (
            <div key={i} style={{
              minWidth: 46, minHeight: 46, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: aceso === i ? ACCENT : 'rgba(255,255,255,0.07)',
              border: `2px solid ${aceso === i ? '#fff' : 'rgba(255,255,255,0.15)'}`,
              color: 'white', fontFamily: FONTE_UI, fontWeight: 800, fontSize: 13,
              transform: aceso === i && !reduz ? 'translateY(-6px)' : 'none',
              transition: reduz ? 'none' : 'all 0.12s',
            }}>{n.nome}</div>
          ))}
        </div>
      )}

      {r.notas && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {r.notas.map((n, i) => (
            <div key={i} style={{
              padding: '10px 16px', minHeight: 46, borderRadius: 12,
              display: 'flex', alignItems: 'center',
              background: aceso === i || aceso === 'acorde' ? ACCENT : 'rgba(255,255,255,0.07)',
              border: `2px solid ${aceso === i || aceso === 'acorde' ? '#fff' : 'rgba(255,255,255,0.15)'}`,
              color: 'white', fontFamily: FONTE_UI, fontWeight: 800, fontSize: 14,
              transition: reduz ? 'none' : 'all 0.12s',
            }}>{n.nome}</div>
          ))}
        </div>
      )}

      {r.som && (
        <div style={{
          width: 92, height: 92, borderRadius: '50%',
          border: `3px solid ${aceso ? '#fff' : 'rgba(255,255,255,0.15)'}`,
          background: aceso ? ACCENT : 'rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38,
          boxShadow: aceso ? `0 0 34px ${ACCENT}` : 'none',
          transition: reduz ? 'none' : 'all 0.15s',
        }}>{aceso ? '🎵' : '🎼'}</div>
      )}

      {escada && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
          {escada.map(n => (
            <button
              key={n.nome}
              onClick={() => tocarUm({ freq: n.freq, dur: 0.5, onda: dados.onda || 'triangle', vol: 0.3 }, m => setAceso(m), 'esc_' + n.nome)}
              style={{
                minWidth: 48, minHeight: Math.max(48, 34 + n.grau * 8),
                borderRadius: 10, border: `2px solid ${n.cor}`,
                background: aceso === 'esc_' + n.nome ? n.cor : `${n.cor}30`,
                color: 'white', fontFamily: FONTE_TITULO, fontSize: 14, cursor: 'pointer',
                transition: reduz ? 'none' : 'all 0.12s',
              }}
            >{n.nome}</button>
          ))}
        </div>
      )}

      {dados.referencia && (
        <details style={{ width: '100%' }}>
          <summary style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: FONTE_UI }}>
            📚 Tabela de referência
          </summary>
          <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
            {dados.referencia.map(ref => (
              <div key={ref.id} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: FONTE_UI }}>
                <strong style={{ color: '#e9d5ff' }}>{ref.nome}</strong>
                {ref.semitons != null && ` — ${ref.semitons} semitons`}
                {ref.exemplo && ` (${ref.exemplo.join(' → ')})`}
              </div>
            ))}
          </div>
        </details>
      )}

      <Opcoes opcoes={r.opcoes} escolhida={escolhida} onEscolher={escolher} alvo={alvo} reduz={reduz} travado={travado} />
      {mostrarDica && <Dica texto={r.dica} />}
    </Palco>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MODO: SEQUÊNCIA (eco musical)
// Toca a `sequencia` de nomes de notas acendendo as teclas do `teclado`; a
// criança repete tocando nas mesmas teclas, na ordem.
// ═══════════════════════════════════════════════════════════════════════════

function ModoSequencia(props) {
  const partida = usePartida(props.dados.rodadas.length, props.onFim, props.onProgresso)
  return <RodadaSequencia key={partida.indice} {...props} partida={partida} />
}

function RodadaSequencia({ dados, alvo, reduz, partida }) {
  const rodadas = dados.rodadas
  const teclado = dados.teclado || []
  const { indice, acertos, avancar } = partida
  const r = rodadas[indice]
  const dur = dados.duracaoNota || 0.45
  const onda = dados.onda || 'triangle'

  const [aceso, setAceso] = useState(null)
  const [passo, setPasso] = useState(0)     // quantas notas a criança já acertou
  const [fase, setFase] = useState('espera') // espera | tocando | repetindo | erro | ok
  const [jaOuviu, setJaOuviu] = useState(false)

  useEffect(() => pararSom, [])

  function indiceDaTecla(nome) {
    return teclado.findIndex(t => t.nome === nome)
  }

  function ouvir() {
    setJaOuviu(true)
    setPasso(0)
    setFase('tocando')
    const plano = r.sequencia.map((nome, i) => {
      const t = teclado[indiceDaTecla(nome)]
      return {
        t: i * (dur + 0.12), dur,
        soms: t ? [{ freq: t.freq, dur, onda, vol: 0.3 }] : [],
        marca: indiceDaTecla(nome),
      }
    })
    tocarPlano(plano, marca => {
      setAceso(marca)
      if (marca === null) setFase('repetindo')
    })
  }

  function tocarTecla(idx) {
    if (fase === 'tocando') return
    const t = teclado[idx]
    tocarUm({ freq: t.freq, dur, onda, vol: 0.3 }, m => setAceso(m), idx)
    if (fase !== 'repetindo') return

    // comparação por NOME (o teclado tem dois 'dó', em oitavas diferentes —
    // aceitar qualquer um evita punir a criança por ambiguidade dos dados)
    const esperado = r.sequencia[passo]
    if (t.nome === esperado) {
      const novo = passo + 1
      setPasso(novo)
      if (novo === r.sequencia.length) {
        setFase('ok')
        setTimeout(() => { playSound('correct') }, 250)
        setTimeout(() => { pararSom(); avancar(true) }, 1300)
      }
    } else {
      setFase('erro')
      playSound('wrong')
      setTimeout(() => { setPasso(0); setFase('repetindo') }, 900)
    }
  }

  return (
    <Palco indice={indice} total={rodadas.length} acertos={acertos} instrucao={dados.instrucao}>
      <Enunciado
        texto={fase === 'repetindo' || fase === 'erro' ? 'Agora repita! 🎵' : 'Ouça a melodia'}
        sub={fase === 'erro' ? 'Quase! Vamos do começo.' : `${r.sequencia.length} notinhas`}
      />

      {/* trilha visual do progresso — cada bolinha é uma nota da sequência */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {r.sequencia.map((nome, i) => {
          const t = teclado[indiceDaTecla(nome)]
          const feita = i < passo
          const revelada = fase !== 'espera' && fase !== 'tocando'
          return (
            <div key={i} style={{
              width: 40, height: 40, borderRadius: '50%',
              background: feita ? (t?.cor || ACCENT) : 'rgba(255,255,255,0.08)',
              border: `2px solid ${feita ? '#fff' : 'rgba(255,255,255,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 12, fontFamily: FONTE_UI, fontWeight: 800,
              transition: reduz ? 'none' : 'all 0.15s',
            }}>{feita || !revelada ? (feita ? '✓' : i + 1) : '?'}</div>
          )
        })}
      </div>

      <BotaoOuvir onClick={ouvir} tocando={fase === 'tocando'} rotulo={jaOuviu ? 'Ouvir de novo' : 'Ouvir'} alvo={alvo} reduz={reduz} />

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        {teclado.map((t, i) => (
          <Tecla
            key={i}
            nota={t}
            aceso={aceso === i}
            reduz={reduz}
            alvo={alvo}
            desabilitada={fase === 'tocando'}
            onClick={() => tocarTecla(i)}
          />
        ))}
      </div>

      {fase === 'ok' && <Dica texto="Perfeito! Você repetiu certinho. 🎉" />}
    </Palco>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MODO: QUIZ
// Pergunta escrita + apoio visual variável conforme os campos da rodada:
//   `emoji`, `som`, `nota` (pentagrama), `figura`/`compasso` (figuras SVG),
//   `notas` (tocadas em fila), `sequencia` de acordes, `comparacao` (A/B).
// ═══════════════════════════════════════════════════════════════════════════

function ModoQuiz(props) {
  const partida = usePartida(props.dados.rodadas.length, props.onFim, props.onProgresso)
  return <RodadaQuiz key={partida.indice} {...props} partida={partida} />
}

function RodadaQuiz({ dados, alvo, reduz, partida }) {
  const rodadas = dados.rodadas
  const { indice, acertos, avancar } = partida
  const r = rodadas[indice]

  const [escolhida, setEscolhida] = useState(null)
  const [travado, setTravado] = useState(false)
  const [aceso, setAceso] = useState(null)
  const [mostrarDica, setMostrarDica] = useState(false)

  useEffect(() => pararSom, [])

  const figuras = dados.figuras || []
  const acharFigura = id => figuras.find(f => f.id === id)
  const bpm = dados.bpm || 80
  const spb = 60 / bpm

  function ouvirPrincipal() {
    if (r.som) { tocarUm(r.som, m => setAceso(m), 'som'); return }
    if (r.notas) {
      const d = 0.7
      tocarPlano(r.notas.map((n, i) => ({
        t: i * (d + 0.08), dur: d, marca: i,
        soms: [{ freq: n.freq, dur: d, onda: 'triangle', vol: 0.3 }],
      })), m => setAceso(m))
      return
    }
    if (r.sequencia) {
      let t = 0
      const plano = r.sequencia.map((ac, i) => {
        const d = (ac.tempos || 2) * spb
        const passo = {
          t, dur: d, marca: i,
          soms: (ac.freqs || []).map(f => ({ freq: f, dur: d, onda: 'triangle', vol: 0.2 })),
        }
        t += d
        return passo
      })
      tocarPlano(plano, m => setAceso(m))
      return
    }
    if (r.figura) {
      const f = acharFigura(r.figura)
      const base = dados.somPadrao || { freq: 392, dur: 0.5, onda: 'triangle', vol: 0.3 }
      const d = (f?.tempos || 1) * spb
      tocarUm({ ...base, dur: d }, m => setAceso(m), 'fig')
      return
    }
    if (r.compasso) {
      let t = 0
      const base = dados.somPadrao || { freq: 392, dur: 0.5, onda: 'triangle', vol: 0.3 }
      const plano = r.compasso.figuras.map((fid, i) => {
        const d = (acharFigura(fid)?.tempos || 1) * spb
        const passo = { t, dur: d, marca: i, soms: [{ ...base, dur: d }] }
        t += d
        return passo
      })
      tocarPlano(plano, m => setAceso(m))
    }
  }

  const temAudio = !!(r.som || r.notas || r.sequencia || r.figura || r.compasso)

  function escolher(o) {
    if (travado) return
    setEscolhida(o.id)
    setTravado(true)
    playSound(o.correta ? 'correct' : 'wrong')
    if (!o.correta) setMostrarDica(true)
    setTimeout(() => { pararSom(); avancar(!!o.correta) }, o.correta ? 1200 : 2600)
  }

  return (
    <Palco indice={indice} total={rodadas.length} acertos={acertos} instrucao={dados.instrucao}>
      {r.emoji && <div style={{ fontSize: 68, lineHeight: 1 }}>{r.emoji}</div>}

      <Enunciado texto={r.pergunta} />

      {r.nota && <Card style={{ display: 'flex', justifyContent: 'center' }}><Pentagrama nota={r.nota} aceso={aceso === 'som'} /></Card>}

      {r.figura && (
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{
            padding: 10, borderRadius: 14,
            background: aceso === 'fig' ? ACCENT_SOFT : 'transparent',
            boxShadow: aceso === 'fig' ? `0 0 26px ${ACCENT}` : 'none',
            transition: reduz ? 'none' : 'all 0.15s',
          }}>
            <FiguraMusical id={r.figura} tamanho={80} />
          </div>
          <div style={{ color: '#e9d5ff', fontFamily: FONTE_TITULO, fontSize: 17 }}>{acharFigura(r.figura)?.nome}</div>
        </Card>
      )}

      {r.compasso && (
        <Card>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: FONTE_UI, fontWeight: 800, marginBottom: 10, textAlign: 'center' }}>
            COMPASSO {r.compasso.formula}
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {r.compasso.figuras.map((fid, i) => (
              <div key={i} style={{
                padding: 8, borderRadius: 12,
                background: aceso === i ? ACCENT_SOFT : 'transparent',
                boxShadow: aceso === i ? `0 0 22px ${ACCENT}` : 'none',
                transition: reduz ? 'none' : 'all 0.12s',
                textAlign: 'center',
              }}>
                <FiguraMusical id={fid} tamanho={62} />
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: FONTE_UI }}>
                  {acharFigura(fid)?.tempos} t
                </div>
              </div>
            ))}
            <div style={{
              width: 54, height: 74, borderRadius: 12, border: '2px dashed rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)', fontSize: 26, fontFamily: FONTE_TITULO,
            }}>?</div>
          </div>
        </Card>
      )}

      {r.notas && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {r.notas.map((n, i) => (
            <div key={i} style={{
              padding: '12px 18px', minHeight: 48, borderRadius: 14,
              display: 'flex', alignItems: 'center',
              background: aceso === i ? ACCENT : 'rgba(255,255,255,0.07)',
              border: `2px solid ${aceso === i ? '#fff' : 'rgba(255,255,255,0.15)'}`,
              color: 'white', fontFamily: FONTE_UI, fontWeight: 800, fontSize: 14,
              transition: reduz ? 'none' : 'all 0.12s',
            }}>{n.nome}</div>
          ))}
        </div>
      )}

      {r.sequencia && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {r.sequencia.map((ac, i) => (
            <div key={i} style={{
              padding: '12px 14px', minHeight: 48, borderRadius: 14,
              background: aceso === i ? ACCENT : 'rgba(255,255,255,0.07)',
              border: `2px solid ${aceso === i ? '#fff' : 'rgba(255,255,255,0.15)'}`,
              color: 'white', fontFamily: FONTE_UI, fontWeight: 800, fontSize: 13,
              transition: reduz ? 'none' : 'all 0.12s',
            }}>{ac.acorde}</div>
          ))}
        </div>
      )}

      {r.comparacao && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {r.comparacao.map((c, i) => (
            <button
              key={i}
              onClick={() => tocarUm({ freq: c.freq, dur: c.dur, onda: c.onda, vol: c.vol }, m => setAceso(m), 'cmp' + i)}
              style={{
                flex: '1 1 150px', minHeight: alvo, borderRadius: 16,
                border: `2px solid ${aceso === 'cmp' + i ? '#fff' : 'rgba(168,85,247,0.4)'}`,
                background: aceso === 'cmp' + i ? ACCENT : ACCENT_SOFT,
                color: 'white', cursor: 'pointer', padding: 12,
                fontFamily: FONTE_UI, fontWeight: 800, fontSize: 14,
                transition: reduz ? 'none' : 'all 0.15s',
              }}
            >
              ▶️ {c.rotulo}
            </button>
          ))}
        </div>
      )}

      {temAudio && <BotaoOuvir onClick={ouvirPrincipal} tocando={aceso !== null} rotulo="Ouvir" alvo={alvo} reduz={reduz} />}

      {dados.campoHarmonico && (
        <details style={{ width: '100%' }}>
          <summary style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: FONTE_UI }}>
            🗝️ Campo harmônico de {dados.campoHarmonico.tonalidade}
          </summary>
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            {dados.campoHarmonico.graus.map(g => (
              <button
                key={g.grau}
                onClick={() => tocarPlano([{ t: 0, dur: 1.2, marca: g.grau, soms: g.freqs.map(f => ({ freq: f, dur: 1.2, onda: 'triangle', vol: 0.2 })) }], m => setAceso(m))}
                style={{
                  textAlign: 'left', minHeight: 48, borderRadius: 12, cursor: 'pointer',
                  border: `1px solid ${aceso === g.grau ? '#fff' : 'rgba(255,255,255,0.12)'}`,
                  background: aceso === g.grau ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: FONTE_UI, padding: '10px 14px',
                }}
              >
                <strong style={{ color: '#e9d5ff' }}>{g.grau} — {g.acorde}</strong> · {g.funcao}
              </button>
            ))}
          </div>
        </details>
      )}

      {dados.laboratorio && (
        <details style={{ width: '100%' }}>
          <summary style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: FONTE_UI }}>
            🔬 Laboratório: harmônicos e timbres
          </summary>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            {dados.laboratorio.harmonicos.map(h => (
              <button
                key={h.ordem}
                onClick={() => tocarUm({ freq: h.freq, dur: 0.8, onda: 'sine', vol: 0.22 }, m => setAceso(m), 'h' + h.ordem)}
                style={{
                  minHeight: 48, borderRadius: 12, cursor: 'pointer', padding: '8px 14px',
                  border: `1px solid ${aceso === 'h' + h.ordem ? '#fff' : 'rgba(255,255,255,0.12)'}`,
                  background: aceso === 'h' + h.ordem ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: FONTE_UI,
                }}
              >▶ {h.rotulo}</button>
            ))}
            {dados.laboratorio.ondas.map(o => (
              <button
                key={o.id}
                onClick={() => tocarUm({ freq: dados.laboratorio.notaBase.freq, dur: 1.0, onda: o.id, vol: o.id === 'sawtooth' || o.id === 'square' ? 0.14 : 0.28 }, m => setAceso(m), 'w' + o.id)}
                style={{
                  minHeight: 48, borderRadius: 12, cursor: 'pointer', padding: '8px 14px',
                  border: `1px solid ${aceso === 'w' + o.id ? '#fff' : 'rgba(255,255,255,0.12)'}`,
                  background: aceso === 'w' + o.id ? ACCENT_SOFT : 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: FONTE_UI,
                }}
              >🎚 {o.nome}</button>
            ))}
          </div>
        </details>
      )}

      <Opcoes opcoes={r.opcoes} escolhida={escolhida} onEscolher={escolher} alvo={alvo} reduz={reduz} travado={travado} />
      {mostrarDica && <Dica texto={r.dica} />}
    </Palco>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MODO: RITMO
// Toca o `padrao` (batidas e pausas medidas em `tempos`, no `bpm` dos dados) e
// a criança repete batendo no tambor. A avaliação normaliza o andamento da
// criança antes de comparar — o que importa é a PROPORÇÃO entre as batidas,
// não tocar exatamente na mesma velocidade.
// ═══════════════════════════════════════════════════════════════════════════

function ModoRitmo(props) {
  const partida = usePartida(props.dados.rodadas.length, props.onFim, props.onProgresso)
  return <RodadaRitmo key={partida.indice} {...props} partida={partida} />
}

function RodadaRitmo({ dados, alvo, reduz, partida }) {
  const rodadas = dados.rodadas
  const { indice, acertos, avancar } = partida
  const r = rodadas[indice]
  const spb = 60 / (dados.bpm || 90)
  const somBatida = dados.som || { freq: 196, dur: 0.18, onda: 'triangle', vol: 0.4, freqFinal: 98 }

  const [aceso, setAceso] = useState(null)
  const [fase, setFase] = useState('espera') // espera | tocando | gravando | ok | erro
  const [toques, setToques] = useState(0)
  const [pulso, setPulso] = useState(false)
  const inicio = useRef(0)
  const marcados = useRef([])

  // onsets esperados (em segundos) das batidas, relativos à primeira batida
  const onsets = []
  {
    let t = 0
    r.padrao.forEach(p => {
      if (p.nome !== 'pausa') onsets.push(t)
      t += p.tempos * spb
    })
  }
  const totalBatidas = onsets.length

  useEffect(() => pararSom, [])

  function ouvir() {
    setFase('tocando')
    setToques(0)
    marcados.current = []
    let t = 0
    const plano = r.padrao.map((p, i) => {
      const passo = {
        t, dur: p.tempos * spb, marca: i,
        soms: p.nome === 'pausa' ? [] : [somBatida],
      }
      t += p.tempos * spb
      return passo
    })
    tocarPlano(plano, marca => {
      setAceso(marca)
      if (marca === null) setFase('gravando')
    })
  }

  function bater() {
    if (fase === 'tocando' || fase === 'ok') return
    if (fase !== 'gravando') { setFase('gravando'); marcados.current = [] }
    tocarUm(somBatida)
    setPulso(true)
    setTimeout(() => setPulso(false), 130)

    const agora = agoraSegundos()
    if (marcados.current.length === 0) inicio.current = agora
    marcados.current.push(agora - inicio.current)
    const n = marcados.current.length
    setToques(n)

    if (n === totalBatidas) avaliar()
  }

  function avaliar() {
    const obs = marcados.current
    const durEsperada = onsets[onsets.length - 1] || 1
    const durObservada = obs[obs.length - 1] || 1
    // normaliza o andamento: tocar tudo mais devagar/rápido continua certo
    const escala = durEsperada > 0 && durObservada > 0 ? durObservada / durEsperada : 1
    const tolerancia = Math.max(0.22, 0.45 * spb * escala)
    const ok = onsets.every((esp, i) => Math.abs(obs[i] - esp * escala) <= tolerancia)

    if (ok) {
      setFase('ok')
      playSound('correct')
      setTimeout(() => { pararSom(); avancar(true) }, 1300)
    } else {
      setFase('erro')
      playSound('wrong')
      setTimeout(() => { setToques(0); marcados.current = []; setFase('gravando') }, 1100)
    }
  }

  function pular() {
    pararSom()
    avancar(false)
  }

  return (
    <Palco indice={indice} total={rodadas.length} acertos={acertos} instrucao={dados.instrucao}>
      <Enunciado
        texto={r.nome || 'Repita o ritmo'}
        sub={fase === 'gravando' ? `Sua vez: ${toques} de ${totalBatidas} batidas` : fase === 'erro' ? 'Quase! Vamos de novo.' : `${totalBatidas} batidas`}
      />

      {/* partitura visual: largura de cada bloco proporcional à duração */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
        {r.padrao.map((p, i) => (
          <div key={i} style={{
            width: Math.max(34, p.tempos * 54), height: 54, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            background: aceso === i ? (p.nome === 'pausa' ? 'rgba(255,255,255,0.2)' : ACCENT) : 'rgba(255,255,255,0.07)',
            border: `2px ${p.nome === 'pausa' ? 'dashed' : 'solid'} ${aceso === i ? '#fff' : 'rgba(255,255,255,0.18)'}`,
            boxShadow: aceso === i && p.nome !== 'pausa' ? `0 0 22px ${ACCENT}` : 'none',
            transform: aceso === i && !reduz ? 'translateY(-5px)' : 'none',
            transition: reduz ? 'none' : 'all 0.1s',
          }}>{p.nome === 'pausa' ? '💤' : '🥁'}</div>
        ))}
      </div>

      <BotaoOuvir onClick={ouvir} tocando={fase === 'tocando'} rotulo="Ouvir o ritmo" alvo={alvo} reduz={reduz} />

      <button
        onClick={bater}
        disabled={fase === 'tocando'}
        style={{
          width: Math.max(140, alvo * 1.8), height: Math.max(140, alvo * 1.8),
          borderRadius: '50%',
          border: `5px solid ${pulso ? '#fff' : 'rgba(168,85,247,0.5)'}`,
          background: pulso ? 'linear-gradient(135deg,#a855f7,#f0abfc)' : 'radial-gradient(circle at 40% 35%, rgba(168,85,247,0.35), rgba(168,85,247,0.12))',
          color: 'white', fontFamily: FONTE_TITULO, fontSize: 20,
          cursor: fase === 'tocando' ? 'default' : 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          boxShadow: pulso ? `0 0 44px ${ACCENT}` : 'none',
          transform: pulso && !reduz ? 'scale(0.94)' : 'none',
          transition: reduz ? 'none' : 'all 0.1s',
          opacity: fase === 'tocando' ? 0.5 : 1,
        }}
      >
        <span style={{ fontSize: 46 }}>🥁</span>
        <span style={{ fontSize: 15 }}>Bater</span>
      </button>

      {/* pontinhos das batidas já dadas */}
      <div style={{ display: 'flex', gap: 8 }}>
        {Array.from({ length: totalBatidas }).map((_, i) => (
          <div key={i} style={{
            width: 16, height: 16, borderRadius: '50%',
            background: i < toques ? ACCENT : 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            transition: reduz ? 'none' : 'background 0.12s',
          }} />
        ))}
      </div>

      {fase === 'ok' && <Dica texto="Isso! O ritmo ficou certinho. 🥁" />}
      {fase === 'erro' && <Dica texto="O ritmo saiu diferente. Ouça de novo e repita o espaçamento das batidas." />}

      <button
        onClick={pular}
        style={{
          background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.35)',
          fontSize: 13, cursor: 'pointer', fontFamily: FONTE_UI, minHeight: 48,
        }}
      >
        Pular este ritmo →
      </button>
    </Palco>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MODO: MONTAR
// Quatro tarefas, escolhidas por `rodada.tarefa`:
//   ordenar   — arrastar (tocar) as notas embaralhadas até a ordem da escala
//   apontar   — pergunta de múltipla escolha (`opcoes`)
//   reproduzir— ouvir a `sequencia` e remontá-la com o teclado da escala
//   compor    — melodia livre entre `minimoNotas` e `maximoNotas`
// ═══════════════════════════════════════════════════════════════════════════

const CORES_GRAU = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899']

function ModoMontar(props) {
  const partida = usePartida(props.dados.rodadas.length, props.onFim, props.onProgresso)
  return <RodadaMontar key={partida.indice} {...props} partida={partida} />
}

function RodadaMontar({ dados, alvo, reduz, partida }) {
  const rodadas = dados.rodadas
  const { indice, acertos, avancar } = partida
  const r = rodadas[indice]
  const escala = dados.escala || { graus: [] }
  const graus = escala.graus || []
  const dur = dados.duracaoNota || 0.4
  const onda = dados.onda || 'triangle'

  const [montado, setMontado] = useState([])   // [{ nome, freq }]
  const [aceso, setAceso] = useState(null)
  const [travado, setTravado] = useState(false)
  const [escolhida, setEscolhida] = useState(null)
  const [mostrarDica, setMostrarDica] = useState(false)
  const [status, setStatus] = useState(null)   // null | 'ok' | 'erro'

  useEffect(() => pararSom, [])

  const freqDe = nome => graus.find(g => g.nome === nome)?.freq || 440

  function tocarNome(nome, marca) {
    tocarUm({ freq: freqDe(nome), dur, onda, vol: 0.3 }, m => setAceso(m), marca)
  }

  function adicionar(nome) {
    if (travado) return
    const max = r.tarefa === 'compor' ? (r.maximoNotas || 16)
      : r.tarefa === 'reproduzir' ? r.sequencia.length
      : (r.resposta?.length || 8)
    if (montado.length >= max) return
    tocarNome(nome, 'k_' + nome)
    setMontado(m => [...m, { nome, freq: freqDe(nome) }])
    setStatus(null)
  }

  function apagarUltima() {
    pararSom()
    setMontado(m => m.slice(0, -1))
    setStatus(null)
  }

  function tocarMinha() {
    if (!montado.length) return
    tocarPlano(montado.map((n, i) => ({
      t: i * (dur + 0.08), dur, marca: i,
      soms: [{ freq: n.freq, dur, onda, vol: 0.3 }],
    })), m => setAceso(m))
  }

  function ouvirModelo() {
    const seq = r.sequencia || []
    let t = 0
    const plano = seq.map((n, i) => {
      const d = (n.tempos || 1) * dur * 1.4
      const passo = { t, dur: d, marca: 'm' + i, soms: [{ freq: n.freq, dur: d, onda, vol: 0.3 }] }
      t += d + 0.06
      return passo
    })
    tocarPlano(plano, m => setAceso(m))
  }

  function conferir() {
    const alvoNomes = r.tarefa === 'reproduzir' ? r.sequencia.map(n => n.nome) : r.resposta
    const ok = montado.length === alvoNomes.length && montado.every((n, i) => n.nome === alvoNomes[i])
    if (ok) {
      setStatus('ok'); setTravado(true)
      playSound('correct')
      setTimeout(() => { pararSom(); avancar(true) }, 1400)
    } else {
      setStatus('erro')
      playSound('wrong')
      setTimeout(() => { setMontado([]); setStatus(null) }, 1100)
    }
  }

  function escolher(o) {
    if (travado) return
    setEscolhida(o.id); setTravado(true)
    playSound(o.correta ? 'correct' : 'wrong')
    if (!o.correta) setMostrarDica(true)
    setTimeout(() => { pararSom(); avancar(!!o.correta) }, o.correta ? 1200 : 2600)
  }

  function concluirComposicao() {
    setTravado(true)
    playSound('correct')
    setTimeout(() => { pararSom(); avancar(true) }, 1200)
  }

  // teclado disponível: embaralhadas (ordenar) ou toda a escala
  const teclas = r.tarefa === 'ordenar'
    ? r.embaralhadas.map((nome, i) => ({ nome, cor: CORES_GRAU[i % CORES_GRAU.length] }))
    : graus.map((g, i) => ({ nome: g.nome, cor: CORES_GRAU[i % CORES_GRAU.length], rotulo: 'grau ' + g.grau }))

  const usadas = new Set(montado.map(n => n.nome))

  return (
    <Palco indice={indice} total={rodadas.length} acertos={acertos} instrucao={dados.instrucao}>
      <Enunciado texto={r.enunciado} sub={r.sugestao} />

      {r.tarefa === 'apontar' ? (
        <>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {graus.map((g, i) => (
              <Tecla
                key={i}
                nota={{ nome: g.nome, cor: CORES_GRAU[i % CORES_GRAU.length] }}
                aceso={aceso === 'k_' + g.nome + i}
                alvo={Math.max(48, alvo - 12)}
                reduz={reduz}
                onClick={() => tocarUm({ freq: g.freq, dur, onda, vol: 0.3 }, m => setAceso(m), 'k_' + g.nome + i)}
              />
            ))}
          </div>
          <Opcoes opcoes={r.opcoes} escolhida={escolhida} onEscolher={escolher} alvo={alvo} reduz={reduz} travado={travado} />
          {mostrarDica && <Dica texto={r.dica} />}
        </>
      ) : (
        <>
          {r.tarefa === 'reproduzir' && (
            <BotaoOuvir onClick={ouvirModelo} tocando={typeof aceso === 'string' && aceso.startsWith('m')} rotulo="Ouvir a melodia" alvo={alvo} reduz={reduz} />
          )}

          {/* faixa do que já foi montado */}
          <Card style={{
            minHeight: 84, display: 'flex', gap: 8, flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'center',
            border: status === 'ok' ? '2px solid #22c55e' : status === 'erro' ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.09)',
          }}>
            {montado.length === 0
              ? <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontFamily: FONTE_UI }}>Toque nas notas abaixo…</span>
              : montado.map((n, i) => (
                <div key={i} style={{
                  minWidth: 52, minHeight: 52, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: aceso === i ? ACCENT : 'rgba(168,85,247,0.22)',
                  border: `2px solid ${aceso === i ? '#fff' : 'rgba(168,85,247,0.5)'}`,
                  color: 'white', fontFamily: FONTE_TITULO, fontSize: 15,
                  transform: aceso === i && !reduz ? 'translateY(-5px)' : 'none',
                  transition: reduz ? 'none' : 'all 0.12s',
                }}>{n.nome}</div>
              ))}
          </Card>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {teclas.map((t, i) => (
              <Tecla
                key={i}
                nota={t}
                rotuloSecundario={t.rotulo}
                aceso={aceso === 'k_' + t.nome}
                alvo={Math.max(48, alvo - 12)}
                reduz={reduz}
                desabilitada={travado || (r.tarefa === 'ordenar' && usadas.has(t.nome))}
                onClick={() => adicionar(t.nome)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <BotaoBarra onClick={apagarUltima} disabled={!montado.length || travado}>⌫ Apagar</BotaoBarra>
            <BotaoBarra onClick={tocarMinha} disabled={!montado.length}>▶️ Tocar</BotaoBarra>
            {r.tarefa === 'compor' ? (
              <BotaoBarra
                destaque
                onClick={concluirComposicao}
                disabled={travado || montado.length < (r.minimoNotas || 1)}
              >
                ✓ Pronto ({montado.length}/{r.minimoNotas || 1})
              </BotaoBarra>
            ) : (
              <BotaoBarra destaque onClick={conferir} disabled={travado || !montado.length}>✓ Conferir</BotaoBarra>
            )}
          </div>

          {status === 'erro' && <Dica texto="Não foi dessa vez — as notas voltaram para você tentar de novo." />}
          {status === 'ok' && <Dica texto="Perfeito! 🎶" />}
        </>
      )}
    </Palco>
  )
}

function BotaoBarra({ children, onClick, disabled, destaque }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minHeight: 52, padding: '0 20px', borderRadius: 14,
        border: destaque ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
        background: destaque ? 'linear-gradient(135deg,#a855f7,#7C3AED)' : 'rgba(255,255,255,0.07)',
        color: 'white', fontFamily: FONTE_UI, fontWeight: 800, fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        boxShadow: destaque && !disabled ? '0 6px 20px rgba(168,85,247,0.4)' : 'none',
      }}
    >
      {children}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PALCO — moldura comum de todas as rodadas
// ═══════════════════════════════════════════════════════════════════════════

function Palco({ children, instrucao, indice, total, acertos }) {
  return (
    <div style={{
      maxWidth: 560, width: '100%', margin: '0 auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{
          background: ACCENT_SOFT, border: '1px solid rgba(168,85,247,0.35)', borderRadius: 99,
          padding: '4px 14px', color: '#e9d5ff', fontSize: 12, fontWeight: 800, fontFamily: FONTE_UI,
        }}>
          Rodada {indice + 1} de {total}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontFamily: FONTE_UI }}>
          ⭐ {acertos} acertos
        </span>
      </div>

      {instrucao && (
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center', margin: 0, fontFamily: FONTE_UI, lineHeight: 1.6 }}>
          {instrucao}
        </p>
      )}

      {children}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export default function MusicaAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [encerrado, setEncerrado] = useState(false)
  const [placar, setPlacar] = useState(0)
  const [feito, setFeito] = useState(0)   // rodadas já respondidas → barra do GameShell
  const reduz = useMovimentoReduzido()

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  useEffect(() => pararSom, [])

  const child = (() => {
    try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null }
  })()
  const T = tamanhoDaFaixa(child?.faixa_etaria)
  // alvos de toque: nunca abaixo de 48px, e maiores nas faixas menores
  const alvo = Math.max(48, Math.round(T.tile * 0.55))

  const aoTerminar = useCallback(n => { setPlacar(n); setEncerrado(true) }, [])

  if (!atividade) return null

  const dados = atividade.dados || {}
  const total = dados.rodadas?.length || 0

  const kidsLink = getKidsLink(atividade.id)
  if (!iniciou) return (
    <IntroAtividade
      atividade={atividade}
      onComecar={() => setIniciou(true)}
      onVoltar={() => navigate(-1)}
      refazendo={state?.refazendo}
      kidsLink={kidsLink}
    />
  )

  if (encerrado) {
    const limiar3 = Math.ceil(total * 0.9)
    const limiar2 = Math.ceil(total * 0.6)
    const limiar1 = Math.ceil(total * 0.3)
    const estrelas = placar >= limiar3 ? 3 : placar >= limiar2 ? 2 : placar >= limiar1 ? 1 : 0

    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: 24, padding: '20px 0' }}>
          <div style={{ fontSize: 64, letterSpacing: 8, animation: reduz ? 'none' : 'ns-bounce 1.5s ease-in-out infinite' }}>🎵🎶🎵</div>
          <div>
            <h2 style={{ color: 'white', fontFamily: FONTE_TITULO, fontSize: 30, marginBottom: 6 }}>Que música boa! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontFamily: FONTE_UI }}>
              Você acertou {placar} de {total} rodadas.
            </p>
          </div>

          {estrelas > 0 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {Array.from({ length: estrelas }).map((_, i) => (
                <span key={i} style={{ fontSize: 26, animation: reduz ? 'none' : `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 420 }}>
            <button
              onClick={() => { pararSom(); setPlacar(0); setFeito(0); setEncerrado(false); setIniciou(false) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: 14, color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: FONTE_UI, minHeight: 52 }}
            >
              🔁 Repetir
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#a855f7,#7C3AED)', border: 'none', borderRadius: 12, padding: 14, color: 'white', cursor: 'pointer', fontWeight: 900, fontSize: 14, fontFamily: FONTE_UI, boxShadow: '0 6px 20px rgba(168,85,247,0.4)', minHeight: 52 }}
            >
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  const comum = { dados, alvo, reduz, onFim: aoTerminar, onProgresso: setFeito }
  let jogo
  switch (dados.modo) {
    case 'escuta':    jogo = <ModoEscuta {...comum} />; break
    case 'sequencia': jogo = <ModoSequencia {...comum} />; break
    case 'quiz':      jogo = <ModoQuiz {...comum} />; break
    case 'ritmo':     jogo = <ModoRitmo {...comum} />; break
    case 'montar':    jogo = <ModoMontar {...comum} />; break
    default:
      jogo = (
        <div style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontFamily: FONTE_UI }}>
          Modo de atividade desconhecido: {String(dados.modo)}
        </div>
      )
  }

  const progresso = total ? Math.min(100, (feito / total) * 100) : 0

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${feito} / ${total}`}
      onVoltar={() => { pararSom(); navigate(-1) }}
    >
      {jogo}
    </GameShell>
  )
}
