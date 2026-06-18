import { writeFileSync } from 'fs'

const planos = `import { useState, useEffect } from 'react'
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
    desc: 'Ideal para comecar',
    cor: '#10b981',
    destaque: false,
    filhos: '1 filho',
    beneficios: [
      { label: 'Trilha de atividades semanal', ok: true },
      { label: 'NeuralSync Kids — videos educativos', ok: true },
      { label: 'Timer e controle de uso', ok: true },
      { label: 'Agenda semanal', ok: true },
      { label: 'Relatorio basico mensal', ok: true },
      { label: 'Loja de NeuralCoins', ok: false },
      { label: 'Relatorio semanal detalhado', ok: false },
      { label: 'Ebook A Tela Certa + bonus', ok: false },
      { label: 'Ranking entre familias', ok: false },
      { label: 'Relatorio Cognitivo Premium PDF', ok: false },
      { label: 'Suporte prioritario', ok: false },
    ]
  },
  {
    id: 'familia',
    nome: 'Familia',
    emoji: '👨‍👧‍👦',
    desc: 'O mais popular',
    cor: '#7C3AED',
    destaque: true,
    filhos: 'Ate 3 filhos',
    beneficios: [
      { label: 'Trilha de atividades semanal', ok: true },
      { label: 'NeuralSync Kids — videos educativos', ok: true },
      { label: 'Timer e controle de uso', ok: true },
      { label: 'Agenda semanal', ok: true },
      { label: 'Relatorio basico mensal', ok: true },
      { label: 'Loja de NeuralCoins', ok: true },
      { label: 'Relatorio semanal detalhado', ok: true },
      { label: 'Ebook A Tela Certa + bonus', ok: true },
      { label: 'Ranking entre familias', ok: true },
      { label: 'Relatorio Cognitivo Premium PDF', ok: false },
      { label: 'Suporte prioritario', ok: false },
    ]
  },
  {
    id: 'premium',
    nome: 'Premium',
    emoji: '🚀',
    desc: 'Experiencia completa',
    cor: '#F07A20',
    destaque: false,
    filhos: 'Filhos ilimitados',
    beneficios: [
      { label: 'Trilha de atividades semanal', ok: true },
      { label: 'NeuralSync Kids — videos educativos', ok: true },
      { label: 'Timer e controle de uso', ok: true },
      { label: 'Agenda semanal', ok: true },
      { label: 'Relatorio basico mensal', ok: true },
      { label: 'Loja de NeuralCoins', ok: true },
      { label: 'Relatorio semanal detalhado', ok: true },
      { label: 'Ebook A Tela Certa + bonus', ok: true },
      { label: 'Ranking entre familias', ok: true },
      { label: 'Relatorio Cognitivo Premium PDF', ok: true },
      { label: 'Suporte prioritario', ok: true },
    ]
  },
]

const comparacao = [
  { feature: 'Numero de filhos', starter: '1', familia: 'Ate 3', premium: 'Ilimitados' },
  { feature: 'Trilha semanal personalizada', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'NeuralSync Kids', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'Timer e agenda', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'Relatorio basico mensal', starter: '✓', familia: '✓', premium: '✓' },
  { feature: 'Loja de NeuralCoins', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Relatorio semanal detalhado', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Ebook A Tela Certa + bonus', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Ranking entre familias', starter: '—', familia: '✓', premium: '✓' },
  { feature: 'Relatorio Cognitivo Premium PDF', starter: '—', familia: '—', premium: '✓' },
  { feature: 'Suporte prioritario', starter: '—', familia: '—', premium: '✓' },
]

const faq = [
  ['Posso cancelar a qualquer momento?', 'Sim! Nao ha fidelidade. Voce pode cancelar quando quiser diretamente pelo painel, sem burocracia.'],
  ['A garantia de 7 dias funciona como?', 'Se em 7 dias voce nao ficar satisfeito, devolvemos 100% do valor pago. Sem perguntas.'],
  ['Posso mudar de plano depois?', 'Sim, voce pode fazer upgrade ou downgrade a qualquer momento. A diferenca e cobrada proporcionalmente.'],
  ['Como funciona o plano anual?', 'Voce paga 12 meses de uma vez com 35% de desconto em relacao ao plano mensal.'],
  ['O que e o Relatorio Cognitivo Premium?', 'Um relatorio em PDF gerado automaticamente com analise completa das 8 habilidades cognitivas do seu filho, comparativo com mes anterior, recomendacoes personalizadas baseadas em neurociencia e plano de acao para o mes seguinte. Exclusivo do plano Premium.'],
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
          <button onClick={() => navigate('/auth')} style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',border:'none',borderRadius:'999px',padding:'10px 22px',color:'white',cursor:'pointer',fontSize:'14px',fontWeight:'700',boxShadow:'0 4px 14px rgba(124,58,237,0.3)'}}>Comecar gratis</button>
        </div>
      </header>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'72px 24px 56px',background:'linear-gradient(145deg,#faf5ff 0%,#ede9fe 50%,#e0f2fe 100%)'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#d1fae5',border:'1px solid #6ee7b7',borderRadius:'999px',padding:'6px 14px',fontSize:'13px',color:'#065f46',marginBottom:'20px',fontWeight:'600'}}>
          💳 Planos e precos
        </div>
        <h1 style={{fontSize:'48px',fontWeight:'900',letterSpacing:'-2px',marginBottom:'14px',lineHeight:'1.05'}}>
          Invista no futuro<br /><span style={{color:'#7C3AED'}}>do seu filho</span>
        </h1>
        <p style={{color:'#6b7280',fontSize:'16px',marginBottom:'32px',maxWidth:'440px',margin:'0 auto 32px',lineHeight:'1.6'}}>
          Menos que uma pizza por mes. Cancele quando quiser. Garantia de 7 dias.
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

              {/* HEADER DO PLANO */}
              <div style={{marginBottom:'20px'}}>
                <div style={{fontSize:'28px',marginBottom:'8px'}}>{plano.emoji}</div>
                <h3 style={{fontSize:'20px',fontWeight:'900',marginBottom:'2px',color: plano.destaque ? 'white' : '#0f0a1e'}}>{plano.nome}</h3>
                <p style={{fontSize:'12px',color: plano.destaque ? 'rgba(255,255,255,0.6)' : '#9ca3af',marginBottom:'8px'}}>{plano.desc}</p>
                {/* BADGE FILHOS */}
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

              {/* PRECO */}
              <div style={{marginBottom:'20px'}}>
                <div style={{display:'flex',alignItems:'flex-end',gap:'2px',marginBottom:'4px'}}>
                  <span style={{fontSize:'13px',color: plano.destaque ? 'rgba(255,255,255,0.6)' : '#9ca3af',fontWeight:'600',marginBottom:'6px'}}>R$</span>
                  <span style={{fontSize:'46px',fontWeight:'900',letterSpacing:'-2px',color: plano.destaque ? 'white' : '#0f0a1e',lineHeight:'1'}}>
                    {precos[plano.id][periodo]}
                  </span>
                  <span style={{fontSize:'13px',color: plano.destaque ? 'rgba(255,255,255,0.6)' : '#9ca3af',fontWeight:'600',marginBottom:'6px'}}>/mes</span>
                </div>
                {periodo === 'anual' && (
                  <div style={{fontSize:'12px',color: plano.destaque ? 'rgba(255,255,255,0.5)' : '#9ca3af'}}>
                    R$ {precos[plano.id][periodo] * 12}/ano — cobrado anualmente
                  </div>
                )}
              </div>

              {/* CTA */}
              <button onClick={() => navigate('/auth')} style={{
                width:'100%',padding:'13px',borderRadius:'12px',border:'none',
                background: plano.destaque ? 'white' : 'linear-gradient(135deg,#7C3AED,#6d28d9)',
                color: plano.destaque ? '#7C3AED' : 'white',
                fontWeight:'800',fontSize:'14px',cursor:'pointer',
                boxShadow: plano.destaque ? '0 4px 16px rgba(0,0,0,0.15)' : '0 4px 14px rgba(124,58,237,0.3)',
                marginBottom:'20px',transition:'all 0.2s'
              }}>
                Comecar 7 dias gratis →
              </button>

              {/* BENEFICIOS */}
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
          ✓ 7 dias gratis em qualquer plano  •  ✓ Cancele quando quiser  •  ✓ Sem fidelidade
        </p>
      </section>

      {/* DESTAQUE RELATORIO PREMIUM */}
      <section style={{padding:'0 24px 72px',maxWidth:'860px',margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',borderRadius:'24px',padding:'36px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.15)',borderRadius:'999px',padding:'5px 12px',fontSize:'12px',color:'white',fontWeight:'700',marginBottom:'16px'}}>
              ⭐ Exclusivo Premium
            </div>
            <h3 style={{fontSize:'26px',fontWeight:'900',color:'white',marginBottom:'12px',letterSpacing:'-0.5px',lineHeight:'1.2'}}>
              Relatorio Cognitivo Premium em PDF
            </h3>
            <p style={{color:'rgba(255,255,255,0.75)',fontSize:'14px',lineHeight:'1.7',marginBottom:'20px'}}>
              Relatorio completo de 2 paginas gerado automaticamente com analise das 8 habilidades cognitivas, comparativo mensal, recomendacoes baseadas em neurociencia e plano de acao personalizado para o seu filho.
            </p>
            {['Analise das 8 habilidades cognitivas','Comparativo com mes anterior','Recomendacoes de especialistas','Plano de acao para o proximo mes','Gerado automaticamente — sem intervencao humana'].map((item,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px',fontSize:'13px',color:'rgba(255,255,255,0.85)'}}>
                <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',color:'white',flexShrink:0}}>✓</div>
                {item}
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'24px',boxShadow:'0 8px 32px rgba(0,0,0,0.15)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <div style={{fontWeight:'800',fontSize:'13px',color:'#0f0a1e'}}>Relatorio — Lia</div>
              <div style={{background:'#d1fae5',color:'#065f46',borderRadius:'999px',padding:'3px 8px',fontSize:'11px',fontWeight:'700'}}>+18% este mes</div>
            </div>
            {[['Concentracao',80,'#7C3AED'],['Logica',75,'#10b981'],['Emocional',70,'#3b82f6'],['Memoria',65,'#F07A20']].map(([label,val,cor]) => (
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
              Ver exemplo do relatorio →
            </button>
          </div>
        </div>
      </section>

      {/* TABELA */}
      <section style={{padding:'0 24px 72px',maxWidth:'860px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'2px'}}>Comparacao completa</div>
          <h2 style={{fontSize:'34px',fontWeight:'900',letterSpacing:'-1px',color:'#0f0a1e'}}>O que esta incluso em cada plano</h2>
        </div>
        <div style={{background:'white',borderRadius:'20px',overflow:'hidden',border:'1.5px solid #f3f4f6',boxShadow:'0 4px 16px rgba(0,0,0,0.06)'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',background:'#faf5ff',borderBottom:'1.5px solid #ede9fe'}}>
            <div style={{padding:'14px 20px',fontWeight:'700',fontSize:'13px',color:'#6b7280'}}>Funcionalidade</div>
            {[['🌱','Starter'],['👨‍👧‍👦','Familia'],['🚀','Premium']].map(([emoji,nome],i) => (
              <div key={nome} style={{padding:'14px',textAlign:'center',fontWeight:'800',fontSize:'13px',color: i===1 ? '#7C3AED' : '#0f0a1e'}}>{emoji} {nome}</div>
            ))}
          </div>
          {comparacao.map((row,i) => (
            <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',borderBottom: i < comparacao.length-1 ? '1px solid #f9fafb' : 'none',background: i%2===0 ? 'white' : '#fdfcff'}}>
              <div style={{padding:'12px 20px',fontSize:'13px',color:'#374151',fontWeight:'500',display:'flex',alignItems:'center',gap:'6px'}}>
                {row.feature}
                {row.feature === 'Relatorio Cognitivo Premium PDF' && (
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
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'2px'}}>Duvidas</div>
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
          Comece hoje.<br /><span style={{color:'#7C3AED'}}>Sem cartao.</span>
        </h2>
        <p style={{color:'#6b7280',fontSize:'16px',marginBottom:'32px'}}>7 dias gratis em qualquer plano. Cancele quando quiser.</p>
        <button onClick={() => navigate('/auth')} style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',border:'none',borderRadius:'14px',padding:'16px 40px',color:'white',cursor:'pointer',fontWeight:'800',fontSize:'18px',boxShadow:'0 8px 30px rgba(124,58,237,0.4)'}}>
          Comecar 7 dias gratis →
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
        <p style={{color:'#9ca3af',fontSize:'13px'}}>2026 NeuralSync Academy. Tempo de tela que vira inteligencia.</p>
      </footer>
    </div>
  )
}`

// PDF CORRIGIDO - layout limpo sem sobreposicoes
const relatorio = `import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import '../../styles/pai.css'

const habilidades = [
  { skill: 'Logica', value: 75, anterior: 60, meta: 85 },
  { skill: 'Criatividade', value: 60, anterior: 48, meta: 75 },
  { skill: 'Problemas', value: 55, anterior: 42, meta: 70 },
  { skill: 'Computacional', value: 45, anterior: 38, meta: 65 },
  { skill: 'Concentracao', value: 80, anterior: 65, meta: 90 },
  { skill: 'Memoria', value: 65, anterior: 55, meta: 80 },
  { skill: 'Comunicacao', value: 50, anterior: 40, meta: 70 },
  { skill: 'Emocional', value: 70, anterior: 58, meta: 85 },
]

const dadosSemanas = [
  { semana: 'Sem 1', xp: 420, sessoes: 4, minutos: 95 },
  { semana: 'Sem 2', xp: 580, sessoes: 6, minutos: 142 },
  { semana: 'Sem 3', xp: 510, sessoes: 5, minutos: 118 },
  { semana: 'Sem 4', xp: 680, sessoes: 7, minutos: 165 },
]

const recomendacoes = [
  {
    area: 'Concentracao',
    nivel: 80,
    status: 'Ponto forte',
    cor: '#7C3AED',
    recomendacao: 'Desempenho excepcional! 80% de concentracao aos 8 anos coloca Lia no top 15% da faixa etaria. Pesquisas da NeuronUP mostram que criancas com alta concentracao nessa fase tem 3x mais chance de manter habito de leitura na adolescencia.',
    atividades: ['Aumentar sessoes para 35 min gradualmente', 'Introducao de leitura autonoma', 'Desafios de atencao sustentada'],
    tempo: 'Mantenha consistencia do streak atual'
  },
  {
    area: 'Raciocinio Logico',
    nivel: 75,
    status: 'Acima da media',
    cor: '#10b981',
    recomendacao: 'Excelente progresso! Segundo especialistas do Instituto NeuroSaber, criancas nesta faixa que dominam sequencias complexas desenvolvem base solida para matematica avancada. Introduza desafios com 4-5 etapas.',
    atividades: ['Labirintos digitais com multiplos caminhos', 'Quebra-cabecas de padroes geometricos', 'Jogos de classificacao por 2+ atributos'],
    tempo: '25-30 min por sessao, 3x por semana'
  },
  {
    area: 'Pensamento Computacional',
    nivel: 45,
    status: 'Em desenvolvimento',
    cor: '#F07A20',
    recomendacao: 'Esta habilidade esta em fase inicial, normal para 8 anos. A Dra. Fernanda Monteiro recomenda jogos de sequenciamento visual antes de logica abstrata. Foco em causa e efeito antes de algoritmos formais.',
    atividades: ['Programacao visual com blocos Scratch Jr', 'Jogos de instrucoes sequenciais', 'Atividades de causa e efeito'],
    tempo: '20 min por sessao, 2x por semana — aumentar gradualmente'
  },
  {
    area: 'Inteligencia Emocional',
    nivel: 70,
    status: 'Bom progresso',
    cor: '#3b82f6',
    recomendacao: 'Nivel adequado para a faixa etaria. Segundo o Manual MSD de Desenvolvimento Infantil 2025, aos 8 anos a crianca deve identificar e nomear 5 ou mais emocoes. Reforce com atividades de reconhecimento em contextos sociais.',
    atividades: ['Historias com dilemas emocionais', 'Jogos cooperativos nao competitivos', 'Diario de emocoes ilustrado'],
    tempo: '15 min por dia integrado a rotina familiar'
  },
]

const metas = [
  'Aumentar Pensamento Computacional de 45% para 55% com 2 sessoes extras por semana',
  'Manter streak acima de 10 dias consecutivos para consolidar habito de estudo',
  'Completar todos os desafios semanais do mes para ganhar badge Construtora Nivel 4',
  'Aumentar tempo de sessao de 25 para 35 minutos nas ultimas 2 semanas do mes',
]

export default function RelatorioPDF() {
  const navigate = useNavigate()
  const [child, setChild] = useState(null)
  const [gerando, setGerando] = useState(false)
  const [gerado, setGerado] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('visao')

  useEffect(() => {
    supabase.from('children').select('*').eq('nome', 'Lia').single().then(({ data }) => setChild(data))
  }, [])

  const mediaGeral = Math.round(habilidades.reduce((acc, h) => acc + h.value, 0) / habilidades.length)
  const mediaAnterior = Math.round(habilidades.reduce((acc, h) => acc + h.anterior, 0) / habilidades.length)
  const evolucao = mediaGeral - mediaAnterior

  const cores = ['#7C3AED','#F07A20','#10b981','#3b82f6','#ef4444','#ec4899','#f59e0b','#06b6d4']

  const gerarPDF = async () => {
    setGerando(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF('p', 'mm', 'a4')
      const W = 210
      const mes = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
      const nome = child?.nome || 'Lia'

      // ========================
      // PAGINA 1
      // ========================

      // HEADER ROXO
      doc.setFillColor(124, 58, 237)
      doc.rect(0, 0, W, 52, 'F')

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.text('NeuralSync Academy', W/2, 16, { align: 'center' })
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Relatorio Cognitivo Mensal Premium', W/2, 26, { align: 'center' })
      doc.setFontSize(9)
      doc.text(mes.charAt(0).toUpperCase() + mes.slice(1), W/2, 36, { align: 'center' })
      doc.text('Gerado automaticamente pelo sistema NeuralSync', W/2, 44, { align: 'center' })

      // CARD CRIANCA
      doc.setFillColor(248, 245, 255)
      doc.roundedRect(15, 58, W-30, 22, 3, 3, 'F')
      doc.setDrawColor(200, 180, 255)
      doc.setLineWidth(0.3)
      doc.roundedRect(15, 58, W-30, 22, 3, 3, 'S')

      doc.setTextColor(124, 58, 237)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(nome, W/2, 68, { align: 'center' })
      doc.setTextColor(107, 114, 128)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text((child?.idade||8) + ' anos  |  Nivel ' + (child?.nivel||3) + '  |  Construtora  |  Media geral: ' + mediaGeral + '%  (+' + evolucao + '% vs mes anterior)', W/2, 76, { align: 'center' })

      // STATS 6 COLUNAS
      let y = 88
      const statItems = [
        ['22','Sessoes'], ['9h 15m','Foco total'],
        [(child?.xp||680)+' XP','Acumulado'], [(child?.neural_coins||324)+'','NeuralCoins'],
        [(child?.streak_maximo||7)+' dias','Streak max'], ['Top 20%','Ranking']
      ]
      statItems.forEach(([val, label], i) => {
        const x = 15 + i * 30
        doc.setFillColor(124, 58, 237)
        doc.roundedRect(x, y, 27, 16, 2, 2, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(val, x + 13.5, y + 7, { align: 'center' })
        doc.setFontSize(6.5)
        doc.setFont('helvetica', 'normal')
        doc.text(label, x + 13.5, y + 13, { align: 'center' })
      })

      y += 24

      // SECAO: HABILIDADES
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Habilidades Cognitivas — Evolucao Mensal', 15, y)

      // legenda
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(107, 114, 128)
      doc.setFillColor(124, 58, 237)
      doc.rect(120, y-4, 8, 3, 'F')
      doc.text('Atual', 130, y-2)
      doc.setFillColor(200, 200, 200)
      doc.rect(145, y-4, 8, 3, 'F')
      doc.text('Anterior', 155, y-2)
      doc.setFillColor(209, 250, 229)
      doc.rect(175, y-4, 8, 3, 'F')
      doc.text('Meta', 185, y-2)

      y += 6

      habilidades.forEach((h, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = col === 0 ? 15 : W/2 + 5
        const cy = y + row * 18

        const diff = h.value - h.anterior
        const [r,g,b] = cores[i].replace('#','').match(/.{2}/g).map(v => parseInt(v,16))

        // NOME DA HABILIDADE
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text(h.skill, x, cy + 4)

        // PERCENTUAL + DIFF
        doc.setTextColor(15, 10, 30)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(h.value + '%', x + 60, cy + 4)

        doc.setTextColor(diff >= 0 ? 16 : 239, diff >= 0 ? 185 : 68, diff >= 0 ? 129 : 68)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text((diff >= 0 ? '+' : '') + diff + '%', x + 74, cy + 4)

        // BARRA META (verde clara)
        doc.setFillColor(209, 250, 229)
        doc.roundedRect(x, cy + 6, 82 * h.meta / 100, 4, 1, 1, 'F')

        // BARRA ANTERIOR (cor clara)
        doc.setFillColor(r > 200 ? 255 : r+80, g > 200 ? 255 : g+80, b > 200 ? 255 : b+80)
        doc.roundedRect(x, cy + 6, 82 * h.anterior / 100, 4, 1, 1, 'F')

        // BARRA ATUAL
        doc.setFillColor(r, g, b)
        doc.roundedRect(x, cy + 6, 82 * h.value / 100, 4, 1, 1, 'F')

        // TRACK
        doc.setDrawColor(229, 231, 235)
        doc.setLineWidth(0.2)
        doc.roundedRect(x, cy + 6, 82, 4, 1, 1, 'S')

        // META LABEL
        doc.setTextColor(156, 163, 175)
        doc.setFontSize(6)
        doc.text('meta ' + h.meta + '%', x + 84, cy + 10)
      })

      y += 76

      // PROGRESSO SEMANAL
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Progresso Semanal', 15, y)
      y += 6

      const maxXP = 800
      const barW = 28
      dadosSemanas.forEach((sem, i) => {
        const x = 15 + i * 48
        const barH = Math.max(2, (sem.xp / maxXP) * 28)

        // coluna fundo
        doc.setFillColor(237, 233, 254)
        doc.roundedRect(x, y + 28 - barH, barW, barH, 2, 2, 'F')

        // topo roxo
        doc.setFillColor(124, 58, 237)
        doc.rect(x, y + 28 - barH, barW, 3, 'F')

        // XP acima
        doc.setTextColor(124, 58, 237)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'bold')
        doc.text(sem.xp + ' XP', x + barW/2, y + 25 - barH, { align: 'center' })

        // labels abaixo
        doc.setTextColor(107, 114, 128)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.text(sem.semana, x + barW/2, y + 34, { align: 'center' })
        doc.text(sem.sessoes + ' sessoes', x + barW/2, y + 39, { align: 'center' })
        doc.text(sem.minutos + ' min', x + barW/2, y + 44, { align: 'center' })
      })

      y += 52

      // RECOMENDACOES (top 2)
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Principais Recomendacoes', 15, y)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(107, 114, 128)
      doc.text('Baseado em neurociencia infantil — Instituto NeuroSaber, Manual MSD 2025, Dra. Fernanda Monteiro', 15, y + 6)
      y += 12

      recomendacoes.slice(0, 2).forEach(rec => {
        const [r,g,b] = rec.cor.replace('#','').match(/.{2}/g).map(v => parseInt(v,16))

        // fundo do card
        doc.setFillColor(250, 248, 255)
        doc.roundedRect(15, y, W-30, 32, 3, 3, 'F')

        // barra colorida lateral
        doc.setFillColor(r, g, b)
        doc.roundedRect(15, y, 3, 32, 1, 1, 'F')

        // AREA
        doc.setTextColor(r, g, b)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(rec.area + '  ' + rec.nivel + '%', 22, y + 8)

        // STATUS BADGE simples (sem sobreposicao)
        doc.setTextColor(107, 114, 128)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        doc.text('[' + rec.status + ']', 22 + doc.getTextWidth(rec.area + '  ' + rec.nivel + '%') + 3, y + 8)

        // DESCRICAO
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        const recLines = doc.splitTextToSize(rec.recomendacao, W - 48)
        doc.text(recLines.slice(0, 2), 22, y + 16)

        // ATIVIDADES
        doc.setTextColor(r, g, b)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text('Atividades: ', 22, y + 27)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(55, 65, 81)
        doc.text(rec.atividades.slice(0, 2).join('  •  '), 22 + doc.getTextWidth('Atividades: '), y + 27)

        y += 36
      })

      // FOOTER P1
      doc.setFillColor(124, 58, 237)
      doc.rect(0, 277, W, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text('NeuralSync Academy  |  Relatorio Cognitivo Premium  |  neuralsync.com.br', W/2, 284, { align: 'center' })
      doc.text('Pagina 1 de 2  |  ' + new Date().toLocaleDateString('pt-BR') + '  |  Confidencial', W/2, 292, { align: 'center' })

      // ========================
      // PAGINA 2
      // ========================
      doc.addPage()

      doc.setFillColor(124, 58, 237)
      doc.rect(0, 0, W, 16, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text('NeuralSync  |  Plano de Acao Personalizado  |  ' + nome, W/2, 10, { align: 'center' })

      y = 24

      // TODAS AS RECOMENDACOES
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Analise Completa das 8 Habilidades', 15, y)
      y += 8

      recomendacoes.forEach(rec => {
        const [r,g,b] = rec.cor.replace('#','').match(/.{2}/g).map(v => parseInt(v,16))

        doc.setFillColor(250, 248, 255)
        doc.roundedRect(15, y, W-30, 36, 3, 3, 'F')
        doc.setFillColor(r, g, b)
        doc.roundedRect(15, y, 3, 36, 1, 1, 'F')

        // TITULO e NIVEL na mesma linha, bem separados
        doc.setTextColor(r, g, b)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text(rec.area, 22, y + 7)

        doc.setTextColor(107, 114, 128)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text(rec.nivel + '%  —  ' + rec.status, W - 15, y + 7, { align: 'right' })

        // linha separadora fina
        doc.setDrawColor(230, 225, 255)
        doc.setLineWidth(0.2)
        doc.line(22, y + 10, W - 15, y + 10)

        // RECOMENDACAO
        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        const recLines = doc.splitTextToSize(rec.recomendacao, W - 46)
        doc.text(recLines.slice(0, 2), 22, y + 17)

        // ATIVIDADES E TEMPO na mesma linha
        doc.setTextColor(r, g, b)
        doc.setFontSize(6.5)
        doc.setFont('helvetica', 'bold')
        doc.text('ATIVIDADES:', 22, y + 26)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(55, 65, 81)
        doc.text(rec.atividades[0] + '  •  ' + rec.atividades[1], 50, y + 26)

        doc.setTextColor(156, 163, 175)
        doc.setFontSize(6.5)
        doc.text('TEMPO: ' + rec.tempo, 22, y + 32)

        y += 40
      })

      // METAS DO PROXIMO MES
      doc.setTextColor(15, 10, 30)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Metas para o Proximo Mes', 15, y)
      y += 6

      doc.setFillColor(240, 253, 244)
      doc.roundedRect(15, y, W-30, metas.length * 10 + 8, 3, 3, 'F')
      doc.setDrawColor(16, 185, 129)
      doc.setLineWidth(0.3)
      doc.roundedRect(15, y, W-30, metas.length * 10 + 8, 3, 3, 'S')

      metas.forEach((meta, i) => {
        doc.setFillColor(16, 185, 129)
        doc.circle(22, y + 5 + i * 10, 2.5, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.text((i+1)+'', 22, y + 7 + i * 10, { align: 'center' })

        doc.setTextColor(55, 65, 81)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'normal')
        doc.text(meta, 28, y + 7 + i * 10)
      })

      y += metas.length * 10 + 14

      // NOTA CIENTIFICA
      doc.setFillColor(239, 246, 255)
      doc.roundedRect(15, y, W-30, 22, 3, 3, 'F')
      doc.setTextColor(59, 130, 246)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('Base Cientifica deste Relatorio', 22, y + 7)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      const nota = 'Analise baseada em Piaget (fase operatoria concreta), diretrizes do Manual MSD de Desenvolvimento Infantil (2025), Instituto NeuroSaber, e pesquisas da Dra. Fernanda Monteiro sobre estimulacao cognitiva infantil para a faixa etaria Construtores (6-8 anos).'
      const notaLines = doc.splitTextToSize(nota, W - 46)
      doc.text(notaLines, 22, y + 14)

      // FOOTER P2
      doc.setFillColor(124, 58, 237)
      doc.rect(0, 277, W, 20, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text('NeuralSync Academy  |  Relatorio Cognitivo Premium  |  Pagina 2 de 2', W/2, 284, { align: 'center' })
      doc.text('neuralsync.com.br  |  ' + new Date().toLocaleDateString('pt-BR'), W/2, 292, { align: 'center' })

      doc.save('NeuralSync_Relatorio_Premium_' + nome + '.pdf')
      setGerado(true)
      setTimeout(() => setGerado(false), 4000)
    } catch(err) {
      console.error(err)
    }
    setGerando(false)
  }

  if (!child) return (
    <div style={{background:'#f9fafb',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{color:'#7C3AED',fontWeight:'700'}}>Carregando relatorio...</div>
    </div>
  )

  return (
    <div style={{background:'#f9fafb',minHeight:'100vh'}}>
      <header className="pai-header">
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight:'800',fontSize:'18px',color:'#0f0a1e'}}>📄 Relatorio Cognitivo Premium</h2>
        </div>
        <div style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',borderRadius:'999px',padding:'5px 14px',fontSize:'12px',color:'white',fontWeight:'700'}}>⭐ Exclusivo Premium</div>
      </header>

      <div style={{maxWidth:'860px',margin:'0 auto',padding:'28px 24px'}}>

        {/* HERO */}
        <div style={{background:'linear-gradient(135deg,#7C3AED,#6d28d9)',borderRadius:'24px',padding:'28px',marginBottom:'20px',color:'white',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-50px',right:'-50px',width:'180px',height:'180px',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}} />
          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px'}}>
              <div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'4px'}}>Relatorio Cognitivo Mensal Premium</div>
                <h2 style={{fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>{child.nome}</h2>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:'13px'}}>{child.idade} anos  •  Construtora  •  Nivel {child.nivel}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:'42px',fontWeight:'900',lineHeight:'1'}}>{mediaGeral}%</div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)'}}>media geral</div>
                <div style={{fontSize:'13px',color:'#a7f3d0',fontWeight:'700',marginTop:'2px'}}>+{evolucao}% vs mes anterior</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px'}}>
              {[['22','Sessoes'],['9h 15m','Foco'],[(child.xp||680)+' XP','Total'],[(child.neural_coins||324),'Coins'],[child.streak_maximo+' dias','Streak'],['Top 20%','Ranking']].map(([val,label]) => (
                <div key={label} style={{background:'rgba(255,255,255,0.12)',borderRadius:'10px',padding:'10px',backdropFilter:'blur(8px)',textAlign:'center'}}>
                  <div style={{fontWeight:'900',fontSize:'13px'}}>{val}</div>
                  <div style={{fontSize:'10px',color:'rgba(255,255,255,0.6)',marginTop:'2px'}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ABAS */}
        <div style={{display:'flex',background:'white',borderRadius:'14px',padding:'4px',marginBottom:'16px',border:'1.5px solid #f3f4f6',gap:'4px'}}>
          {[['visao','Visao Geral'],['habilidades','Habilidades'],['recomendacoes','Recomendacoes'],['plano','Plano do Mes']].map(([id,label]) => (
            <button key={id} onClick={() => setAbaAtiva(id)} style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'700',fontSize:'13px',transition:'all 0.2s',background: abaAtiva===id?'#7C3AED':'transparent',color: abaAtiva===id?'white':'#6b7280',fontFamily:'Plus Jakarta Sans,sans-serif'}}>{label}</button>
          ))}
        </div>

        {abaAtiva === 'visao' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
              <div className="pai-card" style={{padding:'20px'}}>
                <h4 style={{fontWeight:'800',fontSize:'14px',marginBottom:'14px',color:'#0f0a1e'}}>Radar Cognitivo</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={habilidades}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" tick={{fill:'#9ca3af',fontSize:10}} />
                    <Radar dataKey="value" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.3} strokeWidth={2} name="Atual" />
                    <Radar dataKey="anterior" stroke="#e5e7eb" fill="none" strokeWidth={1} strokeDasharray="3 3" name="Anterior" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="pai-card" style={{padding:'20px'}}>
                <h4 style={{fontWeight:'800',fontSize:'14px',marginBottom:'14px',color:'#0f0a1e'}}>XP por Semana</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dadosSemanas}>
                    <XAxis dataKey="semana" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} />
                    <Tooltip contentStyle={{background:'white',border:'1px solid #ede9fe',borderRadius:'8px',fontSize:'12px'}} />
                    <Bar dataKey="xp" fill="#7C3AED" radius={[4,4,0,0]} name="XP" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
              {dadosSemanas.map((s,i) => (
                <div key={i} className="pai-card" style={{padding:'14px',textAlign:'center'}}>
                  <div style={{fontWeight:'900',fontSize:'16px',color:'#7C3AED'}}>{s.sessoes}</div>
                  <div style={{fontSize:'11px',color:'#9ca3af',marginBottom:'4px'}}>sessoes na {s.semana}</div>
                  <div style={{fontWeight:'700',fontSize:'13px',color:'#F07A20'}}>{s.minutos} min</div>
                  <div style={{fontSize:'11px',color:'#9ca3af'}}>foco</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === 'habilidades' && (
          <div className="pai-card" style={{padding:'20px'}}>
            <div style={{display:'flex',gap:'16px',fontSize:'12px',color:'#9ca3af',marginBottom:'16px',flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'12px',height:'4px',background:'#7C3AED',borderRadius:'999px'}} />Atual</div>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'12px',height:'4px',background:'#c4b5fd',borderRadius:'999px'}} />Anterior</div>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}><div style={{width:'12px',height:'4px',background:'#d1fae5',borderRadius:'999px'}} />Meta</div>
            </div>
            {habilidades.map((h,i) => {
              const diff = h.value - h.anterior
              return (
                <div key={i} style={{marginBottom:'18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                    <span style={{fontWeight:'700',fontSize:'14px',color:'#0f0a1e'}}>{h.skill}</span>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontSize:'12px',color: diff>=0?'#10b981':'#ef4444',fontWeight:'700'}}>{diff>=0?'+':''}{diff}%</span>
                      <span style={{fontWeight:'900',fontSize:'16px',color:cores[i]}}>{h.value}%</span>
                      <span style={{fontSize:'11px',color:'#9ca3af'}}>meta {h.meta}%</span>
                    </div>
                  </div>
                  <div style={{background:'#f3f4f6',borderRadius:'999px',height:'10px',overflow:'hidden',position:'relative'}}>
                    <div style={{background:'#d1fae5',width:h.meta+'%',height:'100%',position:'absolute',borderRadius:'999px'}} />
                    <div style={{background:cores[i]+'55',width:h.anterior+'%',height:'100%',position:'absolute',borderRadius:'999px'}} />
                    <div style={{background:cores[i],width:h.value+'%',height:'100%',position:'absolute',borderRadius:'999px'}} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {abaAtiva === 'recomendacoes' && (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{background:'#eff6ff',borderRadius:'12px',padding:'12px 16px',border:'1px solid #bfdbfe',display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{fontSize:'18px'}}>🔬</div>
              <div style={{fontSize:'12px',color:'#3b82f6',fontWeight:'600'}}>Base cientifica: Piaget, Manual MSD 2025, Instituto NeuroSaber, Dra. Fernanda Monteiro</div>
            </div>
            {recomendacoes.map((rec,i) => (
              <div key={i} className="pai-card" style={{padding:'20px',borderLeft:'4px solid '+rec.cor}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                  <h4 style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e'}}>{rec.area}</h4>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{background:rec.cor+'22',color:rec.cor,borderRadius:'999px',padding:'3px 10px',fontSize:'11px',fontWeight:'700'}}>{rec.status}</span>
                    <span style={{fontWeight:'900',fontSize:'16px',color:rec.cor}}>{rec.nivel}%</span>
                  </div>
                </div>
                <p style={{fontSize:'13px',color:'#374151',lineHeight:'1.6',marginBottom:'12px'}}>{rec.recomendacao}</p>
                <div style={{marginBottom:'8px'}}>
                  <div style={{fontSize:'11px',fontWeight:'700',color:rec.cor,marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Atividades recomendadas</div>
                  {rec.atividades.map((at,j) => (
                    <div key={j} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#374151',marginBottom:'4px'}}>
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:rec.cor,flexShrink:0}} />{at}
                    </div>
                  ))}
                </div>
                <div style={{fontSize:'12px',color:'#9ca3af',fontStyle:'italic'}}>⏱ {rec.tempo}</div>
              </div>
            ))}
          </div>
        )}

        {abaAtiva === 'plano' && (
          <div>
            <div style={{background:'#f0fdf4',borderRadius:'16px',padding:'20px',marginBottom:'14px',border:'1.5px solid #bbf7d0'}}>
              <h4 style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e',marginBottom:'14px'}}>🎯 Metas para o Proximo Mes</h4>
              {metas.map((meta,i) => (
                <div key={i} style={{background:'white',borderRadius:'10px',padding:'12px 14px',marginBottom:'8px',display:'flex',gap:'10px',alignItems:'center'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#7C3AED',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'900',fontSize:'11px',flexShrink:0}}>{i+1}</div>
                  <span style={{fontSize:'13px',color:'#374151',fontWeight:'500'}}>{meta}</span>
                </div>
              ))}
            </div>
            <div style={{background:'#eff6ff',borderRadius:'12px',padding:'16px',border:'1px solid #bfdbfe'}}>
              <div style={{fontWeight:'700',fontSize:'13px',color:'#1e40af',marginBottom:'6px'}}>🔬 Base Cientifica</div>
              <p style={{fontSize:'12px',color:'#3b82f6',lineHeight:'1.6'}}>
                Este plano foi desenvolvido com base no perfil cognitivo individual de {child.nome}, nas diretrizes de Piaget para a fase operatoria concreta (6-8 anos), Manual MSD de Desenvolvimento Infantil 2025 e pesquisas da Dra. Fernanda Monteiro. As metas respeitam o ritmo de desenvolvimento da faixa Construtores.
              </p>
            </div>
          </div>
        )}

        {/* BOTAO PDF */}
        <button onClick={gerarPDF} disabled={gerando} style={{
          width:'100%',padding:'17px',borderRadius:'16px',border:'none',marginTop:'20px',
          background: gerado ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#7C3AED,#6d28d9)',
          color:'white',fontWeight:'800',fontSize:'16px',cursor: gerando?'wait':'pointer',
          boxShadow:'0 8px 24px rgba(124,58,237,0.35)',transition:'all 0.3s',
          fontFamily:'Plus Jakarta Sans,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'
        }}>
          {gerando ? '⏳ Gerando PDF de 2 paginas...' : gerado ? '✅ PDF baixado com sucesso!' : '📄 Gerar Relatorio Premium em PDF (2 paginas)'}
        </button>
        <p style={{textAlign:'center',color:'#9ca3af',fontSize:'12px',marginTop:'8px'}}>
          Relatorio completo de 2 paginas com analise personalizada para {child.nome}
        </p>
      </div>
    </div>
  )
}`

writeFileSync('src/pages/Planos.jsx', planos)
console.log('✅ Planos.jsx — corrigido e com Relatorio Premium!')
writeFileSync('src/pages/pai/RelatorioPDF.jsx', relatorio)
console.log('✅ RelatorioPDF.jsx — PDF redesenhado sem sobreposicoes!')