import * as Conn from './connection.js'
import { questions as allQuestions } from './questions.js'
import { showConfetti } from './vfx.js'
import {
  playTick, playTimerEnd, playCorrect, playTriviaWin,
  playCountdownTick, playJoin, playQuestionStart,
} from './sounds.js'

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const QUESTION_TIME = 15
const QUESTIONS_PER_GAME = Math.min(10, allQuestions.length)
const LABELS = ['A', 'B', 'C', 'D']

let _app      = null
let _onMenu   = null
let players   = new Map()   // clientId → { name, score, answered, conn }
let currentQ  = -1
let revealing = false
let timerInterval = null
let gameQuestions = []
let phase = 'lobby'         // 'lobby' | 'question' | 'interlude' | 'end'
let lastInterludeScores = []
let lastEndScores = []
let questionStartedAt = 0
let roomCode = ''
const QUESTION_MS = QUESTION_TIME * 1000

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
  phase   = 'lobby'
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
  gameQuestions = shuffle(allQuestions).slice(0, QUESTIONS_PER_GAME)

  const code = Conn.generateCode()
  roomCode = code

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
    if (phase === 'lobby') {
      for (const [cid, p] of players) {
        if (p.conn === c) { players.delete(cid); break }
      }
      updateWaitingRoom()
    } else {
      for (const p of players.values()) {
        if (p.conn === c) { p.conn = null; break }
      }
      updatePlayerDots()
    }
  })

  Conn.on('message', (data, c) => {
    if (data.type === 'trivia-join') handleJoin(c, data)
    if (data.type === 'trivia-answer') handleAnswer(data)
  })

  document.getElementById('start-btn').addEventListener('click', startGame)

  Conn.hostRoom(code)
}

function handleJoin(conn, data) {
  const cid = data.clientId
  if (!cid) return
  const existing = players.get(cid)

  if (existing) {
    existing.conn = conn
    existing.name = data.name || existing.name
    sendRejoinState(conn, existing)
    return
  }

  if (phase !== 'lobby') {
    players.set(cid, { name: data.name, score: 0, answered: false, conn })
    sendRejoinState(conn, players.get(cid))
    playJoin()
    return
  }

  players.set(cid, { name: data.name, score: 0, answered: false, conn })
  Conn.sendTo(conn, { type: 'trivia-waiting' })
  playJoin()
  updateWaitingRoom()
}

function sendRejoinState(conn, player) {
  if (phase === 'lobby') {
    Conn.sendTo(conn, { type: 'trivia-waiting' })
    updateWaitingRoom()
    return
  }
  if (phase === 'question') {
    const q = gameQuestions[currentQ]
    const elapsed = Date.now() - questionStartedAt
    const remainingMs = Math.max(0, QUESTION_MS - elapsed)
    Conn.sendTo(conn, {
      type: 'trivia-question',
      index: currentQ,
      total: gameQuestions.length,
      q: q.q,
      options: q.options,
      answer: q.answer,
      remainingMs,
      myScore: player.score,
      alreadyAnswered: player.answered,
    })
    if (revealing) {
      Conn.sendTo(conn, { type: 'trivia-reveal', correctIndex: q.answer, scores: snapshotScores() })
    }
    updatePlayerDots()
    return
  }
  if (phase === 'interlude') {
    Conn.sendTo(conn, { type: 'trivia-interlude', scores: lastInterludeScores, myScore: player.score })
    return
  }
  if (phase === 'end') {
    Conn.sendTo(conn, { type: 'trivia-end', scores: lastEndScores })
    return
  }
}

function snapshotScores() {
  return [...players.values()].map(p => ({ name: p.name, score: p.score }))
}

function updateWaitingRoom() {
  const el = document.getElementById('player-list')
  if (!el) return
  el.innerHTML = [...players.values()]
    .map(p => `<span class="player-chip">${esc(p.name)}</span>`)
    .join('')
  const btn = document.getElementById('start-btn')
  if (!btn) return
  const wasDisabled = btn.disabled
  btn.disabled = players.size === 0
  if (wasDisabled && !btn.disabled) btn.focus()
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
  phase = 'question'
  questionStartedAt = Date.now()

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
    remainingMs: QUESTION_MS,
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

function handleAnswer(data) {
  const player = players.get(data.clientId)
  if (!player || player.answered || data.questionIndex !== currentQ) return
  player.answered = true

  const correct = data.answerIndex === gameQuestions[currentQ].answer
  if (correct) player.score++

  if (player.conn) Conn.sendTo(player.conn, { type: 'trivia-feedback', correct })
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
    .map(p => `<span class="player-dot ${p.answered ? 'dot-answered' : ''}">${esc(p.name)}</span>`)
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
  phase = 'interlude'
  lastInterludeScores = sorted

  _app.innerHTML = `
    <div class="scene">
      <h2 class="trivia-interlude-title">PUNTAJES</h2>
      <div class="trivia-scoreboard">
        ${sorted.map((p, i) => `
          <div class="score-row">
            <span class="score-rank">${i + 1}</span>
            <span class="score-name">${esc(p.name)}</span>
            <span class="score-pts">${p.score}</span>
          </div>
        `).join('')}
      </div>
      ${hasMore ? '<p class="label" style="margin-top:16px;opacity:0.6">Siguiente en <span id="interlude-count">3</span>…</p>' : ''}
    </div>
  `

  if (hasMore) {
    Conn.broadcast({ type: 'trivia-interlude', scores: sorted })
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

  phase = 'end'
  lastEndScores = scores

  const topScore = scores[0]?.score ?? 0
  const winners  = scores.filter(s => s.score === topScore && topScore > 0)
  const isTie    = winners.length > 1
  const heading  = isTie ? 'EMPATE' : (winners.length ? 'GANADOR' : 'FIN')

  playTriviaWin()
  showConfetti(scores[0] ? '#2e5fa8' : '#a78bfa')

  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:4px">${heading}</h1>
      ${winners.length
        ? winners.map(w => `<div class="winner-name">${esc(w.name)}</div>`).join('')
        : `<div class="winner-name">—</div>`}
      <div class="trivia-scoreboard" style="margin-top:24px">
        ${scores.map((p, i) => `
          <div class="score-row">
            <span class="score-rank">${i + 1}</span>
            <span class="score-name">${esc(p.name)}</span>
            <span class="score-pts">${p.score} / ${gameQuestions.length}</span>
          </div>
        `).join('')}
      </div>
      <div class="end-join-block">
        <span class="end-join-label">¿Quieres jugar? Únete con</span>
        <span class="end-join-code">${roomCode}</span>
      </div>
      <div class="end-btn-row">
        <button class="btn" id="again-btn">JUGAR DE NUEVO</button>
        <button class="btn" id="menu-btn">MENÚ PRINCIPAL</button>
      </div>
    </div>
  `

  Conn.broadcast({ type: 'trivia-end', scores })

  document.getElementById('again-btn').focus()
  document.getElementById('again-btn').onclick = () => restartGame()
  document.getElementById('menu-btn').onclick  = () => _onMenu?.()
}

function restartGame() {
  revealing = false
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
  gameQuestions = shuffle(allQuestions).slice(0, QUESTIONS_PER_GAME)
  players.forEach(p => { p.score = 0; p.answered = false })
  Conn.broadcast({ type: 'trivia-start', total: gameQuestions.length })
  currentQ = -1
  nextQuestion()
}
