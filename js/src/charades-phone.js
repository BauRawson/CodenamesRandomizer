import * as Conn from './connection.js'
import { playTap, playCorrect, playWrong, playTick } from './sounds.js'
import { getClientId, saveSession, clearSession, loadSession } from './session.js'

const TEAM_COLORS = ['#ed8099', '#4d65b4', '#fbb954', '#7ad36b', '#b774e0', '#5fd6c8']

let _app = null
let _onMenu = null
let roomCode = ''
let visListenerInstalled = false
let phoneTimer = null
let timeLeft = 0
let currentWord = ''
let aciertosThisTurn = 0
let teams = []
let currentTeamIdx = 0

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

function teamColor(i) { return TEAM_COLORS[i % TEAM_COLORS.length] }

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
    if (data.type === 'mimica-setup-needed') return renderSetup()
    if (data.type === 'mimica-turn-ready')   return renderTurnReady(data)
    if (data.type === 'mimica-word')         return renderPlaying(data)
    if (data.type === 'mimica-turn-end')     return renderTurnEnd(data)
    if (data.type === 'mimica-game-end')     return renderGameEnd(data)
    if (data.type === 'mimica-rejected')     return showRejected()
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

function renderSetup() {
  clearPhoneTimer()
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2rem">¿CUÁNTOS EQUIPOS?</h1>
      <p class="label">Cada equipo tiene 90 segundos para adivinar la mayor cantidad de películas.</p>
      <div class="mimica-setup-grid">
        ${[2, 3, 4, 5, 6].map(n => `<button class="btn mimica-setup-btn" data-n="${n}">${n}</button>`).join('')}
      </div>
    </div>
  `
  document.querySelectorAll('.mimica-setup-btn').forEach(btn => {
    btn.onclick = () => {
      playTap()
      Conn.send({ type: 'mimica-setup-teams', count: parseInt(btn.dataset.n) })
    }
  })
}

function renderTurnReady(data) {
  clearPhoneTimer()
  teams = data.teams
  currentTeamIdx = data.currentTeamIdx
  const t = teams[currentTeamIdx]
  _app.innerHTML = `
    <div class="scene">
      <p class="mimica-ready-label" style="font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.55)">TURNO DEL</p>
      <h1 class="title" style="font-size:clamp(2.4rem,10vw,4rem);color:${teamColor(currentTeamIdx)};margin:8px 0 16px">${t.name}</h1>
      <p class="label">Cuando estés listo, presiona EMPEZAR. Tendrás 90 segundos.</p>
      <button class="btn" id="begin-btn" style="margin-top:24px;background:${teamColor(currentTeamIdx)};color:#fff">EMPEZAR</button>
      <div class="mimica-mini-scoreboard">
        ${teams.map((tt, i) => `
          <div class="mimica-mini-row ${i === currentTeamIdx ? 'mimica-mini-row-current' : ''}" style="--team-color:${teamColor(i)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${tt.name}</span>
            <span class="mimica-score-pts">${tt.score}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `
  const btn = document.getElementById('begin-btn')
  btn.focus()
  btn.onclick = () => {
    playTap()
    Conn.send({ type: 'mimica-begin-turn' })
  }
}

function renderPlaying(data) {
  currentWord      = data.word
  timeLeft         = data.remaining
  aciertosThisTurn = data.aciertosThisTurn
  teams            = data.teams
  currentTeamIdx   = data.currentTeamIdx
  drawPlaying()
  startPhoneTimer()
}

function drawPlaying() {
  const t = teams[currentTeamIdx]
  _app.innerHTML = `
    <div class="scene mimica-phone-scene">
      <div class="mimica-phone-top" style="border-bottom-color:${teamColor(currentTeamIdx)}55">
        <span class="mimica-team-tag" style="background:${teamColor(currentTeamIdx)}22;color:${teamColor(currentTeamIdx)}">${t.name}</span>
        <span class="mimica-phone-aciertos">Aciertos: <strong id="phone-aciertos">${aciertosThisTurn}</strong></span>
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
    aciertosThisTurn++
    const ac = document.getElementById('phone-aciertos')
    if (ac) ac.textContent = aciertosThisTurn
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

function renderTurnEnd(data) {
  clearPhoneTimer()
  teams = data.teams
  currentTeamIdx = data.currentTeamIdx
  aciertosThisTurn = data.aciertosThisTurn
  const t = teams[currentTeamIdx]
  const isLast = !data.hasMore
  _app.innerHTML = `
    <div class="scene">
      <div class="mimica-timeup-label" style="margin-top:0">¡TIEMPO!</div>
      <h1 class="title" style="font-size:clamp(1.6rem,6vw,2.4rem);color:${teamColor(currentTeamIdx)};margin:8px 0">${t.name}</h1>
      <div class="mimica-turnend-stat" style="font-size:clamp(2.8rem,12vw,5rem);font-weight:900;line-height:1">+${aciertosThisTurn}</div>
      <p class="label" style="margin-top:-4px;opacity:0.55">aciertos esta ronda</p>
      <div class="mimica-mini-scoreboard">
        ${teams.map((tt, i) => `
          <div class="mimica-mini-row ${i === currentTeamIdx ? 'mimica-mini-row-current' : ''}" style="--team-color:${teamColor(i)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${tt.name}</span>
            <span class="mimica-score-pts">${tt.score}</span>
          </div>
        `).join('')}
      </div>
      <button class="btn" id="next-btn" style="margin-top:16px">${isLast ? 'VER GANADOR' : 'SIGUIENTE EQUIPO'}</button>
    </div>
  `
  const btn = document.getElementById('next-btn')
  btn.focus()
  btn.onclick = () => {
    playTap()
    Conn.send({ type: 'mimica-next-team' })
  }
}

function renderGameEnd(data) {
  clearPhoneTimer()
  teams = data.teams
  const sorted = [...teams].sort((a, b) => b.score - a.score)
  const topScore = sorted[0]?.score ?? 0
  const winners  = sorted.filter(t => t.score === topScore && topScore > 0)
  const isTie    = winners.length > 1
  const heading  = isTie ? '🏆 ¡EMPATE!' : (winners.length ? '🏆 ¡GANADOR!' : 'FIN')

  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:8px">${heading}</h1>
      ${winners.length
        ? winners.map(w => `<div class="winner-name" style="color:${teamColor(teams.indexOf(w))}">${w.name}</div>`).join('')
        : `<div class="winner-name">—</div>`}
      <div class="mimica-mini-scoreboard" style="margin-top:24px">
        ${sorted.map(t => {
          const origIdx = teams.indexOf(t)
          return `
          <div class="mimica-mini-row" style="--team-color:${teamColor(origIdx)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${t.name}</span>
            <span class="mimica-score-pts">${t.score}</span>
          </div>`
        }).join('')}
      </div>
      <div class="end-btn-row">
        <button class="btn" id="again-btn">JUGAR DE NUEVO</button>
        <button class="btn" id="menu-btn">MENÚ PRINCIPAL</button>
      </div>
    </div>
  `
  document.getElementById('again-btn').focus()
  document.getElementById('again-btn').onclick = () => {
    playTap()
    Conn.send({ type: 'mimica-restart' })
  }
  document.getElementById('menu-btn').onclick = () => { clearSession(); _onMenu?.() }
}

function showRejected() {
  clearPhoneTimer()
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:1.6rem">CAPITÁN YA CONECTADO</h1>
      <p class="label">Espera a que el capitán actual se desconecte.</p>
      <button class="btn" id="back-btn" style="margin-top:24px">VOLVER AL MENÚ</button>
    </div>
  `
  document.getElementById('back-btn').onclick = () => { clearSession(); _onMenu?.() }
}
