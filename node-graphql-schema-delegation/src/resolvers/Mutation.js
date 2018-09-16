const Mutation = {
  createDraft: (parent, args, ctx, info) => {
    return ctx.binding.mutation.createPost(
      {
        data: {
          title: args.title,
          content: args.content,
          author: { connect: { email: args.authorEmail } },
        },
      },
      info,
    )
  },

  deletePost: (parent, { id }, ctx, info) => {
    return ctx.binding.mutation.deletePost(
      {
        where: {
          id,
        },
      },
      info,
    )
  },

  publish: (parent, { id }, ctx, info) => {
    return ctx.binding.mutation.updatePost(
      {
        where: {
          id,
        },
        data: { isPublished: true },
      },
      info,
    )
  },
}

module.exports = {
  Mutation,
}
