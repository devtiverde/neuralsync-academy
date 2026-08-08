import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { SUPPORT } from '../../config/support'
import { assinaturaVigente } from '../../lib/assinatura'
import LayoutPai from '../../components/LayoutPai'
import { lerProgresso, montarPassos, CHAVE_DISPENSA } from '../../lib/primeirosPassos'
import { Button, Card } from '../../components/ui'
import { CheckCircle, Brain, GearSix } from '@phosphor-icons/react'
import '../../styles/pai.css'

const AVATAR_MAP = {
  'explorer':'🧭','av_explorer':'🧭','cientista':'🔬','av_cientista':'🔬',
  'astronauta':'🚀','av_astronauta':'🚀','mago':'🧙','av_mago':'🧙',
  'artista':'🎨','av_artista':'🎨','robô':'🤖','robo':'🤖','av_robo':'🤖',
  'dino':'🦕','av_dino':'🦕','ninja':'🥷','av_ninja':'🥷',
}
const resolverAvatar = av => (!av ? '🦊' : AVATAR_MAP[String(av).toLowerCase()] || av)

const faixaLabel = {
  exploradores: { label: 'Exploradores', icon: '🌱', cor: '#10b981' },
  construtores:  { label: 'Construtores', icon: '🧩', cor: '#3b82f6' },
  criadores:     { label: 'Criadores',    icon: '🎨', cor: '#ec4899' },
  inventores:    { label: 'Inventores',   icon: '🚀', cor: '#7C3AED' },
}

const normalizarFaixa = (faixa, idade) => {
  const f = (faixa || '').toString().trim().toLowerCase()
  if (f.startsWith('explor')) return 'exploradores'
  if (f.startsWith('constr')) return 'construtores'
  if (f.startsWith('criad'))  return 'criadores'
  if (f.startsWith('invent')) return 'inventores'
  const n = parseInt(idade)
  if (n <= 5) return 'exploradores'
  if (n >= 6 && n <= 8) return 'construtores'
  if (n >= 9 && n <= 11) return 'criadores'
  return 'inventores'
}

const RECOMENDADAS = {
  exploradores: [
    { icon: '🔤', label: 'Alfabeto',  tipo: 'alfabeto',  path: '/atividade/alfabeto', desc: 'Explorar as 26 letras com narração' },
    { icon: '🔢', label: 'Números',   tipo: 'numeros',   path: '/atividade/numeros',  desc: 'Contar de 1 a 10 de forma lúdica' },
    { icon: '🔷', label: 'Formas',    tipo: 'formas',    path: '/atividade/formas',   desc: 'Reconhecer formas geométricas' },
  ],
  construtores: [
    { icon: '🎯', label: 'Quiz',      tipo: 'quiz',      path: '/atividade/quiz',      desc: 'Perguntas de conhecimento geral' },
    { icon: '🃏', label: 'Memória',   tipo: 'memoria',   path: '/atividade/memoria',   desc: 'Jogo da memória com temas' },
    { icon: '🧩', label: 'Sequência', tipo: 'sequencia', path: '/atividade/sequencia', desc: 'Complete a sequência lógica' },
  ],
  criadores: [
    { icon: '🤖', label: 'Robótica',  tipo: 'robo',      path: '/atividade/robo',     desc: 'Programação visual com robô' },
    { icon: '📐', label: 'Padrões',   tipo: 'padrao',    path: '/atividade/padrao',   desc: 'Reconhecer padrões complexos' },
    { icon: '💡', label: 'Inventor',  tipo: 'inventor',  path: '/atividade/inventor', desc: 'Crie e avalie invenções' },
  ],
  inventores: [
    { icon: '🤖', label: 'Quiz IA',   tipo: null,        path: '/quiz-ia',            desc: 'Quiz gerado por inteligência artificial' },
    { icon: '💡', label: 'Inventor',  tipo: 'inventor',  path: '/atividade/inventor', desc: 'Invenção com feedback de IA' },
    { icon: '🧩', label: 'Robótica',  tipo: 'robo',      path: '/atividade/robo',     desc: 'Algoritmos avançados' },
  ],
}

// ⚡ Os dados das atividades entram por `import()` dinâmico, e não no topo do arquivo.
//
// MEDIDO EM 02/08/2026: este painel tem 9 kB comprimidos e o `atividadesExtra.js` tem
// 231 kB — vinte e cinco vezes o tamanho da tela. Com o import estático, TODO pai que
// entrava no painel (a primeira tela depois de pagar, e a mais aberta do produto)
// baixava e interpretava esses 231 kB antes de ver qualquer coisa. Tudo isso para
// preencher três cartões de sugestão que quase ninguém clica.
//
// Agora os dados só chegam quando o pai CLICA num cartão. O clique paga a espera de uma
// requisição, o que é aceitável — ele acabou de decidir abrir a atividade —, enquanto o
// carregamento do painel deixa de pagar por todo mundo.
//
// O mesmo tratamento já tinha sido dado ao `useAtividades` (a home da criança). Este
// arquivo tinha ficado para trás e desfazia metade do ganho.
//
// ⚡⚡ 03/08/2026 — e agora carrega UMA FAIXA POR VEZ, sob demanda.
// As atividades extra foram divididas em `src/data/extra/<faixa>.js`. Importar o
// barril `atividadesExtra.js` aqui traria as quatro de volta (244 kB) — pior do que
// o monólito de antes, porque a divisão custa uns 5% de compressão. Como a busca já
// tentava a faixa do filho PRIMEIRO e quase sempre acha nela, o certo é buscar a
// faixa, procurar, e só ir atrás da próxima se não achou. No caso comum isso baixa
// ~59 kB em vez de 244.
const EXTRA_POR_FAIXA = {
  exploradores: () => import('../../data/extra/exploradores.js'),
  construtores: () => import('../../data/extra/construtores.js'),
  criadores:    () => import('../../data/extra/criadores.js'),
  inventores:   () => import('../../data/extra/inventores.js'),
}

async function encontrarAtividade(tipo, faixa) {
  if (!tipo) return null
  const dataMod = await import('../../data/atividadesData')
  const todasFaixas = Object.keys(EXTRA_POR_FAIXA)
  // Faixa desconhecida (ou ausente) simplesmente não entra na frente da fila.
  const faixas = [...new Set([faixa, ...todasFaixas])].filter(f => EXTRA_POR_FAIXA[f])

  for (const f of faixas) {
    const extra = await EXTRA_POR_FAIXA[f]()
    const lista = [
      ...(dataMod.atividadesPorFaixa[f] || []),
      ...(dataMod.fase2PorFaixa[f] || []),
      ...(dataMod.fase3PorFaixa[f] || []),
      ...(extra.atividadesExtraPorFaixa || []),
      ...(extra.fase2ExtraPorFaixa || []),
      ...(extra.fase3ExtraPorFaixa || []),
      ...(extra.fase4ExtraPorFaixa || []),
      ...(extra.fase5ExtraPorFaixa || []),
      ...(extra.inglesExtraPorFaixa || []),
      ...(extra.formasExtraPorFaixa || []),
      ...(extra.numerosExtraPorFaixa || []),
      ...(extra.coresExtraPorFaixa || []),
      ...(extra.alfabetoExtraPorFaixa || []),
      ...(extra.quizExtraPorFaixa || []),
    ]
    const found = lista.find(a => a.tipo === tipo)
    if (found) return found
  }
  return null
}

const planoInfo = {
  starter: { nome: 'Starter 🌱', cor: '#10b981', bg: '#d1fae5' },
  familia: { nome: 'Família 👨‍👧‍👦', cor: '#7C3AED', bg: '#ede9fe' },
  premium: { nome: 'Premium 🚀', cor: '#f97316', bg: '#ffedd5' },
}

const FAIXA_SEL = ['exploradores','construtores','criadores','inventores']

export default function Dashboard() {
  const { user, subscription, subscriptionLoaded, ativando, ativacaoFalhou } = useAuth()
  const { loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [novoFilho, setNovoFilho] = useState({ nome: '', idade: '', faixa_etaria: 'construtores' })
  const [salvando, setSalvando] = useState(false)
  const [childToDelete, setChildToDelete] = useState(null)
  const [excluindo, setExcluindo] = useState(false)
  const [childToEdit, setChildToEdit] = useState(null)
  const [editForm, setEditForm] = useState({ nome: '', idade: '', faixa_etaria: 'construtores' })
  const [editando, setEditando] = useState(false)
  const [toast, setToast] = useState(null)
  const [neuralaiSessions, setNeuralaiSessions] = useState([])
  const [avisoExpDispensado, setAvisoExpDispensado] = useState(
    () => localStorage.getItem('ns_aviso_exploradores') === 'dispensado'
  )
  const [progressoInicial, setProgressoInicial] = useState(null)
  const [ppDispensado, setPpDispensado] = useState(
    () => localStorage.getItem(CHAVE_DISPENSA) === 'dispensado'
  )

  // Usa a MESMA leitura da tela /primeiros-passos. Recontar aqui com outra regra faria a
  // faixa dizer "faltam 2" e a tela mostrar 3 — divergência que aparece só na frente do
  // cliente. (Mesmo motivo de `dentroDoHorario` ter virado arquivo único.)
  useEffect(() => {
    if (!user || ppDispensado) return
    let vivo = true
    lerProgresso(user.id).then(p => {
      if (!vivo) return
      const passos = montarPassos(p, () => {})
      const feitos = passos.filter(x => x.feito).length
      setProgressoInicial({ completo: feitos === passos.length, faltam: passos.length - feitos })
    })
    return () => { vivo = false }
  }, [user, ppDispensado, children.length])

  useEffect(() => {
    // `ativando` é essencial: a Edge Function de ativação tem cold start, e sem esperar
    // por ela quem ACABOU DE PAGAR era jogado na tabela de preços sem explicação nenhuma.
    if (authLoading || !subscriptionLoaded || ativando) return
    if (!user) { navigate('/auth'); return }
    if (!subscription || subscription.plano_status !== 'ativo') {
      // se a ativação respondeu "não achei assinatura pra este e-mail", NÃO empurra pra
      // /planos: a pessoa provavelmente pagou com outro e-mail e precisa ler isso.
      if (!ativacaoFalhou) navigate('/planos')
      return
    }
    loadChildren()
  }, [user, authLoading, subscription, subscriptionLoaded, ativando, ativacaoFalhou])

  const loadChildren = async () => {
    try {
      const { data, error } = await supabase.from('children').select('*').eq('parent_id', user.id)
      if (error) throw error
      const childrenData = data || []
      setChildren(childrenData)
      const inventoresIds = childrenData
        .filter(c => normalizarFaixa(c.faixa_etaria, c.idade) === 'inventores')
        .map(c => c.id)
      if (inventoresIds.length > 0) {
        const { data: sessions } = await supabase
          .from('neuralai_sessions')
          .select('id, child_id, started_at, ended_at, duration_minutes, themes, engagement, highlight, challenge, message_count')
          .in('child_id', inventoresIds)
          .not('ended_at', 'is', null)
          .order('started_at', { ascending: false })
          .limit(10)
        setNeuralaiSessions(sessions || [])
      }
    } catch {
      showToast('Erro ao carregar filhos.', 'erro')
      setChildren([])
    } finally {
      setLoading(false)
    }
  }

  const limiteFilhos = subscription?.filhos_limite ?? 1
  const podeAdicionarFilho = children.length < limiteFilhos

  const adicionarFilho = async () => {
    if (!novoFilho.nome.trim()) { showToast('Informe o nome do filho.', 'erro'); return }
    const idadeNum = parseInt(novoFilho.idade)
    if (isNaN(idadeNum) || idadeNum < 4 || idadeNum > 15) { showToast('Idade deve ser entre 4 e 15 anos.', 'erro'); return }
    if (!podeAdicionarFilho) return
    setSalvando(true)
    const { data, error } = await supabase.from('children').insert({
      parent_id: user.id, nome: novoFilho.nome, idade: idadeNum,
      faixa_etaria: novoFilho.faixa_etaria, nivel: 1, xp: 0,
      neural_coins: 0, streak_atual: 0, streak_maximo: 0
    }).select().single()
    setSalvando(false)
    if (error) {
      if (error.message?.includes('CHILDREN_LIMIT_REACHED')) {
        showToast(`Plano permite até ${limiteFilhos} filho${limiteFilhos > 1 ? 's' : ''}. Faça upgrade!`, 'erro')
        setShowModal(false)
        setTimeout(() => navigate('/planos'), 1500)
      } else { showToast('Erro ao adicionar filho.', 'erro') }
      return
    }
    setShowModal(false)
    setNovoFilho({ nome: '', idade: '', faixa_etaria: 'construtores' })
    if (data?.id) { showToast(`${data.nome} adicionado!`); navigate(`/questionario/${data.id}`) }
    else await loadChildren()
  }

  const showToast = (msg, tipo = 'ok') => {
    setToast({ msg, tipo })
    setTimeout(() => setToast(null), 3500)
  }

  const excluirFilho = async () => {
    if (!childToDelete) return
    setExcluindo(true)
    const nome = childToDelete.nome
    const { error } = await supabase.from('children').delete().eq('id', childToDelete.id).eq('parent_id', user.id)
    setExcluindo(false)
    setChildToDelete(null)
    if (error) { showToast('Erro ao excluir.', 'erro'); return }
    showToast(`Perfil de ${nome} excluído.`)
    loadChildren()
  }

  const abrirEditar = (child) => {
    setChildToEdit(child)
    setEditForm({ nome: child.nome, idade: child.idade, faixa_etaria: normalizarFaixa(child.faixa_etaria, child.idade) })
  }

  const salvarEdicao = async () => {
    if (!childToEdit) return
    if (!editForm.nome.trim()) { showToast('Informe o nome.', 'erro'); return }
    const idadeNum = parseInt(editForm.idade)
    if (isNaN(idadeNum) || idadeNum < 4 || idadeNum > 15) { showToast('Idade entre 4 e 15.', 'erro'); return }
    setEditando(true)
    const { error } = await supabase.from('children')
      .update({ nome: editForm.nome, idade: idadeNum, faixa_etaria: editForm.faixa_etaria })
      .eq('id', childToEdit.id)
    setEditando(false)
    if (error) { showToast('Erro ao salvar.', 'erro'); return }
    setChildToEdit(null)
    showToast(`Perfil de ${editForm.nome} atualizado!`)
    loadChildren()
  }

  const totalXP = children.reduce((s, c) => s + (c.xp || 0), 0)
  const maxStreak = Math.max(0, ...children.map(c => c.streak_atual || 0))
  const xpPct = child => Math.min(((child.xp || 0) / ((child.nivel || 1) * 500)) * 100, 100)

  const plano = planoInfo[subscription?.plano] || { nome: 'Trial', cor: '#6b7280', bg: '#f3f4f6' }
  const faixaPrioritaria = children.length > 0 ? normalizarFaixa(children[0].faixa_etaria, children[0].idade) : 'construtores'

  // NeuralAI helpers
  const engColor = { alto: '#10b981', medio: '#f59e0b', baixo: '#9ca3af' }
  const engLabel = { alto: '🔥 Alto', medio: '⚡ Médio', baixo: '💤 Baixo' }
  const fmtDate = d => {
    const diff = Math.floor((Date.now() - new Date(d)) / 86400000)
    if (diff === 0) return 'Hoje'
    if (diff === 1) return 'Ontem'
    if (diff < 7) return `${diff} dias atrás`
    return new Date(d).toLocaleDateString('pt-BR')
  }

  // Comprou com um e-mail e cadastrou com outro é a armadilha clássica deste fluxo.
  // Antes disto a Edge Function respondia {activated:false}, a resposta era descartada
  // num catch vazio, e a pessoa era jogada em /planos sem UMA palavra de explicação —
  // concluía que o pagamento não passou e pedia reembolso.
  // Segunda trava: mesmo que `ativacaoFalhou` esteja setado, se a assinatura desta
  // conta está vigente NÃO existe problema nenhum a mostrar. Sem esta checagem,
  // quem já tinha plano ativo via esta tela em todo login (a Edge Function responde
  // "não achei pendência" para todo mundo já ativado) e ficava sem acesso.
  // Só faz sentido perguntar "pagou com outro e-mail?" para quem NUNCA teve plano.
  // Quem tem plano registrado e cancelado/vencido recebia essa mesma tela e ficava
  // achando que o pagamento tinha se perdido, quando na verdade a assinatura
  // acabou — dois problemas opostos com a mesma mensagem.
  const nuncaTevePlano = !subscription?.plano || subscription.plano === 'none'
  if (ativacaoFalhou && !assinaturaVigente(subscription) && nuncaTevePlano) {
    return (
      <LayoutPai>
        <div className="pai-content" style={{ maxWidth: 620, padding: '48px 24px' }}>
          <div className="pai-card" style={{ padding: 28 }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🔎</div>
            <h1 style={{ fontSize: 22, marginBottom: 10 }}>Não encontramos sua assinatura</h1>
            <p style={{ color: '#6b7280', lineHeight: 1.65, marginBottom: 14 }}>
              Você entrou como <strong>{ativacaoFalhou}</strong>, mas não há nenhuma
              assinatura ativa nesse e-mail.
            </p>
            <p style={{ color: '#6b7280', lineHeight: 1.65, marginBottom: 20 }}>
              Se você pagou usando <strong>outro e-mail</strong> (o do cônjuge, por exemplo),
              é só nos avisar que transferimos a assinatura para esta conta. Se ainda não
              assinou, escolha um plano abaixo.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn-primary" style={{ textDecoration: 'none' }}
                 href={`mailto:${SUPPORT.email}?subject=Assinatura%20nao%20encontrada&body=Paguei%20com%20o%20e-mail%20___%20e%20criei%20a%20conta%20como%20${encodeURIComponent(ativacaoFalhou)}.`}>
                Falar com o suporte
              </a>
              <button className="btn-secondary" onClick={() => navigate('/planos')}>Ver planos</button>
            </div>
          </div>
        </div>
      </LayoutPai>
    )
  }

  return (
    <LayoutPai>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 400, background: toast.tipo === 'erro' ? 'var(--ns-error)' : 'var(--ns-green)', color: 'white', borderRadius: 12, padding: '12px 22px', fontWeight: 700, fontSize: 14, boxShadow: '0 4px 24px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
          {toast.tipo === 'erro' ? '⚠️' : '✅'} {toast.msg}
        </div>
      )}

      <div className="pai-content">

        {/* ── HERO ──────────────────────────────────── */}
        <div className="pai-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 8 }}>Área dos Pais</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ns-text)', letterSpacing: '-0.5px', marginBottom: 6, fontFamily: 'var(--ns-font-body)' }}>Painel de Controle</h1>
            <p style={{ color: 'var(--ns-text-muted)', fontSize: 14, lineHeight: 1.7 }}>Acompanhe o desenvolvimento cognitivo dos seus filhos em tempo real.</p>
          </div>
          {/* `flexWrap` porque o selo do plano + "Adicionar filho" lado a lado
              passavam da borda em 360px, e o botão ficava sem como alcançar. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {subscription?.plano && (
              <span style={{ background: plano.bg, color: plano.cor, fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 999, border: `1.5px solid ${plano.cor}35` }}>
                {plano.nome}
              </span>
            )}
            <Button
              variant="primary"
              onClick={() => podeAdicionarFilho ? setShowModal(true) : null}
              title={!podeAdicionarFilho ? `Plano permite até ${limiteFilhos} filho${limiteFilhos > 1 ? 's' : ''}` : ''}
              disabled={!podeAdicionarFilho}
            >
              + Adicionar filho
            </Button>
          </div>
        </div>

        {/* ── BANNERS DE ASSINATURA ──────────────────── */}
        {(!subscription || subscription.plano_status === 'pendente') && (
          <div style={{ background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>⚠️</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 2 }}>Assinatura pendente</p>
                <p style={{ fontSize: 13, color: '#b45309', lineHeight: 1.5 }}>Ative seu plano para liberar todos os recursos da plataforma.</p>
              </div>
            </div>
            <Button variant="primary" onClick={() => navigate('/planos')} style={{ whiteSpace: 'nowrap' }}>Ativar agora →</Button>
          </div>
        )}
        {subscription?.plano_status === 'cancelado' && (
          <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>❌</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#991b1b', marginBottom: 2 }}>Assinatura cancelada</p>
                <p style={{ fontSize: 13, color: '#b91c1c' }}>Renove seu plano para retomar o acesso completo.</p>
              </div>
            </div>
            <Button variant="primary" onClick={() => navigate('/planos')} style={{ background: 'var(--ns-error)', whiteSpace: 'nowrap' }}>Renovar →</Button>
          </div>
        )}
        {subscription?.plano_status === 'ativo' && (
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 14, padding: '14px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle weight="fill" size={20} color="#10B981" />
              <span style={{ fontWeight: 700, fontSize: 14, color: '#166534' }}>
                Plano {subscription.plano?.charAt(0).toUpperCase() + subscription.plano?.slice(1)} ativo
                {subscription.plano_ativo_ate && ` — renova em ${new Date(subscription.plano_ativo_ate).toLocaleDateString('pt-BR')}`}
              </span>
            </div>
            <span style={{ fontSize: 12, color: '#15803d', fontWeight: 700, background: '#dcfce7', padding: '4px 14px', borderRadius: 999 }}>
              {limiteFilhos === 999 ? '∞ filhos' : `Até ${limiteFilhos} filho${limiteFilhos > 1 ? 's' : ''}`}
            </span>
          </div>
        )}

        {/* ── CHAMADA DOS PRIMEIROS PASSOS ──────────── */}
        {/* Some sozinha quando os 6 passos estiverem feitos. O botão de dispensar existe
            porque quem já sabe usar não deve ver isso pra sempre — mas o item continua
            no menu lateral, então dispensar não esconde o caminho. */}
        {progressoInicial && !progressoInicial.completo && !ppDispensado && (
          <div style={{ background: '#f3f0ff', border: '1.5px solid #ddd6fe', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>🧭</span>
            <div style={{ flex: '1 1 260px', minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#5b21b6', marginBottom: 3 }}>
                Faltam {progressoInicial.faltam} {progressoInicial.faltam === 1 ? 'passo' : 'passos'} para deixar tudo configurado
              </p>
              <p style={{ fontSize: 13, color: '#7c5cc4', lineHeight: 1.6 }}>
                Tempo de tela, horários da semana e o primeiro relatório — em ordem, leva poucos minutos.
              </p>
            </div>
            <button
              onClick={() => navigate('/primeiros-passos')}
              style={{ background: '#7C3AED', border: 'none', borderRadius: 10, padding: '10px 18px', color: 'white', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', flexShrink: 0 }}
            >
              Continuar
            </button>
            <button
              onClick={() => { localStorage.setItem(CHAVE_DISPENSA, 'dispensado'); setPpDispensado(true) }}
              aria-label="Dispensar"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#c4b5fd', flexShrink: 0, lineHeight: 1 }}
            >×</button>
          </div>
        )}

        {/* ── AVISO EXPLORADORES ────────────────────── */}
        {!avisoExpDispensado && children.some(c => normalizarFaixa(c.faixa_etaria, c.idade) === 'exploradores') && (
          <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 14, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>👨‍👩‍👧</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#1e40af', marginBottom: 3 }}>Dica para Exploradores (4–5 anos)</p>
              <p style={{ fontSize: 13, color: '#3b82f6', lineHeight: 1.6 }}>
                Crianças dessa faixa têm melhor aproveitamento quando usam a plataforma <strong>acompanhadas de um adulto</strong>.
              </p>
            </div>
            <button onClick={() => { localStorage.setItem('ns_aviso_exploradores', 'dispensado'); setAvisoExpDispensado(true) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#93c5fd', flexShrink: 0, lineHeight: 1 }}>×</button>
          </div>
        )}

        {/* ── 4 STAT CARDS ──────────────────────────── */}
        {children.length > 0 && (
          <div className="pai-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 36 }}>
            {[
              { icon: '👨‍👧‍👦', value: children.length,                                      label: 'Filhos cadastrados', cor: 'var(--ns-violet)' },
              { icon: '⭐',    value: totalXP.toLocaleString('pt-BR'),                       label: 'XP total acumulado',  cor: '#f59e0b' },
              { icon: '🔥',    value: `${maxStreak}d`,                                        label: 'Maior sequência',     cor: 'var(--ns-error)' },
              { icon: '✅',    value: children.filter(c => (c.streak_atual || 0) > 0).length, label: 'Ativos hoje',         cor: 'var(--ns-green)' },
            ].map((stat, i) => (
              <Card key={stat.label} variant="light" style={{ padding: '24px 18px', minWidth: 0, textAlign: 'center', animationDelay: `${i * 70}ms` }} hover={false}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{stat.icon}</div>
                <div style={{ fontFamily: 'var(--ns-font-ui)', fontSize: 30, fontWeight: 700, color: stat.cor, marginBottom: 6, letterSpacing: '-0.5px' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--ns-text-muted)', fontWeight: 500, lineHeight: 1.4 }}>{stat.label}</div>
              </Card>
            ))}
          </div>
        )}

        {/* ── SEUS FILHOS ───────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ns-text)', marginBottom: 3 }}>Seus filhos</h2>
            {children.length > 0 && (
              <p style={{ fontSize: 13, color: 'var(--ns-text-muted)' }}>{children.length} perfil{children.length !== 1 ? 'is' : ''} cadastrado{children.length !== 1 ? 's' : ''}</p>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ns-text-muted)', fontSize: 15 }}>Carregando...</div>
        ) : children.length === 0 ? (
          <div style={{ background: 'white', borderRadius: 20, padding: '56px 40px', textAlign: 'center', border: '2px dashed #ede9fe', marginBottom: 32, boxShadow: 'var(--ns-shadow-sm)' }}>
            <div style={{ fontSize: 54, marginBottom: 16 }}>👨‍👧‍👦</div>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--ns-text)', marginBottom: 8 }}>Adicione seu primeiro filho</h3>
            <p style={{ color: 'var(--ns-text-muted)', fontSize: 14, maxWidth: 360, margin: '0 auto 24px', lineHeight: 1.7 }}>
              Crie um perfil para começar a acompanhar o desenvolvimento cognitivo.
            </p>
            <Button variant="primary" onClick={() => setShowModal(true)}>+ Adicionar filho</Button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 36 }}>
            {children.map(child => {
              const faixa = normalizarFaixa(child.faixa_etaria, child.idade)
              const fi = faixaLabel[faixa]
              return (
                <Card key={child.id} variant="light" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, var(--ns-violet), #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0, boxShadow: '0 4px 12px rgba(124,58,237,0.25)' }}>
                      {resolverAvatar(child.avatar)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontWeight: 900, fontSize: 17, color: 'var(--ns-text)', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{child.nome}</h3>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ background: fi.cor + '15', color: fi.cor, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, border: `1px solid ${fi.cor}30` }}>{fi.icon} {fi.label}</span>
                        <span style={{ background: '#f3f4f6', color: '#374151', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>Nível {child.nivel || 1}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <div style={{ background: '#fff7ed', borderRadius: 999, padding: '4px 10px', fontSize: 12, color: '#ea580c', fontWeight: 700 }}>🔥 {child.streak_atual || 0}</div>
                      <button onClick={() => abrirEditar(child)} style={{ background: 'var(--ns-bg)', border: '1.5px solid var(--ns-violet-light)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                        onMouseOver={e => { e.currentTarget.style.background = 'var(--ns-violet-light)' }}
                        onMouseOut={e => { e.currentTarget.style.background = 'var(--ns-bg)' }}
                      >✏️</button>
                    </div>
                  </div>

                  {/* XP bar — violet fill */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ns-text-muted)', marginBottom: 6, fontWeight: 500 }}>
                      <span>Progresso para nível {(child.nivel || 1) + 1}</span>
                      <span style={{ fontFamily: 'var(--ns-font-ui)', color: 'var(--ns-violet)', fontWeight: 700 }}>{child.xp || 0} / {(child.nivel || 1) * 500}</span>
                    </div>
                    <div className="pai-prog-bar">
                      <div className="pai-prog-fill" style={{ width: xpPct(child) + '%' }} />
                    </div>
                  </div>

                  {/* Mini stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
                    {[
                      ['⭐ XP', (child.xp || 0).toLocaleString('pt-BR'), 'var(--ns-violet)'],
                      ['💰 Coins', child.neural_coins || 0, '#f59e0b'],
                      ['👤 Idade', `${child.idade}a`, 'var(--ns-green)'],
                    ].map(([l, v, cor]) => (
                      <div key={l} style={{ background: 'var(--ns-bg)', borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid var(--ns-violet-light)' }}>
                        <div style={{ fontFamily: 'var(--ns-font-ui)', fontWeight: 700, fontSize: 15, color: cor }}>{v}</div>
                        <div style={{ fontSize: 10, color: 'var(--ns-text-muted)', fontWeight: 500, marginTop: 2 }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* Cognitive profile */}
                  {child.perfil_cognitivo ? (
                    <div style={{ background: 'var(--ns-violet-light)', borderRadius: 12, padding: '14px 16px', marginBottom: 14, border: '1.5px solid #ddd6fe' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ns-violet)', marginBottom: 10, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 4 }}><Brain weight="fill" size={16} color="#7C3AED" /> PERFIL COGNITIVO</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        {[
                          ['Aprendizado', { visual: '👀 Visual', cinestetico: '🙌 Cinestésico', auditivo: '👂 Auditivo', leitura: '📖 Leitura' }[child.perfil_cognitivo.estilo_aprendizado]],
                          ['Foco', { alta: '🎯 Alto', media: '😤 Médio', baixa: '😔 Baixo', social: '🤝 Social' }[child.perfil_cognitivo.persistencia]],
                          ['Prioridade', { foco: '🎯 Foco', criatividade: '🎨 Criat.', logica: '🧩 Lógica', emocional: '💛 Emoc.' }[child.perfil_cognitivo.habilidade_prioridade]],
                          ['Regulação', { alta: '😊 Ótima', media: '🤔 Boa', baixa: '😤 Em dev.', muito_baixa: '😭 Atenção' }[child.perfil_cognitivo.regulacao_emocional]],
                        ].map(([label, val]) => (
                          <div key={label} style={{ background: 'white', borderRadius: 8, padding: '8px 10px', border: '1px solid #ede9fe' }}>
                            <div style={{ fontSize: 9, color: 'var(--ns-text-muted)', fontWeight: 700, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ns-text)' }}>{val || '—'}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => navigate(`/perfil-cognitivo/${child.id}`)} style={{ width: '100%', padding: '9px', borderRadius: 10, border: 'none', background: 'var(--ns-violet)', color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer', marginTop: 10, fontFamily: 'var(--ns-font-body)', transition: 'opacity 0.15s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.85'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                        Ver perfil completo →
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => navigate(`/questionario/${child.id}`)} style={{ width: '100%', padding: '12px', borderRadius: 12, border: '1.5px dashed #c4b5fd', background: 'var(--ns-violet-light)', color: 'var(--ns-violet)', fontWeight: 700, fontSize: 13, cursor: 'pointer', marginBottom: 12, fontFamily: 'var(--ns-font-body)', transition: 'background 0.15s' }} onMouseOver={e => e.currentTarget.style.background = '#ddd6fe'} onMouseOut={e => e.currentTarget.style.background = 'var(--ns-violet-light)'}>
                      <Brain weight="fill" size={20} color="#7C3AED" /> Criar Perfil Cognitivo →
                    </button>
                  )}

                  {/* Primary CTA */}
                  <div style={{ marginTop: 'auto' }}>
                    <Button
                      variant="primary"
                      onClick={() => { localStorage.setItem('ns_active_child', JSON.stringify(child)); navigate('/home-crianca') }}
                      style={{ width: '100%', marginBottom: 10 }}
                    >
                      Acessar área de {child.nome.split(' ')[0]} →
                    </Button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <button
                        onClick={() => { localStorage.setItem('ns_active_child', JSON.stringify(child)); navigate('/perfil-filho') }}
                        style={{ padding: '10px', borderRadius: 10, border: '1.5px solid var(--ns-violet-light)', background: 'var(--ns-violet-light)', color: 'var(--ns-violet)', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--ns-font-body)', transition: 'background 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#ddd6fe'}
                        onMouseOut={e => e.currentTarget.style.background = 'var(--ns-violet-light)'}
                      ><GearSix weight="fill" size={20} color="#6b7280" /> Configurações</button>
                      <button
                        onClick={() => setChildToDelete(child)}
                        style={{ padding: '10px', borderRadius: 10, border: '1.5px solid #fecaca', background: 'transparent', color: '#ef4444', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--ns-font-body)', transition: 'background 0.15s' }}
                        onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >🗑️ Excluir</button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* ── COGNITIVE REPORT PROMO ────────────────── */}
        {children.length > 0 && (
          <div className="pai-promo-card" style={{ background: 'var(--ns-violet-light)', border: '1.5px solid var(--ns-violet)', borderRadius: 20, padding: '24px 28px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--ns-violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--ns-shadow-glow-violet)' }}><Brain weight="fill" size={28} color="white" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ns-violet)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4 }}>Diagnóstico cognitivo</div>
              <h3 style={{ fontWeight: 800, fontSize: 16, color: 'var(--ns-text)', marginBottom: 4, fontFamily: 'var(--ns-font-body)' }}>Relatório Cognitivo Personalizado</h3>
              <p style={{ fontSize: 13, color: '#4c1d95', lineHeight: 1.6 }}>Análise das 8 habilidades cognitivas com recomendações baseadas em neurociência.</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/relatorio')} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              Ver relatório →
            </Button>
          </div>
        )}

        {/* ── ATIVIDADES RECOMENDADAS ───────────────── */}
        {children.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ns-text)', marginBottom: 4 }}>Atividades recomendadas</h2>
              <p style={{ fontSize: 13, color: 'var(--ns-text-muted)' }}>Selecionadas para a faixa etária de {children[0]?.nome?.split(' ')[0]}</p>
            </div>
            <div className="pai-recomendadas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {RECOMENDADAS[faixaPrioritaria].map((at, i) => (
                <Card key={at.label} variant="light" style={{ padding: 22, minWidth: 0, animationDelay: `${i * 60}ms`, cursor: 'pointer' }}
                  onClick={async () => {
                    localStorage.setItem('ns_active_child', JSON.stringify(children[0]))
                    const atv = await encontrarAtividade(at.tipo, faixaPrioritaria)
                    if (atv) navigate(at.path, { state: { atividade: atv } })
                    else navigate(at.path)
                  }}>
                  <div style={{ fontSize: 34, marginBottom: 12 }}>{at.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--ns-text)', marginBottom: 5 }}>{at.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ns-text-muted)', lineHeight: 1.6, marginBottom: 14 }}>{at.desc}</div>
                  <div style={{ fontSize: 13, color: 'var(--ns-violet)', fontWeight: 700 }}>Iniciar →</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── NEURALSYNC AI — HISTÓRICO ─────────────── */}
        {neuralaiSessions.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#06b6d4,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ns-text)', margin: 0 }}>NeuralAI — Sessões Recentes</h2>
                <p style={{ fontSize: 12, color: 'var(--ns-text-muted)', margin: 0 }}>Conversas com IA dos filhos Inventores</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {neuralaiSessions.map(s => {
                const child = children.find(c => c.id === s.child_id)
                return (
                  <Card key={s.id} variant="light" style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--ns-text)' }}>{child?.nome ?? '—'}</span>
                        <span style={{ background: '#ecfeff', color: '#06b6d4', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999 }}>Inventores</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {s.engagement && (
                          <span style={{ background: engColor[s.engagement] + '15', color: engColor[s.engagement], fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999 }}>
                            {engLabel[s.engagement]}
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: 'var(--ns-text-muted)' }}>{fmtDate(s.started_at)}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--ns-text-muted)', marginBottom: s.themes?.length ? 10 : 0 }}>
                      <span>⏱ {s.duration_minutes ?? 0} min</span>
                      <span>💬 {Math.floor((s.message_count ?? 0) / 2)} trocas</span>
                    </div>
                    {s.themes?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: s.challenge ? 10 : 0 }}>
                        {s.themes.map((t, i) => (
                          <span key={i} style={{ background: 'var(--ns-violet-light)', color: 'var(--ns-violet)', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, border: '1px solid #ede9fe' }}>{t}</span>
                        ))}
                      </div>
                    )}
                    {s.challenge && (
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#92400e', fontStyle: 'italic' }}>
                        🧩 &ldquo;{s.challenge}&rdquo;
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL EDITAR ─────────────────────────────── */}
      {childToEdit && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,10,30,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 300 }}>
          <div style={{ background: 'white', borderRadius: 24, padding: 36, width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
            <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 4, color: 'var(--ns-text)' }}>Editar {childToEdit.nome}</h3>
            <p style={{ color: 'var(--ns-text-muted)', fontSize: 14, marginBottom: 24 }}>Atualize os dados do perfil</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[['Nome', 'text', 'nome', 'Nome do filho', {}], ['Idade', 'number', 'idade', 'Idade (4–15)', { min: '4', max: '15' }]].map(([label, type, key, ph, extra]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
                  <input className="input-field" type={type} placeholder={ph} value={editForm[key]} onChange={e => setEditForm({ ...editForm, [key]: e.target.value })} {...extra} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Faixa etária</label>
                <select className="input-field" value={editForm.faixa_etaria} onChange={e => setEditForm({ ...editForm, faixa_etaria: e.target.value })}>
                  {FAIXA_SEL.map(f => <option key={f} value={f}>{faixaLabel[f].icon} {faixaLabel[f].label} ({f === 'exploradores' ? '4–5' : f === 'construtores' ? '6–8' : f === 'criadores' ? '9–11' : '12–15'} anos)</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setChildToEdit(null)} style={{ flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: 13, color: '#374151', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--ns-font-body)', fontSize: 14 }}>Cancelar</button>
              <Button variant="primary" onClick={salvarEdicao} disabled={editando} style={{ flex: 1 }}>{editando ? 'Salvando...' : 'Salvar'}</Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL EXCLUIR ───────────────────────────── */}
      {childToDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,10,30,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 300 }}>
          <div style={{ background: 'white', borderRadius: 24, padding: 40, width: '100%', maxWidth: 400, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 8, color: 'var(--ns-text)' }}>Excluir {childToDelete.nome}?</h3>
            <p style={{ color: 'var(--ns-text-muted)', fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>
              Essa ação é <strong>irreversível</strong>. Todo o histórico e perfil cognitivo de <strong>{childToDelete.nome}</strong> serão apagados permanentemente.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setChildToDelete(null)} style={{ flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: 13, color: '#374151', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--ns-font-body)', fontSize: 14 }}>Cancelar</button>
              <Button variant="danger" onClick={excluirFilho} disabled={excluindo} style={{ flex: 1 }}>{excluindo ? 'Excluindo...' : 'Sim, excluir'}</Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL ADICIONAR ─────────────────────────── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,10,30,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 300 }}>
          <div style={{ background: 'white', borderRadius: 24, padding: 36, width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
            <h3 style={{ fontWeight: 900, fontSize: 20, marginBottom: 4, color: 'var(--ns-text)' }}>Adicionar filho</h3>
            <p style={{ color: 'var(--ns-text-muted)', fontSize: 14, marginBottom: 24 }}>Crie o perfil para começar a acompanhar</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nome</label>
                <input className="input-field" placeholder="Nome do filho" value={novoFilho.nome} onChange={e => setNovoFilho({ ...novoFilho, nome: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Idade</label>
                <input className="input-field" type="number" placeholder="Ex: 8" min="4" max="15" value={novoFilho.idade} onChange={e => setNovoFilho({ ...novoFilho, idade: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Faixa etária</label>
                <select className="input-field" value={novoFilho.faixa_etaria} onChange={e => setNovoFilho({ ...novoFilho, faixa_etaria: e.target.value })}>
                  {FAIXA_SEL.map(f => <option key={f} value={f}>{faixaLabel[f].icon} {faixaLabel[f].label} ({f === 'exploradores' ? '4–5' : f === 'construtores' ? '6–8' : f === 'criadores' ? '9–11' : '12–15'} anos)</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: 13, color: '#374151', cursor: 'pointer', fontWeight: 700, fontFamily: 'var(--ns-font-body)', fontSize: 14 }}>Cancelar</button>
              <Button variant="primary" onClick={adicionarFilho} disabled={salvando} style={{ flex: 1 }}>{salvando ? 'Adicionando...' : 'Adicionar'}</Button>
            </div>
          </div>
        </div>
      )}
    </LayoutPai>
  )
}
