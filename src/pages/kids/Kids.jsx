import { useNavigate } from 'react-router-dom'
import { tipoConfig } from '../../data/atividadesData'
import '../../styles/crianca.css'

const menu = [
  { icon: '🏠', label: 'Início', path: '/home-crianca' },
  { icon: '🗺️', label: 'Trilha', path: '/trilha' },
  { icon: '🎬', label: 'Kids', path: '/kids' },
  { icon: '🏆', label: 'Ranking', path: '/ranking' },
  { icon: '🏪', label: 'Loja', path: '/loja' },
  { icon: '👤', label: 'Perfil', path: '/perfil-crianca' },
]

const categorias = [
  { id: 'dinossauros',  emoji: '🦕', nome: 'Dinossauros',    cor: '#10b981' },
  { id: 'corpo_humano', emoji: '🧬', nome: 'Corpo Humano',   cor: '#7C3AED' },
  { id: 'animais',      emoji: '🐘', nome: 'Animais',        cor: '#F07A20' },
  { id: 'planeta_terra',emoji: '🌍', nome: 'Planeta Terra',  cor: '#3b82f6' },
  { id: 'esportes',     emoji: '⚽', nome: 'Esportes',       cor: '#ef4444' },
  { id: 'coracao',      emoji: '❤️', nome: 'O Coração',      cor: '#ef4444' },
  { id: 'golfinhos',    emoji: '🐬', nome: 'Golfinhos',      cor: '#3b82f6' },
  { id: 'vulcoes',      emoji: '🌋', nome: 'Vulcões',        cor: '#F07A20' },
]

const maisAssistidos = [
  { titulo: 'T-Rex: O Rei dos Dinossauros',  emoji: '🦕', cor: '#10b981', rota: '/kids/dinossauros' },
  { titulo: 'Como Funciona o Coração',        emoji: '❤️', cor: '#ef4444', rota: '/kids/coracao'     },
  { titulo: 'Golfinhos: Os Gênios do Mar',    emoji: '🐬', cor: '#3b82f6', rota: '/kids/golfinhos'   },
  { titulo: 'Vulcões: Força da Natureza',     emoji: '🌋', cor: '#F07A20', rota: '/kids/vulcoes'     },
]

export default function Kids() {
  const navigate = useNavigate()

  return (
    <div style={{background: '#e5e7eb', minHeight: '100vh'}}>
    <div className="page-wrapper" style={{paddingBottom: '90px'}}>

      <div className="header-gradient">
        <h2 style={{color: 'white', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '4px'}}>NeuralSync Kids 🎬</h2>
        <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '13px'}}>Aprenda coisas incríveis</p>
      </div>

      <div style={{padding: '16px'}}>

        {/* ── ATIVIDADES ── */}
        <div style={{marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
            <h3 style={{fontWeight: '800', fontSize: '15px', color: '#0f0a1e'}}>🎮 Atividades</h3>
            <button onClick={() => navigate('/trilha')} style={{background: 'none', border: 'none', color: '#7C3AED', fontSize: '12px', fontWeight: '700', cursor: 'pointer'}}>Ver trilha →</button>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px'}}>
            {['quiz','memoria','sequencia','labirinto','robo','padrao','quizia','inventor','blocos'].map(tipo => {
              const cfg = tipoConfig[tipo]
              const isIA = ['quizia','inventor','blocos'].includes(tipo)
              return (
                <button key={tipo} onClick={() => navigate('/trilha', {state: {filtroTipo: tipo}})} style={{
                  background: isIA ? 'linear-gradient(135deg, #faf5ff, #ede9fe)' : 'white',
                  border: isIA ? '1.5px solid #c4b5fd' : '1.5px solid #f0eeff',
                  borderRadius: '14px', padding: '12px 6px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  position: 'relative',
                }}>
                  {isIA && (
                    <span style={{position: 'absolute', top: '5px', right: '5px', background: 'linear-gradient(135deg, #7C3AED, #a855f7)', color: 'white', fontSize: '8px', fontWeight: '800', padding: '1px 4px', borderRadius: '20px'}}>IA</span>
                  )}
                  <div style={{fontSize: '24px', lineHeight: 1}}>{cfg.icon}</div>
                  <div style={{fontSize: '10px', fontWeight: '800', color: cfg.cor, textAlign: 'center', lineHeight: 1.2}}>{cfg.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MAIS ASSISTIDOS ── */}
        <h3 style={{fontWeight: '800', fontSize: '15px', marginBottom: '12px', color: '#0f0a1e'}}>🔥 Mais populares</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px'}}>
          {maisAssistidos.map((item, i) => (
            <div key={i} onClick={() => navigate(item.rota)} className="card-white" style={{padding: '14px', cursor: 'pointer', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
              {i === 0 && (
                <div style={{position: 'absolute', top: '8px', left: '8px', background: '#F07A20', color: 'white', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '20px'}}>#1</div>
              )}
              <div style={{fontSize: '34px', marginBottom: '8px'}}>{item.emoji}</div>
              <div style={{fontSize: '12px', fontWeight: '700', color: '#0f0a1e', marginBottom: '6px', lineHeight: '1.3'}}>{item.titulo}</div>
              <div style={{display: 'inline-block', background: item.cor + '18', color: item.cor, borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: '700'}}>
                Artigo + Quiz →
              </div>
            </div>
          ))}
        </div>

        {/* ── EXPLORAR CATEGORIAS ── */}
        <h3 style={{fontWeight: '800', fontSize: '15px', marginBottom: '12px', color: '#0f0a1e'}}>Explorar categorias</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {categorias.map(cat => (
            <div key={cat.id} onClick={() => navigate('/kids/' + cat.id)} className="card-white" style={{padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', borderLeft: '4px solid ' + cat.cor}}>
              <div style={{fontSize: '32px'}}>{cat.emoji}</div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: '800', fontSize: '15px', color: '#0f0a1e', marginBottom: '2px'}}>{cat.nome}</div>
                <div style={{fontSize: '12px', color: '#9ca3af'}}>Artigo + Quiz • 3 perguntas</div>
              </div>
              <div style={{background: cat.cor + '22', color: cat.cor, borderRadius: '8px', padding: '4px 10px', fontSize: '12px', fontWeight: '700'}}>+45 XP</div>
              <div style={{color: '#9ca3af', fontSize: '16px'}}>›</div>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-bottom">
        {menu.map(item => (
          <button key={item.path} className="menu-bottom-btn" onClick={() => navigate(item.path)}
            style={{color: item.path === '/kids' ? '#7C3AED' : '#9ca3af'}}>
            <span style={{fontSize: '20px'}}>{item.icon}</span>
            <span style={{fontWeight: item.path === '/kids' ? '700' : '500'}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}
