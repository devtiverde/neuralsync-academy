import { supabase } from './supabase'

// Fonte única do progresso de configuração inicial.
//
// Duas telas consomem isto: `/primeiros-passos` (a lista) e o Dashboard (a faixa que diz
// quantos passos faltam). Ficou em lib, e não dentro da página, por dois motivos: importar
// a página no Dashboard arrastaria o componente inteiro para o pedaço do painel, e duas
// contagens escritas separadamente divergem — a faixa diria "faltam 2" com a tela mostrando
// 3, o tipo de inconsistência que só aparece na frente do cliente.

export const CHAVE_DISPENSA = 'ns_primeiros_passos_dispensado'
export const CHAVE_VIU_RELATORIO = 'ns_viu_relatorio'

function lerLocal(chave) {
  try { return localStorage.getItem(chave) } catch { return null }
}

export async function lerProgresso(userId) {
  const vazio = {
    filhos: 0, temTimer: false, temAgenda: false,
    escolheuFilho: false, atividades: 0, viuRelatorio: false,
  }
  if (!userId) return vazio

  const [{ data: filhos }, { data: conta }, { count: atividades }] = await Promise.all([
    supabase.from('children').select('id').eq('parent_id', userId),
    supabase.from('users').select('timer_config, agenda_config').eq('id', userId).maybeSingle(),
    supabase.from('ns_historico').select('id', { count: 'exact', head: true }).eq('parent_id', userId),
  ])

  const agenda = conta?.agenda_config
  return {
    filhos: filhos?.length ?? 0,
    temTimer: !!conta?.timer_config,
    // A agenda existir não basta: ela nasce com os sete dias desligados, e um objeto de
    // dias todos inativos não bloqueia nada. Só conta se algum dia estiver ligado.
    temAgenda: Array.isArray(agenda) ? agenda.some(d => d?.ativo) : !!agenda,
    escolheuFilho: !!lerLocal('ns_active_child'),
    atividades: atividades ?? 0,
    viuRelatorio: lerLocal(CHAVE_VIU_RELATORIO) === '1',
  }
}

/**
 * De LISTA para GUIA — 24/09/2026
 *
 * Relato do Cláudio: *"os seis passos iniciais não estão intuitivos"* e *"tem que ter
 * um GUIA de configuração inicial com passo a passo"*. A tela existia e os seis passos
 * já se marcavam sozinhos lendo o dado real — o que faltava era o resto:
 *
 *  · `comoFazer` — o que a pessoa VAI VER quando chegar lá. Dizer "cadastre seu filho"
 *    e soltar alguém no painel inteiro não é guiar; é apontar. As instruções abaixo são
 *    o que aparece na tela de destino, na ordem em que aparecem.
 *  · `minutos` — seis passos sem estimativa parecem seis tardes. Somados dão 9 minutos,
 *    e saber disso muda a decisão de começar agora ou "depois".
 *  · `rota` como string, além do `ir()` — o painel precisa NOMEAR o próximo passo sem
 *    navegar, e o teste precisa conferir o destino sem clicar.
 *
 * 🪤 O passo 1 mandava para `/dashboard` e o cadastro mora num MODAL lá dentro: a
 * pessoa chegava numa tela cheia e tinha que achar "+ Adicionar filho". Agora vai com
 * `?novoFilho=1` e o painel abre o modal sozinho.
 */
export function montarPassos(p, navigate) {
  const passos = [
    {
      id: 'filho',
      titulo: 'Cadastre seu filho',
      texto: 'A idade define tudo: quais atividades aparecem, a linguagem usada e o tempo recomendado de tela. Dá para cadastrar mais de um.',
      comoFazer: [
        'A janela de cadastro abre sozinha quando você chegar.',
        'Nome e idade bastam — a faixa etária é escolhida a partir da idade.',
        'Salve. O filho aparece no painel com a barra de XP zerada.',
      ],
      minutos: 1,
      feito: p.filhos > 0,
      rotulo: p.filhos > 0 ? 'Ver no painel' : 'Cadastrar agora',
      rota: p.filhos > 0 ? '/dashboard' : '/dashboard?novoFilho=1',
      ir: () => navigate(p.filhos > 0 ? '/dashboard' : '/dashboard?novoFilho=1'),
    },
    {
      id: 'timer',
      titulo: 'Escolha quanto tempo por dia',
      texto: 'É o limite de cada sessão. A própria tela sugere a duração da faixa etária do seu filho — se ele tem 5 anos, quarenta e cinco minutos já é bastante.',
      comoFazer: [
        'Arraste a barra para os minutos de cada sessão.',
        'O texto abaixo dela confirma em palavras o que você escolheu.',
        'Toque em "Salvar configuração" — só aí vale.',
      ],
      minutos: 1,
      feito: p.temTimer,
      rotulo: p.temTimer ? 'Revisar tempo' : 'Definir o tempo',
      rota: '/timer',
      ir: () => navigate('/timer'),
    },
    {
      id: 'agenda',
      titulo: 'Marque os horários da semana',
      texto: 'Fora desses horários a plataforma se tranca sozinha e mostra sugestões do que fazer longe da tela. É o que evita a discussão de todo dia.',
      comoFazer: [
        'Ligue os dias em que ele pode usar e ponha início e fim.',
        'Dia desligado significa que não pode usar naquele dia.',
        'Toque em "Salvar agenda".',
      ],
      minutos: 2,
      feito: p.temAgenda,
      rotulo: p.temAgenda ? 'Ajustar horários' : 'Montar a agenda',
      rota: '/agenda',
      ir: () => navigate('/agenda'),
    },
    {
      id: 'crianca',
      titulo: 'Entre na área da criança',
      texto: 'É outro mundo: colorido, com moedas, ranking e loja. Vale entrar uma vez sozinho antes de sentar junto com ele.',
      comoFazer: [
        'A tela muda de cara: fundo escuro, moedas e a barra de XP no topo.',
        'A barra de baixo leva a Trilha, Kids TV, Loja e Diário.',
        'Para voltar ao painel, use "Perfil" e depois sair da área da criança.',
      ],
      minutos: 2,
      feito: p.escolheuFilho,
      rotulo: 'Abrir a área da criança',
      rota: '/home-crianca',
      ir: () => navigate('/home-crianca'),
    },
    {
      id: 'atividade',
      titulo: 'Façam a primeira atividade juntos',
      texto: 'A primeira vez acompanhado vale por dez sozinho — e para crianças de 4 e 5 anos o acompanhamento não é opcional.',
      comoFazer: [
        'Escolha qualquer cartão da Trilha — todos servem para a primeira vez.',
        'Antes do jogo vem uma tela de introdução; ela pode ser narrada.',
        'Ao terminar, o XP e as moedas são creditados na hora.',
      ],
      minutos: 2,
      feito: p.atividades > 0,
      rotulo: p.atividades > 0 ? `${p.atividades} já concluída${p.atividades > 1 ? 's' : ''}` : 'Ver as atividades',
      rota: '/trilha',
      ir: () => navigate('/trilha'),
      travado: p.filhos === 0,
      porqueTravado: 'Cadastre um filho primeiro — sem ele não há atividade para abrir.',
    },
    {
      id: 'relatorio',
      titulo: 'Abra o primeiro relatório',
      texto: 'Mostra em quais habilidades ele mais treinou e onde está a oportunidade. Só faz sentido depois da primeira atividade, por isso é o último.',
      comoFazer: [
        'A aba Semanal mostra o que ele fez nos últimos sete dias.',
        'O gráfico de habilidades aponta onde está a oportunidade.',
        'Dá para baixar em PDF, se quiser mostrar para alguém.',
      ],
      minutos: 1,
      feito: p.viuRelatorio,
      rotulo: 'Abrir relatório',
      rota: '/relatorio',
      ir: () => navigate('/relatorio'),
      travado: p.atividades === 0,
      porqueTravado: 'O relatório nasce vazio sem nenhuma atividade concluída.',
    },
  ]
  return passos
}

/**
 * Qual passo mostrar em destaque agora: o primeiro que não está feito e não está
 * travado. Se todos estiverem feitos devolve `null` — quem chama trata o fim.
 *
 * 🔑 Pular o travado é o que impede o guia de parar num passo impossível: sem filho
 * cadastrado, "faça a primeira atividade" não tem como ser feito, e insistir nele
 * deixaria o guia mudo enquanto o caminho de saída está dois cartões acima.
 */
export function passoAtual(passos) {
  return passos.find(p => !p.feito && !p.travado) || passos.find(p => !p.feito) || null
}

/** Minutos somados dos passos que ainda faltam. */
export function minutosRestantes(passos) {
  return passos.filter(p => !p.feito).reduce((t, p) => t + (p.minutos || 0), 0)
}
