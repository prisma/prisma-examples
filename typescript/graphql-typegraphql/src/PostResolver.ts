import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Post } from './Post'
import { User } from './User'
import { Context } from './context'
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

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver()
  author(@Root() post: Post, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .author()
  }

  @Query((returns) => Post, { nullable: true })
  async postById(@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.findUnique({
      where: { id },
    })
  }

  @Query((returns) => [Post])
  async feed(
    @Arg('searchString', { nullable: true }) searchString: string,
    @Arg('skip', (type) => Int, { nullable: true }) skip: number,
    @Arg('take', (type) => Int, { nullable: true }) take: number,
    @Arg('orderBy', { nullable: true }) orderBy: PostOrderByUpdatedAtInput,
    @Ctx() ctx: Context,
  ) {
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {}

    return ctx.prisma.post.findMany({
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
  async createDraft(
    @Arg('data') data: PostCreateInput,
    @Arg('authorEmail') authorEmail: string,

    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async togglePublishPost(
    @Arg('id', (type) => Int) id: number,
    @Ctx() ctx: Context,
  ) {
    const post = await ctx.prisma.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    })

    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async incrementPostViewCount(
    @Arg('id', (type) => Int) id: number,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async deletePost(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
