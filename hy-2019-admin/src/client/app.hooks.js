import removeFieldFromData from '../hooks/removeFieldFromData'
import parsMongoDbQueries from '../hooks/parsMongoDbQueries'
import mapQuery from '../hooks/mapQuery'
import attachKind from '../hooks/attachKind'

export default {
  before: {
    all: [],
    find: [
      mapQuery(),
      parsMongoDbQueries()
    ],
    get: [],
    create: [
      removeFieldFromData('_id')
    ],
    update: [],
    patch: [
      attachKind()
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
