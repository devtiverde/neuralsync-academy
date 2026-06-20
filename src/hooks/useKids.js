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
        if (rows && rows.length > 0) {
          const obj = {}
          rows.forEach(row => {
            obj[row.id] = {
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
          setData(obj)
        } else {
          setData(kidsData) // fallback
        }
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
