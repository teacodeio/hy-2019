const {ranks} = require('../../enums');

module.exports = async (context) => {
  const user = await context.app.service('users').get(context.id)

  if (user.totalPoints) {
    // context.data.level = Math.floor(Math.pow(user.totalPoints / 3, 2/3)) + 1;
    //
    // let rankId = Math.floor(context.data.level / 5);
    // if (rankId >= ranks.length) {
    //   rankId = ranks.length - 1;
    // }

    const rankId =  Math.floor(user.totalPoints / 10)

    context.data.rank = ranks[rankId];
  }
};
