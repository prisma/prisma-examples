import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { schema } from './schema'
import { context } from './context'

@Module({
  imports: [
    GraphQLModule.forRoot({
      schema,
      context: context,
    }),
  ],
})
export class AppModule {}
