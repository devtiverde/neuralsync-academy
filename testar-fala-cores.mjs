/**
 * testar-fala-cores.mjs — abre TODA atividade de cores e escuta o que sai.
 *
 * As auditorias existentes não pegariam isto: `auditar-atividades` mede layout e erro de
 * JS, e o `auditar-fala` (novo) lê o DADO. Nenhum dos dois observa o que o navegador
 * realmente fala. Aqui o espião fica em cima de `SpeechSynthesisUtterance` (o TTS) e de
 * `Audio` (o mp3 gravado), e o relatório separa as duas pernas:
 *   - caiu no TTS?  → o mp3 não carregou (404, formato, rede)
 *   - o texto tem "undefined"? → o dado não tem o campo que a frase interpola
 *
 * 🔑 Valida o instrumento ANTES: planta uma cor sem `exemplo` e exige que o espião
 * acuse. Espião que não acusa defeito plantado devolveria "0 problemas" para sempre.
 *
 * uso: node testar-fala-cores.mjs [porta]   (padrão 5173)
 */
import { chromium } from 'playwright'

const PORTA = process.argv[2] || '5173'
const BASE = `http://localhost:${PORTA}`

const FAIXAS = ['exploradores', 'construtores', 'criadores', 'inventores']
const PREFIXO = { exp: 'exploradores', con: 'construtores', cri: 'criadores', inv: 'inventores' }

async function idsDeCores() {
  const ids = []
  for (const faixa of FAIXAS) {
    const mod = await import(`./src/data/extra/${faixa}.js`)
    for (const v of Object.values(mod)) {
      if (Array.isArray(v)) ids.push(...v.filter(a => a?.tipo === 'cores').map(a => a.id))
    }
  }
  const base = await import('./src/data/atividadesData.js')
  for (const v of Object.values(base)) {
    const listas = Array.isArray(v) ? [v] : (v && typeof v === 'object' ? Object.values(v) : [])
    for (const l of listas) {
      if (Array.isArray(l)) ids.push(...l.filter(a => a?.tipo === 'cores').map(a => a.id))
    }
  }
  return [...new Set(ids)]
}

const ESPIAO = () => {
  window.__fala = { ttsTextos: [], audios: [], erros: [] }
  const OrigUtt = window.SpeechSynthesisUtterance
  window.SpeechSynthesisUtterance = function (texto) {
    window.__fala.ttsTextos.push(String(texto))
    return new OrigUtt(texto)
  }
  window.SpeechSynthesisUtterance.prototype = OrigUtt.prototype
  const OrigAudio = window.Audio
  window.Audio = function (src) {
    const a = new OrigAudio(src)
    window.__fala.audios.push(String(src))
    a.addEventListener('error', () => window.__fala.erros.push(String(src)))
    return a
  }
  window.Audio.prototype = OrigAudio.prototype
}

const navegador = await chromium.launch()
const ids = await idsDeCores()
console.log(`\n🔊 ${ids.length} atividades de cores`)

// ── VALIDAR O INSTRUMENTO ANTES DE MEDIR ────────────────────────────────────
// Um espião que não acusa defeito plantado devolveria "0 problemas" para sempre —
// foi exatamente assim que a 1ª versão deste teste deu 39/39 limpas sem fazer nada
// falar. Aqui forçamos uma cor sem `exemplo` e exigimos que apareça "undefined".
{
  const ctx = await navegador.newContext()
  const pag = await ctx.newPage()
  await pag.addInitScript(ESPIAO)
  await pag.goto('about:blank')
  const acusou = await pag.evaluate(() => {
    const cor = { nome: 'Vermelho' }            // sem `exemplo`, de propósito
    const texto = `${cor.nome}. ${cor.nome}, ${cor.exemplo}.`
    new window.SpeechSynthesisUtterance(texto)
    return window.__fala.ttsTextos.some(t => /undefined/.test(t))
  })
  await ctx.close()
  if (!acusou) { console.error('\n❌ o espião não viu o defeito plantado — teste inválido\n'); process.exit(2) }
  console.log('   ✓ instrumento validado: acusou a cor sem `exemplo`\n')
}

let achados = 0, totalTTS = 0, totalMp3 = 0, totalErro = 0, abertas = 0
const problemas = []

for (const id of ids) {
  const faixa = PREFIXO[id.slice(0, 3)] || 'construtores'
  const ctx = await navegador.newContext({ viewport: { width: 1280, height: 800 } })
  const pag = await ctx.newPage()
  await pag.addInitScript(ESPIAO)
  await pag.addInitScript(f => {
    // A criança de teste PRECISA ser da faixa da atividade: faixa superior cai no
    // `faixaGuard` e a tela pede a senha do responsável em vez de começar o jogo.
    sessionStorage.setItem('ns_dev_bypass', '1')
    localStorage.setItem('ns_active_child', JSON.stringify({
      id: 'qa-cores', nome: 'QA', idade: 7, faixa_etaria: f,
      nivel: 1, xp: 0, neural_coins: 0, streak_atual: 0,
    }))
  }, faixa)

  try {
    await pag.goto(`${BASE}/dev/atividade/cores?id=${id}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    const comecar = pag.getByRole('button', { name: /começar/i }).first()
    await comecar.waitFor({ timeout: 15000 })
    await comecar.click()
    await pag.waitForTimeout(400)

    // 🔑 O botão de narrar é ESTE — as bolinhas coloridas em cima só trocam de cor
    // (chamam `irPara`, não `falar`). Clicar nelas dava "39 de 39 abertas" com ZERO
    // fala capturada, que é o instrumento aprovando sem medir.
    const ouvir = pag.locator('button[title="Ouvir o nome da cor"]')
    await ouvir.waitFor({ timeout: 10000 })

    const quantas = await pag.locator('button[title="Ouvir o nome da cor"]').count()
    if (!quantas) throw new Error('botão de ouvir não existe nesta tela')

    // Uma passada por cor: o componente avança sozinho 3s depois de falar.
    for (let i = 0; i < 14; i++) {
      try { await ouvir.click({ timeout: 2500 }) } catch { break }
      await pag.waitForTimeout(3300)
      if (await pag.getByText(/parabéns|concluí|muito bem/i).count().catch(() => 0)) break
    }

    // A tela também escreve `{cor.nome}, {cor.exemplo}` SEM guarda — se o campo
    // faltar, aparece escrito antes de ser falado.
    const textoTela = await pag.evaluate(() => document.body.innerText)
    if (/undefined|\[object Object\]/i.test(textoTela)) {
      const linha = textoTela.split('\n').find(l => /undefined|\[object Object\]/i.test(l)) || ''
      console.log(`  🔴 ${id} — ESCREVEU na tela: "${linha.trim().slice(0, 80)}"`)
      problemas.push({ id, tipo: 'tela', amostra: linha.trim(), quantos: 1 })
      achados++
    }

    const fala = await pag.evaluate(() => window.__fala)
    abertas++
    totalTTS += fala.ttsTextos.length
    totalMp3 += fala.audios.length
    totalErro += fala.erros.length
    const ruins = fala.ttsTextos.filter(t => /undefined|null|\[object/i.test(t))
    if (ruins.length) {
      achados++
      problemas.push({ id, tipo: 'texto', amostra: ruins[0], quantos: ruins.length })
      console.log(`  🔴 ${id} — FALOU: "${ruins[0]}"`)
    } else if (fala.erros.length) {
      problemas.push({ id, tipo: 'mp3', amostra: fala.erros[0], quantos: fala.erros.length })
      console.log(`  🟡 ${id} — ${fala.erros.length} mp3 não carregou (caiu no TTS): ${fala.erros[0]}`)
    }
  } catch (e) {
    console.log(`  ⚠️  ${id} — não abriu: ${String(e.message).split('\n')[0].slice(0, 90)}`)
  }
  await ctx.close()
}

await navegador.close()

console.log(`\n  atividades abertas ......... ${abertas} de ${ids.length}`)
console.log(`  mp3 pedidos ................ ${totalMp3}`)
console.log(`  mp3 que falharam ........... ${totalErro}`)
console.log(`  falas por TTS do navegador . ${totalTTS}`)
console.log(`  falas com "undefined" ...... ${achados}`)
console.log('')
process.exit(achados ? 1 : 0)
