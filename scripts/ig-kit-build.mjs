import fs from 'node:fs'

const scratchDir = 'C:/Users/C#/AppData/Local/Temp/claude/E--DEV/6f0d6db0-8906-4035-9396-779ad732531f/scratchpad'
let html = fs.readFileSync(scratchDir + '/ig-kit-template.html', 'utf8')

const b64 = (p) => fs.readFileSync(p).toString('base64')
const fontsDir = 'C:/Users/C#/AppData/Local/Temp/fonts-nix-kit'

html = html
  .split('__FREDOKA_B64__').join(b64(fontsDir + '/fredoka.woff2'))
  .split('__JAKARTA_B64__').join(b64(fontsDir + '/jakarta.woff2'))
  .split('__GROTESK_B64__').join(b64(fontsDir + '/grotesk.woff2'))

const postsDir = 'E:/DEV/neuralsync-ig-posts/'
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0')
  const img = 'data:image/png;base64,' + b64(postsDir + `carrossel-7sinais-${num}.png`)
  html = html.split(`__SLIDE_${num}__`).join(img)
}

const nixDir = 'E:/DEV/neuralsync-nix-assets/'
html = html.split('__NIX_ASK__').join('data:image/png;base64,' + b64(nixDir + 'nix-ask.png'))

fs.writeFileSync(scratchDir + '/ig-kit.html', html)
console.log('done, size KB:', (html.length / 1024).toFixed(0))
