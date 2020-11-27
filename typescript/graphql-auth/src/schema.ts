import { declarativeWrappingPlugin, makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as types from './types'
import { permissions } from './permissions'
import { applyMiddleware } from 'graphql-middleware'

export const schema = applyMiddleware(
  makeSchema({
    types,
    plugins: [nexusPrisma(), declarativeWrappingPlugin()],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
      sources: [
        {
          source: '@prisma/client',
          alias: 'client',
        },
        {
          source: require.resolve('./context'),
          alias: 'Context',
        },
      ],
      contextType: 'Context.Context',
    },
  }),
  permissions
)
