const Post = {
  author: (parent, args, ctx) => ctx.db.post({ id: parent.id }).author().$fragment('{ id email name createdAt }'),
}

module.exports = {
  Post,
}
