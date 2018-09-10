module.exports = {
        typeDefs: `type AggregateCat {
  count: Int!
}

type AggregateMaster {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Cat {
  id: ID!
  name: String!
  color: String!
  favBrother(where: CatWhereInput): Cat
}

type CatConnection {
  pageInfo: PageInfo!
  edges: [CatEdge]!
  aggregate: AggregateCat!
}

input CatCreateInput {
  name: String!
  color: String!
  favBrother: CatCreateOneInput
}

input CatCreateManyInput {
  create: [CatCreateInput!]
  connect: [CatWhereUniqueInput!]
}

input CatCreateOneInput {
  create: CatCreateInput
  connect: CatWhereUniqueInput
}

type CatEdge {
  node: Cat!
  cursor: String!
}

enum CatOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  color_ASC
  color_DESC
}

type CatPreviousValues {
  id: ID!
  name: String!
  color: String!
}

type CatSubscriptionPayload {
  mutation: MutationType!
  node: Cat
  updatedFields: [String!]
  previousValues: CatPreviousValues
}

input CatSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CatWhereInput
  AND: [CatSubscriptionWhereInput!]
  OR: [CatSubscriptionWhereInput!]
  NOT: [CatSubscriptionWhereInput!]
}

input CatUpdateDataInput {
  name: String
  color: String
  favBrother: CatUpdateOneInput
}

input CatUpdateInput {
  name: String
  color: String
  favBrother: CatUpdateOneInput
}

input CatUpdateManyInput {
  create: [CatCreateInput!]
  delete: [CatWhereUniqueInput!]
  connect: [CatWhereUniqueInput!]
  disconnect: [CatWhereUniqueInput!]
  update: [CatUpdateWithWhereUniqueNestedInput!]
  upsert: [CatUpsertWithWhereUniqueNestedInput!]
}

input CatUpdateOneInput {
  create: CatCreateInput
  update: CatUpdateDataInput
  upsert: CatUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: CatWhereUniqueInput
}

input CatUpdateWithWhereUniqueNestedInput {
  where: CatWhereUniqueInput!
  data: CatUpdateDataInput!
}

input CatUpsertNestedInput {
  update: CatUpdateDataInput!
  create: CatCreateInput!
}

input CatUpsertWithWhereUniqueNestedInput {
  where: CatWhereUniqueInput!
  update: CatUpdateDataInput!
  create: CatCreateInput!
}

input CatWhereInput {
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
  color: String
  color_not: String
  color_in: [String!]
  color_not_in: [String!]
  color_lt: String
  color_lte: String
  color_gt: String
  color_gte: String
  color_contains: String
  color_not_contains: String
  color_starts_with: String
  color_not_starts_with: String
  color_ends_with: String
  color_not_ends_with: String
  favBrother: CatWhereInput
  AND: [CatWhereInput!]
  OR: [CatWhereInput!]
  NOT: [CatWhereInput!]
}

input CatWhereUniqueInput {
  id: ID
}

scalar Long

type Master {
  id: ID!
  catz(where: CatWhereInput, orderBy: CatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Cat!]
}

type MasterConnection {
  pageInfo: PageInfo!
  edges: [MasterEdge]!
  aggregate: AggregateMaster!
}

input MasterCreateInput {
  catz: CatCreateManyInput
}

type MasterEdge {
  node: Master!
  cursor: String!
}

enum MasterOrderByInput {
  id_ASC
  id_DESC
}

type MasterPreviousValues {
  id: ID!
}

type MasterSubscriptionPayload {
  mutation: MutationType!
  node: Master
  updatedFields: [String!]
  previousValues: MasterPreviousValues
}

input MasterSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MasterWhereInput
  AND: [MasterSubscriptionWhereInput!]
  OR: [MasterSubscriptionWhereInput!]
  NOT: [MasterSubscriptionWhereInput!]
}

input MasterUpdateInput {
  catz: CatUpdateManyInput
}

input MasterWhereInput {
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
  catz_every: CatWhereInput
  catz_some: CatWhereInput
  catz_none: CatWhereInput
  AND: [MasterWhereInput!]
  OR: [MasterWhereInput!]
  NOT: [MasterWhereInput!]
}

input MasterWhereUniqueInput {
  id: ID
}

type Mutation {
  createCat(data: CatCreateInput!): Cat!
  updateCat(data: CatUpdateInput!, where: CatWhereUniqueInput!): Cat
  updateManyCats(data: CatUpdateInput!, where: CatWhereInput): BatchPayload!
  upsertCat(where: CatWhereUniqueInput!, create: CatCreateInput!, update: CatUpdateInput!): Cat!
  deleteCat(where: CatWhereUniqueInput!): Cat
  deleteManyCats(where: CatWhereInput): BatchPayload!
  createMaster(data: MasterCreateInput!): Master!
  updateMaster(data: MasterUpdateInput!, where: MasterWhereUniqueInput!): Master
  updateManyMasters(data: MasterUpdateInput!, where: MasterWhereInput): BatchPayload!
  upsertMaster(where: MasterWhereUniqueInput!, create: MasterCreateInput!, update: MasterUpdateInput!): Master!
  deleteMaster(where: MasterWhereUniqueInput!): Master
  deleteManyMasters(where: MasterWhereInput): BatchPayload!
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
  cat(where: CatWhereUniqueInput!): Cat
  cats(where: CatWhereInput, orderBy: CatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Cat]!
  catsConnection(where: CatWhereInput, orderBy: CatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CatConnection!
  master(where: MasterWhereUniqueInput!): Master
  masters(where: MasterWhereInput, orderBy: MasterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Master]!
  mastersConnection(where: MasterWhereInput, orderBy: MasterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MasterConnection!
  node(id: ID!): Node
}

type Subscription {
  cat(where: CatSubscriptionWhereInput): CatSubscriptionPayload
  master(where: MasterSubscriptionWhereInput): MasterSubscriptionPayload
}
`
      }
    