module.exports = {
        typeDefs: /* GraphQL */ `type AggregateHouse {
  count: Int!
}

type AggregateWindow {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type House {
  id: ID!
  windows(where: WindowWhereInput, orderBy: WindowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Window!]
  name: String!
}

type HouseConnection {
  pageInfo: PageInfo!
  edges: [HouseEdge]!
  aggregate: AggregateHouse!
}

input HouseCreateInput {
  windows: WindowCreateManyInput
  name: String!
}

type HouseEdge {
  node: House!
  cursor: String!
}

enum HouseOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type HousePreviousValues {
  id: ID!
  name: String!
}

type HouseSubscriptionPayload {
  mutation: MutationType!
  node: House
  updatedFields: [String!]
  previousValues: HousePreviousValues
}

input HouseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HouseWhereInput
  AND: [HouseSubscriptionWhereInput!]
  OR: [HouseSubscriptionWhereInput!]
  NOT: [HouseSubscriptionWhereInput!]
}

input HouseUpdateInput {
  windows: WindowUpdateManyInput
  name: String
}

input HouseWhereInput {
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
  windows_every: WindowWhereInput
  windows_some: WindowWhereInput
  windows_none: WindowWhereInput
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
  AND: [HouseWhereInput!]
  OR: [HouseWhereInput!]
  NOT: [HouseWhereInput!]
}

input HouseWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createHouse(data: HouseCreateInput!): House!
  updateHouse(data: HouseUpdateInput!, where: HouseWhereUniqueInput!): House
  updateManyHouses(data: HouseUpdateInput!, where: HouseWhereInput): BatchPayload!
  upsertHouse(where: HouseWhereUniqueInput!, create: HouseCreateInput!, update: HouseUpdateInput!): House!
  deleteHouse(where: HouseWhereUniqueInput!): House
  deleteManyHouses(where: HouseWhereInput): BatchPayload!
  createWindow(data: WindowCreateInput!): Window!
  updateWindow(data: WindowUpdateInput!, where: WindowWhereUniqueInput!): Window
  updateManyWindows(data: WindowUpdateInput!, where: WindowWhereInput): BatchPayload!
  upsertWindow(where: WindowWhereUniqueInput!, create: WindowCreateInput!, update: WindowUpdateInput!): Window!
  deleteWindow(where: WindowWhereUniqueInput!): Window
  deleteManyWindows(where: WindowWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
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
  house(where: HouseWhereUniqueInput!): House
  houses(where: HouseWhereInput, orderBy: HouseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [House]!
  housesConnection(where: HouseWhereInput, orderBy: HouseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HouseConnection!
  window(where: WindowWhereUniqueInput!): Window
  windows(where: WindowWhereInput, orderBy: WindowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Window]!
  windowsConnection(where: WindowWhereInput, orderBy: WindowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WindowConnection!
  node(id: ID!): Node
}

type Subscription {
  house(where: HouseSubscriptionWhereInput): HouseSubscriptionPayload
  window(where: WindowSubscriptionWhereInput): WindowSubscriptionPayload
}

type Window {
  id: ID!
  size: Int!
}

type WindowConnection {
  pageInfo: PageInfo!
  edges: [WindowEdge]!
  aggregate: AggregateWindow!
}

input WindowCreateInput {
  size: Int!
}

input WindowCreateManyInput {
  create: [WindowCreateInput!]
  connect: [WindowWhereUniqueInput!]
}

type WindowEdge {
  node: Window!
  cursor: String!
}

enum WindowOrderByInput {
  id_ASC
  id_DESC
  size_ASC
  size_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type WindowPreviousValues {
  id: ID!
  size: Int!
}

type WindowSubscriptionPayload {
  mutation: MutationType!
  node: Window
  updatedFields: [String!]
  previousValues: WindowPreviousValues
}

input WindowSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: WindowWhereInput
  AND: [WindowSubscriptionWhereInput!]
  OR: [WindowSubscriptionWhereInput!]
  NOT: [WindowSubscriptionWhereInput!]
}

input WindowUpdateDataInput {
  size: Int
}

input WindowUpdateInput {
  size: Int
}

input WindowUpdateManyInput {
  create: [WindowCreateInput!]
  delete: [WindowWhereUniqueInput!]
  connect: [WindowWhereUniqueInput!]
  disconnect: [WindowWhereUniqueInput!]
  update: [WindowUpdateWithWhereUniqueNestedInput!]
  upsert: [WindowUpsertWithWhereUniqueNestedInput!]
}

input WindowUpdateWithWhereUniqueNestedInput {
  where: WindowWhereUniqueInput!
  data: WindowUpdateDataInput!
}

input WindowUpsertWithWhereUniqueNestedInput {
  where: WindowWhereUniqueInput!
  update: WindowUpdateDataInput!
  create: WindowCreateInput!
}

input WindowWhereInput {
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
  size: Int
  size_not: Int
  size_in: [Int!]
  size_not_in: [Int!]
  size_lt: Int
  size_lte: Int
  size_gt: Int
  size_gte: Int
  AND: [WindowWhereInput!]
  OR: [WindowWhereInput!]
  NOT: [WindowWhereInput!]
}

input WindowWhereUniqueInput {
  id: ID
}
`
      }
    