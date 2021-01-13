import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { User as UserModel, Post as PostModel } from '@prisma/client'

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.findUnique({ where: { id: Number(id) } })
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.prismaService.post.findMany({
      where: { published: true },
    })
  }

  @Get('filterPosts')
  async getFilteredPosts(
    @Query('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.prismaService.post.findMany({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData
    return this.prismaService.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.prismaService.user.create({
      data: userData,
    })
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.update({
      where: { id: Number(id) },
      data: { published: true },
    })
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.prismaService.post.delete({ where: { id: Number(id) } })
  }
}
