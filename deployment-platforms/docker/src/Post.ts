import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql'
import { PostType, Context } from './types'

export const Post = new GraphQLObjectType<PostType, Context>({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLID,
      resolve: post => post.id,
    },
    published: {
      type: GraphQLBoolean,
      resolve: post => post.published,
    },
    title: {
      type: GraphQLString,
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
  },
})
