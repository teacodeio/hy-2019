// Initializes the `places` service on path `/places`
const { Places } = require('./places.class');
const hooks = require('./places.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  const _service = new Places(options, app)

  _service.setup = function (app) {
    this.app = app
  }

  // Initialize our service with any options it requires
  app.use('/places', _service);

  // Get our initialized service so that we can register hooks
  const service = app.service('places');

  service.hooks(hooks);
};
