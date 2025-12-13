export interface User {
  id: number
  email: string
  name: string | null
}

export interface Post {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  content: string | null
  published: boolean
  viewCount: number
  author: User | null
  authorId: number | null
}

