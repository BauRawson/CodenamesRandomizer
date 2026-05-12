import * as Conn from './connection.js'
import { playTap, playCorrect, playWrong } from './sounds.js'


let _app    = null
let _onMenu = null
let playerName = ''
let currentShuffle = []
let answered = false
let myScore = 0
let totalQuestions = 0
let phoneTimer = null

export function renderTriviaPhone(app, onMenu) {
  _app    = app
  _onMenu = onMenu
  myScore = 0
  totalQuestions = 0
  answered = false
  if (phoneTimer) { clearInterval(phoneTimer); phoneTimer = null }
  renderJoin(app)
}

function renderJoin(app) {
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">Código del televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <input id="name-input" type="text" maxlength="14" placeholder="Tu nombre" class="name-input" autocomplete="off" spellcheck="false">
      <button class="btn" id="join-btn">UNIRSE</button>
      <p id="status" class="status"></p>
    </div>
  `

  const join = () => {
    const code = document.getElementById('code-input').value.trim()
    const name = document.getElementById('name-input').value.trim()
    const status = document.getElementById('status')
    if (code.length !== 4) { status.textContent = 'Ingresa el código de 4 dígitos'; return }
    if (!name) { status.textContent = 'Ingresa tu nombre'; return }
    playerName = name

    document.getElementById('join-btn').disabled = true
    status.textContent = 'Conectando…'

    Conn.on('connected', () => {
      Conn.send({ type: 'trivia-join', name: playerName })
    })

    Conn.on('message', (data) => {
      if (data.type === 'trivia-waiting')  renderWaiting(app)
      if (data.type === 'trivia-start')    { totalQuestions = data.total; myScore = 0 }
      if (data.type === 'trivia-question') renderQuestion(app, data)
      if (data.type === 'trivia-feedback') showFeedback(data.correct)
      if (data.type === 'trivia-end')      renderEnd(app, data.scores)
    })

    Conn.on('error', (e) => {
      const st = document.getElementById('status')
      if (st) st.textContent = e.type === 'peer-unavailable'
        ? '❌ Código incorrecto — revisa el televisor'
        : `❌ ${e.type}`
      const btn = document.getElementById('join-btn')
      if (btn) btn.disabled = false
    })

    Conn.joinRoom(code)
  }

  document.getElementById('join-btn').onclick = join
  document.getElementById('name-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') join() })
}

function renderWaiting(app) {
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">¡Conectado como <strong style="color:#fff">${playerName}</strong>!</p>
      <p class="label" style="opacity:0.45;margin-top:4px">Esperando que el televisor empiece…</p>
    </div>
  `
}

function renderQuestion(app, data) {
  answered = false
  if (phoneTimer) { clearInterval(phoneTimer); phoneTimer = null }

  const indices = [0, 1, 2, 3]
  for (let i = 3; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  currentShuffle = indices
  const shuffledOptions = indices.map(i => data.options[i])

  app.innerHTML = `
    <div class="trivia-phone-scene">
      <div class="trivia-phone-top">
        <span class="trivia-phone-progress">${data.index + 1} / ${data.total}</span>
        <span class="trivia-phone-score" id="phone-score">${myScore} pts</span>
        <span class="trivia-phone-timer" id="phone-timer">10</span>
      </div>
      <div class="trivia-phone-question">${data.q}</div>
      <div class="trivia-phone-options">
        ${shuffledOptions.map((opt, i) => `
          <button class="trivia-phone-option" data-display="${i}">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div id="phone-status" class="trivia-phone-status"></div>
    </div>
  `

  document.querySelectorAll('.trivia-phone-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return
      answered = true
      playTap()
      if (phoneTimer) { clearInterval(phoneTimer); phoneTimer = null }
      const displayIndex = parseInt(btn.dataset.display)
      const originalIndex = currentShuffle[displayIndex]
      Conn.send({ type: 'trivia-answer', answerIndex: originalIndex, questionIndex: data.index })
      document.querySelectorAll('.trivia-phone-option').forEach(b => {
        b.disabled = true
        b.style.opacity = '0.4'
      })
      btn.style.opacity = '1'
      btn.style.outline = '4px solid white'
      btn.style.outlineOffset = '-4px'
      document.getElementById('phone-status').textContent = '¡Respuesta enviada!'
    })
  })

  let remaining = 10
  const timerEl = document.getElementById('phone-timer')
  phoneTimer = setInterval(() => {
    remaining--
    if (timerEl) {
      timerEl.textContent = remaining
      if (remaining <= 3) timerEl.className = 'trivia-phone-timer timer-urgent'
    }
    if (remaining <= 0) { clearInterval(phoneTimer); phoneTimer = null }
  }, 1000)
}

function showFeedback(correct) {
  if (correct) myScore++
  const el = document.getElementById('phone-status')
  if (el) {
    el.textContent = correct ? '✓ ¡Correcto!' : '✗ Incorrecto'
    el.style.color = correct ? '#4ade80' : '#f87171'
  }
  const scoreEl = document.getElementById('phone-score')
  if (scoreEl) scoreEl.textContent = `${myScore} pts`
  if (correct) playCorrect(); else playWrong()
}

function renderEnd(app, scores) {
  if (phoneTimer) { clearInterval(phoneTimer); phoneTimer = null }
  const myEntry = scores.find(s => s.name === playerName)
  const rank = scores.findIndex(s => s.name === playerName) + 1

  app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2rem">FIN</h1>
      <div class="trivia-my-score">
        <div class="trivia-my-score-num">${myEntry?.score ?? 0}</div>
        <div class="trivia-my-score-label">de ${totalQuestions} correctas</div>
        <div class="trivia-my-score-rank">Puesto ${rank} de ${scores.length}</div>
      </div>
      <div class="trivia-scoreboard">
        ${scores.map((p, i) => `
          <div class="score-row ${p.name === playerName ? 'score-row-me' : ''}">
            <span class="score-rank">${i + 1}</span>
            <span class="score-name">${p.name}</span>
            <span class="score-pts">${p.score}</span>
          </div>
        `).join('')}
      </div>
      <button class="btn" id="menu-btn" style="margin-top:16px">MENÚ PRINCIPAL</button>
    </div>
  `

  document.getElementById('menu-btn').onclick = () => _onMenu?.()
}
