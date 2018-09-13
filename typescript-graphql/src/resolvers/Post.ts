import { IPost } from '../generated/resolvers'
import { TypeMap } from '../types/TypeMap'

export interface PostRoot {
  id: string
  isPublished: boolean
  title: string
  content: string
}

export const Post: IPost.Resolver<TypeMap> = {
  id: root => root.id,
  isPublished: root => root.isPublished,
  title: root => root.title,
  content: root => root.content,
}
