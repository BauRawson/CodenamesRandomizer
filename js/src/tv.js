import * as Conn from './connection.js'
import { COLORS } from './game.js'

let tileEls = []

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
    if (data.type === 'board') renderBoard(app, data)
    if (data.type === 'reveal') revealTile(data.index, data.color)
    if (data.type === 'hide') hideTile(data.index)
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
  const startColor = COLORS[data.isTeamOneFirst ? 0 : 1]

  app.innerHTML = `
    <div class="scene board-scene">
      <div class="color-bar" style="background:${startColor}"></div>
      <div class="board" id="board"></div>
      <div class="color-bar" style="background:${startColor}"></div>
    </div>
  `

  tileEls = []
  const boardEl = document.getElementById('board')

  data.tiles.forEach((_, i) => {
    const tile = document.createElement('div')
    tile.className = 'tile tile-neutral'
    tile.innerHTML = `<span class="tile-word">${data.words[i] ?? ''}</span>`
    boardEl.appendChild(tile)
    tileEls.push(tile)
  })
}

function revealTile(index, color) {
  const tile = tileEls[index]
  if (!tile) return
  tile.style.background = color
  tile.classList.remove('tile-neutral')
  tile.classList.add('revealed')
}

function hideTile(index) {
  const tile = tileEls[index]
  if (!tile) return
  tile.style.background = ''
  tile.classList.remove('revealed')
  tile.classList.add('tile-neutral')
}
