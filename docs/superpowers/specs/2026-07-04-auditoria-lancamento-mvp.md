# Auditoria de Lançamento MVP — NeuralSync Academy

**Data:** 2026-07-04
**Objetivo:** Verificar se o app está pronto para lançamento (fluxo de compra, app completo, landing, mobile) antes de resetar o cronômetro de lançamento e virar o foco 100% para tráfego.

**Método:** Leitura de código (webhook Kiwify, AuthContext, migrations RLS) + testes ao vivo com `npm run dev` + Playwright (3 contas de teste reais criadas: cadastro → filho → área da criança → atividade) + auditoria mobile já realizada hoje mais cedo (reaproveitada, ver `project_neuralsync_infra.md`).

---

## 🔴 CRÍTICO — resolver antes de investir em tráfego pago

### [B1] Cliente que paga antes de criar conta pode não receber o plano
- **Onde:** `src/contexts/AuthContext.jsx` (`signIn`/`signUp`) consulta a tabela `pending_subscriptions` direto do navegador, usando a chave anônima do Supabase.
- **Problema:** `supabase/migrations/001_schema.sql:38-39` ativa RLS nessa tabela e diz explicitamente **"Sem políticas públicas — só acessível via service_role key"**. Ou seja, a query do navegador está sempre bloqueada pelo RLS — nunca vai encontrar a assinatura pendente, mesmo quando ela existe.
- **Por que importa:** o fluxo `Auth.jsx` tem uma tela inteira desenhada pra isso — `/auth?ativado=1&plano=familia` mostra "Pagamento confirmado! Crie sua conta para ativar o acesso" (linha 52-74 de `Auth.jsx`). Esse é o caminho que a Kiwify deve redirecionar depois do pagamento. Hoje, quem paga primeiro e cria a conta depois **paga e não recebe o plano automaticamente**.
- **Quem NÃO é afetado:** quem cria a conta primeiro e paga depois — nesse caso o webhook encontra o usuário existente e atualiza direto via service_role (funciona).
- **Fix recomendado:** mover a checagem de `pending_subscriptions` para dentro de uma Edge Function (com service_role), chamada logo após o cadastro/login — mesmo padrão já usado no `kiwify-webhook`. É uma mudança pequena e localizada.

---

## 🟡 MÉDIO — prejudica confiança/conversão, mas não impede o uso

### [B2] "Começar grátis" leva direto pra um checkout pago
- **Onde:** `src/pages/Landing.jsx` (3 ocorrências) e `src/pages/Planos.jsx` (botão do card Starter).
- **Problema:** não existe plano gratuito na tabela de preços — todos os 6 links (Starter/Família/Premium × mensal/anual) vão pro Kiwify cobrar na hora. O card do Starter mostra "R$29/mês" bem acima do botão "Começar grátis →" — contradição visual direta, confirmada com screenshot ao vivo.
- **Risco:** sensação de propaganda enganosa logo na entrada do funil de vendas.
- **Fix:** trocar o texto para algo como "Assinar Starter →", ou linkar de fato para um cadastro gratuito (existe uma experiência funcional com 1 filho sem plano ativo — ver nota abaixo).

### [B3] Número de atividades desatualizado na tela de cadastro
- **Onde:** `src/pages/Auth.jsx:183` — painel lateral mostra "177+ Atividades".
- **Real:** a landing (`neuralsync-landing/index.html`) já fala "300+", e o total real hoje é maior ainda com as expansões recentes.
- **Fix:** atualizar a constante ou puxar de um lugar único de verdade.

### [B4] Ruído de erro 406 em todo cadastro/login
- **Onde:** `AuthContext.jsx` — a mesma query de `pending_subscriptions` (item B1) usa `.single()`, que retorna erro 406 do Supabase quando não encontra nenhuma linha (o caso mais comum: 100% dos cadastros sem pagamento prévio).
- **Impacto:** nenhum funcional (o código trata o retorno vazio corretamente), mas é ruído em qualquer monitoramento de erro (Sentry etc.) e fica visível no console do navegador.
- **Fix:** consequência natural do fix do B1 (mover pra Edge Function resolve os dois juntos).

---

## ✅ Verificado funcionando (testado ao vivo, não só lido no código)

- **Cadastro → criação de filho → questionário → área da criança → tela de quiz**: fluxo completo testado com 3 contas reais, zero erros JS, zero bugs visuais.
- **Links de checkout Kiwify**: os 6 links batem exatamente entre `Planos.jsx` (app) e a landing estática — nenhuma inconsistência de URL.
- **Webhook Kiwify** (`supabase/functions/kiwify-webhook`): trata pago/cancelado/reembolso corretamente, calcula plano e validade certos, usa service_role (não é afetado pelo bug do B1).
- **LGPD básico**: `/termos`, `/privacidade` e checkbox de consentimento parental presentes no cadastro (herdado da auditoria de segurança de jun/2026).
- **Mobile**: auditoria completa feita hoje mais cedo (390×844, Playwright) cobrindo pai/criança/jogos/páginas públicas incluindo `Planos.jsx` — zero overflow, zero erros JS. Não precisa refazer.
- **Conteúdo "Em breve" já é honesto onde existe**: Kids TV mostra "Em breve" apenas nas categorias específicas que ainda não têm Experimentos/Flashcards/História Interativa — não é um placeholder genérico, é por categoria, e a maioria das 18 categorias já tem conteúdo real.
- **Existe uma experiência funcional sem pagamento**: uma conta nova sem plano ativo consegue cadastrar 1 filho e usar a área da criança normalmente (banner "Assinatura pendente" aparece, mas não bloqueia o uso básico) — vale considerar isso como o "grátis" real, e ajustar a comunicação (B2) para refletir isso com precisão em vez de prometer algo que não existe do jeito que está escrito.

## ⚪ Não dá pra verificar por código — checar manualmente

- `KIWIFY_WEBHOOK_TOKEN` está configurado nos Secrets do Supabase? (sem isso o webhook rejeita tudo com 500)
- O painel da Kiwify está configurado pra redirecionar o comprador para `https://app.neuralsync.com.br/auth?ativado=1&plano=SEUPLANO` após o pagamento? Esse redirect é o que faz a tela especial do `Auth.jsx` aparecer.
- Os 6 links de checkout estão ativos e cobrando o valor certo (não simulei um pagamento real).

## Observação sobre o git (fora do escopo desta auditoria, mas relevante)

Nesta mesma sessão descobri e corrigi que o `master` do git estava meses desatualizado — dezenas de arquivos existiam só no disco, nunca commitados. Já resolvido com um commit de sincronização (`909aa35`). Não é um problema de lançamento, mas é bom saber que agora o histórico do git reflete o app de verdade.

## Contas de teste criadas durante a auditoria

3 contas reais foram criadas no Supabase para testar o fluxo (emails `auditoria.launch*@teste-neuralsync.com`). Recomendo apagar essas contas de teste e os filhos associados antes do lançamento — não tenho acesso de service_role pra fazer isso eu mesmo, precisa ser via Supabase Dashboard.

---

## Recomendação

**Ainda não é hora de virar 100% para tráfego** — mas está muito perto. Sugiro nesta ordem:

1. Corrigir **B1** (bug do plano não ativado) — é o único item que pode custar dinheiro/confiança de verdade em um lançamento pago. Pequeno de corrigir (uma Edge Function).
2. Corrigir **B2** e **B3** (copy) — 15 minutos de trabalho, mas evita a primeira impressão de "prometeu grátis, cobrou".
3. Confirmar manualmente os 3 itens da lista ⚪ (token do webhook, redirect da Kiwify, links ativos).
4. Depois disso: resetar o cronômetro da landing para **2026-09-02** (60 dias a partir de hoje) e focar 100% em tráfego, como pedido.

Quer que eu corrija B1/B2/B3 agora (rápido, focado, sem tocar em Colorir/Sílabas) antes de resetar o cronômetro?
