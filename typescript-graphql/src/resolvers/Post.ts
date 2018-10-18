import { PostResolvers } from '../generated/graphqlgen'

export interface PostParent {
  id: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
  title: string
  content: string
}

export const Post: PostResolvers.Type = {
  id: parent => parent.id,
  createdAt: parent => parent.createdAt,
  updatedAt: parent => parent.updatedAt,
  isPublished: parent => parent.isPublished,
  title: parent => parent.title,
  content: parent => parent.content,
  author: (parent, _args, ctx) => ctx.db.post({ id: parent.id }).author(),
}
