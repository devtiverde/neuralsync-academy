import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

// ─── Conteúdo ──────────────────────────────────────────────────────────────

const VOCAB = {
  cores: [
    { en: 'Red',    pt: 'Vermelho',  emoji: '🔴' },
    { en: 'Blue',   pt: 'Azul',      emoji: '🔵' },
    { en: 'Yellow', pt: 'Amarelo',   emoji: '🟡' },
    { en: 'Green',  pt: 'Verde',     emoji: '🟢' },
    { en: 'Orange', pt: 'Laranja',   emoji: '🟠' },
    { en: 'Purple', pt: 'Roxo',      emoji: '🟣' },
    { en: 'Pink',   pt: 'Rosa',      emoji: '🩷' },
    { en: 'White',  pt: 'Branco',    emoji: '⬜' },
    { en: 'Black',  pt: 'Preto',     emoji: '⬛' },
  ],
  animais: [
    { en: 'Cat',      pt: 'Gato',      emoji: '🐱' },
    { en: 'Dog',      pt: 'Cachorro',  emoji: '🐶' },
    { en: 'Bird',     pt: 'Pássaro',   emoji: '🐦' },
    { en: 'Fish',     pt: 'Peixe',     emoji: '🐠' },
    { en: 'Rabbit',   pt: 'Coelho',    emoji: '🐰' },
    { en: 'Horse',    pt: 'Cavalo',    emoji: '🐴' },
    { en: 'Duck',     pt: 'Pato',      emoji: '🦆' },
    { en: 'Elephant', pt: 'Elefante',  emoji: '🐘' },
  ],
  numeros: [
    { en: 'One',   pt: 'Um',     emoji: '1️⃣' },
    { en: 'Two',   pt: 'Dois',   emoji: '2️⃣' },
    { en: 'Three', pt: 'Três',   emoji: '3️⃣' },
    { en: 'Four',  pt: 'Quatro', emoji: '4️⃣' },
    { en: 'Five',  pt: 'Cinco',  emoji: '5️⃣' },
    { en: 'Six',   pt: 'Seis',   emoji: '6️⃣' },
    { en: 'Seven', pt: 'Sete',   emoji: '7️⃣' },
    { en: 'Eight', pt: 'Oito',   emoji: '8️⃣' },
    { en: 'Nine',  pt: 'Nove',   emoji: '9️⃣' },
    { en: 'Ten',   pt: 'Dez',    emoji: '🔟' },
  ],
  cumprimentos: [
    { en: 'Hello',     pt: 'Olá',          emoji: '👋' },
    { en: 'Goodbye',   pt: 'Tchau',        emoji: '🚪' },
    { en: 'Please',    pt: 'Por favor',    emoji: '🙏' },
    { en: 'Thank you', pt: 'Obrigado(a)',  emoji: '😊' },
    { en: 'Yes',       pt: 'Sim',          emoji: '✅' },
    { en: 'No',        pt: 'Não',          emoji: '❌' },
  ],
}

const VOCAB_CATS = [
  { id: 'cores',        label: 'Colors',    emoji: '🎨' },
  { id: 'animais',      label: 'Animals',   emoji: '🐾' },
  { id: 'numeros',      label: 'Numbers',   emoji: '🔢' },
  { id: 'cumprimentos', label: 'Greetings', emoji: '👋' },
]

const FLASHCARDS_CON = [
  { en: 'Hello',        pt: 'Olá',              emoji: '👋' },
  { en: 'Good morning', pt: 'Bom dia',          emoji: '🌅' },
  { en: 'Good night',   pt: 'Boa noite',        emoji: '🌙' },
  { en: "I'm fine",     pt: 'Estou bem',        emoji: '🙂' },
  { en: 'See you later',pt: 'Até logo',         emoji: '✌️' },
  { en: 'Book',         pt: 'Livro',            emoji: '📚' },
  { en: 'Pen',          pt: 'Caneta',           emoji: '✒️' },
  { en: 'School',       pt: 'Escola',           emoji: '🏫' },
  { en: 'Teacher',      pt: 'Professor(a)',     emoji: '👩‍🏫' },
  { en: 'Student',      pt: 'Aluno(a)',         emoji: '🧑‍🎓' },
  { en: 'Homework',     pt: 'Dever de casa',    emoji: '📝' },
  { en: 'Mother',       pt: 'Mãe',             emoji: '👩' },
  { en: 'Father',       pt: 'Pai',             emoji: '👨' },
  { en: 'Sister',       pt: 'Irmã',            emoji: '👧' },
  { en: 'Brother',      pt: 'Irmão',           emoji: '👦' },
  { en: 'Grandmother',  pt: 'Vovó',            emoji: '👵' },
  { en: 'Grandfather',  pt: 'Vovô',            emoji: '👴' },
  { en: 'Apple',        pt: 'Maçã',            emoji: '🍎' },
  { en: 'Water',        pt: 'Água',            emoji: '💧' },
  { en: 'Bread',        pt: 'Pão',             emoji: '🍞' },
  { en: 'Milk',         pt: 'Leite',           emoji: '🥛' },
  { en: 'Head',         pt: 'Cabeça',          emoji: '🗣️' },
  { en: 'Hand',         pt: 'Mão',             emoji: '🖐️' },
  { en: 'Eye',          pt: 'Olho',            emoji: '👁️' },
  { en: 'Nose',         pt: 'Nariz',           emoji: '👃' },
  { en: 'Mouth',        pt: 'Boca',            emoji: '👄' },
  { en: 'Ear',          pt: 'Ouvido',          emoji: '👂' },
  { en: 'Friend',       pt: 'Amigo(a)',        emoji: '🤝' },
  { en: 'House',        pt: 'Casa',            emoji: '🏠' },
  { en: 'Happy',        pt: 'Feliz',           emoji: '😄' },
]

const FRASES_CRI = [
  { frase: 'I ___ a student.', opcoes: ['am', 'is', 'are', 'be'], correta: 0, explicacao: '"I am" — use "am" sempre com "I".' },
  { frase: 'She ___ to school every day.', opcoes: ['go', 'goes', 'going', 'went'], correta: 1, explicacao: 'Com he/she/it, o verbo recebe "s": goes.' },
  { frase: 'They ___ soccer on weekends.', opcoes: ['plays', 'play', 'playing', 'played'], correta: 1, explicacao: 'Com they/we/you/I, o verbo fica na forma base: play.' },
  { frase: 'He ___ a doctor.', opcoes: ['am', 'are', 'is', 'were'], correta: 2, explicacao: '"He is" — use "is" com he/she/it.' },
  { frase: 'We ___ pizza for dinner.', opcoes: ['eats', 'eating', 'eat', 'ate'], correta: 2, explicacao: '"We eat" — com "we", o verbo fica na forma base.' },
  { frase: 'The cat ___ on the chair.', opcoes: ['sit', 'sitting', 'sat', 'sits'], correta: 3, explicacao: 'Animais = he/she/it: "the cat sits".' },
  { frase: 'I ___ English at school.', opcoes: ['studies', 'studying', 'studied', 'study'], correta: 3, explicacao: '"I study" — com "I", verbo na forma base.' },
  { frase: 'She ___ not like vegetables.', opcoes: ['do', 'doing', 'does', 'did'], correta: 2, explicacao: '"She does not" — use "does" com he/she/it para negar.' },
  { frase: 'My friends ___ very smart.', opcoes: ['is', 'am', 'was', 'are'], correta: 3, explicacao: '"My friends are" — sujeito plural, use "are".' },
  { frase: 'The dog ___ fast.', opcoes: ['run', 'running', 'ran', 'runs'], correta: 3, explicacao: '"The dog runs" — sujeito singular: adicione "s".' },
]

const TEXTOS_INV = [
  {
    titulo: 'Artificial Intelligence',
    emoji: '🤖',
    texto: 'Artificial Intelligence (AI) is changing the world rapidly. Computers can now learn from data and make complex decisions without human input. AI is used in medicine to detect diseases earlier, in transportation for self-driving cars, and in education to personalize learning experiences. Scientists believe AI will transform many jobs in the next 20 years. Understanding how AI works is becoming an essential skill for the future generation.',
    perguntas: [
      { p: 'Qual é o tema principal do texto?', ops: ['Carros elétricos', 'Inteligência Artificial', 'Medicina', 'Educação'], c: 1 },
      { p: 'Em quantas áreas a IA é mencionada?', ops: ['2 áreas', '3 áreas', '4 áreas', '5 áreas'], c: 1 },
      { p: 'Qual palavra em inglês significa "aprender"?', ops: ['change', 'detect', 'learn', 'transform'], c: 2 },
      { p: 'Em quantos anos a IA vai transformar empregos?', ops: ['10 anos', '20 anos', '30 anos', '50 anos'], c: 1 },
      { p: '"Essential" em "essential skill" significa:', ops: ['Difícil', 'Opcional', 'Essencial', 'Futura'], c: 2 },
    ],
  },
  {
    titulo: 'Space Exploration',
    emoji: '🚀',
    texto: "Space exploration has always fascinated humanity. In 1969, humans first walked on the Moon during the Apollo 11 mission. Today, scientists are planning missions to Mars and building space stations. Space technology has given us satellites for communication, GPS for navigation, and systems for weather prediction. Private companies like SpaceX are making space travel more accessible and affordable for the future.",
    perguntas: [
      { p: 'Em que ano os humanos pisaram na Lua?', ops: ['1959', '1969', '1979', '1989'], c: 1 },
      { p: 'Qual foi o nome da missão?', ops: ['Apollo 9', 'Apollo 10', 'Apollo 11', 'Apollo 12'], c: 2 },
      { p: 'Para onde os cientistas planejam ir agora?', ops: ['Júpiter', 'Saturno', 'Vênus', 'Marte'], c: 3 },
      { p: 'Qual empresa privada é mencionada?', ops: ['NASA', 'Boeing', 'SpaceX', 'Virgin Galactic'], c: 2 },
      { p: '"Affordable" no texto significa:', ops: ['Impossível', 'Acessível financeiramente', 'Perigoso', 'Lento'], c: 1 },
    ],
  },
]

// ─── Utilidades ──────────────────────────────────────────────────────────────

function falar(texto, lang = 'en-US') {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = lang
  utt.rate = 0.82
  utt.pitch = 1.0
  window.speechSynthesis.speak(utt)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const BG = 'linear-gradient(160deg, #040e1f 0%, #0a2040 100%)'
const ACCENT = '#3B82F6'
const SOFT = '#93C5FD'
const DARK = '#0f172a'

// ─── Modo Vocab (Exploradores) ───────────────────────────────────────────────

function ModoVocab({ atividade, onConcluir }) {
  const vocab = atividade?.dados?.vocab || VOCAB
  const vocabCats = atividade?.dados?.vocab_cats || VOCAB_CATS
  const [cat, setCat] = useState(() => vocabCats[0].id)
  const [ouvidos, setOuvidos] = useState(new Set())
  const [piscando, setPiscando] = useState(null)
  const [concluido, setConcluido] = useState(false)

  const total = Object.values(vocab).reduce((s, v) => s + v.length, 0)
  const progresso = Math.round(ouvidos.size / total * 100)
  const estrelas = ouvidos.size >= total ? 3 : ouvidos.size >= Math.round(total * 0.6) ? 2 : ouvidos.size >= Math.round(total * 0.25) ? 1 : 0

  function tocar(item, catId) {
    const key = `${catId}_${item.en}`
    falar(item.en)
    setPiscando(key)
    setTimeout(() => setPiscando(null), 700)
    setOuvidos(prev => new Set([...prev, key]))
  }

  if (concluido) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
      <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎉</div>
      <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '900', marginBottom: '8px', fontFamily: 'Fredoka One' }}>Ótimo trabalho!</h2>
      <p style={{ color: SOFT, fontSize: '16px', marginBottom: '8px' }}>Você ouviu {ouvidos.size} de {total} palavras em inglês</p>
      <div style={{ fontSize: '32px', marginBottom: '24px' }}>{'⭐'.repeat(estrelas)}{'☆'.repeat(3 - estrelas)}</div>
      <button onClick={() => onConcluir(estrelas)} style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '800', fontSize: '16px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        Ver resultado →
      </button>
    </div>
  )

  const catData = vocab[cat] || []

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '24px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🇺🇸</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '17px' }}>Inglês — Vocabulário</div>
            <div style={{ color: SOFT, fontSize: '13px' }}>Toque na palavra para ouvir em inglês!</div>
          </div>
          <div style={{ background: 'rgba(59,130,246,0.15)', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
            <div style={{ color: ACCENT, fontWeight: '900', fontSize: '18px', fontFamily: 'Space Grotesk' }}>{ouvidos.size}/{total}</div>
            <div style={{ color: SOFT, fontSize: '10px' }}>ouvidas</div>
          </div>
        </div>

        {/* Barra progresso */}
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '8px', marginBottom: '20px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progresso}%`, background: `linear-gradient(90deg, ${ACCENT}, #60a5fa)`, borderRadius: '999px', transition: 'width 0.4s' }} />
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
          {vocabCats.map(c => {
            const ouvidosNaCat = [...ouvidos].filter(k => k.startsWith(c.id + '_')).length
            const totalCat = vocab[c.id]?.length || 0
            const done = ouvidosNaCat === totalCat
            return (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                flexShrink: 0, padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: cat === c.id ? `linear-gradient(135deg, ${ACCENT}, #1d4ed8)` : done ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.07)',
                color: cat === c.id ? 'white' : done ? '#34d399' : SOFT,
                fontWeight: '700', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                {c.emoji} {c.label} {done && '✓'}
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {catData.map((item) => {
            const key = `${cat}_${item.en}`
            const isOuvido = ouvidos.has(key)
            const isPiscando = piscando === key
            return (
              <button key={item.en} onClick={() => tocar(item, cat)} style={{
                background: isPiscando ? `rgba(59,130,246,0.3)` : isOuvido ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                border: isPiscando ? `2px solid ${ACCENT}` : isOuvido ? '1.5px solid rgba(52,211,153,0.4)' : '1.5px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '18px 10px', textAlign: 'center', cursor: 'pointer',
                transform: isPiscando ? 'scale(0.96)' : 'scale(1)',
                transition: 'all 0.15s',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '8px', lineHeight: 1 }}>{item.emoji}</div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '16px', fontFamily: 'Fredoka One', marginBottom: '4px' }}>{item.en}</div>
                <div style={{ color: isOuvido ? '#34d399' : 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{item.pt}</div>
                {isOuvido && <div style={{ marginTop: '6px', fontSize: '12px' }}>🔊</div>}
              </button>
            )
          })}
        </div>

        <button onClick={() => setConcluido(true)} style={{
          width: '100%', background: progresso >= 60 ? `linear-gradient(135deg, ${ACCENT}, #1d4ed8)` : 'rgba(255,255,255,0.08)',
          border: 'none', borderRadius: '14px', padding: '14px', color: progresso >= 60 ? 'white' : 'rgba(255,255,255,0.3)',
          fontWeight: '800', fontSize: '15px', cursor: progresso >= 60 ? 'pointer' : 'default',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          {progresso >= 60 ? 'Concluir atividade →' : `Ouça mais palavras (${progresso}%)`}
        </button>
      </div>
    </div>
  )
}

// ─── Modo Flashcard (Construtores) ──────────────────────────────────────────

function ModoFlashcard({ atividade, onConcluir }) {
  const flashcards = atividade?.dados?.flashcards || FLASHCARDS_CON
  const [fase, setFase] = useState('cards') // cards | quiz | resultado
  const [idx, setIdx] = useState(0)
  const [virado, setVirado] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [resposta, setResposta] = useState(null)
  const [quizCards] = useState(() => shuffle(flashcards).slice(0, Math.min(10, flashcards.length)))

  function gerarOpcoes(card) {
    const outros = flashcards.filter(c => c.en !== card.en)
    const distratores = shuffle(outros).slice(0, 3).map(c => c.en)
    return shuffle([card.en, ...distratores])
  }

  const [opcoes] = useState(() => quizCards.map(c => gerarOpcoes(c)))

  if (fase === 'cards') {
    const card = flashcards[idx]
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ color: SOFT, fontSize: '14px', fontWeight: '700' }}>🃏 Flashcards</div>
            <div style={{ color: SOFT, fontSize: '13px' }}>{idx + 1} / {flashcards.length}</div>
          </div>

          {/* Flashcard */}
          <div onClick={() => { setVirado(!virado); if (!virado) falar(card.en) }} style={{
            width: '100%', minHeight: '220px', borderRadius: '24px', cursor: 'pointer',
            background: virado ? `linear-gradient(135deg, ${ACCENT}33, #1d4ed833)` : 'rgba(255,255,255,0.07)',
            border: virado ? `2px solid ${ACCENT}66` : '2px solid rgba(255,255,255,0.12)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '32px', textAlign: 'center', marginBottom: '20px', transition: 'all 0.3s',
          }}>
            <div style={{ fontSize: '52px', marginBottom: '16px' }}>{card.emoji}</div>
            {!virado ? (
              <>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '8px' }}>Português</div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: '900', fontFamily: 'Fredoka One' }}>{card.pt}</div>
                <div style={{ color: SOFT, fontSize: '12px', marginTop: '16px' }}>Toque para ver em inglês</div>
              </>
            ) : (
              <>
                <div style={{ color: SOFT, fontSize: '13px', marginBottom: '8px' }}>English</div>
                <div style={{ color: 'white', fontSize: '28px', fontWeight: '900', fontFamily: 'Fredoka One' }}>{card.en}</div>
                <div style={{ color: '#34d399', fontSize: '12px', marginTop: '16px' }}>🔊 Ouvindo...</div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setIdx(Math.max(0, idx - 1)); setVirado(false) }}
              disabled={idx === 0}
              style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '12px', padding: '12px', color: idx === 0 ? 'rgba(255,255,255,0.2)' : 'white', cursor: idx === 0 ? 'default' : 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              ← Anterior
            </button>
            {idx < flashcards.length - 1 ? (
              <button onClick={() => { setIdx(idx + 1); setVirado(false) }}
                style={{ flex: 2, background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Próximo →
              </button>
            ) : (
              <button onClick={() => { setFase('quiz'); setIdx(0) }}
                style={{ flex: 2, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Mini Quiz! 🎯
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (fase === 'quiz') {
    if (idx >= quizCards.length) {
      const estrelas = acertos >= 9 ? 3 : acertos >= 7 ? 2 : 1
      return (
        <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>🏆</div>
          <h2 style={{ color: 'white', fontSize: '26px', fontWeight: '900', marginBottom: '8px', fontFamily: 'Fredoka One' }}>Mini Quiz concluído!</h2>
          <p style={{ color: SOFT, fontSize: '15px', marginBottom: '8px' }}>{acertos} de {quizCards.length} acertos</p>
          <div style={{ fontSize: '32px', marginBottom: '24px' }}>{'⭐'.repeat(estrelas)}{'☆'.repeat(3 - estrelas)}</div>
          <button onClick={() => onConcluir(estrelas)} style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Ver resultado →
          </button>
        </div>
      )
    }

    const card = quizCards[idx]
    const opts = opcoes[idx]
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ color: SOFT, fontSize: '14px', fontWeight: '700' }}>🎯 Quiz {idx + 1}/{quizCards.length}</div>
            <div style={{ color: '#34d399', fontSize: '13px', fontWeight: '700' }}>✓ {acertos}</div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '52px', marginBottom: '12px' }}>{card.emoji}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '6px' }}>Como se diz em inglês?</div>
            <div style={{ color: 'white', fontSize: '22px', fontWeight: '900', fontFamily: 'Fredoka One' }}>{card.pt}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {opts.map(op => {
              const isCorreta = op === card.en
              let bg = 'rgba(255,255,255,0.07)'
              let border = '1.5px solid rgba(255,255,255,0.12)'
              let color = 'white'
              if (resposta !== null) {
                if (isCorreta) { bg = 'rgba(16,185,129,0.2)'; border = '1.5px solid #34d399'; color = '#34d399' }
                else if (op === resposta) { bg = 'rgba(239,68,68,0.15)'; border = '1.5px solid rgba(239,68,68,0.5)'; color = '#fca5a5' }
              }
              return (
                <button key={op} onClick={() => {
                  if (resposta !== null) return
                  setResposta(op)
                  if (isCorreta) { setAcertos(a => a + 1); falar(op) }
                  setTimeout(() => { setIdx(i => i + 1); setResposta(null) }, 1200)
                }} style={{
                  background: bg, border, borderRadius: '12px', padding: '14px 18px',
                  color, fontWeight: '700', fontSize: '15px', cursor: resposta !== null ? 'default' : 'pointer',
                  textAlign: 'left', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
                }}>
                  {op}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return null
}

// ─── Modo Frases (Criadores) ─────────────────────────────────────────────────

function ModoFrases({ atividade, onConcluir }) {
  const frases = atividade?.dados?.frases || FRASES_CRI
  const [idx, setIdx] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [resposta, setResposta] = useState(null)
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false)

  const exercicio = frases[idx]

  if (idx >= frases.length) {
    const estrelas = acertos >= 9 ? 3 : acertos >= 7 ? 2 : acertos >= 5 ? 1 : 1
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎓</div>
        <h2 style={{ color: 'white', fontSize: '26px', fontWeight: '900', marginBottom: '8px', fontFamily: 'Fredoka One' }}>Gramática concluída!</h2>
        <p style={{ color: SOFT, fontSize: '15px', marginBottom: '8px' }}>{acertos} de {frases.length} corretas</p>
        <div style={{ fontSize: '32px', marginBottom: '24px' }}>{'⭐'.repeat(estrelas)}{'☆'.repeat(3 - estrelas)}</div>
        <button onClick={() => onConcluir(estrelas)} style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Ver resultado →
        </button>
      </div>
    )
  }

  const partes = exercicio.frase.split('___')
  const acertou = resposta === exercicio.opcoes[exercicio.correta]

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ color: SOFT, fontSize: '14px', fontWeight: '700' }}>📝 Exercício {idx + 1}/{frases.length}</div>
          <div style={{ color: '#34d399', fontSize: '13px', fontWeight: '700' }}>✓ {acertos}</div>
        </div>

        {/* Barra */}
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '6px', marginBottom: '32px' }}>
          <div style={{ height: '100%', width: `${(idx / frases.length) * 100}%`, background: `linear-gradient(90deg, ${ACCENT}, #60a5fa)`, borderRadius: '999px', transition: 'width 0.4s' }} />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '16px' }}>Complete a frase em inglês:</div>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: '700', lineHeight: 1.6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {partes[0]}
            <span style={{
              display: 'inline-block', minWidth: '80px', borderBottom: `2px solid ${resposta ? (acertou ? '#34d399' : '#ef4444') : ACCENT}`,
              color: resposta ? (acertou ? '#34d399' : '#ef4444') : SOFT, fontWeight: '900', textAlign: 'center', marginInline: '6px', padding: '0 8px',
            }}>
              {resposta || '______'}
            </span>
            {partes[1]}
          </div>
        </div>

        {/* Opções */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {exercicio.opcoes.map(op => {
            const isCorreta = op === exercicio.opcoes[exercicio.correta]
            let bg = 'rgba(255,255,255,0.07)'
            let border = '1.5px solid rgba(255,255,255,0.12)'
            let color = 'white'
            if (resposta !== null) {
              if (isCorreta) { bg = 'rgba(16,185,129,0.2)'; border = '1.5px solid #34d399'; color = '#34d399' }
              else if (op === resposta && !acertou) { bg = 'rgba(239,68,68,0.15)'; border = '1.5px solid rgba(239,68,68,0.5)'; color = '#fca5a5' }
            }
            return (
              <button key={op} onClick={() => {
                if (resposta !== null) return
                setResposta(op)
                if (op === exercicio.opcoes[exercicio.correta]) setAcertos(a => a + 1)
                setMostrarExplicacao(true)
              }} style={{
                background: bg, border, borderRadius: '12px', padding: '14px',
                color, fontWeight: '800', fontSize: '17px', cursor: resposta !== null ? 'default' : 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
              }}>
                {op}
              </button>
            )
          })}
        </div>

        {mostrarExplicacao && (
          <div style={{
            background: acertou ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
            border: `1px solid ${acertou ? 'rgba(52,211,153,0.3)' : 'rgba(59,130,246,0.3)'}`,
            borderRadius: '12px', padding: '14px 16px', marginBottom: '16px',
          }}>
            <div style={{ color: acertou ? '#34d399' : '#60a5fa', fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>
              {acertou ? '✅ Correto!' : `❌ A resposta correta é: "${exercicio.opcoes[exercicio.correta]}"`}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{exercicio.explicacao}</div>
          </div>
        )}

        {resposta !== null && (
          <button onClick={() => { setIdx(i => i + 1); setResposta(null); setMostrarExplicacao(false) }}
            style={{ width: '100%', background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '12px', padding: '14px', color: 'white', fontWeight: '700', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {idx + 1 < frases.length ? 'Próxima →' : 'Ver resultado →'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Modo Leitura (Inventores) ───────────────────────────────────────────────

function ModoLeitura({ atividade, onConcluir }) {
  const textos = atividade?.dados?.textos || TEXTOS_INV
  const [textoIdx, setTextoIdx] = useState(0)
  const [fase, setFase] = useState('leitura') // leitura | quiz
  const [qIdx, setQIdx] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [resposta, setResposta] = useState(null)
  const [lidos, setLidos] = useState(new Set())

  const texto = textos[textoIdx]
  const totalPerguntas = textos.reduce((s, t) => s + t.perguntas.length, 0)

  if (textoIdx >= textos.length) {
    const estrelas = acertos >= totalPerguntas - 1 ? 3 : acertos >= Math.round(totalPerguntas * 0.7) ? 2 : 1
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>📖</div>
        <h2 style={{ color: 'white', fontSize: '26px', fontWeight: '900', marginBottom: '8px', fontFamily: 'Fredoka One' }}>Reading completo!</h2>
        <p style={{ color: SOFT, fontSize: '15px', marginBottom: '4px' }}>{acertos} de {totalPerguntas} questões corretas</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '16px' }}>2 textos lidos em inglês</p>
        <div style={{ fontSize: '32px', marginBottom: '24px' }}>{'⭐'.repeat(estrelas)}{'☆'.repeat(3 - estrelas)}</div>
        <button onClick={() => onConcluir(estrelas)} style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Ver resultado →
        </button>
      </div>
    )
  }

  if (fase === 'leitura') {
    return (
      <div style={{ minHeight: '100vh', background: BG, padding: '28px 24px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ fontSize: '40px' }}>{texto.emoji}</div>
            <div>
              <div style={{ color: SOFT, fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>TEXTO {textoIdx + 1} DE {textos.length}</div>
              <div style={{ color: 'white', fontWeight: '900', fontSize: '20px', fontFamily: 'Fredoka One' }}>{texto.titulo}</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', marginBottom: '24px' }}>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', marginBottom: '14px' }}>LEIA COM ATENÇÃO</div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: '1.8', fontFamily: 'Plus Jakarta Sans, sans-serif', margin: 0 }}>
              {texto.texto}
            </p>
          </div>

          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px' }}>
            <div style={{ color: SOFT, fontSize: '13px' }}>💡 Dica: Leia devagar e procure as palavras-chave. Você não precisa entender tudo — foque nas informações principais!</div>
          </div>

          <button onClick={() => { setFase('quiz'); setQIdx(0) }} style={{
            width: '100%', background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`,
            border: 'none', borderRadius: '14px', padding: '14px', color: 'white',
            fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            Responder perguntas →
          </button>
        </div>
      </div>
    )
  }

  // Quiz de compreensão
  if (qIdx >= texto.perguntas.length) {
    const proximo = () => {
      setTextoIdx(t => t + 1)
      setFase('leitura')
      setQIdx(0)
      setResposta(null)
    }
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
        <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '8px', fontFamily: 'Fredoka One' }}>Texto {textoIdx + 1} concluído!</h3>
        <p style={{ color: SOFT, marginBottom: '24px', fontSize: '14px' }}>
          {textoIdx + 1 < textos.length ? 'Próximo texto...' : 'Todos os textos lidos!'}
        </p>
        <button onClick={proximo} style={{ background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {textoIdx + 1 < textos.length ? 'Próximo texto →' : 'Ver resultado →'}
        </button>
      </div>
    )
  }

  const q = texto.perguntas[qIdx]
  const acertou = resposta === q.ops[q.c]

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ color: SOFT, fontSize: '13px', fontWeight: '700' }}>{texto.titulo} — Pergunta {qIdx + 1}/{texto.perguntas.length}</div>
          <div style={{ color: '#34d399', fontSize: '13px', fontWeight: '700' }}>✓ {acertos}</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ color: 'white', fontWeight: '700', fontSize: '16px', lineHeight: 1.5 }}>{q.p}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {q.ops.map(op => {
            const isCorreta = op === q.ops[q.c]
            let bg = 'rgba(255,255,255,0.07)'
            let border = '1.5px solid rgba(255,255,255,0.12)'
            let color = 'white'
            if (resposta !== null) {
              if (isCorreta) { bg = 'rgba(16,185,129,0.2)'; border = '1.5px solid #34d399'; color = '#34d399' }
              else if (op === resposta) { bg = 'rgba(239,68,68,0.15)'; border = '1.5px solid rgba(239,68,68,0.5)'; color = '#fca5a5' }
            }
            return (
              <button key={op} onClick={() => {
                if (resposta !== null) return
                setResposta(op)
                if (isCorreta) setAcertos(a => a + 1)
              }} style={{
                background: bg, border, borderRadius: '12px', padding: '13px 16px',
                color, fontWeight: '600', fontSize: '14px', cursor: resposta !== null ? 'default' : 'pointer',
                textAlign: 'left', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
              }}>
                {op}
              </button>
            )
          })}
        </div>

        {resposta !== null && (
          <button onClick={() => { setQIdx(i => i + 1); setResposta(null) }}
            style={{ width: '100%', background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`, border: 'none', borderRadius: '12px', padding: '13px', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {qIdx + 1 < texto.perguntas.length ? 'Próxima pergunta →' : 'Concluir texto →'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function InglesAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade || { id: 'exp_ingles', tipo: 'ingles', titulo: 'Inglês', xp_reward: 70, coins_reward: 70, emoji: '🇺🇸' }

  const [iniciou, setIniciou] = useState(false)

  const prefixo = atividade.id?.split('_')[0] || 'exp'

  const atividadeIntro = {
    ...atividade,
    historinha: prefixo === 'exp'
      ? 'Vamos aprender palavras em inglês! 🇺🇸 Toque em cada cartão para ouvir como a palavra soa em inglês. Cores, animais, números e cumprimentos — você vai arrasar!'
      : prefixo === 'con'
      ? 'Hora de praticar inglês com flashcards! 🃏 Veja a palavra em português, vire o cartão para descobrir como se diz em inglês e depois teste seus conhecimentos no mini quiz!'
      : prefixo === 'cri'
      ? 'Vamos aprender gramática em inglês! 📝 Complete as frases escolhendo o verbo correto e descubra as regras do presente simples de forma divertida!'
      : 'Leia textos reais em inglês e teste sua compreensão! 📖 Você vai conhecer vocabulário avançado sobre Inteligência Artificial e Exploração Espacial.',
  }

  function concluir(estrelas) {
    navigate('/encerramento', {
      state: {
        titulo: atividade.titulo || 'Inglês',
        xp: atividade.xp_reward || 80,
        coins: atividade.coins_reward || 80,
        emoji: atividade.emoji || '🇺🇸',
        tipo: 'ingles',
        atividade_id: atividade.id,
        estrelas,
      },
    })
  }

  if (!iniciou) return (
    <IntroAtividade
      atividade={atividadeIntro}
      tipo="ingles"
      onComecar={() => setIniciou(true)}
      onVoltar={() => navigate(-1)}
    />
  )

  if (prefixo === 'exp') return <ModoVocab atividade={atividade} onConcluir={concluir} />
  if (prefixo === 'con') return <ModoFlashcard atividade={atividade} onConcluir={concluir} />
  if (prefixo === 'cri') return <ModoFrases atividade={atividade} onConcluir={concluir} />
  return <ModoLeitura atividade={atividade} onConcluir={concluir} />
}
