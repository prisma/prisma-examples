const Subscription = {
  posts: {
    subscribe: async (_, args, ctx, info) => {
      return await ctx.db.$subscribe.post({
        where: {
          mutation_in: ['CREATED', 'UPDATED']
        }
      }).node()
    },
    resolve: (payload) => {
      return payload;
    }
  },
}

module.exports = {
  Subscription,
}
