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

export function montarPassos(p, navigate) {
  return [
    {
      id: 'filho',
      titulo: 'Cadastre seu filho',
      texto: 'A idade define tudo: quais atividades aparecem, a linguagem usada e o tempo recomendado de tela. Dá para cadastrar mais de um.',
      feito: p.filhos > 0,
      rotulo: p.filhos > 0 ? 'Ver no painel' : 'Cadastrar agora',
      ir: () => navigate('/dashboard'),
    },
    {
      id: 'timer',
      titulo: 'Escolha quanto tempo por dia',
      texto: 'É o limite de cada sessão. A própria tela sugere a duração da faixa etária do seu filho — se ele tem 5 anos, quarenta e cinco minutos já é bastante.',
      feito: p.temTimer,
      rotulo: p.temTimer ? 'Revisar tempo' : 'Definir o tempo',
      ir: () => navigate('/timer'),
    },
    {
      id: 'agenda',
      titulo: 'Marque os horários da semana',
      texto: 'Fora desses horários a plataforma se tranca sozinha e mostra sugestões do que fazer longe da tela. É o que evita a discussão de todo dia.',
      feito: p.temAgenda,
      rotulo: p.temAgenda ? 'Ajustar horários' : 'Montar a agenda',
      ir: () => navigate('/agenda'),
    },
    {
      id: 'crianca',
      titulo: 'Entre na área da criança',
      texto: 'É outro mundo: colorido, com moedas, ranking e loja. Vale entrar uma vez sozinho antes de sentar junto com ele.',
      feito: p.escolheuFilho,
      rotulo: 'Abrir a área da criança',
      ir: () => navigate('/home-crianca'),
    },
    {
      id: 'atividade',
      titulo: 'Façam a primeira atividade juntos',
      texto: 'A primeira vez acompanhado vale por dez sozinho — e para crianças de 4 e 5 anos o acompanhamento não é opcional.',
      feito: p.atividades > 0,
      rotulo: p.atividades > 0 ? `${p.atividades} já concluída${p.atividades > 1 ? 's' : ''}` : 'Ver as atividades',
      ir: () => navigate('/trilha'),
      travado: p.filhos === 0,
    },
    {
      id: 'relatorio',
      titulo: 'Abra o primeiro relatório',
      texto: 'Mostra em quais habilidades ele mais treinou e onde está a oportunidade. Só faz sentido depois da primeira atividade, por isso é o último.',
      feito: p.viuRelatorio,
      rotulo: 'Abrir relatório',
      ir: () => navigate('/relatorio'),
      travado: p.atividades === 0,
    },
  ]
}
