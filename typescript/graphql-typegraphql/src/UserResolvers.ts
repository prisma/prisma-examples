import "reflect-metadata";
import { Resolver, Query, Mutation, Arg, Args, Authorized, Ctx, FieldResolver, Root } from "type-graphql"
import { Post, PostCreateInput } from "./Post";
import { User, UserCreateInput } from "./User";
import { Context } from "./context";

@Resolver(User)
export class UserResolvers {

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[]> {
    return (await ctx.prisma.user.findOne({
      where: {
        id: user.id
      }
    }).post())!
  }

  @Mutation(returns => User)
  async signupUser(@Arg("data") data: UserCreateInput, @Ctx() ctx: Context): Promise<User> {
    try {
      return await ctx.prisma.user.create({
        data: {
          email: data.email,
          name: data.name
        }
      });
    }
    catch (error) {
      throw error;
    }
  }

  @Query(returns => User)
  async user(@Arg("id") id: number, @Ctx() ctx: Context) {
    try {
      const user = await ctx.prisma.user.findOne({
        where:
          { id: id }
      });

      return user;
    }
    catch (error) {
      throw error;
    }
  }

}