import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../../neuralsync-ig-posts')
fs.mkdirSync(outDir, { recursive: true })

const htmlPath = path.resolve(__dirname, 'ig-posts.html')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } })
await page.goto('file://' + htmlPath)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(500)

for (let i = 1; i <= 10; i++) {
  const el = page.locator('#s' + i)
  const num = String(i).padStart(2, '0')
  await el.screenshot({ path: path.join(outDir, `carrossel-7sinais-${num}.png`) })
  console.log('saved slide', num)
}

await browser.close()
console.log('done ->', outDir)
