import { renderTV } from './tv.js'
import { renderEnterCode } from './phone.js'

export function renderMenu(app) {
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <button class="btn" id="tv-btn">TELEVISOR</button>
      <button class="btn" id="phone-btn">MÓVIL (ESPÍA)</button>
    </div>
  `

  document.getElementById('tv-btn').focus()
  document.getElementById('tv-btn').onclick    = () => renderTV(app)
  document.getElementById('phone-btn').onclick = () => renderEnterCode(app)
}
