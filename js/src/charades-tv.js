import * as Conn from './connection.js'
import { movies } from './charades-words.js'
import { playTick, playTimerEnd, playCorrect, playJoin, playTriviaWin } from './sounds.js'
import { showConfetti } from './vfx.js'

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const TURN_TIME = 90

const TEAM_COLORS = ['#ed8099', '#4d65b4', '#fbb954', '#7ad36b', '#b774e0', '#5fd6c8']

let _app = null
let _onMenu = null
let captainConn = null
let captainId   = null
let currentWord = ''
let usedWords   = new Set()
let timeRemaining = 0
let timerInterval = null
let teams = []                  // [{ name, score }]
let currentTeamIdx = 0
let aciertosThisTurn = 0
let phase = 'lobby'             // 'lobby'|'setup'|'turn-ready'|'playing'|'turn-end'|'game-end'
let roomCode = ''

export function renderCharadesTV(app, onMenu) {
  _app    = app
  _onMenu = onMenu
  resetGame()
  captainConn = null
  captainId   = null
  phase       = 'lobby'

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
    if (data.type === 'mimica-hello')        return handleHello(c, data.clientId)
    if (data.type === 'mimica-setup-teams')  return handleSetupTeams(data.count)
    if (data.type === 'mimica-begin-turn')   return handleBeginTurn()
    if (data.type === 'mimica-correct')      return handleCorrect()
    if (data.type === 'mimica-skip')         return handleSkip()
    if (data.type === 'mimica-next-team')    return handleNextTeam()
    if (data.type === 'mimica-restart')      return handleRestart()
  })

  Conn.hostRoom(roomCode)
}

function resetGame() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
  currentWord = ''
  usedWords = new Set()
  teams = []
  currentTeamIdx = 0
  aciertosThisTurn = 0
  timeRemaining = 0
}

function handleHello(conn, clientId) {
  const isReturningCaptain = clientId && clientId === captainId
  const slotOpen = !captainConn?.open

  if (isReturningCaptain || slotOpen) {
    captainConn = conn
    captainId   = clientId || captainId
    playJoin()
    if (phase === 'lobby') phase = 'setup'
    if (phase === 'playing' && !timerInterval) startTimer()  // resume countdown on rejoin
    sendCaptainSync()
    renderTVForPhase()
  } else {
    Conn.sendTo(conn, { type: 'mimica-rejected', reason: 'captain-taken' })
  }
}

function sendCaptainSync() {
  if (!captainConn) return
  if (phase === 'setup') {
    Conn.sendTo(captainConn, { type: 'mimica-setup-needed' })
  } else if (phase === 'turn-ready') {
    Conn.sendTo(captainConn, { type: 'mimica-turn-ready', teams, currentTeamIdx })
  } else if (phase === 'playing') {
    Conn.sendTo(captainConn, { type: 'mimica-word', word: currentWord, remaining: timeRemaining, aciertosThisTurn, teams, currentTeamIdx })
  } else if (phase === 'turn-end') {
    Conn.sendTo(captainConn, { type: 'mimica-turn-end', teams, currentTeamIdx, aciertosThisTurn, hasMore: currentTeamIdx < teams.length - 1 })
  } else if (phase === 'game-end') {
    Conn.sendTo(captainConn, { type: 'mimica-game-end', teams })
  }
}

function handleSetupTeams(count) {
  if (phase !== 'setup') return
  const n = Math.max(2, Math.min(6, Number(count) || 0))
  teams = Array.from({ length: n }, (_, i) => ({ name: `Equipo ${i + 1}`, score: 0 }))
  currentTeamIdx = 0
  aciertosThisTurn = 0
  phase = 'turn-ready'
  sendCaptainSync()
  renderTVForPhase()
}

function handleBeginTurn() {
  if (phase !== 'turn-ready') return
  aciertosThisTurn = 0
  timeRemaining = TURN_TIME
  phase = 'playing'
  pickWord()
  startTimer()
  sendCaptainSync()
  renderTVForPhase()
}

function handleCorrect() {
  if (phase !== 'playing') return
  aciertosThisTurn++
  teams[currentTeamIdx].score++
  playCorrect()
  pickWord()
  sendCaptainSync()
  updatePlayingTV()
}

function handleSkip() {
  if (phase !== 'playing') return
  pickWord()
  sendCaptainSync()
  updatePlayingTV()
}

function handleNextTeam() {
  if (phase !== 'turn-end') return
  if (currentTeamIdx >= teams.length - 1) {
    finishGame()
    return
  }
  currentTeamIdx++
  aciertosThisTurn = 0
  phase = 'turn-ready'
  sendCaptainSync()
  renderTVForPhase()
}

function handleRestart() {
  if (phase !== 'game-end') return
  resetGame()
  phase = 'setup'
  sendCaptainSync()
  renderTVForPhase()
}

function pickWord() {
  if (usedWords.size >= movies.length) usedWords.clear()
  let w
  do { w = movies[Math.floor(Math.random() * movies.length)] } while (usedWords.has(w))
  usedWords.add(w)
  currentWord = w
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
      phase = 'turn-end'
      sendCaptainSync()
      renderTVForPhase()
    }
  }, 1000)
}

function finishGame() {
  phase = 'game-end'
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
  playTriviaWin()
  const sorted = [...teams].sort((a, b) => b.score - a.score)
  showConfetti(TEAM_COLORS[teams.indexOf(sorted[0])] ?? '#2e5fa8')
  sendCaptainSync()
  renderTVForPhase()
}

function renderTVForPhase() {
  if (phase === 'lobby')      return renderLobby()
  if (phase === 'setup')      return renderSetup()
  if (phase === 'turn-ready') return renderTurnReady()
  if (phase === 'playing')    return renderPlaying()
  if (phase === 'turn-end')   return renderTurnEnd()
  if (phase === 'game-end')   return renderGameEnd()
}

function teamColor(i) { return TEAM_COLORS[i % TEAM_COLORS.length] }

function scoreboardHTML(highlightIdx = -1) {
  return `
    <div class="mimica-scoreboard">
      ${teams.map((t, i) => `
        <div class="mimica-score-row ${i === highlightIdx ? 'mimica-score-row-current' : ''}"
             style="--team-color:${teamColor(i)}">
          <span class="mimica-score-dot"></span>
          <span class="mimica-score-name">${esc(t.name)}</span>
          <span class="mimica-score-pts">${t.score}</span>
        </div>
      `).join('')}
    </div>
  `
}

function renderLobby() {
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">Conecta tu móvil con este código:</p>
      <div class="room-code">${roomCode}</div>
      <p class="status">Esperando al capitán…</p>
      <button class="btn" id="menu-btn" style="margin-top:24px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `
  document.getElementById('menu-btn').onclick = () => _onMenu?.()
}

function renderSetup() {
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title">MÍMICA</h1>
      <p class="label">¡Capitán conectado!</p>
      <p class="status" style="margin-top:8px">Esperando que elija la cantidad de equipos…</p>
      <div class="end-join-block" style="margin-top:32px">
        <span class="end-join-label">Otro capitán puede entrar con</span>
        <span class="end-join-code">${roomCode}</span>
      </div>
    </div>
  `
}

function renderTurnReady() {
  const t = teams[currentTeamIdx]
  _app.innerHTML = `
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-code">${roomCode}</span>
        <span class="mimica-progress">Turno ${currentTeamIdx + 1} / ${teams.length}</span>
      </div>
      <div class="mimica-ready-center">
        <div class="mimica-ready-label">TURNO DEL</div>
        <div class="mimica-ready-team" style="color:${teamColor(currentTeamIdx)}">${esc(t.name)}</div>
        <div class="mimica-ready-help">Pasa el móvil al capitán de este equipo</div>
      </div>
      <div class="mimica-foot">${scoreboardHTML(currentTeamIdx)}</div>
    </div>
  `
}

function renderPlaying() {
  const t = teams[currentTeamIdx]
  _app.innerHTML = `
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-team-tag" style="background:${teamColor(currentTeamIdx)}22;color:${teamColor(currentTeamIdx)}">${esc(t.name)}</span>
        <span class="mimica-aciertos">Aciertos: <strong id="mimica-aciertos">${aciertosThisTurn}</strong></span>
      </div>
      <div class="mimica-timer-wrap">
        <div class="mimica-timer-label">SEGUNDOS</div>
        <div class="mimica-timer${timeRemaining <= 5 ? ' timer-urgent' : ''}" id="mimica-timer">${timeRemaining}</div>
      </div>
      <div class="mimica-foot">¡A actuar! El capitán ve la palabra.</div>
    </div>
  `
}

function updatePlayingTV() {
  const el = document.getElementById('mimica-aciertos')
  if (el) el.textContent = aciertosThisTurn
}

function renderTurnEnd() {
  const t = teams[currentTeamIdx]
  const isLast = currentTeamIdx >= teams.length - 1
  _app.innerHTML = `
    <div class="scene mimica-scene">
      <div class="mimica-top">
        <span class="mimica-code">${roomCode}</span>
        <span class="mimica-progress">Turno ${currentTeamIdx + 1} / ${teams.length}</span>
      </div>
      <div class="mimica-turnend-center">
        <div class="mimica-timeup-flash">¡TIEMPO!</div>
        <div class="mimica-turnend-team" style="color:${teamColor(currentTeamIdx)}">${esc(t.name)}</div>
        <div class="mimica-turnend-stat">+${aciertosThisTurn} <span style="opacity:0.55;font-size:0.5em">aciertos</span></div>
      </div>
      <div class="mimica-foot">
        ${scoreboardHTML(currentTeamIdx)}
        <p style="margin-top:14px;opacity:0.6;font-weight:700">${isLast ? 'Esperando a ver el ganador…' : 'Esperando al siguiente equipo…'}</p>
      </div>
    </div>
  `
}

function renderGameEnd() {
  const sorted = [...teams].sort((a, b) => b.score - a.score)
  const topScore = sorted[0]?.score ?? 0
  const winners  = sorted.filter(t => t.score === topScore && topScore > 0)
  const isTie    = winners.length > 1
  const heading  = isTie ? 'EMPATE' : (winners.length ? 'GANA' : 'FIN')

  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:2rem;margin-bottom:4px">${heading}</h1>
      ${winners.length
        ? winners.map(w => `<div class="winner-name" style="color:${teamColor(teams.indexOf(w))}">${esc(w.name)}</div>`).join('')
        : `<div class="winner-name">—</div>`}
      <div class="mimica-scoreboard" style="margin-top:24px;max-width:520px;width:100%">
        ${sorted.map((t) => {
          const origIdx = teams.indexOf(t)
          return `
          <div class="mimica-score-row" style="--team-color:${teamColor(origIdx)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${esc(t.name)}</span>
            <span class="mimica-score-pts">${t.score}</span>
          </div>`
        }).join('')}
      </div>
      <div class="end-join-block">
        <span class="end-join-label">¿Quieres jugar? Únete con</span>
        <span class="end-join-code">${roomCode}</span>
      </div>
      <button class="btn" id="menu-btn" style="margin-top:8px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `
  document.getElementById('menu-btn').onclick = () => _onMenu?.()
}

function renderCaptainLost() {
  _app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:1.8rem">CAPITÁN DESCONECTADO</h1>
      <p class="label">Esperando reconexión…</p>
      <div class="room-code" style="font-size:clamp(3rem,12vw,6rem)">${roomCode}</div>
      ${teams.length ? `<div class="mimica-scoreboard" style="margin-top:16px;max-width:420px;width:100%">
        ${teams.map((t, i) => `
          <div class="mimica-score-row" style="--team-color:${teamColor(i)}">
            <span class="mimica-score-dot"></span>
            <span class="mimica-score-name">${esc(t.name)}</span>
            <span class="mimica-score-pts">${t.score}</span>
          </div>
        `).join('')}
      </div>` : ''}
      <button class="btn" id="menu-btn" style="margin-top:24px;max-width:280px">MENÚ PRINCIPAL</button>
    </div>
  `
  document.getElementById('menu-btn').onclick = () => _onMenu?.()
}
