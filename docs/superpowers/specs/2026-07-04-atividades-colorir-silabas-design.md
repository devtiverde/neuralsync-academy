# Design — Novas atividades: Colorir e Sílabas

**Data:** 2026-07-04
**Status:** Aprovado pelo usuário, aguardando plano de implementação

## Contexto

O NeuralSync Academy tem 13 tipos de atividade data-driven (quiz, memoria, sequencia, labirinto, robo, padrao, blocos, quizia, inventor, numeros, formas, cores, alfabeto, ingles), todas seguindo o mesmo padrão de integração: `tipoConfig` em `atividadesData.js`, entradas em `atividadesExtra.js`, rota em `App.jsx`, tema em `GameShell`/`IntroAtividade`, item no hub Explorar (`HomeCrianca.jsx`), mapeamento em `kidsLinks.js`.

Este design adiciona dois tipos novos ao mesmo padrão: **`colorir`** (pintar desenho por regiões) e **`silabas`** (montar palavras juntando sílabas, apoio à alfabetização).

## Decisão de abordagem

Seguir o padrão **data-driven tipo novo** (igual Números/Formas/Cores/Alfabeto), não o padrão de rota standalone dedicada (igual CaçaPalavras/HistoriaInterativa). Motivo: o padrão data-driven reaproveita toda a infraestrutura existente (Trilha, GameShell, XP/coins, kidsLinks, filtros) automaticamente; uma rota standalone exigiria reconstruir manualmente navegação e progresso que o padrão já resolve.

## Escopo do MVP (decisão explícita de tamanho)

Ambas as atividades usam conteúdo pequeno nesta primeira entrega, com expansão de conteúdo tratada como backlog futuro — mesmo padrão usado historicamente para Números/Formas/Cores (ver `neuralsync_expansao_conteudo.md`, memória do projeto).

- **Colorir:** meta final de 10 desenhos/faixa (40 total), mas MVP entrega **3 desenhos por faixa (12 total)**. Motivo: cada desenho é arte SVG composta manualmente; 40 numa sessão só é viável reduzindo drasticamente a qualidade/variedade de cada um.
- **Sílabas:** MVP entrega **1 atividade por faixa (Exploradores + Construtores) com ~8 palavras internas cada**, navegadas em sequência dentro da mesma sessão (mesmo padrão de "múltiplos itens dentro de uma atividade" já usado em `NumerosAtividade`).

---

## 1. Atividade "Colorir" (tipo `colorir`)

### Faixas e conteúdo MVP
Todas as 4 faixas etárias, 3 desenhos cada (12 total):
- Exploradores: Sol, Casa, Flor
- Construtores: Peixe, Foguete, Borboleta
- Criadores: Robô, Árvore, Carro
- Inventores: Cidade (skyline simples), Sistema Solar, Ponte

### Mecânica
- Livre — sem gabarito de "cor certa". Paleta de ~8 cores fixas no topo da tela; tocar numa cor a destaca como selecionada.
- Tocar numa região do desenho aplica a cor selecionada àquela região (estado local: `Map<regiaoId, corHex>`).
- Conclusão = todas as regiões do desenho foram pintadas pelo menos uma vez (qualquer cor conta, não precisa ser a "certa" porque não existe certa).
- Barra de progresso: `regiõesPintadas / totalRegiões`.
- Estrelas: mesmos limiares já usados em `NumerosAtividade` (≥90% = 3, ≥60% = 2, ≥30% = 1).
- Tela de conclusão segue o padrão existente (recap visual + XP/coins + botões Repetir/Concluir).

### Estilo visual dos desenhos
Composição de formas geométricas SVG simples — **não** line-art com paths curvos à mão. Cada desenho é uma lista de regiões, cada região é uma forma primitiva (`circle`, `rect`, `ellipse`, `polygon`, `path` simples para triângulos/losangos). Isso garante regiões sempre bem delimitadas (sem risco de sobreposição/buraco) e facilita criar novos desenhos depois.

Exemplo de estrutura de um desenho (Sol):
```js
{
  id: 'exp_col_sol',
  nome: 'Sol',
  regioes: [
    { id: 'nucleo', tipo: 'circle', props: { cx: 150, cy: 150, r: 50 }, corInicial: '#f5f5f5' },
    { id: 'raio1', tipo: 'polygon', props: { points: '...' }, corInicial: '#f5f5f5' },
    // ... mais raios
  ],
}
```

### Arquivos novos
- `src/data/colorirDesenhos.js` — desenhos nomeados por faixa, exportados como objetos `{ id, nome, viewBox, regioes[] }`
- `src/pages/atividades/ColorirAtividade.jsx` — componente novo:
  - Segue o esqueleto de `NumerosAtividade.jsx` (guard de `atividade`, `IntroAtividade` pré-tela, `GameShell` wrapper, tela de conclusão)
  - Renderiza um `<svg>` mapeando `atividade.dados.desenho.regioes` para elementos SVG conforme `tipo`
  - Paleta de cores como componente interno `PaletaCores`

### Integração
- `tipoConfig.colorir` em `atividadesData.js` — ícone 🎨, cor a definir (sugestão: `#EC4899` rosa, ainda não usada por nenhum tipo)
- `colorirExtraPorFaixa` em `atividadesExtra.js` (12 entradas, `dados: { desenho: <import de colorirDesenhos.js> }`)
- Rota `/atividade/colorir` em `App.jsx` (lazy)
- Tema `colorir` em `GameShell.jsx` e `IntroAtividade.jsx`
- `tipoGradiente.colorir` + item no `hubItens` do Explorar (`HomeCrianca.jsx`) — categoria do hub: `raciocinio` (categoria mais próxima disponível; app não tem categoria "arte" hoje)
- `kidsLinks.js`: 12 IDs → categoria `formas_cores` (mesma bucket usada por Formas/Cores/Alfabeto)
- Badge em `Encerramento.jsx` para tipo `colorir`
- `tipoOrder` da Trilha (`Trilha.jsx`) inclui `colorir`

### Responsividade mobile (obrigatório desde o início, ver `neuralsync_padrao_mobile.md`)
- Paleta de cores: `overflowX:auto` + `flexShrink:0` nos swatches (padrão chip scrollável) caso não caiba em 390px
- SVG do desenho: `viewBox` fixo + `width:'100%'` (sem largura em px fixa) para escalar em qualquer tela
- Testar em viewport 390×844 via Playwright antes de considerar pronto

---

## 2. Atividade "Sílabas" (tipo `silabas`)

### Faixas e conteúdo MVP
- Exploradores: 8 palavras de 2 sílabas / 4 letras (ex: BOLA🏀, CASA🏠, SAPO🐸, MESA...)
- Construtores: 8 palavras de 3+ sílabas, mais longas (ex: BONECA🪆, CACHORRO🐕, BICICLETA🚲...)
- 2 entradas de atividade no total (1 por faixa), cada uma com 8 palavras internas navegadas em sequência

### Progressão
Dentro de cada sessão, as 8 palavras vêm ordenadas da mais simples para a mais difícil (por número de sílabas / comprimento). Isso implementa o "começa simples depois vai aumentando" pedido pelo usuário — sem precisar de níveis/telas separadas.

### Mecânica
1. Palavra atual: emoji grande da palavra sempre visível (dica visual pra quem ainda não lê) + N espaços vazios (um por sílaba) + fichas com as sílabas da palavra embaralhadas (sem sílabas-isca extras no MVP).
2. Criança toca numa ficha → toca o áudio da sílaba e a ficha ocupa o próximo espaço vazio da esquerda pra direita.
3. Ficha já usada some do pool (não pode reusar).
4. Quando todos os espaços são preenchidos:
   - Se a sequência formar a palavra certa → toca áudio da palavra inteira, confete/partículas, avança pra próxima palavra após um delay.
   - Se formar errado → shake nos espaços preenchidos, fichas voltam pro pool após um delay curto, criança tenta de novo (sem penalidade de vida/erro contado, foco é aprendizado não performance).
5. Botão "🔊 Ouvir palavra" sempre disponível pra tocar a palavra completa como dica, mesmo antes de montar.
6. Progresso: `palavrasCorretas / total` (8). Estrelas nos mesmos limiares padrão.

### Áudio
TTS do navegador (`window.speechSynthesis`, `lang='pt-BR'`) — mesmo padrão do Alfabeto/Números sem áudio gravado. Usado tanto para tocar cada sílaba isolada ao tocar na ficha quanto para a palavra inteira ao acertar ou ao clicar "Ouvir palavra". Sem gravação humana ElevenLabs nesta entrega (poderia ser upgrade futuro, igual foi feito com Cores/Formas/Números/Alfabeto).

### Arquivos novos
- `src/data/silabasPalavras.js` — export `{ exploradores: [...8 palavras], construtores: [...8 palavras] }`, cada palavra `{ id, palavra, silabas: string[], emoji }`
- `src/pages/atividades/SilabasAtividade.jsx` — componente novo:
  - Segue o esqueleto de `NumerosAtividade.jsx` (guard, `IntroAtividade`, `GameShell`, tela de conclusão)
  - Estado: `currentIndex`, `slots` (array de sílabas preenchidas na palavra atual), `fichasDisponiveis` (sílabas embaralhadas ainda não usadas), `acertos` (Set de índices concluídos)

### Integração
- `tipoConfig.silabas` em `atividadesData.js` — ícone 🔤, cor a definir (sugestão: `#10B981` verde, ainda não usada)
- `silabasExtraPorFaixa` em `atividadesExtra.js` (2 entradas: `exp_silabas`, `con_silabas`, `dados: { palavras: [...] }`)
- Rota `/atividade/silabas` em `App.jsx` (lazy)
- Tema `silabas` em `GameShell.jsx` e `IntroAtividade.jsx`
- `tipoGradiente.silabas` + item no `hubItens` do Explorar — categoria do hub: `letras` (mesma categoria de Alfabeto/Inglês)
- `kidsLinks.js`: 2 IDs → categoria `formas_cores` (mesma bucket já usada pelo Alfabeto — não existe categoria dedicada de alfabetização hoje)
- Badge em `Encerramento.jsx` para tipo `silabas`
- `tipoOrder` da Trilha inclui `silabas`

### Responsividade mobile
- Fichas de sílaba e espaços vazios: grid/flex com `flexWrap:wrap` e tamanho mínimo tocável (44px), nunca largura fixa que force overflow em 390px
- Testar em viewport 390×844 via Playwright antes de considerar pronto

---

## Fora de escopo (backlog documentado, não desta entrega)

- Expandir Colorir de 3→10 desenhos por faixa (mais 28 desenhos)
- Expandir Sílabas com mais palavras / distratores (sílabas-isca) pra aumentar dificuldade
- Áudio humano gravado (ElevenLabs) para sílabas, substituindo o TTS
- Nomear a cor em voz alta ao selecioná-la no Colorir (reforço de vocabulário de cores)
- Categoria dedicada "🎨 Arte" no filtro do hub Explorar (hoje Colorir usa `raciocinio` por falta de categoria melhor)

## Testes e verificação antes de considerar pronto

1. `npm run build` — zero erros
2. Fluxo completo de cada atividade testado manualmente (ou via Playwright) em viewport desktop e mobile (390×844)
3. Checklist de integração de 8 pontos (ver seção "Integração" de cada atividade) — nenhum item pulado, conforme `feedback_neuralsync_nova_atividade.md`
4. `scrollWidth` checado via JS em mobile, não apenas screenshot `fullPage`
