import { idArg, makeSchema, objectType, stringArg } from 'nexus'
import { graphql } from 'graphql'
import { Photon } from '@prisma/photon'

const photon = new Photon()

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('email')
    t.list.field('posts', {
      type: 'Post',
      resolve: parent => photon.users.findOne({
        where: { id: parent.id }
      }).posts()
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id')
    t.string('createdAt')
    t.string('updatedAt')
    t.string('title')
    t.string('content', {
      nullable: true
    })
    t.boolean('published')
    t.field('author', {
      type: 'User',
      nullable: true,
      resolve: parent => photon.posts.findOne({
        where: { id: parent.id }
      }).author()
    })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: {
        postId: idArg({ nullable: false })
      },
      resolve: (_, args) => {
        console.log(`resolve post`, args)
        return photon.posts.findOne({
          where: { id: args.postId }
        })
      }
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (_parent, _args, ctx) => {
        return photon.posts.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('drafts', {
      type: 'Post',
      resolve: (_parent, _args, ctx) => {
        return photon.posts.findMany({
          where: { published: false },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return photon.posts.findMany({
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
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
      },
      resolve: (_, { name, email }, ctx) => {
        return photon.users.create({
          data: {
            name,
            email,
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: {
        postId: idArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return photon.posts.delete({
          where: { id: postId },
        })
      },
    })


    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return photon.posts.create({
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
        postId: idArg(),
      },
      resolve: (_, { postId }, ctx) => {
        return photon.posts.update({
          where: { id: postId },
          data: { published: true },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Post, User],
})

export default async (req, res) => {
  const query = req.body.query
  const variables = req.body.variables
console.log(`serve graphql`, query, variables)
  const response = await graphql(schema, query, {}, {}, variables)

  return res.end(JSON.stringify(response))
}
