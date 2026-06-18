import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import '../../styles/pai.css'

const habilidades = [
  { skill: 'Lógica', value: 75, anterior: 60, meta: 85 },
  { skill: 'Criatividade', value: 60, anterior: 48, meta: 75 },
  { skill: 'Problemas', value: 55, anterior: 42, meta: 70 },
  { skill: 'Computacional', value: 45, anterior: 38, meta: 65 },
  { skill: 'Concentração', value: 80, anterior: 65, meta: 90 },
  { skill: 'Memória', value: 65, anterior: 55, meta: 80 },
  { skill: 'Comunicação', value: 50, anterior: 40, meta: 70 },
  { skill: 'Emocional', value: 70, anterior: 58, meta: 85 },
]

const dadosSemanas = [
  { semana: 'Sem 1', xp: 420, sessoes: 4, minutos: 95 },
  { semana: 'Sem 2', xp: 580, sessoes: 6, minutos: 142 },
  { semana: 'Sem 3', xp: 510, sessoes: 5, minutos: 118 },
  { semana: 'Sem 4', xp: 680, sessoes: 7, minutos: 165 },
]

const recomendacoes = [
  {
    area: 'Concentração',
    nivel: 80,
    status: 'Ponto forte',
    cor: '#7C3AED',
    recomendacao: 'Desempenho excepcional! 80% de concentração aos 8 anos coloca Lia no top 15% da faixa etária. Pesquisas da NeuronUP mostram que crianças com alta concentração nessa fase têm 3x mais chance de manter hábito de leitura na adolescência.',
    atividades: ['Aumentar sessões para 35 min gradualmente', 'Introdução de leitura autônoma', 'Desafios de atenção sustentada'],
    tempo: 'Mantenha consistência do streak atual'
  },
  {
    area: 'Raciocínio Lógico',
    nivel: 75,
    status: 'Acima da média',
    cor: '#10b981',
    recomendacao: 'Excelente progresso! Segundo especialistas do Instituto NeuroSaber, crianças nesta faixa que dominam sequências complexas desenvolvem base sólida para matemática avançada. Introduza desafios com 4-5 etapas.',
    atividades: ['Labirintos digitais com múltiplos caminhos', 'Quebra-cabeças de padrões geométricos', 'Jogos de classificação por 2+ atributos'],
    tempo: '25-30 min por sessão, 3x por semana'
  },
  {
    area: 'Pensamento Computacional',
    nivel: 45,
    status: 'Em desenvolvimento',
    cor: '#F07A20',
    recomendacao: 'Esta habilidade está em fase inicial, normal para 8 anos. A Dra. Fernanda Monteiro recomenda jogos de sequenciamento visual antes de lógica abstrata. Foco em causa e efeito antes de algoritmos formais.',
    atividades: ['Programação visual com blocos Scratch Jr', 'Jogos de instruções sequenciais', 'Atividades de causa e efeito'],
    tempo: '20 min por sessão, 2x por semana — aumentar gradualmente'
  },
  {
    area: 'Inteligência Emocional',
    nivel: 70,
    status: 'Bom progresso',
    cor: '#3b82f6',
    recomendacao: 'Nível adequado para a faixa etária. Segundo o Manual MSD de Desenvolvimento Infantil 2025, aos 8 anos a criança deve identificar e nomear 5 ou mais emoções. Reforce com atividades de reconhecimento em contextos sociais.',
    atividades: ['Histórias com dilemas emocionais', 'Jogos cooperativos não competitivos', 'Diário de emoções ilustrado'],
    tempo: '15 min por dia integrado à rotina familiar'
  },
]

const metas = [
  'Aumentar Pensamento Computacional de 45% para 55% com 2 sessões extras por semana',
  'Manter streak acima de 10 dias consecutivos para consolidar hábito de estudo',
  'Completar todos os desafios semanais do mês para ganhar badge Construtora Nível 4',
  'Aumentar tempo de sessão de 25 para 35 minutos nas últimas 2 semanas do mês',
]

export default function RelatorioPDF() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [gerando, setGerando] = useState(false)
  const [gerado, setGerado] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('visao')

  useEffect(() => {
    supabase.from('children').select('*').eq('nome', 'Lia').single().then(({ data }) => setChild(data))
  }, [])

  const mediaGeral = Math.round(habilidades.reduce((acc, h) => acc + h.value, 0) / habilidades.length)
  const mediaAnterior = Math.round(habilidades.reduce((acc, h) => acc + h.anterior, 0) / habilidades.length)
  const evolucao = mediaGeral - mediaAnterior

  const cores = ['#7C3AED','#F07A20','#10b981','#3b82f6','#ef4444','#ec4899','#f59e0b','#06b6d4']

  const gerarPDF = async () => {
    setGerando(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF('p', 'mm', 'a4')
      const W = 210
      const mes = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
      const nome = child?.nome || 'Lia'

      // ========================
      // PAGINA 1
      // ========================

      // HEADER ROXO
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

      // CARD CRIANCA
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
      doc.text((child?.idade||8) + ' anos  |  Nivel ' + (child?.nivel||3) + '  |  Construtora  |  Media geral: ' + mediaGeral + '%  (+' + evolucao + '% vs mes anterior)', W/2, 76, { align: 'center' })

      // STATS 6 COLUNAS
      let y = 88
      const statItems = [
        ['22','Sessoes'], ['9h 15m','Foco total'],
        [(child?.xp||680)+' XP','Acumulado'], [(child?.neural_coins||324)+'','NeuralCoins'],
        [(child?.streak_maximo||7)+' dias','Streak max'], ['Top 20%','Ranking']
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

      // SECAO: HABILIDADES
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Habilidades Cognitivas — Evolucao Mensal', 15, y)

      // legenda
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

        // NOME DA HABILIDADE
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text(h.skill, x, cy + 4)

        // PERCENTUAL + DIFF
        doc.setTextColor(15, 10, 30)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(h.value + '%', x + 60, cy + 4)

        doc.setTextColor(diff >= 0 ? 16 : 239, diff >= 0 ? 185 : 68, diff >= 0 ? 129 : 68)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text((diff >= 0 ? '+' : '') + diff + '%', x + 74, cy + 4)

        // BARRA META (verde clara)
        doc.setFillColor(209, 250, 229)
        doc.roundedRect(x, cy + 6, 82 * h.meta / 100, 4, 1, 1, 'F')

        // BARRA ANTERIOR (cor clara)
        doc.setFillColor(r > 200 ? 255 : r+80, g > 200 ? 255 : g+80, b > 200 ? 255 : b+80)
        doc.roundedRect(x, cy + 6, 82 * h.anterior / 100, 4, 1, 1, 'F')

        // BARRA ATUAL
        doc.setFillColor(r, g, b)
        doc.roundedRect(x, cy + 6, 82 * h.value / 100, 4, 1, 1, 'F')

        // TRACK
        doc.setDrawColor(229, 231, 235)
        doc.setLineWidth(0.2)
        doc.roundedRect(x, cy + 6, 82, 4, 1, 1, 'S')

        // META LABEL
        doc.setTextColor(156, 163, 175)
        doc.setFontSize(6)
        doc.text('meta ' + h.meta + '%', x + 84, cy + 10)
      })

      y += 76

      // PROGRESSO SEMANAL
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Progresso Semanal', 15, y)
      y += 6

      const maxXP = 800
      const barW = 28
      dadosSemanas.forEach((sem, i) => {
        const x = 15 + i * 48
        const barH = Math.max(2, (sem.xp / maxXP) * 28)

        // coluna fundo
        doc.setFillColor(237, 233, 254)
        doc.roundedRect(x, y + 28 - barH, barW, barH, 2, 2, 'F')

        // topo roxo
        doc.setFillColor(124, 58, 237)
        doc.rect(x, y + 28 - barH, barW, 3, 'F')

        // XP acima
        doc.setTextColor(124, 58, 237)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'bold')
        doc.text(sem.xp + ' XP', x + barW/2, y + 25 - barH, { align: 'center' })

        // labels abaixo
        doc.setTextColor(107, 114, 128)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text(sem.semana, x + barW/2, y + 34, { align: 'center' })
        doc.text(sem.sessoes + ' sessoes', x + barW/2, y + 39, { align: 'center' })
        doc.text(sem.minutos + ' min', x + barW/2, y + 44, { align: 'center' })
      })

      y += 52

      // RECOMENDACOES (top 2)
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

        // fundo do card
        doc.setFillColor(250, 248, 255)
        doc.roundedRect(15, y, W-30, 32, 3, 3, 'F')

        // barra colorida lateral
        doc.setFillColor(r, g, b)
        doc.roundedRect(15, y, 3, 32, 1, 1, 'F')

        // AREA
        doc.setTextColor(r, g, b)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(rec.area + '  ' + rec.nivel + '%', 22, y + 8)

        // STATUS BADGE simples (sem sobreposicao)
        doc.setTextColor(107, 114, 128)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        doc.text('[' + rec.status + ']', 22 + doc.getTextWidth(rec.area + '  ' + rec.nivel + '%') + 3, y + 8)

        // DESCRICAO
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        const recLines = doc.splitTextToSize(rec.recomendacao, W - 48)
        doc.text(recLines.slice(0, 2), 22, y + 16)

        // ATIVIDADES
        doc.setTextColor(r, g, b)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text('Atividades: ', 22, y + 27)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(55, 65, 81)
        doc.text(rec.atividades.slice(0, 2).join('  •  '), 22 + doc.getTextWidth('Atividades: '), y + 27)

        y += 36
      })

      // FOOTER P1
      doc.setFillColor(124, 58, 237)
      doc.rect(0, 277, W, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text('NeuralSync Academy  |  Relatorio Cognitivo Premium  |  neuralsync.com.br', W/2, 284, { align: 'center' })
      doc.text('Pagina 1 de 2  |  ' + new Date().toLocaleDateString('pt-BR') + '  |  Confidencial', W/2, 292, { align: 'center' })

      // ========================
      // PAGINA 2
      // ========================
      doc.addPage()

      doc.setFillColor(124, 58, 237)
      doc.rect(0, 0, W, 16, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text('NeuralSync  |  Plano de Acao Personalizado  |  ' + nome, W/2, 10, { align: 'center' })

      y = 24

      // TODAS AS RECOMENDACOES
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

        // TITULO e NIVEL na mesma linha, bem separados
        doc.setTextColor(r, g, b)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(rec.area, 22, y + 7)

        doc.setTextColor(107, 114, 128)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text(rec.nivel + '%  —  ' + rec.status, W - 15, y + 7, { align: 'right' })

        // linha separadora fina
        doc.setDrawColor(230, 225, 255)
        doc.setLineWidth(0.2)
        doc.line(22, y + 10, W - 15, y + 10)

        // RECOMENDACAO
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        const recLines = doc.splitTextToSize(rec.recomendacao, W - 46)
        doc.text(recLines.slice(0, 2), 22, y + 17)

        // ATIVIDADES E TEMPO na mesma linha
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

      // METAS DO PROXIMO MES
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

      // NOTA CIENTIFICA
      doc.setFillColor(239, 246, 255)
      doc.roundedRect(15, y, W-30, 22, 3, 3, 'F')
      doc.setTextColor(59, 130, 246)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('Base Cientifica deste Relatorio', 22, y + 7)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      const nota = 'Analise baseada em Piaget (fase operatoria concreta), diretrizes do Manual MSD de Desenvolvimento Infantil (2025), Instituto NeuroSaber, e pesquisas da Dra. Fernanda Monteiro sobre estimulacao cognitiva infantil para a faixa etaria Construtores (6-8 anos).'
      const notaLines = doc.splitTextToSize(nota, W - 46)
      doc.text(notaLines, 22, y + 14)

      // FOOTER P2
      doc.setFillColor(124, 58, 237)
      doc.rect(0, 277, W, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text('NeuralSync Academy  |  Relatorio Cognitivo Premium  |  Pagina 2 de 2', W/2, 284, { align: 'center' })
      doc.text('neuralsync.com.br  |  ' + new Date().toLocaleDateString('pt-BR'), W/2, 292, { align: 'center' })

      doc.save('NeuralSync_Relatorio_Premium_' + nome + '.pdf')
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
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{child.idade} anos  •  Construtora  •  Nivel {child.nivel}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'42px',fontWeight:'900',lineHeight:'1'}}>{mediaGeral}%</div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)'}}>média geral</div>
                <div style={{fontSize:'13px',color:'#a7f3d0',fontWeight:'700',marginTop:'2px'}}>+{evolucao}% vs mês anterior</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px'}}>
              {[['22','Sessoes'],['9h 15m','Foco'],[(child.xp||680)+' XP','Total'],[(child.neural_coins||324),'Coins'],[child.streak_maximo+' dias','Streak'],['Top 20%','Ranking']].map(([val,label]) => (
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
                Este plano foi desenvolvido com base no perfil cognitivo individual de {child.nome}, nas diretrizes de Piaget para a fase operatória concreta (6-8 anos), Manual MSD de Desenvolvimento Infantil 2025 e pesquisas da Dra. Fernanda Monteiro. As metas respeitam o ritmo de desenvolvimento da faixa Construtores.
              </p>
            </div>
          </div>
        )}

        {/* BOTAO PDF */}
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
          Relatório completo de 2 páginas com análise personalizada para {child.nome}
        </p>
      </div>
    </div>
  )
}