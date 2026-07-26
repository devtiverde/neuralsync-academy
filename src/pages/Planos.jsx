import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain } from '@phosphor-icons/react'

const kiwifyLinks = {
  starter: { mensal: 'https://pay.kiwify.com.br/a6qaMFN', anual: 'https://pay.kiwify.com.br/JXQgU9V' },
  familia: { mensal: 'https://pay.kiwify.com.br/lRk8jxI', anual: 'https://pay.kiwify.com.br/6fGqaVh' },
  premium: { mensal: 'https://pay.kiwify.com.br/CapcmAU', anual: 'https://pay.kiwify.com.br/4abmLbG' },
}

const precos = {
  starter: { mensal: 29,  anual: 19 },
  familia: { mensal: 47,  anual: 32 },
  premium: { mensal: 79,  anual: 54 },
}

const FEATURES = [
  'Trilha de atividades semanal',
  'NeuralSync Kids — vídeos educativos',
  'Timer e controle de uso',
  'Agenda semanal',
  'Relatório básico mensal',
  'Loja de NeuralCoins',
  'Relatório semanal detalhado',
  'Ebook A Tela Certa + bônus',
  'Ranking entre famílias',
  'Relatório Cognitivo Premium PDF',
  'Inventor IA — feedback criativo',
  'NeuralAI + Quiz IA',
]

const planos = [
  {
    id: 'starter',
    nome: 'Starter',
    filhos: '1 filho',
    desc: 'Para começar com o pé direito',
    ok: [true, true, true, true, false, false, false, false, false, false, false, false],
    border: '1.5px solid #e5e7eb',
    bg: 'white',
    headerBg: '#f9fafb',
    badge: null,
    badgeBg: null,
    ctaVariant: 'secondary',
    ctaLabel: 'Assinar com garantia',
  },
  {
    id: 'familia',
    nome: 'Família',
    filhos: 'Até 3 filhos',
    desc: 'O preferido das famílias brasileiras',
    ok: [true, true, true, true, true, true, true, true, true, false, false, false],
    border: '2px solid #7C3AED',
    bg: 'white',
    headerBg: '#faf5ff',
    badge: 'MAIS POPULAR',
    badgeBg: '#7C3AED',
    badgeCor: 'white',
    ctaVariant: 'violet',
    ctaLabel: 'Assinar Família',
  },
  {
    id: 'premium',
    nome: 'Premium',
    filhos: 'Filhos ilimitados',
    desc: 'Experiência completa com IA',
    ok: [true, true, true, true, true, true, true, true, true, true, true, true],
    border: '2px solid transparent',
    borderGrad: true,
    bg: 'white',
    headerBg: '#fff7ed',
    badge: 'COMPLETO',
    badgeBg: 'linear-gradient(135deg, #f59e0b, #f97316)',
    badgeCor: 'white',
    ctaVariant: 'orange',
    ctaLabel: 'Assinar Premium',
  },
]

const faq = [
  ['Posso cancelar a qualquer momento?', 'Sim. Sem fidelidade, sem multa. Cancele quando quiser pelo painel do Kiwify (dashboard.kiwify.com.br/minhas-compras) ou pelo link "Gerenciar assinatura" no e-mail de confirmação da compra.'],
  ['Como funciona a garantia de 7 dias?', 'Se em até 7 dias você não ficar satisfeito, devolvemos 100% do valor pago — é só pedir o reembolso em reembolso.kiwify.com.br. Sem perguntas.'],
  ['Posso mudar de plano depois?', 'Sim, upgrade ou downgrade a qualquer momento. A diferença é cobrada proporcionalmente.'],
  ['Como funciona o plano anual?', 'Você paga 12 meses de uma vez e economiza até 35% em relação ao preço mensal. O desconto varia por plano: 34,5% no Starter, 31,9% no Família e 31,6% no Premium — o equivalente a cerca de 4 meses grátis por ano.'],
  ['O que é o Relatório Cognitivo Premium?', 'Relatório PDF com análise das 8 habilidades cognitivas do seu filho, comparativo mensal, recomendações de neurociência e plano de ação. Exclusivo do Premium.'],
]

export default function Planos() {
  const navigate = useNavigate()
  const [periodo, setPeriodo] = useState('mensal')
  const [faqAberto, setFaqAberto] = useState(null)

  return (
    <div style={{ background: '#f8f7ff', minHeight: '100vh', color: '#1E1B4B', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>

      {/* ── HEADER ──────────────────────────────────── */}
      <header style={{ background: 'white', borderBottom: '1px solid #ede9fe', padding: '0 clamp(16px, 4vw, 40px)', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 8px rgba(124,58,237,0.06)', gap: 8 }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#7C3AED,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Brain weight="fill" size={20} color="white" /></div>
          <span style={{ fontWeight: 900, fontSize: 17 }}>
            <span style={{ color: '#1E1B4B' }}>NeuralSync </span>
            <span style={{ color: '#7C3AED' }}>Academy</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => navigate('/auth')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Entrar</button>
          <button
            onClick={() => window.open(kiwifyLinks.familia[periodo], '_blank')}
            style={{ background: '#7C3AED', border: 'none', borderRadius: 999, padding: '10px 22px', color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 700, boxShadow: '0 4px 14px rgba(124,58,237,0.3)', fontFamily: 'inherit' }}
          >
            {/* dizia só "Começar agora" e levava ao checkout do Família — quem tinha
                acabado de ler o card do Premium era mandado para outro plano */}
            Assinar o Família →
          </button>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '80px 24px 40px', background: 'linear-gradient(160deg, #faf5ff 0%, #ede9fe 60%, #e0f2fe 100%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: '#c2410c', marginBottom: 24, fontWeight: 700 }}>
          🔥 Preço de Lançamento — por tempo limitado
        </div>

        {/* clamp em vez de 52px fixo: como o html tem `overflow-x: hidden`, um título
            largo demais era CORTADO em silêncio no celular em vez de gerar rolagem */}
        <h1 style={{ fontSize: 'clamp(30px, 7vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.05, color: '#1E1B4B' }}>
          Cada minuto de tela<br />
          <span style={{ color: '#7C3AED' }}>pode virar inteligência</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: 17, marginBottom: 14, maxWidth: 500, margin: '0 auto 14px', lineHeight: 1.7 }}>
          Plataforma com neurociência aplicada que transforma o tempo de tela em desenvolvimento cognitivo real.
        </p>
        <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 40 }}>
          ✓ 7 dias de garantia &nbsp;·&nbsp; ✓ Cancele quando quiser &nbsp;·&nbsp; ✓ Sem fidelidade
        </p>

        {/* Toggle mensal/anual */}
        <div style={{ display: 'inline-flex', background: 'white', borderRadius: 14, padding: 4, border: '2px solid #7C3AED', boxShadow: '0 4px 16px rgba(124,58,237,0.15)', marginBottom: 8 }}>
          {/* rótulo curto: "Anual — Economize até 35%" com padding de 28px empurrava
              o botão Anual para fora da tela no celular, deixando o preço anual
              inacessível justamente para quem mais compra pelo telefone */}
          {[['mensal', 'Mensal'], ['anual', 'Anual −35%']].map(([id, label]) => (
            <button key={id} onClick={() => setPeriodo(id)} style={{
              padding: '12px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 800, fontSize: 14, transition: 'all 0.2s', fontFamily: 'inherit',
              background: periodo === id ? '#7C3AED' : 'transparent',
              color: periodo === id ? 'white' : '#6b7280',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {label}
              {id === 'anual' && periodo === 'anual' && (
                <span style={{ background: '#d1fae5', color: '#065f46', borderRadius: 999, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>✓ Ativo</span>
              )}
            </button>
          ))}
        </div>
        <p style={{ color: '#9ca3af', fontSize: 13, marginTop: 8 }}>
          {periodo === 'mensal' ? 'Cobrado mensalmente • Cancele quando quiser' : 'Cobrado anualmente • Economia de até 35% no ano'}
        </p>
      </section>

      {/* ── PLANOS CARDS ────────────────────────────── */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1060, margin: '-20px auto 0' }}>
        <div className="planos-pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'start' }}>
          {planos.map((p, idx) => {
            const preco = precos[p.id][periodo]
            const wrapStyle = {
              background: p.bg,
              borderRadius: 24,
              overflow: 'hidden',
              position: 'relative',
              marginTop: idx === 1 ? -12 : 0,
              // gradient border for premium via box-shadow hack
              ...(p.borderGrad
                ? { boxShadow: '0 0 0 2px transparent, 0 20px 48px rgba(249,115,22,0.18)', background: 'white', outline: '2px solid transparent' }
                : { border: p.border, boxShadow: idx === 1 ? '0 16px 48px rgba(124,58,237,0.18)' : '0 4px 16px rgba(0,0,0,0.06)' }),
            }

            // Premium gradient border via wrapper
            const inner = (
              <div style={{ background: p.bg, borderRadius: p.borderGrad ? 22 : 0, overflow: 'hidden', height: '100%' }}>
                {/* Header */}
                <div style={{ background: p.headerBg, padding: '28px 28px 20px', borderBottom: '1px solid #f3f4f6', position: 'relative' }}>
                  {p.badge && (
                    <div style={{ position: 'absolute', top: -1, right: 20, background: p.badgeBg, color: p.badgeCor, fontSize: 10, fontWeight: 800, padding: '5px 14px', borderRadius: '0 0 10px 10px', letterSpacing: '0.5px', boxShadow: idx === 2 ? '0 4px 12px rgba(249,115,22,0.35)' : '0 4px 12px rgba(124,58,237,0.25)' }}>
                      {p.badge}
                    </div>
                  )}
                  <div style={{ marginBottom: 14 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#1E1B4B', marginBottom: 3 }}>{p.nome}</h3>
                    <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>{p.desc}</p>
                    <span style={{ background: idx === 1 ? '#ede9fe' : idx === 2 ? '#ffedd5' : '#f3f4f6', color: idx === 1 ? '#7C3AED' : idx === 2 ? '#f97316' : '#374151', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>
                      👤 {p.filhos}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 600, marginBottom: 5 }}>R$</span>
                    <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-2px', color: '#1E1B4B', lineHeight: 1, fontFamily: '"Space Grotesk", sans-serif' }}>{preco}</span>
                    <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 600, marginBottom: 5 }}>/mês</span>
                  </div>
                  {periodo === 'anual' && (
                    <p style={{ fontSize: 12, color: '#9ca3af' }}>R$ {preco * 12}/ano — cobrado anualmente</p>
                  )}

                  {/* CTA button */}
                  <button
                    onClick={() => window.open(kiwifyLinks[p.id][periodo], '_blank')}
                    style={{
                      width: '100%', marginTop: 18, padding: '13px', borderRadius: 12, border: 'none', fontFamily: 'inherit',
                      fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                      ...(p.ctaVariant === 'violet'
                        ? { background: '#7C3AED', color: 'white', boxShadow: '0 4px 14px rgba(124,58,237,0.3)' }
                        : p.ctaVariant === 'orange'
                        ? { background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }
                        : { background: 'white', color: '#7C3AED', border: '1.5px solid #7C3AED' }),
                    }}
                    onMouseOver={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
                  >
                    {p.ctaLabel} →
                  </button>
                </div>

                {/* Features list */}
                <div style={{ padding: '22px 28px 28px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>O que está incluso</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {FEATURES.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {p.ok[i] ? (
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 11, color: '#10b981', fontWeight: 800 }}>✓</span>
                          </div>
                        ) : (
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 11, color: '#d1d5db' }}>—</span>
                          </div>
                        )}
                        <span style={{ fontSize: 13, color: p.ok[i] ? '#374151' : '#d1d5db', fontWeight: p.ok[i] ? 500 : 400 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )

            return (
              <div key={p.id} style={wrapStyle}>
                {p.borderGrad ? (
                  <div style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', padding: 2, borderRadius: 24, boxShadow: '0 20px 48px rgba(249,115,22,0.18)' }}>
                    {inner}
                  </div>
                ) : inner}
              </div>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, marginTop: 24 }}>
          ✓ 7 dias de garantia total &nbsp;·&nbsp; ✓ Cancele quando quiser &nbsp;·&nbsp; ✓ Sem fidelidade
        </p>
      </section>

      {/* ── RELATÓRIO PREMIUM DESTAQUE ──────────────── */}
      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div className="planos-promo-grid" style={{ background: 'linear-gradient(135deg, #7C3AED, #5b21b6)', borderRadius: 24, padding: '40px 44px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '5px 14px', fontSize: 12, color: 'white', fontWeight: 700, marginBottom: 20 }}>
              ⭐ Exclusivo Premium
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 14, letterSpacing: '-0.5px', lineHeight: 1.25 }}>
              Relatório Cognitivo<br />Premium em PDF
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.8, marginBottom: 22 }}>
              Análise completa gerada automaticamente com as 8 habilidades cognitivas do seu filho, comparativo mensal e plano de ação personalizado baseado em neurociência.
            </p>
            {['Análise das 8 habilidades cognitivas', 'Comparativo com mês anterior', 'Recomendações de especialistas', 'Plano de ação para o próximo mês'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', flexShrink: 0 }}>✓</div>
                {item}
              </div>
            ))}
          </div>

          {/* Mini PDF preview */}
          <div style={{ background: 'white', borderRadius: 18, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: '#1E1B4B' }}>Relatório — Sofia</div>
              <div style={{ background: '#d1fae5', color: '#065f46', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>+18% este mês</div>
            </div>
            {[['Concentração', 80, '#7C3AED'], ['Lógica', 75, '#10b981'], ['Memória', 68, '#3b82f6'], ['Criatividade', 72, '#f97316']].map(([label, val, cor]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: '#374151', fontWeight: 600 }}>{label}</span>
                  <span style={{ color: cor, fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif' }}>{val}%</span>
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: 999, height: 7, overflow: 'hidden' }}>
                  <div style={{ background: cor, width: val + '%', height: '100%', borderRadius: 999 }} />
                </div>
              </div>
            ))}
            <p style={{ marginTop: 14, fontSize: 11, color: '#9ca3af', textAlign: 'center', lineHeight: 1.5 }}>
              Exemplo ilustrativo. O relatório real é gerado com os dados do seu filho.
            </p>
          </div>
        </div>
      </section>

      {/* ── TABELA COMPARATIVA ──────────────────────── */}
      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: 12 }}>Comparação completa</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', color: '#1E1B4B' }}>O que está incluso em cada plano</h2>
        </div>
        <div style={{ overflowX: 'auto', borderRadius: 20, border: '1.5px solid #ede9fe', boxShadow: '0 4px 16px rgba(124,58,237,0.06)' }}>
          <div style={{ background: 'white', minWidth: 560 }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#faf5ff', borderBottom: '1.5px solid #ede9fe' }}>
              <div style={{ padding: '16px 22px', fontWeight: 700, fontSize: 13, color: '#6b7280' }}>Funcionalidade</div>
              {[['🌱', 'Starter', '#374151'], ['👨‍👧‍👦', 'Família', '#7C3AED'], ['🚀', 'Premium', '#f97316']].map(([emoji, nome, cor]) => (
                <div key={nome} style={{ padding: 16, textAlign: 'center', fontWeight: 800, fontSize: 13, color: cor }}>{emoji} {nome}</div>
              ))}
            </div>

            {FEATURES.map((feat, i) => {
              const vals = [planos[0].ok[i], planos[1].ok[i], planos[2].ok[i]]
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: i < FEATURES.length - 1 ? '1px solid #f9fafb' : 'none', background: i % 2 === 0 ? 'white' : '#fdfcff' }}>
                  <div style={{ padding: '13px 22px', fontSize: 13, color: '#374151', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {feat}
                    {feat === 'NeuralAI + Quiz IA' && (
                      <span style={{ background: 'linear-gradient(135deg,#06b6d4,#7C3AED)', color: 'white', borderRadius: 999, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>IA</span>
                    )}
                  </div>
                  {vals.map((ok, j) => (
                    <div key={j} style={{ padding: 13, textAlign: 'center' }}>
                      {ok
                        ? <span style={{ fontSize: 14, color: '#10b981', fontWeight: 800 }}>✓</span>
                        : <span style={{ fontSize: 14, color: '#d1d5db' }}>—</span>}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section style={{ padding: '0 24px 80px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: 12 }}>Dúvidas</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', color: '#1E1B4B' }}>Perguntas frequentes</h2>
        </div>
        {faq.map(([pergunta, resposta], i) => (
          <div key={i} style={{ background: 'white', borderRadius: 14, marginBottom: 10, border: '1.5px solid #ede9fe', boxShadow: '0 2px 8px rgba(124,58,237,0.04)', overflow: 'hidden' }}>
            <button
              onClick={() => setFaqAberto(faqAberto === i ? null : i)}
              style={{ width: '100%', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: 'inherit' }}
            >
              <span style={{ fontWeight: 700, fontSize: 14, color: '#1E1B4B', textAlign: 'left', lineHeight: 1.4 }}>{pergunta}</span>
              <span style={{ fontSize: 20, color: '#7C3AED', flexShrink: 0, transition: 'transform 0.2s', transform: faqAberto === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {faqAberto === i && (
              <div style={{ padding: '0 22px 18px', fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{resposta}</div>
            )}
          </div>
        ))}
      </section>

      {/* ── CTA FINAL ───────────────────────────────── */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'linear-gradient(160deg, #faf5ff, #ede9fe)' }}>
        <h2 style={{ fontSize: 'clamp(26px, 6vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.1, color: '#1E1B4B' }}>
          Comece hoje.<br />
          <span style={{ color: '#7C3AED' }}>7 dias de garantia.</span>
        </h2>
        <p style={{ color: '#6b7280', fontSize: 16, marginBottom: 36 }}>Sem risco. Cancele quando quiser.</p>
        <button
          onClick={() => window.open(kiwifyLinks.familia[periodo], '_blank')}
          style={{ background: 'linear-gradient(135deg,#7C3AED,#5b21b6)', border: 'none', borderRadius: 16, padding: '18px 44px', color: 'white', cursor: 'pointer', fontWeight: 800, fontSize: 18, boxShadow: '0 8px 30px rgba(124,58,237,0.35)', fontFamily: 'inherit', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,58,237,0.45)' }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.35)' }}
        >
          Assinar o Família →
        </button>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 15, color: '#1E1B4B', marginBottom: 4 }}>NeuralSync Academy</div>
          <div style={{ color: '#9ca3af', fontSize: 13 }}>Tempo de tela que vira inteligência.</div>
        </div>
        {/* 5 links numa linha só passavam 12px da borda em 360px — o "Entrar",
            que é justamente o último, ficava sem como alcançar. */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, rowGap: 12, justifyContent: 'center' }}>
          {[['Home', '/'], ['Planos', '/planos'], ['Termos', '/termos'], ['Privacidade', '/privacidade'], ['Entrar', '/auth']].map(([label, path]) => (
            <button key={path} onClick={() => navigate(path)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 13, cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>{label}</button>
          ))}
        </div>
      </footer>
    </div>
  )
}
