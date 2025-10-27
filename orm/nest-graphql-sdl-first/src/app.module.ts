import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { schema } from './schema'
import { context } from './context'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      schema,
      context: context,
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot()
  ],
})
export class AppModule { }
