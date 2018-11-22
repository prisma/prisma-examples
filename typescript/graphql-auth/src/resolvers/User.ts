export const User = {
  id: parent => parent.id,
  email: parent => parent.email,
  name: parent => parent.name,
  createdAt: parent => parent.createdAt,
  posts: (parent, args, ctx) => ctx.db.user({ id: parent.id }).posts(),
}
