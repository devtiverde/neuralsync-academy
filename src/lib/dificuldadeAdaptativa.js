// Ajusta a dificuldade de uma atividade em tempo real, olhando para uma janela
// deslizante das últimas tentativas da sessão — em vez de só escalar a
// dificuldade por faixa etária fixa ou por um cronômetro que nunca dá alívio.
const JANELA_PADRAO = 5

export function criarRastreadorDesempenho(janela = JANELA_PADRAO) {
  const tentativas = []

  function registrar(acertou) {
    tentativas.push(acertou)
    if (tentativas.length > janela) tentativas.shift()
  }

  function taxaAcerto() {
    if (tentativas.length === 0) return 1
    return tentativas.filter(Boolean).length / tentativas.length
  }

  // >1 = mais tempo (fica mais fácil) · <1 = menos tempo (fica mais difícil) · 1 = mantém
  function multiplicadorTempo() {
    if (tentativas.length < 3) return 1
    const taxa = taxaAcerto()
    if (taxa >= 0.9) return 0.85
    if (taxa <= 0.4) return 1.25
    return 1
  }

  function reiniciar() {
    tentativas.length = 0
  }

  return { registrar, taxaAcerto, multiplicadorTempo, reiniciar }
}

export function ajustarVelocidade(velocidadeAtual, multiplicador, min, max) {
  return Math.min(max, Math.max(min, Math.round(velocidadeAtual * multiplicador)))
}
