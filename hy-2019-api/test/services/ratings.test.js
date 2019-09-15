const assert = require('assert');
const app = require('../../src/app');

describe('\'ratings\' service', () => {
  it('registered the service', () => {
    const service = app.service('ratings');

    assert.ok(service, 'Registered the service');
  });
});
