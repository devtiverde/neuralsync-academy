import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pai.css'

const capitulos = [
  { titulo: 'Introdução — A Tela Não É a Vilã', conteudo: 'A tecnologia não é o problema. O problema é como usamos ela.\n\nNos últimos anos, criamos uma narrativa em que a tela é a vilã da história — responsável por tudo, desde a falta de atenção até problemas de socialização. Mas essa visão é simplista demais para um fenômeno tão complexo.\n\nA verdade é que a tela é uma ferramenta. Como toda ferramenta, pode construir ou destruir, dependendo de quem a usa e como.\n\nEste livro não vai te ensinar a proibir o celular do seu filho. Vai te ensinar a transformá-lo em uma das mais poderosas ferramentas de desenvolvimento cognitivo da história da educação.' },
  { titulo: 'Capítulo 1 — O Cérebro Aprende Fazendo', conteudo: 'Jean Piaget nos ensinou algo fundamental: a criança aprende fazendo, não observando.\n\nO construtivismo — teoria que fundamenta toda a NeuralSync Academy — parte do princípio de que o conhecimento é construído ativamente pelo aprendiz.\n\nQuando sua filha joga um jogo que requer raciocínio lógico, ela não está perdendo tempo. Ela está construindo estruturas cognitivas que vão durar a vida toda.\n\nO problema com a maioria dos conteúdos digitais é que eles são passivos. A criança consome, mas não produz. Assiste, mas não pensa.' },
  { titulo: 'Capítulo 2 — Regras de Ouro', conteudo: 'As principais organizações de saúde do mundo têm diretrizes claras sobre tempo de tela.\n\nPara crianças de 2 a 5 anos: máximo 1 hora por dia de conteúdo de qualidade, sempre com supervisão adulta.\n\nPara crianças de 6 a 12 anos: limite consistente de tempo, priorizando atividades físicas, sono e interações presenciais.\n\nMas atenção: essas diretrizes foram criadas pensando em uso passivo. Uma hora de jogo cognitivo ativo é fundamentalmente diferente de uma hora assistindo vídeos aleatórios.' },
]

export default function EbookLeitura() {
  const navigate = useNavigate()
  const [capAtual, setCapAtual] = useState(0)
  const cap = capitulos[capAtual]

  return (
    <div style={{background: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <header className="pai-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => navigate('/ebook')} className="btn-secondary">← Voltar</button>
          <h2 style={{fontWeight: '800', fontSize: '16px', color: '#0f0a1e'}}>A Tela Certa</h2>
        </div>
        <span style={{color: '#9ca3af', fontSize: '13px', fontWeight: '600'}}>{capAtual + 1}/{capitulos.length}</span>
      </header>

      <div style={{display: 'flex', flex: 1}}>
        <div style={{width: '220px', background: 'white', borderRight: '1px solid #f3f4f6', padding: '16px', flexShrink: 0}}>
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

        <div style={{flex: 1, padding: '40px', maxWidth: '680px', overflowY: 'auto'}}>
          <h2 style={{fontSize: '22px', fontWeight: '900', marginBottom: '24px', color: '#7C3AED', letterSpacing: '-0.3px'}}>{cap.titulo}</h2>
          {cap.conteudo.split('\n\n').map((p, i) => (
            <p key={i} style={{color: '#374151', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px'}}>{p}</p>
          ))}
          <div style={{display: 'flex', gap: '10px', marginTop: '40px'}}>
            {capAtual > 0 && <button className="btn-secondary" onClick={() => setCapAtual(c => c - 1)}>← Anterior</button>}
            {capAtual < capitulos.length - 1 && <button className="btn-primary" style={{marginLeft: 'auto'}} onClick={() => setCapAtual(c => c + 1)}>Próximo →</button>}
          </div>
        </div>
      </div>
    </div>
  )
}