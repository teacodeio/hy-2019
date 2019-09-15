/* global process */

import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'

import appHooks from './app.hooks'

const app = feathers()

const APIEndpoint = process.env.REACT_APP_API_URL

const restClient = rest(APIEndpoint)

app.configure(restClient.fetch(window.fetch))

app.configure(auth({
  jwtStrategy: 'jwt',
  storage: window.localStorage,
  header: 'authorization'
}))

app.hooks(appHooks)

export default app
