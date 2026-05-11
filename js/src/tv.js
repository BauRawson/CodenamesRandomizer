import * as Conn from './connection.js'
import { COLORS } from './game.js'
import { animateReveal } from './vfx.js'
import { playReveal, playHide, playWin } from './sounds.js'

let tileEls = []
let counts  = [0, 0]   // remaining tiles per team
let totals  = [0, 0]

export function renderTV(app) {
  const code = Conn.generateCode()

  app.innerHTML = `
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Open the app on your phone and enter this code:</p>
      <div class="room-code">${code}</div>
      <p id="status" class="status">Waiting for phone…</p>
    </div>
  `

  Conn.on('connected', () => {
    document.getElementById('status').textContent = 'Phone connected!'
  })

  Conn.on('message', (data) => {
    if (data.type === 'board')  renderBoard(app, data)
    if (data.type === 'reveal') revealTile(data.index, data.color, data.tileType)
    if (data.type === 'hide')   hideTile(data.index, data.tileType)
    if (data.type === 'win')    showWin(data.team, app)
  })

  Conn.on('disconnected', () => {
    const el = document.getElementById('status')
    if (el) el.textContent = '⚠️ Phone disconnected'
  })

  Conn.on('error', (e) => {
    const el = document.getElementById('status')
    if (el) el.textContent = `Error: ${e.type}`
  })

  Conn.hostRoom(code)
}

function renderBoard(app, data) {
  tileEls = []
  const startColor  = COLORS[data.isTeamOneFirst ? 0 : 1]
  const startLabel  = data.isTeamOneFirst ? 'TEAM 1 STARTS' : 'TEAM 2 STARTS'

  totals = [
    data.tiles.filter((t) => t === 0).length,
    data.tiles.filter((t) => t === 1).length,
  ]
  counts = [...totals]

  app.innerHTML = `
    <div class="scene board-scene">
      <div class="team-banner" style="background:${startColor}22; border-bottom:3px solid ${startColor}">
        <span class="team-banner-text">${startLabel}</span>
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
}

function revealTile(index, color, tileType) {
  const tile = tileEls[index]
  if (!tile) return
  tile.style.background = color
  tile.classList.remove('tile-neutral')
  tile.classList.add('revealed')
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
  const label = team === 0 ? 'TEAM 1' : 'TEAM 2'

  const overlay = document.createElement('div')
  overlay.className = 'win-overlay'
  overlay.innerHTML = `
    <div class="win-text" style="color:${color}">${label} WINS!</div>
  `
  app.appendChild(overlay)
}
