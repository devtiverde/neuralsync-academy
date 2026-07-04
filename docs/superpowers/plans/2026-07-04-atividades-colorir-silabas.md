# Atividades Colorir e Sílabas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar dois novos tipos de atividade data-driven ao NeuralSync Academy — `colorir` (pintar regiões de um desenho SVG por clique) e `silabas` (montar palavras clicando sílabas em ordem, apoio à alfabetização) — totalmente integrados ao hub Explorar, à Trilha e ao fluxo de conclusão existentes.

**Architecture:** Seguir exatamente o padrão já usado por `numeros`/`formas`/`cores`/`alfabeto`: cada tipo novo é uma entrada em `tipoConfig`, dados inline em `atividadesExtra.js` (sem arquivos de dados separados — este arquivo não importa nada de outros módulos hoje, então não vamos introduzir esse padrão), um componente em `src/pages/atividades/`, e os 8 pontos de integração documentados no projeto (rota, tema x2, hub, kidsLinks, badge, tipoOrder, merge em `useAtividades.js`).

**Tech Stack:** React 19, react-router-dom v7 (`useNavigate`/`useLocation` + `state`), SVG nativo (sem lib de desenho), Web Speech API (`window.speechSynthesis`) para áudio, `src/lib/sounds.js` (`playSound`) para efeitos sonoros.

## Global Constraints

- Sem framework de testes no projeto (confirmado em `CLAUDE.md`: "No test framework is configured") — verificação é `npm run build` (zero erros) + `npx eslint <arquivo>` por componente + checagem manual/Playwright em viewport 390×844, igual ao padrão já usado nas últimas sessões deste projeto.
- Nunca usar `git add -A`/`git add .` — adicionar arquivos específicos por nome.
- Todo texto visível ao usuário em pt-BR.
- Nenhuma largura fixa em px sem contrapartida mobile (ver checklist `neuralsync_padrao_mobile.md` da memória do projeto): paleta de cores e fichas de sílaba usam `flexWrap`/`overflowX:auto` conforme o caso, nunca grid fixo que estoure 390px.
- `dist/` e deploy Cloudflare Pages (`npx wrangler pages deploy dist --project-name neuralsync-academy --branch main`) só acontecem se o usuário pedir explicitamente — este plano cobre até a verificação local, não o deploy.

---

### Task 1: Dados da atividade Colorir (`colorirExtraPorFaixa`)

**Files:**
- Modify: `src/data/atividadesExtra.js` (append ao final do arquivo, após a linha `}` que fecha o último export, atualmente linha 6541)

**Interfaces:**
- Produces: `export const colorirExtraPorFaixa` com shape:
  ```
  { exploradores: Atividade[3], construtores: Atividade[3], criadores: Atividade[3], inventores: Atividade[3] }
  ```
  onde cada `Atividade` tem os campos padrão do projeto (`id, tipo:'colorir', titulo, descricao, emoji, habilidade, xp_reward, coins_reward, tempo_estimado, historinha`) mais `dados.desenho = { viewBox: number, nome: string, regioes: Regiao[] }`.
  `Regiao = { id: string, tipo: 'circle'|'rect'|'ellipse'|'polygon'|'radial', props: object }` — `props` varia por `tipo`:
  - `circle`: `{ cx, cy, r }`
  - `rect`: `{ x, y, width, height, rx? }`
  - `ellipse`: `{ cx, cy, rx, ry }`
  - `polygon`: `{ points: 'x1,y1 x2,y2 ...' }`
  - `radial`: `{ cx, cy, rInner, rOuter, n }` (desenha `n` "pétalas"/"raios" triangulares ao redor do centro — usado em Sol e Flor)
- Consumes: nada (é conteúdo puro, primeira peça do quebra-cabeça)

- [ ] **Step 1: Adicionar o bloco `colorirExtraPorFaixa` ao final de `src/data/atividadesExtra.js`**

Acrescentar exatamente este bloco após a linha 6541 (a última linha do arquivo, que hoje é `}`):

```js

// ──────────────────────────────────────────────
// COLORIR — MVP (3 desenhos por faixa, formas geométricas SVG simples)
// ──────────────────────────────────────────────
export const colorirExtraPorFaixa = {
  exploradores: [
    {
      id: 'exp_colorir_sol', tipo: 'colorir', titulo: 'Colorir: Sol', descricao: 'Escolha as cores e pinte o sol sorridente!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 60, coins_reward: 60, tempo_estimado: 8,
      historinha: 'O sol amanheceu sem nenhuma cor! ☀️ Escolha as cores que você quiser e toque em cada parte para deixar o dia mais bonito.',
      dados: { desenho: { viewBox: 300, nome: 'Sol', regioes: [
        { id: 'nucleo', tipo: 'circle', props: { cx: 150, cy: 150, r: 55 } },
        { id: 'raios', tipo: 'radial', props: { cx: 150, cy: 150, rInner: 58, rOuter: 95, n: 8 } },
        { id: 'olho_esquerdo', tipo: 'circle', props: { cx: 130, cy: 140, r: 8 } },
        { id: 'olho_direito', tipo: 'circle', props: { cx: 170, cy: 140, r: 8 } },
        { id: 'boca', tipo: 'rect', props: { x: 125, y: 165, width: 50, height: 10, rx: 5 } },
      ] } },
    },
    {
      id: 'exp_colorir_casa', tipo: 'colorir', titulo: 'Colorir: Casa', descricao: 'Pinte a casinha do jeito que você imaginar!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 60, coins_reward: 60, tempo_estimado: 8,
      historinha: 'Essa casinha está esperando as cores! 🏠 Toque numa cor e depois numa parte da casa para pintar.',
      dados: { desenho: { viewBox: 300, nome: 'Casa', regioes: [
        { id: 'parede', tipo: 'rect', props: { x: 70, y: 150, width: 160, height: 100 } },
        { id: 'telhado', tipo: 'polygon', props: { points: '60,150 150,80 240,150' } },
        { id: 'chamine', tipo: 'rect', props: { x: 190, y: 95, width: 20, height: 40 } },
        { id: 'porta', tipo: 'rect', props: { x: 135, y: 190, width: 30, height: 60 } },
        { id: 'janela_esquerda', tipo: 'rect', props: { x: 90, y: 170, width: 30, height: 30 } },
        { id: 'janela_direita', tipo: 'rect', props: { x: 180, y: 170, width: 30, height: 30 } },
      ] } },
    },
    {
      id: 'exp_colorir_flor', tipo: 'colorir', titulo: 'Colorir: Flor', descricao: 'Dê vida a essa flor com as cores que você quiser!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 60, coins_reward: 60, tempo_estimado: 8,
      historinha: 'O jardim ganhou uma flor nova, mas ela ainda não tem cor! 🌸 Escolha as cores e pinte cada pedacinho.',
      dados: { desenho: { viewBox: 300, nome: 'Flor', regioes: [
        { id: 'caule', tipo: 'rect', props: { x: 145, y: 180, width: 10, height: 90 } },
        { id: 'folha_esquerda', tipo: 'polygon', props: { points: '145,220 108,233 145,248' } },
        { id: 'folha_direita', tipo: 'polygon', props: { points: '155,220 192,233 155,248' } },
        { id: 'petalas', tipo: 'radial', props: { cx: 150, cy: 140, rInner: 26, rOuter: 58, n: 6 } },
        { id: 'miolo', tipo: 'circle', props: { cx: 150, cy: 140, r: 25 } },
      ] } },
    },
  ],
  construtores: [
    {
      id: 'con_colorir_peixe', tipo: 'colorir', titulo: 'Colorir: Peixe', descricao: 'Pinte o peixinho e suas bolhas de ar!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 80, coins_reward: 80, tempo_estimado: 8,
      historinha: 'No fundo do mar vive um peixinho sem cor nenhuma! 🐟 Escolha as cores e pinte cada parte dele.',
      dados: { desenho: { viewBox: 300, nome: 'Peixe', regioes: [
        { id: 'cauda', tipo: 'polygon', props: { points: '205,150 250,113 250,187' } },
        { id: 'corpo', tipo: 'ellipse', props: { cx: 140, cy: 150, rx: 70, ry: 45 } },
        { id: 'barbatana_superior', tipo: 'polygon', props: { points: '120,108 145,78 165,110' } },
        { id: 'barbatana_inferior', tipo: 'polygon', props: { points: '120,192 145,222 165,190' } },
        { id: 'olho', tipo: 'circle', props: { cx: 100, cy: 140, r: 8 } },
        { id: 'bolha1', tipo: 'circle', props: { cx: 250, cy: 90, r: 6 } },
        { id: 'bolha2', tipo: 'circle', props: { cx: 266, cy: 70, r: 4 } },
      ] } },
    },
    {
      id: 'con_colorir_foguete', tipo: 'colorir', titulo: 'Colorir: Foguete', descricao: 'Pinte o foguete antes da decolagem!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 80, coins_reward: 80, tempo_estimado: 8,
      historinha: 'Esse foguete está pronto para decolar, só falta a pintura! 🚀 Escolha as cores e deixe ele com a sua cara.',
      dados: { desenho: { viewBox: 300, nome: 'Foguete', regioes: [
        { id: 'chama', tipo: 'polygon', props: { points: '138,200 150,242 162,200' } },
        { id: 'aleta_esquerda', tipo: 'polygon', props: { points: '130,175 98,222 130,200' } },
        { id: 'aleta_direita', tipo: 'polygon', props: { points: '170,175 202,222 170,200' } },
        { id: 'corpo', tipo: 'rect', props: { x: 130, y: 90, width: 40, height: 110, rx: 20 } },
        { id: 'ponta', tipo: 'polygon', props: { points: '130,90 170,90 150,38' } },
        { id: 'janela', tipo: 'circle', props: { cx: 150, cy: 130, r: 14 } },
      ] } },
    },
    {
      id: 'con_colorir_borboleta', tipo: 'colorir', titulo: 'Colorir: Borboleta', descricao: 'Pinte as asas coloridas da borboleta!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 80, coins_reward: 80, tempo_estimado: 8,
      historinha: 'Uma borboleta pousou no jardim, mas suas asas ainda não têm cor! 🦋 Escolha as cores e pinte cada asa.',
      dados: { desenho: { viewBox: 300, nome: 'Borboleta', regioes: [
        { id: 'asa_sup_esq', tipo: 'ellipse', props: { cx: 108, cy: 118, rx: 45, ry: 32 } },
        { id: 'asa_sup_dir', tipo: 'ellipse', props: { cx: 192, cy: 118, rx: 45, ry: 32 } },
        { id: 'asa_inf_esq', tipo: 'ellipse', props: { cx: 113, cy: 174, rx: 35, ry: 25 } },
        { id: 'asa_inf_dir', tipo: 'ellipse', props: { cx: 187, cy: 174, rx: 35, ry: 25 } },
        { id: 'corpo', tipo: 'rect', props: { x: 145, y: 100, width: 10, height: 110, rx: 5 } },
        { id: 'cabeca', tipo: 'circle', props: { cx: 150, cy: 95, r: 10 } },
      ] } },
    },
  ],
  criadores: [
    {
      id: 'cri_colorir_robo', tipo: 'colorir', titulo: 'Colorir: Robô', descricao: 'Pinte o robô com botões e antena!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 100, coins_reward: 100, tempo_estimado: 9,
      historinha: 'Esse robô acabou de sair da fábrica e ainda está sem nenhuma cor! 🤖 Escolha as cores e pinte cada peça dele.',
      dados: { desenho: { viewBox: 300, nome: 'Robô', regioes: [
        { id: 'braco_esquerdo', tipo: 'rect', props: { x: 55, y: 140, width: 30, height: 15, rx: 7 } },
        { id: 'braco_direito', tipo: 'rect', props: { x: 215, y: 140, width: 30, height: 15, rx: 7 } },
        { id: 'perna_esquerda', tipo: 'rect', props: { x: 105, y: 225, width: 25, height: 40, rx: 6 } },
        { id: 'perna_direita', tipo: 'rect', props: { x: 170, y: 225, width: 25, height: 40, rx: 6 } },
        { id: 'corpo', tipo: 'rect', props: { x: 90, y: 130, width: 120, height: 90, rx: 14 } },
        { id: 'botao1', tipo: 'circle', props: { cx: 130, cy: 170, r: 10 } },
        { id: 'botao2', tipo: 'circle', props: { cx: 170, cy: 170, r: 10 } },
        { id: 'cabeca', tipo: 'rect', props: { x: 110, y: 60, width: 80, height: 60, rx: 10 } },
        { id: 'antena', tipo: 'rect', props: { x: 145, y: 35, width: 10, height: 25, rx: 5 } },
        { id: 'antena_bola', tipo: 'circle', props: { cx: 150, cy: 32, r: 8 } },
        { id: 'olho_esquerdo', tipo: 'circle', props: { cx: 130, cy: 90, r: 10 } },
        { id: 'olho_direito', tipo: 'circle', props: { cx: 170, cy: 90, r: 10 } },
      ] } },
    },
    {
      id: 'cri_colorir_arvore', tipo: 'colorir', titulo: 'Colorir: Árvore', descricao: 'Pinte a árvore frondosa e suas maçãs!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 100, coins_reward: 100, tempo_estimado: 9,
      historinha: 'Essa árvore está cheia de maçãs, mas nem ela nem as frutas têm cor ainda! 🌳 Escolha as cores e pinte cada parte.',
      dados: { desenho: { viewBox: 300, nome: 'Árvore', regioes: [
        { id: 'tronco', tipo: 'rect', props: { x: 135, y: 180, width: 30, height: 90, rx: 6 } },
        { id: 'copa_baixa', tipo: 'circle', props: { cx: 150, cy: 170, r: 60 } },
        { id: 'copa_meio', tipo: 'circle', props: { cx: 150, cy: 120, r: 48 } },
        { id: 'copa_topo', tipo: 'circle', props: { cx: 150, cy: 80, r: 35 } },
        { id: 'maca1', tipo: 'circle', props: { cx: 115, cy: 150, r: 8 } },
        { id: 'maca2', tipo: 'circle', props: { cx: 185, cy: 140, r: 8 } },
        { id: 'maca3', tipo: 'circle', props: { cx: 150, cy: 100, r: 8 } },
      ] } },
    },
    {
      id: 'cri_colorir_carro', tipo: 'colorir', titulo: 'Colorir: Carro', descricao: 'Pinte o carro e suas rodas!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 100, coins_reward: 100, tempo_estimado: 9,
      historinha: 'Esse carro saiu da concessionária sem nenhuma cor na lataria! 🚗 Escolha as cores e pinte cada parte.',
      dados: { desenho: { viewBox: 300, nome: 'Carro', regioes: [
        { id: 'carroceria', tipo: 'rect', props: { x: 60, y: 140, width: 180, height: 60, rx: 16 } },
        { id: 'cabine', tipo: 'polygon', props: { points: '100,140 120,100 190,100 210,140' } },
        { id: 'janela_esquerda', tipo: 'polygon', props: { points: '108,138 124,108 150,108 150,138' } },
        { id: 'janela_direita', tipo: 'polygon', props: { points: '154,138 154,108 180,108 196,138' } },
        { id: 'roda_esquerda', tipo: 'circle', props: { cx: 105, cy: 205, r: 25 } },
        { id: 'roda_direita', tipo: 'circle', props: { cx: 205, cy: 205, r: 25 } },
        { id: 'farol', tipo: 'circle', props: { cx: 235, cy: 160, r: 10 } },
      ] } },
    },
  ],
  inventores: [
    {
      id: 'inv_colorir_cidade', tipo: 'colorir', titulo: 'Colorir: Cidade', descricao: 'Pinte o horizonte da cidade ao entardecer!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 120, coins_reward: 120, tempo_estimado: 10,
      historinha: 'Essa cidade acabou de ser construída e ainda não tem cor nenhuma! 🏙️ Escolha as cores e pinte cada prédio.',
      dados: { desenho: { viewBox: 300, nome: 'Cidade', regioes: [
        { id: 'ceu', tipo: 'rect', props: { x: 0, y: 0, width: 300, height: 300 } },
        { id: 'sol_fundo', tipo: 'circle', props: { cx: 250, cy: 60, r: 25 } },
        { id: 'predio1', tipo: 'rect', props: { x: 40, y: 140, width: 50, height: 130 } },
        { id: 'predio3', tipo: 'rect', props: { x: 165, y: 120, width: 45, height: 150 } },
        { id: 'predio4', tipo: 'rect', props: { x: 220, y: 160, width: 50, height: 110 } },
        { id: 'predio2', tipo: 'rect', props: { x: 100, y: 90, width: 55, height: 180 } },
        { id: 'janela_predio2_1', tipo: 'rect', props: { x: 112, y: 110, width: 12, height: 12 } },
        { id: 'janela_predio2_2', tipo: 'rect', props: { x: 132, y: 110, width: 12, height: 12 } },
      ] } },
    },
    {
      id: 'inv_colorir_sistema_solar', tipo: 'colorir', titulo: 'Colorir: Sistema Solar', descricao: 'Pinte o Sol e os planetas!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 120, coins_reward: 120, tempo_estimado: 10,
      historinha: 'O Sol e os planetas estão esperando suas cores reais! 🪐 Escolha as cores e pinte cada um.',
      dados: { desenho: { viewBox: 300, nome: 'Sistema Solar', regioes: [
        { id: 'fundo_espaco', tipo: 'rect', props: { x: 0, y: 0, width: 300, height: 300 } },
        { id: 'sol', tipo: 'circle', props: { cx: 40, cy: 150, r: 28 } },
        { id: 'planeta1', tipo: 'circle', props: { cx: 100, cy: 150, r: 12 } },
        { id: 'planeta2', tipo: 'circle', props: { cx: 140, cy: 150, r: 16 } },
        { id: 'planeta3', tipo: 'circle', props: { cx: 185, cy: 150, r: 14 } },
        { id: 'anel_planeta4', tipo: 'ellipse', props: { cx: 230, cy: 150, rx: 38, ry: 9 } },
        { id: 'planeta4', tipo: 'circle', props: { cx: 230, cy: 150, r: 20 } },
        { id: 'planeta5', tipo: 'circle', props: { cx: 275, cy: 150, r: 10 } },
      ] } },
    },
    {
      id: 'inv_colorir_ponte', tipo: 'colorir', titulo: 'Colorir: Ponte', descricao: 'Pinte a ponte suspensa e a paisagem!',
      emoji: '🖍️', habilidade: 'Coordenação', xp_reward: 120, coins_reward: 120, tempo_estimado: 10,
      historinha: 'Essa ponte suspensa acabou de ser inaugurada, mas ainda está sem cor! 🌉 Escolha as cores e pinte cada parte.',
      dados: { desenho: { viewBox: 300, nome: 'Ponte', regioes: [
        { id: 'ceu', tipo: 'rect', props: { x: 0, y: 0, width: 300, height: 210 } },
        { id: 'agua', tipo: 'rect', props: { x: 0, y: 210, width: 300, height: 90 } },
        { id: 'cabo_esquerdo', tipo: 'polygon', props: { points: '67,60 150,130 73,130' } },
        { id: 'cabo_direito', tipo: 'polygon', props: { points: '233,60 150,130 227,130' } },
        { id: 'torre_esquerda', tipo: 'rect', props: { x: 60, y: 60, width: 14, height: 80 } },
        { id: 'torre_direita', tipo: 'rect', props: { x: 226, y: 60, width: 14, height: 80 } },
        { id: 'pilar_esquerdo', tipo: 'rect', props: { x: 70, y: 140, width: 18, height: 90 } },
        { id: 'pilar_direito', tipo: 'rect', props: { x: 212, y: 140, width: 18, height: 90 } },
        { id: 'tabuleiro', tipo: 'rect', props: { x: 40, y: 130, width: 220, height: 18, rx: 4 } },
      ] } },
    },
  ],
}
```

- [ ] **Step 2: Criar script de validação temporário e rodar**

Criar `scripts/tmp-validar-colorir.mjs` (criar a pasta `scripts/` se não existir):

```js
import { colorirExtraPorFaixa } from '../src/data/atividadesExtra.js'

const faixas = ['exploradores', 'construtores', 'criadores', 'inventores']
let totalAtividades = 0
let totalRegioes = 0
const erros = []

for (const faixa of faixas) {
  const lista = colorirExtraPorFaixa[faixa] || []
  if (lista.length !== 3) erros.push(`${faixa}: esperado 3 atividades, encontrado ${lista.length}`)
  totalAtividades += lista.length
  for (const at of lista) {
    if (at.tipo !== 'colorir') erros.push(`${at.id}: tipo deveria ser 'colorir', é '${at.tipo}'`)
    const regioes = at.dados?.desenho?.regioes || []
    if (regioes.length === 0) erros.push(`${at.id}: sem regioes`)
    const ids = regioes.map(r => r.id)
    if (new Set(ids).size !== ids.length) erros.push(`${at.id}: ids de regiao duplicados`)
    totalRegioes += regioes.length
  }
}

console.log(`Atividades: ${totalAtividades} (esperado 12)`)
console.log(`Regioes totais: ${totalRegioes} (esperado 86)`)
if (erros.length) {
  console.log('ERROS:')
  erros.forEach(e => console.log(' - ' + e))
  process.exit(1)
} else {
  console.log('OK — nenhum erro encontrado')
}
```

Run: `node scripts/tmp-validar-colorir.mjs`
Expected:
```
Atividades: 12 (esperado 12)
Regioes totais: 86 (esperado 86)
OK — nenhum erro encontrado
```
Se o número de regiões não bater com 86, revisar o `Step 1` procurando região faltando/sobrando antes de continuar.

- [ ] **Step 3: Apagar o script temporário**

```bash
rm scripts/tmp-validar-colorir.mjs
```

- [ ] **Step 4: Commit**

```bash
git add src/data/atividadesExtra.js
git commit -m "feat: adiciona dados da atividade Colorir (12 desenhos, 3/faixa)"
```

---

### Task 2: Componente `ColorirAtividade.jsx`

**Files:**
- Create: `src/pages/atividades/ColorirAtividade.jsx`

**Interfaces:**
- Consumes: `atividade.dados.desenho` no formato produzido pela Task 1 (`{ viewBox, nome, regioes: [{id, tipo, props}] }`); `atividade.{id,tipo,titulo,emoji,xp_reward,coins_reward}` (campos padrão já usados por todo componente de atividade, ver `NumerosAtividade.jsx`); `playSound(tipo)` de `../../lib/sounds` (tipos válidos: `'click'|'correct'|'wrong'|'complete'|'coin'|'levelup'`); `getKidsLink(id)` de `../../lib/kidsLinks`; `<IntroAtividade>` e `<GameShell>` como wrappers (mesmas props usadas em `NumerosAtividade.jsx`: `atividade, onComecar, onVoltar, refazendo, kidsLink` / `atividade, tipo, progresso, labelProgresso, onVoltar`).
- Produces: rota consome este componente como `element` — export default `ColorirAtividade` sem props (lê tudo de `useLocation().state.atividade`, padrão idêntico a `NumerosAtividade.jsx`).

- [ ] **Step 1: Criar o componente completo**

```jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

const COR_VAZIA = '#E5E7EB'
const CONTORNO = '#1F2937'

const PALETA_CORES = [
  { nome: 'Vermelho', hex: '#EF4444' },
  { nome: 'Laranja',  hex: '#F97316' },
  { nome: 'Amarelo',  hex: '#FACC15' },
  { nome: 'Verde',    hex: '#22C55E' },
  { nome: 'Azul',     hex: '#3B82F6' },
  { nome: 'Roxo',     hex: '#A855F7' },
  { nome: 'Rosa',     hex: '#EC4899' },
  { nome: 'Marrom',   hex: '#92400E' },
]

function radialTrianglePoints(cx, cy, rInner, rOuter, n, i) {
  const step = (2 * Math.PI) / n
  const half = step * 0.32
  const mid = step * i
  const apex  = [cx + rOuter * Math.cos(mid),          cy + rOuter * Math.sin(mid)]
  const base1 = [cx + rInner * Math.cos(mid - half),   cy + rInner * Math.sin(mid - half)]
  const base2 = [cx + rInner * Math.cos(mid + half),   cy + rInner * Math.sin(mid + half)]
  return `${apex[0]},${apex[1]} ${base1[0]},${base1[1]} ${base2[0]},${base2[1]}`
}

function RegiaoSVG({ regiao, cor, onClick }) {
  const comum = { fill: cor, stroke: CONTORNO, strokeWidth: 3, style: { cursor: 'pointer', transition: 'fill 0.15s' }, onClick }

  if (regiao.tipo === 'circle')  return <circle cx={regiao.props.cx} cy={regiao.props.cy} r={regiao.props.r} {...comum} />
  if (regiao.tipo === 'rect')    return <rect x={regiao.props.x} y={regiao.props.y} width={regiao.props.width} height={regiao.props.height} rx={regiao.props.rx || 0} {...comum} />
  if (regiao.tipo === 'ellipse') return <ellipse cx={regiao.props.cx} cy={regiao.props.cy} rx={regiao.props.rx} ry={regiao.props.ry} {...comum} />
  if (regiao.tipo === 'polygon') return <polygon points={regiao.props.points} {...comum} />
  if (regiao.tipo === 'radial') {
    const { cx, cy, rInner, rOuter, n } = regiao.props
    return (
      <g onClick={onClick} style={{ cursor: 'pointer' }}>
        {Array.from({ length: n }).map((_, i) => (
          <polygon key={i} points={radialTrianglePoints(cx, cy, rInner, rOuter, n, i)} fill={cor} stroke={CONTORNO} strokeWidth={2} />
        ))}
      </g>
    )
  }
  return null
}

export default function ColorirAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [coresAplicadas, setCoresAplicadas] = useState({})
  const [corSelecionada, setCorSelecionada] = useState(PALETA_CORES[0].hex)
  const [encerrado, setEncerrado] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])
  if (!atividade) return null

  const desenho = atividade?.dados?.desenho
  const regioes = desenho?.regioes || []
  const total = regioes.length
  const pintadas = Object.keys(coresAplicadas).length
  const progresso = total ? (pintadas / total) * 100 : 0
  const limiar3 = Math.ceil(total * 0.9)
  const limiar2 = Math.ceil(total * 0.6)
  const limiar1 = Math.ceil(total * 0.3)
  const estrelas = pintadas >= limiar3 ? 3 : pintadas >= limiar2 ? 2 : pintadas >= limiar1 ? 1 : 0

  const kidsLink = getKidsLink(atividade.id)
  if (!iniciou) return (
    <IntroAtividade
      atividade={atividade}
      onComecar={() => setIniciou(true)}
      onVoltar={() => navigate(-1)}
      refazendo={state?.refazendo}
      kidsLink={kidsLink}
    />
  )

  function pintarRegiao(id) {
    playSound('click')
    setCoresAplicadas(prev => {
      const next = { ...prev, [id]: corSelecionada }
      if (Object.keys(next).length === total && Object.keys(prev).length < total) {
        setTimeout(() => { playSound('complete'); setEncerrado(true) }, 500)
      }
      return next
    })
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>🎨🌟🎨</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Ficou lindo! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você coloriu {desenho.nome} inteirinho!</p>
          </div>

          <svg width={220} height={220} viewBox={`0 0 ${desenho.viewBox} ${desenho.viewBox}`} style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.06)' }}>
            {regioes.map(r => <RegiaoSVG key={r.id} regiao={r} cor={coresAplicadas[r.id] || COR_VAZIA} onClick={() => {}} />)}
          </svg>

          {estrelas > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {Array.from({ length: estrelas }).map((_, i) => (
                <span key={i} style={{ fontSize: '24px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCoresAplicadas({}); setEncerrado(false) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Pintar de novo
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#84CC16,#a3e635)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(132,204,22,0.4)' }}
            >
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${pintadas} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ maxWidth: '560px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', width: '100%', padding: '4px 2px' }}>
          {PALETA_CORES.map(c => (
            <button
              key={c.hex}
              onClick={() => { setCorSelecionada(c.hex); playSound('click') }}
              title={c.nome}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: c.hex, cursor: 'pointer',
                border: corSelecionada === c.hex ? '3px solid white' : '3px solid transparent',
                boxShadow: corSelecionada === c.hex ? `0 0 0 3px ${c.hex}, 0 4px 14px ${c.hex}80` : '0 2px 8px rgba(0,0,0,0.2)',
                transform: corSelecionada === c.hex ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.15s',
              }}
            />
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '24px', padding: '20px', width: '100%', display: 'flex', justifyContent: 'center', border: '1.5px solid rgba(255,255,255,0.1)' }}>
          <svg width="100%" height="auto" viewBox={`0 0 ${desenho.viewBox} ${desenho.viewBox}`} style={{ maxWidth: '400px' }}>
            {regioes.map(r => (
              <RegiaoSVG key={r.id} regiao={r} cor={coresAplicadas[r.id] || COR_VAZIA} onClick={() => pintarRegiao(r.id)} />
            ))}
          </svg>
        </div>

        {estrelas > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ fontSize: '20px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600' }}>{pintadas} de {total} partes pintadas</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
```

- [ ] **Step 2: Verificar com ESLint**

Run: `npx eslint src/pages/atividades/ColorirAtividade.jsx`
Expected: sem erros (saída vazia ou só warnings já presentes em outros arquivos do projeto).

- [ ] **Step 3: Commit**

```bash
git add src/pages/atividades/ColorirAtividade.jsx
git commit -m "feat: cria componente ColorirAtividade"
```

---

### Task 3: Dados da atividade Sílabas (`silabasExtraPorFaixa`)

**Files:**
- Modify: `src/data/atividadesExtra.js` (append após o bloco `colorirExtraPorFaixa` da Task 1)

**Interfaces:**
- Produces: `export const silabasExtraPorFaixa` com shape `{ exploradores: Atividade[1], construtores: Atividade[1] }`, onde cada `Atividade` tem os campos padrão mais `dados.palavras: Palavra[]`, `Palavra = { id: string, palavra: string, silabas: string[], emoji: string }`.
- Consumes: nada.

- [ ] **Step 1: Adicionar o bloco `silabasExtraPorFaixa` ao final de `src/data/atividadesExtra.js`**

```js

// ──────────────────────────────────────────────
// SÍLABAS — MVP (1 atividade por faixa, 8 palavras cada, ordenadas por dificuldade)
// ──────────────────────────────────────────────
export const silabasExtraPorFaixa = {
  exploradores: [
    {
      id: 'exp_silabas', tipo: 'silabas', titulo: 'Sílabas: Palavras Simples', descricao: 'Junte as sílabas e forme a palavra!',
      emoji: '🔡', habilidade: 'Linguagem', xp_reward: 60, coins_reward: 60, tempo_estimado: 10,
      historinha: 'As sílabas se espalharam e as palavras ficaram bagunçadas! 🔤 Toque nas sílabas na ordem certa para formar cada palavra.',
      dados: { palavras: [
        { id: 'bola', palavra: 'BOLA', silabas: ['BO', 'LA'], emoji: '⚽' },
        { id: 'casa', palavra: 'CASA', silabas: ['CA', 'SA'], emoji: '🏠' },
        { id: 'sapo', palavra: 'SAPO', silabas: ['SA', 'PO'], emoji: '🐸' },
        { id: 'mesa', palavra: 'MESA', silabas: ['ME', 'SA'], emoji: '🪑' },
        { id: 'pato', palavra: 'PATO', silabas: ['PA', 'TO'], emoji: '🦆' },
        { id: 'dedo', palavra: 'DEDO', silabas: ['DE', 'DO'], emoji: '👆' },
        { id: 'gato', palavra: 'GATO', silabas: ['GA', 'TO'], emoji: '🐱' },
        { id: 'bode', palavra: 'BODE', silabas: ['BO', 'DE'], emoji: '🐐' },
      ] },
    },
  ],
  construtores: [
    {
      id: 'con_silabas', tipo: 'silabas', titulo: 'Sílabas: Palavras Compostas', descricao: 'Junte 3 ou mais sílabas e forme a palavra!',
      emoji: '🔡', habilidade: 'Linguagem', xp_reward: 80, coins_reward: 80, tempo_estimado: 10,
      historinha: 'Essas palavras são maiores e têm mais sílabas! 🔤 Toque nas sílabas na ordem certa para formar cada uma.',
      dados: { palavras: [
        { id: 'boneca',    palavra: 'BONECA',    silabas: ['BO', 'NE', 'CA'],       emoji: '🪆' },
        { id: 'janela',    palavra: 'JANELA',    silabas: ['JA', 'NE', 'LA'],       emoji: '🪟' },
        { id: 'cavalo',    palavra: 'CAVALO',    silabas: ['CA', 'VA', 'LO'],       emoji: '🐴' },
        { id: 'banana',    palavra: 'BANANA',    silabas: ['BA', 'NA', 'NA'],       emoji: '🍌' },
        { id: 'sorvete',   palavra: 'SORVETE',   silabas: ['SOR', 'VE', 'TE'],      emoji: '🍦' },
        { id: 'cachorro',  palavra: 'CACHORRO',  silabas: ['CA', 'CHOR', 'RO'],     emoji: '🐕' },
        { id: 'elefante',  palavra: 'ELEFANTE',  silabas: ['E', 'LE', 'FAN', 'TE'], emoji: '🐘' },
        { id: 'bicicleta', palavra: 'BICICLETA', silabas: ['BI', 'CI', 'CLE', 'TA'],emoji: '🚲' },
      ] },
    },
  ],
}
```

- [ ] **Step 2: Criar script de validação temporário e rodar**

Criar `scripts/tmp-validar-silabas.mjs`:

```js
import { silabasExtraPorFaixa } from '../src/data/atividadesExtra.js'

const faixas = ['exploradores', 'construtores']
let totalAtividades = 0
let totalPalavras = 0
const erros = []

for (const faixa of faixas) {
  const lista = silabasExtraPorFaixa[faixa] || []
  if (lista.length !== 1) erros.push(`${faixa}: esperado 1 atividade, encontrado ${lista.length}`)
  totalAtividades += lista.length
  for (const at of lista) {
    if (at.tipo !== 'silabas') erros.push(`${at.id}: tipo deveria ser 'silabas', é '${at.tipo}'`)
    const palavras = at.dados?.palavras || []
    if (palavras.length !== 8) erros.push(`${at.id}: esperado 8 palavras, encontrado ${palavras.length}`)
    for (const p of palavras) {
      const junto = p.silabas.join('')
      if (junto !== p.palavra) erros.push(`${at.id}/${p.id}: silabas '${junto}' não formam a palavra '${p.palavra}'`)
    }
    totalPalavras += palavras.length
  }
}

console.log(`Atividades: ${totalAtividades} (esperado 2)`)
console.log(`Palavras totais: ${totalPalavras} (esperado 16)`)
if (erros.length) {
  console.log('ERROS:')
  erros.forEach(e => console.log(' - ' + e))
  process.exit(1)
} else {
  console.log('OK — nenhum erro encontrado')
}
```

Run: `node scripts/tmp-validar-silabas.mjs`
Expected:
```
Atividades: 2 (esperado 2)
Palavras totais: 16 (esperado 16)
OK — nenhum erro encontrado
```

- [ ] **Step 3: Apagar o script temporário**

```bash
rm scripts/tmp-validar-silabas.mjs
```

- [ ] **Step 4: Commit**

```bash
git add src/data/atividadesExtra.js
git commit -m "feat: adiciona dados da atividade Silabas (2 entradas, 8 palavras cada)"
```

---

### Task 4: Componente `SilabasAtividade.jsx`

**Files:**
- Create: `src/pages/atividades/SilabasAtividade.jsx`

**Interfaces:**
- Consumes: `atividade.dados.palavras` no formato da Task 3 (`{id, palavra, silabas: string[], emoji}[]`); mesmos wrappers/libs da Task 2 (`IntroAtividade`, `GameShell`, `playSound`, `getKidsLink`); `window.speechSynthesis` (TTS nativo do navegador, sem lib externa).
- Produces: export default `SilabasAtividade`, mesmo padrão de rota sem props.

- [ ] **Step 1: Criar o componente completo**

```jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import '../../styles/crianca.css'

function falarTTS(texto) {
  if (!window.speechSynthesis) return
  const utt = new SpeechSynthesisUtterance(texto)
  utt.lang = 'pt-BR'
  utt.rate = 0.8
  utt.pitch = 1.1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utt)
}

function embaralhar(silabas) {
  const fichas = silabas.map((texto, fichaId) => ({ fichaId, texto }))
  for (let i = fichas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[fichas[i], fichas[j]] = [fichas[j], fichas[i]]
  }
  return fichas
}

export default function SilabasAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slots, setSlots] = useState([])
  const [fichas, setFichas] = useState([])
  const [fichasUsadas, setFichasUsadas] = useState(new Set())
  const [acertos, setAcertos] = useState(new Set())
  const [erro, setErro] = useState(false)
  const [travado, setTravado] = useState(false)
  const [encerrado, setEncerrado] = useState(false)

  useEffect(() => { if (!atividade) navigate(-1) }, [])

  const palavras = atividade?.dados?.palavras || []
  const total = palavras.length
  const atual = palavras[currentIndex]

  useEffect(() => {
    if (!atual) return
    setSlots(Array(atual.silabas.length).fill(null))
    setFichas(embaralhar(atual.silabas))
    setFichasUsadas(new Set())
  }, [currentIndex, atividade])

  if (!atividade) return null

  const kidsLink = getKidsLink(atividade.id)
  if (!iniciou) return (
    <IntroAtividade
      atividade={atividade}
      onComecar={() => setIniciou(true)}
      onVoltar={() => navigate(-1)}
      refazendo={state?.refazendo}
      kidsLink={kidsLink}
    />
  )

  const progresso = total ? (acertos.size / total) * 100 : 0
  const limiar3 = Math.ceil(total * 0.9)
  const limiar2 = Math.ceil(total * 0.6)
  const limiar1 = Math.ceil(total * 0.3)
  const estrelas = acertos.size >= limiar3 ? 3 : acertos.size >= limiar2 ? 2 : acertos.size >= limiar1 ? 1 : 0

  function handleFicha(ficha) {
    if (travado || fichasUsadas.has(ficha.fichaId)) return
    falarTTS(ficha.texto)
    playSound('click')

    const proximoVazio = slots.findIndex(s => s === null)
    if (proximoVazio === -1) return

    const novosSlots = [...slots]
    novosSlots[proximoVazio] = ficha.texto
    const novasUsadas = new Set(fichasUsadas)
    novasUsadas.add(ficha.fichaId)
    setSlots(novosSlots)
    setFichasUsadas(novasUsadas)

    if (proximoVazio === slots.length - 1) {
      setTravado(true)
      const correta = novosSlots.every((s, i) => s === atual.silabas[i])
      if (correta) {
        setTimeout(() => { playSound('correct'); falarTTS(atual.palavra) }, 300)
        setTimeout(() => {
          const novoAcertos = new Set(acertos)
          novoAcertos.add(currentIndex)
          setAcertos(novoAcertos)
          if (currentIndex < total - 1) {
            setCurrentIndex(currentIndex + 1)
            setTravado(false)
          } else {
            playSound('complete')
            setEncerrado(true)
          }
        }, 1800)
      } else {
        setErro(true)
        playSound('wrong')
        setTimeout(() => {
          setErro(false)
          setSlots(Array(atual.silabas.length).fill(null))
          setFichasUsadas(new Set())
          setTravado(false)
        }, 900)
      }
    }
  }

  if (encerrado) {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '24px', padding: '20px 0' }}>
          <div style={{ fontSize: '64px', letterSpacing: '8px', animation: 'ns-bounce 1.5s ease-in-out infinite' }}>🔡⭐🔡</div>
          <div>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '6px' }}>Você é craque! 🎉</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Você montou todas as {total} palavras!</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(4, total)}, 1fr)`, gap: '8px', maxWidth: '400px', width: '100%' }}>
            {palavras.map((p, i) => (
              <div key={i} style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)', borderRadius: '12px', padding: '10px 4px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '2px' }}>{p.emoji}</div>
                <div style={{ color: '#67e8f9', fontWeight: '900', fontSize: '13px' }}>{p.palavra}</div>
              </div>
            ))}
          </div>

          {estrelas > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {Array.from({ length: estrelas }).map((_, i) => (
                <span key={i} style={{ fontSize: '24px', animation: `ns-bounce ${0.8 + i * 0.25}s ease-in-out infinite` }}>⭐</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
            <button
              onClick={() => { setCurrentIndex(0); setAcertos(new Set()); setEncerrado(false) }}
              style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              🔁 Repetir
            </button>
            <button
              onClick={() => navigate('/encerramento', { state: { xp: atividade.xp_reward, coins: atividade.coins_reward, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#06B6D4,#67e8f9)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(6,182,212,0.4)' }}
            >
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  return (
    <GameShell
      atividade={atividade}
      tipo={atividade.tipo}
      progresso={progresso}
      labelProgresso={`${acertos.size} / ${total}`}
      onVoltar={() => navigate(-1)}
    >
      <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

        <div style={{ fontSize: '80px', lineHeight: 1 }}>{atual.emoji}</div>

        <button
          onClick={() => falarTTS(atual.palavra)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)',
            borderRadius: '99px', padding: '8px 18px', color: '#67e8f9', fontWeight: '700', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        >
          🔊 Ouvir palavra
        </button>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', animation: erro ? 'ns-silabas-shake 0.4s ease' : 'none' }}>
          {slots.map((s, i) => (
            <div key={i} style={{
              minWidth: '64px', height: '64px', borderRadius: '14px', padding: '0 10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: s ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.06)',
              border: s ? '2px solid #06B6D4' : '2px dashed rgba(255,255,255,0.2)',
              color: 'white', fontWeight: '900', fontSize: '22px', fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              {s || ''}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {fichas.map(f => (
            <button
              key={f.fichaId}
              onClick={() => handleFicha(f)}
              disabled={fichasUsadas.has(f.fichaId) || travado}
              style={{
                minWidth: '64px', height: '64px', padding: '0 12px', borderRadius: '14px',
                background: fichasUsadas.has(f.fichaId) ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg,#06B6D4,#67e8f9)',
                border: 'none', color: fichasUsadas.has(f.fichaId) ? 'rgba(255,255,255,0.15)' : 'white',
                fontWeight: '900', fontSize: '22px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                cursor: fichasUsadas.has(f.fichaId) || travado ? 'not-allowed' : 'pointer',
                opacity: fichasUsadas.has(f.fichaId) ? 0.35 : 1,
                boxShadow: fichasUsadas.has(f.fichaId) ? 'none' : '0 6px 16px rgba(6,182,212,0.35)',
                transition: 'all 0.15s',
              }}
            >
              {f.texto}
            </button>
          ))}
        </div>

        {estrelas > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Array.from({ length: estrelas }).map((_, i) => (
              <span key={i} style={{ fontSize: '18px' }}>⭐</span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: '600' }}>{acertos.size} de {total} palavras montadas</span>
          </div>
        )}
      </div>
    </GameShell>
  )
}
```

- [ ] **Step 2: Adicionar a keyframe `ns-silabas-shake` usada acima**

Abrir `src/styles/crianca.css` e adicionar ao final do arquivo:

```css

@keyframes ns-silabas-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
```

- [ ] **Step 3: Verificar com ESLint**

Run: `npx eslint src/pages/atividades/SilabasAtividade.jsx`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/pages/atividades/SilabasAtividade.jsx src/styles/crianca.css
git commit -m "feat: cria componente SilabasAtividade"
```

---

### Task 5: Integração completa (checklist de 8 pontos)

**Files:**
- Modify: `src/data/atividadesData.js` (tipoConfig)
- Modify: `src/hooks/useAtividades.js` (import + merge)
- Modify: `src/App.jsx` (lazy import + rotas)
- Modify: `src/components/GameShell.jsx` (tipoTheme)
- Modify: `src/pages/atividades/IntroAtividade.jsx` (tipoTheme)
- Modify: `src/pages/crianca/HomeCrianca.jsx` (tipoGradiente + hubItens)
- Modify: `src/lib/kidsLinks.js` (map)
- Modify: `src/pages/crianca/Encerramento.jsx` (badgeMap)
- Modify: `src/pages/crianca/Trilha.jsx` (tipoOrder)

**Interfaces:**
- Consumes: `colorirExtraPorFaixa` (Task 1), `silabasExtraPorFaixa` (Task 3), `ColorirAtividade` (Task 2), `SilabasAtividade` (Task 4).
- Produces: as duas atividades acessíveis fim-a-fim via `/trilha` → card → `/atividade/colorir` ou `/atividade/silabas`, e via hub Explorar em `/home-crianca`.

- [ ] **Step 1: `tipoConfig` em `src/data/atividadesData.js`**

Old string (linha 1026-1027):
```js
  ingles:            { icon: '🇺🇸', label: 'Inglês',            cor: '#3B82F6' },
}
```
New string:
```js
  ingles:            { icon: '🇺🇸', label: 'Inglês',            cor: '#3B82F6' },
  colorir:           { icon: '🖍️', label: 'Colorir',           cor: '#84CC16' },
  silabas:           { icon: '🔡', label: 'Sílabas',           cor: '#06B6D4' },
}
```

- [ ] **Step 2: Import + merge em `src/hooks/useAtividades.js`**

Old string (linha 4):
```js
import { atividadesExtraPorFaixa, fase2ExtraPorFaixa, fase3ExtraPorFaixa, fase4ExtraPorFaixa, fase5ExtraPorFaixa, inglesExtraPorFaixa, formasExtraPorFaixa, numerosExtraPorFaixa, coresExtraPorFaixa, alfabetoExtraPorFaixa } from '../data/atividadesExtra'
```
New string:
```js
import { atividadesExtraPorFaixa, fase2ExtraPorFaixa, fase3ExtraPorFaixa, fase4ExtraPorFaixa, fase5ExtraPorFaixa, inglesExtraPorFaixa, formasExtraPorFaixa, numerosExtraPorFaixa, coresExtraPorFaixa, alfabetoExtraPorFaixa, colorirExtraPorFaixa, silabasExtraPorFaixa } from '../data/atividadesExtra'
```

Old string (linhas 26-27):
```js
      ...(coresExtraPorFaixa[f]       || []),
      ...(alfabetoExtraPorFaixa[f]    || []),
    ]
```
New string:
```js
      ...(coresExtraPorFaixa[f]       || []),
      ...(alfabetoExtraPorFaixa[f]    || []),
      ...(colorirExtraPorFaixa[f]     || []),
      ...(silabasExtraPorFaixa[f]     || []),
    ]
```

- [ ] **Step 3: Lazy import + rotas em `src/App.jsx`**

Old string (linha 76):
```js
const InglesAtividade             = lazy(() => import('./pages/atividades/InglesAtividade'))
```
New string:
```js
const InglesAtividade             = lazy(() => import('./pages/atividades/InglesAtividade'))
const ColorirAtividade            = lazy(() => import('./pages/atividades/ColorirAtividade'))
const SilabasAtividade            = lazy(() => import('./pages/atividades/SilabasAtividade'))
```

Old string (linha 177):
```js
          <Route path="/atividade/ingles"              element={<InglesAtividade />} />
```
New string:
```js
          <Route path="/atividade/ingles"              element={<InglesAtividade />} />
          <Route path="/atividade/colorir"              element={<ColorirAtividade />} />
          <Route path="/atividade/silabas"              element={<SilabasAtividade />} />
```

- [ ] **Step 4: Tema em `src/components/GameShell.jsx`**

Old string (linha 28):
```js
  alfabeto:  { bg: 'linear-gradient(160deg,#051a12 0%,#0d3320 100%)', accent: '#1D9E75', glow: 'rgba(29,158,117,0.3)'  },
}
```
New string:
```js
  alfabeto:  { bg: 'linear-gradient(160deg,#051a12 0%,#0d3320 100%)', accent: '#1D9E75', glow: 'rgba(29,158,117,0.3)'  },
  colorir:   { bg: 'linear-gradient(160deg,#0d1a05 0%,#1a3305 100%)', accent: '#84CC16', glow: 'rgba(132,204,22,0.3)'  },
  silabas:   { bg: 'linear-gradient(160deg,#04181f 0%,#0a3040 100%)', accent: '#06B6D4', glow: 'rgba(6,182,212,0.3)'   },
}
```

- [ ] **Step 5: Tema em `src/pages/atividades/IntroAtividade.jsx`**

Old string (linha 35):
```js
  ingles:    { bg: 'linear-gradient(160deg,#040e1f 0%,#0a2040 100%)', accent: '#3B82F6', soft: '#93C5FD' },
}
```
New string:
```js
  ingles:    { bg: 'linear-gradient(160deg,#040e1f 0%,#0a2040 100%)', accent: '#3B82F6', soft: '#93C5FD' },
  colorir:   { bg: 'linear-gradient(160deg,#0d1a05 0%,#1a3305 100%)', accent: '#84CC16', soft: '#bef264' },
  silabas:   { bg: 'linear-gradient(160deg,#04181f 0%,#0a3040 100%)', accent: '#06B6D4', soft: '#67e8f9' },
}
```

- [ ] **Step 6: `tipoGradiente` + `hubItens` em `src/pages/crianca/HomeCrianca.jsx`**

Old string (linha 52):
```js
  ingles:               'linear-gradient(135deg, #1e3a5f, #3B82F6)',
}
```
New string:
```js
  ingles:               'linear-gradient(135deg, #1e3a5f, #3B82F6)',
  colorir:              'linear-gradient(135deg, #4d7c0f, #84CC16)',
  silabas:              'linear-gradient(135deg, #0e7490, #06B6D4)',
}
```

Old string (linha 152, dentro de `hubItens`):
```js
    { id: 'cores',     label: 'Cores',      icon: '🎨', cat: 'letras',     grad: tipoGradiente.cores,     sub: contsPorTipo.cores     ? contsPorTipo.cores     + ' ativ.' : null, show: !!contsPorTipo.cores,     nav: () => navigate('/trilha') },
```
New string:
```js
    { id: 'cores',     label: 'Cores',      icon: '🎨', cat: 'letras',     grad: tipoGradiente.cores,     sub: contsPorTipo.cores     ? contsPorTipo.cores     + ' ativ.' : null, show: !!contsPorTipo.cores,     nav: () => navigate('/trilha') },
    { id: 'colorir',   label: 'Colorir',    icon: '🖍️', cat: 'letras',    grad: tipoGradiente.colorir,   sub: contsPorTipo.colorir   ? contsPorTipo.colorir   + ' ativ.' : null, show: !!contsPorTipo.colorir,   nav: () => navigate('/trilha') },
    { id: 'silabas',   label: 'Sílabas',    icon: '🔡', cat: 'letras',     grad: tipoGradiente.silabas,   sub: contsPorTipo.silabas   ? contsPorTipo.silabas   + ' ativ.' : null, show: !!contsPorTipo.silabas,   nav: () => navigate('/trilha') },
```

- [ ] **Step 7: Mapeamento em `src/lib/kidsLinks.js`**

Old string (linhas 427-429):
```js
  inv_alfabeto_medicina:       'formas_cores',
}
```
New string:
```js
  inv_alfabeto_medicina:       'formas_cores',

  // ── COLORIR ────────────────────────────────────────
  exp_colorir_sol:             'formas_cores',
  exp_colorir_casa:            'formas_cores',
  exp_colorir_flor:            'formas_cores',
  con_colorir_peixe:           'formas_cores',
  con_colorir_foguete:         'formas_cores',
  con_colorir_borboleta:       'formas_cores',
  cri_colorir_robo:            'formas_cores',
  cri_colorir_arvore:          'formas_cores',
  cri_colorir_carro:           'formas_cores',
  inv_colorir_cidade:          'formas_cores',
  inv_colorir_sistema_solar:   'formas_cores',
  inv_colorir_ponte:           'formas_cores',

  // ── SÍLABAS ────────────────────────────────────────
  exp_silabas:                 'formas_cores',
  con_silabas:                 'formas_cores',
}
```

- [ ] **Step 8: `badgeMap` em `src/pages/crianca/Encerramento.jsx`**

Old string (linhas 23-24):
```js
  alfabeto:  { emoji: '🔤', texto: 'Mestre das Letras!' },
}
```
New string:
```js
  alfabeto:  { emoji: '🔤', texto: 'Mestre das Letras!' },
  colorir:   { emoji: '🖍️', texto: 'Artista Colorido!' },
  silabas:   { emoji: '🔡', texto: 'Leitor em Formação!' },
}
```

- [ ] **Step 9: `tipoOrder` em `src/pages/crianca/Trilha.jsx`**

Old string (linha 375):
```js
          const tipoOrder = ['quiz','memoria','sequencia','labirinto','robo','padrao','quizia','inventor','blocos','numeros','formas','cores','alfabeto','ingles']
```
New string:
```js
          const tipoOrder = ['quiz','memoria','sequencia','labirinto','robo','padrao','quizia','inventor','blocos','numeros','formas','cores','alfabeto','ingles','colorir','silabas']
```

- [ ] **Step 10: Build de verificação**

Run: `npm run build`
Expected: build finaliza sem erros (últimas linhas mostram `✓ built in ...`).

- [ ] **Step 11: Commit**

```bash
git add src/data/atividadesData.js src/hooks/useAtividades.js src/App.jsx src/components/GameShell.jsx src/pages/atividades/IntroAtividade.jsx src/pages/crianca/HomeCrianca.jsx src/lib/kidsLinks.js src/pages/crianca/Encerramento.jsx src/pages/crianca/Trilha.jsx
git commit -m "feat: integra Colorir e Silabas em toda a infraestrutura (tipoConfig, rotas, temas, hub, kidsLinks, badges, trilha)"
```

---

### Task 6: Verificação manual fim-a-fim (desktop + mobile)

**Files:** nenhum arquivo novo — apenas verificação via dev server.

**Interfaces:**
- Consumes: tudo das Tasks 1-5, rodando via `npm run dev`.
- Produces: confirmação de que ambas as atividades funcionam ponta a ponta antes de considerar a feature pronta (não inclui deploy — deploy só acontece se o usuário pedir).

- [ ] **Step 1: Rodar o dev server**

Run: `npm run dev` (deixar rodando em background)
Expected: servidor sobe em `http://localhost:5173` (ou porta indicada no terminal) sem erros no console.

- [ ] **Step 2: Testar Colorir em viewport desktop**

Login com uma conta de teste → `/home-crianca` → aba "Letras" no filtro do Explorar → card "Colorir" → `/trilha` → abrir qualquer atividade `Colorir: <nome>` → verificar:
- Paleta de 8 cores aparece, clicar numa cor a destaca
- Clicar numa região do SVG pinta com a cor selecionada
- Barra de progresso do `GameShell` avança conforme regiões são pintadas
- Ao pintar a última região, tela de conclusão aparece com o desenho colorido e estrelas
- Botão "Concluir" navega para `/encerramento` com XP/coins corretos

- [ ] **Step 3: Testar Sílabas em viewport desktop**

`/trilha` → abrir `Sílabas: Palavras Simples` (Exploradores) ou `Sílabas: Palavras Compostas` (Construtores) → verificar:
- Emoji da palavra atual aparece grande
- Botão "🔊 Ouvir palavra" toca a palavra completa via TTS
- Tocar nas fichas de sílaba na ordem certa preenche os espaços da esquerda pra direita e toca o som da sílaba
- Formar a palavra certa toca áudio da palavra + avança para a próxima após a animação
- Tocar fora de ordem (proposital) causa shake + fichas voltam pro pool após a pausa
- Ao completar as 8 palavras, tela de conclusão aparece com recap + estrelas

- [ ] **Step 4: Testar as duas atividades em viewport mobile 390×844 via Playwright**

Usar o mesmo padrão de scripts descartáveis já usado nas auditorias mobile anteriores deste projeto (ver `neuralsync_padrao_mobile.md` da memória): abrir contexto Playwright com `viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true`, navegar até `/atividade/colorir` e `/atividade/silabas` (via estado de navegação real, não URL direta — ambas exigem `state.atividade`), e checar:
```js
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
```
Expected: `overflow === false` nas duas telas. Se `true`, revisar se a paleta de cores/fichas de sílaba estão de fato usando `overflowX:auto`/`flexWrap` (Task 2 Step 1 / Task 4 Step 1) antes de prosseguir.

- [ ] **Step 5: Encerrar o dev server e confirmar estado limpo**

Run: `git status`
Expected: nenhuma alteração pendente além dos commits já feitos nas Tasks 1-5 (nenhum arquivo `scripts/tmp-*` deve sobrar).

---

## Fora de escopo (não implementar neste plano)

- Expandir Colorir de 3→10 desenhos por faixa e Sílabas com mais palavras/distratores — backlog futuro, ver spec.
- Áudio humano ElevenLabs para sílabas (MVP usa só TTS do navegador).
- Categoria "🎨 Arte" dedicada no hub Explorar.
- **Gap identificado durante o planejamento, não coberto pela spec original:** `src/pages/pai/Relatorio.jsx` tem um mapeamento `TIPO_CATEGORIA` que traduz cada `tipo` de atividade para uma das 6 categorias cognitivas do radar chart dos pais (Memória/Atenção/Espacial/Linguagem/Lógica/Coordenação). Os tipos novos `colorir` e `silabas` não terão entrada nesse mapeamento e portanto não vão aparecer corretamente categorizados no radar cognitivo do relatório dos pais até que isso seja adicionado numa sessão futura — mencionar ao usuário ao final da implementação.
