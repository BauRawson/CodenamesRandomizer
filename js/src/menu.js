import { renderTV } from './tv.js'
import { renderEnterCode } from './phone.js'

export function renderMenu(app) {
  app.innerHTML = `
    <div class="scene">
      <h1 class="title">CODIGO</h1>
      <button class="btn" id="tv-btn">TV</button>
      <button class="btn" id="phone-btn">PHONE (SPYMASTER)</button>
    </div>
  `

  document.getElementById('tv-btn').onclick    = () => renderTV(app)
  document.getElementById('phone-btn').onclick = () => renderEnterCode(app)
}
