import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'

const ATIVIDADE = {
  id: 'classificar-objetos',
  tipo: 'classificar-objetos',
  emoji: '📦',
  titulo: 'Organizar e Classificar',
  habilidade: 'Pensamento Lógico',
  historinha: 'O depósito do inventor ficou uma bagunça! Ajude a separar cada objeto no lugar certo para a fábrica voltar a funcionar.',
  tempo_estimado: 4,
  xp_reward: 85,
  coins_reward: 15,
}

const ROUNDS = [
  {
    criterio: 'Separe por tipo',
    categorias: ['Animais', 'Frutas', 'Veículos'],
    objetos: [
      { id: 1, emoji: '🐶', categoria: 'Animais'  },
      { id: 2, emoji: '🍎', categoria: 'Frutas'   },
      { id: 3, emoji: '🚗', categoria: 'Veículos' },
      { id: 4, emoji: '🐱', categoria: 'Animais'  },
      { id: 5, emoji: '🍌', categoria: 'Frutas'   },
      { id: 6, emoji: '✈️', categoria: 'Veículos' },
      { id: 7, emoji: '🐸', categoria: 'Animais'  },
      { id: 8, emoji: '🍇', categoria: 'Frutas'   },
    ],
  },
  {
    criterio: 'Separe por cor',
    categorias: ['Vermelho', 'Amarelo', 'Verde'],
    objetos: [
      { id: 1, emoji: '🍎', categoria: 'Vermelho' },
      { id: 2, emoji: '🌹', categoria: 'Vermelho' },
      { id: 3, emoji: '🍋', categoria: 'Amarelo'  },
      { id: 4, emoji: '⭐', categoria: 'Amarelo'  },
      { id: 5, emoji: '🌿', categoria: 'Verde'    },
      { id: 6, emoji: '🐸', categoria: 'Verde'    },
      { id: 7, emoji: '🚒', categoria: 'Vermelho' },
      { id: 8, emoji: '🍌', categoria: 'Amarelo'  },
    ],
  },
  {
    criterio: 'Separe por tamanho',
    categorias: ['Pequeno', 'Médio', 'Grande'],
    objetos: [
      { id: 1, emoji: '🐜', categoria: 'Pequeno' },
      { id: 2, emoji: '🐝', categoria: 'Pequeno' },
      { id: 3, emoji: '🐕', categoria: 'Médio'   },
      { id: 4, emoji: '🪑', categoria: 'Médio'   },
      { id: 5, emoji: '🐘', categoria: 'Grande'  },
      { id: 6, emoji: '🚢', categoria: 'Grande'  },
      { id: 7, emoji: '🐞', categoria: 'Pequeno' },
      { id: 8, emoji: '🏠', categoria: 'Grande'  },
    ],
  },
]

const COR_CATEGORIA = {
  Animais: '#10B981', Frutas: '#F59E0B', Veículos: '#3B82F6',
  Vermelho: '#EF4444', Amarelo: '#F59E0B', Verde: '#10B981',
  Pequeno: '#A78BFA', Médio: '#60A5FA', Grande: '#FB923C',
}

export default function ClassificarObjetosAtividade() {
  const navigate      = useNavigate()
  const inicioRef     = useRef(null)
  const dragItemRef   = useRef(null)

  const [iniciou,         setIniciou]         = useState(false)
  const [roundIdx,        setRoundIdx]         = useState(0)
  const [objetosPendentes, setObjetosPendentes] = useState([])
  const [classificados,   setClassificados]    = useState({}) // categoria → [{...}]
  const [erroZona,        setErroZona]         = useState(null)
  const [acertosTotal,    setAcertosTotal]      = useState(0)
  const [roundConcluido,  setRoundConcluido]   = useState(false)
  // Toque: HTML5 drag-and-drop não existe em tablet/celular. Sem isto a atividade
  // era impossível de terminar no aparelho que a criança mais usa.
  const [selecionado,     setSelecionado]      = useState(null)

  const iniciarRound = useCallback((idx) => {
    const round = ROUNDS[idx]
    setRoundIdx(idx)
    const cats = {}
    round.categorias.forEach(c => { cats[c] = [] })
    setClassificados(cats)
    setObjetosPendentes([...round.objetos])
    setErroZona(null)
    setRoundConcluido(false)
    if (!inicioRef.current) inicioRef.current = Date.now()
  }, [])

  const comecarJogo = useCallback(() => {
    inicioRef.current = Date.now()
    iniciarRound(0)
  }, [iniciarRound])

  const handleComecar = useCallback(() => {
    setIniciou(true)
    comecarJogo()
  }, [comecarJogo])

  const handleDragStart = useCallback((e, obj) => {
    dragItemRef.current = obj
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const classificar = useCallback((obj, categoriaZona) => {
    if (!obj) return
    setSelecionado(null)

    if (obj.categoria === categoriaZona) {
      // Acerto
      setObjetosPendentes(prev => prev.filter(o => o.id !== obj.id))
      setClassificados(prev => ({
        ...prev,
        [categoriaZona]: [...(prev[categoriaZona] || []), obj],
      }))
      setAcertosTotal(prev => prev + 1)

      // Verifica se round terminou
      setObjetosPendentes(prev => {
        const restantes = prev.filter(o => o.id !== obj.id)
        if (restantes.length === 0) {
          setTimeout(() => {
            setRoundConcluido(true)
          }, 600)
        }
        return restantes
      })
    } else {
      // Erro
      setErroZona(categoriaZona)
      setTimeout(() => setErroZona(null), 400)
    }
  }, [])

  const handleDrop = useCallback((e, categoriaZona) => {
    e.preventDefault()
    const obj = dragItemRef.current
    dragItemRef.current = null
    classificar(obj, categoriaZona)
  }, [classificar])

  const handleZonaClick = useCallback((categoriaZona) => {
    if (!selecionado) return
    classificar(selecionado, categoriaZona)
  }, [selecionado, classificar])

  const handleProximoRound = useCallback(() => {
    const proximo = roundIdx + 1
    if (proximo < ROUNDS.length) {
      iniciarRound(proximo)
    } else {
      // Fim do jogo
      const tempo  = Math.round((Date.now() - inicioRef.current) / 1000)
      const xp     = Math.round((acertosTotal / 24) * 85)
      navigate('/encerramento', {
        state: {
          xp,
          coins: Math.round(xp / 6),
          titulo: ATIVIDADE.titulo,
          emoji: ATIVIDADE.emoji,
          tipo: ATIVIDADE.tipo,
          atividade_id: ATIVIDADE.id,
        },
      })
    }
  }, [roundIdx, acertosTotal, navigate, iniciarRound])

  if (!iniciou) {
    return (
      <IntroAtividade
        atividade={ATIVIDADE}
        onComecar={handleComecar}
        onVoltar={() => navigate('/home-crianca')}
      />
    )
  }

  const round = ROUNDS[roundIdx]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0a1e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '28px 16px',
      fontFamily: 'Nunito, sans-serif',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20, maxWidth: 600, width: '100%' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '0 0 4px' }}>
          Round {roundIdx + 1} de {ROUNDS.length}
        </p>
        <h2 style={{ color: 'white', fontFamily: 'var(--ns-font-display)', fontSize: 26, margin: 0 }}>
          {round.criterio}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: '6px 0 0' }}>
          {selecionado ? 'Agora toque na caixa certa!' : 'Toque num objeto e depois na caixa certa (ou arraste).'}
        </p>
      </div>

      {/* Objetos pendentes */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 24,
        minHeight: 90,
        maxWidth: 600,
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 16,
        padding: 12,
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {objetosPendentes.map(obj => {
          const ativo = selecionado?.id === obj.id
          return (
            <button
              key={obj.id}
              draggable
              onDragStart={(e) => handleDragStart(e, obj)}
              onClick={() => setSelecionado(ativo ? null : obj)}
              aria-pressed={ativo}
              style={{
                width: 70,
                height: 70,
                background: ativo ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.08)',
                border: ativo ? '2px solid #a78bfa' : '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'transform 0.1s, background 0.15s, border-color 0.15s',
                transform: ativo ? 'scale(1.06)' : 'scale(1)',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              {obj.emoji}
            </button>
          )
        })}
        {objetosPendentes.length === 0 && !roundConcluido && (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, margin: 'auto' }}>
            Todos os objetos foram classificados!
          </p>
        )}
      </div>

      {/* Zonas de drop */}
      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 640,
        width: '100%',
      }}>
        {round.categorias.map(cat => {
          const corCat  = COR_CATEGORIA[cat] || '#7C3AED'
          const temErro = erroZona === cat
          const itens   = classificados[cat] || []
          return (
            <div
              key={cat}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, cat)}
              onClick={() => handleZonaClick(cat)}
              style={{
                cursor: selecionado ? 'pointer' : 'default',
                flex: '1 1 140px',
                minHeight: 140,
                background: temErro
                  ? 'rgba(239,68,68,0.15)'
                  : `${corCat}12`,
                border: `2px dashed ${temErro ? '#EF4444' : corCat}`,
                borderRadius: 16,
                padding: 12,
                transition: 'background 0.2s, border-color 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{
                color: corCat,
                fontFamily: 'var(--ns-font-display)',
                fontSize: 16,
                letterSpacing: 0.3,
              }}>
                {cat}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                {itens.map(obj => (
                  <div key={obj.id} style={{
                    width: 44,
                    height: 44,
                    background: `${corCat}22`,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    border: `1px solid ${corCat}44`,
                  }}>
                    {obj.emoji}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Saída: sem isto a criança só sairia da atividade pelo botão do navegador */}
      <button
        onClick={() => navigate('/home-crianca')}
        style={{ marginTop: 32, background: 'transparent', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 20px', fontSize: 13, cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}
      >
        ← Sair da atividade
      </button>

      {/* Banner round concluído */}
      {roundConcluido && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <div style={{
            background: '#1e1245',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 24,
            padding: '40px 48px',
            textAlign: 'center',
            maxWidth: 360,
          }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
            <h3 style={{
              color: 'white',
              fontFamily: 'var(--ns-font-display)',
              fontSize: 26,
              margin: '0 0 8px',
            }}>
              Round {roundIdx + 1} completo!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginBottom: 28 }}>
              {roundIdx + 1 < ROUNDS.length
                ? 'Próximo desafio em breve...'
                : 'Você classificou tudo! 🎉'}
            </p>
            <button
              onClick={handleProximoRound}
              style={{
                background: 'var(--ns-violet, #7C3AED)',
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
              {roundIdx + 1 < ROUNDS.length ? 'Próximo round →' : 'Ver resultado'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
