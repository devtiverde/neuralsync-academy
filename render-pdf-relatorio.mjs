/**
 * Renderiza TODAS as páginas do Relatório Cognitivo usando a MESMA função do
 * app (src/lib/relatorioPdf.js), com dados de exemplo de pior caso, e salva
 * uma imagem por página. Assim dá pra conferir o layout sem login nem Supabase.
 */
import { jsPDF } from 'jspdf'
import { chromium } from 'playwright'
import { montarRelatorioPDF } from './src/lib/relatorioPdf.js'

const coresSkill = ['#7C3AED','#F07A20','#10b981','#3b82f6','#ef4444','#ec4899','#f59e0b','#06b6d4']
const skills = ['Lógica','Criatividade','Problemas','Computacional','Concentração','Memória','Comunicação','Emocional']
// pior caso: valores de 3 dígitos, variações grandes, nomes longos
const habilidades = skills.map((skill, i) => ({
  skill,
  value: [100, 95, 80, 100, 65, 40, 88, 30][i],
  anterior: [20, 40, 80, 85, 70, 45, 33, 25][i],
  meta: Math.min(100, [100, 95, 80, 100, 65, 40, 88, 30][i] + 15),
}))

const recomendacoes = skills.map((s, i) => ({
  area: s, skill: s, cor: coresSkill[i], nivel: habilidades[i].value,
  status: habilidades[i].value >= 75 ? 'Ponto forte' : 'Em desenvolvimento',
  recomendacao: 'Atividades de ' + s + ' são fundamentais para o aprendizado. Pesquisas mostram que crianças com alto desempenho nesta área têm melhor evolução escolar ao longo do tempo.',
  atividades: ['Atividade exemplo bem longa número um', 'Segunda atividade também longa'],
  tempo: '25-30 min por sessão, 3x por semana',
}))

const dados = {
  nome: 'Mariazinha Aparecida', // nome longo de propósito
  child: { idade: 8, nivel: 12, xp: 12345, neural_coins: 9999, streak_maximo: 45,
    perfil_cognitivo: { estilo_aprendizado: 'visual', habilidade_prioridade: 'logica', apoio_escola: 'matematica' } },
  mes: 'julho de 2026',
  mediaGeral: 74, evolucao: 12,
  habilidades, topAtividades: [{ tipo: 'quiz', vezes: 23 }],
  totalSessoes: 137, horasFormatadas: '45h 40m', ranking: 'Top 5%',
  dadosSemanas: [
    { semana: 'Sem 1', xp: 1200, sessoes: 18, minutos: 360 },
    { semana: 'Sem 2', xp: 890, sessoes: 12, minutos: 240 },
    { semana: 'Sem 3', xp: 1500, sessoes: 22, minutos: 440 },
    { semana: 'Sem 4', xp: 700, sessoes: 10, minutos: 200 },
  ],
  recomendacoes,
  metas: [
    'Aumentar Emocional de 30% para 40% com 2 sessões extras por semana focadas em reconhecimento de emoções',
    'Aumentar Memória de 40% para 50% com atividades específicas de pares e sequências',
    'Manter o streak diário acima de 30 dias consecutivos',
  ],
  tipoConfig: { quiz: { label: 'Quiz' } },
  dataGeracao: '22/07/2026',
}

const doc = new jsPDF('p', 'mm', 'a4')
montarRelatorioPDF(doc, dados)
const nPaginas = doc.internal.getNumberOfPages()
const b64 = Buffer.from(doc.output('arraybuffer')).toString('base64')

const nav = await chromium.launch()
const pg = await nav.newPage({ viewport: { width: 950, height: 1350 } })
await pg.setContent('<canvas id="c"></canvas>')
await pg.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js' })

for (let p = 1; p <= nPaginas; p++) {
  await pg.evaluate(async ({ b64, p }) => {
    const pdfjs = window['pdfjsLib']
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    const bin = atob(b64); const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const pdf = await pdfjs.getDocument({ data: bytes }).promise
    const page = await pdf.getPage(p)
    const vp = page.getViewport({ scale: 2.0 })
    const c = document.getElementById('c'); c.width = vp.width; c.height = vp.height
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise
  }, { b64, p })
  await pg.waitForTimeout(200)
  await (await pg.$('#c')).screenshot({ path: `pdf-relatorio-p${p}.png` })
  console.log(`página ${p} salva`)
}
await nav.close()
console.log(`\n${nPaginas} páginas renderizadas.`)
