import { generateBoard, COLORS } from './game.js'
import { playReveal, playHide, playNewBoard } from './sounds.js'
import { animateReveal } from './vfx.js'

export function renderMapa(app, goMenu) {
  drawMapa()

  function drawMapa() {
    const board = generateBoard()
    const startColor = COLORS[board.isTeamOneFirst ? 0 : 1]

    app.innerHTML = `
      <div class="scene board-scene">
        <div class="team-banner" style="background:${startColor}22; border-bottom:3px solid ${startColor}">
          <button class="btn-back" id="back-btn">← VOLVER</button>
        </div>
        <div class="board phone-board" id="board"></div>
        <div class="team-banner" style="background:${startColor}22; border-top:3px solid ${startColor}">
          <button class="new-board-btn" id="new-map-btn">NUEVO MAPA</button>
        </div>
      </div>
    `

    const boardEl = document.getElementById('board')
    board.tiles.forEach((type) => {
      const tile = document.createElement('div')
      tile.className = 'tile'
      tile.dataset.type = type
      tile.style.background = COLORS[type]
      tile.addEventListener('click', () => {
        const nowChecked = !tile.classList.contains('checked')
        tile.classList.toggle('checked', nowChecked)
        if (nowChecked) {
          animateReveal(tile)
          playReveal(type)
        } else {
          playHide()
        }
      })
      boardEl.appendChild(tile)
    })

    document.getElementById('back-btn').onclick = goMenu
    document.getElementById('new-map-btn').onclick = () => {
      if (confirm('¿Generar un nuevo mapa?')) {
        playNewBoard()
        drawMapa()
      }
    }
  }
}
