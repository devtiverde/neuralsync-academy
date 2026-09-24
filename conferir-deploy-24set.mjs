/** Confere o deploy de 24/09 PELO CONTEÚDO servido, não pelo status (a SPA devolve 200 pra tudo). */
import fs from 'node:fs'; import crypto from 'node:crypto'
const sha = b => crypto.createHash('sha256').update(b).digest('hex').slice(0, 12)
const hashLocal = fs.readFileSync('dist/index.html', 'utf8').match(/assets\/index-[A-Za-z0-9_-]+\.js/)[0]
console.log('bundle local:', hashLocal)
const lidos = []
for (let i = 0; i < 4; i++) {
  const t = await (await fetch('https://app.neuralsync.com.br/?cb=' + i)).text()
  lidos.push((t.match(/assets\/index-[A-Za-z0-9_-]+\.js/) || ['?'])[0])
}
console.log('4 leituras   :', lidos.join(' · '))
console.log('todas iguais :', lidos.every(h => h === hashLocal) ? 'SIM ✅' : 'NÃO 🔴')

const alvos = fs.readdirSync('dist/assets').filter(n => /^(Auth|Bloqueio|Ebook|IntroAtividade|RecuperarSenha)-/.test(n))
for (const a of alvos) {
  const r = await fetch('https://app.neuralsync.com.br/assets/' + a)
  const b = Buffer.from(await r.arrayBuffer()), l = fs.readFileSync('dist/assets/' + a)
  console.log(`  ${a.padEnd(32)} ${r.status} ${b.equals(l) ? 'idêntico ✅' : 'DIFERENTE 🔴'} ${sha(b)}`)
}
// a ajuda viaja no bundle principal?
const idx = await (await fetch('https://app.neuralsync.com.br/' + hashLocal)).text()
console.log('\n"Ajuda e suporte" no bundle servido:', idx.includes('Ajuda e suporte') ? 'SIM ✅' : 'não (noutro pedaço)')
console.log('"Relatar um problema" servido      :', idx.includes('Relatar um problema') ? 'SIM ✅' : 'não (noutro pedaço)')
// o CSS do invólucro tem hash próprio
const css = fs.readdirSync('dist/assets').filter(n => n.endsWith('.css'))
for (const c of css) {
  const t = await (await fetch('https://app.neuralsync.com.br/assets/' + c)).text()
  if (t.includes('ns-ajuda-flutuante')) console.log(`regra .ns-ajuda-flutuante servida em ${c}: SIM ✅`)
}
