import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
  buildSchemaFromTypeDefinitions,
} from 'graphql-tools'
import { graphql, GraphQLResolveInfo } from 'graphql'
import schema from './schema.graphql'

const getPostTest = {
  id: 'Get Post',
  query: `
    query {
      post(id: "some-random-id") {
        isPublished
      }
    }
  `,
  variables: {},
  context: {},
  expected: {
    data: {
      post: {
        isPublished: true,
      },
    },
  },
}

describe('Schema', () => {
  // Array of test cases
  const cases = [getPostTest]

  const mockSchema = makeExecutableSchema({ typeDefs: schema })

  const jsSchema = buildSchemaFromTypeDefinitions(schema)

  const mockMap = {
    Post: (root, args) => ({
      id: args.id,
      isPublished: true,
    }),
  }

  // Return payload of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: mockMap,
    preserveResolvers: true,
  })

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(jsSchema)

      await MockServer.query(`{ __schema { types { name } } }`)
    }).not.toThrow()
  })

  cases.forEach(obj => {
    const { id, query, variables, context: ctx, expected } = obj
    test(`query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables),
      ).resolves.toEqual(expected)
    })
  })
})
