/**
 * regravar-cores.mjs — mantido pelo nome, que já está em uso; o trabalho mora em
 * `regravar-falas.mjs`, que serve os 4 tipos e lê a regra de `lib-fala.mjs`.
 *
 * 🔑 Por que virou atalho em vez de continuar com código próprio: este arquivo tinha a
 * SEXTA cópia da regra de "qual arquivo, qual texto". Foi a divergência entre essas
 * cópias que produziu os três defeitos de voz do projeto — inclusive o `${c.frase}` que
 * pôs "undefined" na fala das cores. Copiar a regra é o defeito; não a cópia desta vez.
 *
 * uso: node scripts/regravar-cores.mjs [--so-listar]
 */
import { regravar } from './regravar-falas.mjs'

await regravar('cores', { soListar: process.argv.includes('--so-listar') })
