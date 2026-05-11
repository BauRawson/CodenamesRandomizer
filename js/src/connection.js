import Peer from 'peerjs'

const PREFIX = 'codigo-'

let peer = null
let conn = null
const handlers = new Map()

const emit = (event, ...args) => handlers.get(event)?.(...args)
export const on = (event, cb) => handlers.set(event, cb)

export const generateCode = () =>
  String(Math.floor(1000 + Math.random() * 9000))

export function hostRoom(code) {
  peer = new Peer(PREFIX + code)
  peer.on('open', () => emit('ready'))
  peer.on('connection', (c) => {
    conn = c
    conn.on('open', () => emit('connected'))
    conn.on('data', (data) => emit('message', data))
    conn.on('close', () => emit('disconnected'))
  })
  peer.on('error', (e) => emit('error', e))
}

export function joinRoom(code) {
  peer = new Peer()
  peer.on('open', () => {
    conn = peer.connect(PREFIX + code, { reliable: true })
    conn.on('open', () => emit('connected'))
    conn.on('data', (data) => emit('message', data))
    conn.on('close', () => emit('disconnected'))
    conn.on('error', (e) => emit('error', e))
  })
  peer.on('error', (e) => emit('error', e))
}

export const send = (data) => conn?.open && conn.send(data)
