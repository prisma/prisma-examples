import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { Post } from './post'
import { User } from './user'
import { PrismaService } from './prisma.service'
import { PostCreateInput } from './resolvers.post'

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: true })
  email: string
}

@InputType()
class UserCreateInput {
  @Field()
  email: string

  @Field({ nullable: true })
  name: string

  @Field((type) => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput]
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts()
  }

  @Mutation((returns) => User)
  async signupUser(
    @Args('data') data: UserCreateInput,
    @Context() ctx,
  ): Promise<User> {
    const postData = data.posts?.map((post) => {
      return { title: post.title, content: post.content || undefined }
    })

    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        posts: {
          create: postData,
        },
      },
    })
  }

  @Query((returns) => [User], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany()
  }

  @Query((returns) => [Post], { nullable: true })
  async draftsByUser(
    @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
  ): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      })
  }
}
