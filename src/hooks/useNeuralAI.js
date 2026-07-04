import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { NEURALAI_CONFIG } from '../config/neuralai'

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/neuralai-chat`

async function callEdge(body) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Sessão expirada. Faça login novamente.')

  const res = await fetch(EDGE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    let msg = 'Erro na NeuralAI. Tente novamente.'
    try { msg = JSON.parse(txt).error || msg } catch {}
    throw new Error(msg)
  }

  return res.json()
}

// Status da sessão: idle → starting → active → ending → ended | error
export function useNeuralAI() {
  const [status, setStatus]       = useState('idle')
  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages]   = useState([])
  const [secondsLeft, setSecondsLeft] = useState(null)
  const [warning, setWarning]     = useState(false)
  const [sending, setSending]     = useState(false)
  const [summary, setSummary]     = useState(null)
  const [error, setError]         = useState(null)

  // Refs para evitar closures stale dentro do setInterval
  const timerRef      = useRef(null)
  const childIdRef    = useRef(null)
  const sessionIdRef  = useRef(null)
  const messagesRef   = useRef([])
  const endingRef     = useRef(false)

  // Limpa o timer ao desmontar
  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  // Adiciona mensagem ao estado e ao ref de forma atômica
  const addMessage = useCallback((role, content) => {
    const msg = { id: crypto.randomUUID(), role, content, timestamp: Date.now() }
    setMessages(prev => {
      const next = [...prev, msg]
      messagesRef.current = next
      return next
    })
  }, [])

  // Encerra a sessão — chamado pelo timer ou manualmente
  const endSession = useCallback(async () => {
    if (endingRef.current || !sessionIdRef.current) return
    endingRef.current = true

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setStatus('ending')

    try {
      const history = messagesRef.current.map(({ role, content }) => ({ role, content }))
      const data = await callEdge({
        action: 'end',
        childId: childIdRef.current,
        sessionId: sessionIdRef.current,
        history,
      })

      if (data.response) addMessage('assistant', data.response)
      setSummary(data.summary ?? null)
      setStatus('ended')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }, [addMessage])

  // Inicia o countdown — injeta `onEnd` via closure para evitar dep circular
  const startTimer = useCallback((totalSeconds, onEnd) => {
    setSecondsLeft(totalSeconds)
    setWarning(false)

    let remaining = totalSeconds
    timerRef.current = setInterval(() => {
      remaining -= 1
      setSecondsLeft(remaining)

      if (remaining === NEURALAI_CONFIG.cooldownMinutes - 55) {
        // 5 min restantes (60 - 55 = 5 para o caso de 60min)
        // Calculado dinamicamente abaixo para qualquer duração
      }
      if (remaining === 5 * 60) setWarning(true)

      if (remaining <= 0) {
        clearInterval(timerRef.current)
        timerRef.current = null
        onEnd()
      }
    }, 1000)
  }, [])

  // Inicia uma nova sessão (valida no backend e cria o registro)
  const startSession = useCallback(async (childId, durationMinutes = NEURALAI_CONFIG.sessionDurations[0]) => {
    setError(null)
    setStatus('starting')

    try {
      const data = await callEdge({ action: 'start', childId })

      childIdRef.current   = childId
      sessionIdRef.current = data.sessionId
      endingRef.current    = false

      setSessionId(data.sessionId)
      setMessages([])
      messagesRef.current = []

      setStatus('active')
      startTimer(durationMinutes * 60, endSession)
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }, [startTimer, endSession])

  // Envia mensagem da criança e recebe resposta da IA
  const sendMessage = useCallback(async (text) => {
    if (status !== 'active' || sending || !sessionIdRef.current) return
    if (!text?.trim()) return

    setSending(true)

    // Adicionar ao UI imediatamente (otimista)
    addMessage('user', text.trim())

    try {
      // history exclui a msg que acabamos de adicionar — Edge Function a inclui via `message`
      const history = messagesRef.current
        .slice(0, -1)
        .map(({ role, content }) => ({ role, content }))

      const data = await callEdge({
        action: 'message',
        childId: childIdRef.current,
        sessionId: sessionIdRef.current,
        message: text.trim(),
        history,
      })

      addMessage('assistant', data.response)
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }, [status, sending, addMessage])

  // Reseta para o estado inicial (permite iniciar nova sessão)
  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current    = null
    childIdRef.current  = null
    sessionIdRef.current = null
    endingRef.current   = false
    messagesRef.current = []

    setStatus('idle')
    setSessionId(null)
    setMessages([])
    setSecondsLeft(null)
    setWarning(false)
    setSending(false)
    setSummary(null)
    setError(null)
  }, [])

  return {
    // Estado
    status,
    sessionId,
    messages,
    secondsLeft,
    warning,
    sending,
    summary,
    error,
    // Ações
    startSession,
    sendMessage,
    endSession,
    reset,
  }
}
