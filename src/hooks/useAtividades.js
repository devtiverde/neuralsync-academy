import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { atividadesPorFaixa, fase2PorFaixa, fase3PorFaixa } from '../data/atividadesData'
import { atividadesExtraPorFaixa, fase2ExtraPorFaixa, fase3ExtraPorFaixa, fase4ExtraPorFaixa, fase5ExtraPorFaixa, inglesExtraPorFaixa, formasExtraPorFaixa, numerosExtraPorFaixa, coresExtraPorFaixa, alfabetoExtraPorFaixa, colorirExtraPorFaixa, silabasExtraPorFaixa } from '../data/atividadesExtra'
import { colorirExtra2PorFaixa } from '../data/colorirExtra2'
import { musicaExtraPorFaixa } from '../data/musicaExtra'

export function useAtividades(faixaEtaria) {
  const [atividades, setAtividades] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!faixaEtaria) return

    const f = faixaEtaria
    const base = [
      ...(atividadesPorFaixa[f]       || atividadesPorFaixa.construtores),
      ...(atividadesExtraPorFaixa[f]  || []),
      ...(fase2PorFaixa[f]            || fase2PorFaixa.construtores),
      ...(fase2ExtraPorFaixa[f]       || []),
      ...(fase3PorFaixa[f]            || []),
      ...(fase3ExtraPorFaixa[f]       || []),
      ...(fase4ExtraPorFaixa[f]       || []),
      ...(fase5ExtraPorFaixa[f]       || []),
      ...(inglesExtraPorFaixa[f]      || []),
      ...(formasExtraPorFaixa[f]      || []),
      ...(numerosExtraPorFaixa[f]     || []),
      ...(coresExtraPorFaixa[f]       || []),
      ...(alfabetoExtraPorFaixa[f]    || []),
      ...(colorirExtraPorFaixa[f]     || []),
      ...(colorirExtra2PorFaixa[f]    || []),
      ...(musicaExtraPorFaixa[f]      || []),
      ...(silabasExtraPorFaixa[f]     || []),
    ]

    supabase
      .from('ns_atividades')
      .select('*')
      .eq('faixa_etaria', faixaEtaria)
      .eq('ativo', true)
      .order('fase',  { ascending: true })
      .order('ordem', { ascending: true })
      .then(({ data }) => {
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
      })
  }, [faixaEtaria])

  return { atividades, loading }
}
