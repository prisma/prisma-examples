import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from './prisma.service'
import { PostResolver } from './resolvers.post'
import { UserResolver } from './resolvers.user'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, PostResolver],
})
export class AppModule {}
