/* eslint-disable no-unused-vars */
const queryString = require('query-string');
const axios = require('axios')

exports.Places = class Places {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const GOOGLE_API_KEY = this.app.get('GOOGLE_API_KEY');
    // console.log('params.query', params.query)

    const parameters = queryString.stringify({
      key: GOOGLE_API_KEY,
      location: `${params.query.latitude},${params.query.longitude}`,
      // radius: 100,
      rankby: 'distance',
      type: 'point_of_interest'
    });

    // const res = fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parameters}`)

    const res = await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parameters}`
    })
    // console.log('res.data', res.data)

    return res.data;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}
