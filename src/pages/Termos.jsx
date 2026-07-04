import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function Termos() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '40px 48px', boxShadow: '0 2px 16px rgba(124,58,237,0.08)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', fontWeight: '700', fontSize: '14px', marginBottom: '24px', padding: 0 }}>← Voltar</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🧠</span>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '900', fontSize: '24px', color: '#0f0a1e', margin: 0 }}>Termos de Uso — NeuralSync Academy</h1>
        </div>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '32px' }}>Última atualização: junho de 2026</p>

        <style>{`
          .termos-h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 17px; color: #0f0a1e; margin: 28px 0 10px; }
          .termos-p { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #374151; line-height: 1.7; margin: 0 0 12px; }
          .termos-ul { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #374151; line-height: 1.7; padding-left: 20px; margin: 0 0 12px; }
        `}</style>

        <p className="termos-p">Bem-vindo à NeuralSync Academy! Ao criar uma conta e utilizar nossa plataforma, você concorda com os termos descritos abaixo. Leia com atenção antes de prosseguir.</p>

        <h2 className="termos-h2">1. Sobre a plataforma</h2>
        <p className="termos-p">A NeuralSync Academy é uma plataforma educacional gamificada voltada para crianças de 3 a 15 anos, acessível mediante assinatura. O responsável legal da criança (pai, mãe ou tutor) é o titular da conta.</p>

        <h2 className="termos-h2">2. Cadastro e responsabilidade</h2>
        <ul className="termos-ul">
          <li>Somente adultos (maiores de 18 anos) podem criar uma conta.</li>
          <li>O responsável legal é quem realiza o cadastro e gerencia o acesso das crianças.</li>
          <li>As informações fornecidas devem ser verdadeiras e atualizadas.</li>
          <li>Você é responsável pela segurança de sua senha.</li>
        </ul>

        <h2 className="termos-h2">3. Proteção de dados de menores (LGPD — Lei 13.709/2018)</h2>
        <p className="termos-p">A plataforma coleta dados das crianças (nome, idade, faixa etária, desempenho em atividades) exclusivamente para fins educacionais, mediante consentimento explícito do responsável legal, conforme previsto no Art. 14 da LGPD. Não compartilhamos esses dados com terceiros para fins comerciais.</p>

        <h2 className="termos-h2">4. Uso permitido</h2>
        <ul className="termos-ul">
          <li>A plataforma é de uso pessoal e não comercial.</li>
          <li>É proibido compartilhar credenciais de acesso com terceiros.</li>
          <li>É proibido tentar acessar dados de outras famílias.</li>
          <li>O conteúdo da plataforma (atividades, textos, imagens) é protegido por direitos autorais.</li>
        </ul>

        <h2 className="termos-h2">5. Planos e pagamentos</h2>
        <p className="termos-p">Os valores e condições de cada plano estão descritos na página de Planos. Cancelamentos podem ser realizados a qualquer momento pelo responsável da conta. Não há reembolso proporcional de período não utilizado, exceto nos 7 dias de garantia iniciais.</p>

        <h2 className="termos-h2">6. Moeda virtual (NeuralCoins)</h2>
        <p className="termos-p">NeuralCoins são pontos virtuais conquistados pelas crianças nas atividades. Não possuem valor monetário e não podem ser convertidos em dinheiro.</p>

        <h2 className="termos-h2">7. Itens da Loja</h2>
        <p className="termos-p">Avatares, títulos, efeitos, molduras, temas visuais e power-ups comprados com NeuralCoins ficam associados à conta. Brindes físicos (cadernos, canecas, camisetas, mochilas) podem ser resgatados diretamente na Loja mediante saldo suficiente, com entrega coordenada via e-mail do responsável.</p>

        <h2 className="termos-h2">8. Disponibilidade e modificações</h2>
        <p className="termos-p">A NeuralSync Academy pode passar por manutenções e atualizações. Podemos modificar estes termos com aviso prévio por e-mail. O uso continuado após a notificação implica aceite das alterações.</p>

        <h2 className="termos-h2">9. Contato</h2>
        <p className="termos-p">Dúvidas sobre estes Termos? Entre em contato pelo e-mail <strong>suporte@neuralsync.com.br</strong>.</p>
      </div>
    </div>
  )
}
