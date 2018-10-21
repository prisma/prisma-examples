const Mutation = {
  createDraft: (parent, { title, content, authorEmail }, ctx, info) => {
    return ctx.binding.mutation.createPost(
      {
        data: {
          title,
          content,
          author: { connect: { email: authorEmail } },
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
