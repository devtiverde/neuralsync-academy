/**
 * Gera a foto de perfil quadrada 1080x1080.
 *
 * As artes saíram 1040x1080 do exportador. O Instagram exibe foto de perfil num
 * círculo e, com imagem não-quadrada, abre a tela de corte — que corta o que a
 * pessoa arrastar, geralmente torto. Entregar já quadrado elimina esse passo.
 *
 * Estende a LARGURA em 20px de cada lado com a própria cor de fundo, em vez de
 * cortar 40px da altura: cortar arriscaria comer a borda do desenho do Nix,
 * estender não mexe em nada do que já existe.
 *
 * Roda de dentro do projeto porque o `sharp` mora no node_modules daqui.
 */
import sharp from 'sharp'
import { existsSync } from 'node:fs'

const PASTA = 'E:/DEV/neuralsync-ig-posts'
const ALVO = 1080

for (const nome of ['perfil-A-nix', 'perfil-B-nix-violeta']) {
  const origem = `${PASTA}/${nome}.png`
  if (!existsSync(origem)) { console.log(`⚠️  ${nome}.png não encontrado`); continue }

  const img = sharp(origem)
  const { width, height } = await img.metadata()

  if (width === ALVO && height === ALVO) { console.log(`✓ ${nome} já é quadrada`); continue }

  // Cor do canto superior esquerdo — é o fundo chapado da arte.
  const { data } = await sharp(origem).extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw().toBuffer({ resolveWithObject: true })
  const fundo = { r: data[0], g: data[1], b: data[2], alpha: 1 }

  const faltaLargura = ALVO - width
  const faltaAltura = ALVO - height

  const destino = `${PASTA}/${nome}-1080.png`
  await sharp(origem)
    .extend({
      left:  Math.floor(faltaLargura / 2),
      right: Math.ceil(faltaLargura / 2),
      top:   Math.floor(faltaAltura / 2),
      bottom: Math.ceil(faltaAltura / 2),
      background: fundo,
    })
    .png()
    .toFile(destino)

  const conf = await sharp(destino).metadata()
  const ok = conf.width === ALVO && conf.height === ALVO
  console.log(`${ok ? '✓' : '✗'} ${nome}-1080.png  ${conf.width}x${conf.height}  fundo rgb(${fundo.r},${fundo.g},${fundo.b})`)
  if (!ok) process.exitCode = 1
}
