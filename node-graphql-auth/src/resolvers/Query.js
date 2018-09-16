const { getUserId } = require('../utils')

const Query = {
  me: (parent, args, ctx) => {
    return ctx.db.user({ id: getUserId(ctx) })
  },
}

module.exports = {
  Query,
}
