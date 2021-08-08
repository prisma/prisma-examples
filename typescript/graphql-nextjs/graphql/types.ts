import { objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id")
    t.string("name")
    t.string("email")
    t.list.field("posts", {
      type: "Post",
      resolve(parent, _, ctx) {
        return ctx.db.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .posts()
      },
    })
  },
})

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id")
    t.string("title")
    t.nullable.string("content")
    t.boolean("published")
    t.nullable.field("author", {
      type: "User",
      resolve(parent, _, ctx) {
        return ctx.db.post
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .author()
      },
    })
  },
})
