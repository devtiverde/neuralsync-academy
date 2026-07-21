import fs from 'node:fs'

const scratchDir = 'C:/Users/C#/AppData/Local/Temp/claude/E--DEV/6f0d6db0-8906-4035-9396-779ad732531f/scratchpad'
let html = fs.readFileSync(scratchDir + '/nix-kit-template.html', 'utf8')

const b64 = (p) => fs.readFileSync(p).toString('base64')

const fontsDir = 'C:/Users/C#/AppData/Local/Temp/fonts-nix-kit'
const fredoka = b64(fontsDir + '/fredoka.woff2')
const jakarta = b64(fontsDir + '/jakarta.woff2')
const grotesk = b64(fontsDir + '/grotesk.woff2')

const assetsDir = 'E:/DEV/neuralsync-nix-assets/'
const imgIdle  = 'data:image/png;base64,' + b64(assetsDir + 'nix-idle.png')
const imgAsk   = 'data:image/png;base64,' + b64(assetsDir + 'nix-ask.png')
const imgCheer = 'data:image/png;base64,' + b64(assetsDir + 'nix-cheer.png')
const imgThink = 'data:image/png;base64,' + b64(assetsDir + 'nix-think.png')
const imgSleep = 'data:image/png;base64,' + b64(assetsDir + 'nix-sleep.png')

html = html
  .split('__FREDOKA_B64__').join(fredoka)
  .split('__JAKARTA_B64__').join(jakarta)
  .split('__GROTESK_B64__').join(grotesk)
  .split('__IMG_IDLE__').join(imgIdle)
  .split('__IMG_ASK__').join(imgAsk)
  .split('__IMG_CHEER__').join(imgCheer)
  .split('__IMG_THINK__').join(imgThink)
  .split('__IMG_SLEEP__').join(imgSleep)

fs.writeFileSync(scratchDir + '/nix-identidade-visual.html', html)
console.log('done, size KB:', (html.length / 1024).toFixed(0))
