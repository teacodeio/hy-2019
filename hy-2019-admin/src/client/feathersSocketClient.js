import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import appHooks from './app.hooks'

const app = feathers()

const APIEndpoint = process.env.REACT_APP_API_URL

export const socket = io(APIEndpoint, {
  transports: ['websocket']
})

app.configure(socketio(socket))

app.hooks(appHooks)

export default app
