/**
 * Confere o deploy de 23/09 PELO CONTEÚDO servido — não pelo status HTTP.
 * A SPA devolve 200 para tudo, então "200" não prova nada. E o CDN pode
 * entregar leitura antiga: por isso o bundle é lido 4 vezes.
 */
import fs from 'node:fs'; import crypto from 'node:crypto'
const sha = b => crypto.createHash('sha256').update(b).digest('hex').slice(0, 12)

const local = fs.readFileSync('dist/index.html', 'utf8')
const hashLocal = local.match(/assets\/index-[A-Za-z0-9_-]+\.js/)[0]
console.log('bundle local:', hashLocal)

const lidos = []
for (let i = 0; i < 4; i++) {
  const t = await (await fetch('https://app.neuralsync.com.br/?cb=' + i)).text()
  lidos.push((t.match(/assets\/index-[A-Za-z0-9_-]+\.js/) || ['?'])[0])
}
console.log('4 leituras do app :', lidos.join(' · '))
console.log('todas iguais ao local:', lidos.every(h => h === hashLocal) ? 'SIM ✅' : 'NÃO 🔴')

// os pedaços que mudaram, byte a byte
for (const alvo of fs.readdirSync('dist/assets').filter(n => /^(AtividadesOffline|Timer|Agenda|IntroAtividade)-/.test(n))) {
  const r = await fetch('https://app.neuralsync.com.br/assets/' + alvo)
  const b = Buffer.from(await r.arrayBuffer())
  const l = fs.readFileSync('dist/assets/' + alvo)
  console.log(`  ${alvo.padEnd(34)} ${r.status} ${b.equals(l) ? 'idêntico ✅' : 'DIFERENTE 🔴'} ${sha(b)}`)
}

// a regra da trava viaja no bundle principal?
const idx = await (await fetch('https://app.neuralsync.com.br/' + hashLocal)).text()
console.log('\nregra de horário no bundle servido:', /dentroDoHorario|bloqueio/.test(idx) ? 'SIM ✅' : 'não (mora noutro pedaço)')

// landing
const www = await (await fetch('https://www.neuralsync.com.br/')).text()
console.log('\nWWW — "18 de outubro":', www.includes('18 de outubro de 2026') ? 'SIM ✅' : 'NÃO 🔴')
console.log('WWW — "2 de setembro" sumiu:', !www.includes('2 de setembro') ? 'SIM ✅' : 'NÃO 🔴')
console.log('WWW — FAQ "nós criamos a sua conta":', www.includes('nós criamos a sua conta') ? 'SIM ✅' : 'NÃO 🔴')
console.log('WWW — FAQ antigo "você cria sua conta" sumiu:', !www.includes('você cria sua conta') ? 'SIM ✅' : 'NÃO 🔴')
const obr = await (await fetch('https://www.neuralsync.com.br/obrigado')).text()
console.log('WWW — /obrigado com ?ativado=1:', obr.includes('auth?ativado=1') ? 'SIM ✅' : 'NÃO 🔴')
