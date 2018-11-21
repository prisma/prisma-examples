const Post = {
  author: (parent, args, ctx) => ctx.db.post({ id: parent.id }).author(),
}

module.exports = {
  Post,
}
