import './style.css'
import { renderTV } from './tv.js'
import { renderEnterCode } from './phone.js'
import { renderMapa } from './mapa.js'
import { disconnect } from './connection.js'
import { clearSession } from './session.js'

const app = document.getElementById('app')

disconnect()
clearSession()

const params = new URLSearchParams(location.search)
const mode = params.get('mode')

if (mode === 'mapa') {
  renderMapa(app, () => { location.href = location.pathname })
} else if (mode === 'tv' || (!mode && window.innerWidth >= 768 && window.matchMedia('(orientation: landscape)').matches)) {
  renderTV(app)
} else {
  renderEnterCode(app)
}
