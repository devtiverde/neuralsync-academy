import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const LETRAS = [
  { letra: 'A', palavra: 'Avião',      emoji: '✈️', funfato: 'O A é a vogal mais usada em português — aparece em quase 1 de cada 8 letras!',       detalhe: 'Vogal aberta | 1ª letra | Frequência: ~12,4% no português' },
  { letra: 'B', palavra: 'Bola',       emoji: '⚽', funfato: 'O B vem do hebraico "bet" que significa casa — veja a forma de uma casa deitada!',     detalhe: 'Consoante plosiva bilabial | Som: /b/' },
  { letra: 'C', palavra: 'Casa',       emoji: '🏠', funfato: 'O C muda de som: "ca" = K, mas "ce" e "ci" = S — como em "cedo" e "cidade"!',         detalhe: 'Consoante que muda de som antes de e/i (s) e a/o/u (k)' },
  { letra: 'D', palavra: 'Dado',       emoji: '🎲', funfato: 'O D vem do hebraico "dalet" que significa porta — como o arco de uma porta!',          detalhe: 'Consoante plosiva dental | Som: /d/' },
  { letra: 'E', palavra: 'Estrela',    emoji: '⭐', funfato: 'O E é a vogal mais frequente em português — aparece em ~13% de todas as letras!',       detalhe: 'Vogal meia-fechada | 2ª vogal | Frequência: ~13,0%' },
  { letra: 'F', palavra: 'Fogo',       emoji: '🔥', funfato: 'O F vem do hebraico "vav" que era uma estaca — e o som lembra o vento soprando!',      detalhe: 'Consoante fricativa labiodental | Som: /f/' },
  { letra: 'G', palavra: 'Gato',       emoji: '🐱', funfato: 'O G muda de som: "ga" = G duro, mas "ge" e "gi" = J — como em "gelo" e "girafa"!',    detalhe: 'Consoante velar — muda som antes de e/i: /ʒ/ (como "gelo")' },
  { letra: 'H', palavra: 'Hipopótamo', emoji: '🦛', funfato: 'O H em português é mudo — mas em "nh" e "lh" ajuda a fazer sons especiais!',           detalhe: 'Letra muda em português — não representa nenhum som sozinha' },
  { letra: 'I', palavra: 'Iglu',       emoji: '🏔️', funfato: 'O I também é número romano — I=1, II=2, III=3, IV=4, V=5!',                           detalhe: 'Vogal fechada alta | Frequência: ~5,9%' },
  { letra: 'J', palavra: 'Janela',     emoji: '🪟', funfato: 'O J foi a última letra a entrar no alfabeto — existia antes como variação do I!',       detalhe: 'Consoante fricativa pós-alveolar | Som: /ʒ/ (como "jogo")' },
  { letra: 'K', palavra: 'Koala',      emoji: '🐨', funfato: 'O K só foi incluído no alfabeto português em 2009 — antes era usada só em siglas!',    detalhe: 'Usada em siglas e palavras estrangeiras | Som: /k/' },
  { letra: 'L', palavra: 'Leão',       emoji: '🦁', funfato: 'No final de sílaba o L vira W — por isso "sol" soa como "sow" e "mel" como "mew"!',   detalhe: 'Consoante lateral | No final de sílaba soa como /w/ (mal→mau)' },
  { letra: 'M', palavra: 'Macaco',     emoji: '🐒', funfato: 'O M nasaliza a vogal anterior — "cam" soa diferente de "ca" por causa disso!',         detalhe: 'Consoante nasal bilabial | Nasaliza a vogal anterior' },
  { letra: 'N', palavra: 'Nuvem',      emoji: '☁️', funfato: 'O N vem do hebraico "nun" que significa peixe — veja a forma de um peixe nadando!',   detalhe: 'Consoante nasal alveolar | Frequência: ~5,1%' },
  { letra: 'O', palavra: 'Ovo',        emoji: '🥚', funfato: 'O O é a 3ª vogal mais usada em português — aparece em ~10% de todas as letras!',       detalhe: 'Vogal meia-fechada/aberta | 3ª vogal | Frequência: ~10,7%' },
  { letra: 'P', palavra: 'Pato',       emoji: '🦆', funfato: 'O P é silencioso em algumas palavras gregas: "psicologia", "pneumonia", "pterossauro"!', detalhe: 'Consoante plosiva bilabial surda | Som: /p/' },
  { letra: 'Q', palavra: 'Queijo',     emoji: '🧀', funfato: 'O Q quase sempre aparece com U — "qu" = K. Apenas "Qatar" e "qi" são exceções!',       detalhe: 'Sempre seguida de u — "qu" = /k/. Exceção: "qua" = /kwa/' },
  { letra: 'R', palavra: 'Rato',       emoji: '🐭', funfato: 'O R dobrado (RR) tem som de raspar a garganta — como em "carro" e "terra"!',            detalhe: 'Duplo r (rr) → som vibrante /ʀ/. R simples entre vogais → /ɾ/' },
  { letra: 'S', palavra: 'Sol',        emoji: '☀️', funfato: 'O S muda de som entre vogais — "casa" soa com Z, mas "sol" soa com S!',                detalhe: 'Mais frequente do alfabeto | Entre vogais: /z/. No início: /s/' },
  { letra: 'T', palavra: 'Tartaruga',  emoji: '🐢', funfato: 'Antes de I o T vira TCH — é por isso que "tio" soa como "tchiu" em muitos estados!',  detalhe: 'Antes de "i" ou "e" átono: vira /tʃ/ (ti→tchi, como "tia")' },
  { letra: 'U', palavra: 'Uva',        emoji: '🍇', funfato: 'O U fica mudo em "que", "qui", "gue" e "gui" — mas não em "qua", "quo" e "gua"!',     detalhe: 'Vogal fechada | 4ª vogal | Frequência: ~4,6%' },
  { letra: 'V', palavra: 'Vaca',       emoji: '🐄', funfato: 'O V e o B têm sons parecidos, mas o V usa os dentes — experimente sentir a diferença!', detalhe: 'Consoante fricativa labiodental | Som: /v/ (diferente do b)' },
  { letra: 'W', palavra: 'Waffle',     emoji: '🧇', funfato: 'O W entrou no alfabeto português em 2009 — junto com K e Y para nomes estrangeiros!',  detalhe: 'Letra estrangeira — não era do alfabeto original português' },
  { letra: 'X', palavra: 'Xícara',     emoji: '☕', funfato: 'O X é a letra mais versátil — soa como CH (xá), KS (táxi), Z (exame) ou S (próximo)!', detalhe: 'Letra polissônica: /ʃ/ (xá), /ks/ (taxi), /z/ (exame), /s/ (próximo)' },
  { letra: 'Y', palavra: 'Iogurte',    emoji: '🥛', funfato: 'O Y só aparece em palavras estrangeiras e nomes próprios — como Yan, Yara e Yoga!',    detalhe: 'Letra estrangeira | Soa como i/j | Usada em nomes e anglicismos' },
  { letra: 'Z', palavra: 'Zebra',      emoji: '🦓', funfato: 'No final de palavra o Z vira S — "paz" soa como "pass" e "arroz" como "arross"!',      detalhe: 'Consoante fricativa alveolar | Som: /z/. No final: /s/ (paz)' },
]

function detectFaixa(id = '') {
  if (id.startsWith('cri_') || id.startsWith('inv_')) return 'avancado'
  if (id.startsWith('con_')) return 'medio'
  return 'basico'
}

const ACCENT = '#1D9E75'

function falarTTS(texto) {
  if (!window.speechSynthesis) return
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'pt-BR'
  utt.rate = 0.85
  utt.pitch = 1.1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utt)
}

function falar(letraData, atividadeId, temTema) {
  const texto = `${letraData.letra}. ${letraData.palavra}.`
  const letra = letraData.letra.toLowerCase()
  const base = temTema ? `/audio/alfabeto/_temas/${atividadeId}` : '/audio/alfabeto'

  // letra e palavra são arquivos separados — toca a letra, espera uma pausa real
  // e só então toca a palavra (mais natural que confiar em pontuação dentro do TTS)
  let jaCaiuNoTTS = false
  const cairNoTTS = () => { if (!jaCaiuNoTTS) { jaCaiuNoTTS = true; falarTTS(texto) } }

  const audioLetra = new Audio(`${base}/${letra}.mp3`)
  const audioPalavra = new Audio(`${base}/${letra}-palavra.mp3`)
  audioLetra.addEventListener('error', cairNoTTS)
  audioPalavra.addEventListener('error', cairNoTTS)
  audioLetra.addEventListener('ended', () => {
    if (jaCaiuNoTTS) return
    setTimeout(() => { if (!jaCaiuNoTTS) audioPalavra.play().catch(cairNoTTS) }, 380)
  })
  audioLetra.play().catch(cairNoTTS)
}

export default function AlfabetoAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visitadas, setVisitadas] = useState(new Set())
  const [encerrado, setEncerrado] = useState(false)
  const [animIn, setAnimIn] = useState(true)
  const [falando, setFalando] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  if (!atividade) return null

  const DADOS = atividade?.dados?.letras || LETRAS
  const nivel = detectFaixa(atividade.id)
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

  const letraData = DADOS[currentIndex]
  const progresso = (visitadas.size / DADOS.length) * 100
  const estrelas = visitadas.size >= DADOS.length ? 3 : visitadas.size >= Math.ceil(DADOS.length / 2) ? 2 : visitadas.size >= 5 ? 1 : 0

  function handleFalar() {
    if (falando) return
    const idx = currentIndex
    setFalando(true)
    playSound('correct')
    falar(letraData, atividade.id, !!atividade?.dados?.letras)

    if (!visitadas.has(idx)) {
      const next = new Set(visitadas)
      next.add(idx)
      setVisitadas(next)
      if (next.size === DADOS.length) {
        setTimeout(() => { setFalando(false); setEncerrado(true) }, 3000)
        return
      }
    }

    setTimeout(() => {
      setFalando(false)
      if (idx < DADOS.length - 1) {
        setAnimIn(false)
        setTimeout(() => { setCurrentIndex(idx + 1); setAnimIn(true) }, 200)
      }
    }, 3000)
  }

  function navegar(dir) {
    const next = currentIndex + dir
    if (next < 0 || next >= LETRAS.length) return
    playSound('click')
    setAnimIn(false)
    setTimeout(() => { setCurrentIndex(next); setAnimIn(true) }, 200)
  }

  function irPara(i) {
    if (i === currentIndex) return
    playSound('click')
    setAnimIn(false)
    setTimeout(() => { setCurrentIndex(i); setAnimIn(true) }, 200)
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>⭐⭐⭐</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Parabéns! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você conhece todas as letras do alfabeto!</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '380px' }}>
            {DADOS.map((l, i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: ACCENT + '30', border: `1px solid ${ACCENT}60`, color: ACCENT, fontSize: '14px', fontWeight: '900' }}>
                {l.letra}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCurrentIndex(0); setVisitadas(new Set()); setEncerrado(false); setAnimIn(true) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Repetir
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#1D9E75,#34d399)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(29,158,117,0.4)' }}
            >
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
      labelProgresso={`${letraData.letra} · ${visitadas.size} / ${DADOS.length}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{
        maxWidth: '560px', width: '100%', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        animation: animIn ? 'ns-slide-up 0.3s ease' : 'none',
      }}>

        {/* Main card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: '24px', padding: '28px 40px',
          textAlign: 'center', width: '100%',
          border: `1.5px solid ${ACCENT}35`,
          boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 60px ${ACCENT}12`,
        }}>
          <div style={{
            fontSize: '110px', fontWeight: '900', color: ACCENT, lineHeight: 1,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textShadow: `0 0 50px ${ACCENT}60`,
            animation: 'ns-bounce 3s ease-in-out infinite',
            marginBottom: '8px',
          }}>
            {letraData.letra}
          </div>

          <div style={{ fontSize: '52px', lineHeight: 1, marginBottom: '12px', animation: 'ns-slide-up 0.3s ease' }}>
            {letraData.emoji}
          </div>

          <div style={{ fontSize: '24px', fontWeight: '900', color: 'white', letterSpacing: '-0.3px' }}>
            {letraData.palavra}
          </div>
          {nivel === 'medio' && (
            <div style={{ marginTop: '12px', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#fdba74', fontWeight: '600', lineHeight: 1.5 }}>
              💡 {letraData.funfato}
            </div>
          )}
          {nivel === 'avancado' && (
            <div style={{ marginTop: '12px', background: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.3)', borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: '#6ee7b7', fontWeight: '600', lineHeight: 1.5 }}>
              🔬 {letraData.detalhe}
            </div>
          )}
        </div>

        {/* Stars feedback */}
        {estrelas > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ fontSize: '20px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600' }}>
              {visitadas.size} de {DADOS.length} letras ouvidas
            </span>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navegar(-1)}
            disabled={currentIndex === 0}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              fontSize: '20px', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === 0 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            ←
          </button>

          <button
            onClick={handleFalar}
            disabled={falando}
            title="Ouvir a letra e a palavra"
            style={{
              width: '80px', height: '80px', borderRadius: '50%', border: 'none',
              background: falando
                ? `rgba(29,158,117,0.35)`
                : `linear-gradient(135deg, ${ACCENT}, ${ACCENT}bb)`,
              color: 'white', fontSize: '32px', cursor: 'pointer',
              boxShadow: falando ? 'none' : `0 8px 28px ${ACCENT}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              transform: falando ? 'scale(0.92)' : 'scale(1)',
            }}
          >
            🔊
          </button>

          <button
            onClick={() => navegar(1)}
            disabled={currentIndex === DADOS.length - 1}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              fontSize: '20px', cursor: currentIndex === DADOS.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentIndex === DADOS.length - 1 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            →
          </button>
        </div>

        {/* A–Z mini-grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', maxWidth: '420px' }}>
          {DADOS.map((l, i) => (
            <button
              key={l.letra}
              onClick={() => irPara(i)}
              style={{
                width: '28px', height: '28px', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                border: i === currentIndex ? `2px solid ${ACCENT}` : '1px solid rgba(255,255,255,0.1)',
                background: visitadas.has(i) ? ACCENT : i === currentIndex ? ACCENT + '30' : 'rgba(255,255,255,0.06)',
                color: visitadas.has(i) ? '#fff' : i === currentIndex ? ACCENT : 'rgba(255,255,255,0.4)',
                transition: 'all 0.15s',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              {l.letra}
            </button>
          ))}
        </div>

        {visitadas.has(currentIndex) && (
          <div style={{ background: 'rgba(16,185,129,0.12)', borderRadius: '12px', padding: '9px 20px', border: '1px solid rgba(16,185,129,0.3)', animation: 'ns-slide-up 0.25s ease' }}>
            <span style={{ color: '#6ee7b7', fontWeight: '800', fontSize: '13px' }}>✓ Você já ouviu esta letra!</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
