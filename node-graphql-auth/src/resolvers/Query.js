const { getUserId } = require("../utils");

const Query = {
  me: (_, {}, context) => {
    return context.prisma.user({ id: getUserId(context) });
  }
};

module.exports = {
  Query
}