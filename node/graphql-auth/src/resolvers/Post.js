const Post = {
  author: (parent, args, context) => context.db.post({ id: parent.id }).author(),
}

module.exports = {
  Post,
}
