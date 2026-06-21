import * as Conn from './connection.js'
import { COLORS } from './game.js'
import { animateReveal, showConfetti } from './vfx.js'
import { playReveal, playHide, playWin } from './sounds.js'
import { fitBoard, watchBoardResize } from './fit-board.js'

let tileEls  = []
let counts   = [0, 0]
let totals   = [0, 0]

// Multi-connection state
let captainConn    = null
let captainId      = null                    // clientId of the captain (preserved across reconnects)
let spectatorConns = []
let boardData      = null                    // last received board message
let revealedState  = new Array(25).fill(null) // null | {color, tileType}

let _app = null

export function renderTV(app) {
  _app = app
  captainConn    = null
  captainId      = null
  spectatorConns = []
  boardData      = null
  revealedState  = new Array(25).fill(null)

  const code = Conn.generateCode()

  app.innerHTML = `
    <div class="scene tv-sync-scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Abre la app en tu móvil e ingresa este código:</p>
      <div class="room-code">${code}</div>
      <p id="status" class="status">Esperando al móvil…</p>
    </div>
  `

  // Wait for cs-hello before assigning role (so we can recognize returning captain by clientId)
  Conn.on('connected', () => {})

  Conn.on('peer-left', (c) => {
    if (c === captainConn) captainConn = null   // keep captainId so they can rejoin
    spectatorConns = spectatorConns.filter(s => s !== c)
    updateStatus()
  })

  Conn.on('message', (data, c) => {
    if (data.type === 'cs-hello') {
      assignRole(c, data.clientId)
      return
    }
    if (data.type === 'board') {
      boardData     = { ...data }
      revealedState = new Array(25).fill(null)
      renderBoard(app, data)
      spectatorConns.filter(s => s.open).forEach(s =>
        Conn.sendTo(s, { type: 'board-update', ...data })
      )
    }
    if (data.type === 'reveal') {
      revealedState[data.index] = { color: data.color, tileType: data.tileType }
      revealTile(data.index, data.color, data.tileType)
      spectatorConns.filter(s => s.open).forEach(s =>
        Conn.sendTo(s, { type: 'reveal', index: data.index, color: data.color })
      )
    }
    if (data.type === 'hide') {
      revealedState[data.index] = null
      hideTile(data.index, data.tileType)
      spectatorConns.filter(s => s.open).forEach(s =>
        Conn.sendTo(s, { type: 'hide', index: data.index })
      )
    }
    if (data.type === 'win') {
      showWin(data.team, app)
      spectatorConns.filter(s => s.open).forEach(s =>
        Conn.sendTo(s, { type: 'win', team: data.team })
      )
    }
  })

  Conn.on('error', (e) => {
    const el = document.getElementById('status')
    if (el) el.textContent = `Error: ${e.type}`
  })

  Conn.hostRoom(code)
}

function assignRole(c, clientId) {
  const isReturningCaptain = clientId && clientId === captainId
  const captainSlotOpen    = !captainConn?.open

  if (isReturningCaptain || captainSlotOpen) {
    if (captainConn && captainConn !== c) {
      spectatorConns.push(captainConn)
      if (boardData) Conn.sendTo(captainConn, { type: 'sync', role: 'spectator', board: boardData, revealed: revealedState })
      else           Conn.sendTo(captainConn, { type: 'role', role: 'spectator' })
    }
    captainConn = c
    captainId   = clientId || captainId
    if (boardData) Conn.sendTo(c, { type: 'sync', role: 'captain', board: boardData, revealed: revealedState })
    else           Conn.sendTo(c, { type: 'role', role: 'captain' })
  } else {
    if (!spectatorConns.includes(c)) spectatorConns.push(c)
    if (boardData) Conn.sendTo(c, { type: 'sync', role: 'spectator', board: boardData, revealed: revealedState })
    else           Conn.sendTo(c, { type: 'role', role: 'spectator' })
  }
  updateStatus()
}

function updateStatus() {
  const el = document.getElementById('status')
  if (!el) return
  const specCount = spectatorConns.filter(c => c.open).length
  const parts = []
  if (captainConn?.open) parts.push('¡Capitán conectado!')
  if (specCount > 0) parts.push(`${specCount} espectador${specCount > 1 ? 'es' : ''} conectado${specCount > 1 ? 's' : ''}`)
  el.textContent = parts.length ? parts.join(' · ') : 'Esperando al móvil…'
}

function renderBoard(app, data) {
  tileEls = []
  const startColor = COLORS[data.isTeamOneFirst ? 0 : 1]

  totals = [
    data.tiles.filter((t) => t === 0).length,
    data.tiles.filter((t) => t === 1).length,
  ]
  counts = [...totals]

  app.innerHTML = `
    <div class="scene board-scene tv-scene">
      <div class="team-banner" style="background:${startColor}22; border-bottom:3px solid ${startColor}">
        <div class="counters">
          <span class="counter" id="c0" style="color:${COLORS[0]}">${counts[0]}</span>
          <span class="counter" id="c1" style="color:${COLORS[1]}">${counts[1]}</span>
        </div>
      </div>
      <div class="board tv-board" id="board"></div>
      <div class="team-banner" style="background:${startColor}22; border-top:3px solid ${startColor}">
        <span class="team-banner-text" style="color:rgba(255,255,255,0.5)">michicho.com</span>
      </div>
    </div>
  `

  const boardEl = document.getElementById('board')
  data.tiles.forEach((_, i) => {
    const tile = document.createElement('div')
    tile.className = 'tile tile-neutral'
    tile.innerHTML = `<span class="tile-word">${data.words[i] ?? ''}</span>`
    boardEl.appendChild(tile)
    tileEls.push(tile)
  })
  fitBoard(boardEl)
  watchBoardResize()
  requestAnimationFrame(() => {
    fitBoard(boardEl)
    tileEls.forEach(fitText)
  })
}

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

function revealTile(index, color, tileType) {
  const tile = tileEls[index]
  if (!tile) return
  tile.style.background = color
  tile.dataset.type = tileType
  tile.classList.remove('tile-neutral')
  tile.classList.add('revealed')
  if (tileType === 2) {
    const w = tile.querySelector('.tile-word')
    if (w) w.style.color = 'rgba(255,255,255,0.92)'
  }
  animateReveal(tile)
  playReveal(tileType)

  if (tileType === 0 || tileType === 1) {
    counts[tileType] = Math.max(0, counts[tileType] - 1)
    updateCounter(tileType)
  }
}

function hideTile(index, tileType) {
  const tile = tileEls[index]
  if (!tile) return
  tile.style.background = ''
  tile.classList.remove('revealed')
  tile.classList.add('tile-neutral')
  const w = tile.querySelector('.tile-word')
  if (w) w.style.color = ''
  playHide()

  if (tileType === 0 || tileType === 1) {
    counts[tileType] = Math.min(totals[tileType], counts[tileType] + 1)
    updateCounter(tileType)
  }
}

function updateCounter(team) {
  const el = document.getElementById(`c${team}`)
  if (el) el.textContent = counts[team]
}

function showWin(team, app) {
  playWin(team)
  const color = COLORS[team]
  const label = team === 0 ? 'EQUIPO 1' : 'EQUIPO 2'
  showConfetti(color)

  const overlay = document.createElement('div')
  overlay.className = 'win-overlay'
  overlay.innerHTML = `<div class="win-text" style="color:${color}">${label} GANA!</div>`
  app.appendChild(overlay)
}
