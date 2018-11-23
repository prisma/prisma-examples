const Mutation = {
  createDraft: (parent, { title, content, authorEmail }, ctx) => {
    return ctx.db.createPost({
      title,
      content,
      author: { connect: { email: authorEmail } },
    })
  },

  deletePost: (parent, { id }, ctx) => ctx.db.deletePost({ id }),

  publish: (parent, { id }, ctx) => {
    return ctx.db.updatePost({
      where: { id },
      data: { published: true },
    })
  },
}

module.exports = {
  Mutation,
}
