let _ctx = null
const ctx = () => {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)()
  return _ctx
}

function tone({ freq = 440, end, dur = 0.15, vol = 0.28, type = 'sine', at = 0 }) {
  const ac = ctx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, ac.currentTime + at)
  if (end != null) osc.frequency.exponentialRampToValueAtTime(end, ac.currentTime + at + dur)
  gain.gain.setValueAtTime(vol, ac.currentTime + at)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + at + dur)
  osc.start(ac.currentTime + at)
  osc.stop(ac.currentTime + at + dur + 0.05)
}

export function playReveal(tileType) {
  if      (tileType === 0) tone({ freq: 523, end: 659, dur: 0.12, vol: 0.25 })           // team1: bright pop
  else if (tileType === 1) tone({ freq: 349, end: 440, dur: 0.12, vol: 0.25 })           // team2: deeper pop
  else if (tileType === 2) tone({ freq: 420, end: 400, dur: 0.09, vol: 0.12 })           // neutral: soft
  else                     tone({ freq: 180, end: 70,  dur: 0.28, vol: 0.35, type: 'sawtooth' }) // black: ominous
}

export function playHide() {
  tone({ freq: 420, end: 300, dur: 0.08, vol: 0.1 })
}

export function playWin(team) {
  const base = team === 0 ? 523 : 440
  ;[1, 1.25, 1.5, 2, 2.5].forEach((r, i) =>
    tone({ freq: base * r, dur: 0.18, vol: 0.28, at: i * 0.11 })
  )
}

export function playNewBoard() {
  tone({ freq: 660, end: 220, dur: 0.22, vol: 0.18, type: 'triangle' })
}

// ── Trivia sounds ─────────────────────────────────────────────

export function playTick() {
  tone({ freq: 900, end: 750, dur: 0.06, vol: 0.14, type: 'square' })
}

export function playTimerEnd() {
  tone({ freq: 260, end: 140, dur: 0.35, vol: 0.28, type: 'sawtooth' })
}

export function playCorrect() {
  tone({ freq: 440, end: 523, dur: 0.13, vol: 0.22 })
  tone({ freq: 660, end: 784, dur: 0.22, vol: 0.3, at: 0.11 })
}

export function playWrong() {
  tone({ freq: 260, end: 140, dur: 0.3, vol: 0.22, type: 'sawtooth' })
}

export function playTap() {
  tone({ freq: 620, end: 520, dur: 0.04, vol: 0.09 })
}

export function playTriviaWin() {
  ;[523, 659, 784, 1047, 784, 1047, 1319].forEach((freq, i) =>
    tone({ freq, end: freq * 0.96, dur: 0.22, vol: 0.3, at: i * 0.1 })
  )
}

export function playCountdownTick() {
  tone({ freq: 480, end: 450, dur: 0.09, vol: 0.1 })
}

export function playJoin() {
  tone({ freq: 440, end: 560, dur: 0.12, vol: 0.14 })
}

export function playQuestionStart() {
  tone({ freq: 330, end: 660, dur: 0.2, vol: 0.13, type: 'triangle' })
}
