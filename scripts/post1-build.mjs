import fs from 'node:fs'

const scratchDir = 'C:/Users/C#/AppData/Local/Temp/claude/E--DEV/6f0d6db0-8906-4035-9396-779ad732531f/scratchpad'
let html = fs.readFileSync(scratchDir + '/post1-template.html', 'utf8')

const b64 = (p) => fs.readFileSync(p).toString('base64')
const fontsDir = 'C:/Users/C#/AppData/Local/Temp/fonts-nix-kit'

html = html
  .split('__FREDOKA_B64__').join(b64(fontsDir + '/fredoka.woff2'))
  .split('__JAKARTA_B64__').join(b64(fontsDir + '/jakarta.woff2'))
  .split('__GROTESK_B64__').join(b64(fontsDir + '/grotesk.woff2'))

const dir = 'E:/DEV/neuralsync-ig-posts/thumbs/'
const jpg = (p) => 'data:image/jpeg;base64,' + b64(p)
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0')
  html = html.split(`__SLIDE_${num}__`).join(jpg(dir + `carrossel-7sinais-${num}.jpg`))
}
html = html.split('__PERFIL_A__').join(jpg(dir + 'perfil-A-nix.jpg'))
html = html.split('__PERFIL_B__').join(jpg(dir + 'perfil-B-nix-violeta.jpg'))

fs.writeFileSync(scratchDir + '/post1-guia.html', html)
console.log('done, size KB:', (html.length / 1024).toFixed(0))
