export const Subscription = {
  posts: {
    subscribe: async (parent, args, ctx) => {
      return ctx.prisma.$subscribe
        .post({
          where: {
            mutation_in: ['CREATED', 'UPDATED'],
          },
        })
        .node()
    },
    resolve: payload => {
      return payload
    },
  },
}
