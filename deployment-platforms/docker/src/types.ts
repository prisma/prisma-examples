import { Photon } from '@generated/photon'

export interface Context {
  photon: Photon
}

export interface PostType {
  id: string
  title: string
  content: string
  published: boolean
}

export interface UserType {
  id: string
  name: string
  email: string
  password: string
  posts: PostType[]
}
