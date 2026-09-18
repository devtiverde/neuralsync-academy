/**
 * lib-onda.mjs — descobre QUAL TEXTO um mp3 contém comparando a ONDA, não o tamanho.
 *
 * 🔑 POR QUE ISTO EXISTE, se já temos `sondar-texto-audio.mjs`:
 * aquele compara TAMANHO em bytes, e o próprio cabeçalho dele avisa que fala curta
 * satura num piso. É verdade e é grave: "Um", "Dois", "Quatro" e "Sete" saem TODOS com
 * 11.232 bytes. Para `numeros`, onde o texto é uma palavra só, o método do tamanho não
 * distingue absolutamente nada — ele diria "bate" para qualquer um.
 *
 * O que fazer então: decodificar os dois mp3 em PCM (ffmpeg), aparar o silêncio das
 * pontas e comparar as ondas. O edge-tts NÃO é byte-determinístico (dois `--write-media`
 * do mesmo texto dão md5 diferente), mas o ÁUDIO é o mesmo — a diferença está só no
 * empacotamento mp3. Medido: mesmo texto = 1,0000 · texto diferente ≈ 0,00.
 *
 * 🪤 Reproduzir TODOS os parâmetros do gerador (voz E `--rate`). Sem o rate, o candidato
 * sai mais rápido que o arquivo do disco e a comparação deixa de dizer qualquer coisa —
 * erro já cometido em 15/09.
 *
 * Requisitos: `ffmpeg` no PATH e `python -m edge_tts`.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const VOZ = 'pt-BR-FranciscaNeural'
export const RATE = '-8%'

/** Decodifica o mp3 em mono 24 kHz e devolve as amostras SEM o silêncio das pontas. */
export function onda(caminho) {
  const bruto = execFileSync('ffmpeg', ['-v', 'quiet', '-i', caminho, '-f', 's16le', '-ac', '1', '-ar', '24000', '-'],
    { maxBuffer: 1 << 28 })
  const total = Math.floor(bruto.length / 2)
  const a = new Float64Array(total)
  for (let i = 0; i < total; i++) a[i] = bruto.readInt16LE(i * 2)
  let ini = 0, fim = total - 1
  while (ini < total && Math.abs(a[ini]) <= 60) ini++
  while (fim > ini && Math.abs(a[fim]) <= 60) fim--
  return a.subarray(ini, fim + 1)
}

/**
 * 1,0 = mesma fala. Perto de 0 = fala diferente.
 * O fator de comprimento existe porque cosseno sobre o trecho comum daria nota alta para
 * uma fala que é só o COMEÇO da outra ("Um" dentro de "Um milhão").
 */
export function semelhanca(x, y) {
  const n = Math.min(x.length, y.length)
  const m = Math.max(x.length, y.length)
  if (!n) return 0
  let px = 0, py = 0, pxy = 0
  for (let i = 0; i < n; i++) { px += x[i] * x[i]; py += y[i] * y[i]; pxy += x[i] * y[i] }
  const den = Math.sqrt(px) * Math.sqrt(py)
  return den ? (pxy / den) * (n / m) : 0
}

/**
 * Grava um candidato com a MESMA voz e velocidade do gerador.
 *
 * 🪤 O edge-tts vai à rede a cada chamada e falha de vez em quando — numa auditoria de
 * centenas de falas, uma falha é quase certa. A 1ª versão disto derrubava o processo
 * inteiro na primeira, deixando o relatório pela metade com aparência de concluído.
 * Job em segundo plano que morre no meio é pior que job que não roda: ver
 * [[feedback_manifesto_e_promessa_nao_medida]]. Agora tenta de novo e, se ainda assim
 * não vier, devolve `null` — quem chama conta como NÃO MEDIDO, nunca como aprovado.
 */
export function gravar(texto, destino, { tentativas = 3, silencioso = false } = {}) {
  for (let i = 1; i <= tentativas; i++) {
    try {
      execFileSync('python', ['-m', 'edge_tts', '-t', texto, '-v', VOZ, `--rate=${RATE}`, '--write-media', destino],
        { stdio: 'pipe' })
      return destino
    } catch (e) {
      if (i === tentativas) {
        if (!silencioso) console.error(`   ⚠️  não consegui gravar o controle "${texto}" em ${tentativas} tentativas`)
        return null
      }
      // espera curta e crescente: a falha típica é de rede, não de argumento
      const ate = Date.now() + i * 800
      while (Date.now() < ate) { /* pausa síncrona: o resto do script é síncrono */ }
    }
  }
  return null
}

export function pastaTemp(prefixo = 'ns-onda-') {
  const p = mkdtempSync(join(tmpdir(), prefixo))
  return { caminho: p, apagar: () => { try { rmSync(p, { recursive: true, force: true }) } catch {} } }
}

/**
 * 🔑 VALIDA O INSTRUMENTO ANTES DA MEDIDA. Grava duas vezes o mesmo texto (tem que dar
 * ~1) e um texto diferente (tem que dar ~0). Se isso não acontecer — ffmpeg ausente,
 * edge-tts mudado, rede caída devolvendo arquivo vazio — a comparação está mentindo e o
 * certo é parar, não reportar "tudo ok".
 * Ver [[feedback_validar_o_instrumento_antes_da_medida]].
 */
export function autoteste(log = console.log) {
  const t = pastaTemp('ns-onda-teste-')
  try {
    const a = gravar('Dois', join(t.caminho, 'a.mp3'))
    const b = gravar('Dois', join(t.caminho, 'b.mp3'))
    const c = gravar('Um', join(t.caminho, 'c.mp3'))
    if (!a || !b || !c) throw new Error('não consegui gravar os controles do autoteste — sem isso não há medida, só chute')
    const igual = semelhanca(onda(a), onda(b))
    const diferente = semelhanca(onda(a), onda(c))
    log(`   autoteste: mesmo texto ${igual.toFixed(4)} · texto diferente ${diferente.toFixed(4)}`)
    if (igual < 0.98) throw new Error(`gravar "Dois" duas vezes deu ${igual.toFixed(4)} — o comparador não reconhece nem a fala idêntica`)
    if (diferente > 0.5) throw new Error(`"Dois" vs "Um" deu ${diferente.toFixed(4)} — o comparador não separa falas diferentes`)
    return true
  } finally { t.apagar() }
}
