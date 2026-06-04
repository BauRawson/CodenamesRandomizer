/**
 * Código Secreto – WebSocket relay server
 *
 * Deployment (Render.com free tier):
 *   1. Create a new "Web Service" on https://render.com
 *   2. Connect this repo, set Root Directory to "server"
 *   3. Build Command: npm install
 *   4. Start Command: npm start
 *   5. Copy the deployed wss:// URL into index.html (see CONFIGURATION below)
 *
 * Rooms: each room is identified by the 4-digit code shown on the TV.
 * The TV connects first as 'host'; phones connect as 'peers'.
 * All messages between TV and phones are relayed through this server.
 */

const { WebSocketServer, WebSocket } = require('ws')
const { randomUUID } = require('crypto')

const PORT = process.env.PORT || 8080

// rooms: code -> { tvWs: WebSocket | null, peers: Map<peerId, WebSocket> }
const rooms = new Map()

const wss = new WebSocketServer({ port: PORT })

wss.on('connection', (ws) => {
  ws.peerId   = randomUUID()
  ws.roomCode = null
  ws.role     = null   // 'tv' | 'phone'

  function safeSend(socket, data) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
    }
  }

  ws.on('message', (raw) => {
    let msg
    try { msg = JSON.parse(String(raw)) } catch { return }

    if (msg.type === 'host') {
      // TV registers a room
      const code = String(msg.code)
      if (!rooms.has(code)) {
        rooms.set(code, { tvWs: ws, peers: new Map() })
      } else {
        rooms.get(code).tvWs = ws
      }
      ws.roomCode = code
      ws.role     = 'tv'
      safeSend(ws, { type: 'ready' })

    } else if (msg.type === 'join') {
      // Phone joins a room
      const code = String(msg.code)
      const room = rooms.get(code)
      if (!room || !room.tvWs || room.tvWs.readyState !== WebSocket.OPEN) {
        safeSend(ws, { type: 'error', error: 'peer-unavailable' })
        return
      }
      room.peers.set(ws.peerId, ws)
      ws.roomCode = code
      ws.role     = 'phone'
      // Tell TV a new peer has arrived
      safeSend(room.tvWs, { type: 'peer-joined', peerId: ws.peerId })
      // Confirm to phone
      safeSend(ws, { type: 'joined' })

    } else if (msg.type === 'to-host') {
      // Phone -> TV
      const room = rooms.get(ws.roomCode)
      if (!room) return
      safeSend(room.tvWs, { type: 'from-peer', peerId: ws.peerId, payload: msg.payload })

    } else if (msg.type === 'to-peer') {
      // TV -> specific phone
      const room = rooms.get(ws.roomCode)
      if (!room) return
      const peerWs = room.peers.get(msg.peerId)
      safeSend(peerWs, { type: 'from-host', payload: msg.payload })

    } else if (msg.type === 'broadcast') {
      // TV -> all phones
      const room = rooms.get(ws.roomCode)
      if (!room) return
      for (const peerWs of room.peers.values()) {
        safeSend(peerWs, { type: 'from-host', payload: msg.payload })
      }
    }
  })

  ws.on('close', () => {
    const room = rooms.get(ws.roomCode)
    if (!room) return

    if (ws.role === 'tv') {
      room.tvWs = null
      // Notify all phones that the host left
      for (const peerWs of room.peers.values()) {
        safeSend(peerWs, { type: 'host-left' })
      }
      if (room.peers.size === 0) rooms.delete(ws.roomCode)

    } else if (ws.role === 'phone') {
      room.peers.delete(ws.peerId)
      // Notify TV that this peer left
      safeSend(room.tvWs, { type: 'peer-left', peerId: ws.peerId })
      if (!room.tvWs && room.peers.size === 0) rooms.delete(ws.roomCode)
    }
  })

  ws.on('error', (err) => {
    console.error(`[ws] ${ws.role ?? 'unknown'} error:`, err.message)
  })
})

console.log(`Código relay server running on port ${PORT}`)
