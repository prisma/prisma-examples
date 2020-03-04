import "reflect-metadata";
import { Resolver, Query, Mutation, Arg, Args, Authorized, Ctx, FieldResolver, Root } from "type-graphql"
import { Post, PostCreateInput } from "./Post";
import { User } from "./User";
import { UserCreateInput } from "./UserCreateInput"
import { Context } from "./context";

@Resolver(Post)
export class PostResolvers {

  @Query(returns => Post)
  async post(@Arg("id") id: number, @Ctx() ctx: Context) {
    try {
      const post = await ctx.prisma.post.findOne({
        where:
          { id: id }
      });

      return post;
    }
    catch (error) {
      throw error;
    }
  }


  @Query(returns => [Post])
  async filterPosts(@Arg("searchQuery") searchQuery: string, @Ctx() ctx: Context
  ) {
    try {
      const posts = await ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery } },
            { content: { contains: searchQuery } },
          ]
        }
      });

      return posts;
    }
    catch (error) {
      throw error;
    }
  }

  @FieldResolver()
  async author(@Root() post: Post, @Ctx() ctx: Context): Promise<User> {
    return (await ctx.prisma.post.findOne({
      where: {
        id: post.id
      }
    }).author())!;
  }


  @Query(returns => [Post])
  async feed(@Ctx() ctx: Context) {
    try {
      const posts = await ctx.prisma.post.findMany({
        where: {
          published: true
        }
      });

      return posts;
    }
    catch (error) {
      throw error;
    }
  }


  @Mutation(returns => Post)
  async createDraft(
    @Arg("data") data: PostCreateInput, @Ctx() ctx: Context
  ): Promise<Post> {
    try {
      return await ctx.prisma.post.create({
        data: {
          title: data.title,
          content: data.content,
          author: {
            connect: { email: data.email }
          }
        }
      });
    }
    catch (error) {
      throw error;
    }
  }

  @Mutation(returns => Post)
  async publish(
    @Arg("id") id: number, @Ctx() ctx: Context
  ): Promise<Post> {
    try {
      return await ctx.prisma.post.update({
        where: {
          id: id
        },
        data: {
          published: true
        }
      });
    }
    catch (error) {
      throw error;
    }
  }

  @Mutation(returns => Post)
  async deleteOnePost(@Arg("id") id: number, @Ctx() ctx: Context): Promise<Post> {
    try {
      return await ctx.prisma.post.delete({
        where: {
          id: id
        }
      });
    }
    catch (error) {
      throw error;
    }
  }
}