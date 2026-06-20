import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { atividadesPorFaixa, fase2PorFaixa, fase3PorFaixa } from '../data/atividadesData'

export function useAtividades(faixaEtaria) {
  const [atividades, setAtividades] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!faixaEtaria) return

    supabase
      .from('ns_atividades')
      .select('*')
      .eq('faixa_etaria', faixaEtaria)
      .eq('ativo', true)
      .order('fase',  { ascending: true })
      .order('ordem', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setAtividades(data.map(row => ({
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
          })))
        } else {
          // fallback para arquivos JS enquanto banco estiver vazio
          const f = faixaEtaria
          setAtividades([
            ...(atividadesPorFaixa[f] || atividadesPorFaixa.construtores),
            ...(fase2PorFaixa[f]     || fase2PorFaixa.construtores),
            ...(fase3PorFaixa[f]     || []),
          ])
        }
        setLoading(false)
      })
  }, [faixaEtaria])

  return { atividades, loading }
}
