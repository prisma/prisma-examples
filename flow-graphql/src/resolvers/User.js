import { UserResolvers } from '../generated/resolvers'
import { TypeMap } from './types/TypeMap'
import { PostParent } from './Post'

export interface UserParent {
  id: string;
  email: string;
  name: string;
  posts: PostParent[];
}

export const User: $PropertyType<UserResolvers<TypeMap>, 'Type'> = {
  id: parent => parent.id,
  email: parent => parent.email,
  name: parent => parent.name,
  posts: (parent, args, ctx) => ctx.db.user({ id: parent.id }).posts(),
}
