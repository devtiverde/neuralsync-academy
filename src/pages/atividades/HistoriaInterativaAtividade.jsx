import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

const ATIVIDADE = {
  id: 'historia-interativa',
  tipo: 'historia-interativa',
  emoji: '📖',
  titulo: 'Crie a História',
  habilidade: 'Linguagem e Criatividade',
  historinha: 'Você é o autor! Cada escolha que fizer vai mudar o rumo da aventura. Que tipo de herói você vai ser?',
  tempo_estimado: 6,
  xp_reward: 120,
  coins_reward: 25,
}

// ── CSS animations injected once ─────────────────────────────────────────────
const ANIM_CSS = `
@keyframes ns-hi-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
  50%       { transform: translateY(-18px) rotate(5deg); opacity: 0.15; }
}
@keyframes ns-hi-bounce {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-8px) scale(1.05); }
}
@keyframes ns-hi-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.08); opacity: 0.85; }
}
@keyframes ns-hi-confetti {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}
@keyframes ns-hi-badge-in {
  0%   { transform: scale(0.8) translateY(8px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
`

// ── Story data ────────────────────────────────────────────────────────────────
const HISTORIAS = {
  'floresta-magica': {
    titulo: 'A Floresta Mágica',
    emoji: '🌲',
    nos: {
      'inicio': {
        texto: 'Luna entrou na floresta encantada e encontrou um cofre misterioso com dois cadeados diferentes. O que ela deve fazer?',
        emoji: '🗝️',
        escolhas: [
          { texto: 'Abrir o cadeado dourado', proximo: 'cadeado-dourado' },
          { texto: 'Procurar a chave primeiro', proximo: 'procura-chave' },
          { texto: 'Pedir ajuda à coruja', proximo: 'ajuda-coruja' },
        ],
      },
      'cadeado-dourado': {
        texto: 'O cadeado dourado abriu fácil! Dentro havia um mapa brilhante do tesouro. O mapa mostra dois caminhos que levam em direções opostas da floresta.',
        emoji: '🗺️',
        escolhas: [
          { texto: 'Seguir o caminho da floresta', proximo: 'caminho-floresta' },
          { texto: 'Seguir o caminho da montanha', proximo: 'caminho-montanha' },
        ],
      },
      'procura-chave': {
        texto: 'Luna procurou com cuidado e encontrou uma chave de prata brilhante debaixo de uma pedra coberta de musgo. Mas ao se levantar, avistou pegadas estranhas na lama.',
        emoji: '🔑',
        escolhas: [
          { texto: 'Abrir o cofre com a chave', proximo: 'cofre-aberto' },
          { texto: 'Seguir as pegadas primeiro', proximo: 'seguir-pegadas' },
        ],
      },
      'ajuda-coruja': {
        texto: 'A coruja sábia piscou seus olhos dourados e disse: "O cofre guarda magia antiga. Você precisa cantar a música da floresta para abri-lo." Luna respirou fundo e cantou.',
        emoji: '🦉',
        escolhas: [
          { texto: 'O cofre abriu com a música!', proximo: 'cofre-musica' },
          { texto: 'Tentar outra melodia', proximo: 'outra-melodia' },
        ],
      },
      'caminho-floresta': {
        texto: 'No coração da floresta, Luna encontrou um vilarejo de fadas que precisavam de ajuda para encontrar suas flores perdidas. As fadas choravam baixinho entre as raízes das árvores.',
        emoji: '🧚',
        escolhas: [
          { texto: 'Ajudar as fadas a encontrar as flores', proximo: 'fim-heroi' },
          { texto: 'Continuar em busca do tesouro', proximo: 'fim-aventureiro' },
        ],
      },
      'caminho-montanha': {
        texto: 'Luna subiu a montanha pedregosa e encontrou um sábio ancião sentado numa pedra plana, rodeado de livros abertos. Ele sorriu e disse: "Eu esperava por você, exploradora."',
        emoji: '⛰️',
        escolhas: [
          { texto: 'Aprender o segredo com o sábio', proximo: 'fim-sabio' },
        ],
      },
      'cofre-aberto': {
        texto: 'Com a chave de prata, o cofre se abriu lentamente revelando um jardim minúsculo dentro de uma caixinha de cristal. Dentro havia sementes encantadas que poderiam fazer a floresta florescer para sempre.',
        emoji: '📦',
        escolhas: [
          { texto: 'Plantar as sementes mágicas', proximo: 'fim-heroi' },
        ],
      },
      'seguir-pegadas': {
        texto: 'As pegadas levaram Luna até uma clareira onde um filhote de lobo estava tremendo sozinho, perdido da sua família. Seus olhos brilhavam de medo e esperança ao mesmo tempo.',
        emoji: '👣',
        escolhas: [
          { texto: 'Ajudar o filhote a encontrar sua família', proximo: 'fim-heroi' },
          { texto: 'Marcar o lugar e voltar para o cofre', proximo: 'fim-aventureiro' },
        ],
      },
      'cofre-musica': {
        texto: 'Com a melodia certa, o cofre vibrou com uma luz dourada e se abriu! Dentro havia uma varinha que brilhava com todas as cores do arco-íris. Era o poder da floresta encantada, guardado por séculos.',
        emoji: '🎵',
        escolhas: [
          { texto: 'Usar a varinha para proteger a floresta', proximo: 'fim-sabio' },
        ],
      },
      'outra-melodia': {
        texto: 'Luna tentou uma melodia mais suave, como o vento entre as folhas. O cofre respondeu com uma luz suave e se abriu revelando um cristal que guardava todo o conhecimento da floresta encantada.',
        emoji: '🎶',
        escolhas: [
          { texto: 'Guardar o cristal e proteger seus segredos', proximo: 'fim-heroi' },
        ],
      },
      'fim-heroi': {
        texto: 'Luna usou todo o poder que encontrou para ajudar as criaturas da floresta. Os animais a elegeram guardiã das criaturas mágicas, e a floresta ficou mais viva e colorida do que nunca!',
        emoji: '🏆',
        ehFinal: true,
        tipoFinal: 'heroi',
        mensagemFinal: 'Você é um Coração Generoso! Sempre pensa nos outros primeiro.',
      },
      'fim-aventureiro': {
        texto: 'Luna encontrou o tesouro e descobriu que era um portal para mundos mágicos! Sua coragem inabalável a levou a aventuras em lugares que nenhum humano havia visitado antes.',
        emoji: '🌟',
        ehFinal: true,
        tipoFinal: 'aventureiro',
        mensagemFinal: 'Você é um Espírito Aventureiro! Corajoso e sempre pronto para o desconhecido.',
      },
      'fim-sabio': {
        texto: 'Luna aprendeu o segredo mais profundo da floresta: o verdadeiro tesouro era o conhecimento guardado nos livros do cofre mágico. Com ele, ela ajudou toda a floresta a prosperar.',
        emoji: '📚',
        ehFinal: true,
        tipoFinal: 'sabio',
        mensagemFinal: 'Você é uma Mente Sábia! Pensa antes de agir e busca sempre aprender.',
      },
    },
  },
  'viagem-espacial': {
    titulo: 'Viagem Espacial',
    emoji: '🚀',
    nos: {
      'inicio': {
        texto: 'O astronauta Zito estava explorando o espaço quando seu foguete detectou um planeta desconhecido com sinais de vida inteligente. O que ele deve fazer?',
        emoji: '🌍',
        escolhas: [
          { texto: 'Pousar no planeta', proximo: 'pousar' },
          { texto: 'Observar de longe primeiro', proximo: 'observar' },
          { texto: 'Mandar uma mensagem', proximo: 'mensagem' },
        ],
      },
      'pousar': {
        texto: 'Ao pousar, Zito encontrou criaturas azuis com olhos brilhantes que nunca tinham visto um humano antes. Elas olhavam para ele com curiosidade e estenderam as mãos em sinal de paz.',
        emoji: '👽',
        escolhas: [
          { texto: 'Cumprimentar e tentar se comunicar', proximo: 'fim-explorador' },
          { texto: 'Oferecer comida da espaçonave', proximo: 'fim-amigo' },
        ],
      },
      'observar': {
        texto: 'Com seu telescópio de precisão, Zito estudou o planeta por horas. Descobriu que seus habitantes viviam em harmonia com a natureza e possuíam uma tecnologia incrível baseada em energia solar das três luas do planeta.',
        emoji: '🔭',
        escolhas: [
          { texto: 'Pousar para conhecer de perto', proximo: 'fim-cientista' },
          { texto: 'Documentar tudo e compartilhar com a Terra', proximo: 'fim-cientista' },
        ],
      },
      'mensagem': {
        texto: 'Zito configurou o comunicador universal e enviou uma sequência matemática — padrões de números primos que qualquer civilização inteligente poderia reconhecer. Em minutos, recebeu uma resposta amigável com padrões de luz!',
        emoji: '📡',
        escolhas: [
          { texto: 'Responder e iniciar o diálogo', proximo: 'fim-explorador' },
        ],
      },
      'fim-explorador': {
        texto: 'Zito se tornou o primeiro humano a fazer contato amigável com extraterrestres! As duas civilizações abriram uma rota de comunicação que mudou para sempre a história da humanidade.',
        emoji: '🌌',
        ehFinal: true,
        tipoFinal: 'explorador',
        mensagemFinal: 'Você é um Explorador Corajoso! Vai onde ninguém foi antes e abre novos caminhos.',
      },
      'fim-amigo': {
        texto: 'Os alienígenas adoraram o gesto caloroso de Zito e compartilharam em troca sua tecnologia de energia limpa com a humanidade. Um simples gesto de amizade aproximou dois mundos para sempre.',
        emoji: '🤝',
        ehFinal: true,
        tipoFinal: 'amigo',
        mensagemFinal: 'Você é um Construtor de Amizades! Une mundos diferentes com bondade e generosidade.',
      },
      'fim-cientista': {
        texto: 'Zito documentou cada detalhe com rigor científico e voltou para a Terra com dados que mudaram para sempre o entendimento da humanidade sobre vida no universo. Sua paciência valeu mais que qualquer pressa.',
        emoji: '🔬',
        ehFinal: true,
        tipoFinal: 'cientista',
        mensagemFinal: 'Você é um Cientista Curioso! Observa, aprende e transforma conhecimento em progresso.',
      },
    },
  },
}

const CONFETTI_CORES = ['#7C3AED','#F97316','#06B6D4','#10B981','#F59E0B','#EF4444','#8B5CF6','#3B82F6']

function falar(texto) {
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'pt-BR'; utt.rate = 0.85; utt.pitch = 1.1
  window.speechSynthesis.speak(utt)
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HistoriaInterativaAtividade() {
  const navigate = useNavigate()
  const { user }  = useAuth()
  const styleRef  = useRef(null)

  const [iniciou,          setIniciou]          = useState(false)
  const [fase,             setFase]             = useState('selecao')   // selecao | capitulo | final
  const [historiaId,       setHistoriaId]       = useState(null)
  const [noId,             setNoId]             = useState('inicio')
  const [historicoEscolhas,setHistoricoEscolhas]= useState([])
  const [narrando,         setNarrando]         = useState(false)

  // Inject keyframes once
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = ANIM_CSS
    document.head.appendChild(style)
    styleRef.current = style
    return () => { if (styleRef.current) document.head.removeChild(styleRef.current) }
  }, [])

  const historia = historiaId ? HISTORIAS[historiaId] : null
  const noAtual  = historia  ? historia.nos[noId]     : null

  const escolher = useCallback((escolha) => {
    window.speechSynthesis.cancel()
    setNarrando(false)
    setHistoricoEscolhas(prev => [...prev, { noId, escolhaTexto: escolha.texto }])
    setNoId(escolha.proximo)
    if (historia?.nos[escolha.proximo]?.ehFinal) setFase('final')
    else setFase('capitulo')
  }, [noId, historia])

  const salvarResultado = useCallback(async () => {
    if (!user || !noAtual) return
    try {
      await supabase.from('historias_jogadas').insert({
        user_id: user.id,
        historia_id: historiaId,
        tipo_final: noAtual.tipoFinal,
        total_escolhas: historicoEscolhas.length,
        completed_at: new Date().toISOString(),
      })
    } catch (e) {
      console.log('historias_jogadas:', e.message)
    }
  }, [user, noAtual, historiaId, historicoEscolhas])

  useEffect(() => {
    if (fase === 'final') salvarResultado()
  }, [fase]) // eslint-disable-line

  if (!iniciou) {
    return <IntroAtividade atividade={ATIVIDADE} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/home-crianca')} />
  }

  /* ── SELEÇÃO DE HISTÓRIA ── */
  if (fase === 'selecao') return (
    <div style={{ minHeight: '100vh', background: '#0f0a1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Nunito, sans-serif' }}>
      <h2 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 30, marginBottom: 8, textAlign: 'center' }}>Qual aventura você quer viver?</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 36, textAlign: 'center' }}>Suas escolhas mudam o final da história!</p>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(HISTORIAS).map(([key, h]) => {
          const primeirasLinhas = h.nos['inicio'].texto.slice(0, 90) + '...'
          return (
            <div key={key} style={{ width: 260, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 56, textAlign: 'center' }}>{h.emoji}</div>
              <h3 style={{ color: 'white', fontFamily: 'Fredoka One, cursive', fontSize: 20, textAlign: 'center', margin: 0 }}>{h.titulo}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6, textAlign: 'center', margin: 0 }}>{primeirasLinhas}</p>
              <button
                onClick={() => { setHistoriaId(key); setNoId('inicio'); setHistoricoEscolhas([]); setFase('capitulo') }}
                style={{ background: '#7C3AED', color: 'white', border: 'none', borderRadius: 14, padding: '12px 24px', fontSize: 16, fontFamily: 'Fredoka One, cursive', cursor: 'pointer', marginTop: 4 }}
              >
                Começar aventura →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  /* ── CAPÍTULO ── */
  if (fase === 'capitulo' && noAtual) {
    const particulas = Array.from({ length: 10 }, (_, i) => ({
      left: `${5 + i * 9}%`,
      top:  `${10 + (i % 3) * 20}%`,
      size: 8 + (i % 3) * 6,
      dur:  3 + (i % 4),
      delay: i * 0.3,
    }))

    return (
      <div style={{ minHeight: '100vh', background: '#0f0a1e', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', fontFamily: 'Nunito, sans-serif' }}>
        {/* Floating particles */}
        {particulas.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: p.left, top: p.top,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(124,58,237,0.3)' : 'rgba(249,115,22,0.2)',
            animation: `ns-hi-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, zIndex: 1 }}>
          {historicoEscolhas.map((_, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#7C3AED' }} />
          ))}
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(124,58,237,0.5)' }} />
        </div>

        {/* Emoji */}
        <div style={{ fontSize: 80, marginBottom: 24, animation: 'ns-hi-bounce 2.5s ease-in-out infinite', zIndex: 1 }}>
          {noAtual.emoji}
        </div>

        {/* Text */}
        <p style={{ color: 'white', fontSize: 18, lineHeight: 1.8, maxWidth: 520, textAlign: 'center', marginBottom: 32, zIndex: 1, fontFamily: 'Nunito, sans-serif' }}>
          {noAtual.texto}
        </p>

        {/* Narrate button */}
        <button
          onClick={() => { falar(noAtual.texto); setNarrando(true) }}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 16px', fontSize: 13, cursor: 'pointer', marginBottom: 28, fontFamily: 'Nunito, sans-serif' }}
        >
          🔊 Ouvir narração
        </button>

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480, zIndex: 1 }}>
          {noAtual.escolhas.map((escolha, i) => (
            <button
              key={i}
              onClick={() => escolher(escolha)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 16,
                padding: '16px 20px',
                color: 'white',
                fontSize: 16,
                fontFamily: 'Nunito, sans-serif',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background .15s, border-color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.borderColor = '#7C3AED' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              {escolha.texto}
            </button>
          ))}
        </div>
      </div>
    )
  }

  /* ── FINAL ── */
  if (fase === 'final' && noAtual) {
    const confettiPieces = Array.from({ length: 8 }, (_, i) => ({
      left:  `${5 + i * 12}%`,
      color: CONFETTI_CORES[i % CONFETTI_CORES.length],
      dur:   2.5 + (i % 3) * 0.5,
      delay: i * 0.2,
      size:  10 + (i % 4) * 4,
    }))

    return (
      <div style={{ minHeight: '100vh', background: '#0f0a1e', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', fontFamily: 'Nunito, sans-serif' }}>
        {/* Confetti */}
        {confettiPieces.map((p, i) => (
          <div key={i} style={{
            position: 'fixed', left: p.left, top: -20,
            width: p.size, height: p.size * 0.6,
            background: p.color, borderRadius: 2,
            animation: `ns-hi-confetti ${p.dur}s linear ${p.delay}s infinite`,
            pointerEvents: 'none', zIndex: 0,
          }} />
        ))}

        {/* Emoji final */}
        <div style={{ fontSize: 100, marginBottom: 20, animation: 'ns-hi-pulse 2s ease-in-out infinite', zIndex: 1 }}>
          {noAtual.emoji}
        </div>

        {/* Tipo final */}
        <div style={{ color: '#F59E0B', fontFamily: 'Fredoka One, cursive', fontSize: 28, marginBottom: 12, textAlign: 'center', zIndex: 1 }}>
          {noAtual.tipoFinal === 'heroi'       ? '🏆 Coração Generoso'      :
           noAtual.tipoFinal === 'aventureiro' ? '🌟 Espírito Aventureiro'  :
           noAtual.tipoFinal === 'sabio'       ? '📚 Mente Sábia'           :
           noAtual.tipoFinal === 'explorador'  ? '🌌 Explorador Corajoso'   :
           noAtual.tipoFinal === 'amigo'       ? '🤝 Construtor de Amizades':
                                                 '🔬 Cientista Curioso'}
        </div>

        {/* Final text */}
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.7, maxWidth: 480, textAlign: 'center', marginBottom: 16, zIndex: 1 }}>
          {noAtual.texto}
        </p>

        {/* Mensagem final */}
        <p style={{ color: '#a78bfa', fontSize: 15, fontStyle: 'italic', textAlign: 'center', maxWidth: 400, marginBottom: 28, zIndex: 1 }}>
          "{noAtual.mensagemFinal}"
        </p>

        {/* Badges de escolhas */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32, zIndex: 1 }}>
          {historicoEscolhas.map((e, i) => (
            <div key={i} style={{
              background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.5)',
              borderRadius: 20, padding: '6px 14px', color: '#c4b5fd', fontSize: 13,
              animation: `ns-hi-badge-in 0.4s ease ${i * 0.1}s both`,
            }}>
              {e.escolhaTexto}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
          <button
            onClick={() => { window.speechSynthesis.cancel(); setNoId('inicio'); setHistoricoEscolhas([]); setFase('selecao') }}
            style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '14px 28px', fontSize: 16, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}
          >
            🔄 Recomeçar
          </button>
          <button
            onClick={() => {
              window.speechSynthesis.cancel()
              navigate('/encerramento', {
                state: {
                  xp: ATIVIDADE.xp_reward,
                  coins: ATIVIDADE.coins_reward,
                  titulo: ATIVIDADE.titulo,
                  emoji: ATIVIDADE.emoji,
                  tipo: ATIVIDADE.tipo,
                  atividade_id: ATIVIDADE.id,
                }
              })
            }}
            style={{ background: '#7C3AED', color: 'white', border: 'none', borderRadius: 14, padding: '14px 28px', fontSize: 16, fontFamily: 'Fredoka One, cursive', cursor: 'pointer' }}
          >
            Ver meu resultado →
          </button>
        </div>
      </div>
    )
  }

  return null
}
