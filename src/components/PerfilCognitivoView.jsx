import { dimensoes, interpretacao, rotulosChave, gerarSintese } from '../data/perfilInterpretacao'

// Renderiza o perfil cognitivo detalhado de uma criança.
// props: perfil (objeto salvo em children.perfil_cognitivo), nome (string)
export default function PerfilCognitivoView({ perfil, nome }) {
  if (!perfil) return null

  const dataResposta = perfil.respondido_em
    ? new Date(perfil.respondido_em).toLocaleDateString('pt-BR')
    : null

  return (
    <div>
      {/* SÍNTESE */}
      <div style={{ background: 'linear-gradient(135deg,#7C3AED,#a78bfa)', borderRadius: '18px', padding: '22px 24px', marginBottom: '24px', color: 'white' }}>
        <div style={{ fontSize: '13px', fontWeight: '800', opacity: 0.85, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          🧠 Perfil Cognitivo de {nome}
        </div>
        <p style={{ fontSize: '15px', lineHeight: 1.6, fontWeight: '500' }}>
          {gerarSintese(perfil, nome)}
        </p>
        {dataResposta && (
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '12px' }}>Respondido em {dataResposta}</div>
        )}
      </div>

      {/* DIMENSÕES */}
      {dimensoes.map(dim => (
        <div key={dim.titulo} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '18px' }}>{dim.emoji}</span>
            <h3 style={{ fontSize: '15px', fontWeight: '900', color: dim.cor }}>{dim.titulo}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dim.chaves.map(chave => {
              const valor = perfil[chave]
              const info = interpretacao[chave]?.[valor]
              if (!info) return null
              return (
                <div key={chave} style={{ background: 'white', border: `1.5px solid ${dim.cor}25`, borderRadius: '14px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' }}>
                    {rotulosChave[chave]}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f0a1e', marginBottom: '6px' }}>
                    {info.titulo}
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.55, marginBottom: '10px' }}>
                    {info.descricao}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: `${dim.cor}10`, borderRadius: '10px', padding: '10px 12px' }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
                    <span style={{ fontSize: '12.5px', color: dim.cor, fontWeight: '600', lineHeight: 1.5 }}>{info.dica}</span>
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
