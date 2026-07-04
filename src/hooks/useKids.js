import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { kidsData } from '../data/kidsData'

export function useKids() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('ns_kids')
      .select('*')
      .eq('ativo', true)
      .order('ordem', { ascending: true })
      .then(({ data: rows }) => {
        // Start with local kidsData so categories not yet in Supabase remain accessible.
        // Supabase rows override local entries when the id matches.
        const merged = { ...kidsData }
        if (rows && rows.length > 0) {
          rows.forEach(row => {
            merged[row.id] = {
              titulo:     row.titulo,
              emoji:      row.emoji,
              cor:        row.cor,
              introducao: row.introducao,
              secoes:     row.secoes,
              fatos:      row.fatos,
              quiz:       row.quiz,
              video_id:   row.video_id || null,
            }
          })
        }
        setData(merged)
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
