import * as fs from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { weave } from '@gqloom/core'
import { asyncContextProvider } from '@gqloom/core/context'
import { PrismaWeaver } from '@gqloom/prisma'
import { ZodWeaver } from '@gqloom/zod'
import { lexicographicSortSchema, printSchema } from 'graphql'
import { GraphQLDateTime } from 'graphql-scalars'
import { createYoga } from 'graphql-yoga'
import { postResolver } from './resolvers/post'
import { userResolver } from './resolvers/user'

const schema = weave(
  ZodWeaver,
  PrismaWeaver.config({
    presetGraphQLType: (type) => {
      switch (type) {
        case 'DateTime':
          return GraphQLDateTime
      }
    },
  }),
  asyncContextProvider,
  userResolver,
  postResolver,
)
try {
  fs.writeFileSync(
    path.join(__dirname, '../schema.graphql'),
    printSchema(lexicographicSortSchema(schema)),
  )
  console.info('✅ GraphQL schema written to schema.graphql')
} catch (error) {
  console.error('⚠️  Failed to write schema file:', error)
  // Non-fatal: server can still run without the file
}

const yoga = createYoga({
  graphqlEndpoint: '/',
  schema,
})
const server = createServer(yoga)
const port = Number(process.env.PORT) || 4000
server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}`)
})
