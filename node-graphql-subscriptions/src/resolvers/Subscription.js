const Subscription = {
  publications: {
    subscribe: async (_, args, ctx, info) => {
      return await ctx.db.$subscribe.post({
        where: {
          mutation_in: ['CREATED', 'UPDATED']
        }
      }).node()
    },
  },
}

module.exports = {
  Subscription,
}
