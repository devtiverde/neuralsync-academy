import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../../neuralsync-ig-posts')
fs.mkdirSync(outDir, { recursive: true })

const htmlPath = path.resolve(__dirname, 'ig-perfil.html')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } })
await page.goto('file://' + htmlPath)
await page.waitForTimeout(400)

await page.locator('#pf-nix').screenshot({ path: path.join(outDir, 'perfil-A-nix.png') })
await page.locator('#pf-nix-solid').screenshot({ path: path.join(outDir, 'perfil-B-nix-violeta.png') })

await browser.close()
console.log('done ->', outDir)
