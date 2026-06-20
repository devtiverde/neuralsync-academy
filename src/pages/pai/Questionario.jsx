import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import PerfilCognitivoView from '../../components/PerfilCognitivoView'
import '../../styles/pai.css'

const perguntas = (nome) => [
  {
    dimensao: 'Perfil de Aprendizado',
    emoji: '🧠',
    texto: `Como ${nome} prefere aprender coisas novas?`,
    chave: 'estilo_aprendizado',
    opcoes: [
      { label: 'Vendo alguém fazer primeiro', valor: 'visual', emoji: '👀' },
      { label: 'Tentando sozinho até descobrir', valor: 'cinestetico', emoji: '🙌' },
      { label: 'Pedindo explicação passo a passo', valor: 'auditivo', emoji: '👂' },
      { label: 'Lendo ou olhando imagens', valor: 'leitura', emoji: '📖' },
    ]
  },
  {
    dimensao: 'Perfil de Aprendizado',
    emoji: '💪',
    texto: `Quando ${nome} não consegue algo, qual é a reação mais comum?`,
    chave: 'persistencia',
    opcoes: [
      { label: 'Desiste rápido e muda de assunto', valor: 'baixa', emoji: '😔' },
      { label: 'Fica frustrado mas tenta de novo', valor: 'media', emoji: '😤' },
      { label: 'Pede ajuda imediatamente', valor: 'social', emoji: '🤝' },
      { label: 'Insiste até conseguir, mesmo demorando', valor: 'alta', emoji: '🎯' },
    ]
  },
  {
    dimensao: 'Relação com Telas',
    emoji: '📱',
    texto: `O que mais te preocupa no uso de telas do ${nome}?`,
    chave: 'preocupacao_telas',
    opcoes: [
      { label: 'Quantidade de tempo de tela', valor: 'tempo', emoji: '⏰' },
      { label: 'Tipo de conteúdo consumido', valor: 'conteudo', emoji: '🎯' },
      { label: 'Isolamento social por causa das telas', valor: 'social', emoji: '🫂' },
      { label: 'Falta de atividades físicas', valor: 'fisico', emoji: '🏃' },
    ]
  },
  {
    dimensao: 'Relação com Telas',
    emoji: '😌',
    texto: `Como ${nome} reage quando o tempo de tela acaba?`,
    chave: 'regulacao_emocional',
    opcoes: [
      { label: 'Aceita bem, sem problema', valor: 'alta', emoji: '😊' },
      { label: 'Negocia ou pede um pouco mais', valor: 'media', emoji: '🤔' },
      { label: 'Fica agitado ou irritado', valor: 'baixa', emoji: '😤' },
      { label: 'Chora ou tem uma crise', valor: 'muito_baixa', emoji: '😭' },
    ]
  },
  {
    dimensao: 'Habilidades',
    emoji: '🌟',
    texto: `Se você pudesse escolher UMA habilidade para ${nome} desenvolver esse mês, qual seria?`,
    chave: 'habilidade_prioridade',
    opcoes: [
      { label: 'Foco e atenção', valor: 'foco', emoji: '🎯' },
      { label: 'Criatividade', valor: 'criatividade', emoji: '🎨' },
      { label: 'Raciocínio lógico', valor: 'logica', emoji: '🧩' },
      { label: 'Inteligência emocional', valor: 'emocional', emoji: '💛' },
    ]
  },
  {
    dimensao: 'Habilidades',
    emoji: '📚',
    texto: `Onde ${nome} mais precisa de apoio na escola?`,
    chave: 'apoio_escola',
    opcoes: [
      { label: 'Matemática e raciocínio lógico', valor: 'matematica', emoji: '🔢' },
      { label: 'Leitura e interpretação de texto', valor: 'leitura', emoji: '📝' },
      { label: 'Organização e planejamento', valor: 'organizacao', emoji: '📅' },
      { label: 'Autoconfiança e participação', valor: 'autoconfianca', emoji: '🙋' },
    ]
  },
  {
    dimensao: 'Rotina Familiar',
    emoji: '🏠',
    texto: `Qual é a rotina de estudos do ${nome} em casa hoje?`,
    chave: 'rotina',
    opcoes: [
      { label: 'Não tem rotina definida', valor: 'nenhuma', emoji: '❓' },
      { label: 'Só faz tarefa escolar', valor: 'tarefa', emoji: '✏️' },
      { label: 'Tem horários fixos de estudo', valor: 'horarios', emoji: '⏱️' },
      { label: 'Estuda com acompanhamento diário', valor: 'acompanhamento', emoji: '👨‍👩‍👧' },
    ]
  },
  {
    dimensao: 'Rotina Familiar',
    emoji: '⏳',
    texto: `Quanto tempo por semana você consegue se dedicar ao desenvolvimento do ${nome}?`,
    chave: 'dedicacao_semanal',
    opcoes: [
      { label: 'Menos de 1 hora', valor: 'menos1h', emoji: '⚡' },
      { label: '1 a 3 horas', valor: '1a3h', emoji: '🕐' },
      { label: '3 a 5 horas', valor: '3a5h', emoji: '🕓' },
      { label: 'Mais de 5 horas', valor: 'mais5h', emoji: '💪' },
    ]
  },
]

const dimensoesConfig = {
  'Perfil de Aprendizado': { cor: '#7C3AED', bg: '#f5f3ff' },
  'Relação com Telas': { cor: '#F07A20', bg: '#fff7ed' },
  'Habilidades': { cor: '#10b981', bg: '#f0fdf4' },
  'Rotina Familiar': { cor: '#3b82f6', bg: '#eff6ff' },
}

export default function Questionario() {
  const { childId } = useParams()
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [atual, setAtual] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [salvando, setSalvando] = useState(false)
  const [selecionado, setSelecionado] = useState(null)
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    if (!childId) { navigate('/dashboard'); return }
    supabase.from('children').select('id, nome').eq('id', childId).single()
      .then(({ data }) => { if (data) setChild(data); else navigate('/dashboard') })
  }, [childId])

  if (!child) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ color: '#9ca3af', fontSize: '14px' }}>Carregando...</div>
    </div>
  )

  if (resultado) return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg,#7C3AED,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧠</div>
          <span style={{ fontWeight: '800', fontSize: '16px', color: '#0f0a1e' }}>Perfil concluído ✓</span>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'linear-gradient(135deg,#7C3AED,#6d28d9)', border: 'none', borderRadius: '10px', padding: '9px 16px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
          Ir para o Dashboard →
        </button>
      </header>
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '28px 24px' }}>
        <PerfilCognitivoView perfil={resultado} nome={child.nome} />
        <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '15px', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#7C3AED,#6d28d9)', color: 'white', fontWeight: '800', fontSize: '15px', cursor: 'pointer', marginTop: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Concluir e ver no Dashboard →
        </button>
      </div>
    </div>
  )

  const lista = perguntas(child.nome)
  const pergunta = lista[atual]
  const total = lista.length
  const progresso = ((atual) / total) * 100
  const dim = dimensoesConfig[pergunta.dimensao]

  function selecionar(valor) {
    setSelecionado(valor)
  }

  function avancar() {
    if (!selecionado) return
    const novas = { ...respostas, [pergunta.chave]: selecionado }
    setRespostas(novas)
    setSelecionado(null)
    if (atual + 1 < total) {
      setAtual(a => a + 1)
    } else {
      salvar(novas)
    }
  }

  async function salvar(dados) {
    setSalvando(true)
    const perfil = { ...dados, respondido_em: new Date().toISOString() }
    const { error } = await supabase.from('children').update({
      perfil_cognitivo: perfil
    }).eq('id', childId)
    setSalvando(false)
    if (error) {
      alert('Não foi possível salvar o perfil agora. Tente novamente.\n\nDetalhe: ' + error.message)
      return
    }
    setResultado(perfil)
  }

  async function pular() {
    navigate('/dashboard')
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg,#7C3AED,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧠</div>
          <span style={{ fontWeight: '800', fontSize: '16px' }}>
            <span style={{ color: '#0f0a1e' }}>Perfil de </span>
            <span style={{ color: '#7C3AED' }}>{child.nome}</span>
          </span>
        </div>
        <button onClick={pular} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
          Pular por agora
        </button>
      </header>

      {/* PROGRESSO */}
      <div style={{ background: '#e5e7eb', height: '4px' }}>
        <div style={{ background: `linear-gradient(90deg, ${dim.cor}, ${dim.cor}99)`, height: '100%', width: progresso + '%', transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '32px 24px' }}>

        {/* INTRO (só na primeira) */}
        {atual === 0 && (
          <div style={{ background: dim.bg, border: `1.5px solid ${dim.cor}30`, borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '22px' }}>💡</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '14px', color: dim.cor, marginBottom: '4px' }}>Perfil Cognitivo</div>
              <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>
                8 perguntas rápidas para personalizar a experiência de <strong>{child.nome}</strong>. Suas respostas tornam os relatórios e atividades muito mais precisos.
              </div>
            </div>
          </div>
        )}

        {/* DIMENSÃO */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: dim.bg, border: `1px solid ${dim.cor}30`, borderRadius: '999px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', color: dim.cor, marginBottom: '16px' }}>
          {pergunta.emoji} {pergunta.dimensao}
        </div>

        {/* CONTADOR */}
        <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', marginBottom: '8px' }}>
          Pergunta {atual + 1} de {total}
        </div>

        {/* PERGUNTA */}
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f0a1e', marginBottom: '24px', lineHeight: 1.35 }}>
          {pergunta.texto}
        </h2>

        {/* OPÇÕES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {pergunta.opcoes.map(op => {
            const ativo = selecionado === op.valor
            return (
              <button
                key={op.valor}
                onClick={() => selecionar(op.valor)}
                style={{
                  background: ativo ? dim.bg : 'white',
                  border: `2px solid ${ativo ? dim.cor : '#e5e7eb'}`,
                  borderRadius: '14px',
                  padding: '15px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  boxShadow: ativo ? `0 0 0 3px ${dim.cor}20` : 'none',
                }}
              >
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{op.emoji}</span>
                <span style={{ fontWeight: '700', fontSize: '14px', color: ativo ? dim.cor : '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {op.label}
                </span>
                {ativo && <span style={{ marginLeft: 'auto', fontSize: '16px' }}>✓</span>}
              </button>
            )
          })}
        </div>

        {/* BOTÃO AVANÇAR */}
        <button
          onClick={avancar}
          disabled={!selecionado || salvando}
          style={{
            width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
            background: selecionado ? `linear-gradient(135deg, ${dim.cor}, ${dim.cor}cc)` : '#e5e7eb',
            color: selecionado ? 'white' : '#9ca3af',
            fontWeight: '800', fontSize: '15px', cursor: selecionado ? 'pointer' : 'not-allowed',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            transition: 'all 0.2s',
          }}
        >
          {salvando ? 'Salvando perfil...' : atual + 1 < total ? 'Próxima →' : 'Concluir perfil ✓'}
        </button>

        {/* PONTOS DE PROGRESSO */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '20px' }}>
          {lista.map((_, i) => (
            <div key={i} style={{
              width: i === atual ? '20px' : '7px',
              height: '7px',
              borderRadius: '999px',
              background: i < atual ? dim.cor : i === atual ? dim.cor : '#e5e7eb',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
