import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadSubscription = async (userId) => {
    const { data } = await supabase
      .from('users')
      .select('plano, plano_status, plano_ativo_ate, filhos_limite, kiwify_subscriber_id')
      .eq('id', userId)
      .single()
    setSubscription(data || null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadSubscription(session.user.id)
      setLoading(false)
    })

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadSubscription(session.user.id)
      } else {
        setSubscription(null)
      }
    })

    return () => authListener.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email, password, nome) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (!error && data.user) {
      const emailLower = email.toLowerCase()

      const { data: pending } = await supabase
        .from('pending_subscriptions')
        .select('*')
        .eq('email', emailLower)
        .single()

      if (pending) {
        await supabase.from('users').insert({
          id: data.user.id, email: emailLower, nome, tipo: 'pai',
          plano: pending.plano,
          plano_status: 'ativo',
          plano_ativo_ate: pending.plano_ativo_ate,
          filhos_limite: pending.filhos_limite,
          kiwify_subscriber_id: pending.kiwify_subscriber_id,
        })
        await supabase.from('pending_subscriptions').delete().eq('email', emailLower)
      } else {
        await supabase.from('users').insert({
          id: data.user.id, email: emailLower, nome, tipo: 'pai',
        })
      }
    }
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSubscription(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, subscription, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
