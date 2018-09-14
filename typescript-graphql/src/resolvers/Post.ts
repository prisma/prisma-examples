import { PostResolvers } from '../generated/resolvers'
import { TypeMap } from '../types/TypeMap'

export interface PostParent {
  id: string
  isPublished: boolean
  title: string
  content: string
}

export const Post: PostResolvers.Type<TypeMap> = {
  id: parent => parent.id,
  isPublished: parent => parent.isPublished,
  title: parent => parent.title,
  content: parent => parent.content,
}
