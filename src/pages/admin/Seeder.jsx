import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { kidsData } from '../../data/kidsData'
import { atividadesPorFaixa, fase2PorFaixa, fase3PorFaixa } from '../../data/atividadesData'

const SENHA = 'neuralsync2026'

function extrairDados(act) {
  const campos = ['id','tipo','titulo','descricao','emoji','habilidade','xp_reward','coins_reward','tempo_estimado','historinha']
  const dados = {}
  Object.keys(act).forEach(k => { if (!campos.includes(k)) dados[k] = act[k] })
  return dados
}

export default function Seeder() {
  const [senha, setSenha]       = useState('')
  const [autenticado, setAuth]  = useState(false)
  const [log, setLog]           = useState([])
  const [rodando, setRodando]   = useState(false)
  const [concluido, setConcluido] = useState(false)

  const addLog = (msg) => setLog(prev => [...prev, msg])

  async function rodarSeed() {
    setRodando(true)
    setLog([])

    // ── Kids ──────────────────────────────────
    addLog('📚 Inserindo categorias Kids...')
    const kidsRows = Object.entries(kidsData).map(([id, cat], i) => ({
      id,
      titulo:     cat.titulo,
      emoji:      cat.emoji,
      cor:        cat.cor,
      introducao: cat.introducao,
      secoes:     cat.secoes,
      fatos:      cat.fatos,
      quiz:       cat.quiz,
      ordem:      i,
      ativo:      true,
    }))
    const { error: errKids } = await supabase.from('ns_kids').upsert(kidsRows)
    if (errKids) addLog(`❌ Erro Kids: ${errKids.message}`)
    else addLog(`✅ ${kidsRows.length} categorias Kids inseridas`)

    // ── Atividades ────────────────────────────
    addLog('🎮 Inserindo atividades...')
    const faixas = ['exploradores', 'construtores', 'criadores', 'inventores']
    let total = 0

    for (const faixa of faixas) {
      const fase1 = (atividadesPorFaixa[faixa] || []).map((a, i) => ({
        id: a.id, tipo: a.tipo, titulo: a.titulo, descricao: a.descricao,
        emoji: a.emoji, habilidade: a.habilidade, xp_reward: a.xp_reward,
        coins_reward: a.coins_reward, tempo_estimado: a.tempo_estimado,
        faixa_etaria: faixa, fase: 1, historinha: a.historinha,
        dados: extrairDados(a), ordem: i, ativo: true,
      }))
      const fase2 = (fase2PorFaixa[faixa] || []).map((a, i) => ({
        id: a.id, tipo: a.tipo, titulo: a.titulo, descricao: a.descricao,
        emoji: a.emoji, habilidade: a.habilidade, xp_reward: a.xp_reward,
        coins_reward: a.coins_reward, tempo_estimado: a.tempo_estimado,
        faixa_etaria: faixa, fase: 2, historinha: a.historinha,
        dados: extrairDados(a), ordem: i, ativo: true,
      }))
      const fase3 = (fase3PorFaixa[faixa] || []).map((a, i) => ({
        id: a.id, tipo: a.tipo, titulo: a.titulo, descricao: a.descricao,
        emoji: a.emoji, habilidade: a.habilidade, xp_reward: a.xp_reward,
        coins_reward: a.coins_reward, tempo_estimado: a.tempo_estimado,
        faixa_etaria: faixa, fase: 3, historinha: a.historinha,
        dados: extrairDados(a), ordem: i, ativo: true,
      }))

      const rows = [...fase1, ...fase2, ...fase3]
      const { error } = await supabase.from('ns_atividades').upsert(rows)
      if (error) addLog(`❌ Erro ${faixa}: ${error.message}`)
      else { addLog(`✅ ${faixa}: ${rows.length} atividades`); total += rows.length }
    }

    addLog(`\n🎉 Concluído! ${total} atividades + ${kidsRows.length} Kids no banco.`)
    addLog('Agora todo novo conteúdo pode ser adicionado direto no Supabase sem redeploy.')
    setRodando(false)
    setConcluido(true)
  }

  if (!autenticado) return (
    <div style={{background:'#0f0a1e',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'20px',padding:'32px',width:'320px',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>🌱</div>
        <h2 style={{color:'white',marginBottom:'8px',fontWeight:'900'}}>Admin Seeder</h2>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginBottom:'24px'}}>Popula o banco com o conteúdo padrão</p>
        <input
          type="password" placeholder="Senha admin" value={senha}
          onChange={e => setSenha(e.target.value)}
          style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.1)',color:'white',fontFamily:'inherit',fontSize:'14px',boxSizing:'border-box',marginBottom:'12px'}}
        />
        <button
          onClick={() => senha === SENHA ? setAuth(true) : alert('Senha incorreta')}
          style={{width:'100%',background:'linear-gradient(135deg,#7C3AED,#6d28d9)',border:'none',borderRadius:'10px',padding:'13px',color:'white',fontWeight:'700',cursor:'pointer',fontSize:'15px'}}
        >Entrar</button>
      </div>
    </div>
  )

  return (
    <div style={{background:'#0f0a1e',minHeight:'100vh',padding:'32px',fontFamily:'Plus Jakarta Sans, sans-serif'}}>
      <div style={{maxWidth:'600px',margin:'0 auto'}}>
        <h1 style={{color:'white',fontWeight:'900',marginBottom:'8px'}}>🌱 Content Seeder</h1>
        <p style={{color:'rgba(255,255,255,0.5)',marginBottom:'24px',fontSize:'14px'}}>
          Insere todo o conteúdo padrão no Supabase. Execute apenas uma vez. Pode re-executar para atualizar.
        </p>

        {!rodando && !concluido && (
          <button
            onClick={rodarSeed}
            style={{background:'linear-gradient(135deg,#10b981,#059669)',border:'none',borderRadius:'12px',padding:'14px 28px',color:'white',fontWeight:'700',fontSize:'15px',cursor:'pointer',marginBottom:'24px'}}
          >▶ Executar Seeder</button>
        )}

        {rodando && (
          <div style={{color:'#a78bfa',marginBottom:'24px',fontSize:'14px'}}>⏳ Executando...</div>
        )}

        {log.length > 0 && (
          <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'12px',padding:'20px',fontFamily:'monospace',fontSize:'13px',lineHeight:'1.8'}}>
            {log.map((line, i) => (
              <div key={i} style={{color: line.startsWith('❌') ? '#f87171' : line.startsWith('✅') ? '#34d399' : line.startsWith('🎉') ? '#fbbf24' : 'rgba(255,255,255,0.7)'}}>{line}</div>
            ))}
          </div>
        )}

        {concluido && (
          <div style={{marginTop:'24px',background:'rgba(16,185,129,0.1)',border:'1px solid #10b981',borderRadius:'12px',padding:'16px',color:'#34d399',fontSize:'14px'}}>
            ✅ Seeder concluído com sucesso. O banco está populado e a plataforma já lê do Supabase.
          </div>
        )}
      </div>
    </div>
  )
}
