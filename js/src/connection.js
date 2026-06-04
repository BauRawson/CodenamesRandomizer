/**
 * WebSocket relay transport.
 * Configure the relay server URL by setting window.CODIGO_WS_URL in index.html.
 * See server/index.js and the README for deployment instructions.
 */

const WS_URL = (typeof window !== 'undefined' && window.CODIGO_WS_URL) || ''

const handlers = new Map()
const emit = (event, ...args) => handlers.get(event)?.(...args)
export const on = (event, cb) => handlers.set(event, cb)

let ws    = null
let _role = null   // 'tv' | 'phone'

// TV side: virtual connection objects keyed by peerId, passed to event handlers
// so callers can do sendTo(conn, data) using the same conn reference.
const peerConns = new Map()   // peerId -> { id, open }

export const generateCode = () =>
  String(Math.floor(1000 + Math.random() * 9000))

function openWS(onOpen) {
  ws = new WebSocket(WS_URL)
  ws.addEventListener('open', onOpen)
  ws.addEventListener('error', () => emit('error', { type: 'network' }))
  ws.addEventListener('close', () => {
    if (_role === 'phone') emit('disconnected')
  })
  ws.addEventListener('message', (event) => {
    let msg
    try { msg = JSON.parse(event.data) } catch { return }
    handleMessage(msg)
  })
}

function handleMessage(msg) {
  switch (msg.type) {
    case 'ready':
      // TV successfully registered its room – nothing more to do here
      break

    case 'peer-joined': {
      // TV side: a new phone connected
      const conn = { id: msg.peerId, open: true }
      peerConns.set(msg.peerId, conn)
      emit('connected', conn)
      break
    }

    case 'from-peer': {
      // TV side: a phone sent a message
      const conn = peerConns.get(msg.peerId)
      if (conn) emit('message', msg.payload, conn)
      break
    }

    case 'peer-left': {
      // TV side: a phone disconnected
      const conn = peerConns.get(msg.peerId)
      if (conn) {
        conn.open = false
        peerConns.delete(msg.peerId)
        emit('peer-left', conn)
      }
      break
    }

    case 'joined':
      // Phone side: successfully joined room
      emit('connected')
      break

    case 'from-host':
      // Phone side: TV sent a message
      emit('message', msg.payload)
      break

    case 'host-left':
      // Phone side: TV disconnected
      emit('disconnected')
      break

    case 'error':
      emit('error', { type: msg.error })
      break
  }
}

export function hostRoom(code) {
  _role = 'tv'
  openWS(() => ws.send(JSON.stringify({ type: 'host', code })))
}

export function joinRoom(code) {
  _role = 'phone'
  openWS(() => ws.send(JSON.stringify({ type: 'join', code })))
}

export const send = (data) => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'to-host', payload: data }))
  }
}

export const sendTo = (conn, data) => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'to-peer', peerId: conn.id, payload: data }))
  }
}

export const broadcast = (data) => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'broadcast', payload: data }))
  }
}

export const isConnected = () => ws?.readyState === WebSocket.OPEN && _role === 'phone'

export function disconnect() {
  if (ws) { ws.close(); ws = null }
  _role = null
  peerConns.clear()
  handlers.clear()
}
