import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, interfaceType, unionType, stringArg } from 'nexus'
import { Photo, PhotoClient } from '@prisma/photon'

const User = interfaceType({
  name: 'User',
  definition(t) {
    t.resolveType((user) => {
      if (user.hasOwnProperty('articles')) {
        return 'Author'
      }
      return 'Photographer'
    })
    t.model.id()
    t.model.name()
    t.model.email()
  },
})

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.implements(User)
    t.model('User').articles({
      pagination: false,
    })
  }
})

const Photographer = objectType({
  name: 'Photographer',
  definition(t) {
    t.implements(User)
    t.model('User').photos()
  }
})

const Article = objectType({
  name: 'Article',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.content()
    t.model.published()
    t.model.author({
      type: 'Author'
    })
  },
})

const Photo = objectType({
  name: 'Photo',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.description()
    t.model.photographer({
      type: 'Photographer'
    })
  },
})

const Post = unionType({
  name: 'Post',
  definition(t) {
    t.members('Article', 'Photo')
    t.resolveType((item) => {
      // Only Articles have content,
      // Photos only have descriptions.
      return item.hasOwnProperty('content') ? 'Article' : 'Photo';
    })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.article({
      alias: 'article',
    })

    t.crud.photo({
      alias: 'photo',
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: async (_parent, _args, ctx) => {
        const [articles, photos] = await Promise.all([
          ctx.photon.articles.findMany({
            where: { published: true },
          }),
          ctx.photon.photos.findMany({})
        ])
        return [...articles, ...photos].sort((a, b) => {
          return a.createdAt.getTime() - b.createdAt.getTime();
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: async (_, { searchString }, ctx) => {
        const [articles, photos] = await Promise.all([
          ctx.photon.articles.findMany({
            where: {
              OR: [
                { title: { contains: searchString } },
                { content: { contains: searchString } },
              ],
            },
          }),
          ctx.photon.photos.findMany({
            where: { description: { contains: searchString } },
          }),
        ])
        return [...articles, ...photos].sort((a, b) => {
          return a.createdAt.getTime() - b.createdAt.getTime();
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({
      alias: 'signupUser',
      type: 'Author',
    })
    t.crud.createOneUser({
      alias: 'signupUser',
      type: 'Photographer',
    })
    t.crud.deleteOneArticle()
    t.crud.deleteOnePhoto()

    t.field('uploadPhoto', {
      type: 'Photo',
      args: {
        description: stringArg({ nullable: false }),
        photographerEmail: stringArg(),
      },
      resolve: (_, { description, photographerEmail }, ctx) => {
        return ctx.photon.photos.create({
          data: {
            description,
            photographer: {
              connect: { email: photographerEmail },
            },
          },
        })
      },
    })

    t.field('createDraft', {
      type: 'Article',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.photon.articles.create({
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
      type: 'Article',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.photon.articles.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Post, Article, Photo, User, Author, Photographer],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
