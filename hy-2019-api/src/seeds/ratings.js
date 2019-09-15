const mongoose = require('mongoose');

module.exports = async (app, user) => {
  try {
    const requiredRatings = 2000;

    const Rating = app.service('ratings');
    const ratings = await Rating.find();
    if (ratings.total < requiredRatings) {
      const createUsers = requiredRatings - ratings.total;

      const promises = Array.from({length: createUsers}).map(() => {
        return Rating.create({
          user,
          placeId: mongoose.Types.ObjectId(),
          loc: {
            type: 'Point',
            coordinates: [
              20.8061 - 0.5 + (Math.random() * 1),
              52.0936 - 0.5 + (Math.random() * 1)
            ],
          },
          weight: Math.round(Math.random() * 3)
        });
      });

      return Promise.all(promises);
    }
  } catch (e) {
    console.log(e);
  }
};
