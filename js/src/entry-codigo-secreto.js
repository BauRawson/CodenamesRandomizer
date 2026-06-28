import './style.css'
import { renderTV } from './tv.js'
import { renderEnterCode } from './phone.js'
import { disconnect } from './connection.js'
import { clearSession } from './session.js'

const app = document.getElementById('app')

disconnect()
clearSession()

// Detect TV vs phone by screen width
// TV opens in portrait > 768px or with ?mode=tv
const params = new URLSearchParams(location.search)
const mode = params.get('mode')

if (mode === 'tv' || (!mode && window.innerWidth >= 768 && window.matchMedia('(orientation: landscape)').matches)) {
  renderTV(app)
} else {
  renderEnterCode(app)
}
