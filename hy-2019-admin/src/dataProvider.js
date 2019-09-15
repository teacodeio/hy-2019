import { restClient } from 'ra-data-feathers'
import feathersRestClient from './client/feathersRestClient'

const restClientOptions = {
  id: '_id', // If your database uses an id field other than 'id'. Optional.
  usePatch: true // Use PATCH instead of PUT for UPDATE requests. Optional.
  // my_resource: { // Options for individual resources can be set by adding an object with the same name. Optional.
  //   id: 'id' // If this specific table uses an id field other than 'id'. Optional.
  // }
}

const dataProvider = restClient(feathersRestClient, restClientOptions)

export default dataProvider
