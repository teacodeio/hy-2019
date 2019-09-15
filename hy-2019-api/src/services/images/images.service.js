// Initializes the `images` service on path `/images`
const createService = require('feathers-mongoose');
const createModel = require('../../models/images.model');
const hooks = require('./images.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/images', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('images');

  service.hooks(hooks);
};
