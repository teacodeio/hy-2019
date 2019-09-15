module.exports = () => (context) => {
  const {
    user
  } = context.data;

  context.app.service('users').patch(user, {
    $inc: {
      totalPoints: 1,
      spentPoints: 1
    }
  })
}
