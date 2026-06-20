import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/pai.css'

const ferramentas = [
  { faixa: 'Exploradores (3–5 anos)', itens: ['Scratch Jr (programação visual)', 'Khan Academy Kids', 'ABCmouse', 'Duolingo ABC', 'Endless Alphabet', 'PBS Kids Games', 'Starfall', 'Teach Your Monster to Read', 'Kodable', 'Toca Boca (série completa)'] },
  { faixa: 'Construtores (6–8 anos)', itens: ['Scratch (scratch.mit.edu)', 'Prodigy Math', 'Khan Academy', 'Code.org', 'National Geographic Kids', 'Typeclub', 'Google Earth', 'BrainPOP Jr', 'Minecraft Education', 'Tynker Beginner'] },
  { faixa: 'Criadores (9–11 anos)', itens: ['Canva for Education', 'iMovie / CapCut', 'Audacity (podcast)', 'Tynker Advanced', 'Hour of Code', 'Duolingo', 'Swift Playgrounds', 'Britannica School', 'GarageBand', 'Stop Motion Studio'] },
]

const canais = [
  { nome: 'Kurzgesagt – Em Resumo', desc: 'Ciência e filosofia animada de alta qualidade', faixa: '10+' },
  { nome: 'Canal do Otávio', desc: 'Experimentos científicos em português', faixa: '6+' },
  { nome: 'Mundo Bita', desc: 'Músicas e histórias educativas para pequenos', faixa: '2–6' },
  { nome: 'Manual do Mundo', desc: 'Ciência, experimentos e tecnologia acessível', faixa: '8+' },
  { nome: 'Crash Course Kids', desc: 'Ciências explicadas de forma divertida (inglês)', faixa: '8+' },
  { nome: 'Nerdologia', desc: 'Ciência através da cultura pop', faixa: '12+' },
  { nome: 'TED-Ed', desc: 'Animações educativas de alto nível (inglês)', faixa: '10+' },
  { nome: 'SciShow Kids', desc: 'Perguntas científicas respondidas para crianças (inglês)', faixa: '5+' },
  { nome: 'Leitura Divertida', desc: 'Histórias e alfabetização em português', faixa: '3–7' },
  { nome: 'Escola Kids', desc: 'Matemática e português de forma lúdica', faixa: '6–10' },
]

const checklist = [
  '☐ Definir horário fixo para a sessão digital (ex: 15h–16h)',
  '☐ Preparar o ambiente: local visível, postura correta',
  '☐ Selecionar conteúdo ANTES da sessão',
  '☐ Avisar com 10 minutos de antecedência antes do fim',
  '☐ Usar timer visual durante a sessão',
  '☐ Ritual de encerramento: salvar → fechar → debrief',
  '☐ Fazer a pergunta: "O que você aprendeu hoje?"',
  '☐ Registrar atividade concluída na plataforma',
  '☐ Dispositivos para o "escritório digital" 1h antes de dormir',
  '☐ Revisar relatório semanal na plataforma NeuralSync',
]

export default function Ebook() {
  const navigate = useNavigate()
  const { subscription } = useAuth()
  const temAcesso = subscription?.plano === 'familia' || subscription?.plano === 'premium'
  const [bonusAberto, setBonusAberto] = useState(null)

  if (!temAcesso) return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
      </header>
      <div style={{maxWidth: '480px', margin: '80px auto', textAlign: 'center', padding: '24px'}}>
        <div style={{fontSize: '64px', marginBottom: '16px'}}>📚</div>
        <h2 style={{fontWeight: '900', fontSize: '24px', color: '#0f0a1e', marginBottom: '10px'}}>Disponível no Plano Família</h2>
        <p style={{color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px'}}>
          O ebook <strong>"A Tela Certa"</strong> e todos os bônus são exclusivos dos planos Família e Premium.
        </p>
        <button onClick={() => navigate('/planos')} style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', border: 'none', borderRadius: '12px', padding: '14px 32px', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.35)'}}>
          Ver planos →
        </button>
      </div>
    </div>
  )

  const bonus = [
    { icon: '🛠️', titulo: '30 Ferramentas Gratuitas por Faixa Etária', desc: 'Curadoria das melhores ferramentas educativas', key: 'ferramentas' },
    { icon: '📺', titulo: '10 Canais do YouTube Educativos Curados', desc: 'Os melhores canais para cada faixa etária', key: 'canais' },
    { icon: '✅', titulo: 'Checklist Semanal Imprimível', desc: 'Organize a rotina digital do seu filho', key: 'checklist' },
  ]

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh'}}>
      <header className="pai-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight: '800', fontSize: '18px', color: '#0f0a1e'}}>📚 Biblioteca NeuralSync</h2>
        </div>
      </header>

      <div style={{maxWidth: '600px', margin: '0 auto', padding: '32px 24px'}}>
        <div style={{background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', borderRadius: '24px', padding: '32px', marginBottom: '24px', textAlign: 'center', boxShadow: '0 8px 32px rgba(124,58,237,0.3)'}}>
          <div style={{fontSize: '60px', marginBottom: '16px'}}>📖</div>
          <h3 style={{fontSize: '22px', fontWeight: '900', color: 'white', marginBottom: '8px', letterSpacing: '-0.3px'}}>A Tela Certa</h3>
          <p style={{color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontSize: '14px', lineHeight: '1.6'}}>Como Usar a Tecnologia Para Criar uma Criança Inteligente</p>
          <p style={{color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontSize: '12px'}}>8 capítulos • Leitura: ~25 min</p>
          <div style={{display: 'flex', gap: '10px'}}>
            <button onClick={() => navigate('/ebook/leitura')} style={{flex: 1, background: 'white', border: 'none', borderRadius: '12px', padding: '12px', color: '#7C3AED', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>📖 Ler online</button>
            <button onClick={() => { window.open('/ebook/leitura', '_blank'); }} style={{flex: 1, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '12px', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif'}}>⬇ Salvar PDF</button>
          </div>
          <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '10px'}}>Para salvar PDF: abra, use Ctrl+P → Salvar como PDF</p>
        </div>

        <h3 style={{fontWeight: '800', fontSize: '17px', marginBottom: '14px', color: '#0f0a1e'}}>🎁 Seus Bônus</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {bonus.map((item) => (
            <div key={item.key}>
              <div className="pai-card" style={{padding: '18px', display: 'flex', gap: '14px', alignItems: 'center'}}>
                <div style={{fontSize: '30px'}}>{item.icon}</div>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: '700', fontSize: '14px', color: '#0f0a1e', marginBottom: '3px'}}>{item.titulo}</div>
                  <div style={{fontSize: '12px', color: '#9ca3af'}}>{item.desc}</div>
                </div>
                <button className="btn-secondary" onClick={() => setBonusAberto(bonusAberto === item.key ? null : item.key)} style={{whiteSpace: 'nowrap', fontSize: '12px', padding: '7px 12px'}}>
                  {bonusAberto === item.key ? 'Fechar ↑' : 'Ver ↓'}
                </button>
              </div>

              {bonusAberto === item.key && (
                <div className="pai-card" style={{borderRadius: '0 0 12px 12px', padding: '16px', marginTop: '-8px', borderTop: '1px solid #f3f4f6'}}>
                  {item.key === 'ferramentas' && ferramentas.map((f, i) => (
                    <div key={i} style={{marginBottom: '16px'}}>
                      <div style={{fontWeight: '700', fontSize: '13px', color: '#7C3AED', marginBottom: '8px'}}>📌 {f.faixa}</div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        {f.itens.map((item, j) => (
                          <div key={j} style={{fontSize: '13px', color: '#374151', padding: '4px 0', borderBottom: '1px solid #f9fafb'}}>• {item}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {item.key === 'canais' && (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      {canais.map((c, i) => (
                        <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 10px', background: '#f9fafb', borderRadius: '8px'}}>
                          <div>
                            <div style={{fontWeight: '700', fontSize: '13px', color: '#0f0a1e'}}>📺 {c.nome}</div>
                            <div style={{fontSize: '11px', color: '#9ca3af', marginTop: '2px'}}>{c.desc}</div>
                          </div>
                          <span style={{background: '#ede9fe', color: '#7C3AED', borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap', marginLeft: '8px'}}>{c.faixa}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.key === 'checklist' && (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      <div style={{fontWeight: '600', fontSize: '13px', color: '#7C3AED', marginBottom: '4px'}}>✅ Checklist Semanal de Rotina Digital</div>
                      {checklist.map((item, i) => (
                        <div key={i} style={{fontSize: '13px', color: '#374151', padding: '6px 10px', background: '#f9fafb', borderRadius: '8px'}}>{item}</div>
                      ))}
                      <button className="btn-secondary" style={{marginTop: '8px', fontSize: '12px'}} onClick={() => window.print()}>🖨️ Imprimir checklist</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
