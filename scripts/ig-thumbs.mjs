import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = 'E:/DEV/neuralsync-ig-posts/'
const outDir = path.resolve(__dirname, '../../neuralsync-ig-posts/thumbs')
fs.mkdirSync(outDir, { recursive: true })

const b64 = (p) => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64')

const jobs = []
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0')
  jobs.push({ src: srcDir + `carrossel-7sinais-${num}.png`, out: `carrossel-7sinais-${num}.jpg`, w: 340, h: 425 })
}
jobs.push({ src: srcDir + 'perfil-A-nix.png', out: 'perfil-A-nix.jpg', w: 300, h: 300 })
jobs.push({ src: srcDir + 'perfil-B-nix-violeta.png', out: 'perfil-B-nix-violeta.jpg', w: 300, h: 300 })

const browser = await chromium.launch()

for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } })
  await page.setContent(`<style>html,body{margin:0;padding:0;}img{width:${j.w}px;height:${j.h}px;display:block;object-fit:cover;}</style><img src="${b64(j.src)}">`)
  await page.waitForTimeout(120)
  await page.screenshot({ path: path.join(outDir, j.out), type: 'jpeg', quality: 78 })
  await page.close()
  console.log('thumb', j.out)
}

await browser.close()
console.log('done ->', outDir)
