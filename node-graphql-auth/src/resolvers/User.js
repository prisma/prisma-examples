const User = {
  id: parent => parent.id,
  email: parent => parent.email,
  name: parent => parent.name,
  posts: (parent, args, ctx) => ctx.db.user({ id: parent.id }).posts(),
  createdAt: parent => parent.createdAt,
}

module.exports = {
  User,
}
