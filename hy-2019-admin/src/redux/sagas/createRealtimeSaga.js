/* global localStorage */
import realtimeSaga from 'ra-realtime'

import feathersSocketClient, { socket } from '../../client/feathersSocketClient'

const LISTENER_TYPES = [
  'created',
  'patched',
  'updated',
  'removed'
]

const observeRequest = (dataProvider, options) => (type, resource, params) => {
  // Filtering so that only posts are updated in real time
  // if (resource !== 'posts') return

  const {
    storageKey,
    authenticate
  } = Object.assign({}, {
    storageKey: 'feathers-jwt',
    authenticate: {
      type: 'jwtAdmin'
    }
  }, options)

  return {
    subscribe (observer) {
      socket.emit('authenticate', {
        strategy: authenticate.type,
        accessToken: localStorage.getItem(storageKey)
      })

      function onChange () {
        dataProvider(type, resource, params)
          .then(results => observer.next(results)) // New data received, notify the observer
          .catch(error => observer.error(error)) // Ouch, an error occured, notify the observer
      }

      let listeners = LISTENER_TYPES.map(
        type => feathersSocketClient.service(resource).on(type, onChange)
      )

      return {
        unsubscribe () {
          if (listeners.length) {
            LISTENER_TYPES.forEach(
              type => feathersSocketClient.service(resource).removeListener(type, onChange)
            )
            listeners.length = 0
            // Notify the saga that we cleaned up everything
            observer.complete()
          }
        }
      }
    }
  }
}

export default dataProvider => realtimeSaga(observeRequest(dataProvider))
