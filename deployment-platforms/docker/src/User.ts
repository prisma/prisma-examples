import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql'

import { Post } from './Post'
import { UserType, PostType, Context } from './types'

export const User = new GraphQLObjectType<UserType, Context>({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID,
      resolve: user => user.id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    password: {
      type: GraphQLString,
      resolve: user => user.password,
    },
    posts: {
      type: GraphQLList(Post),
      resolve: (user, args, context) => {
        return context.photon.posts.findMany({
          where: {
            author: {
              id: user.id,
            },
          },
        })
      },
    },
  },
})
