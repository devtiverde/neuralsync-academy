import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('[NeuralSync] VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórias.')
}

// Marca o fluxo de "definir senha" ANTES de criar o cliente.
//
// O supabase-js lê o token da URL e LIMPA o hash durante a própria inicialização,
// que acontece na importação deste módulo — antes de o React montar. Quem só
// escutasse o evento `PASSWORD_RECOVERY` chegaria tarde demais e a pessoa seguiria
// para a navegação comum (foi o que jogou o cliente em /planos ao clicar no link
// do e-mail). Guardar a marca aqui é a única forma de não perder essa informação.
if (typeof window !== 'undefined') {
  const alvo = window.location.hash + window.location.search
  if (alvo.includes('type=recovery') || alvo.includes('type=invite')) {
    try { sessionStorage.setItem('ns_fluxo_definir_senha', '1') } catch { /* modo privado */ }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)