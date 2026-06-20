import sharp from 'sharp'
import { readFileSync } from 'fs'

const svg = readFileSync('./public/favicon.svg')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

for (const size of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(`./public/icon-${size}x${size}.png`)
  console.log(`✓ icon-${size}x${size}.png`)
}

// apple touch icon
await sharp(svg).resize(180, 180).png().toFile('./public/apple-touch-icon.png')
console.log('✓ apple-touch-icon.png')
