import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema } from 'nexus'
import * as types from './types'
import * as path from 'path'

export const schema = makeSchema({
  types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: false,
    typegen: path.join(
      __dirname,
      '../node_modules/@types/typegen-nexus/index.d.ts',
    ),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
