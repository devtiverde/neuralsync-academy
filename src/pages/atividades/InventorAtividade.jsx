import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import { avaliarInvento, getFaixa } from '../../lib/claude'
import '../../styles/crianca.css'

export default function InventorAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade

  const [iniciou, setIniciou] = useState(false)
  const [fase, setFase] = useState('escrevendo') // escrevendo | avaliando | resultado
  const [ideia, setIdeia] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erroAPI, setErroAPI] = useState(null)

  useEffect(() => {
    if (!atividade) navigate('/trilha')
  }, [])

  if (!atividade) return null
  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate('/trilha')} />

  const faixa = getFaixa(atividade.id)
  const minChars = 20
  const pronto = ideia.trim().length >= minChars

  async function avaliar() {
    if (!pronto) return
    setFase('avaliando')
    setErroAPI(null)
    try {
      const data = await avaliarInvento(ideia, faixa)
      setResultado(data)
      setFase('resultado')
    } catch {
      setErroAPI('Não foi possível avaliar sua invenção. Verifique sua conexão.')
      setFase('escrevendo')
    }
  }

  // ── FASE: AVALIANDO
  if (fase === 'avaliando') {
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{`@keyframes ns-spin{to{transform:rotate(360deg)}} @keyframes ns-pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        <div style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '64px', animation: 'ns-spin 2s linear infinite', display: 'inline-block', marginBottom: '20px' }}>💡</div>
          <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f0a1e', marginBottom: '8px' }}>Analisando sua invenção...</h3>
          <p style={{ color: '#6b7280', fontSize: '13px', animation: 'ns-pulse 1.5s ease-in-out infinite' }}>A IA está preparando seu Relatório de Inventor!</p>
        </div>
      </div>
    )
  }

  // ── FASE: RESULTADO
  if (fase === 'resultado' && resultado) {
    const xpGanho = resultado.xp_bonus || atividade.xp_reward
    const coinsGanho = Math.round(xpGanho * 0.8)
    const scores = resultado.pontuacao || {}
    return (
      <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
        <div className="page-wrapper" style={{ paddingBottom: '24px' }}>
          <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate('/trilha')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>Relatório do Inventor</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Avaliado pela IA 🏆</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{xpGanho} XP</div>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div style={{ background: 'linear-gradient(135deg, #fef9c3, #fef3c7)', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '2px solid #fbbf24' }}>
              <div style={{ fontSize: '11px', color: '#92400e', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>🏅 CERTIFICADO DE INVENÇÃO</div>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>💡</div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#78350f', marginBottom: '8px' }}>{resultado.titulo}</h3>
              <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.5, margin: 0 }}>{resultado.resumo}</p>
            </div>

            <div className="card-white" style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>📊 AVALIAÇÃO</div>
              {[
                ['🎨 Criatividade', scores.criatividade || 0, '#7C3AED'],
                ['⚙️ Utilidade',    scores.utilidade    || 0, '#10b981'],
                ['🔧 Viabilidade',  scores.viabilidade  || 0, '#3b82f6'],
              ].map(([label, val, cor]) => (
                <div key={label} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#374151' }}>{label}</span>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: cor }}>{val}%</span>
                  </div>
                  <div style={{ background: '#f3f4f6', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ background: cor, height: '100%', width: val + '%', borderRadius: '99px' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="card-white" style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>✅ PONTOS FORTES</div>
              {(resultado.pontos_fortes || []).map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#374151', fontWeight: '500', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0 }}>⭐</span><span>{p}</span>
                </div>
              ))}
            </div>

            <div className="card-white" style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#F07A20', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>🚀 COMO MELHORAR</div>
              {(resultado.sugestoes || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#374151', fontWeight: '500', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0 }}>💡</span><span>{s}</span>
                </div>
              ))}
            </div>

            {resultado.inspiracao && (
              <div style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', borderRadius: '14px', padding: '14px 16px', border: '1.5px solid #c4b5fd' }}>
                <div style={{ fontSize: '10px', color: '#7C3AED', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>🌟 INSPIRAÇÃO</div>
                <p style={{ fontSize: '13px', color: '#4c1d95', lineHeight: 1.5, margin: 0, fontWeight: '500' }}>{resultado.inspiracao}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[['+' + xpGanho, 'XP ganho', '#7C3AED'], ['+' + coinsGanho + ' 💰', 'Coins', '#F07A20']].map(([v, l, c]) => (
                <div key={l} className="card-white" style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: '900', color: c }}>{v}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setFase('escrevendo'); setIdeia(''); setResultado(null) }} style={{ flex: 1, background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '13px', color: '#0f0a1e', cursor: 'pointer', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>💡 Nova invenção</button>
              <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo } })} className="btn-purple" style={{ flex: 1 }}>Concluir ✓</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── FASE: ESCREVENDO
  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ paddingBottom: '24px' }}>
        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate('/trilha')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>{atividade.titulo}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Desafio de Invenção com IA 💡</p>
          </div>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card-white" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '44px', marginBottom: '10px' }}>💡</div>
            <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#0f0a1e', marginBottom: '8px' }}>Qual é a sua invenção?</h3>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
              Descreva sua ideia! Um aparelho, um aplicativo, uma solução para algum problema do mundo.
            </p>
          </div>

          <div className="card-white" style={{ padding: '16px' }}>
            <textarea
              value={ideia}
              onChange={e => setIdeia(e.target.value)}
              placeholder="Ex: Quero inventar óculos que traduzem idiomas em tempo real, para que qualquer pessoa possa entender qualquer pessoa no mundo..."
              style={{
                width: '100%', minHeight: '140px', border: '1.5px solid #e5e7eb',
                borderRadius: '12px', padding: '12px', fontSize: '14px',
                fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.6,
                color: '#0f0a1e', resize: 'vertical', outline: 'none', boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#9ca3af' }}>
              <span>{pronto ? '✅ Pronto para avaliar!' : `✏️ Faltam ${minChars - ideia.trim().length} caracteres...`}</span>
              <span>{ideia.length} chars</span>
            </div>
          </div>

          {atividade.inspiracoes?.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>💡 Precisa de inspiração?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {atividade.inspiracoes.map((insp, i) => (
                  <button key={i} onClick={() => setIdeia(insp)} style={{
                    background: 'white', border: '1px solid #e5e7eb', borderRadius: '10px',
                    padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
                    fontSize: '13px', color: '#374151', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '500',
                  }}>
                    💡 {insp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {erroAPI && (
            <div style={{ background: '#fef2f2', border: '1px solid #ef4444', borderRadius: '10px', padding: '12px', color: '#991b1b', fontSize: '13px', textAlign: 'center' }}>
              ⚠️ {erroAPI}
            </div>
          )}

          <button onClick={avaliar} disabled={!pronto} className="btn-purple" style={{ padding: '15px', fontSize: '15px', opacity: pronto ? 1 : 0.5, cursor: pronto ? 'pointer' : 'not-allowed' }}>
            🤖 Avaliar minha invenção →
          </button>
        </div>
      </div>
    </div>
  )
}
