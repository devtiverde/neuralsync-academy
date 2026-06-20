import { dimensoes, interpretacao, rotulosChave, gerarSintese } from '../data/perfilInterpretacao'

export default function PerfilCognitivoView({ perfil, nome }) {
  if (!perfil) return null

  const dataResposta = perfil.respondido_em
    ? new Date(perfil.respondido_em).toLocaleDateString('pt-BR')
    : null

  // Coleta os títulos principais de cada dimensão para o resumo
  const destaques = dimensoes.map(dim => {
    const primeiraChave = dim.chaves[0]
    const info = interpretacao[primeiraChave]?.[perfil[primeiraChave]]
    return info ? { emoji: dim.emoji, cor: dim.cor, titulo: dim.titulo, destaque: info.titulo } : null
  }).filter(Boolean)

  return (
    <div>
      {/* SÍNTESE */}
      <div style={{ background: 'linear-gradient(135deg,#7C3AED,#a78bfa)', borderRadius: '18px', padding: '22px 24px', marginBottom: '20px', color: 'white' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', opacity: 0.85, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          🧠 Perfil Cognitivo de {nome}
        </div>
        <p style={{ fontSize: '15px', lineHeight: 1.65, fontWeight: '500' }}>
          {gerarSintese(perfil, nome)}
        </p>
        {dataResposta && (
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '12px' }}>Respondido em {dataResposta}</div>
        )}
      </div>

      {/* DESTAQUES RÁPIDOS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
        {destaques.map(d => (
          <div key={d.titulo} style={{ background: 'white', border: `1.5px solid ${d.cor}25`, borderRadius: '14px', padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
              {d.emoji} {d.titulo}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: d.cor, lineHeight: 1.35 }}>
              {d.destaque}
            </div>
          </div>
        ))}
      </div>

      {/* DIVISOR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
        <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Detalhamento completo</span>
        <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
      </div>

      {/* DIMENSÕES DETALHADAS */}
      {dimensoes.map(dim => (
        <div key={dim.titulo} style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '8px 14px', background: `${dim.cor}10`, borderRadius: '10px' }}>
            <span style={{ fontSize: '18px' }}>{dim.emoji}</span>
            <h3 style={{ fontSize: '14px', fontWeight: '900', color: dim.cor }}>{dim.titulo}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dim.chaves.map(chave => {
              const valor = perfil[chave]
              const info = interpretacao[chave]?.[valor]
              if (!info) return null
              return (
                <div key={chave} style={{ background: 'white', border: `1.5px solid ${dim.cor}20`, borderRadius: '14px', overflow: 'hidden' }}>
                  {/* Cabeçalho do card */}
                  <div style={{ padding: '14px 18px 10px', borderBottom: `1px solid ${dim.cor}12` }}>
                    <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '4px' }}>
                      {rotulosChave[chave]}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#0f0a1e' }}>
                      {info.titulo}
                    </div>
                  </div>

                  {/* Descrição */}
                  <div style={{ padding: '12px 18px' }}>
                    <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.65, margin: 0 }}>
                      {info.descricao}
                    </p>
                  </div>

                  {/* Dica prática */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: `${dim.cor}10`, padding: '12px 18px', borderTop: `1px solid ${dim.cor}15` }}>
                    <span style={{ fontSize: '15px', flexShrink: 0, marginTop: '1px' }}>💡</span>
                    <div>
                      <div style={{ fontSize: '10px', color: dim.cor, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>Dica prática</div>
                      <span style={{ fontSize: '13px', color: '#374151', fontWeight: '600', lineHeight: 1.55 }}>{info.dica}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
