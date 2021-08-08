import { nonNull, stringArg, mutationField, queryField, nullable } from "nexus"

export const Mutation = mutationField(t => {
  t.field("signupUser", {
    type: "User",
    args: {
      name: stringArg(),
      email: nonNull(stringArg()),
    },
    resolve: (_, { name, email }, ctx) => {
      return ctx.db.user.create({
        data: {
          name,
          email,
        },
      })
    },
  })

  t.nullable.field("deletePost", {
    type: "Post",
    args: {
      postId: stringArg(),
    },
    resolve: (_, { postId }, ctx) => {
      return ctx.db.post.delete({
        where: { id: Number(postId) },
      })
    },
  })

  t.field("createDraft", {
    type: "Post",
    args: {
      title: nonNull(stringArg()),
      content: stringArg(),
      authorEmail: stringArg(),
    },
    resolve: (_, { title, content, authorEmail }, ctx) => {
      return ctx.db.post.create({
        data: {
          title,
          content,
          published: false,
          author: {
            connect: { email: authorEmail },
          },
        },
      })
    },
  })

  t.nullable.field("publish", {
    type: "Post",
    args: {
      postId: stringArg(),
    },
    resolve: (_, { postId }, ctx) => {
      return ctx.db.post.update({
        where: { id: Number(postId) },
        data: { published: true },
      })
    },
  })
})

export const Query = queryField(t => {
  t.field("post", {
    type: "Post",
    args: {
      postId: nonNull(stringArg()),
    },
    resolve: (_, args, ctx) => {
      return ctx.db.post.findUnique({
        where: { id: Number(args.postId) },
      })
    },
  })

  t.list.field("feed", {
    type: "Post",
    resolve: (_parent, _args, ctx) => {
      return ctx.db.post.findMany({
        where: { published: true },
      })
    },
  })

  t.list.field("drafts", {
    type: "Post",
    resolve: (_parent, _args, ctx) => {
      return ctx.db.post.findMany({
        where: { published: false },
      })
    },
  })

  t.list.field("filterPosts", {
    type: "Post",
    args: {
      searchString: nullable(stringArg()),
    },
    resolve: (_, { searchString }, ctx) => {
      return ctx.db.post.findMany({
        where: {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        },
      })
    },
  })
})
