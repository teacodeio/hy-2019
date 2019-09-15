const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schema');

// ratings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const ratings = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true
    },
    loc: {
      type: mongoose.Schema.Types.Point,
      index: '2dsphere',
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    placeId: {
      type: String
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('ratings');
  } catch (e) {
    return mongooseClient.model('ratings', ratings);
  }
};
