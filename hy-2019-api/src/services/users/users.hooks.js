const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const updateLevel = require('./update-level');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'), updateLevel ],
    patch: [ hashPassword('password'), updateLevel ],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
};
