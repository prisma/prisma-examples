const { getUserId } = require("../utils");

const Query = {
  me: (_, {}, ctx) => {
    return ctx.db.user({ id: getUserId(ctx) });
  }
};

module.exports = {
  Query
}