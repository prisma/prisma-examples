import "reflect-metadata";
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
} from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";
import { Context } from "./context";

@InputType()
class PostIDInput {
  @Field((type) => Int)
  id: number;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver()
  author(@Root() post: Post, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.post
      .findOne({
        where: {
          id: post.id,
        },
      })
      .author();
  }

  @Query((returns) => Post, { nullable: true })
  post(@Arg("where") where: PostIDInput, @Ctx() ctx: Context) {
    return ctx.prisma.post.findOne({
      where: { id: where.id },
    });
  }

  @Query((returns) => [Post])
  filterPosts(@Arg("searchString") searchString: string, @Ctx() ctx: Context) {
    return ctx.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    });
  }

  @Query((returns) => [Post])
  feed(@Ctx() ctx: Context) {
    return ctx.prisma.post.findMany({
      where: {
        published: true,
      },
    });
  }

  @Mutation((returns) => Post)
  createDraft(
    @Arg("title") title: string,
    @Arg("content", { nullable: true }) content: string,
    @Arg("authorEmail") authorEmail: string,

    @Ctx() ctx: Context
  ): Promise<Post> {
    return ctx.prisma.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  }

  @Mutation((returns) => Post, { nullable: true })
  publish(
    @Arg("id", (type) => Int) id: number,
    @Ctx() ctx: Context
  ): Promise<Post | null> {
    return ctx.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    });
  }

  @Mutation((returns) => Post, { nullable: true })
  deleteOnePost(
    @Arg("where") where: PostIDInput,
    @Ctx() ctx: Context
  ): Promise<Post | null> {
    return ctx.prisma.post.delete({
      where: {
        id: where.id,
      },
    });
  }
}
