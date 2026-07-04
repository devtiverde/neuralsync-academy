import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IntroAtividade from './IntroAtividade'
import GameShell from '../../components/GameShell'
import UpgradePremium from '../../components/UpgradePremium'
import { avaliarInvento, getFaixa } from '../../lib/claude'
import { playSound } from '../../lib/sounds'
import { getKidsLink } from '../../lib/kidsLinks'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/crianca.css'

export default function InventorAtividade() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const atividade = state?.atividade
  const { subscription, loading: authLoading } = useAuth()

  const [iniciou, setIniciou] = useState(false)
  const [fase, setFase] = useState('escrevendo')
  const [ideia, setIdeia] = useState('')
  const [resultado, setResultado] = useState(null)
  const [erroAPI, setErroAPI] = useState(null)

  useEffect(() => {
    if (!atividade) navigate(-1)
  }, [])

  if (!atividade) return null

  if (!authLoading && !(subscription?.plano === 'premium' && subscription?.plano_status === 'ativo')) {
    return <UpgradePremium
      feature="Inventor â€” Avaliação de IA"
      emoji="💡"
      descricao="Descreva sua invenção e a IA avalia sua criatividade com feedback personalizado. Disponível exclusivamente no Plano Premium."
      onVoltar={() => navigate(-1)}
    />
  }

  if (!iniciou) return <IntroAtividade atividade={atividade} onComecar={() => setIniciou(true)} onVoltar={() => navigate(-1)} refazendo={state?.refazendo} kidsLink={getKidsLink(atividade.id)} />

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
      playSound('complete')
    } catch (e) {
      setErroAPI(e.message || 'Não foi possível avaliar sua invenção. Verifique sua conexão.')
      setFase('escrevendo')
    }
  }

  if (fase === 'avaliando') {
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={50} onVoltar={() => navigate(-1)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', textAlign: 'center', gap: '20px' }}>
          <div style={{ fontSize: '80px', animation: 'ns-spin 2s linear infinite', display: 'inline-block' }}>💡</div>
          <div>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>Analisando sua invenção...</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', animation: 'ns-pulse 1.5s ease-in-out infinite' }}>A IA está preparando seu Relatório de Inventor!</p>
          </div>
        </div>
      </GameShell>
    )
  }

  if (fase === 'resultado' && resultado) {
    const xpGanho = resultado.xp_bonus || atividade.xp_reward
    const coinsGanho = Math.round(xpGanho * 0.8)
    const scores = resultado.pontuacao || {}
    return (
      <GameShell atividade={atividade} tipo={atividade.tipo} progresso={100} onVoltar={() => navigate(-1)}>
        <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', animation: 'ns-slide-up 0.4s ease' }}>

          {/* Certificate */}
          <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(251,146,60,0.15))', borderRadius: '20px', padding: '24px', textAlign: 'center', border: '2px solid rgba(249,115,22,0.4)' }}>
            <div style={{ fontSize: '11px', color: '#fdba74', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>🏅 CERTIFICADO DE INVENÇÃO</div>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>💡</div>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '900', marginBottom: '8px' }}>{resultado.titulo}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{resultado.resumo}</p>
          </div>

          {/* Scores */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>📊 AVALIAÇÃO</div>
            {[
              ['🎨 Criatividade', scores.criatividade || 0, '#f97316'],
              ['âš™ï¸ Utilidade', scores.utilidade || 0, '#10b981'],
              ['🔧 Viabilidade', scores.viabilidade || 0, '#3b82f6'],
            ].map(([label, val, cor]) => (
              <div key={label} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: cor }}>{val}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ background: cor, height: '100%', width: val + '%', borderRadius: '99px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Pontos fortes */}
          <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(16,185,129,0.25)' }}>
            <div style={{ fontSize: '11px', color: '#6ee7b7', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>✅ PONTOS FORTES</div>
            {(resultado.pontos_fortes || []).map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: '500', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0 }}>⭐</span><span>{p}</span>
              </div>
            ))}
          </div>

          {/* Sugestões */}
          <div style={{ background: 'rgba(249,115,22,0.08)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(249,115,22,0.25)' }}>
            <div style={{ fontSize: '11px', color: '#fdba74', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>🚀 COMO MELHORAR</div>
            {(resultado.sugestoes || []).map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: '500', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0 }}>💡</span><span>{s}</span>
              </div>
            ))}
          </div>

          {resultado.inspiracao && (
            <div style={{ background: 'rgba(168,85,247,0.1)', borderRadius: '14px', padding: '16px 18px', border: '1px solid rgba(168,85,247,0.3)' }}>
              <div style={{ fontSize: '11px', color: '#d8b4fe', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>ðŸŒŸ INSPIRAÇÃO</div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{resultado.inspiracao}</p>
            </div>
          )}

          {/* Rewards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['+' + xpGanho + ' XP', 'Experiência', '#f97316'], ['+' + coinsGanho + ' 💰', 'Coins', '#f59e0b']].map(([v, l, c]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: c, marginBottom: '4px' }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => { setFase('escrevendo'); setIdeia(''); setResultado(null) }} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>💡 Nova invenção</button>
            <button onClick={() => navigate('/encerramento', { state: { xp: xpGanho, coins: coinsGanho, titulo: atividade.titulo, emoji: atividade.emoji, tipo: atividade.tipo, atividade_id: atividade.id } })}
              style={{ flex: 1, background: 'linear-gradient(135deg,#f97316,#fb923c)', border: 'none', borderRadius: '12px', padding: '14px', color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 6px 20px rgba(249,115,22,0.4)' }}>
              Concluir ✓
            </button>
          </div>
        </div>
      </GameShell>
    )
  }

  // fase === 'escrevendo'
  return (
    <GameShell atividade={atividade} tipo={atividade.tipo} progresso={0} labelProgresso="Escreva sua invenção" onVoltar={() => navigate(-1)}>
      <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', animation: 'ns-slide-up 0.3s ease' }}>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '60px', marginBottom: '12px', animation: 'ns-bounce 3s ease-in-out infinite' }}>💡</div>
          <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '900', marginBottom: '8px' }}>Qual é a sua invenção?</h3>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            Descreva sua ideia! Um aparelho, aplicativo ou solução para um problema do mundo.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <textarea
            value={ideia}
            onChange={e => setIdeia(e.target.value)}
            maxLength={1000}
            placeholder="Ex: Quero inventar óculos que traduzem idiomas em tempo real, para que qualquer pessoa possa entender qualquer pessoa no mundo..."
            style={{
              width: '100%', minHeight: '160px', border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: '14px', padding: '16px', fontSize: '14px',
              fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.7,
              color: 'white', resize: 'vertical', outline: 'none', boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.06)',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: '600' }}>
            <span style={{ color: pronto ? '#6ee7b7' : 'rgba(255,255,255,0.35)' }}>
              {pronto ? '✅ Pronto para avaliar!' : `âœï¸ Faltam ${minChars - ideia.trim().length} caracteres...`}
            </span>
            <span style={{ color: ideia.length > 900 ? '#fca5a5' : 'rgba(255,255,255,0.35)' }}>{ideia.length}/1000</span>
          </div>
        </div>

        {atividade.inspiracoes?.length > 0 && (
          <div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>💡 Precisa de inspiração?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {atividade.inspiracoes.map((insp, i) => (
                <button key={i} onClick={() => setIdeia(insp)} style={{
                  background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)',
                  borderRadius: '12px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                  fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '500',
                  transition: 'background 0.2s',
                }}>
                  💡 {insp}
                </button>
              ))}
            </div>
          </div>
        )}

        {erroAPI && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '12px', padding: '14px', color: '#fca5a5', fontSize: '13px', textAlign: 'center' }}>
            âš ï¸ {erroAPI}
          </div>
        )}

        <button onClick={avaliar} disabled={!pronto} style={{
          padding: '16px', borderRadius: '16px', border: 'none', width: '100%',
          background: pronto ? 'linear-gradient(135deg,#f97316,#fb923c)' : 'rgba(255,255,255,0.1)',
          color: pronto ? 'white' : 'rgba(255,255,255,0.3)',
          fontWeight: '900', fontSize: '16px', cursor: pronto ? 'pointer' : 'not-allowed',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: pronto ? '0 8px 24px rgba(249,115,22,0.4)' : 'none',
          transition: 'all 0.2s',
        }}>
          🤖 Avaliar minha invenção →
        </button>
      </div>
    </GameShell>
  )
}

