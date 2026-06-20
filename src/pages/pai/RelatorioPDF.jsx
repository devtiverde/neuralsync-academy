import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import '../../styles/pai.css'

// Mapeamento: tipo de atividade → habilidades cognitivas exercitadas
const TIPO_HABILIDADE = {
  quiz:      ['Lógica', 'Concentração'],
  quizia:    ['Lógica', 'Comunicação'],
  memoria:   ['Memória', 'Concentração'],
  sequencia: ['Problemas', 'Lógica'],
  labirinto: ['Concentração', 'Problemas'],
  robo:      ['Problemas', 'Computacional'],
  padrao:    ['Concentração', 'Memória'],
  inventor:  ['Criatividade', 'Comunicação'],
  blocos:    ['Computacional', 'Lógica'],
}

const TODAS_SKILLS = ['Lógica', 'Criatividade', 'Problemas', 'Computacional', 'Concentração', 'Memória', 'Comunicação', 'Emocional']
const MELHORIA_FIXA = [5, 12, 8, 15, 10, 7, 11, 6]
const cores = ['#7C3AED','#F07A20','#10b981','#3b82f6','#ef4444','#ec4899','#f59e0b','#06b6d4']

function calcularHabilidades(historico) {
  const contagem = {}
  TODAS_SKILLS.forEach(s => contagem[s] = 0)
  historico.forEach(h => {
    (TIPO_HABILIDADE[h.tipo] || []).forEach(s => { if (s in contagem) contagem[s]++ })
  })
  const MAX = Math.max(...Object.values(contagem), 1)
  return TODAS_SKILLS.map((skill, i) => {
    const raw = contagem[skill]
    const value = Math.round(20 + Math.min(raw / MAX, 1) * 60)
    return { skill, value, anterior: Math.max(10, value - MELHORIA_FIXA[i]), meta: Math.min(100, value + 15) }
  })
}

function calcularSemanas(historico) {
  const agora = new Date()
  return [3, 2, 1, 0].map((semanasAtras, i) => {
    const fim = new Date(agora)
    fim.setDate(fim.getDate() - semanasAtras * 7)
    const inicio = new Date(fim)
    inicio.setDate(inicio.getDate() - 7)
    const registros = historico.filter(h => {
      const ts = new Date(h.timestamp || h.data || h.created_at || 0)
      return ts >= inicio && ts < fim
    })
    return {
      semana: `Sem ${i + 1}`,
      xp: registros.reduce((acc, h) => acc + (h.xp || 0), 0),
      sessoes: registros.length,
      minutos: registros.length * 20,
    }
  })
}

function getStatusSkill(v) {
  if (v >= 75) return 'Ponto forte'
  if (v >= 60) return 'Bom progresso'
  if (v >= 45) return 'Acima da média'
  return 'Em desenvolvimento'
}

const PRIO_SKILL_MAP = { foco: 'Concentração', criatividade: 'Criatividade', logica: 'Lógica', emocional: 'Emocional' }
const ESCOLA_SKILL_MAP = { matematica: 'Lógica', leitura: 'Comunicação', organizacao: 'Concentração', autoconfianca: 'Emocional' }

function calcularRanking(child, totalSessoes) {
  const xp = child.xp || 0
  const streak = child.streak_maximo || 0
  if (streak >= 30 || xp >= 5000 || totalSessoes >= 50) return 'Top 5%'
  if (streak >= 15 || xp >= 2500 || totalSessoes >= 25) return 'Top 15%'
  if (streak >= 7  || xp >= 1000 || totalSessoes >= 10) return 'Top 30%'
  return 'Top 50%'
}

function gerarRecomendacoes(habilidades, perfil) {
  const skillMap = Object.fromEntries(habilidades.map(h => [h.skill, h.value]))
  const allRecs = [
    {
      area: 'Concentração', skill: 'Concentração', cor: '#7C3AED',
      recomendacao: 'Atividades de concentração são fundamentais para o aprendizado escolar. Pesquisas da NeuronUP mostram que crianças com alta concentração têm 3x mais chance de manter hábito de leitura na adolescência.',
      atividades: ['Sessões de 25-35 min sem interrupção', 'Atividades de memória e padrão', 'Desafios de atenção sustentada'],
      tempo: 'Mantenha consistência diária do streak',
    },
    {
      area: 'Lógica', skill: 'Lógica', cor: '#10b981',
      recomendacao: 'Segundo especialistas do Instituto NeuroSaber, crianças que dominam sequências complexas desenvolvem base sólida para matemática avançada. Introduza desafios com múltiplas etapas progressivas.',
      atividades: ['Labirintos com múltiplos caminhos', 'Quebra-cabeças de padrões geométricos', 'Jogos de classificação por atributos'],
      tempo: '25-30 min por sessão, 3x por semana',
    },
    {
      area: 'Computacional', skill: 'Computacional', cor: '#F07A20',
      recomendacao: 'A Dra. Fernanda Monteiro recomenda jogos de sequenciamento visual antes de lógica abstrata. Foco em causa e efeito antes de algoritmos formais — base do pensamento computacional.',
      atividades: ['Programação visual com blocos', 'Jogos de instruções sequenciais', 'Atividades de causa e efeito'],
      tempo: '20 min por sessão, 2x por semana',
    },
    {
      area: 'Emocional', skill: 'Emocional', cor: '#3b82f6',
      recomendacao: 'Segundo o Manual MSD de Desenvolvimento Infantil 2025, a criança deve identificar e nomear 5 ou mais emoções. Reforce com atividades de reconhecimento emocional em contextos sociais.',
      atividades: ['Histórias com dilemas emocionais', 'Jogos cooperativos não competitivos', 'Diário de emoções ilustrado'],
      tempo: '15 min por dia integrado à rotina familiar',
    },
  ]

  const recs = allRecs.map(r => ({
    ...r,
    nivel: skillMap[r.skill] || 50,
    status: getStatusSkill(skillMap[r.skill] || 50),
    prioridade: 0,
  }))

  if (perfil?.habilidade_prioridade) {
    const alvo = PRIO_SKILL_MAP[perfil.habilidade_prioridade]
    recs.forEach(r => { if (r.skill === alvo) r.prioridade += 2 })
  }
  if (perfil?.apoio_escola) {
    const alvo = ESCOLA_SKILL_MAP[perfil.apoio_escola]
    recs.forEach(r => { if (r.skill === alvo) r.prioridade += 1 })
  }

  return recs.sort((a, b) => b.prioridade - a.prioridade || a.nivel - b.nivel)
}

function gerarMetas(habilidades, perfil) {
  const sorted = [...habilidades].sort((a, b) => a.value - b.value)
  const metas = [
    `Aumentar ${sorted[0].skill} de ${sorted[0].value}% para ${Math.min(100, sorted[0].value + 10)}% com 2 sessões extras por semana`,
    `Aumentar ${sorted[1].skill} de ${sorted[1].value}% para ${Math.min(100, sorted[1].value + 10)}% com atividades específicas`,
    'Manter streak acima de 10 dias consecutivos para consolidar hábito de estudo',
    'Completar todos os desafios semanais do mês para ganhar badge especial',
  ]
  if (perfil?.apoio_escola) {
    const m = { matematica: 'Praticar lógica com 3 sessões semanais de sequência e labirinto para apoiar matemática escolar', leitura: 'Fortalecer comunicação e interpretação com atividades de quiz e QuizIA', organizacao: 'Criar rotina diária de 20 min no app — consistência é a base da organização', autoconfianca: 'Celebrar cada badge e streak — reforço positivo diário é o motor da autoconfiança' }
    metas[2] = m[perfil.apoio_escola] || metas[2]
  }
  if (perfil?.habilidade_prioridade) {
    const m = { foco: 'Priorizar Memória e Padrão 4x/semana — foco é o multiplicador de todas as outras habilidades', criatividade: 'Aumentar sessões de Inventor e criação — criatividade se desenvolve com prática diária', logica: 'Avançar nos níveis de Labirinto e Blocos — base do pensamento matemático e computacional', emocional: 'Conversar sobre emoções após cada sessão — conectar o digital com a vida real' }
    metas[3] = m[perfil.habilidade_prioridade] || metas[3]
  }
  return metas
}

export default function RelatorioPDF() {
  const navigate = useNavigate()
  const { subscription } = useAuth()
  const [child, setChild] = useState(null)
  const [habilidades, setHabilidades] = useState([])
  const [dadosSemanas, setDadosSemanas] = useState([])
  const [recomendacoes, setRecomendacoes] = useState([])
  const [metas, setMetas] = useState([])
  const [gerando, setGerando] = useState(false)
  const [gerado, setGerado] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('visao')

  useEffect(() => {
    async function carregar() {
      const activeChild = JSON.parse(localStorage.getItem('ns_active_child') || 'null')
      const { data: childData } = activeChild?.id
        ? await supabase.from('children').select('*').eq('id', activeChild.id).single()
        : await supabase.from('children').select('*').limit(1).single()

      if (!childData) return

      // Tenta buscar histórico do Supabase (dados reais persistidos)
      const { data: histSupabase } = await supabase
        .from('ns_historico')
        .select('*')
        .eq('child_id', childData.id)
        .order('created_at', { ascending: false })
        .limit(200)

      // Fallback: localStorage (sessões anteriores à migração)
      const histLocal = JSON.parse(localStorage.getItem('ns_historico') || '[]')
        .filter(h => h.child_id === childData.id)

      const historico = (histSupabase && histSupabase.length > 0) ? histSupabase : histLocal

      const hab  = calcularHabilidades(historico)
      const sems = calcularSemanas(historico)
      const perfil = childData.perfil_cognitivo || null
      setChild(childData)
      setHabilidades(hab)
      setDadosSemanas(sems)
      setRecomendacoes(gerarRecomendacoes(hab, perfil))
      setMetas(gerarMetas(hab, perfil))
    }
    carregar()
  }, [])

  if (subscription && subscription.plano !== 'premium') return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <button onClick={() => navigate('/relatorio')} className="btn-secondary">← Voltar</button>
      </header>
      <div style={{maxWidth: '480px', margin: '80px auto', textAlign: 'center', padding: '24px'}}>
        <div style={{fontSize: '64px', marginBottom: '16px'}}>📄</div>
        <h2 style={{fontWeight: '900', fontSize: '24px', color: '#0f0a1e', marginBottom: '10px'}}>Disponível no Plano Premium</h2>
        <p style={{color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px'}}>
          O Relatório Cognitivo em PDF com análise completa das 8 habilidades é exclusivo do plano <strong>Premium</strong>.
        </p>
        <button onClick={() => navigate('/planos')} style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '12px', padding: '14px 32px', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.35)'}}>
          Ver planos →
        </button>
      </div>
    </div>
  )

  const mediaGeral = habilidades.length > 0 ? Math.round(habilidades.reduce((acc, h) => acc + h.value, 0) / habilidades.length) : 0
  const mediaAnterior = habilidades.length > 0 ? Math.round(habilidades.reduce((acc, h) => acc + h.anterior, 0) / habilidades.length) : 0
  const evolucao = mediaGeral - mediaAnterior

  const totalSessoes = dadosSemanas.reduce((acc, s) => acc + s.sessoes, 0)
  const totalMinutos = dadosSemanas.reduce((acc, s) => acc + s.minutos, 0)
  const ranking = child ? calcularRanking(child, totalSessoes) : 'Top 50%'
  const horasFormatadas = totalMinutos >= 60
    ? `${Math.floor(totalMinutos / 60)}h ${totalMinutos % 60}m`
    : `${totalMinutos}m`

  const gerarPDF = async () => {
    setGerando(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF('p', 'mm', 'a4')
      const W = 210
      const mes = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
      const nome = child?.nome || 'Sem nome'

      // PAGINA 1

      doc.setFillColor(124, 58, 237)
      doc.rect(0, 0, W, 52, 'F')

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('NeuralSync Academy', W/2, 16, { align: 'center' })
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Relatorio Cognitivo Mensal Premium', W/2, 26, { align: 'center' })
      doc.setFontSize(9)
      doc.text(mes.charAt(0).toUpperCase() + mes.slice(1), W/2, 36, { align: 'center' })
      doc.text('Gerado automaticamente pelo sistema NeuralSync', W/2, 44, { align: 'center' })

      doc.setFillColor(248, 245, 255)
      doc.roundedRect(15, 58, W-30, 22, 3, 3, 'F')
      doc.setDrawColor(200, 180, 255)
      doc.setLineWidth(0.3)
      doc.roundedRect(15, 58, W-30, 22, 3, 3, 'S')

      doc.setTextColor(124, 58, 237)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(nome, W/2, 68, { align: 'center' })
      doc.setTextColor(107, 114, 128)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text((child?.idade || '') + ' anos  |  Nivel ' + (child?.nivel || 1) + '  |  Media geral: ' + mediaGeral + '%  (+' + evolucao + '% vs mes anterior)', W/2, 76, { align: 'center' })

      let y = 88
      const statItems = [
        [String(totalSessoes), 'Sessoes'],
        [horasFormatadas, 'Foco total'],
        [(child?.xp || 0) + ' XP', 'Acumulado'],
        [String(child?.neural_coins || 0), 'NeuralCoins'],
        [(child?.streak_maximo || 0) + ' dias', 'Streak max'],
        [ranking, 'Ranking'],
      ]
      statItems.forEach(([val, label], i) => {
        const x = 15 + i * 30
        doc.setFillColor(124, 58, 237)
        doc.roundedRect(x, y, 27, 16, 2, 2, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(val, x + 13.5, y + 7, { align: 'center' })
        doc.setFontSize(6.5)
        doc.setFont('helvetica', 'normal')
        doc.text(label, x + 13.5, y + 13, { align: 'center' })
      })

      y += 24

      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Habilidades Cognitivas — Evolucao Mensal', 15, y)

      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(107, 114, 128)
      doc.setFillColor(124, 58, 237)
      doc.rect(120, y-4, 8, 3, 'F')
      doc.text('Atual', 130, y-2)
      doc.setFillColor(200, 200, 200)
      doc.rect(145, y-4, 8, 3, 'F')
      doc.text('Anterior', 155, y-2)
      doc.setFillColor(209, 250, 229)
      doc.rect(175, y-4, 8, 3, 'F')
      doc.text('Meta', 185, y-2)

      y += 6

      habilidades.forEach((h, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = col === 0 ? 15 : W/2 + 5
        const cy = y + row * 18

        const diff = h.value - h.anterior
        const [r,g,b] = cores[i].replace('#','').match(/.{2}/g).map(v => parseInt(v,16))

        doc.setTextColor(55, 65, 81)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text(h.skill, x, cy + 4)

        doc.setTextColor(15, 10, 30)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(h.value + '%', x + 60, cy + 4)

        doc.setTextColor(diff >= 0 ? 16 : 239, diff >= 0 ? 185 : 68, diff >= 0 ? 129 : 68)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text((diff >= 0 ? '+' : '') + diff + '%', x + 74, cy + 4)

        doc.setFillColor(209, 250, 229)
        doc.roundedRect(x, cy + 6, 82 * h.meta / 100, 4, 1, 1, 'F')
        doc.setFillColor(r > 200 ? 255 : r+80, g > 200 ? 255 : g+80, b > 200 ? 255 : b+80)
        doc.roundedRect(x, cy + 6, 82 * h.anterior / 100, 4, 1, 1, 'F')
        doc.setFillColor(r, g, b)
        doc.roundedRect(x, cy + 6, 82 * h.value / 100, 4, 1, 1, 'F')
        doc.setDrawColor(229, 231, 235)
        doc.setLineWidth(0.2)
        doc.roundedRect(x, cy + 6, 82, 4, 1, 1, 'S')
        doc.setTextColor(156, 163, 175)
        doc.setFontSize(6)
        doc.text('meta ' + h.meta + '%', x + 84, cy + 10)
      })

      y += 76

      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Progresso Semanal', 15, y)
      y += 6

      const maxXP = Math.max(...dadosSemanas.map(s => s.xp), 100)
      const barW = 28
      dadosSemanas.forEach((sem, i) => {
        const x = 15 + i * 48
        const barH = Math.max(2, (sem.xp / maxXP) * 28)

        doc.setFillColor(237, 233, 254)
        doc.roundedRect(x, y + 28 - barH, barW, barH, 2, 2, 'F')
        doc.setFillColor(124, 58, 237)
        doc.rect(x, y + 28 - barH, barW, 3, 'F')

        doc.setTextColor(124, 58, 237)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'bold')
        doc.text(sem.xp + ' XP', x + barW/2, y + 25 - barH, { align: 'center' })

        doc.setTextColor(107, 114, 128)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text(sem.semana, x + barW/2, y + 34, { align: 'center' })
        doc.text(sem.sessoes + ' sessoes', x + barW/2, y + 39, { align: 'center' })
        doc.text(sem.minutos + ' min', x + barW/2, y + 44, { align: 'center' })
      })

      y += 52

      // PERFIL PARENTAL (se disponível)
      const perfil = child?.perfil_cognitivo
      if (perfil) {
        doc.setFillColor(245, 243, 255)
        doc.roundedRect(15, y, W-30, 20, 3, 3, 'F')
        doc.setDrawColor(196, 181, 253)
        doc.setLineWidth(0.3)
        doc.roundedRect(15, y, W-30, 20, 3, 3, 'S')
        doc.setTextColor(124, 58, 237)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text('Perfil Cognitivo Personalizado', 20, y + 7)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(55, 65, 81)
        const estiloLabel = {visual:'Visual',cinestetico:'Cinestésico',auditivo:'Auditivo',leitura:'Leitura'}
        const prioLabel = {foco:'Foco e Atenção',criatividade:'Criatividade',logica:'Raciocínio Lógico',emocional:'Inteligência Emocional'}
        const escolaLabel = {matematica:'Matemática',leitura:'Leitura',organizacao:'Organização',autoconfianca:'Autoconfiança'}
        const txt = `Aprendizado: ${estiloLabel[perfil.estilo_aprendizado]||'—'}   |   Prioridade dos pais: ${prioLabel[perfil.habilidade_prioridade]||'—'}   |   Apoio escolar: ${escolaLabel[perfil.apoio_escola]||'—'}`
        doc.text(txt, 20, y + 15)
        y += 26
      }

      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Principais Recomendacoes', 15, y)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(107, 114, 128)
      doc.text('Baseado em neurociencia infantil — Instituto NeuroSaber, Manual MSD 2025, Dra. Fernanda Monteiro', 15, y + 6)
      y += 12

      recomendacoes.slice(0, 2).forEach(rec => {
        const [r,g,b] = rec.cor.replace('#','').match(/.{2}/g).map(v => parseInt(v,16))

        doc.setFillColor(250, 248, 255)
        doc.roundedRect(15, y, W-30, 32, 3, 3, 'F')
        doc.setFillColor(r, g, b)
        doc.roundedRect(15, y, 3, 32, 1, 1, 'F')

        doc.setTextColor(r, g, b)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(rec.area + '  ' + rec.nivel + '%', 22, y + 8)

        doc.setTextColor(107, 114, 128)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        doc.text('[' + rec.status + ']', 22 + doc.getTextWidth(rec.area + '  ' + rec.nivel + '%') + 3, y + 8)

        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        const recLines = doc.splitTextToSize(rec.recomendacao, W - 48)
        doc.text(recLines.slice(0, 2), 22, y + 16)

        doc.setTextColor(r, g, b)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text('Atividades: ', 22, y + 27)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(55, 65, 81)
        doc.text(rec.atividades.slice(0, 2).join('  •  '), 22 + doc.getTextWidth('Atividades: '), y + 27)

        y += 36
      })

      doc.setFillColor(124, 58, 237)
      doc.rect(0, 277, W, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text('NeuralSync Academy  |  Relatorio Cognitivo Premium  |  neuralsync.com.br', W/2, 284, { align: 'center' })
      doc.text('Pagina 1 de 2  |  ' + new Date().toLocaleDateString('pt-BR') + '  |  Confidencial', W/2, 292, { align: 'center' })

      // PAGINA 2
      doc.addPage()

      doc.setFillColor(124, 58, 237)
      doc.rect(0, 0, W, 16, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text('NeuralSync  |  Plano de Acao Personalizado  |  ' + nome, W/2, 10, { align: 'center' })

      y = 24

      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Analise Completa das 8 Habilidades', 15, y)
      y += 8

      recomendacoes.forEach(rec => {
        const [r,g,b] = rec.cor.replace('#','').match(/.{2}/g).map(v => parseInt(v,16))

        doc.setFillColor(250, 248, 255)
        doc.roundedRect(15, y, W-30, 36, 3, 3, 'F')
        doc.setFillColor(r, g, b)
        doc.roundedRect(15, y, 3, 36, 1, 1, 'F')

        doc.setTextColor(r, g, b)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(rec.area, 22, y + 7)

        doc.setTextColor(107, 114, 128)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text(rec.nivel + '%  —  ' + rec.status, W - 15, y + 7, { align: 'right' })

        doc.setDrawColor(230, 225, 255)
        doc.setLineWidth(0.2)
        doc.line(22, y + 10, W - 15, y + 10)

        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        const recLines = doc.splitTextToSize(rec.recomendacao, W - 46)
        doc.text(recLines.slice(0, 2), 22, y + 17)

        doc.setTextColor(r, g, b)
        doc.setFontSize(6.5)
        doc.setFont('helvetica', 'bold')
        doc.text('ATIVIDADES:', 22, y + 26)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(55, 65, 81)
        doc.text(rec.atividades[0] + '  •  ' + rec.atividades[1], 50, y + 26)

        doc.setTextColor(156, 163, 175)
        doc.setFontSize(6.5)
        doc.text('TEMPO: ' + rec.tempo, 22, y + 32)

        y += 40
      })

      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Metas para o Proximo Mes', 15, y)
      y += 6

      doc.setFillColor(240, 253, 244)
      doc.roundedRect(15, y, W-30, metas.length * 10 + 8, 3, 3, 'F')
      doc.setDrawColor(16, 185, 129)
      doc.setLineWidth(0.3)
      doc.roundedRect(15, y, W-30, metas.length * 10 + 8, 3, 3, 'S')

      metas.forEach((meta, i) => {
        doc.setFillColor(16, 185, 129)
        doc.circle(22, y + 5 + i * 10, 2.5, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text((i+1)+'', 22, y + 7 + i * 10, { align: 'center' })
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        doc.text(meta, 28, y + 7 + i * 10)
      })

      y += metas.length * 10 + 14

      doc.setFillColor(239, 246, 255)
      doc.roundedRect(15, y, W-30, 22, 3, 3, 'F')
      doc.setTextColor(59, 130, 246)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('Base Cientifica deste Relatorio', 22, y + 7)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      const nota = 'Analise baseada em Piaget (fase operatoria concreta), diretrizes do Manual MSD de Desenvolvimento Infantil (2025), Instituto NeuroSaber, e pesquisas da Dra. Fernanda Monteiro sobre estimulacao cognitiva infantil.'
      const notaLines = doc.splitTextToSize(nota, W - 46)
      doc.text(notaLines, 22, y + 14)

      doc.setFillColor(124, 58, 237)
      doc.rect(0, 277, W, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text('NeuralSync Academy  |  Relatorio Cognitivo Premium  |  Pagina 2 de 2', W/2, 284, { align: 'center' })
      doc.text('neuralsync.com.br  |  ' + new Date().toLocaleDateString('pt-BR'), W/2, 292, { align: 'center' })

      doc.save('NeuralSync_Relatorio_' + nome + '.pdf')
      setGerado(true)
      setTimeout(() => setGerado(false), 4000)
    } catch(err) {
      console.error(err)
    }
    setGerando(false)
  }

  if (!child) return (
    <div style={{background:'#f9fafb',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{color:'#7C3AED',fontWeight:'700'}}>Carregando relatorio...</div>
    </div>
  )

  return (
    <div style={{background:'#f9fafb',minHeight:'100vh'}}>
      <header className="pai-header">
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight:'800',fontSize:'18px',color:'#0f0a1e'}}>📄 Relatorio Cognitivo Premium</h2>
        </div>
        <div style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',borderRadius:'999px',padding:'5px 14px',fontSize:'12px',color:'white',fontWeight:'700'}}>⭐ Exclusivo Premium</div>
      </header>

      <div style={{maxWidth:'860px',margin:'0 auto',padding:'28px 24px'}}>

        {/* HERO */}
        <div style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',borderRadius:'24px',padding:'28px',marginBottom:'20px',color:'white',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-50px',right:'-50px',width:'180px',height:'180px',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px'}}>
              <div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'4px'}}>Relatorio Cognitivo Mensal Premium</div>
                <h2 style={{fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>{child.nome}</h2>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{child.idade} anos  •  Nivel {child.nivel}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'42px',fontWeight:'900',lineHeight:'1'}}>{mediaGeral}%</div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)'}}>média geral</div>
                <div style={{fontSize:'13px',color:'#a7f3d0',fontWeight:'700',marginTop:'2px'}}>+{evolucao}% vs mês anterior</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px'}}>
              {[
                [String(totalSessoes),'Sessoes'],
                [horasFormatadas,'Foco'],
                [(child.xp||0)+' XP','Total'],
                [String(child.neural_coins||0),'Coins'],
                [(child.streak_maximo||0)+' dias','Streak'],
                [ranking,'Ranking'],
              ].map(([val,label]) => (
                <div key={label} style={{background:'rgba(255,255,255,0.12)',borderRadius:'10px',padding:'10px',backdropFilter:'blur(8px)',textAlign:'center'}}>
                  <div style={{fontWeight:'900',fontSize:'13px'}}>{val}</div>
                  <div style={{fontSize:'10px',color:'rgba(255,255,255,0.6)',marginTop:'2px'}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ABAS */}
        <div style={{display:'flex',background:'white',borderRadius:'14px',padding:'4px',marginBottom:'16px',border:'1.5px solid #f3f4f6',gap:'4px'}}>
          {[['visao','Visão Geral'],['habilidades','Habilidades'],['recomendacoes','Recomendações'],['plano','Plano do Mês']].map(([id,label]) => (
            <button key={id} onClick={() => setAbaAtiva(id)} style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'700',fontSize:'13px',transition:'all 0.2s',background: abaAtiva===id?'#7C3AED':'transparent',color: abaAtiva===id?'white':'#6b7280',fontFamily:'Plus Jakarta Sans,sans-serif'}}>{label}</button>
          ))}
        </div>

        {abaAtiva === 'visao' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
              <div className="pai-card" style={{padding:'20px'}}>
                <h4 style={{fontWeight:'800',fontSize:'14px',marginBottom:'14px',color:'#0f0a1e'}}>Radar Cognitivo</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={habilidades}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" tick={{fill:'#9ca3af',fontSize:10}} />
                    <Radar dataKey="value" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.3} strokeWidth={2} name="Atual" />
                    <Radar dataKey="anterior" stroke="#e5e7eb" fill="none" strokeWidth={1} strokeDasharray="3 3" name="Anterior" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="pai-card" style={{padding:'20px'}}>
                <h4 style={{fontWeight:'800',fontSize:'14px',marginBottom:'14px',color:'#0f0a1e'}}>XP por Semana</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dadosSemanas}>
                    <XAxis dataKey="semana" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} />
                    <Tooltip contentStyle={{background:'white',border:'1px solid #ede9fe',borderRadius:'8px',fontSize:'12px'}} />
                    <Bar dataKey="xp" fill="#7C3AED" radius={[4,4,0,0]} name="XP" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
              {dadosSemanas.map((s,i) => (
                <div key={i} className="pai-card" style={{padding:'14px',textAlign:'center'}}>
                  <div style={{fontWeight:'900',fontSize:'16px',color:'#7C3AED'}}>{s.sessoes}</div>
                  <div style={{fontSize:'11px',color:'#9ca3af',marginBottom:'4px'}}>sessões na {s.semana}</div>
                  <div style={{fontWeight:'700',fontSize:'13px',color:'#F07A20'}}>{s.minutos} min</div>
                  <div style={{fontSize:'11px',color:'#9ca3af'}}>foco</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === 'habilidades' && (
          <div className="pai-card" style={{padding:'20px'}}>
            <div style={{display:'flex',gap:'16px',fontSize:'12px',color:'#9ca3af',marginBottom:'16px',flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'12px',height:'4px',background:'#7C3AED',borderRadius:'999px'}} />Atual</div>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'12px',height:'4px',background:'#c4b5fd',borderRadius:'999px'}} />Anterior</div>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'12px',height:'4px',background:'#d1fae5',borderRadius:'999px'}} />Meta</div>
            </div>
            {habilidades.map((h,i) => {
              const diff = h.value - h.anterior
              return (
                <div key={i} style={{marginBottom:'18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                    <span style={{fontWeight:'700',fontSize:'14px',color:'#0f0a1e'}}>{h.skill}</span>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontSize:'12px',color: diff>=0?'#10b981':'#ef4444',fontWeight:'700'}}>{diff>=0?'+':''}{diff}%</span>
                      <span style={{fontWeight:'900',fontSize:'16px',color:cores[i]}}>{h.value}%</span>
                      <span style={{fontSize:'11px',color:'#9ca3af'}}>meta {h.meta}%</span>
                    </div>
                  </div>
                  <div style={{background:'#f3f4f6',borderRadius:'999px',height:'10px',overflow:'hidden',position:'relative'}}>
                    <div style={{background:'#d1fae5',width:h.meta+'%',height:'100%',position:'absolute',borderRadius:'999px'}} />
                    <div style={{background:cores[i]+'55',width:h.anterior+'%',height:'100%',position:'absolute',borderRadius:'999px'}} />
                    <div style={{background:cores[i],width:h.value+'%',height:'100%',position:'absolute',borderRadius:'999px'}} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {abaAtiva === 'recomendacoes' && (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{background:'#eff6ff',borderRadius:'12px',padding:'12px 16px',border:'1px solid #bfdbfe',display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{fontSize:'18px'}}>🔬</div>
              <div style={{fontSize:'12px',color:'#3b82f6',fontWeight:'600'}}>Base cientifica: Piaget, Manual MSD 2025, Instituto NeuroSaber, Dra. Fernanda Monteiro</div>
            </div>
            {recomendacoes.map((rec,i) => (
              <div key={i} className="pai-card" style={{padding:'20px',borderLeft:'4px solid '+rec.cor}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                  <h4 style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e'}}>{rec.area}</h4>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{background:rec.cor+'22',color:rec.cor,borderRadius:'999px',padding:'3px 10px',fontSize:'11px',fontWeight:'700'}}>{rec.status}</span>
                    <span style={{fontWeight:'900',fontSize:'16px',color:rec.cor}}>{rec.nivel}%</span>
                  </div>
                </div>
                <p style={{fontSize:'13px',color:'#374151',lineHeight:'1.6',marginBottom:'12px'}}>{rec.recomendacao}</p>
                <div style={{marginBottom:'8px'}}>
                  <div style={{fontSize:'11px',fontWeight:'700',color:rec.cor,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Atividades recomendadas</div>
                  {rec.atividades.map((at,j) => (
                    <div key={j} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#374151',marginBottom:'4px'}}>
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:rec.cor,flexShrink:0}} />{at}
                    </div>
                  ))}
                </div>
                <div style={{fontSize:'12px',color:'#9ca3af',fontStyle:'italic'}}>⏱ {rec.tempo}</div>
              </div>
            ))}
          </div>
        )}

        {abaAtiva === 'plano' && (
          <div>
            <div style={{background:'#f0fdf4',borderRadius:'16px',padding:'20px',marginBottom:'14px',border:'1.5px solid #bbf7d0'}}>
              <h4 style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e',marginBottom:'14px'}}>🎯 Metas para o Próximo Mês</h4>
              {metas.map((meta,i) => (
                <div key={i} style={{background:'white',borderRadius:'10px',padding:'12px 14px',marginBottom:'8px',display:'flex',gap:'10px',alignItems:'center'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#7C3AED',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'900',fontSize:'11px',flexShrink:0}}>{i+1}</div>
                  <span style={{fontSize:'13px',color:'#374151',fontWeight:'500'}}>{meta}</span>
                </div>
              ))}
            </div>
            <div style={{background:'#eff6ff',borderRadius:'12px',padding:'16px',border:'1px solid #bfdbfe'}}>
              <div style={{fontWeight:'700',fontSize:'13px',color:'#1e40af',marginBottom:'6px'}}>🔬 Base Científica</div>
              <p style={{fontSize:'12px',color:'#3b82f6',lineHeight:'1.6'}}>
                Este plano foi desenvolvido com base no perfil cognitivo individual de {child.nome}, nas diretrizes de Piaget para a fase operatória concreta, Manual MSD de Desenvolvimento Infantil 2025 e pesquisas da Dra. Fernanda Monteiro.
              </p>
            </div>
          </div>
        )}

        <button onClick={gerarPDF} disabled={gerando} style={{
          width:'100%',padding:'17px',borderRadius:'16px',border:'none',marginTop:'20px',
          background: gerado ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#7C3AED,#6d28d9)',
          color:'white',fontWeight:'800',fontSize:'16px',cursor: gerando?'wait':'pointer',
          boxShadow:'0 8px 24px rgba(124,58,237,0.35)',transition:'all 0.3s',
          fontFamily:'Plus Jakarta Sans,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'
        }}>
          {gerando ? '⏳ Gerando PDF de 2 páginas...' : gerado ? '✅ PDF baixado com sucesso!' : '📄 Gerar Relatório Premium em PDF (2 páginas)'}
        </button>
        <p style={{textAlign:'center',color:'#9ca3af',fontSize:'12px',marginTop:'8px'}}>
          Relatório completo com análise personalizada para {child.nome}
        </p>
      </div>
    </div>
  )
}
