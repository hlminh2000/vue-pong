import io from 'socket.io-client'
// import store from '../store/store.js'

const socket = io('http://localhost:3000')

const listeners = [
]

listeners.forEach((listener) => {
  socket.on(listener.type, listener.callback)
})

export default socket
