import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ⚡ Os dados das atividades NÃO são importados no topo de propósito.
// `atividadesExtra.js` sozinho tem 702 kB (233 kB gzip) — é o maior arquivo do
// projeto. Como este hook é importado por HomeCrianca, Trilha e TrilhaPai, um
// import estático fazia esses 233 kB serem baixados e PARSEADOS antes da tela
// da criança aparecer, travando a navegação. O hook já é assíncrono (espera o
// Supabase e expõe `loading`), então trazer os dados por `import()` dinâmico
// não muda o comportamento visível — só tira o peso do caminho crítico. A tela
// abre na hora e as atividades entram no tick seguinte, como já entravam.

export function useAtividades(faixaEtaria) {
  const [atividades, setAtividades] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!faixaEtaria) return
    let cancelado = false

    async function carregar() {
      const f = faixaEtaria
      // Os três módulos de dados carregam em paralelo, só quando o hook roda.
      const [dataMod, extraMod, colorir2Mod, musicaMod] = await Promise.all([
        import('../data/atividadesData'),
        import('../data/atividadesExtra'),
        import('../data/colorirExtra2'),
        import('../data/musicaExtra'),
      ])
      if (cancelado) return

      const base = [
        ...(dataMod.atividadesPorFaixa[f]       || dataMod.atividadesPorFaixa.construtores),
        ...(extraMod.atividadesExtraPorFaixa[f]  || []),
        ...(dataMod.fase2PorFaixa[f]            || dataMod.fase2PorFaixa.construtores),
        ...(extraMod.fase2ExtraPorFaixa[f]       || []),
        ...(dataMod.fase3PorFaixa[f]            || []),
        ...(extraMod.fase3ExtraPorFaixa[f]       || []),
        ...(extraMod.fase4ExtraPorFaixa[f]       || []),
        ...(extraMod.fase5ExtraPorFaixa[f]       || []),
        ...(extraMod.inglesExtraPorFaixa[f]      || []),
        ...(extraMod.formasExtraPorFaixa[f]      || []),
        ...(extraMod.numerosExtraPorFaixa[f]     || []),
        ...(extraMod.coresExtraPorFaixa[f]       || []),
        ...(extraMod.alfabetoExtraPorFaixa[f]    || []),
        ...(extraMod.colorirExtraPorFaixa[f]     || []),
        ...(colorir2Mod.colorirExtra2PorFaixa[f] || []),
        ...(musicaMod.musicaExtraPorFaixa[f]     || []),
        ...(extraMod.silabasExtraPorFaixa[f]     || []),
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
