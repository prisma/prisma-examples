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
  registerEnumType,
} from '@nestjs/graphql'
import { Inject } from '@nestjs/common'
import { Post } from './post'
import { User } from './user'
import { PrismaService } from './prisma.service'

@InputType()
export class PostCreateInput {
  @Field()
  title: string

  @Field({ nullable: true })
  content: string
}

@InputType()
class PostOrderByUpdatedAtInput {
  @Field((type) => SortOrder)
  updatedAt: SortOrder
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
})
@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  author(@Root() post: Post): Promise<User | null> {
    return this.prismaService.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .author()
  }

  @Query((returns) => Post, { nullable: true })
  postById(@Args('id') id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
    })
  }

  @Query((returns) => [Post])
  feed(
    @Args('searchString', { nullable: true }) searchString: string,
    @Args('skip', { nullable: true }) skip: number,
    @Args('take', { nullable: true }) take: number,
    @Args('orderBy', { nullable: true }) orderBy: PostOrderByUpdatedAtInput,
    @Context() ctx,
  ) {
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {}

    return this.prismaService.post.findMany({
      where: {
        published: true,
        ...or,
      },
      take: take || undefined,
      skip: skip || undefined,
      orderBy: orderBy || undefined,
    })
  }

  @Mutation((returns) => Post)
  createDraft(
    @Args('data') data: PostCreateInput,
    @Args('authorEmail') authorEmail: string,
    @Context() ctx,
  ): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }

  @Mutation((returns) => Post)
  incrementPostViewCount(@Args('id') id: number): Promise<Post> {
    return this.prismaService.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async togglePublishPost(@Args('id') id: number): Promise<Post | null> {
    const post = await this.prismaService.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    })

    return this.prismaService.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async deletePost(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<Post | null> {
    return this.prismaService.post.delete({
      where: {
        id: id,
      },
    })
  }
}
