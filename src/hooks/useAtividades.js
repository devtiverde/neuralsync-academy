import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ⚡ Os dados das atividades NÃO são importados no topo de propósito.
// `atividadesExtra.js` era 702 kB (233 kB gzip), o maior arquivo do projeto. Como
// este hook é importado por HomeCrianca, Trilha e TrilhaPai, um import estático
// fazia esses 233 kB serem baixados e PARSEADOS antes da tela da criança aparecer,
// travando a navegação. O hook já é assíncrono (espera o Supabase e expõe
// `loading`), então trazer os dados por `import()` dinâmico não muda o
// comportamento visível — só tira o peso do caminho crítico.
//
// ⚡⚡ 03/08/2026 — E AGORA SÓ A FAIXA DA CRIANÇA VIAJA.
// Tirar do caminho crítico não bastava: o arquivo continuava sendo baixado inteiro,
// com as QUATRO faixas, para usar UMA. A criança é de uma faixa só, sempre — as
// outras três eram peso morto no 4G dela. O conteúdo foi dividido em
// `src/data/extra/<faixa>.js` e aqui se importa exatamente o da criança, o que
// corta ~3/4 desse download. `atividadesExtra.js` continua existindo como barril
// para quem precisa das quatro (painel do pai, bancada de teste) — mas este hook
// não pode importá-lo, senão arrasta tudo de volta e o ganho evapora.
// Ver [[feedback_import_dinamico_todos_os_importadores]].

// O mapa é explícito porque `import()` com caminho montado em runtime faz o
// empacotador incluir TODOS os arquivos que casam com o padrão — voltaríamos ao
// problema por outro caminho, e em silêncio.
const EXTRA_POR_FAIXA = {
  exploradores: () => import('../data/extra/exploradores.js'),
  construtores: () => import('../data/extra/construtores.js'),
  criadores:    () => import('../data/extra/criadores.js'),
  inventores:   () => import('../data/extra/inventores.js'),
}

export function useAtividades(faixaEtaria) {
  const [atividades, setAtividades] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!faixaEtaria) return
    let cancelado = false

    async function carregar() {
      const f = faixaEtaria
      // Faixa desconhecida cai em construtores, como já caía nas listas base.
      const carregarExtra = EXTRA_POR_FAIXA[f] || EXTRA_POR_FAIXA.construtores
      // Os módulos de dados carregam em paralelo, só quando o hook roda — e o de
      // atividades extra traz SÓ a faixa desta criança.
      const [dataMod, extraMod, colorir2Mod, musicaMod] = await Promise.all([
        import('../data/atividadesData'),
        carregarExtra(),
        import('../data/colorirExtra2'),
        import('../data/musicaExtra'),
      ])
      if (cancelado) return

      // `extraMod` já é a faixa certa: os exports são as listas, não mapas por faixa.
      const base = [
        ...(dataMod.atividadesPorFaixa[f]       || dataMod.atividadesPorFaixa.construtores),
        ...(extraMod.atividadesExtraPorFaixa    || []),
        ...(dataMod.fase2PorFaixa[f]            || dataMod.fase2PorFaixa.construtores),
        ...(extraMod.fase2ExtraPorFaixa         || []),
        ...(dataMod.fase3PorFaixa[f]            || []),
        ...(extraMod.fase3ExtraPorFaixa         || []),
        ...(extraMod.fase4ExtraPorFaixa         || []),
        ...(extraMod.fase5ExtraPorFaixa         || []),
        ...(extraMod.inglesExtraPorFaixa        || []),
        ...(extraMod.formasExtraPorFaixa        || []),
        ...(extraMod.numerosExtraPorFaixa       || []),
        ...(extraMod.coresExtraPorFaixa         || []),
        ...(extraMod.alfabetoExtraPorFaixa      || []),
        ...(extraMod.colorirExtraPorFaixa       || []),
        ...(colorir2Mod.colorirExtra2PorFaixa[f] || []),
        ...(musicaMod.musicaExtraPorFaixa[f]     || []),
        ...(extraMod.silabasExtraPorFaixa       || []),
      ]

      const { data } = await supabase
        .from('ns_atividades')
        .select('*')
        .eq('faixa_etaria', faixaEtaria)
        .eq('ativo', true)
        .order('fase',  { ascending: true })
        .order('ordem', { ascending: true })
      if (cancelado) return

      if (data && data.length > 0) {
        // Adiciona do Supabase apenas atividades que não existem nos arquivos JS
        const baseIds = new Set(base.map(a => a.id))
        const extras = data
          .filter(row => !baseIds.has(row.id))
          .map(row => ({
            id:             row.id,
            tipo:           row.tipo,
            titulo:         row.titulo,
            descricao:      row.descricao,
            emoji:          row.emoji,
            habilidade:     row.habilidade,
            xp_reward:      row.xp_reward,
            coins_reward:   row.coins_reward,
            tempo_estimado: row.tempo_estimado,
            historinha:     row.historinha,
            ...row.dados,
          }))
        setAtividades([...base, ...extras])
      } else {
        setAtividades(base)
      }
      setLoading(false)
    }

    // `loading` já nasce true (useState(true)); não re-setamos aqui para não
    // disparar setState síncrono dentro do effect. `faixaEtaria` é a faixa fixa
    // da criança e não muda durante a sessão, então não há caso real de precisar
    // voltar a "carregando" numa re-execução.
    // Se o import ou a query falharem, não deixa a tela presa em "carregando".
    carregar().catch(err => {
      if (cancelado) return
      console.error('Erro ao carregar atividades:', err)
      setAtividades([])
      setLoading(false)
    })

    return () => { cancelado = true }
  }, [faixaEtaria])

  return { atividades, loading }
}
