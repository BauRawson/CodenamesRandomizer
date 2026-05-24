import * as Conn from './connection.js'
import { playTap, playCorrect, playWrong, playCountdownTick } from './sounds.js'
import { showConfetti } from './vfx.js'
import { getClientId, saveSession, clearSession, loadSession } from './session.js'

let _app    = null
let _onMenu = null
let playerName = ''
let playerCode = ''
let answered = false
let myScore = 0
let totalQuestions = 0
let phoneTimer = null
let interludeTimer = null
let currentAnswer = -1
let mySelection  = -1
let visListenerInstalled = false

export function renderTriviaPhone(app, onMenu) {
  _app    = app
  _onMenu = onMenu
  myScore = 0
  totalQuestions = 0
  answered = false
  clearTimers()
  installVisibilityListener()
  renderJoin(app)
}

function installVisibilityListener() {
  if (visListenerInstalled) return
  visListenerInstalled = true
  const tryRejoin = () => {
    if (document.visibilityState !== 'visible') return
    if (!playerCode || !playerName) return
    const sess = loadSession()
    if (sess?.mode !== 'trivia') return
    if (Conn.isConnected()) return
    connectToRoom(playerCode, playerName)
  }
  document.addEventListener('visibilitychange', tryRejoin)
  window.addEventListener('focus', tryRejoin)
  window.addEventListener('online', tryRejoin)
}

function clearTimers() {
  if (phoneTimer)    { clearInterval(phoneTimer);    phoneTimer = null }
  if (interludeTimer){ clearInterval(interludeTimer); interludeTimer = null }
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

    document.getElementById('join-btn').disabled = true
    status.textContent = 'Conectando…'

    connectToRoom(code, name)
  }

  document.getElementById('join-btn').onclick = join
  document.getElementById('name-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') join() })
}

function connectToRoom(code, name) {
  playerCode = code
  playerName = name
  saveSession({ mode: 'trivia', code, name })

  Conn.disconnect()

  Conn.on('connected', () => {
    Conn.send({ type: 'trivia-join', name: playerName, clientId: getClientId() })
  })

  Conn.on('message', (data) => {
    if (data.type === 'trivia-waiting')   renderWaiting(_app)
    if (data.type === 'trivia-start')     { totalQuestions = data.total; myScore = 0; renderWaiting(_app) }
    if (data.type === 'trivia-question')  renderQuestion(_app, data)
    if (data.type === 'trivia-feedback')  showFeedback(data.correct)
    if (data.type === 'trivia-reveal')    showRevealIfUnanswered(data.correctIndex)
    if (data.type === 'trivia-interlude') renderPhoneInterlude(_app, data)
    if (data.type === 'trivia-end')       renderEnd(_app, data.scores)
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

function renderWaiting(app) {
  clearTimers()
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">TRIVIA</h1>
      <p class="label">¡Conectado como <strong style="color:#fff">${playerName}</strong>!</p>
      <p class="label" style="opacity:0.45;margin-top:4px">Esperando que el televisor empiece…</p>
    </div>
  `
}

function renderQuestion(app, data) {
  answered = !!data.alreadyAnswered
  mySelection = -1
  currentAnswer = data.answer
  if (typeof data.myScore === 'number') myScore = data.myScore
  clearTimers()

  const bar = `background:rgba(46,95,168,0.12);`
  app.innerHTML = `
    <div class="scene board-scene">
      <div class="team-banner trivia-safe-top" style="${bar}border-bottom:3px solid var(--accent);justify-content:space-between">
        <span class="trivia-phone-progress">${data.index + 1} / ${data.total}</span>
        <span class="trivia-phone-score" id="phone-score">${myScore} pts</span>
        <span class="trivia-phone-timer" id="phone-timer">10</span>
      </div>
      <div class="trivia-phone-body">
        <div class="trivia-phone-question">${data.q}</div>
        <div class="trivia-phone-options">
          ${data.options.map((opt, i) => `
            <button class="trivia-phone-option" data-idx="${i}">${opt}</button>
          `).join('')}
        </div>
        <div id="phone-status" class="trivia-phone-status"></div>
      </div>
    </div>
  `

  document.querySelectorAll('.trivia-phone-option').forEach(btn => {
    if (answered) { btn.disabled = true; return }
    btn.addEventListener('click', () => {
      if (answered) return
      answered = true
      playTap()
      clearTimers()
      const originalIndex = parseInt(btn.dataset.idx)
      mySelection = originalIndex
      Conn.send({
        type: 'trivia-answer',
        answerIndex: originalIndex,
        questionIndex: data.index,
        clientId: getClientId(),
      })
      document.querySelectorAll('.trivia-phone-option').forEach(b => { b.disabled = true })
      btn.style.outline = '4px solid white'
      btn.style.outlineOffset = '-4px'
      document.getElementById('phone-status').textContent = '¡Respuesta enviada!'
    })
  })

  const scoreEl = document.getElementById('phone-score')
  if (scoreEl) scoreEl.textContent = `${myScore} pts`

  if (answered) {
    document.getElementById('phone-status').textContent = '¡Respuesta enviada!'
  }

  const initialMs = typeof data.remainingMs === 'number' ? data.remainingMs : 10000
  let remaining = Math.max(0, Math.ceil(initialMs / 1000))
  const timerEl = document.getElementById('phone-timer')
  if (timerEl) timerEl.textContent = remaining
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

  document.querySelectorAll('.trivia-phone-option').forEach(btn => {
    const i = parseInt(btn.dataset.idx)
    btn.style.outline = ''
    btn.style.outlineOffset = ''
    if (i === currentAnswer) {
      btn.classList.add('opt-correct')
    } else if (i === mySelection) {
      btn.classList.add('opt-mine-wrong')
    } else {
      btn.classList.add('opt-wrong')
    }
  })

  if (correct) playCorrect(); else playWrong()
}

function showRevealIfUnanswered(correctIndex) {
  if (answered) return
  currentAnswer = correctIndex
  document.querySelectorAll('.trivia-phone-option').forEach(btn => {
    const i = parseInt(btn.dataset.idx)
    btn.disabled = true
    if (i === correctIndex) btn.classList.add('opt-correct')
    else                    btn.classList.add('opt-wrong')
  })
  const el = document.getElementById('phone-status')
  if (el) { el.textContent = '⏱ Tiempo agotado'; el.style.color = '#f87171' }
}

function renderPhoneInterlude(app, data) {
  clearTimers()
  const sorted = data.scores  // already sorted by TV

  app.innerHTML = `
    <div class="scene">
      <h2 class="trivia-interlude-title">PUNTAJES</h2>
      <div class="trivia-scoreboard">
        ${sorted.map((p, i) => `
          <div class="score-row ${p.name === playerName ? 'score-row-me' : ''}">
            <span class="score-rank">${i + 1}</span>
            <span class="score-name">${p.name}</span>
            <span class="score-pts">${p.score}</span>
          </div>
        `).join('')}
      </div>
      <p class="label" style="margin-top:16px;opacity:0.6">Siguiente en <span id="phone-interlude-count">3</span>…</p>
    </div>
  `

  let t = 3
  interludeTimer = setInterval(() => {
    t--
    playCountdownTick()
    const el = document.getElementById('phone-interlude-count')
    if (el) el.textContent = t
    if (t <= 0) { clearInterval(interludeTimer); interludeTimer = null }
  }, 1000)
}

function renderEnd(app, scores) {
  clearTimers()
  const myEntry = scores.find(s => s.name === playerName)
  const rank = scores.findIndex(s => s.name === playerName) + 1

  const topScore = scores[0]?.score ?? 0
  const winners  = scores.filter(s => s.score === topScore && topScore > 0)
  const iWon     = winners.some(w => w.name === playerName)
  const isTie    = winners.length > 1

  if (iWon) showConfetti('#2e5fa8')

  let titleHTML
  if (iWon && isTie) titleHTML = `<h1 class="title" style="font-size:2rem">🏆 ¡EMPATE!</h1>`
  else if (iWon)     titleHTML = `<h1 class="title" style="font-size:2rem">🏆 ¡GANASTE!</h1>`
  else               titleHTML = `<h1 class="title" style="font-size:1.6rem;opacity:0.7">FIN</h1>`

  let winnerBlock = ''
  if (!iWon && winners.length) {
    const label = isTie ? 'GANADORES' : 'GANADOR'
    winnerBlock = `
      <div style="text-align:center;margin-top:-4px">
        <div style="font-size:0.85rem;letter-spacing:0.1em;color:rgba(255,255,255,0.45);font-weight:700">${label}</div>
        <div class="winner-name" style="font-size:clamp(1.4rem,5vw,2.4rem);margin-top:2px">
          ${winners.map(w => w.name).join(' · ')}
        </div>
      </div>
    `
  }

  app.innerHTML = `
    <div class="scene">
      ${titleHTML}
      ${winnerBlock}
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

  document.getElementById('menu-btn').onclick = () => { clearSession(); _onMenu?.() }
}
