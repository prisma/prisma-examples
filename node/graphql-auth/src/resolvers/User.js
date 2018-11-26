const User = {
  posts: (parent, args, context) => context.prisma.user({ id: parent.id }).posts(),
}

module.exports = {
  User,
}
