import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const depoimentos = [
  ["Minha filha pediu para fazer mais um desafio do cérebro antes de dormir. Não acreditei!","🌸","Marina S.","Mãe da Sofia, 7 anos"],
  ["O relatório semanal me mostra exatamente em quais habilidades ele evoluiu. É surreal.","🐯","Rafael P.","Pai do Bento, 10 anos"],
  ["Substituí 30 minutos de YouTube por NeuralSync. Diferença visível em duas semanas.","🦊","Camila R.","Mãe do Theo, 5 anos"]
]

export default function Landing() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) navigate('/dashboard')
  }, [user, loading])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.textContent = [
      '@keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }',
      '@keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }',
      '@keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }',
      '.badge-float-1{animation:float1 3s ease-in-out infinite}',
      '.badge-float-2{animation:float2 3s ease-in-out infinite 1.5s}',
      '.hero-text{animation:fadeInUp 0.7s ease forwards}',
      '.hero-card{animation:fadeInUp 0.7s ease 0.2s forwards;opacity:0}',
      '.btn-primary{background:linear-gradient(135deg,#7C3AED,#6d28d9);border:none;border-radius:12px;padding:14px 28px;color:white;cursor:pointer;font-weight:700;font-size:16px;box-shadow:0 4px 20px rgba(124,58,237,0.35);transition:all 0.2s;font-family:Plus Jakarta Sans,sans-serif}',
      '.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,58,237,0.5)}',
      '.btn-secondary{background:white;border:1.5px solid #e5e7eb;border-radius:12px;padding:14px 28px;color:#1a1a2e;font-weight:600;font-size:16px;cursor:pointer;text-decoration:none;display:flex;align-items:center;transition:all 0.2s;font-family:Plus Jakarta Sans,sans-serif}',
      '.btn-secondary:hover{border-color:#7C3AED;color:#7C3AED;transform:translateY(-2px)}',
      '.benefit-card{background:white;border-radius:16px;padding:24px;border:1.5px solid #ede9fe;transition:all 0.25s}',
      '.benefit-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(124,58,237,0.12);border-color:#c4b5fd}',
      '.age-card{background:white;border-radius:20px;padding:28px;border:1.5px solid #f3f4f6;transition:all 0.25s}',
      '.age-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.1)}',
      '.dep-card{background:white;border-radius:20px;padding:28px;border:1.5px solid #f3f4f6;transition:all 0.25s}',
      '.dep-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(124,58,237,0.1);border-color:#ede9fe}',
      '.nav-link{color:#555;text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s;font-family:Plus Jakarta Sans,sans-serif}',
      '.nav-link:hover{color:#7C3AED}',
      '*{font-family:Plus Jakarta Sans,sans-serif;box-sizing:border-box}',
    ].join(' ')
    document.head.appendChild(style)
  }, [])

  return (
    <div style={{background:'#fff',color:'#0f0a1e',minHeight:'100vh'}}>

      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:50,background:'rgba(255,255,255,0.9)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(0,0,0,0.06)',padding:'14px 48px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'10px',background:'linear-gradient(135deg,#7C3AED,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px'}}>🧠</div>
          <span style={{fontWeight:'800',fontSize:'18px'}}>
            <span style={{color:'#0f0a1e'}}>NeuralSync </span>
            <span style={{color:'#7C3AED'}}>Academy</span>
          </span>
        </div>
        <nav style={{display:'flex',gap:'32px',alignItems:'center'}}>
          {[['Como funciona','#como'],['Benefícios','#beneficios'],['Idades','#idades'],['Depoimentos','#depoimentos']].map(([label,href]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
          <a onClick={() => navigate('/planos')} className="nav-link" style={{cursor:'pointer',color:'#7C3AED',fontWeight:'700'}}>Preços</a>
          <button onClick={() => navigate('/auth')} style={{background:'none',border:'none',color:'#0f0a1e',cursor:'pointer',fontSize:'14px',fontWeight:'600',padding:'8px 16px',borderRadius:'8px'}}>Entrar</button>
          <button onClick={() => navigate('/planos')} className="btn-primary" style={{padding:'10px 22px',fontSize:'14px',borderRadius:'999px'}}>Começar grátis</button>
        </nav>
      </header>

      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:'130px 80px 100px',background:'linear-gradient(145deg,#faf5ff 0%,#ede9fe 30%,#e0f2fe 65%,#d1fae5 100%)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'flex',gap:'80px',alignItems:'center',width:'100%'}}>
          <div style={{flex:1}} className="hero-text">
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#d1fae5',border:'1px solid #6ee7b7',borderRadius:'999px',padding:'7px 16px',fontSize:'13px',color:'#065f46',marginBottom:'32px',fontWeight:'600'}}>
              Nova era da educação infantil
            </div>
            <h1 style={{fontSize:'72px',fontWeight:'900',lineHeight:'1.0',marginBottom:'28px',letterSpacing:'-2.5px',color:'#0f0a1e'}}>
              Tempo de tela<br />que vira<br />
              <span style={{color:'#7C3AED'}}>inteligência.</span>
            </h1>
            <p style={{fontSize:'18px',color:'#6b7280',lineHeight:'1.75',marginBottom:'40px',maxWidth:'460px'}}>
              Atividades gamificadas que desenvolvem lógica, criatividade, comunicação e pensamento computacional para crianças de 3 a 17 anos.
            </p>
            <div style={{display:'flex',gap:'14px',marginBottom:'48px',flexWrap:'wrap'}}>
              <button onClick={() => navigate('/planos')} className="btn-primary" style={{fontSize:'16px',padding:'15px 32px'}}>Começar grátis</button>
              <a href="#como" className="btn-secondary">Como funciona</a>
            </div>
            <div style={{display:'flex',gap:'28px',flexWrap:'wrap'}}>
              {[['Sem anúncios','🚫'],['Aprovado por pais','❤️'],['4.9/5 avaliação','⭐']].map(([label,icon]) => (
                <div key={label} style={{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',color:'#9ca3af',fontWeight:'500'}}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{flex:1,display:'flex',justifyContent:'center',position:'relative',paddingTop:'40px',paddingBottom:'40px'}} className="hero-card">
            <div className="badge-float-1" style={{position:'absolute',top:'0px',left:'20px',zIndex:10,background:'white',borderRadius:'14px',padding:'10px 16px',boxShadow:'0 8px 32px rgba(0,0,0,0.12)',display:'flex',alignItems:'center',gap:'10px',fontSize:'13px',fontWeight:'700'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'linear-gradient(135deg,#F07A20,#ff9500)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🏆</div>
              <div>
                <div style={{color:'#0f0a1e',fontSize:'13px'}}>+50 XP</div>
                <div style={{color:'#9ca3af',fontWeight:'500',fontSize:'12px'}}>Quiz lógico</div>
              </div>
            </div>

            <div style={{background:'white',borderRadius:'28px',padding:'28px',width:'350px',boxShadow:'0 24px 64px rgba(0,0,0,0.10)',border:'1px solid rgba(0,0,0,0.04)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'22px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'50px',height:'50px',borderRadius:'16px',background:'linear-gradient(135deg,#F07A20,#ff9500)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>🦊</div>
                  <div>
                    <div style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e'}}>Lia, 8 anos</div>
                    <div style={{fontSize:'13px',color:'#7C3AED',fontWeight:'600'}}>Nível 12 · Construtora</div>
                  </div>
                </div>
                <div style={{background:'linear-gradient(135deg,#F07A20,#ff9500)',borderRadius:'999px',padding:'5px 12px',fontSize:'12px',color:'white',fontWeight:'700'}}>7 dias</div>
              </div>

              <div style={{background:'#f9fafb',borderRadius:'14px',padding:'16px',marginBottom:'14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'#9ca3af',marginBottom:'10px',fontWeight:'500'}}>
                  <span>XP para próximo nível</span>
                  <span style={{fontWeight:'700',color:'#0f0a1e'}}>680 / 800</span>
                </div>
                <div style={{background:'#e5e7eb',borderRadius:'999px',height:'8px',overflow:'hidden'}}>
                  <div style={{background:'linear-gradient(90deg,#7C3AED,#a78bfa)',width:'85%',height:'100%',borderRadius:'999px'}} />
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
                {[['NeuroCoins','324','#F07A20','⚡'],['Conquistas','14','#7C3AED','🏆']].map(([label,val,cor,icon]) => (
                  <div key={label} style={{background:'#f9fafb',borderRadius:'14px',padding:'14px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'6px'}}>
                      <div style={{width:'26px',height:'26px',borderRadius:'8px',background:cor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px'}}>{icon}</div>
                      <span style={{fontSize:'12px',color:'#9ca3af',fontWeight:'500'}}>{label}</span>
                    </div>
                    <div style={{fontWeight:'900',fontSize:'22px',color:'#0f0a1e'}}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{background:'#f9fafb',borderRadius:'14px',padding:'16px'}}>
                <div style={{fontSize:'12px',color:'#9ca3af',marginBottom:'12px',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.5px'}}>Habilidades cognitivas</div>
                {[['Lógica',78,'#7C3AED'],['Criatividade',92,'#ef4444'],['Memória',64,'#3b82f6'],['Comunicação',71,'#10b981']].map(([label,val,cor]) => (
                  <div key={label} style={{marginBottom:'9px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'4px'}}>
                      <span style={{color:'#4b5563',fontWeight:'500'}}>{label}</span>
                      <span style={{color:cor,fontWeight:'700'}}>{val}%</span>
                    </div>
                    <div style={{background:'#e5e7eb',borderRadius:'999px',height:'5px',overflow:'hidden'}}>
                      <div style={{background:cor,width:val+'%',height:'100%',borderRadius:'999px'}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="badge-float-2" style={{position:'absolute',bottom:'0px',right:'10px',zIndex:10,background:'white',borderRadius:'14px',padding:'10px 16px',boxShadow:'0 8px 32px rgba(0,0,0,0.12)',display:'flex',alignItems:'center',gap:'10px',fontSize:'13px',fontWeight:'700'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'linear-gradient(135deg,#7C3AED,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>🎯</div>
              <div>
                <div style={{color:'#0f0a1e',fontSize:'13px'}}>Nova conquista!</div>
                <div style={{color:'#9ca3af',fontWeight:'500',fontSize:'12px'}}>Pensador rápido</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'#faf5ff',borderTop:'1px solid #ede9fe',borderBottom:'1px solid #ede9fe',padding:'52px 40px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px',textAlign:'center'}}>
          {[['+50.000','Crianças ativas'],['8','Habilidades trabalhadas'],['200+','Atividades semanais'],['4.9','Avaliação dos pais']].map(([num,label]) => (
            <div key={label}>
              <div style={{fontSize:'38px',fontWeight:'900',color:'#7C3AED',marginBottom:'6px',letterSpacing:'-1px'}}>{num}</div>
              <div style={{fontSize:'14px',color:'#9ca3af',fontWeight:'500'}}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="como" style={{padding:'110px 40px',maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'14px',textTransform:'uppercase',letterSpacing:'2px'}}>Como funciona</div>
          <h2 style={{fontSize:'44px',fontWeight:'900',letterSpacing:'-1.5px',color:'#0f0a1e',lineHeight:'1.1'}}>Três passos para uma mente brilhante</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px'}}>
          {[
            ['1','Crie o perfil do seu filho','Personalize avatar, idade e nome em segundos.','👤'],
            ['2','Receba missões diárias','Atividades curtas que estimulam o cérebro de forma divertida.','🎯'],
            ['3','Acompanhe a evolução','Relatórios visuais para os pais semanais e mensais.','📊']
          ].map(([num,titulo,desc,icon]) => (
            <div key={num} style={{background:'#faf5ff',borderRadius:'22px',padding:'36px',border:'1.5px solid #ede9fe'}}>
              <div style={{width:'52px',height:'52px',borderRadius:'16px',background:'linear-gradient(135deg,#7C3AED,#6d28d9)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'22px',fontWeight:'900',marginBottom:'24px',boxShadow:'0 4px 16px rgba(124,58,237,0.3)'}}>{num}</div>
              <div style={{fontSize:'28px',marginBottom:'14px'}}>{icon}</div>
              <h3 style={{fontWeight:'800',fontSize:'18px',marginBottom:'10px',color:'#0f0a1e'}}>{titulo}</h3>
              <p style={{color:'#6b7280',fontSize:'14px',lineHeight:'1.7'}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="beneficios" style={{padding:'110px 40px',background:'#faf5ff'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'64px'}}>
            <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'14px',textTransform:'uppercase',letterSpacing:'2px'}}>Benefícios</div>
            <h2 style={{fontSize:'44px',fontWeight:'900',letterSpacing:'-1.5px',color:'#0f0a1e',lineHeight:'1.1'}}>8 habilidades cognitivas em um único lugar</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}}>
            {[
              ['🧠','Raciocínio lógico','Quebra-cabeças e desafios que treinam o pensamento estruturado.'],
              ['🎨','Criatividade','Atividades abertas que desenvolvem imaginação e originalidade.'],
              ['🔧','Resolução de problemas','Cenários reais que estimulam soluções múltiplas.'],
              ['💻','Pensamento computacional','Lógica de algoritmos e sequências de forma lúdica.'],
              ['🎯','Concentração','Treinos de atenção sustentada adaptados por idade.'],
              ['❤️','Inteligência emocional','Reconhecimento de emoções e empatia através do jogo.'],
              ['🐘','Memória','Exercícios de retenção e recall adaptados por faixa etária.'],
              ['💬','Comunicação','Atividades de expressão oral e escrita criativas.']
            ].map(([icon,titulo,desc]) => (
              <div key={titulo} className="benefit-card">
                <div style={{fontSize:'30px',marginBottom:'14px'}}>{icon}</div>
                <h4 style={{fontWeight:'700',fontSize:'15px',marginBottom:'8px',color:'#0f0a1e'}}>{titulo}</h4>
                <p style={{color:'#6b7280',fontSize:'13px',lineHeight:'1.65'}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="idades" style={{padding:'110px 40px',maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'14px',textTransform:'uppercase',letterSpacing:'2px'}}>Para todas as idades</div>
          <h2 style={{fontSize:'44px',fontWeight:'900',letterSpacing:'-1.5px',color:'#0f0a1e',lineHeight:'1.1'}}>Conteúdo adaptado para cada fase</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px'}}>
          {[
            ['🌱','Exploradores','3 a 5 anos','Cores, sons, formas e primeiras conexões lógicas.','#4CAF50'],
            ['🧩','Construtores','6 a 8 anos','Quebra-cabeças, sequências e introdução ao código.','#7C3AED'],
            ['🎨','Criadores','9 a 11 anos','Projetos abertos, lógica avançada e criatividade.','#F07A20'],
            ['🚀','Inventores','12+ anos','Programação, pensamento crítico e desafios complexos.','#3b82f6']
          ].map(([emoji,nome,idade,desc,cor]) => (
            <div key={nome} className="age-card" style={{borderTop:'3px solid '+cor}}>
              <div style={{fontSize:'44px',marginBottom:'18px'}}>{emoji}</div>
              <h3 style={{fontWeight:'800',fontSize:'18px',marginBottom:'6px',color:'#0f0a1e'}}>{nome}</h3>
              <div style={{color:cor,fontSize:'13px',fontWeight:'700',marginBottom:'12px'}}>{idade}</div>
              <p style={{color:'#6b7280',fontSize:'13px',lineHeight:'1.65'}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'110px 40px',background:'#faf5ff'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'72px',alignItems:'center'}}>
          <div>
            <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'14px',textTransform:'uppercase',letterSpacing:'2px'}}>Painel dos pais</div>
            <h2 style={{fontSize:'38px',fontWeight:'900',letterSpacing:'-1px',marginBottom:'20px',lineHeight:'1.15',color:'#0f0a1e'}}>Veja o cérebro do seu filho crescendo em tempo real</h2>
            <p style={{color:'#6b7280',fontSize:'15px',lineHeight:'1.75',marginBottom:'32px'}}>Relatórios semanais e mensais com a evolução em cada habilidade cognitiva.</p>
            {['Gráficos de evolução por habilidade','Resumo de tempo bem gasto na semana','Conquistas desbloqueadas e missões','Recomendações personalizadas'].map(item => (
              <div key={item} style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px',fontSize:'14px',color:'#374151'}}>
                <div style={{width:'22px',height:'22px',borderRadius:'6px',background:'#ede9fe',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',color:'#7C3AED',fontWeight:'700',flexShrink:0}}>✓</div>
                {item}
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'28px',padding:'32px',border:'1.5px solid #ede9fe',boxShadow:'0 16px 48px rgba(124,58,237,0.08)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <div style={{fontWeight:'800',color:'#0f0a1e',fontSize:'15px'}}>Evolução semanal</div>
              <div style={{background:'#d1fae5',color:'#065f46',borderRadius:'999px',padding:'5px 12px',fontSize:'12px',fontWeight:'700'}}>+18% essa semana</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'24px'}}>
              {[['Atividades','23','🎯'],['XP semanal','+820','⭐'],['Streak','7 dias','🔥']].map(([label,val,icon]) => (
                <div key={label} style={{background:'#faf5ff',borderRadius:'14px',padding:'16px',textAlign:'center',border:'1px solid #ede9fe'}}>
                  <div style={{fontSize:'22px'}}>{icon}</div>
                  <div style={{fontWeight:'900',fontSize:'17px',marginTop:'6px',color:'#0f0a1e'}}>{val}</div>
                  <div style={{fontSize:'11px',color:'#9ca3af',marginTop:'2px',fontWeight:'500'}}>{label}</div>
                </div>
              ))}
            </div>
            {[['Lógica',78,'#7C3AED'],['Criatividade',92,'#ef4444'],['Concentração',85,'#10b981']].map(([label,val,cor]) => (
              <div key={label} style={{marginBottom:'12px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'6px'}}>
                  <span style={{color:'#4b5563',fontWeight:'600'}}>{label}</span>
                  <span style={{color:cor,fontWeight:'800'}}>{val}%</span>
                </div>
                <div style={{background:'#e5e7eb',borderRadius:'999px',height:'7px',overflow:'hidden'}}>
                  <div style={{background:cor,width:val+'%',height:'100%',borderRadius:'999px'}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" style={{padding:'110px 40px',maxWidth:'1000px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'14px',textTransform:'uppercase',letterSpacing:'2px'}}>Histórias reais</div>
          <h2 style={{fontSize:'44px',fontWeight:'900',letterSpacing:'-1.5px',color:'#0f0a1e',lineHeight:'1.1'}}>Pais que mudaram a relação dos filhos com a tela</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px'}}>
          {depoimentos.map(([texto,emoji,nome,cargo]) => (
            <div key={nome} className="dep-card">
              <div style={{color:'#F07A20',fontSize:'16px',marginBottom:'18px',letterSpacing:'2px'}}>★★★★★</div>
              <p style={{color:'#374151',fontSize:'15px',lineHeight:'1.75',marginBottom:'28px',fontStyle:'italic'}}>{texto}</p>
              <div style={{display:'flex',alignItems:'center',gap:'12px',paddingTop:'20px',borderTop:'1px solid #f3f4f6'}}>
                <div style={{width:'46px',height:'46px',borderRadius:'14px',background:'linear-gradient(135deg,#7C3AED,#F07A20)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px'}}>{emoji}</div>
                <div>
                  <div style={{fontWeight:'700',fontSize:'14px',color:'#0f0a1e'}}>{nome}</div>
                  <div style={{color:'#9ca3af',fontSize:'12px',marginTop:'2px'}}>{cargo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'80px 40px',background:'#faf5ff'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={{fontSize:'12px',color:'#7C3AED',fontWeight:'700',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'2px'}}>Planos e preços</div>
            <h2 style={{fontSize:'40px',fontWeight:'900',letterSpacing:'-1px',color:'#0f0a1e'}}>Escolha o plano ideal para sua família</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}}>
            {[
              ['🌱','Starter','R$ 19/mês','1 criança','#10b981',false],
              ['👨‍👧‍👦','Família','R$ 32/mês','Até 3 crianças','#7C3AED',true],
              ['🚀','Premium','R$ 54/mês','Ilimitado','#F07A20',false]
            ].map(([emoji,nome,preco,desc,cor,destaque]) => (
              <div key={nome} onClick={() => navigate('/planos')} style={{background:'white',borderRadius:'20px',padding:'28px',border:destaque ? '2px solid #7C3AED' : '1.5px solid #f3f4f6',cursor:'pointer',boxShadow:destaque ? '0 8px 32px rgba(124,58,237,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',transition:'all 0.2s',textAlign:'center'}}>
                <div style={{fontSize:'32px',marginBottom:'10px'}}>{emoji}</div>
                <div style={{fontWeight:'900',fontSize:'18px',color:'#0f0a1e',marginBottom:'4px'}}>{nome}</div>
                <div style={{fontWeight:'900',fontSize:'24px',color:cor,marginBottom:'4px'}}>{preco}</div>
                <div style={{fontSize:'13px',color:'#9ca3af',marginBottom:'16px'}}>{desc}</div>
                <button style={{background:destaque ? 'linear-gradient(135deg,#7C3AED,#6d28d9)' : '#f3f4f6',border:'none',borderRadius:'10px',padding:'10px 20px',color:destaque ? 'white' : '#374151',fontWeight:'700',fontSize:'13px',cursor:'pointer',width:'100%'}}>
                  Ver plano
                </button>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center',color:'#9ca3af',fontSize:'13px',marginTop:'20px'}}>7 dias de garantia. Cancele quando quiser.</p>
        </div>
      </section>

      <section style={{padding:'120px 40px',textAlign:'center',background:'linear-gradient(145deg,#faf5ff 0%,#ede9fe 50%,#e0f2fe 100%)'}}>
        <div style={{maxWidth:'580px',margin:'0 auto'}}>
          <h2 style={{fontSize:'52px',fontWeight:'900',letterSpacing:'-2px',marginBottom:'18px',lineHeight:'1.05',color:'#0f0a1e'}}>
            Comece hoje.<br /><span style={{color:'#7C3AED'}}>7 dias de garantia.</span>
          </h2>
          <p style={{color:'#6b7280',fontSize:'17px',marginBottom:'40px',lineHeight:'1.6'}}>
            Crie o perfil do seu filho em menos de 1 minuto e veja a primeira missão.
          </p>
          <button onClick={() => navigate('/planos')} className="btn-primary" style={{fontSize:'18px',padding:'17px 44px',borderRadius:'14px'}}>
            Começar grátis
          </button>
        </div>
      </section>

      <footer style={{borderTop:'1px solid #e5e7eb',padding:'44px',textAlign:'center',background:'white'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginBottom:'10px'}}>
          <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'linear-gradient(135deg,#7C3AED,#a78bfa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px'}}>🧠</div>
          <span style={{fontWeight:'800',fontSize:'15px',color:'#0f0a1e'}}>NeuralSync Academy</span>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:'24px',marginBottom:'12px'}}>
          {[['Home','/'],['Planos','/planos'],['Entrar','/auth']].map(([label,path]) => (
            <a key={path} onClick={() => navigate(path)} style={{color:'#9ca3af',fontSize:'13px',cursor:'pointer',textDecoration:'none',fontWeight:'500'}}>{label}</a>
          ))}
        </div>
        <p style={{color:'#9ca3af',fontSize:'13px'}}>2026 NeuralSync Academy. Tempo de tela que vira inteligência.</p>
      </footer>

    </div>
  )
}
