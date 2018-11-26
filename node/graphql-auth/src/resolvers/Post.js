const Post = {
  author: (parent, args, context) =>
    context.prisma.post({ id: parent.id }).author(),
}

module.exports = {
  Post,
}
