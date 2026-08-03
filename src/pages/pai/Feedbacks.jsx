import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import LayoutPai from '../../components/LayoutPai'
import '../../styles/pai.css'

// Painel de leitura dos feedbacks (rota /feedbacks).
//
// Até aqui o único jeito de ler `ns_feedback` era rodar SELECT no SQL Editor — está escrito
// no rodapé da migration 017. Com cliente pagando, o reporte de erro precisa de uma tela.
//
// Mostra DUAS coisas na mesma lista, de propósito: o que a pessoa escreveu no balão 💬 e as
// falhas que o app reporta sozinho (ErrorBoundary e `lib/gravar.js` gravam na mesma tabela
// com o prefixo `[automático]`). Separar em duas telas faria a falha silenciosa continuar
// silenciosa — que foi exatamente o problema que o `gravar.js` nasceu para resolver.
//
// Acesso: migration 021. A política de leitura exige linha em `ns_admins`; sem ela esta tela
// abre dizendo que não há acesso, e não vazia — vazio e sem-permissão são coisas diferentes
// e confundi-las manda procurar bug onde não tem.

const TIPOS = {
  bug:      { rotulo: 'Erro',     emoji: '🐛', cor: '#dc2626' },
  sugestao: { rotulo: 'Ideia',    emoji: '💡', cor: '#c2740a' },
  duvida:   { rotulo: 'Dúvida',   emoji: '❓', cor: '#2563eb' },
  elogio:   { rotulo: 'Elogio',   emoji: '💜', cor: '#7C3AED' },
}

const PREFIXO_AUTOMATICO = '[automático]'

// `agora` entra por parâmetro em vez de ser lido aqui dentro: ler o relógio durante a
// renderização torna o resultado instável entre dois desenhos do mesmo estado, e o React
// avisa sobre isso. O instante é fixado uma vez, quando a lista chega — que é o que a
// pessoa está vendo mesmo: uma fotografia daquele momento.
function quandoFoi(iso, agora) {
  const min = Math.round((agora - new Date(iso).getTime()) / 60000)
  if (min < 1)    return 'agora'
  if (min < 60)   return `há ${min} min`
  const h = Math.round(min / 60)
  if (h < 24)     return `há ${h} h`
  const d = Math.round(h / 24)
  if (d < 30)     return `há ${d} ${d === 1 ? 'dia' : 'dias'}`
  return new Date(iso).toLocaleDateString('pt-BR')
}

function dataCompleta(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

// o aparelho importa pro diagnóstico, mas a linha crua do navegador é ilegível e ocupa
// três linhas no card. Reduz ao que responde "reproduz onde?".
function resumirAparelho(ua) {
  if (!ua) return null
  const s = String(ua)
  const sistema =
    /iPhone|iPad|iPod/i.test(s) ? 'iPhone/iPad' :
    /Android/i.test(s)          ? 'Android'     :
    /Windows/i.test(s)          ? 'Windows'     :
    /Macintosh|Mac OS/i.test(s) ? 'Mac'         :
    /Linux/i.test(s)            ? 'Linux'       : 'outro'
  const navegador =
    /Edg\//i.test(s)     ? 'Edge'    :
    /OPR\/|Opera/i.test(s) ? 'Opera' :
    /Chrome\//i.test(s)  ? 'Chrome'  :
    /Firefox\//i.test(s) ? 'Firefox' :
    /Safari\//i.test(s)  ? 'Safari'  : ''
  return navegador ? `${sistema} · ${navegador}` : sistema
}

export default function Feedbacks() {
  const { user } = useAuth()
  const [carregando, setCarregando] = useState(true)
  const [ehAdmin, setEhAdmin] = useState(false)
  const [itens, setItens] = useState([])
  const [erro, setErro] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtroStatus, setFiltroStatus] = useState('abertos')
  const [expandido, setExpandido] = useState(null)
  const [salvando, setSalvando] = useState(null)
  const [agora, setAgora] = useState(0)

  useEffect(() => {
    let vivo = true

    async function carregar() {
      if (!user) return
      setCarregando(true)
      setErro('')

      // A política de leitura da 021 já filtra: quem não é admin recebe só os próprios
      // feedbacks, sem erro. Por isso a checagem de admin é explícita — sem ela, um pai
      // comum abriria a tela e veria os próprios reportes como se fosse o painel do dono.
      const { data: admin } = await supabase
        .from('ns_admins').select('user_id').eq('user_id', user.id).maybeSingle()

      if (!vivo) return
      if (!admin) { setEhAdmin(false); setCarregando(false); return }
      setEhAdmin(true)

      const { data, error } = await supabase
        .from('ns_feedback')
        .select('id, tipo, mensagem, contexto, resolvido, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(300)

      if (!vivo) return
      if (error) setErro('Não consegui carregar os feedbacks: ' + error.message)
      else setItens(data || [])
      setAgora(Date.now())
      setCarregando(false)
    }

    carregar()
    return () => { vivo = false }
  }, [user])

  async function alternarResolvido(item) {
    setSalvando(item.id)
    const novo = !item.resolvido
    const { error } = await supabase
      .from('ns_feedback').update({ resolvido: novo }).eq('id', item.id)
    setSalvando(null)

    if (error) {
      // marcar como resolvido e a tela mentir que salvou é pior do que não ter o botão:
      // o reporte sumiria da lista de abertos sem nunca ter mudado no banco.
      setErro('Não consegui salvar: ' + error.message)
      return
    }
    setErro('')
    setItens(lista => lista.map(f => (f.id === item.id ? { ...f, resolvido: novo } : f)))
  }

  const visiveis = useMemo(() => itens.filter(f => {
    if (filtroTipo !== 'todos' && f.tipo !== filtroTipo) return false
    if (filtroStatus === 'abertos'    && f.resolvido)  return false
    if (filtroStatus === 'resolvidos' && !f.resolvido) return false
    return true
  }), [itens, filtroTipo, filtroStatus])

  const resumo = useMemo(() => {
    const abertos = itens.filter(f => !f.resolvido)
    const seteDias = agora - 7 * 24 * 60 * 60 * 1000
    return {
      abertos: abertos.length,
      bugs: abertos.filter(f => f.tipo === 'bug').length,
      automaticos: abertos.filter(f => (f.mensagem || '').startsWith(PREFIXO_AUTOMATICO)).length,
      semana: itens.filter(f => new Date(f.created_at).getTime() > seteDias).length,
    }
  }, [itens, agora])

  // ── estados que não são a lista ───────────────────────────
  if (carregando) {
    return (
      <LayoutPai>
        <div className="pai-content" style={{ padding: '48px 24px', color: '#6b7280' }}>
          Carregando feedbacks…
        </div>
      </LayoutPai>
    )
  }

  if (!ehAdmin) {
    return (
      <LayoutPai>
        <div className="pai-content" style={{ padding: '48px 24px' }}>
          <div style={{
            background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '16px',
            padding: '32px', maxWidth: '560px',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0f0a1e', margin: '0 0 10px' }}>
              Esta tela é da administração
            </h1>
            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              Sua conta não está cadastrada como administradora, então não há nada para mostrar
              aqui. Se você chegou por engano, é só voltar ao painel — nada foi perdido.
            </p>
          </div>
        </div>
      </LayoutPai>
    )
  }

  return (
    <LayoutPai>
      <div className="pai-content" style={{ padding: '28px 24px 64px' }}>

        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C3AED', marginBottom: '6px' }}>
            Administração
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f0a1e', margin: '0 0 8px' }}>
            O que estão dizendo
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px', margin: 0, maxWidth: '62ch', lineHeight: 1.55 }}>
            Tudo que chegou pelo balão 💬 e as falhas que o app reportou sozinho, na mesma lista.
            Cada envio também é avisado por e-mail em <strong>suporte@neuralsync.com.br</strong>.
          </p>
        </div>

        {/* resumo — encolhe pra 2 colunas no celular via .pai-stats-grid */}
        <div className="pai-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '22px' }}>
          {[
            { n: resumo.abertos,     rot: 'Em aberto',            cor: '#7C3AED' },
            { n: resumo.bugs,        rot: 'Erros em aberto',      cor: '#dc2626' },
            { n: resumo.automaticos, rot: 'Falhas automáticas',   cor: '#c2740a' },
            { n: resumo.semana,      rot: 'Nos últimos 7 dias',   cor: '#6b7280' },
          ].map(s => (
            <div key={s.rot} style={{
              background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '14px',
              padding: '16px 18px', minWidth: 0,
            }}>
              <div style={{ fontFamily: 'Space Grotesk, Plus Jakarta Sans, sans-serif', fontSize: '28px', fontWeight: 800, color: s.cor, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
                {s.n}
              </div>
              <div style={{ fontSize: '12.5px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>{s.rot}</div>
            </div>
          ))}
        </div>

        {erro && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', marginBottom: '18px' }}>
            {erro}
          </div>
        )}

        {/* filtros — rolagem horizontal, senão os chips saem da tela no celular */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '10px', scrollbarWidth: 'none' }}>
          {[['abertos', 'Em aberto'], ['resolvidos', 'Resolvidos'], ['todos', 'Todos']].map(([id, rot]) => (
            <button
              key={id}
              onClick={() => setFiltroStatus(id)}
              style={chipEstilo(filtroStatus === id)}
            >{rot}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '20px', scrollbarWidth: 'none' }}>
          <button onClick={() => setFiltroTipo('todos')} style={chipEstilo(filtroTipo === 'todos')}>Tudo</button>
          {Object.entries(TIPOS).map(([id, t]) => (
            <button key={id} onClick={() => setFiltroTipo(id)} style={chipEstilo(filtroTipo === id)}>
              {t.emoji} {t.rotulo}
            </button>
          ))}
        </div>

        {visiveis.length === 0 ? (
          <div style={{ background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '16px', padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>
              {itens.length === 0 ? '📭' : '✅'}
            </div>
            <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
              {itens.length === 0
                ? 'Ninguém escreveu ainda. Quando chegar o primeiro, ele aparece aqui e no e-mail.'
                : 'Nada nesse filtro.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {visiveis.map(item => {
              const t = TIPOS[item.tipo] || { rotulo: item.tipo, emoji: '•', cor: '#6b7280' }
              const ctx = item.contexto || {}
              const automatico = String(item.mensagem || '').startsWith(PREFIXO_AUTOMATICO)
              const aberto = expandido === item.id
              const aparelho = resumirAparelho(ctx.user_agent)
              const emailDeQuem = ctx.email || null

              return (
                <article key={item.id} style={{
                  background: 'white',
                  border: '1.5px solid ' + (item.resolvido ? '#e5e7eb' : t.cor + '33'),
                  borderRadius: '14px', padding: '18px 20px',
                  opacity: item.resolvido ? 0.62 : 1,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      background: t.cor + '18', color: t.cor,
                      fontSize: '12px', fontWeight: 800, padding: '4px 10px', borderRadius: '7px',
                    }}>
                      {t.emoji} {t.rotulo}
                    </span>

                    {automatico && (
                      <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '11.5px', fontWeight: 800, padding: '4px 9px', borderRadius: '7px' }}>
                        AUTOMÁTICO
                      </span>
                    )}
                    {item.resolvido && (
                      <span style={{ background: '#dcfce7', color: '#166534', fontSize: '11.5px', fontWeight: 800, padding: '4px 9px', borderRadius: '7px' }}>
                        RESOLVIDO
                      </span>
                    )}

                    <span title={dataCompleta(item.created_at)} style={{ marginLeft: 'auto', fontSize: '12.5px', color: '#9ca3af', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {quandoFoi(item.created_at, agora)}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 12px', fontSize: '15px', lineHeight: 1.6, color: '#1f2937', whiteSpace: 'pre-wrap' }}>
                    {item.mensagem}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {ctx.rota && (
                      <span style={{ fontSize: '12.5px', color: '#6b7280', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '4px 9px', borderRadius: '7px', fontFamily: 'ui-monospace, Consolas, monospace', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ctx.rota}
                      </span>
                    )}
                    {aparelho && (
                      <span style={{ fontSize: '12.5px', color: '#6b7280' }}>{aparelho}</span>
                    )}
                    {ctx.viewport && (
                      <span style={{ fontSize: '12.5px', color: '#6b7280' }}>{ctx.viewport}</span>
                    )}
                    {ctx.faixa && (
                      <span style={{ fontSize: '12.5px', color: '#6b7280' }}>{ctx.faixa}</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                    <button
                      onClick={() => alternarResolvido(item)}
                      disabled={salvando === item.id}
                      style={botaoEstilo(!item.resolvido)}
                    >
                      {salvando === item.id
                        ? 'Salvando…'
                        : item.resolvido ? 'Reabrir' : 'Marcar como resolvido'}
                    </button>

                    {emailDeQuem && (
                      <a
                        href={`mailto:${emailDeQuem}?subject=${encodeURIComponent('Sobre o que você nos escreveu — NeuralSync Academy')}`}
                        style={{ ...botaoEstilo(false), textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                      >
                        Responder
                      </a>
                    )}

                    <button onClick={() => setExpandido(aberto ? null : item.id)} style={botaoEstilo(false)}>
                      {aberto ? 'Esconder detalhes' : 'Ver detalhes'}
                    </button>
                  </div>

                  {aberto && (
                    <pre style={{
                      marginTop: '14px', marginBottom: 0, padding: '14px',
                      background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px',
                      fontSize: '12px', lineHeight: 1.6, overflowX: 'auto',
                      fontFamily: 'ui-monospace, Consolas, monospace', color: '#374151',
                    }}>
{JSON.stringify({ id: item.id, enviado_em: dataCompleta(item.created_at), user_id: item.user_id, contexto: ctx }, null, 2)}
                    </pre>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </LayoutPai>
  )
}

function chipEstilo(ativo) {
  return {
    flexShrink: 0, whiteSpace: 'nowrap',
    padding: '8px 15px', minHeight: '40px', borderRadius: '99px',
    border: '1.5px solid ' + (ativo ? '#7C3AED' : '#e5e7eb'),
    background: ativo ? '#7C3AED' : 'white',
    color: ativo ? 'white' : '#6b7280',
    fontSize: '13.5px', fontWeight: 700, cursor: 'pointer',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  }
}

function botaoEstilo(destaque) {
  return {
    padding: '9px 15px', minHeight: '40px', borderRadius: '10px',
    border: '1.5px solid ' + (destaque ? '#7C3AED' : '#e5e7eb'),
    background: destaque ? '#7C3AED' : 'white',
    color: destaque ? 'white' : '#6b7280',
    fontSize: '13.5px', fontWeight: 700, cursor: 'pointer',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  }
}
