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

@InputType()
class SignupUserInput {
  @Field({ nullable: true })
  name: string

  @Field()
  email: string
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
    @Args('data') data: SignupUserInput,
    @Context() ctx,
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    })
  }

  @Query((returns) => User, { nullable: true })
  async user(@Args('id') id: number, @Context() ctx) {
    return this.prismaService.user.findUnique({
      where: { id: id },
    })
  }
}
