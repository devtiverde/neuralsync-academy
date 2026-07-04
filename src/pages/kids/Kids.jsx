import { useNavigate } from 'react-router-dom'
import { tipoConfig } from '../../data/atividadesData'
import LayoutCrianca from '../../components/LayoutCrianca'
import '../../styles/crianca.css'

const categorias = [
  { id: 'dinossauros',   emoji: '🦕', nome: 'Dinossauros',    cor: '#10b981' },
  { id: 'corpo_humano',  emoji: '🧬', nome: 'Corpo Humano',   cor: '#7C3AED' },
  { id: 'animais',       emoji: '🐘', nome: 'Animais',        cor: '#F07A20' },
  { id: 'planeta_terra', emoji: '🌍', nome: 'Planeta Terra',  cor: '#3b82f6' },
  { id: 'frutas',        emoji: '🍓', nome: 'Frutas',         cor: '#e11d48' },
  { id: 'formas_cores',  emoji: '🔷', nome: 'Formas e Cores', cor: '#7c3aed' },
  { id: 'fisica',        emoji: '⚛️', nome: 'Física',         cor: '#4f46e5' },
  { id: 'esportes',      emoji: '⚽', nome: 'Esportes',       cor: '#ef4444' },
  { id: 'coracao',       emoji: '❤️', nome: 'O Coração',      cor: '#ef4444' },
  { id: 'golfinhos',     emoji: '🐬', nome: 'Golfinhos',      cor: '#3b82f6' },
  { id: 'vulcoes',       emoji: '🌋', nome: 'Vulcões',        cor: '#F07A20' },
  { id: 'tecnologia',    emoji: '💻', nome: 'Tecnologia',     cor: '#6d28d9' },
  { id: 'matematica',    emoji: '🔢', nome: 'Matemática',     cor: '#0891b2' },
  { id: 'arte',          emoji: '🎨', nome: 'Arte e Cultura', cor: '#ec4899' },
  { id: 'historia_brasil',emoji: '🇧🇷',nome: 'História do Brasil', cor: '#16a34a' },
  { id: 'profissoes',    emoji: '👩‍⚕️', nome: 'Profissões',    cor: '#0891b2' },
  { id: 'transporte',    emoji: '🚗', nome: 'Transporte',     cor: '#06b6d4' },
  { id: 'filosofia',     emoji: '🧩', nome: 'Filosofia e Ética', cor: '#7c3aed' },
]

const maisAssistidos = [
  { titulo: 'T-Rex: O Rei dos Dinossauros',  emoji: '🦕', cor: '#10b981', rota: '/kids/dinossauros' },
  { titulo: 'Como Funciona o Coração',        emoji: '❤️', cor: '#ef4444', rota: '/kids/coracao'     },
  { titulo: 'Golfinhos: Os Gênios do Mar',    emoji: '🐬', cor: '#3b82f6', rota: '/kids/golfinhos'   },
  { titulo: 'Vulcões: Força da Natureza',     emoji: '🌋', cor: '#F07A20', rota: '/kids/vulcoes'     },
]

export default function Kids() {
  const navigate = useNavigate()
  const child = (() => { try { return JSON.parse(localStorage.getItem('ns_active_child') || 'null') } catch { return null } })()

  return (
    <LayoutCrianca child={child}>
      <div className="ns-pad">
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '900', marginBottom: '4px', letterSpacing: '-0.5px' }}>NeuralSync Kids 🎬</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Aprenda coisas incríveis</p>
        </div>

        {/* ── ATIVIDADES ── */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontWeight: '800', fontSize: '16px', color: 'white' }}>🎮 Atividades</h3>
            <button onClick={() => navigate('/trilha')} style={{ background: 'none', border: 'none', color: '#a78bfa', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Ver trilha →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
            {['quiz','memoria','sequencia','labirinto','robo','padrao','quizia','inventor','blocos'].map(tipo => {
              const cfg = tipoConfig[tipo]
              const isIA = ['quizia','inventor','blocos'].includes(tipo)
              return (
                <button key={tipo} onClick={() => navigate('/trilha', {state: {filtroTipo: tipo}})} style={{
                  background: isIA ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.08)',
                  border: isIA ? '1.5px solid rgba(168,85,247,0.4)' : '1.5px solid rgba(255,255,255,0.12)',
                  borderRadius: '16px', padding: '14px 6px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
                }}>
                  {isIA && (
                    <span className="badge-ai" style={{ position: 'absolute', top: '6px', right: '6px' }}>IA</span>
                  )}
                  <div style={{ fontSize: '26px', lineHeight: 1 }}>{cfg.icon}</div>
                  <div style={{ fontSize: '10px', fontWeight: '800', color: cfg.cor, textAlign: 'center', lineHeight: 1.2 }}>{cfg.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MAIS POPULARES ── */}
        <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '14px', color: 'white' }}>🔥 Mais populares</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {maisAssistidos.map((item, i) => (
            <div key={i} onClick={() => navigate(item.rota)} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '18px', padding: '20px 16px', cursor: 'pointer', textAlign: 'center',
              position: 'relative', overflow: 'hidden', transition: 'all 0.15s',
            }}>
              {i === 0 && (
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#F07A20', color: 'white', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '20px' }}>#1</div>
              )}
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{item.emoji}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginBottom: '8px', lineHeight: '1.3' }}>{item.titulo}</div>
              <div style={{ display: 'inline-block', background: item.cor + '28', color: item.cor, borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: '700' }}>
                Artigo + Quiz →
              </div>
            </div>
          ))}
        </div>

        {/* ── EXPLORAR CATEGORIAS ── */}
        <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '14px', color: 'white' }}>Explorar categorias</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categorias.map(cat => (
            <div key={cat.id} onClick={() => navigate('/kids/' + cat.id)} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', padding: '16px 18px',
              display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
              borderLeft: '4px solid ' + cat.cor, transition: 'all 0.15s',
            }}>
              <div style={{ fontSize: '32px' }}>{cat.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'white', marginBottom: '2px' }}>{cat.nome}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Artigo + Quiz • 3 perguntas</div>
              </div>
              <div style={{ background: cat.cor + '28', color: cat.cor, borderRadius: '8px', padding: '4px 10px', fontSize: '12px', fontWeight: '700' }}>+45 XP</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '16px' }}>›</div>
            </div>
          ))}
        </div>

      </div>
      </div>
    </LayoutCrianca>
  )
}
