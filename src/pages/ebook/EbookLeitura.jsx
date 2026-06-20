import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pai.css'

const capitulos = [
  {
    titulo: 'Introdução — A Tela Não É a Vilã',
    conteudo: `A tecnologia não é o problema. O problema é como usamos ela.

Nos últimos anos, criamos uma narrativa em que a tela é a vilã da história — responsável por tudo, desde a falta de atenção até problemas de socialização. Mas essa visão é simplista demais para um fenômeno tão complexo.

A verdade é que a tela é uma ferramenta. Como toda ferramenta, pode construir ou destruir, dependendo de quem a usa e como.

Este livro não vai te ensinar a proibir o celular do seu filho. Vai te ensinar a transformá-lo em uma das mais poderosas ferramentas de desenvolvimento cognitivo da história da educação.

A NeuralSync Academy nasceu exatamente dessa crença: que tecnologia bem direcionada pode ser a melhor aliada do desenvolvimento infantil.`,
  },
  {
    titulo: 'Capítulo 1 — O Cérebro Aprende Fazendo',
    conteudo: `Jean Piaget nos ensinou algo fundamental: a criança aprende fazendo, não observando.

O construtivismo — teoria que fundamenta toda a NeuralSync Academy — parte do princípio de que o conhecimento é construído ativamente pelo aprendiz.

Quando sua filha joga um jogo que requer raciocínio lógico, ela não está perdendo tempo. Ela está construindo estruturas cognitivas que vão durar a vida toda.

O problema com a maioria dos conteúdos digitais é que eles são passivos. A criança consome, mas não produz. Assiste, mas não pensa.

Pesquisas da Universidade de Harvard mostram que crianças que jogam jogos de estratégia têm até 23% mais facilidade em resolução de problemas matemáticos. O jogo ativo estimula o córtex pré-frontal — a área responsável pelo planejamento, tomada de decisão e controle de impulsos.`,
  },
  {
    titulo: 'Capítulo 2 — Regras de Ouro do Tempo de Tela',
    conteudo: `As principais organizações de saúde do mundo têm diretrizes claras sobre tempo de tela.

Para crianças de 2 a 5 anos: máximo 1 hora por dia de conteúdo de qualidade, sempre com supervisão adulta.

Para crianças de 6 a 12 anos: limite consistente de tempo, priorizando atividades físicas, sono e interações presenciais.

Mas atenção: essas diretrizes foram criadas pensando em uso passivo. Uma hora de jogo cognitivo ativo é fundamentalmente diferente de uma hora assistindo vídeos aleatórios.

As 3 Perguntas que Todo Pai Deveria Fazer:
1. O conteúdo ensina algo ou apenas entretém?
2. Meu filho está produzindo ou apenas consumindo?
3. Esse tempo de tela está substituindo algo importante (sono, exercício, convívio social)?

Se as respostas forem positivas para a primeira e negativas para as outras duas, você está no caminho certo.`,
  },
  {
    titulo: 'Capítulo 3 — Faixas Etárias e o Que Funciona em Cada Uma',
    conteudo: `Cada fase do desenvolvimento neurológico pede um tipo diferente de estímulo digital.

EXPLORADORES (3 a 5 anos)
Nessa fase, o cérebro está desenvolvendo a linguagem, a motricidade fina e a noção de causa e efeito. Conteúdos ideais: jogos de encaixe digital, livros interativos, vídeos de natureza com narração clara. Tempo máximo: 30 a 45 minutos por sessão, sempre acompanhado.

CONSTRUTORES (6 a 8 anos)
A criança já lê, compreende regras e começa a pensar de forma lógica. É a fase ideal para introduzir programação visual (Scratch), quebra-cabeças digitais e quizzes educativos. Tempo máximo: 45 minutos a 1 hora.

CRIADORES (9 a 11 anos)
Pensamento abstrato começa a se desenvolver. Projetos de criação digital (stop motion, blog, podcast simples) estimulam criatividade e comunicação. Tempo máximo: 1 a 1h30.

INVENTORES (12+ anos)
Adolescentes beneficiam de desafios reais: programação, robótica, pesquisa científica online. O foco muda de consumo para produção. Tempo máximo: 1h30 a 2h, com pausas.`,
  },
  {
    titulo: 'Capítulo 4 — Construindo Hábitos Digitais Saudáveis',
    conteudo: `A consistência supera a intensidade. Dez minutos de atividade cognitiva por dia, todo dia, transforma o cérebro de uma criança em 30 dias.

A ROTINA DIGITAL EM 4 PASSOS:

Passo 1 — Defina o horário
Crianças prosperam com previsibilidade. Defina um horário fixo para o tempo de tela educativo — preferencialmente depois do dever de casa e antes do jantar.

Passo 2 — Prepare o ambiente
Tela em local visível, fones de ouvido não obrigatórios, postura adequada. Evite o quarto ou a cama.

Passo 3 — Escolha o conteúdo antes
Nunca deixe a criança "explorar livremente" plataformas não curadas. Selecione o conteúdo com antecedência.

Passo 4 — Debrief após o uso
A pergunta mais poderosa que um pai pode fazer: "O que você aprendeu hoje?" Essa simples ação consolida o aprendizado na memória de longo prazo.`,
  },
  {
    titulo: 'Capítulo 5 — Telas e Sono: O Inimigo Silencioso',
    conteudo: `A luz azul emitida por dispositivos digitais suprime a produção de melatonina — o hormônio do sono — em até 50% nas crianças.

Uma criança que usa dispositivos eletrônicos 1 hora antes de dormir leva em média 40 minutos a mais para adormecer. Em uma semana, isso representa quase 5 horas a menos de sono.

E sono insuficiente em crianças está diretamente ligado a:
- Dificuldade de concentração e atenção
- Alterações de humor e irritabilidade
- Menor capacidade de consolidação de memórias
- Aumento do risco de obesidade infantil

A REGRA DO ESCRITÓRIO DIGITAL: todo dispositivo tem um "horário de trabalho". No mínimo 1 hora antes de dormir, todos os dispositivos vão para um "escritório digital" — um local centralizado da casa onde carregam durante a noite. Isso funciona porque remove o objeto físico do quarto, não apenas o acesso.`,
  },
  {
    titulo: 'Capítulo 6 — Conversas Difíceis: Como Limitar Sem Conflito',
    conteudo: `"Mais 5 minutinhos!" — toda criança já disse isso. E todo pai já cedeu. E já se arrependeu.

A negociação interminável acontece porque a criança aprendeu que persistir funciona. A solução não é endurecer mais — é mudar a estrutura da situação.

ESTRATÉGIAS QUE FUNCIONAM:

O Aviso Progressivo
Avise com 10 minutos, depois 5, depois 2. A criança não é surpreendida e o cérebro tem tempo de "desligar" gradualmente.

O Timer Visual
Use um timer físico ou digital que a criança VEJA contando. Quando chega a zero, não é o pai que está dizendo para parar — é o tempo.

A Rotina de Encerramento
Crie um ritual de desligar: "Agora você vai salvar o progresso, fechar o app e me contar uma coisa que aprendeu." O encerramento ritualizado reduz resistência em 70% dos casos.

A Recompensa Antecipada
"Quando você terminar a sessão de hoje, vamos [atividade especial juntos]." Dá à criança algo pelo qual torcer ALÉM da tela.`,
  },
  {
    titulo: 'Conclusão — Você Já Está Fazendo a Diferença',
    conteudo: `O simples fato de você estar lendo este ebook já coloca você à frente de 90% dos pais no que diz respeito à consciência digital.

Pais que se preocupam com o tipo de conteúdo que seus filhos consomem criam crianças que se tornam mais seletivas, mais críticas e mais capacitadas para navegar o mundo digital por conta própria.

Mas atenção ao perfeccionismo: você não precisa executar tudo que está neste livro de uma vez. Escolha UMA mudança para implementar esta semana.

Pode ser o timer visual. Pode ser o debrief pós-tela. Pode ser o ritual de encerramento. Uma mudança consolidada vale mais que dez tentadas e abandonadas.

A NeuralSync Academy foi criada para ser a ferramenta que torna isso mais fácil. Cada sessão de atividade é projetada para ser curta, intensa e recompensadora — para que seu filho QUEIRA aprender.

O futuro pertence às crianças que aprendem a aprender. E você está construindo isso hoje.

Obrigado por fazer parte dessa jornada.`,
  },
]

export default function EbookLeitura() {
  const navigate = useNavigate()
  const [capAtual, setCapAtual] = useState(0)
  const cap = capitulos[capAtual]

  const imprimirPDF = () => {
    window.print()
  }

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-content { max-width: 100% !important; padding: 20px !important; }
          body { font-family: Georgia, serif; }
        }
      `}</style>

      <header className="pai-header no-print">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => navigate('/ebook')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight: '800', fontSize: '16px', color: '#0f0a1e'}}>A Tela Certa</h2>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <span style={{color: '#9ca3af', fontSize: '13px', fontWeight: '600'}}>{capAtual + 1}/{capitulos.length}</span>
          <button className="btn-secondary" onClick={imprimirPDF} style={{fontSize: '12px', padding: '6px 12px'}}>⬇ PDF</button>
        </div>
      </header>

      <div style={{display: 'flex', flex: 1}}>
        <div className="no-print" style={{width: '220px', background: 'white', borderRight: '1px solid #f3f4f6', padding: '16px', flexShrink: 0, overflowY: 'auto'}}>
          {capitulos.map((c, i) => (
            <button key={i} onClick={() => setCapAtual(i)} style={{
              background: capAtual === i ? '#faf5ff' : 'none',
              border: 'none', borderRadius: '8px', padding: '10px',
              color: capAtual === i ? '#7C3AED' : '#6b7280',
              cursor: 'pointer', textAlign: 'left', fontSize: '12px',
              width: '100%', marginBottom: '4px', lineHeight: '1.4',
              fontWeight: capAtual === i ? '700' : '500',
              borderLeft: capAtual === i ? '3px solid #7C3AED' : '3px solid transparent',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}>{c.titulo}</button>
          ))}
        </div>

        <div className="print-content" style={{flex: 1, padding: '40px', maxWidth: '680px', overflowY: 'auto'}}>
          <h2 style={{fontSize: '22px', fontWeight: '900', marginBottom: '24px', color: '#7C3AED', letterSpacing: '-0.3px'}}>{cap.titulo}</h2>
          {cap.conteudo.split('\n\n').map((p, i) => (
            <p key={i} style={{color: '#374151', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px'}}>{p}</p>
          ))}
          <div className="no-print" style={{display: 'flex', gap: '10px', marginTop: '40px'}}>
            {capAtual > 0 && <button className="btn-secondary" onClick={() => setCapAtual(c => c - 1)}>← Anterior</button>}
            {capAtual < capitulos.length - 1 && <button className="btn-primary" style={{marginLeft: 'auto'}} onClick={() => setCapAtual(c => c + 1)}>Próximo →</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
