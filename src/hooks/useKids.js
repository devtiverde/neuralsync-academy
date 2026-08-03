import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { kidsData } from '../data/kidsData'
import { mesclarKids } from '../lib/kidsMerge'

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
        // Começa pelo conteúdo local para que categoria sem linha no banco continue acessível;
        // a linha do banco sobrescreve campo a campo. O porquê está em `src/lib/kidsMerge.js`.
        setData(mesclarKids(kidsData, rows))
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
