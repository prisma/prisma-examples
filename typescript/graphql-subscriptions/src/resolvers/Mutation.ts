export const Mutation = {
  createDraft: (parent, { title, content, authorEmail }, ctx) => {
    return ctx.prisma.createPost({
      title,
      content,
      author: { connect: { email: authorEmail } },
    })
  },
  deletePost: (parent, { id }, ctx) => ctx.prisma.deletePost({ id }),
  publish: (parent, { id }, ctx) => {
    return ctx.prisma.updatePost({
      where: { id },
      data: { isPublished: true },
    })
  },
}
