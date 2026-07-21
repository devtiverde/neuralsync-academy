import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../../neuralsync-nix-assets')
const htmlPath = path.resolve(__dirname, 'nix-export.html')

const poses = ['idle', 'ask', 'cheer', 'think', 'sleep']

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })
await page.goto('file://' + htmlPath)
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(300)

for (const pose of poses) {
  const el = page.locator('#pose-' + pose)
  await el.screenshot({ path: path.join(outDir, `nix-${pose}.png`), omitBackground: true })
  console.log('saved', pose)
}

await browser.close()
console.log('done ->', outDir)
