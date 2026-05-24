const CLIENT_KEY  = 'codigo-client-id'
const SESSION_KEY = 'codigo-session'

export function getClientId() {
  let id = localStorage.getItem(CLIENT_KEY)
  if (!id) {
    id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    localStorage.setItem(CLIENT_KEY, id)
  }
  return id
}

export function saveSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...data, savedAt: Date.now() }))
}

export function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}
