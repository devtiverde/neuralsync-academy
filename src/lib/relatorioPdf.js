/**
 * Desenho do Relatório Cognitivo em PDF.
 *
 * Extraído de dentro de `RelatorioPDF.jsx` (era uma closure de ~400 linhas
 * presa no componente, impossível de renderizar sem login + dados reais do
 * Supabase). Aqui é uma função pura `jsPDF -> void`: recebe o documento e um
 * objeto `dados` já calculado, e só desenha. Isso torna o layout testável —
 * `render-pdf-relatorio.mjs` monta dados de exemplo, chama esta mesma função e
 * rasteriza o resultado para conferência visual, sem tocar no app.
 *
 * `tipoConfig` entra como parâmetro (em vez de import) para o módulo não puxar
 * a árvore de dados das atividades para dentro do bundle só por causa de um
 * label.
 */

const W = 210 // largura A4 retrato em mm
const LIMITE_CONTEUDO = 268 // abaixo disto começa o rodapé

export function montarRelatorioPDF(doc, dados) {
  const {
    nome, child, mes, mediaGeral, evolucao, habilidades, topAtividades,
    totalSessoes, horasFormatadas, ranking, dadosSemanas, recomendacoes,
    metas, tipoConfig = {},
  } = dados

  let y

  function iniciarPaginaContinuacao(titulo) {
    doc.addPage()
    doc.setFillColor(124, 58, 237)
    doc.rect(0, 0, W, 16, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(titulo, W / 2, 10, { align: 'center' })
    y = 24
  }

  function garantirEspaco(altura, tituloContinuacao) {
    if (y + altura > LIMITE_CONTEUDO) {
      iniciarPaginaContinuacao(tituloContinuacao || ('NeuralSync  |  Relatório Cognitivo  |  ' + nome))
    }
  }

  // ── PÁGINA 1 ──────────────────────────────────────────────────────
  doc.setFillColor(124, 58, 237)
  doc.rect(0, 0, W, 52, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('NeuralSync Academy', W / 2, 16, { align: 'center' })
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Relatório Cognitivo Mensal Premium', W / 2, 26, { align: 'center' })
  doc.setFontSize(9)
  doc.text(mes.charAt(0).toUpperCase() + mes.slice(1), W / 2, 36, { align: 'center' })
  doc.text('Gerado automaticamente pelo sistema NeuralSync', W / 2, 44, { align: 'center' })

  doc.setFillColor(248, 245, 255)
  doc.roundedRect(15, 58, W - 30, 22, 3, 3, 'F')
  doc.setDrawColor(200, 180, 255)
  doc.setLineWidth(0.3)
  doc.roundedRect(15, 58, W - 30, 22, 3, 3, 'S')

  doc.setTextColor(124, 58, 237)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(nome, W / 2, 68, { align: 'center' })
  doc.setTextColor(107, 114, 128)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text((child?.idade || '') + ' anos  |  Nível ' + (child?.nivel || 1) + '  |  Média geral: ' + mediaGeral + '%  (+' + evolucao + '% vs mês anterior)', W / 2, 76, { align: 'center' })

  // RESUMO EXECUTIVO
  const topSkill = habilidades.reduce((a, b) => a.value >= b.value ? a : b, habilidades[0] || { skill: '—', value: 0 })
  const botSkill = habilidades.reduce((a, b) => a.value <= b.value ? a : b, habilidades[0] || { skill: '—', value: 0 })
  const mesAtual = mes.split(' ')[0]
  const topAtividadeTxt = topAtividades.length > 0
    ? ` A atividade mais praticada foi ${tipoConfig[topAtividades[0].tipo]?.label || topAtividades[0].tipo} (${topAtividades[0].vezes}x).`
    : ''
  const resumoTxt = `${nome} completou ${totalSessoes} atividade${totalSessoes !== 1 ? 's' : ''} em ${mesAtual}, acumulando ${horasFormatadas} de foco cognitivo.${topAtividadeTxt} Destaque para a habilidade de ${topSkill.skill} (${topSkill.value}%), demonstrando evolução consistente. Recomendamos maior atenção à ${botSkill.skill} (${botSkill.value}%) para desenvolvimento equilibrado das competências.`

  doc.setFillColor(245, 243, 255)
  doc.roundedRect(15, 82, W - 30, 24, 3, 3, 'F')
  doc.setDrawColor(196, 181, 253)
  doc.setLineWidth(0.3)
  doc.roundedRect(15, 82, W - 30, 24, 3, 3, 'S')
  doc.setTextColor(124, 58, 237)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'bold')
  doc.text('RESUMO EXECUTIVO', 20, 89)
  doc.setTextColor(55, 65, 81)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  const resumoLines = doc.splitTextToSize(resumoTxt, W - 46)
  doc.text(resumoLines.slice(0, 3), 20, 95)

  y = 110
  garantirEspaco(40)
  const statItems = [
    [String(totalSessoes), 'Sessões'],
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
    // O valor pode ser largo ("1234 XP", "Top 15%") e transbordava o cartão de
    // 27mm no 9pt fixo. Encolhe a fonte até o texto caber com folga.
    ajustarFonte(doc, val, 25, 9, 6)
    doc.setFont('helvetica', 'bold')
    doc.text(val, x + 13.5, y + 7, { align: 'center' })
    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'normal')
    doc.text(label, x + 13.5, y + 13, { align: 'center' })
  })

  y += 24

  // ── HABILIDADES ───────────────────────────────────────────────────
  const linhasHab = Math.ceil(habilidades.length / 2)
  const alturaHab = 10 + linhasHab * 18
  garantirEspaco(alturaHab)

  doc.setTextColor(15, 10, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Habilidades Cognitivas — Evolução Mensal', 15, y)

  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(107, 114, 128)
  doc.setFillColor(124, 58, 237)
  doc.rect(120, y - 4, 8, 3, 'F')
  doc.text('Atual', 130, y - 2)
  doc.setFillColor(200, 200, 200)
  doc.rect(145, y - 4, 8, 3, 'F')
  doc.text('Anterior', 155, y - 2)
  doc.setFillColor(209, 250, 229)
  doc.rect(175, y - 4, 8, 3, 'F')
  doc.text('Meta', 185, y - 2)

  y += 6

  // Largura de coluna: cada uma das duas colunas tem ~90mm. A barra ocupa
  // 74mm; à esquerda dela ficam o nome (col×0) e os dois valores (%+diff),
  // à direita o "meta X%". Antes a barra tinha 82mm e empurrava o "meta"
  // para fora da página na coluna da direita.
  const BARRA = 74
  habilidades.forEach((h, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = col === 0 ? 15 : W / 2 + 5
    const cy = y + row * 18
    const cor = coresSkill[i % coresSkill.length]

    const diff = h.value - h.anterior
    const [r, g, b] = hexRGB(cor)

    doc.setTextColor(55, 65, 81)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(h.skill, x, cy + 4)

    // Valor e variação ancorados À DIREITA do fim da barra, não em posições
    // fixas que colidiam quando o número tinha 3 dígitos ("100%"). O valor
    // fica no fim da barra; a variação, logo depois.
    doc.setTextColor(15, 10, 30)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(h.value + '%', x + BARRA, cy + 4, { align: 'right' })
    doc.setTextColor(diff >= 0 ? 16 : 239, diff >= 0 ? 185 : 68, diff >= 0 ? 129 : 68)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text((diff >= 0 ? '+' : '') + diff + '%', x + BARRA + 2, cy + 4)

    // Trilha (meta), progresso anterior e atual — empilhados na mesma barra.
    doc.setFillColor(209, 250, 229)
    doc.roundedRect(x, cy + 6, BARRA * h.meta / 100, 4, 1, 1, 'F')
    doc.setFillColor(r > 200 ? 255 : r + 80, g > 200 ? 255 : g + 80, b > 200 ? 255 : b + 80)
    doc.roundedRect(x, cy + 6, BARRA * h.anterior / 100, 4, 1, 1, 'F')
    doc.setFillColor(r, g, b)
    doc.roundedRect(x, cy + 6, BARRA * h.value / 100, 4, 1, 1, 'F')
    doc.setDrawColor(229, 231, 235)
    doc.setLineWidth(0.2)
    doc.roundedRect(x, cy + 6, BARRA, 4, 1, 1, 'S')
    doc.setTextColor(156, 163, 175)
    doc.setFontSize(6)
    doc.text('meta ' + h.meta + '%', x + BARRA + 2, cy + 10)
  })

  y += alturaHab

  // ── PROGRESSO SEMANAL ─────────────────────────────────────────────
  garantirEspaco(58)
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
    doc.text(sem.xp + ' XP', x + barW / 2, y + 25 - barH, { align: 'center' })

    doc.setTextColor(107, 114, 128)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text(sem.semana, x + barW / 2, y + 34, { align: 'center' })
    doc.text(sem.sessoes + ' sessoes', x + barW / 2, y + 39, { align: 'center' })
    doc.text(sem.minutos + ' min', x + barW / 2, y + 44, { align: 'center' })
  })

  y += 52

  // ── PERFIL PARENTAL (se disponível) ───────────────────────────────
  const perfil = child?.perfil_cognitivo
  if (perfil) {
    garantirEspaco(26)
    doc.setFillColor(245, 243, 255)
    doc.roundedRect(15, y, W - 30, 20, 3, 3, 'F')
    doc.setDrawColor(196, 181, 253)
    doc.setLineWidth(0.3)
    doc.roundedRect(15, y, W - 30, 20, 3, 3, 'S')
    doc.setTextColor(124, 58, 237)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('Perfil Cognitivo Personalizado', 20, y + 7)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)
    const estiloLabel = { visual: 'Visual', cinestetico: 'Cinestésico', auditivo: 'Auditivo', leitura: 'Leitura' }
    const prioLabel = { foco: 'Foco e Atenção', criatividade: 'Criatividade', logica: 'Raciocínio Lógico', emocional: 'Inteligência Emocional' }
    const escolaLabel = { matematica: 'Matemática', leitura: 'Leitura', organizacao: 'Organização', autoconfianca: 'Autoconfiança' }
    const txt = `Aprendizado: ${estiloLabel[perfil.estilo_aprendizado] || '—'}   |   Prioridade dos pais: ${prioLabel[perfil.habilidade_prioridade] || '—'}   |   Apoio escolar: ${escolaLabel[perfil.apoio_escola] || '—'}`
    doc.text(txt, 20, y + 15)
    y += 26
  }

  // ── PRINCIPAIS RECOMENDAÇÕES ──────────────────────────────────────
  garantirEspaco(84)
  doc.setTextColor(15, 10, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Principais Recomendações', 15, y)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(107, 114, 128)
  doc.text('Baseado em neurociência infantil — Instituto NeuroSaber, Manual MSD 2025, Dra. Fernanda Monteiro', 15, y + 6)
  y += 12

  recomendacoes.slice(0, 2).forEach(rec => {
    garantirEspaco(36)
    const [r, g, b] = hexRGB(rec.cor)

    doc.setFillColor(250, 248, 255)
    doc.roundedRect(15, y, W - 30, 32, 3, 3, 'F')
    doc.setFillColor(r, g, b)
    doc.roundedRect(15, y, 3, 32, 1, 1, 'F')

    doc.setTextColor(r, g, b)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    const cabecalho = rec.area + '  ' + rec.nivel + '%'
    doc.text(cabecalho, 22, y + 8)
    // ⚠️ A largura do cabeçalho TEM que ser medida com a fonte dele (9pt bold),
    // que ainda está ativa aqui. Media-se ANTES de trocar para 7.5pt normal —
    // senão o status era colocado em cima do "%" (bug "% sobre outro item").
    const fimCabecalho = 22 + doc.getTextWidth(cabecalho) + 3

    doc.setTextColor(107, 114, 128)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'normal')
    doc.text('[' + rec.status + ']', fimCabecalho, y + 8)

    doc.setTextColor(55, 65, 81)
    doc.setFontSize(7.5)
    const recLines = doc.splitTextToSize(rec.recomendacao, W - 48)
    doc.text(recLines.slice(0, 2), 22, y + 16)

    doc.setTextColor(r, g, b)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text('Atividades: ', 22, y + 27)
    const fimLabelAtiv = 22 + doc.getTextWidth('Atividades: ') + 2 // mede em bold, antes de trocar
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(55, 65, 81)
    doc.text(rec.atividades.slice(0, 2).join('  •  '), fimLabelAtiv, y + 27)

    y += 36
  })

  // ── PLANO DE AÇÃO — página própria ────────────────────────────────
  const tituloContinuacao = 'NeuralSync  |  Plano de Ação Personalizado  |  ' + nome
  iniciarPaginaContinuacao(tituloContinuacao)

  doc.setTextColor(15, 10, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Análise Completa das 8 Habilidades', 15, y)
  y += 8

  recomendacoes.forEach(rec => {
    garantirEspaco(40, tituloContinuacao)
    const [r, g, b] = hexRGB(rec.cor)

    doc.setFillColor(250, 248, 255)
    doc.roundedRect(15, y, W - 30, 36, 3, 3, 'F')
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

  // ── METAS ─────────────────────────────────────────────────────────
  const alturaMetas = 6 + metas.length * 10 + 8
  garantirEspaco(alturaMetas, tituloContinuacao)
  doc.setTextColor(15, 10, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Metas para o Próximo Mês', 15, y)
  y += 6

  doc.setFillColor(240, 253, 244)
  doc.roundedRect(15, y, W - 30, metas.length * 10 + 8, 3, 3, 'F')
  doc.setDrawColor(16, 185, 129)
  doc.setLineWidth(0.3)
  doc.roundedRect(15, y, W - 30, metas.length * 10 + 8, 3, 3, 'S')

  metas.forEach((meta, i) => {
    doc.setFillColor(16, 185, 129)
    doc.circle(22, y + 5 + i * 10, 2.5, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.text((i + 1) + '', 22, y + 7 + i * 10, { align: 'center' })
    doc.setTextColor(55, 65, 81)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'normal')
    // A meta é uma frase longa — quebrar para não estourar a caixa à direita.
    const linhas = doc.splitTextToSize(meta, W - 46)
    doc.text(linhas.slice(0, 1), 28, y + 7 + i * 10)
  })

  y += metas.length * 10 + 14

  // ── BASE CIENTÍFICA ───────────────────────────────────────────────
  garantirEspaco(30, tituloContinuacao)
  doc.setFillColor(239, 246, 255)
  doc.roundedRect(15, y, W - 30, 22, 3, 3, 'F')
  doc.setTextColor(59, 130, 246)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('Base Científica deste Relatório', 22, y + 7)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const nota = 'Análise baseada em Piaget (fase operatória concreta), diretrizes do Manual MSD de Desenvolvimento Infantil (2025), Instituto NeuroSaber, e pesquisas da Dra. Fernanda Monteiro sobre estimulação cognitiva infantil.'
  const notaLines = doc.splitTextToSize(nota, W - 46)
  doc.text(notaLines, 22, y + 14)

  // ── RODAPÉ (todas as páginas, numeração real) ─────────────────────
  const totalPaginas = doc.internal.getNumberOfPages()
  const hoje = dados.dataGeracao || ''
  for (let p = 1; p <= totalPaginas; p++) {
    doc.setPage(p)
    doc.setFillColor(124, 58, 237)
    doc.rect(0, 277, W, 20, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'normal')
    doc.text(
      p === 1
        ? 'NeuralSync Academy — Desenvolvimento Cognitivo Baseado em Ciência  |  neuralsync.com.br'
        : 'Gerado pelo NeuralSync Academy — Desenvolvimento Cognitivo Baseado em Ciência',
      W / 2, 284, { align: 'center' }
    )
    doc.text('Página ' + p + ' de ' + totalPaginas + '  |  ' + hoje + '  |  Confidencial', W / 2, 292, { align: 'center' })
  }

  return doc
}

// Cores por habilidade (mesma ordem de TODAS_SKILLS no componente).
const coresSkill = ['#7C3AED', '#F07A20', '#10b981', '#3b82f6', '#ef4444', '#ec4899', '#f59e0b', '#06b6d4']

function hexRGB(hex) {
  return hex.replace('#', '').match(/.{2}/g).map(v => parseInt(v, 16))
}

/** Reduz a fonte de `tamMax` até `tamMin` até o texto caber em `larguraMax` (mm). */
function ajustarFonte(doc, texto, larguraMax, tamMax, tamMin) {
  let t = tamMax
  doc.setFont('helvetica', 'bold')
  while (t > tamMin) {
    doc.setFontSize(t)
    if (doc.getTextWidth(String(texto)) <= larguraMax) break
    t -= 0.5
  }
  doc.setFontSize(t)
}
