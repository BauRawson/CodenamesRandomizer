import * as Conn from './connection.js'
import { questions as allQuestions } from './questions.js'
import { showConfetti } from './vfx.js'
import {
  playTick, playTimerEnd, playCorrect, playTriviaWin,
  playCountdownTick, playJoin, playQuestionStart,
} from './sounds.js'

const QUESTION_TIME = 10
const QUESTIONS_PER_GAME = Math.min(10, allQuestions.length)
const LABELS = ['A', 'B', 'C', 'D']

let _app      = null
let _onMenu   = null
let players   = new Map()   // conn → { name, score, answered }
let currentQ  = -1
let revealing = false
let timerInterval = null
let gameQuestions = []

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function renderTriviaTV(app, onMenu) {
  _app    = app
  _onMenu = onMenu
  players = new Map()
  currentQ = -1
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
  gameQuestions = shuffle(allQuestions).slice(0, QUESTIONS_PER_GAME)

  const code = Conn.generateCode()

  app.innerHTML = `
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <div class="room-code">${code}</div>
      <p class="label">Únete desde tu móvil e ingresa este código</p>
      <div id="player-list" class="trivia-player-list"></div>
      <button class="btn" id="start-btn" disabled>EMPEZAR</button>
    </div>
  `

  document.getElementById('start-btn').focus()

  Conn.on('connected', () => {})

  Conn.on('peer-left', (c) => {
    players.delete(c)
    updateWaitingRoom()
  })

  Conn.on('message', (data, c) => {
    if (data.type === 'trivia-join') {
      players.set(c, { name: data.name, score: 0, answered: false })
      Conn.sendTo(c, { type: 'trivia-waiting' })
      playJoin()
      updateWaitingRoom()
    }
    if (data.type === 'trivia-answer') handleAnswer(c, data)
  })

  document.getElementById('start-btn').addEventListener('click', startGame)

  Conn.hostRoom(code)
}

function updateWaitingRoom() {
  const el = document.getElementById('player-list')
  if (!el) return
  el.innerHTML = [...players.values()]
    .map(p => `<span class="player-chip">${p.name}</span>`)
    .join('')
  const btn = document.getElementById('start-btn')
  if (btn) btn.disabled = players.size === 0
}

function startGame() {
  players.forEach(p => { p.score = 0 })
  Conn.broadcast({ type: 'trivia-start', total: gameQuestions.length })
  currentQ = -1
  nextQuestion()
}

function nextQuestion() {
  currentQ++
  revealing = false
  if (currentQ >= gameQuestions.length) { endGame(); return }
  players.forEach(p => { p.answered = false })

  const q = gameQuestions[currentQ]
  playQuestionStart()
  renderQuestionTV(q, currentQ)

  Conn.broadcast({
    type: 'trivia-question',
    index: currentQ,
    total: gameQuestions.length,
    q: q.q,
    options: q.options,
    answer: q.answer,
  })

  startTimer()
}

function renderQuestionTV(q, index) {
  const bar = `background:rgba(46,95,168,0.12);`
  _app.innerHTML = `
    <div class="scene board-scene">
      <div class="team-banner" style="${bar}border-bottom:3px solid var(--accent);justify-content:space-between">
        <span class="trivia-tv-progress">${index + 1} / ${gameQuestions.length}</span>
        <span class="trivia-tv-timer" id="tv-timer">${QUESTION_TIME}</span>
      </div>
      <div class="trivia-tv-body">
        <div class="trivia-tv-question">${q.q}</div>
        <div class="trivia-tv-options">
          ${q.options.map((opt, i) => `
            <div class="trivia-tv-option" id="opt-${i}">
              <span class="trivia-opt-label">${LABELS[i]}</span>
              <span class="trivia-opt-text">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="team-banner" style="${bar}border-top:3px solid var(--accent)">
        <div id="tv-players" class="trivia-tv-players"></div>
      </div>
    </div>
  `
  updatePlayerDots()
}

function startTimer() {
  let remaining = QUESTION_TIME
  timerInterval = setInterval(() => {
    remaining--
    const el = document.getElementById('tv-timer')
    if (el) {
      el.textContent = remaining
      el.className = 'trivia-tv-timer' + (remaining <= 3 ? ' timer-urgent' : '')
    }
    if (remaining > 0 && remaining <= 3) playTick()
    if (remaining <= 0) {
      clearInterval(timerInterval)
      timerInterval = null
      playTimerEnd()
      revealAnswer()
    }
  }, 1000)
}

function handleAnswer(conn, data) {
  const player = players.get(conn)
  if (!player || player.answered || data.questionIndex !== currentQ) return
  player.answered = true

  const correct = data.answerIndex === gameQuestions[currentQ].answer
  if (correct) player.score++

  Conn.sendTo(conn, { type: 'trivia-feedback', correct })
  updatePlayerDots()

  if ([...players.values()].every(p => p.answered)) {
    clearInterval(timerInterval)
    timerInterval = null
    revealAnswer()
  }
}

function updatePlayerDots() {
  const el = document.getElementById('tv-players')
  if (!el) return
  el.innerHTML = [...players.values()]
    .map(p => `<span class="player-dot ${p.answered ? 'dot-answered' : ''}">${p.name}</span>`)
    .join('')
}

function revealAnswer() {
  if (revealing) return
  revealing = true
  const correctIndex = gameQuestions[currentQ].answer

  document.querySelectorAll('.trivia-tv-option').forEach((el, i) => {
    el.classList.add(i === correctIndex ? 'opt-correct' : 'opt-wrong')
  })

  playCorrect()

  const scores = [...players.values()].map(p => ({ name: p.name, score: p.score }))
  Conn.broadcast({ type: 'trivia-reveal', correctIndex, scores })

  setTimeout(() => showScoreInterlude(scores), 2500)
}

function showScoreInterlude(scores) {
  const hasMore = currentQ < gameQuestions.length - 1
  const sorted = [...scores].sort((a, b) => b.score - a.score)

  _app.innerHTML = `
    <div class="scene">
      <h2 class="trivia-interlude-title">PUNTAJES</h2>
      <div class="trivia-scoreboard">
        ${sorted.map((p, i) => `
          <div class="score-row">
            <span class="score-rank">${i + 1}</span>
            <span class="score-name">${p.name}</span>
            <span class="score-pts">${p.score}</span>
          </div>
        `).join('')}
      </div>
      ${hasMore ? '<p class="label" style="margin-top:16px;opacity:0.6">Siguiente en <span id="interlude-count">3</span>…</p>' : ''}
    </div>
  `

  if (hasMore) {
    let t = 3
    timerInterval = setInterval(() => {
      t--
      playCountdownTick()
      const el = document.getElementById('interlude-count')
      if (el) el.textContent = t
      if (t <= 0) {
        clearInterval(timerInterval)
        timerInterval = null
        nextQuestion()
      }
    }, 1000)
  } else {
    setTimeout(endGame, 1500)
  }
}

function endGame() {
  const scores = [...players.values()]
    .map(p => ({ name: p.name, score: p.score }))
    .sort((a, b) => b.score - a.score)

  playTriviaWin()
  showConfetti('#a78bfa')

  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:4px">GANADOR</h1>
      <div class="winner-name">${scores[0]?.name ?? '—'}</div>
      <div class="trivia-scoreboard" style="margin-top:24px">
        ${scores.map((p, i) => `
          <div class="score-row">
            <span class="score-rank">${i + 1}</span>
            <span class="score-name">${p.name}</span>
            <span class="score-pts">${p.score} / ${gameQuestions.length}</span>
          </div>
        `).join('')}
      </div>
      <button class="btn" id="menu-btn" style="margin-top:24px">MENÚ PRINCIPAL</button>
    </div>
  `

  Conn.broadcast({ type: 'trivia-end', scores })

  const menuBtn = document.getElementById('menu-btn')
  menuBtn.focus()
  menuBtn.onclick = () => _onMenu?.()
}
