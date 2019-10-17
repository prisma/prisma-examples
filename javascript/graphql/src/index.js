const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, objectType, idArg, stringArg } = require('nexus')
const { Photon } = require('@generated/photon')
const { nexusPrismaPlugin } = require('nexus-prisma')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({
      pagination: false,
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.content()
    t.model.published()
    t.model.author()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.post({
      alias: 'post',
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (_, _args, ctx) => {
        return ctx.photon.posts.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.posts.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.deleteOnePost()

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.photon.posts.create({
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

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

const photon = new Photon()

new GraphQLServer({
  schema: makeSchema({
    types: [Query, Mutation, Post, User],
    plugins: [nexusPrismaPlugin()],
  }),
  context: { photon },
}).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
  ),
)

module.exports = { User, Post }
