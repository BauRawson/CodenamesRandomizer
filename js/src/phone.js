import * as Conn from './connection.js'
import { generateBoard, COLORS } from './game.js'
import { animateReveal, showConfetti } from './vfx.js'
import { playReveal, playHide, playWin, playNewBoard } from './sounds.js'

let board    = null
let revealed = []
let tileEls  = []
let counts   = [0, 0]
let totals   = [0, 0]
let won      = false
let _app     = null

export function renderEnterCode(app) {
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <p class="label">Enter the 4-digit code shown on the TV:</p>
      <input id="code-input" type="tel" inputmode="numeric"
             pattern="[0-9]*" maxlength="4" placeholder="0000" autocomplete="off">
      <button class="btn" id="connect-btn">CONNECT</button>
      <p id="status" class="status"></p>
    </div>
  `

  const input  = document.getElementById('code-input')
  const btn    = document.getElementById('connect-btn')
  const status = document.getElementById('status')

  const connect = () => {
    const code = input.value.trim()
    if (code.length !== 4) { status.textContent = 'Enter the full 4-digit code'; return }

    btn.disabled = true
    status.textContent = 'Connecting…'

    Conn.on('connected', () => renderSpymaster(app))
    Conn.on('error', (e) => {
      status.textContent = e.type === 'peer-unavailable'
        ? '❌ Wrong code — check the TV'
        : `❌ ${e.type}`
      btn.disabled = false
    })

    Conn.joinRoom(code)
  }

  btn.onclick = connect
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') connect() })
}

export function renderSpymaster(app) {
  _app     = app
  board    = generateBoard()
  revealed = new Array(25).fill(false)
  tileEls  = []
  won      = false

  totals = [
    board.tiles.filter((t) => t === 0).length,
    board.tiles.filter((t) => t === 1).length,
  ]
  counts = [...totals]

  const startColor = COLORS[board.isTeamOneFirst ? 0 : 1]
  const startLabel = board.isTeamOneFirst ? 'TEAM 1 STARTS' : 'TEAM 2 STARTS'

  app.innerHTML = `
    <div class="scene board-scene">
      <div class="team-banner" style="background:${startColor}22; border-bottom:3px solid ${startColor}">
        <span class="team-banner-text">${startLabel}</span>
        <div class="counters">
          <span class="counter" id="c0" style="color:${COLORS[0]}">${counts[0]}</span>
          <span class="counter" id="c1" style="color:${COLORS[1]}">${counts[1]}</span>
        </div>
      </div>
      <div class="board phone-board" id="board"></div>
      <div class="team-banner" style="background:${startColor}22; border-top:3px solid ${startColor}">
        <button class="new-board-btn" id="new-board-btn">NEW BOARD</button>
      </div>
    </div>
  `

  const boardEl = document.getElementById('board')

  board.tiles.forEach((type, i) => {
    const tile = document.createElement('div')
    tile.className = 'tile'
    tile.style.background = COLORS[type]
    tile.innerHTML = `<span class="tile-word">${board.words[i] ?? ''}</span>`
    tile.addEventListener('click', () => toggleTile(i, tile))
    boardEl.appendChild(tile)
    tileEls.push(tile)
  })

  Conn.send({ type: 'board', ...board })

  document.getElementById('new-board-btn').addEventListener('click', () => {
    if (confirm('Generate a new board? This resets the TV too.')) {
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
  const label = team === 0 ? 'TEAM 1' : 'TEAM 2'
  overlay.innerHTML = `
    <div class="win-text" style="color:${COLORS[team]}">${label} WINS!</div>
    <button class="btn" id="win-new-btn">NEW GAME</button>
  `
  _app.appendChild(overlay)
  document.getElementById('win-new-btn').addEventListener('click', () => {
    playNewBoard()
    renderSpymaster(_app)
  })
}
