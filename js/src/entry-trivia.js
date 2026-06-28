import './style.css'
import { renderTriviaTV } from './trivia-tv.js'
import { renderTriviaPhone } from './trivia-phone.js'
import { disconnect } from './connection.js'
import { clearSession } from './session.js'

const app = document.getElementById('app')

disconnect()
clearSession()

const params = new URLSearchParams(location.search)
const mode = params.get('mode')

function goMenu() {
  // Reload to the game selector within trivia context
  location.reload()
}

if (mode === 'tv' || (!mode && window.innerWidth >= 768 && window.matchMedia('(orientation: landscape)').matches)) {
  renderTriviaTV(app, goMenu)
} else {
  renderTriviaPhone(app, goMenu)
}
