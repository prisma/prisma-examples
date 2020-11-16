import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Root,
  Context,
  Int,
  InputType,
  Field,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { Post } from './post'
import { User } from './user'
import { PrismaService } from './prisma.service'

@InputType()
class PostIDInput {
  @Field((type) => Int)
  id: number
}

@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  author(@Root() post: Post): Promise<User | null> {
    return this.prismaService.post
      .findOne({
        where: {
          id: post.id,
        },
      })
      .author()
  }

  @Query((returns) => Post, { nullable: true })
  post(@Args('where') where: PostIDInput) {
    return this.prismaService.post.findOne({
      where: { id: where.id },
    })
  }

  @Query((returns) => [Post])
  filterPosts(@Args('searchString') searchString: string) {
    return this.prismaService.post.findMany({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    })
  }

  @Query((returns) => [Post])
  feed(@Context() ctx) {
    return this.prismaService.post.findMany({
      where: {
        published: true,
      },
    })
  }

  @Mutation((returns) => Post)
  createDraft(
    @Args('title') title: string,
    @Args('content', { nullable: true }) content: string,
    @Args('authorEmail') authorEmail: string,

    @Context() ctx,
  ): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  publish(@Args('id') id: number): Promise<Post | null> {
    return this.prismaService.post.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  deleteOnePost(
    @Args('where') where: PostIDInput,
    @Context() ctx,
  ): Promise<Post | null> {
    return this.prismaService.post.delete({
      where: {
        id: where.id,
      },
    })
  }
}
