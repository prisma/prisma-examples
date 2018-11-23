const Post = {
  id: parent => parent.id,
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  published: parent => parent.published,
  title: parent => parent.title,
  content: parent => parent.content,
  author: (parent, args, ctx) => ctx.db.post({ id: parent.id }).author(),
}

module.exports = {
  Post,
}
