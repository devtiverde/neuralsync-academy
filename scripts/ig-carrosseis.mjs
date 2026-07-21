/**
 * Gera os carrosséis do Instagram (posts 3 a 25) no mesmo padrão visual de ig-posts.html.
 *
 *   node scripts/ig-carrosseis.mjs
 *
 * Saída: E:\DEV\neuralsync-ig-posts\<post>-<nn>.png  (1080x1350)
 * Só gera CARROSSEL. Reels são gravação de tela e não saem daqui.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const OUT = 'E:/DEV/neuralsync-ig-posts';
mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- estilos */
const CSS = `
:root{
  --violet:#7C3AED; --violet-soft:#A78BFA; --cyan:#06B6D4; --gold:#FBBF24;
  --deep:#0A0415; --dim:#ADA3C9; --faint:#756B93;
  --display:'Fredoka One',cursive; --body:'Plus Jakarta Sans',sans-serif; --mono:'Space Grotesk',sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#222}
.slide{
  width:1080px;height:1350px;position:relative;overflow:hidden;background:var(--deep);
  background-image:
    radial-gradient(900px 700px at 85% -5%, rgba(124,58,237,.38), transparent 62%),
    radial-gradient(700px 600px at -10% 25%, rgba(6,182,212,.18), transparent 60%);
  font-family:var(--body);color:#F1EDFB;padding:90px 80px;display:flex;flex-direction:column;margin-bottom:24px;
}
.slide.warm{background-image:
  radial-gradient(900px 700px at 85% -5%, rgba(251,191,36,.26), transparent 62%),
  radial-gradient(700px 600px at -10% 25%, rgba(124,58,237,.30), transparent 60%)}
.star{position:absolute;border-radius:50%;background:#fff;opacity:.5}
.brandbar{display:flex;align-items:center;gap:14px;margin-bottom:auto;position:relative;z-index:2}
.brandmark{width:44px;height:44px;border-radius:13px;background:linear-gradient(150deg,#67e8f9,#7C3AED);
  box-shadow:0 0 24px rgba(124,58,237,.6)}
.brandname{font-family:var(--display);font-size:26px;letter-spacing:.3px}
.brandname span{color:var(--violet-soft)}
.counter{position:absolute;top:90px;right:80px;font-family:var(--mono);font-size:22px;color:var(--faint);z-index:2}
.content{position:relative;z-index:2}
.kicker{font-family:var(--mono);font-size:24px;letter-spacing:.16em;text-transform:uppercase;color:var(--cyan);margin-bottom:26px}
.kicker.gold{color:var(--gold)}
h1{font-family:var(--display);font-weight:400;font-size:88px;line-height:1.02;margin-bottom:34px}
h1.sm{font-size:72px}
h1 .hl{color:var(--gold)}
h1 .hlv{color:var(--violet-soft)}
.sub{font-size:34px;line-height:1.45;color:var(--dim);max-width:21ch}
.sub.wide{max-width:27ch}
.swipe{margin-top:auto;position:relative;z-index:2;display:flex;align-items:center;gap:16px;
  font-family:var(--mono);font-size:24px;color:var(--violet-soft)}
.swipe .arrow{font-size:32px}
.swipe.faint{color:var(--faint)}

.signnum{font-family:var(--display);font-size:150px;line-height:1;color:rgba(167,139,250,.28);margin-bottom:10px}
.signtitle{font-family:var(--display);font-size:70px;line-height:1.08;margin-bottom:30px}
.signtitle.sm{font-size:58px}
.signbody{font-size:34px;line-height:1.5;color:var(--dim);max-width:24ch}

/* número gigante (dados) */
.bignum{font-family:var(--display);font-size:210px;line-height:.92;color:#fff;margin-bottom:8px}
.bignum.sm{font-size:150px}
.bignum .u{font-size:96px;color:var(--violet-soft)}
.biglabel{font-family:var(--display);font-size:58px;line-height:1.1;margin-bottom:24px;color:var(--gold)}
.source{font-family:var(--mono);font-size:22px;color:var(--faint);margin-top:34px;letter-spacing:.04em}

/* chip de categoria */
.chip{display:inline-block;font-family:var(--mono);font-size:23px;letter-spacing:.1em;text-transform:uppercase;
  padding:12px 26px;border-radius:999px;margin-bottom:30px}
.chip.bad{background:rgba(244,63,94,.16);color:#fda4af;border:2px solid rgba(244,63,94,.35)}
.chip.mid{background:rgba(251,191,36,.14);color:var(--gold);border:2px solid rgba(251,191,36,.32)}
.chip.good{background:rgba(16,185,129,.15);color:#6ee7b7;border:2px solid rgba(16,185,129,.35)}

/* comparativo 2 colunas */
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:38px}
.cmp .col{border-radius:26px;padding:38px 32px;min-height:330px;display:flex;flex-direction:column}
.cmp .col.a{background:rgba(244,63,94,.09);border:2px solid rgba(244,63,94,.28)}
.cmp .col.b{background:rgba(16,185,129,.10);border:2px solid rgba(16,185,129,.32)}
.cmp .cname{font-family:var(--mono);font-size:24px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:22px}
.cmp .col.a .cname{color:#fda4af}
.cmp .col.b .cname{color:#6ee7b7}
.cmp .ctext{font-size:32px;line-height:1.4;color:#F1EDFB}
.cmp .mark{font-size:46px;margin-bottom:16px}

/* lista de itens */
.list{margin-top:34px;display:flex;flex-direction:column;gap:22px}
.list .li{display:flex;gap:20px;align-items:flex-start;font-size:32px;line-height:1.4;color:#F1EDFB}
.list .li .b{color:#6ee7b7;font-size:34px;flex:none}
.list .li .x{color:#fda4af;font-size:34px;flex:none}

/* faq */
.q{font-family:var(--display);font-size:58px;line-height:1.1;margin-bottom:26px;color:#fff}
.a{font-size:34px;line-height:1.5;color:var(--dim);max-width:25ch}

/* plano */
.planoprice{font-family:var(--display);font-size:130px;line-height:1;color:#fff;margin-bottom:6px}
.planoprice .cur{font-size:56px;color:var(--violet-soft)}
.planoprice .per{font-family:var(--body);font-size:36px;color:var(--faint)}
.planotag{display:inline-block;font-family:var(--mono);font-size:22px;letter-spacing:.1em;text-transform:uppercase;
  background:linear-gradient(135deg,#7c3aed,#5b21b6);padding:11px 24px;border-radius:999px;margin-bottom:26px}

/* caixas */
.ctabox{border:2px solid rgba(251,191,36,.4);background:rgba(251,191,36,.08);border-radius:28px;padding:40px 44px;margin-top:34px}
.ctabox p{font-size:32px;line-height:1.45}
.ctabox b{color:#fff}
.cta-btn{margin-top:34px;display:inline-block;background:linear-gradient(135deg,#7c3aed,#5b21b6);
  border-radius:22px;padding:30px 52px;font-family:var(--display);font-size:40px;
  box-shadow:0 16px 50px rgba(124,58,237,.5)}
.good{color:#34d399}
.timeline{font-family:var(--mono);font-size:26px;letter-spacing:.1em;text-transform:uppercase;color:var(--cyan);margin-bottom:20px}
`;

const STARS = `
<div class="star" style="width:5px;height:5px;top:12%;left:14%"></div>
<div class="star" style="width:8px;height:8px;top:22%;left:78%;background:#FBBF24;opacity:.85"></div>
<div class="star" style="width:4px;height:4px;top:40%;left:8%"></div>
<div class="star" style="width:6px;height:6px;top:68%;left:88%;background:#67e8f9;opacity:.8"></div>
<div class="star" style="width:5px;height:5px;top:80%;left:20%"></div>`;

const BRAND = `<div class="brandbar"><div class="brandmark"></div><div class="brandname">Neural<span>Sync</span></div></div>`;
const swipe = (last, txt) => last
  ? `<div class="swipe faint">${txt || 'neuralsync.com.br'}</div>`
  : `<div class="swipe"><span class="arrow">→</span>${txt ? ' ' + txt : ''}</div>`;

/* ------------------------------------------------------------ construtor */
function render(s, i, total) {
  const last = i === total - 1;
  // numerados = todos menos a capa (índice 0) e o slide final
  const counter = s.t !== 'capa' && !last ? `<div class="counter">${String(i).padStart(2, '0')} / ${total - 2}</div>` : '';
  const stars = (s.t === 'capa' || last || s.stars) ? STARS : '';
  const cls = s.warm ? 'slide warm' : 'slide';
  let inner = '';

  switch (s.t) {
    case 'capa':
      inner = `<p class="kicker${s.gold ? ' gold' : ''}">${s.kicker}</p>
        <h1${s.small ? ' class="sm"' : ''}>${s.h}</h1>
        <p class="sub${s.wide ? ' wide' : ''}">${s.sub}</p>`;
      break;
    case 'num':
      inner = `<div class="signnum">${s.n}</div>
        <div class="signtitle${s.small ? ' sm' : ''}">${s.h}</div>
        <p class="signbody">${s.sub}</p>`;
      break;
    case 'stat':
      inner = `${s.chip ? `<span class="chip ${s.chip[0]}">${s.chip[1]}</span>` : ''}
        <div class="bignum${s.small ? ' sm' : ''}">${s.n}</div>
        <div class="biglabel">${s.h}</div>
        <p class="signbody">${s.sub}</p>
        ${s.src ? `<p class="source">${s.src}</p>` : ''}`;
      break;
    case 'tipo':
      inner = `<span class="chip ${s.chip[0]}">${s.chip[1]}</span>
        <div class="signtitle${s.small ? ' sm' : ''}">${s.h}</div>
        <p class="signbody">${s.sub}</p>`;
      break;
    case 'cmp':
      inner = `<p class="kicker">${s.kicker}</p>
        <h1 class="sm">${s.h}</h1>
        <div class="cmp">
          <div class="col a"><div class="mark">✕</div><div class="cname">${s.a[0]}</div><div class="ctext">${s.a[1]}</div></div>
          <div class="col b"><div class="mark">✓</div><div class="cname">${s.b[0]}</div><div class="ctext">${s.b[1]}</div></div>
        </div>`;
      break;
    case 'quote':
      inner = `<h1${s.small ? ' class="sm"' : ''}>${s.h}</h1>${s.sub ? `<p class="sub wide">${s.sub}</p>` : ''}`;
      break;
    case 'faq':
      inner = `<div class="signnum">${s.n}</div><div class="q">${s.h}</div><p class="a">${s.sub}</p>`;
      break;
    case 'plano':
      inner = `${s.tag ? `<div class="planotag">${s.tag}</div>` : ''}
        <div class="biglabel">${s.h}</div>
        <div class="planoprice"><span class="cur">R$</span>${s.preco}<span class="per">/mês</span></div>
        <div class="list">${s.itens.map(x => `<div class="li"><span class="${x[0] === '-' ? 'x' : 'b'}">${x[0] === '-' ? '✕' : '✓'}</span><span>${x.slice(1)}</span></div>`).join('')}</div>`;
      break;
    case 'fase':
      inner = `<p class="timeline">${s.fase}</p>
        <div class="signtitle${s.small ? ' sm' : ''}">${s.h}</div>
        <p class="signbody">${s.sub}</p>`;
      break;
    case 'cta':
      inner = `<p class="kicker${s.gold ? ' gold' : ''}">${s.kicker}</p>
        <h1${s.small ? ' class="sm"' : ''}>${s.h}</h1>
        ${s.sub ? `<p class="sub wide">${s.sub}</p>` : ''}
        ${s.box ? `<div class="ctabox">${s.box}</div>` : ''}
        ${s.btn ? `<div class="cta-btn">${s.btn}</div>` : ''}`;
      break;
  }
  return `<div class="${cls}">${stars}${counter}${BRAND}<div class="content">${inner}</div>${swipe(last, s.swipe)}</div>`;
}

/* ------------------------------------------------------------- conteúdos */
const CARROSSEIS = {

/* ---- POST 3 — dados OMS / SBP ---- */
'p03-tempo-tela': [
 {t:'capa',kicker:'Recomendação oficial',h:'Quanto tempo de tela é <span class="hl">demais?</span>',
  sub:'A resposta oficial que quase nenhum pai conhece.',swipe:'Arrasta pra ver por idade'},
 {t:'stat',n:'0',h:'Menos de 1 ano',sub:'Nenhuma tela. Nem de fundo, nem no colo.',src:'Organização Mundial da Saúde'},
 {t:'stat',n:'1<span class="u">h</span>',h:'De 2 a 5 anos',sub:'No máximo uma hora por dia — e sempre acompanhada de um adulto.',src:'Organização Mundial da Saúde'},
 {t:'stat',n:'1–2<span class="u">h</span>',small:true,h:'De 6 a 10 anos',sub:'Contando tudo: TV, tablet, celular e videogame juntos.',src:'Sociedade Brasileira de Pediatria · 2024'},
 {t:'stat',n:'2–3<span class="u">h</span>',small:true,h:'De 11 a 18 anos',sub:'Fora o tempo usado para estudar ou fazer trabalho da escola.',src:'Sociedade Brasileira de Pediatria · 2024'},
 {t:'cta',gold:true,kicker:'O que o número não diz',h:'Uma hora criando vale diferente de uma hora <span class="hl">rolando o feed.</span>',
  sub:'Acima de 4 a 5 horas por dia, a SBP aponta risco. Mas duas horas não são todas iguais.',
  box:'<p>O <b>NeuralSync</b> não briga com o relógio. Ele muda <b>o que está dentro</b> daquele tempo.</p>',btn:'Link na bio →'}
],

/* ---- POST 5 — tipos de tela ---- */
'p05-tipos-de-tela': [
 {t:'capa',kicker:'Neurociência',h:'1 hora de tela. Três resultados <span class="hl">completamente diferentes.</span>',
  sub:'O relógio marca igual. O cérebro, não.',swipe:'Arrasta'},
 {t:'tipo',chip:['bad','Vídeo curto'],h:'Recompensa a cada 15 segundos',
  sub:'O estímulo troca antes do tédio aparecer. O cérebro recebe prazer sem gastar nenhum esforço pra conseguir.'},
 {t:'tipo',chip:['bad','O que isso gera'],h:'Treina impaciência',small:true,
  sub:'Depois disso, qualquer coisa mais lenta vira tortura — inclusive a aula de 50 minutos. E a culpa cai na escola.'},
 {t:'tipo',chip:['mid','Jogo sem objetivo'],h:'Diverte e passa',
  sub:'Prende a atenção, gasta o tempo, entretém de verdade. Mas não constrói nada que sobre depois que desliga.'},
 {t:'tipo',chip:['good','Atividade com objetivo'],h:'Tem meta, erro e correção',
  sub:'A criança tenta, erra, entende por que errou e tenta de novo. O esforço é parte do jogo, não o preço dele.'},
 {t:'tipo',chip:['good','O que isso gera'],h:'Tolerância à frustração',small:true,
  sub:'A sensação de que esforço leva a algum lugar. É isso que ela leva pra prova, pro instrumento, pra vida.'},
 {t:'cta',gold:true,kicker:'A conclusão',h:'O problema nunca foi a tela. É <span class="hl">o que tem nela.</span>',
  sub:'400+ atividades com meta, erro e correção. Para crianças de 4 a 15 anos.',
  box:'<p><span class="good">✓</span> Relatório semanal pros pais<br><span class="good">✓</span> Garantia de 7 dias<br><span class="good">✓</span> Sem propaganda dentro</p>',btn:'Link na bio →'}
],

/* ---- POST 7 — manifesto ---- */
'p07-nao-e-proibir': [
 {t:'capa',kicker:'Opinião impopular',h:'Eu não acredito em <span class="hl">proibir tela.</span>',
  sub:'E olha que eu criei um app pra criança.',swipe:'Arrasta'},
 {t:'quote',h:'Proibir funciona <span class="hlv">enquanto você está por perto.</span>',
  sub:'No dia em que ela tiver o próprio celular, vai consumir tudo que foi proibido de uma vez — e sem nenhum critério pra escolher.'},
 {t:'quote',h:'O que dura é ensinar <span class="hlv">a diferença.</span>',small:true,
  sub:'Entre a tela que consome ela e a tela que constrói ela. Isso ela leva pra vida inteira. A proibição, não.'},
 {t:'quote',h:'Meu objetivo nunca foi tirar o tablet da mão do meu filho.',small:true,
  sub:'Foi trocar o que tem dentro dele.'},
 {t:'cta',gold:true,kicker:'É isso que a gente faz',h:'Tempo de tela <span class="hl">que ensina.</span>',
  sub:'400+ atividades cognitivas, de 4 a 15 anos, com relatório semanal pros pais.',
  box:'<p><span class="good">✓</span> Garantia de 7 dias<br><span class="good">✓</span> Cancele quando quiser<br><span class="good">✓</span> Nenhuma propaganda</p>',btn:'Link na bio →'}
],

/* ---- POST 10 — ChatGPT vs NeuralAI ---- */
'p10-chatgpt-vs-neuralai': [
 {t:'capa',kicker:'Inteligência artificial',h:'Meu filho pediu pra usar o ChatGPT. Eu disse <span class="hl">não.</span>',
  sub:'E construí a alternativa.',swipe:'Arrasta pra comparar'},
 {t:'cmp',kicker:'Tempo de uso',h:'Quanto tempo ele fica ali?',
  a:['ChatGPT','Ilimitado. Ninguém avisa quando parar.'],
  b:['NeuralAI','Sessão com limite de tempo definido por você.']},
 {t:'cmp',kicker:'Assunto',h:'Sobre o que ele conversa?',
  a:['ChatGPT','Qualquer um. Sem controle nenhum.'],
  b:['NeuralAI','Só educativo. Sai do assunto, volta sozinha.']},
 {t:'cmp',kicker:'Visibilidade',h:'Você fica sabendo?',
  a:['ChatGPT','Não. Você nunca vê o que foi conversado.'],
  b:['NeuralAI','Resumo da conversa enviado ao responsável.']},
 {t:'cmp',kicker:'Linguagem',h:'Fala a língua dele?',
  a:['ChatGPT','Escrito pra adulto. A criança copia sem entender.'],
  b:['NeuralAI','Adaptado à idade cadastrada.']},
 {t:'cta',gold:true,kicker:'Pra ficar claro',h:'O ChatGPT não é ruim. Ele <span class="hl">não foi feito</span> pra quem tem 9 anos.',
  sub:'A NeuralAI foi, desde a primeira linha de código.',
  box:'<p>Disponível no plano <b>Premium</b>. A partir dos 12 anos, com tudo que está acima.</p>',btn:'Link na bio →'}
],

/* ---- POST 11 — faixas etárias ---- */
'p11-faixas-etarias': [
 {t:'capa',kicker:'Por idade',h:'O mesmo app, <span class="hl">quatro experiências</span> diferentes',
  sub:'"Serve pra idade do meu filho?" — é o que mais me perguntam.',swipe:'Arrasta'},
 {t:'stat',n:'4–5',small:true,chip:['good','Exploradores'],h:'Nada pra ler',
  sub:'Ícones grandes, tudo narrado em voz alta. A criança que ainda não lê usa sozinha.'},
 {t:'stat',n:'6–8',small:true,chip:['good','Construtores'],h:'As primeiras palavras',
  sub:'Sílabas, alfabeto, lógica simples e os primeiros desafios de raciocínio.'},
 {t:'stat',n:'9–11',small:true,chip:['good','Criadores'],h:'Desafio de verdade',
  sub:'Inglês, escrita, raciocínio mais longo e atividades que exigem planejar antes de agir.'},
 {t:'stat',n:'12–15',small:true,chip:['good','Inventores'],h:'Libera a NeuralAI',
  sub:'Teoria, criação própria e acesso à inteligência artificial supervisionada.'},
 {t:'cta',gold:true,kicker:'E o melhor',h:'Você cadastra a idade <span class="hl">uma vez.</span>',
  sub:'O resto se ajusta sozinho. Sem configuração, sem escolher trilha, sem tutorial.',
  box:'<p>Um único plano <b>Família</b> cobre até <b>4 filhos</b> — cada um na faixa dele.</p>',btn:'Link na bio →'}
],

/* ---- POST 14 — 6 habilidades ---- */
'p14-seis-habilidades': [
 {t:'capa',kicker:'O relatório',h:'O que exatamente o relatório do seu filho <span class="hl">mede</span>',
  sub:'"Tempo de uso: 3h20" não diz nada. Isso aqui diz.',swipe:'Arrasta'},
 {t:'num',n:'01',h:'Memória',sub:'Segurar uma informação na cabeça enquanto usa ela pra fazer outra coisa. É o que sustenta todo o resto.'},
 {t:'num',n:'02',h:'Atenção',sub:'Sustentar o foco sem ser puxado pelo próximo estímulo que aparecer na frente.'},
 {t:'num',n:'03',h:'Raciocínio espacial',small:true,sub:'Girar, encaixar e imaginar objetos no espaço sem precisar mexer neles de verdade.'},
 {t:'num',n:'04',h:'Linguagem',sub:'Vocabulário, leitura e a capacidade de entender o que o enunciado está pedindo.'},
 {t:'num',n:'05',h:'Lógica',sub:'Encontrar o padrão, prever o próximo passo e explicar por que a resposta é aquela.'},
 {t:'num',n:'06',h:'Coordenação',sub:'Precisão do movimento e tempo de reação — o corpo acompanhando a decisão.'},
 {t:'cta',gold:true,kicker:'Toda semana',h:'Seis medidas separadas. <span class="hl">Não um número só.</span>',
  sub:'Você vê onde ele evoluiu e onde travou — e o que fazer sobre isso.',
  box:'<p>Relatório completo nos planos <b>Família</b> e <b>Premium</b>.</p>',btn:'Link na bio →'}
],

/* ---- POST 16 — FAQ ---- */
'p16-perguntas-frequentes': [
 {t:'capa',kicker:'Dúvidas reais',h:'5 perguntas que os pais <span class="hl">mais me fazem</span>',
  sub:'As respostas honestas, inclusive as que não me favorecem.',swipe:'Arrasta'},
 {t:'faq',n:'01',h:'Funciona no celular?',sub:'Sim — e no tablet e no computador. Abre no navegador, não precisa instalar nada nem ocupar espaço.'},
 {t:'faq',n:'02',h:'Meu filho tem 4 anos. É muito novo?',sub:'Não. A faixa de 4 a 5 anos é toda narrada, com ícones grandes e nada pra ler. Só peço que use acompanhado.'},
 {t:'faq',n:'03',h:'Preciso ficar do lado?',sub:'Nos primeiros dias sim, pra ele pegar o jeito. Depois não. De 4 a 5 anos, o ideal é acompanhar sempre.'},
 {t:'faq',n:'04',h:'Posso cancelar quando quiser?',sub:'Sim. Sem multa e sem fidelidade. E tem 7 dias de garantia — se não gostar, devolvo o valor inteiro.'},
 {t:'faq',n:'05',h:'Tem propaganda dentro?',sub:'Nenhuma. É exatamente por isso que é pago — não vendo a atenção do seu filho pra ninguém.'},
 {t:'cta',gold:true,kicker:'Ficou outra dúvida?',h:'Manda nos comentários. <span class="hl">Eu respondo todas.</span>',
  sub:'Prefiro responder antes de você assinar do que depois.',btn:'Link na bio →'}
],

/* ---- POST 18 — planos ---- */
'p18-planos': [
 {t:'capa',kicker:'Preços',h:'Três planos. Qual faz sentido <span class="hl">pra sua casa.</span>',
  sub:'Vou ser honesto sobre a diferença — inclusive sobre o que o mais barato não tem.',swipe:'Arrasta'},
 {t:'plano',h:'Starter',preco:'29',itens:['+Todas as 427 atividades','+1 filho cadastrado','-Sem relatório completo','-Sem NeuralAI']},
 {t:'plano',h:'Família',preco:'47',tag:'O mais escolhido',itens:['+Todas as 427 atividades','+Até 4 filhos','+Relatório completo semanal','-Sem NeuralAI']},
 {t:'plano',h:'Premium',preco:'79',itens:['+Tudo do plano Família','+NeuralAI liberada','+Quiz IA ilimitado','+Relatório cognitivo completo']},
 {t:'cta',gold:true,kicker:'Em qualquer plano',h:'7 dias de garantia. <span class="hl">O risco é meu.</span>',
  sub:'Se não gostar, você pede o reembolso e recebe tudo de volta.',
  box:'<p>🎁 Quem assinar até <b>2 de setembro</b> ganha <b>1 mês extra grátis</b> — em qualquer plano.</p>',btn:'Link na bio →'}
],

/* ---- POST 20 — números reais ---- */
'p20-numeros-reais': [
 {t:'capa',kicker:'Transparência',h:'O NeuralSync em números — <span class="hl">os de verdade</span>',
  sub:'Só os que eu consigo provar abrindo o sistema.',swipe:'Arrasta'},
 {t:'stat',n:'427',h:'atividades',sub:'Cada uma escrita e revisada uma por uma. Nenhuma gerada em massa pra inflar o número.'},
 {t:'stat',n:'23',h:'tipos diferentes',sub:'Quiz, memória, labirinto, sequência, robô, colorir, sílabas, música e mais quinze.'},
 {t:'stat',n:'4',h:'faixas etárias',sub:'Dos exploradores de 4 anos aos inventores de 15. Cada faixa com conteúdo próprio.'},
 {t:'stat',n:'6',h:'habilidades medidas',sub:'Memória, atenção, espacial, linguagem, lógica e coordenação — todas no relatório.'},
 {t:'cta',gold:true,kicker:'E um número que eu não tenho',h:'Não vou dizer que <span class="hl">50 mil famílias</span> usam.',
  sub:'Estou começando agora, e prefiro que você saiba disso por mim.',
  box:'<p>O que eu tenho é o produto pronto e <b>7 dias de garantia</b> pra você testar sem risco nenhum.</p>',btn:'Link na bio →'}
],

/* ---- POST 22 — 30 dias ---- */
'p22-trinta-dias': [
 {t:'capa',kicker:'Expectativa real',h:'O que esperar no primeiro mês — e <span class="hl">o que não esperar</span>',
  sub:'Prefiro te contar antes de você assinar.',swipe:'Arrasta'},
 {t:'fase',fase:'Dias 1 a 3',h:'Exploração pura',sub:'Ele vai abrir tudo e terminar quase nada. Parece bagunça, mas é assim que a criança mapeia o que existe. Não corrija.'},
 {t:'fase',fase:'Dias 4 a 7',h:'Aparecem os favoritos',small:true,sub:'Um ou dois tipos de atividade que ele repete. Isso já diz muito sobre o estilo cognitivo dele.'},
 {t:'fase',fase:'Semanas 2 e 3',h:'O hábito começa',sub:'A volta espontânea, sem você pedir. E o relatório passa a ter dado suficiente pra mostrar tendência, não só evento.'},
 {t:'fase',fase:'Dia 30',h:'Dá pra ver o desenho',sub:'Em qual habilidade ele evoluiu mais, em qual travou, e o que faz sentido reforçar a partir dali.'},
 {t:'cta',gold:true,kicker:'O que não vai acontecer',h:'Mudança visível em <span class="hl">3 dias.</span>',
  sub:'Quem promete isso está vendendo outra coisa. Desenvolvimento cognitivo leva semanas — em qualquer plataforma, inclusive na minha.',btn:'Link na bio →'}
],

/* ---- POST 24 — últimas 48h ---- */
'p24-ultimas-48h': [
 {t:'capa',warm:true,gold:true,kicker:'Contagem final',h:'Últimas <span class="hl">48 horas</span> do bônus de lançamento',
  sub:'Depois de 2 de setembro, o mês extra sai do ar.',swipe:'Arrasta'},
 {t:'cta',warm:true,kicker:'O que você leva',h:'427 atividades e um <span class="hl">relatório de verdade</span>',
  sub:'Até 4 filhos na mesma assinatura, no plano Família por R$ 47 por mês.',
  box:'<p><span class="good">✓</span> Todas as atividades liberadas<br><span class="good">✓</span> Relatório semanal por filho<br><span class="good">✓</span> Sem propaganda nenhuma</p>'},
 {t:'cta',warm:true,gold:true,kicker:'O bônus',h:'1 mês extra <span class="hl">grátis</span>',
  sub:'Pra quem assinar até 2 de setembro, em qualquer plano. O preço não muda — o que acaba é o mês extra.',
  box:'<p>Não é promoção de preço. Os três planos <b>continuam os mesmos</b> depois do dia 2.</p>'},
 {t:'cta',warm:true,gold:true,kicker:'Sem risco',h:'7 dias de garantia. <span class="hl">Se não gostar, devolvo.</span>',
  sub:'Você testa com seu filho por uma semana inteira. Não sendo o que você esperava, pede o reembolso.',btn:'Link na bio →'}
],

/* ---- POST 25 — último dia ---- */
'p25-ultimo-dia': [
 {t:'capa',warm:true,gold:true,kicker:'Encerramento',h:'Hoje é o <span class="hl">último dia</span> do bônus de lançamento',
  sub:'Depois de hoje, o mês extra sai do ar.',swipe:'Arrasta'},
 {t:'quote',warm:true,h:'Obrigado a quem <span class="hlv">acompanhou até aqui.</span>',
  sub:'Há seis semanas eu publiquei o primeiro post sem saber se alguém ia ler. Cada comentário e cada pergunta mudaram o produto de verdade.'},
 {t:'cta',warm:true,gold:true,kicker:'E amanhã?',h:'O NeuralSync <span class="hl">continua no ar.</span>',
  sub:'Amanhã, depois e sempre. O que acaba hoje é só o mês extra pra quem assinar.',
  box:'<p><span class="good">✓</span> 7 dias de garantia, como sempre<br><span class="good">✓</span> Sem fidelidade<br><span class="good">✓</span> Cancele quando quiser</p>',btn:'Link na bio →'}
]
};

/* ------------------------------------------------------------- execução */
const page_html = slides => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>
${slides.map((s, i) => render(s, i, slides.length)).join('\n')}
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });

let total = 0;
for (const [nome, slides] of Object.entries(CARROSSEIS)) {
  const html = page_html(slides);
  const tmp = join(OUT, `_tmp-${nome}.html`);
  writeFileSync(tmp, html);
  await page.goto('file:///' + tmp.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(700); // fontes

  const els = await page.$$('.slide');
  for (let i = 0; i < els.length; i++) {
    const f = join(OUT, `${nome}-${String(i + 1).padStart(2, '0')}.png`);
    await els[i].screenshot({ path: f });
    total++;
  }
  console.log(`${nome}: ${els.length} slides`);
}

await browser.close();
console.log(`\n${total} imagens geradas em ${OUT}`);
