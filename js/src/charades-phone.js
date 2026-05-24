import * as Conn from './connection.js'
import { playTap, playCorrect, playWrong, playTick } from './sounds.js'
import { getClientId, saveSession, loadSession } from './session.js'

let _app = null
let _onMenu = null
let roomCode = ''
let visListenerInstalled = false
let phoneTimer = null
let timeLeft = 0
let currentWord = ''
let aciertos = 0

export function renderCharadesPhone(app, onMenu) {
  _app    = app
  _onMenu = onMenu
  installVisibilityListener()
  renderJoin(app)
}

function installVisibilityListener() {
  if (visListenerInstalled) return
  visListenerInstalled = true
  const tryRejoin = () => {
    if (document.visibilityState !== 'visible') return
    if (!roomCode) return
    const sess = loadSession()
    if (sess?.mode !== 'mimica') return
    if (Conn.isConnected()) return
    connectToRoom(roomCode)
  }
  document.addEventListener('visibilitychange', tryRejoin)
  window.addEventListener('focus', tryRejoin)
  window.addEventListener('online', tryRejoin)
}

function renderJoin(app) {
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">Ingresa el código del televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <button class="btn" id="connect-btn">CONECTAR</button>
      <p id="status" class="status"></p>
    </div>
  `

  const input = document.getElementById('code-input')
  const btn   = document.getElementById('connect-btn')
  const st    = document.getElementById('status')

  const connect = () => {
    const code = input.value.trim()
    if (code.length !== 4) { st.textContent = 'Ingresa el código de 4 dígitos'; return }
    btn.disabled = true
    st.textContent = 'Conectando…'
    connectToRoom(code)
  }
  btn.onclick = connect
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') connect() })
}

function connectToRoom(code) {
  roomCode = code
  saveSession({ mode: 'mimica', code })
  Conn.disconnect()
  clearPhoneTimer()

  Conn.on('connected', () => {
    Conn.send({ type: 'mimica-hello', clientId: getClientId() })
  })

  Conn.on('message', (data) => {
    if (data.type === 'mimica-ready')    renderReady()
    if (data.type === 'mimica-word')     showWord(data.word, data.remaining, data.aciertos)
    if (data.type === 'mimica-timeup')   showTimeUp(data.word, data.aciertos)
    if (data.type === 'mimica-rejected') showRejected(data.reason)
  })

  Conn.on('error', (e) => {
    const status = document.getElementById('status')
    if (status) status.textContent = e.type === 'peer-unavailable'
      ? '❌ Código incorrecto — revisa el televisor'
      : `❌ ${e.type}`
    const btn = document.getElementById('connect-btn')
    if (btn) btn.disabled = false
  })

  Conn.joinRoom(code)
}

function renderReady() {
  clearPhoneTimer()
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2.4rem">¿LISTO?</h1>
      <p class="label">Cuando empieces, vas a ver una película. Actúala sin hablar.</p>
      <button class="btn" id="begin-btn" style="margin-top:24px">EMPEZAR</button>
    </div>
  `
  const btn = document.getElementById('begin-btn')
  btn.focus()
  btn.onclick = () => {
    playTap()
    Conn.send({ type: 'mimica-begin' })
  }
}

function showWord(word, remaining, ac) {
  currentWord = word
  timeLeft    = remaining
  aciertos    = ac
  renderWord()
  startPhoneTimer()
}

function renderWord() {
  _app.innerHTML = `
    <div class="scene mimica-phone-scene">
      <div class="mimica-phone-top">
        <span class="mimica-phone-aciertos">Aciertos: <strong>${aciertos}</strong></span>
        <span class="mimica-phone-timer${timeLeft <= 5 ? ' timer-urgent' : ''}" id="mimica-phone-timer">${timeLeft}s</span>
      </div>
      <div class="mimica-word-wrap">
        <div class="mimica-word">${currentWord}</div>
      </div>
      <div class="mimica-phone-actions">
        <button class="mimica-btn mimica-btn-pass" id="pass-btn">PASAR</button>
        <button class="mimica-btn mimica-btn-correct" id="correct-btn">¡ACERTÓ!</button>
      </div>
    </div>
  `
  document.getElementById('correct-btn').onclick = () => {
    playCorrect()
    Conn.send({ type: 'mimica-correct' })
  }
  document.getElementById('pass-btn').onclick = () => {
    playWrong()
    Conn.send({ type: 'mimica-skip' })
  }
}

function startPhoneTimer() {
  clearPhoneTimer()
  phoneTimer = setInterval(() => {
    timeLeft--
    const el = document.getElementById('mimica-phone-timer')
    if (el) {
      el.textContent = `${timeLeft}s`
      if (timeLeft <= 5) el.classList.add('timer-urgent')
    }
    if (timeLeft > 0 && timeLeft <= 5) playTick()
    if (timeLeft <= 0) clearPhoneTimer()
  }, 1000)
}

function clearPhoneTimer() {
  if (phoneTimer) { clearInterval(phoneTimer); phoneTimer = null }
}

function showTimeUp(word, ac) {
  clearPhoneTimer()
  aciertos = ac
  _app.innerHTML = `
    <div class="scene mimica-phone-scene">
      <div class="mimica-phone-top">
        <span class="mimica-phone-aciertos">Aciertos: <strong>${aciertos}</strong></span>
        <span class="mimica-phone-timer timer-urgent">0s</span>
      </div>
      <div class="mimica-word-wrap">
        <div class="mimica-timeup-label">¡TIEMPO!</div>
        <div class="mimica-word mimica-word-faded">${word}</div>
      </div>
      <div class="mimica-phone-actions mimica-phone-actions-single">
        <button class="mimica-btn mimica-btn-next" id="next-btn">SIGUIENTE</button>
      </div>
    </div>
  `
  const btn = document.getElementById('next-btn')
  btn.focus()
  btn.onclick = () => {
    playTap()
    Conn.send({ type: 'mimica-next' })
  }
}

function showRejected(reason) {
  clearPhoneTimer()
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:1.6rem">CAPITÁN YA CONECTADO</h1>
      <p class="label">Espera a que el capitán actual se desconecte para tomar el control.</p>
      <button class="btn" id="back-btn" style="margin-top:24px">VOLVER AL MENÚ</button>
    </div>
  `
  document.getElementById('back-btn').onclick = () => _onMenu?.()
}
