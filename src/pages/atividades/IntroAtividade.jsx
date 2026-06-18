import '../../styles/crianca.css'

export default function IntroAtividade({ atividade, onComecar, onVoltar }) {
  return (
    <div style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '24px' }}>

        <div className="header-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onVoltar} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '34px', height: '34px', color: 'white', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900' }}>{atividade.titulo}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>
              {atividade.habilidade} • ~{atividade.tempo_estimado} min
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', color: 'white', fontSize: '12px', fontWeight: '700' }}>+{atividade.xp_reward} XP</div>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>

          {/* Hero emoji */}
          <div className="card-white" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '72px', marginBottom: '12px', lineHeight: 1 }}>{atividade.emoji}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f0a1e', marginBottom: '6px' }}>
              {atividade.titulo}
            </h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f3f0ff', borderRadius: '20px', padding: '4px 12px' }}>
              <span style={{ fontSize: '11px', color: '#7C3AED', fontWeight: '700' }}>{atividade.habilidade}</span>
            </div>
          </div>

          {/* Historinha */}
          <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '16px', padding: '20px', border: '1.5px solid #fcd34d' }}>
            <div style={{ fontSize: '11px', color: '#92400e', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>📖 HISTÓRIA</div>
            <p style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
              {atividade.historinha}
            </p>
          </div>

          {/* Recompensas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              ['⏱', '~' + atividade.tempo_estimado + ' min', 'Duração'],
              ['⭐', '+' + atividade.xp_reward + ' XP', 'Experiência'],
              ['💰', '+' + atividade.coins_reward, 'NeuralCoins'],
            ].map(([icon, val, label]) => (
              <div key={label} className="card-white" style={{ padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#0f0a1e' }}>{val}</div>
                <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <button onClick={onComecar} className="btn-purple" style={{ padding: '16px', fontSize: '16px', fontWeight: '900' }}>
            Começar Atividade →
          </button>
        </div>
      </div>
    </div>
  )
}
