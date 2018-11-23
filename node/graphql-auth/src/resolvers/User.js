const User = {
  posts: (parent, args, context) => context.db.user({ id: parent.id }).posts(),
}

module.exports = {
  User,
}
