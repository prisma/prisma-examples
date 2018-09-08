module.exports = {
        typeDefs: `type AggregateBro {
  count: Int!
}

type AggregateTodo {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Bro {
  id: ID!
  name: String!
}

type BroConnection {
  pageInfo: PageInfo!
  edges: [BroEdge]!
  aggregate: AggregateBro!
}

input BroCreateInput {
  name: String!
}

type BroEdge {
  node: Bro!
  cursor: String!
}

enum BroOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type BroPreviousValues {
  id: ID!
  name: String!
}

type BroSubscriptionPayload {
  mutation: MutationType!
  node: Bro
  updatedFields: [String!]
  previousValues: BroPreviousValues
}

input BroSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BroWhereInput
  AND: [BroSubscriptionWhereInput!]
  OR: [BroSubscriptionWhereInput!]
  NOT: [BroSubscriptionWhereInput!]
}

input BroUpdateInput {
  name: String
}

input BroWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [BroWhereInput!]
  OR: [BroWhereInput!]
  NOT: [BroWhereInput!]
}

input BroWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createTodo(data: TodoCreateInput!): Todo!
  updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
  updateManyTodos(data: TodoUpdateInput!, where: TodoWhereInput): BatchPayload!
  upsertTodo(where: TodoWhereUniqueInput!, create: TodoCreateInput!, update: TodoUpdateInput!): Todo!
  deleteTodo(where: TodoWhereUniqueInput!): Todo
  deleteManyTodos(where: TodoWhereInput): BatchPayload!
  createBro(data: BroCreateInput!): Bro!
  updateBro(data: BroUpdateInput!, where: BroWhereUniqueInput!): Bro
  updateManyBroes(data: BroUpdateInput!, where: BroWhereInput): BatchPayload!
  upsertBro(where: BroWhereUniqueInput!, create: BroCreateInput!, update: BroUpdateInput!): Bro!
  deleteBro(where: BroWhereUniqueInput!): Bro
  deleteManyBroes(where: BroWhereInput): BatchPayload!
}

enum MutationType {
  CREATE
  UPDATE
  DELETE
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  todo(where: TodoWhereUniqueInput!): Todo
  todos(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo]!
  todosConnection(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TodoConnection!
  bro(where: BroWhereUniqueInput!): Bro
  broes(where: BroWhereInput, orderBy: BroOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bro]!
  broesConnection(where: BroWhereInput, orderBy: BroOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BroConnection!
  node(id: ID!): Node
}

type Subscription {
  todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
  bro(where: BroSubscriptionWhereInput): BroSubscriptionPayload
}

type Todo {
  id: ID!
  title: String!
  createdAt: DateTime!
}

type TodoConnection {
  pageInfo: PageInfo!
  edges: [TodoEdge]!
  aggregate: AggregateTodo!
}

input TodoCreateInput {
  title: String!
}

type TodoEdge {
  node: Todo!
  cursor: String!
}

enum TodoOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  createdAt_ASC
  createdAt_DESC
}

type TodoPreviousValues {
  id: ID!
  title: String!
  createdAt: DateTime!
}

type TodoSubscriptionPayload {
  mutation: MutationType!
  node: Todo
  updatedFields: [String!]
  previousValues: TodoPreviousValues
}

input TodoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TodoWhereInput
  AND: [TodoSubscriptionWhereInput!]
  OR: [TodoSubscriptionWhereInput!]
  NOT: [TodoSubscriptionWhereInput!]
}

input TodoUpdateInput {
  title: String
}

input TodoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [TodoWhereInput!]
  OR: [TodoWhereInput!]
  NOT: [TodoWhereInput!]
}

input TodoWhereUniqueInput {
  id: ID
  title: String
}
`
      }
    