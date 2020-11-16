import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Post } from './post'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null
}
