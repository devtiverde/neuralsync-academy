import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { useAtividades } from '../../hooks/useAtividades'
import { tipoConfig } from '../../data/atividadesData'
import { getTrilhaSemanal, getTemaAtual, customizarDia, isDiaConcluido, getDiaHoje } from '../../lib/trilhaSemanal'
import { temas } from '../../data/temasData'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

const DIAS = ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

export default function TrilhaPai() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [children, setChildren] = useState([])
  const [childSel, setChildSel] = useState(null)
  const [trilha, setTrilha] = useState(null)
  const [temaObj, setTemaObj] = useState(null)
  const [modal, setModal] = useState(null) // { diaIdx, tipo }
  const [saved, setSaved] = useState(false)

  const { atividades } = useAtividades(childSel?.faixa_etaria)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    supabase.from('children').select('*').eq('parent_id', user.id).then(({ data }) => {
      if (data?.length) { setChildren(data); setChildSel(data[0]) }
    })
  }, [user])

  useEffect(() => {
    if (!childSel || !atividades.length) return
    const tema = getTemaAtual()
    const t = temas.find(t => t.id === tema.id) || tema
    setTemaObj(t)
    setTrilha(getTrilhaSemanal(atividades, childSel.id, childSel.faixa_etaria))
  }, [childSel, atividades])

  function trocarAtividade(diaIdx, novaAt) {
    const nova = customizarDia(childSel.id, diaIdx, novaAt.id, novaAt.tipo, childSel.faixa_etaria)
    if (nova) { setTrilha({ ...nova }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
    setModal(null)
  }

  const diaHoje = getDiaHoje()
  const tiposDisponiveis = trilha?.dias?.map(d => d.tipo) || []

  return (
    <LayoutPai>
      <div className="pai-content" style={{ paddingTop: '28px', paddingBottom: '40px' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#0f0a1e', marginBottom: '4px' }}>🗓️ Trilha Semanal</h1>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>Veja e personalize as atividades da semana de cada filho.</p>
        </div>

        {/* Seletor de filho */}
        {children.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {children.map(c => (
              <button key={c.id} onClick={() => setChildSel(c)} style={{
                padding: '8px 18px', borderRadius: '99px', border: `2px solid ${childSel?.id === c.id ? '#7C3AED' : '#e5e7eb'}`,
                background: childSel?.id === c.id ? '#7C3AED' : 'white',
                color: childSel?.id === c.id ? 'white' : '#374151',
                fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>{c.nome}</button>
            ))}
          </div>
        )}

        {saved && (
          <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '10px', padding: '10px 16px', color: '#065f46', fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>
            ✅ Trilha personalizada com sucesso!
          </div>
        )}

        {/* Tema da semana */}
        {temaObj && (
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', border: `1px solid ${temaObj.cor}30` }}>
            <div style={{ background: temaObj.banner, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '32px' }}>{temaObj.emoji}</span>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Tema desta semana</div>
                <div style={{ color: 'white', fontWeight: '900', fontSize: '18px' }}>{temaObj.nome}</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '2px' }}>{temaObj.descricao}</div>
              </div>
            </div>
          </div>
        )}

        {/* Grid dos 5 dias */}
        {trilha && childSel && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {trilha.dias.map((diaItem, idx) => {
              const at = atividades.find(a => a.id === diaItem.atividadeId)
              const tc = tipoConfig[diaItem.tipo] || { icon: '🎮', label: diaItem.tipo, cor: '#6b7280' }
              const feito = isDiaConcluido(diaItem.atividadeId, childSel.id)
              const eHoje = diaHoje === diaItem.dia
              return (
                <div key={idx} className="pai-card" style={{
                  border: `2px solid ${eHoje ? '#7C3AED' : feito ? '#10b981' : '#e5e7eb'}`,
                  background: feito ? '#f0fdf4' : eHoje ? '#faf5ff' : 'white',
                  position: 'relative',
                }}>
                  {eHoje && <div style={{ position: 'absolute', top: '-10px', left: '12px', background: '#7C3AED', color: 'white', fontSize: '9px', fontWeight: '900', padding: '2px 10px', borderRadius: '99px' }}>HOJE</div>}
                  {diaItem.customizado && <div style={{ position: 'absolute', top: '-10px', right: '12px', background: '#f59e0b', color: 'white', fontSize: '9px', fontWeight: '900', padding: '2px 10px', borderRadius: '99px' }}>PERSONALIZADO</div>}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: eHoje ? '#7C3AED' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{DIAS[diaItem.dia]}</span>
                    <span style={{ fontSize: '16px' }}>{feito ? '✅' : '⬜'}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>{at ? at.emoji : tc.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '800', fontSize: '13px', color: '#111827', marginBottom: '3px' }}>{at ? at.titulo : '—'}</div>
                      <div style={{ fontSize: '10px', background: tc.cor + '20', color: tc.cor, padding: '2px 7px', borderRadius: '99px', fontWeight: '700', display: 'inline-block' }}>
                        {tc.icon} {tc.label}
                      </div>
                    </div>
                  </div>

                  {at && (
                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px', lineHeight: 1.4 }}>
                      ⏱ ~{at.tempo_estimado}min &nbsp;•&nbsp; +{at.xp_reward} XP
                    </div>
                  )}

                  {!feito && (
                    <button onClick={() => setModal({ diaIdx: idx, tipo: diaItem.tipo })} style={{
                      width: '100%', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px',
                      padding: '7px', fontSize: '11px', fontWeight: '700', color: '#374151', cursor: 'pointer',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}>
                      🔄 Trocar atividade
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {!trilha && !children.length && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👶</div>
            <p style={{ fontWeight: '600' }}>Nenhum filho cadastrado ainda.</p>
          </div>
        )}
      </div>

      {/* Modal de troca */}
      {modal !== null && (
        <div onClick={() => setModal(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'white', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '560px',
            maxHeight: '80vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: '900', fontSize: '16px', color: '#111827' }}>Trocar Atividade</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                  {DIAS[trilha.dias[modal.diaIdx]?.dia]} — tipo atual: {tipoConfig[modal.tipo]?.label || modal.tipo}
                </div>
              </div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>

            {/* Todas as atividades disponíveis */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {atividades.map(at => {
                const tc = tipoConfig[at.tipo] || { icon: '🎮', label: at.tipo, cor: '#6b7280' }
                const atual = trilha.dias[modal.diaIdx]?.atividadeId === at.id
                return (
                  <div key={at.id} onClick={() => trocarAtividade(modal.diaIdx, at)} style={{
                    display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 14px', borderRadius: '12px',
                    border: `2px solid ${atual ? '#7C3AED' : '#e5e7eb'}`,
                    background: atual ? '#faf5ff' : 'white',
                    cursor: 'pointer', transition: 'all 0.1s',
                  }}
                    onMouseOver={e => { if (!atual) e.currentTarget.style.borderColor = '#c4b5fd' }}
                    onMouseOut={e => { if (!atual) e.currentTarget.style.borderColor = '#e5e7eb' }}
                  >
                    <div style={{ fontSize: '24px', flexShrink: 0 }}>{at.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: '700', fontSize: '13px', color: '#111827' }}>{at.titulo}</div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '3px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', background: tc.cor + '20', color: tc.cor, padding: '1px 7px', borderRadius: '99px', fontWeight: '700' }}>{tc.icon} {tc.label}</span>
                        <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '600' }}>⏱ {at.tempo_estimado}min</span>
                        <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700' }}>+{at.xp_reward} XP</span>
                      </div>
                    </div>
                    {atual && <span style={{ color: '#7C3AED', fontWeight: '800', fontSize: '12px', flexShrink: 0 }}>✓ Atual</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </LayoutPai>
  )
}
