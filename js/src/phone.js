import * as Conn from './connection.js'
import { generateBoard, COLORS } from './game.js'

let board = null
let revealed = []
let tileEls = []

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

  const input = document.getElementById('code-input')
  const btn   = document.getElementById('connect-btn')
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
  board = generateBoard()
  revealed = new Array(25).fill(false)
  tileEls = []

  const startColor = COLORS[board.isTeamOneFirst ? 0 : 1]

  app.innerHTML = `
    <div class="scene board-scene">
      <div class="color-bar" style="background:${startColor}"></div>
      <div class="board" id="board"></div>
      <div class="color-bar" style="background:${startColor}"></div>
      <button class="new-board-btn" id="new-board-btn">NEW BOARD</button>
    </div>
  `

  const boardEl = document.getElementById('board')

  board.tiles.forEach((type, i) => {
    const tile = document.createElement('div')
    tile.className = 'tile'
    tile.style.background = COLORS[type]
    tile.addEventListener('click', () => toggleTile(i, tile))
    boardEl.appendChild(tile)
    tileEls.push(tile)
  })

  Conn.send({ type: 'board', ...board })

  document.getElementById('new-board-btn').addEventListener('click', () => {
    if (confirm('Generate a new board? This resets the TV too.')) renderSpymaster(app)
  })
}

function toggleTile(index, el) {
  revealed[index] = !revealed[index]
  el.classList.toggle('checked', revealed[index])

  Conn.send(
    revealed[index]
      ? { type: 'reveal', index, color: COLORS[board.tiles[index]] }
      : { type: 'hide', index }
  )
}
