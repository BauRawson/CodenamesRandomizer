import * as Conn from './connection.js'
import { movies } from './charades-words.js'
import { playTick, playTimerEnd, playCorrect, playJoin } from './sounds.js'

const ROUND_TIME = 60

let _app = null
let _onMenu = null
let captainConn = null
let captainId   = null
let currentWord = ''
let usedWords   = new Set()
let timeRemaining = 0
let timerInterval = null
let aciertos = 0
let phase = 'lobby'   // 'lobby' | 'ready' | 'playing' | 'timeup'
let roomCode = ''

export function renderCharadesTV(app, onMenu) {
  _app    = app
  _onMenu = onMenu
  captainConn = null
  captainId   = null
  currentWord = ''
  usedWords   = new Set()
  aciertos    = 0
  phase       = 'lobby'
  timeRemaining = 0
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null }

  roomCode = Conn.generateCode()
  renderLobby()

  Conn.on('connected', () => {})

  Conn.on('peer-left', (c) => {
    if (c === captainConn) {
      captainConn = null
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
      renderCaptainLost()
    }
  })

  Conn.on('message', (data, c) => {
    if (data.type === 'mimica-hello') {
      handleHello(c, data.clientId)
      return
    }
    if (data.type === 'mimica-begin')   handleBegin()
    if (data.type === 'mimica-correct') handleCorrect()
    if (data.type === 'mimica-skip')    handleSkip()
    if (data.type === 'mimica-next')    handleNext()
  })

  Conn.hostRoom(roomCode)
}

function handleHello(conn, clientId) {
  const isReturningCaptain = clientId && clientId === captainId
  const slotOpen = !captainConn?.open

  if (isReturningCaptain || slotOpen) {
    captainConn = conn
    captainId   = clientId || captainId
    playJoin()
    if (phase === 'lobby') phase = 'ready'
    if (phase === 'playing' && !timerInterval) startTimer()  // resume countdown
    sendCaptainSync()
    renderTVForPhase()
  } else {
    Conn.sendTo(conn, { type: 'mimica-rejected', reason: 'captain-taken' })
  }
}

function sendCaptainSync() {
  if (!captainConn) return
  if (phase === 'lobby' || phase === 'ready') {
    Conn.sendTo(captainConn, { type: 'mimica-ready', aciertos })
  } else if (phase === 'playing') {
    Conn.sendTo(captainConn, { type: 'mimica-word', word: currentWord, remaining: timeRemaining, aciertos })
  } else if (phase === 'timeup') {
    Conn.sendTo(captainConn, { type: 'mimica-timeup', word: currentWord, aciertos })
  }
}

function handleBegin() {
  if (phase === 'playing') return
  nextWord()
}

function handleCorrect() {
  if (phase !== 'playing') return
  aciertos++
  playCorrect()
  nextWord()
}

function handleSkip() {
  if (phase !== 'playing') return
  nextWord()
}

function handleNext() {
  if (phase !== 'timeup') return
  nextWord()
}

function nextWord() {
  if (usedWords.size >= movies.length) usedWords.clear()
  let w
  do { w = movies[Math.floor(Math.random() * movies.length)] } while (usedWords.has(w))
  usedWords.add(w)
  currentWord = w
  phase = 'playing'
  timeRemaining = ROUND_TIME
  startTimer()
  if (captainConn) Conn.sendTo(captainConn, { type: 'mimica-word', word: currentWord, remaining: ROUND_TIME, aciertos })
  renderTVForPhase()
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeRemaining--
    const el = document.getElementById('mimica-timer')
    if (el) {
      el.textContent = timeRemaining
      el.className = 'mimica-timer' + (timeRemaining <= 5 ? ' timer-urgent' : '')
    }
    if (timeRemaining > 0 && timeRemaining <= 5) playTick()
    if (timeRemaining <= 0) {
      clearInterval(timerInterval); timerInterval = null
      playTimerEnd()
      phase = 'timeup'
      if (captainConn) Conn.sendTo(captainConn, { type: 'mimica-timeup', word: currentWord, aciertos })
      renderTVForPhase()
    }
  }, 1000)
}

function renderTVForPhase() {
  if (phase === 'playing') return renderPlaying()
  if (phase === 'timeup')  return renderTimeUp()
  if (phase === 'ready')   return renderReady()
  renderLobby()
}

function renderLobby() {
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">Conecta tu móvil con este código:</p>
      <div class="room-code">${roomCode}</div>
      <p class="status" id="mimica-status">Esperando al capitán…</p>
      <button class="btn" id="menu-btn" style="margin-top:24px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `
  document.getElementById('menu-btn').onclick = () => _onMenu?.()
}

function renderReady() {
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">¡Capitán conectado!</p>
      <p class="status" style="margin-top:8px">Esperando que empiece la ronda…</p>
      <div class="end-join-block" style="margin-top:32px">
        <span class="end-join-label">Para sumarse otro capitán</span>
        <span class="end-join-code">${roomCode}</span>
      </div>
    </div>
  `
}

function renderPlaying() {
  _app.innerHTML = `
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-aciertos">Aciertos: <strong id="mimica-aciertos">${aciertos}</strong></span>
        <span class="mimica-code">${roomCode}</span>
      </div>
      <div class="mimica-timer-wrap">
        <div class="mimica-timer-label">SEGUNDOS</div>
        <div class="mimica-timer${timeRemaining <= 5 ? ' timer-urgent' : ''}" id="mimica-timer">${timeRemaining}</div>
      </div>
      <div class="mimica-foot">¡A actuar! No digas la palabra.</div>
    </div>
  `
}

function renderTimeUp() {
  _app.innerHTML = `
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-aciertos">Aciertos: <strong>${aciertos}</strong></span>
        <span class="mimica-code">${roomCode}</span>
      </div>
      <div class="mimica-timeup">
        <div class="mimica-timeup-flash">¡TIEMPO!</div>
        <div class="mimica-timeup-word">${currentWord}</div>
      </div>
      <div class="mimica-foot">Esperando al capitán para la siguiente…</div>
    </div>
  `
}

function renderCaptainLost() {
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:1.8rem">CAPITÁN DESCONECTADO</h1>
      <p class="label">Esperando reconexión…</p>
      <div class="room-code" style="font-size:clamp(3rem,12vw,6rem)">${roomCode}</div>
      <p class="status" style="margin-top:16px">Aciertos: <strong>${aciertos}</strong></p>
      <button class="btn" id="menu-btn" style="margin-top:24px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `
  document.getElementById('menu-btn').onclick = () => _onMenu?.()
}
