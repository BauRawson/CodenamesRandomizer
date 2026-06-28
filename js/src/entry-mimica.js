import './style.css'
import { renderCharadesTV } from './charades-tv.js'
import { renderCharadesPhone } from './charades-phone.js'
import { disconnect } from './connection.js'
import { clearSession } from './session.js'

const app = document.getElementById('app')

disconnect()
clearSession()

const params = new URLSearchParams(location.search)
const mode = params.get('mode')

function goMenu() {
  location.reload()
}

if (mode === 'tv' || (!mode && window.innerWidth >= 768 && window.matchMedia('(orientation: landscape)').matches)) {
  renderCharadesTV(app, goMenu)
} else {
  renderCharadesPhone(app, goMenu)
}
