import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { schema } from './schema'
import { createContext } from './context'

@Module({
  imports: [
    GraphQLModule.forRoot({
      schema,
      context: createContext,
    }),
  ],
})
export class AppModule {}
