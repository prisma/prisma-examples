import { UserResolvers } from '../generated/graphqlgen'
import { PostParent } from './Post'

export interface UserParent {
  id: string
  email: string
  name: string
  posts: PostParent[]
  createdAt: string
}

export const User: UserResolvers.Type = {
  id: parent => parent.id,
  email: parent => parent.email,
  name: parent => parent.name,
  posts: (parent, args, ctx) => ctx.db.user({ id: parent.id }).posts(),
  createdAt: parent => parent.createdAt,
}
