import * as Conn from './connection.js'
import { generateBoard, COLORS } from './game.js'
import { animateReveal, showConfetti } from './vfx.js'
import { playReveal, playHide, playWin, playNewBoard } from './sounds.js'
import { getClientId, saveSession, loadSession } from './session.js'

// Captain state
let board    = null
let revealed = []
let tileEls  = []
let counts   = [0, 0]
let totals   = [0, 0]
let won      = false
let _app     = null

// Spectator state
let specTileEls = []

// Reconnect state
let roomCode = ''
let visListenerInstalled = false

export function renderEnterCode(app) {
  _app = app
  installVisibilityListener()
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Ingresa el código de 4 dígitos que aparece en el televisor:</p>
      <input id="code-input" type="tel" inputmode="numeric"
             pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <button class="btn" id="connect-btn">CONECTAR</button>
      <p id="status" class="status"></p>
    </div>
  `

  const input  = document.getElementById('code-input')
  const btn    = document.getElementById('connect-btn')
  const status = document.getElementById('status')

  const connect = () => {
    const code = input.value.trim()
    if (code.length !== 4) { status.textContent = 'Ingresa el código de 4 dígitos completo'; return }
    btn.disabled = true
    status.textContent = 'Conectando…'
    connectToRoom(code)
  }

  btn.onclick = connect
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') connect() })
}

function connectToRoom(code) {
  roomCode = code
  saveSession({ mode: 'cs', code })
  Conn.disconnect()

  Conn.on('connected', () => {
    const st = document.getElementById('status')
    if (st) st.textContent = 'Conectado, esperando…'
    Conn.send({ type: 'cs-hello', clientId: getClientId() })
  })

  Conn.on('message', (data) => {
    if (data.type === 'role') {
      if (data.role === 'captain')   renderSpymaster(_app)
      if (data.role === 'spectator') renderSpectator(_app, null, [])
    }
    if (data.type === 'sync') {
      if (data.role === 'captain')   renderSpymaster(_app, data.board, data.revealed)
      if (data.role === 'spectator') renderSpectator(_app, data.board, data.revealed)
    }
    if (data.type === 'board-update') renderSpectator(_app, data, new Array(25).fill(null))
    if (data.type === 'reveal')       specRevealTile(data.index, data.color)
    if (data.type === 'hide')         specHideTile(data.index)
    if (data.type === 'win')          specShowWin(data.team, _app)
  })

  Conn.on('error', (e) => {
    const st  = document.getElementById('status')
    const btn = document.getElementById('connect-btn')
    if (st) st.textContent = e.type === 'peer-unavailable'
      ? '❌ Código incorrecto — revisa el televisor'
      : `❌ ${e.type}`
    if (btn) btn.disabled = false
  })

  Conn.joinRoom(code)
}

function installVisibilityListener() {
  if (visListenerInstalled) return
  visListenerInstalled = true
  const tryRejoin = () => {
    if (document.visibilityState !== 'visible') return
    if (!roomCode) return
    const sess = loadSession()
    if (sess?.mode !== 'cs') return
    if (Conn.isConnected()) return
    connectToRoom(roomCode)
  }
  document.addEventListener('visibilitychange', tryRejoin)
  window.addEventListener('focus', tryRejoin)
  window.addEventListener('online', tryRejoin)
}

// ── Captain (spymaster) view ──────────────────────────────────────────────────

export function renderSpymaster(app, existingBoard = null, existingRevealed = null) {
  _app  = app
  board = existingBoard || generateBoard()
  won   = false
  tileEls = []

  // Convert revealedState (null|{}) array → boolean array
  revealed = existingRevealed
    ? existingRevealed.map((r) => r !== null)
    : new Array(25).fill(false)

  totals = [
    board.tiles.filter((t) => t === 0).length,
    board.tiles.filter((t) => t === 1).length,
  ]
  counts = [
    board.tiles.filter((t, i) => t === 0 && !revealed[i]).length,
    board.tiles.filter((t, i) => t === 1 && !revealed[i]).length,
  ]

  const startColor = COLORS[board.isTeamOneFirst ? 0 : 1]

  app.innerHTML = `
    <div class="scene board-scene">
      <div class="team-banner" style="background:${startColor}22; border-bottom:3px solid ${startColor}">
        <div class="counters">
          <span class="counter" id="c0" style="color:${COLORS[0]}">${counts[0]}</span>
          <span class="counter" id="c1" style="color:${COLORS[1]}">${counts[1]}</span>
        </div>
      </div>
      <div class="board phone-board" id="board"></div>
      <div class="team-banner" style="background:${startColor}22; border-top:3px solid ${startColor}">
        <button class="new-board-btn" id="new-board-btn">NUEVO TABLERO</button>
      </div>
    </div>
  `

  const boardEl = document.getElementById('board')
  board.tiles.forEach((type, i) => {
    const tile = document.createElement('div')
    tile.className = 'tile'
    tile.dataset.type = type
    tile.style.background = COLORS[type]
    tile.innerHTML = `<span class="tile-word">${board.words[i] ?? ''}</span>`
    tile.addEventListener('click', () => toggleTile(i, tile))
    if (revealed[i]) tile.classList.add('checked')
    boardEl.appendChild(tile)
    tileEls.push(tile)
  })
  requestAnimationFrame(() => tileEls.forEach(fitText))

  // Only send board to TV on fresh games (not reconnects)
  if (!existingBoard) Conn.send({ type: 'board', ...board })

  document.getElementById('new-board-btn').addEventListener('click', () => {
    if (confirm('¿Generar un nuevo tablero? Esto reinicia el televisor también.')) {
      playNewBoard()
      renderSpymaster(app)
    }
  })
}

function toggleTile(index, el) {
  if (won) return
  revealed[index] = !revealed[index]
  el.classList.toggle('checked', revealed[index])

  const tileType = board.tiles[index]

  if (revealed[index]) {
    animateReveal(el)
    playReveal(tileType)
    Conn.send({ type: 'reveal', index, color: COLORS[tileType], tileType })

    if (tileType === 0 || tileType === 1) {
      counts[tileType] = Math.max(0, counts[tileType] - 1)
      updateCounter(tileType)
      checkWin(tileType)
    }
  } else {
    playHide()
    Conn.send({ type: 'hide', index, tileType })

    if (tileType === 0 || tileType === 1) {
      counts[tileType] = Math.min(totals[tileType], counts[tileType] + 1)
      updateCounter(tileType)
    }
  }
}

function updateCounter(team) {
  const el = document.getElementById(`c${team}`)
  if (el) el.textContent = counts[team]
}

function checkWin(team) {
  if (counts[team] > 0) return
  won = true
  playWin(team)
  showConfetti(COLORS[team])
  Conn.send({ type: 'win', team })

  const overlay = document.createElement('div')
  overlay.className = 'win-overlay'
  const label = team === 0 ? 'EQUIPO 1' : 'EQUIPO 2'
  overlay.innerHTML = `
    <div class="win-text" style="color:${COLORS[team]}">${label} GANA!</div>
    <button class="btn" id="win-new-btn">NUEVA PARTIDA</button>
  `
  _app.appendChild(overlay)
  document.getElementById('win-new-btn').addEventListener('click', () => {
    playNewBoard()
    renderSpymaster(_app)
  })
}

// ── Spectator (TV mirror) view ────────────────────────────────────────────────

function renderSpectator(app, data, revealedState) {
  specTileEls = []

  if (!data) {
    app.innerHTML = `
      <div class="scene">
        <h1 class="title">CODIGO</h1>
        <p class="label" style="opacity:0.6">Esperando tablero…</p>
      </div>
    `
    return
  }

  const startColor = COLORS[data.isTeamOneFirst ? 0 : 1]

  app.innerHTML = `
    <div class="scene board-scene">
      <div class="team-banner" style="background:${startColor}22; border-bottom:3px solid ${startColor}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.45)">ESPECTADOR</span>
      </div>
      <div class="board phone-board" id="spec-board"></div>
      <div class="team-banner" style="background:${startColor}22; border-top:3px solid ${startColor}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.3); font-size:0.85rem">michicho.com</span>
      </div>
    </div>
  `

  const boardEl = document.getElementById('spec-board')
  data.tiles.forEach((_, i) => {
    const tile = document.createElement('div')
    tile.className = 'tile tile-neutral'
    tile.innerHTML = `<span class="tile-word">${data.words[i] ?? ''}</span>`
    boardEl.appendChild(tile)
    specTileEls.push(tile)
  })
  requestAnimationFrame(() => specTileEls.forEach(fitText))

  // Apply already-revealed tiles
  revealedState.forEach((r, i) => {
    if (r) specRevealTile(i, r.color)
  })
}

function specRevealTile(index, color) {
  const tile = specTileEls[index]
  if (!tile) return
  tile.style.background = color
  tile.classList.remove('tile-neutral')
  tile.classList.add('revealed')
}

function specHideTile(index) {
  const tile = specTileEls[index]
  if (!tile) return
  tile.style.background = ''
  tile.classList.remove('revealed')
  tile.classList.add('tile-neutral')
}

function specShowWin(team, app) {
  const color = COLORS[team]
  const label = team === 0 ? 'EQUIPO 1' : 'EQUIPO 2'
  showConfetti(color)
  const overlay = document.createElement('div')
  overlay.className = 'win-overlay'
  overlay.innerHTML = `<div class="win-text" style="color:${color}">${label} GANA!</div>`
  app.appendChild(overlay)
}

// ── Shared ────────────────────────────────────────────────────────────────────

function fitText(tileEl) {
  const wordEl = tileEl.querySelector('.tile-word')
  if (!wordEl) return
  let size = parseFloat(getComputedStyle(wordEl).fontSize)
  while (wordEl.scrollWidth > wordEl.clientWidth + 1 && size > 9) {
    size -= 0.5
    wordEl.style.fontSize = `${size}px`
  }
  if (wordEl.scrollWidth > wordEl.clientWidth + 1) wordEl.style.letterSpacing = '0'
  if (wordEl.scrollWidth > wordEl.clientWidth + 1) wordEl.style.whiteSpace = 'normal'
}
