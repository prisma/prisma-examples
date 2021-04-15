import 'reflect-metadata'
import { ObjectType, Field, ID, Int } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date

  @Field()
  title: string

  @Field((type) => String, { nullable: true })
  content: string | null

  @Field((type) => Boolean, { nullable: true })
  published?: boolean | null

  @Field((type) => Int)
  viewCount: number

  @Field((type) => User, { nullable: true })
  author?: User | null
}
