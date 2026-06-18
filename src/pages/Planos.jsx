import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const precos = {
  starter: { mensal: 29, anual: 19 },
  familia: { mensal: 47, anual: 32 },
  premium: { mensal: 79, anual: 54 },
}

const planosList = [
  {
    id: 'starter',
    nome: 'Starter',
    emoji: '🌱',
    desc: 'Ideal para começar',
    cor: '#10b981',
    destaque: false,
    filhos: '1 filho',
    beneficios: [
      { label: 'Trilha de atividades semanal', ok: true },
      { label: 'NeuralSync Kids — vídeos educativos', ok: true },
      { label: 'Timer e controle de uso', ok: true },
      { label: 'Agenda semanal', ok: true },
      { label: 'Relatório básico mensal', ok: true },
      { label: 'Loja de NeuralCoins', ok: false },
      { label: 'Relatório semanal detalhado', ok: false },
      { label: 'Ebook A Tela Certa + bônus', ok: false },
      { label: 'Ranking entre famílias', ok: false },
      { label: 'Relatório Cognitivo Premium PDF', ok: false },
      { label: 'Suporte prioritário', ok: false },
    ]
  },
  {
    id: 'familia',
    nome: 'Família',
    emoji: '👨‍👧‍👦',
    desc: 'O mais popular',
    cor: '#7C3AED',
    destaque: true,
    filhos: 'Até 3 filhos',
    beneficios: [
      { label: 'Trilha de atividades semanal', ok: true },
      { label: 'NeuralSync Kids — vídeos educativos', ok: true },
      { label: 'Timer e controle de uso', ok: true },
      { label: 'Agenda semanal', ok: true },
      { label: 'Relatório básico mensal', ok: true },
      { label: 'Loja de NeuralCoins', ok: true },
      { label: 'Relatório semanal detalhado', ok: true },
      { label: 'Ebook A Tela Certa + bônus', ok: true },
      { label: 'Ranking entre famílias', ok: true },
      { label: 'Relatório Cognitivo Premium PDF', ok: false },
      { label: 'Suporte prioritário', ok: false },
    ]
  },
  {
    id: 'premium',
    nome: 'Premium',
    emoji: '🚀',
    desc: 'Experiência completa',
    cor: '#F07A20',
    destaque: false,
    filhos: 'Filhos ilimitados',
    beneficios: [
      { label: 'Trilha de atividades semanal', ok: true },
      { label: 'NeuralSync Kids — vídeos educativos', ok: true },
      { label: 'Timer e controle de uso', ok: true },
      { label: 'Agenda semanal', ok: true },
      { label: 'Relatório básico mensal', ok: true },
      { label: 'Loja de NeuralCoins', ok: true },
      { label: 'Relatório semanal detalhado', ok: true },
      { label: 'Ebook A Tela Certa + bônus', ok: true },
      { label: 'Ranking entre famílias', ok: true },
      { label: 'Relatório Cognitivo Premium PDF', ok: true },
      { label: 'Suporte prioritário', ok: true },
    ]
  },
]

const comparacao = [
  { feature: 'Número de filhos', starter: '1', familia: 'Até 3', premium: 'Ilimitados' },
  { feature: 'Trilha semanal personalizada', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'NeuralSync Kids', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'Timer e agenda', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'Relatório básico mensal', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'Loja de NeuralCoins', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Relatório semanal detalhado', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Ebook A Tela Certa + bônus', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Ranking entre famílias', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Relatório Cognitivo Premium PDF', starter: '—', familia: '—', premium: '✓' },
  { feature: 'Suporte prioritário', starter: '—', familia: '—', premium: '✓' },
]

const faq = [
  ['Posso cancelar a qualquer momento?', 'Sim! Não há fidelidade. Você pode cancelar quando quiser diretamente pelo painel, sem burocracia.'],
  ['A garantia de 7 dias funciona como?', 'Se em 7 dias você não ficar satisfeito, devolvemos 100% do valor pago. Sem perguntas.'],
  ['Posso mudar de plano depois?', 'Sim, você pode fazer upgrade ou downgrade a qualquer momento. A diferença é cobrada proporcionalmente.'],
  ['Como funciona o plano anual?', 'Você paga 12 meses de uma vez com 35% de desconto em relação ao plano mensal.'],
  ['O que é o Relatório Cognitivo Premium?', 'Um relatório em PDF gerado automaticamente com análise completa das 8 habilidades cognitivas do seu filho, comparativo com mês anterior, recomendações personalizadas baseadas em neurociência e plano de ação para o mês seguinte. Exclusivo do plano Premium.'],
]

export default function Planos() {
  const navigate = useNavigate()
  const [periodo, setPeriodo] = useState('anual')

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.textContent = '* { font-family: "Plus Jakarta Sans", sans-serif; box-sizing: border-box; }'
    document.head.appendChild(style)
  }, [])

  return (
    <div style={{background:'#f9fafb',minHeight:'100vh',color:'#0f0a1e'}}>

      {/* HEADER */}
      <header style={{background:'white',borderBottom:'1px solid #f3f4f6',padding:'16px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50,boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
        <div onClick={() => navigate('/')} style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'10px',background:'linear-gradient(135deg,#7C3AED,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>🧠</div>
          <span style={{fontWeight:'800',fontSize:'18px'}}>
            <span style={{color:'#0f0a1e'}}>NeuralSync </span>
            <span style={{color:'#7C3AED'}}>Academy</span>
          </span>
        </div>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <button onClick={() => navigate('/auth')} style={{background:'none',border:'none',color:'#6b7280',cursor:'pointer',fontWeight:'600',fontSize:'14px'}}>Entrar</button>
          <button onClick={() => navigate('/auth')} style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',border:'none',borderRadius:'999px',padding:'10px 22px',color:'white',cursor:'pointer',fontSize:'14px',fontWeight:'700',boxShadow:'0 4px 14px rgba(124,58,237,0.3)'}}>Começar grátis</button>
        </div>
      </header>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'72px 24px 56px',background:'linear-gradient(145deg,#faf5ff 0%,#ede9fe 50%,#e0f2fe 100%)'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#d1fae5',border:'1px solid #6ee7b7',borderRadius:'999px',padding:'6px 14px',fontSize:'13px',color:'#065f46',marginBottom:'20px',fontWeight:'600'}}>
          💳 Planos e preços
        </div>
        <h1 style={{fontSize:'48px',fontWeight:'900',letterSpacing:'-2px',marginBottom:'14px',lineHeight:'1.05'}}>
          Invista no futuro<br /><span style={{color:'#7C3AED'}}>do seu filho</span>
        </h1>
        <p style={{color:'#6b7280',fontSize:'16px',marginBottom:'32px',maxWidth:'440px',margin:'0 auto 32px',lineHeight:'1.6'}}>
          Menos que uma pizza por mês. Cancele quando quiser. Garantia de 7 dias.
        </p>

        {/* TOGGLE */}
        <div style={{display:'inline-flex',background:'white',borderRadius:'14px',padding:'4px',border:'1.5px solid #e5e7eb',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {[['mensal','Mensal'],['anual','Anual']].map(([id,label]) => (
            <button key={id} onClick={() => setPeriodo(id)} style={{
              padding:'10px 24px',borderRadius:'10px',border:'none',cursor:'pointer',
              fontWeight:'700',fontSize:'14px',transition:'all 0.2s',
              background: periodo === id ? '#7C3AED' : 'transparent',
              color: periodo === id ? 'white' : '#6b7280',
              display:'flex',alignItems:'center',gap:'6px'
            }}>
              {label}
              {id === 'anual' && <span style={{background:'#d1fae5',color:'#065f46',borderRadius:'999px',padding:'2px 8px',fontSize:'11px',fontWeight:'700'}}>-35%</span>}
            </button>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section style={{padding:'0 24px 72px',maxWidth:'1020px',margin:'-24px auto 0'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',alignItems:'start'}}>
          {planosList.map(plano => (
            <div key={plano.id} style={{
              background: plano.destaque ? 'linear-gradient(135deg,#7C3AED,#6d28d9)' : 'white',
              borderRadius:'24px',padding:'28px',
              border: plano.destaque ? 'none' : '1.5px solid #f3f4f6',
              boxShadow: plano.destaque ? '0 20px 60px rgba(124,58,237,0.3)' : '0 4px 16px rgba(0,0,0,0.06)',
              position:'relative',
              marginTop: plano.destaque ? '-16px' : '0'
            }}>
              {plano.destaque && (
                <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#F07A20,#ea6500)',borderRadius:'999px',padding:'5px 18px',fontSize:'12px',fontWeight:'800',color:'white',whiteSpace:'nowrap',boxShadow:'0 4px 12px rgba(240,122,32,0.4)'}}>
                  ⭐ MAIS POPULAR
                </div>
              )}

              <div style={{marginBottom:'20px'}}>
                <div style={{fontSize:'28px',marginBottom:'8px'}}>{plano.emoji}</div>
                <h3 style={{fontSize:'20px',fontWeight:'900',marginBottom:'2px',color: plano.destaque ? 'white' : '#0f0a1e'}}>{plano.nome}</h3>
                <p style={{fontSize:'12px',color: plano.destaque ? 'rgba(255,255,255,0.6)' : '#9ca3af',marginBottom:'8px'}}>{plano.desc}</p>
                <div style={{
                  display:'inline-flex',alignItems:'center',gap:'4px',
                  background: plano.destaque ? 'rgba(255,255,255,0.15)' : plano.cor+'18',
                  borderRadius:'999px',padding:'4px 10px',
                  fontSize:'12px',fontWeight:'700',
                  color: plano.destaque ? 'white' : plano.cor
                }}>
                  👤 {plano.filhos}
                </div>
              </div>

              <div style={{marginBottom:'20px'}}>
                <div style={{display:'flex',alignItems:'flex-end',gap:'2px',marginBottom:'4px'}}>
                  <span style={{fontSize:'13px',color: plano.destaque ? 'rgba(255,255,255,0.6)' : '#9ca3af',fontWeight:'600',marginBottom:'6px'}}>R$</span>
                  <span style={{fontSize:'46px',fontWeight:'900',letterSpacing:'-2px',color: plano.destaque ? 'white' : '#0f0a1e',lineHeight:'1'}}>
                    {precos[plano.id][periodo]}
                  </span>
                  <span style={{fontSize:'13px',color: plano.destaque ? 'rgba(255,255,255,0.6)' : '#9ca3af',fontWeight:'600',marginBottom:'6px'}}>/mês</span>
                </div>
                {periodo === 'anual' && (
                  <div style={{fontSize:'12px',color: plano.destaque ? 'rgba(255,255,255,0.5)' : '#9ca3af'}}>
                    R$ {precos[plano.id][periodo] * 12}/ano — cobrado anualmente
                  </div>
                )}
              </div>

              <button onClick={() => navigate('/auth')} style={{
                width:'100%',padding:'13px',borderRadius:'12px',border:'none',
                background: plano.destaque ? 'white' : 'linear-gradient(135deg,#7C3AED,#6d28d9)',
                color: plano.destaque ? '#7C3AED' : 'white',
                fontWeight:'800',fontSize:'14px',cursor:'pointer',
                boxShadow: plano.destaque ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 14px rgba(124,58,237,0.3)',
                marginBottom:'20px',transition:'all 0.2s'
              }}>
                Começar 7 dias grátis →
              </button>

              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {plano.beneficios.map((b,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{
                      width:'18px',height:'18px',borderRadius:'50%',flexShrink:0,
                      display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',
                      background: b.ok
                        ? (plano.destaque ? 'rgba(255,255,255,0.2)' : '#f0fdf4')
                        : (plano.destaque ? 'rgba(255,255,255,0.06)' : '#f9fafb'),
                      color: b.ok
                        ? (plano.destaque ? 'white' : '#10b981')
                        : (plano.destaque ? 'rgba(255,255,255,0.25)' : '#d1d5db')
                    }}>{b.ok ? '✓' : '—'}</div>
                    <span style={{
                      fontSize:'12px',
                      color: b.ok
                        ? (plano.destaque ? 'rgba(255,255,255,0.9)' : '#374151')
                        : (plano.destaque ? 'rgba(255,255,255,0.3)' : '#d1d5db'),
                      fontWeight: b.ok ? '500' : '400'
                    }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{textAlign:'center',color:'#9ca3af',fontSize:'13px',marginTop:'20px'}}>
          ✓ 7 dias grátis em qualquer plano  •  ✓ Cancele quando quiser  •  ✓ Sem fidelidade
        </p>
      </section>

      {/* DESTAQUE RELATÓRIO PREMIUM */}
      <section style={{padding:'0 24px 72px',maxWidth:'860px',margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',borderRadius:'24px',padding:'36px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.15)',borderRadius:'999px',padding:'5px 12px',fontSize:'12px',color:'white',fontWeight:'700',marginBottom:'16px'}}>
              ⭐ Exclusivo Premium
            </div>
            <h3 style={{fontSize:'26px',fontWeight:'900',color:'white',marginBottom:'12px',letterSpacing:'-0.5px',lineHeight:'1.2'}}>
              Relatório Cognitivo Premium em PDF
            </h3>
            <p style={{color:'rgba(255,255,255,0.75)',fontSize:'14px',lineHeight:'1.7',marginBottom:'20px'}}>
              Relatório completo de 2 páginas gerado automaticamente com análise das 8 habilidades cognitivas, comparativo mensal, recomendações baseadas em neurociência e plano de ação personalizado para o seu filho.
            </p>
            {[
              'Análise das 8 habilidades cognitivas',
              'Comparativo com mês anterior',
              'Recomendações de especialistas',
              'Plano de ação para o próximo mês',
              'Gerado automaticamente — sem intervenção humana'
            ].map((item,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px',fontSize:'13px',color:'rgba(255,255,255,0.85)'}}>
                <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',color:'white',flexShrink:0}}>✓</div>
                {item}
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 8px 32px rgba(0,0,0,0.15)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <div style={{fontWeight:'800',fontSize:'13px',color:'#0f0a1e'}}>Relatório — Lia</div>
              <div style={{background:'#d1fae5',color:'#065f46',borderRadius:'999px',padding:'3px 8px',fontSize:'11px',fontWeight:'700'}}>+18% este mês</div>
            </div>
            {[['Concentração',80,'#7C3AED'],['Lógica',75,'#10b981'],['Emocional',70,'#3b82f6'],['Memória',65,'#F07A20']].map(([label,val,cor]) => (
              <div key={label} style={{marginBottom:'10px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'4px'}}>
                  <span style={{color:'#374151',fontWeight:'600'}}>{label}</span>
                  <span style={{color:cor,fontWeight:'800'}}>{val}%</span>
                </div>
                <div style={{background:'#e5e7eb',borderRadius:'999px',height:'6px',overflow:'hidden'}}>
                  <div style={{background:cor,width:val+'%',height:'100%',borderRadius:'999px'}} />
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/relatorio-pdf')} style={{width:'100%',marginTop:'12px',padding:'10px',borderRadius:'10px',border:'none',background:'linear-gradient(135deg,#7C3AED,#6d28d9)',color:'white',fontWeight:'700',fontSize:'13px',cursor:'pointer'}}>
              Ver exemplo do relatório →
            </button>
          </div>
        </div>
      </section>

      {/* TABELA */}
      <section style={{padding:'0 24px 72px',maxWidth:'860px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'2px'}}>Comparação completa</div>
          <h2 style={{fontSize:'34px',fontWeight:'900',letterSpacing:'-1px',color:'#0f0a1e'}}>O que está incluso em cada plano</h2>
        </div>
        <div style={{background:'white',borderRadius:'20px',overflow:'hidden',border:'1.5px solid #f3f4f6',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',background:'#faf5ff',borderBottom:'1.5px solid #ede9fe'}}>
            <div style={{padding:'14px 20px',fontWeight:'700',fontSize:'13px',color:'#6b7280'}}>Funcionalidade</div>
            {[['🌱','Starter'],['👨‍👧‍👦','Família'],['🚀','Premium']].map(([emoji,nome],i) => (
              <div key={nome} style={{padding:'14px',textAlign:'center',fontWeight:'800',fontSize:'13px',color: i===1 ? '#7C3AED' : '#0f0a1e'}}>{emoji} {nome}</div>
            ))}
          </div>
          {comparacao.map((row,i) => (
            <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',borderBottom: i < comparacao.length-1 ? '1px solid #f9fafb' : 'none',background: i%2===0 ? 'white' : '#fdfcff'}}>
              <div style={{padding:'12px 20px',fontSize:'13px',color:'#374151',fontWeight:'500',display:'flex',alignItems:'center',gap:'6px'}}>
                {row.feature}
                {row.feature === 'Relatório Cognitivo Premium PDF' && (
                  <span style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',color:'white',borderRadius:'999px',padding:'2px 6px',fontSize:'10px',fontWeight:'700'}}>NEW</span>
                )}
              </div>
              {[row.starter,row.familia,row.premium].map((val,j) => (
                <div key={j} style={{padding:'12px',textAlign:'center',fontSize:'13px',fontWeight: val==='✓'?'700':'400',color: val==='✓'?'#10b981': val==='—'?'#d1d5db': j===1?'#7C3AED':'#0f0a1e'}}>
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'0 24px 72px',maxWidth:'640px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'2px'}}>Dúvidas</div>
          <h2 style={{fontSize:'34px',fontWeight:'900',letterSpacing:'-1px',color:'#0f0a1e'}}>Perguntas frequentes</h2>
        </div>
        {faq.map(([pergunta,resposta],i) => (
          <div key={i} style={{background:'white',borderRadius:'14px',padding:'18px 20px',marginBottom:'10px',border:'1.5px solid #f3f4f6',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h4 style={{fontWeight:'700',fontSize:'14px',color:'#0f0a1e',marginBottom:'6px'}}>{pergunta}</h4>
            <p style={{color:'#6b7280',fontSize:'13px',lineHeight:'1.6'}}>{resposta}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{padding:'72px 24px',textAlign:'center',background:'linear-gradient(145deg,#faf5ff,#ede9fe)'}}>
        <h2 style={{fontSize:'44px',fontWeight:'900',letterSpacing:'-1.5px',marginBottom:'14px',lineHeight:'1.1',color:'#0f0a1e'}}>
          Comece hoje.<br /><span style={{color:'#7C3AED'}}>Sem cartão.</span>
        </h2>
        <p style={{color:'#6b7280',fontSize:'16px',marginBottom:'32px'}}>7 dias grátis em qualquer plano. Cancele quando quiser.</p>
        <button onClick={() => navigate('/auth')} style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',border:'none',borderRadius:'14px',padding:'16px 40px',color:'white',cursor:'pointer',fontWeight:'800',fontSize:'18px',boxShadow:'0 8px 30px rgba(124,58,237,0.4)'}}>
          Começar 7 dias grátis →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid #e5e7eb',padding:'32px',textAlign:'center',background:'white'}}>
        <div style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e',marginBottom:'6px'}}>NeuralSync Academy</div>
        <div style={{display:'flex',justifyContent:'center',gap:'24px',marginBottom:'10px'}}>
          {[['Home','/'],['Planos','/planos'],['Entrar','/auth']].map(([label,path]) => (
            <a key={path} onClick={() => navigate(path)} style={{color:'#9ca3af',fontSize:'13px',cursor:'pointer',textDecoration:'none',fontWeight:'500'}}>{label}</a>
          ))}
        </div>
        <p style={{color:'#9ca3af',fontSize:'13px'}}>2026 NeuralSync Academy. Tempo de tela que vira inteligência.</p>
      </footer>
    </div>
  )
}
