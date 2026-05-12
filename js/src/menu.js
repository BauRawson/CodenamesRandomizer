import { renderTV } from './tv.js'
import { renderEnterCode } from './phone.js'
import { renderTriviaTV } from './trivia-tv.js'
import { renderTriviaPhone } from './trivia-phone.js'
import { disconnect } from './connection.js'

let arrowNavInstalled = false

function installArrowNav() {
  if (arrowNavInstalled) return
  arrowNavInstalled = true
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const btns = [...document.querySelectorAll('.btn')]
    if (!btns.length) return
    const idx = btns.indexOf(document.activeElement)
    if (e.key === 'ArrowDown') btns[Math.min(idx + 1, btns.length - 1)].focus()
    if (e.key === 'ArrowUp')   btns[Math.max(idx - 1, 0)].focus()
    e.preventDefault()
  })
}

export function renderMenu(app) {
  disconnect()
  installArrowNav()

  app.innerHTML = `
    <div class="scene">
      <h1 class="title">CÓDIGO</h1>
      <button class="btn" id="cs-btn">CÓDIGO SECRETO</button>
      <button class="btn" id="trivia-btn" style="background:#6b3fa0">TRIVIA</button>
    </div>
  `

  document.getElementById('cs-btn').focus()
  document.getElementById('cs-btn').onclick    = () => renderGameMenu(app, 'cs')
  document.getElementById('trivia-btn').onclick = () => renderGameMenu(app, 'trivia')
}

function renderGameMenu(app, game) {
  disconnect()
  const title = game === 'cs' ? 'CÓDIGO SECRETO' : 'TRIVIA'

  app.innerHTML = `
    <div class="scene">
      <h1 class="title" style="font-size:clamp(1.6rem,7vw,3.5rem)">${title}</h1>
      <button class="btn" id="tv-btn">TELEVISOR</button>
      <button class="btn" id="phone-btn">MÓVIL</button>
      <button class="btn-back" id="back-btn">← VOLVER</button>
    </div>
  `

  document.getElementById('tv-btn').focus()

  const goMenu = () => renderMenu(app)

  document.getElementById('tv-btn').onclick    = () =>
    game === 'cs' ? renderTV(app) : renderTriviaTV(app, goMenu)
  document.getElementById('phone-btn').onclick = () =>
    game === 'cs' ? renderEnterCode(app) : renderTriviaPhone(app, goMenu)
  document.getElementById('back-btn').onclick  = goMenu
}
