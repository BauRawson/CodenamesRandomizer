import Peer from 'peerjs'

const PREFIX = 'codigo-'

let peer = null
let conn = null          // phone side: single outgoing connection
let connections = []     // TV side: all incoming connections
const handlers = new Map()

const emit = (event, ...args) => handlers.get(event)?.(...args)
export const on = (event, cb) => handlers.set(event, cb)

export const generateCode = () =>
  String(Math.floor(1000 + Math.random() * 9000))

export function hostRoom(code) {
  peer = new Peer(PREFIX + code)
  peer.on('open', () => emit('ready'))
  peer.on('connection', (c) => {
    connections.push(c)
    c.on('open',  ()     => emit('connected', c))
    c.on('data',  (data) => emit('message', data, c))
    c.on('close', ()     => {
      connections = connections.filter(x => x !== c)
      emit('peer-left', c)
    })
  })
  peer.on('error', (e) => emit('error', e))
}

export function joinRoom(code) {
  peer = new Peer()
  peer.on('open', () => {
    conn = peer.connect(PREFIX + code, { reliable: true })
    conn.on('open',  ()     => emit('connected'))
    conn.on('data',  (data) => emit('message', data))
    conn.on('close', ()     => emit('disconnected'))
    conn.on('error', (e)    => emit('error', e))
  })
  peer.on('error', (e) => emit('error', e))
}

export const send       = (data)    => conn?.open && conn.send(data)
export const sendTo     = (c, data) => c?.open && c.send(data)
export const broadcast  = (data)    => connections.filter(c => c.open).forEach(c => c.send(data))
export const isConnected = ()       => !!conn?.open

export function disconnect() {
  if (peer) { peer.destroy(); peer = null }
  conn = null
  connections = []
  handlers.clear()
}
