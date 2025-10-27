import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from './prisma.service'
import { PostResolver } from './resolvers.post'
import { UserResolver } from './resolvers.user'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, PostResolver],
})
export class AppModule { }
