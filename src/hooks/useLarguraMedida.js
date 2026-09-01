import { useEffect, useRef, useState } from 'react'

/**
 * Mede a largura REAL de um elemento e acompanha as mudanças (girar o celular,
 * redimensionar a janela, o teclado abrir).
 *
 * POR QUE ISTO EXISTE
 * Três jogos de tabuleiro — Labirinto, Robô e Blocos — calculavam o tamanho da
 * célula a partir de uma largura FIXA de tela de computador (`400 / tamanho`,
 * `360 / grade`) com um piso em pixels que impedia a grade de encolher. O
 * resultado era um tabuleiro de 380 a 460px numa tela de 360, e o
 * `.game-content` corta a horizontal de propósito: o pedaço que vaza não volta
 * com rolagem, some. No Labirinto era a bandeira 🏁 da saída que sumia.
 *
 * Medir é a única forma de acertar: a largura disponível muda com a tela, com o
 * menu lateral e com o modo foco. Chutar um número dá certo numa tela só.
 *
 * @param {*} chave  valor que, ao mudar, faz a medição recomeçar — normalmente
 *                   o estado que monta ou desmonta o elemento medido. Sem isso,
 *                   a medida ficaria presa no valor de antes de o jogo abrir.
 * @returns {[React.RefObject, number|null]} a referência para pendurar no
 *          elemento e a largura em pixels — `null` enquanto ninguém mediu
 *          ainda, para o componente poder manter o comportamento antigo no
 *          primeiro quadro em vez de piscar num tamanho errado.
 */
export function useLarguraMedida(chave) {
  const ref = useRef(null)
  const [largura, setLargura] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Navegador sem ResizeObserver (muito antigo) fica com a medida única do
    // primeiro quadro — melhor que ficar sem medida nenhuma.
    setLargura(el.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entrada]) => setLargura(entrada.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [chave])

  return [ref, largura]
}
