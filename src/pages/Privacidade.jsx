import { useNavigate } from 'react-router-dom'

export default function Privacidade() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '40px 48px', boxShadow: '0 2px 16px rgba(124,58,237,0.08)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', fontWeight: '700', fontSize: '14px', marginBottom: '24px', padding: 0 }}>← Voltar</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>🔒</span>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '900', fontSize: '24px', color: '#0f0a1e', margin: 0 }}>Política de Privacidade — NeuralSync Academy</h1>
        </div>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '32px' }}>Última atualização: junho de 2026</p>

        <style>{`
          .priv-h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 17px; color: #0f0a1e; margin: 28px 0 10px; }
          .priv-p { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #374151; line-height: 1.7; margin: 0 0 12px; }
          .priv-ul { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: #374151; line-height: 1.7; padding-left: 20px; margin: 0 0 12px; }
          /* A tabela tem 3 colunas de texto e nao cabe em 390px: media 25px pra
             fora, sem rolagem (html/body tem overflow-x: hidden). O invólucro
             rolável é o padrão pra tabela em tela estreita — mantém a tabela
             legível em vez de espremer as colunas até quebrar palavra. */
          .priv-table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 16px; }
          .priv-table { width: 100%; min-width: 420px; border-collapse: collapse; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif; }
          .priv-table th { background: #f3f0ff; color: #0f0a1e; font-weight: 700; padding: 10px 12px; text-align: left; border: 1px solid #e5e7eb; }
          .priv-table td { padding: 10px 12px; border: 1px solid #e5e7eb; color: #374151; vertical-align: top; }
        `}</style>

        <p className="priv-p">A NeuralSync Academy é operada por TI Verde, inscrita no CNPJ 65.554.953/0001-47, e leva a privacidade das crianças muito a sério. Esta política descreve quais dados coletamos, como os utilizamos e quais são os seus direitos como responsável legal.</p>

        <h2 className="priv-h2">1. Quem é o controlador dos dados</h2>
        <p className="priv-p">A NeuralSync Academy é a controladora dos dados pessoais coletados nesta plataforma, conforme o Art. 5º, VI da Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018). Para contato com o Encarregado de Dados (DPO): <strong>suporte@neuralsync.com.br</strong>.</p>

        <h2 className="priv-h2">2. Dados coletados</h2>
        <div className="priv-table-wrap"><table className="priv-table">
          <thead><tr><th>Dado</th><th>Titular</th><th>Finalidade</th></tr></thead>
          <tbody>
            <tr><td>Nome e e-mail</td><td>Responsável</td><td>Autenticação e comunicação</td></tr>
            <tr><td>Senha (hash)</td><td>Responsável</td><td>Autenticação segura</td></tr>
            <tr><td>Nome, idade e faixa etária</td><td>Criança</td><td>Personalizar atividades por nível</td></tr>
            <tr><td>Histórico de atividades e pontuação</td><td>Criança</td><td>Gamificação e relatórios de desempenho</td></tr>
            <tr><td>Configurações de controle parental</td><td>Responsável</td><td>Controle de tempo de tela</td></tr>
            <tr><td>Conversas com NeuralAI</td><td>Criança (inventores)</td><td>Interação educacional — não usadas para treino de IA</td></tr>
          </tbody>
        </table></div>
        <p className="priv-p">Não coletamos geolocalização, biometria, dados financeiros (pagamentos processados por parceiros) ou qualquer dado sensível desnecessário.</p>

        <h2 className="priv-h2">3. Base legal — Consentimento para dados de menores (Art. 14 LGPD)</h2>
        <p className="priv-p">O tratamento de dados de crianças e adolescentes é realizado com o <strong>consentimento específico e destacado de pelo menos um responsável legal</strong>, conforme exigido pelo Art. 14 da LGPD. O responsável manifesta esse consentimento no momento do cadastro.</p>

        <h2 className="priv-h2">4. Como usamos os dados</h2>
        <ul className="priv-ul">
          <li>Personalizar o nível de dificuldade das atividades conforme a faixa etária.</li>
          <li>Gerar relatórios de desempenho para os responsáveis.</li>
          <li>Calcular pontuações, ranking e conquistas.</li>
          <li>Enviar comunicações sobre a conta (somente ao responsável).</li>
          <li>Melhorar a plataforma a partir de métricas agregadas e anônimas.</li>
        </ul>
        <p className="priv-p"><strong>Não compartilhamos dados pessoais com terceiros para fins publicitários.</strong> Utilizamos a Anthropic (API de IA) para geração de conteúdo educacional; nenhuma informação pessoal identificável é enviada a essa API.</p>

        <h2 className="priv-h2">5. Armazenamento e segurança</h2>
        <p className="priv-p">Os dados são armazenados na plataforma Supabase (servidores na AWS, região São Paulo). Utilizamos criptografia em trânsito (HTTPS/TLS) e autenticação segura. Senhas nunca são armazenadas em texto claro.</p>

        <h2 className="priv-h2">6. Seus direitos (Art. 18 LGPD)</h2>
        <ul className="priv-ul">
          <li><strong>Confirmação e acesso:</strong> solicitar confirmação sobre tratamento e cópia dos dados.</li>
          <li><strong>Correção:</strong> atualizar dados incompletos ou desatualizados.</li>
          <li><strong>Exclusão:</strong> solicitar a exclusão de dados desnecessários (disponível em Configurações).</li>
          <li><strong>Portabilidade:</strong> receber os dados em formato estruturado.</li>
          <li><strong>Revogação do consentimento:</strong> a qualquer tempo, sem prejuízo do uso dos dados até aquele momento.</li>
        </ul>
        <p className="priv-p">Para exercer seus direitos, acesse <strong>Configurações → Exclusão de conta</strong> ou envie e-mail para <strong>suporte@neuralsync.com.br</strong>.</p>

        <h2 className="priv-h2">7. Cookies e localStorage</h2>
        {/* O texto anterior negava qualquer rastreamento, enquanto o site de vendas
              carrega o pixel do Meta. Declarar isso é obrigação da LGPD e das
              próprias políticas de anúncio do Meta. */}
          <p className="priv-p">Dentro da plataforma (<strong>app.neuralsync.com.br</strong>), onde a criança navega, utilizamos apenas o localStorage do navegador para preferências locais — configurações de timer, progresso de atividades e itens equipados. <strong>Não há rastreamento publicitário nem analytics de terceiros na área da criança.</strong></p>
          <p className="priv-p">No nosso site de divulgação (<strong>neuralsync.com.br</strong>), destinado a adultos e sem login, utilizamos o Meta Pixel para medir o resultado de anúncios. Ele registra visitas e conversões de forma anônima e <strong>nunca recebe qualquer dado das crianças cadastradas</strong>. Você pode bloqueá-lo nas configurações do navegador sem prejuízo ao uso da plataforma.</p>

        <h2 className="priv-h2">8. Crianças e adolescentes</h2>
        <p className="priv-p">Seguimos rigorosamente o Art. 14 da LGPD. O perfil de criança é sempre criado pelo responsável, não pela própria criança. Dados de crianças nunca são usados para publicidade segmentada ou compartilhados com anunciantes.</p>

        <h2 className="priv-h2">9. Alterações nesta política</h2>
        <p className="priv-p">Podemos atualizar esta política periodicamente. Avisaremos por e-mail quando houver mudanças relevantes. O uso continuado após a notificação implica aceite das alterações.</p>

        <h2 className="priv-h2">10. Contato</h2>
        <p className="priv-p">Dúvidas ou solicitações: <strong>suporte@neuralsync.com.br</strong></p>
      </div>
    </div>
  )
}
