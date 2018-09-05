module.exports = {
        typeDefs: `type AggregateCat {
  count: Int!
}

type AggregateMaster {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Cat implements Node {
  id: ID!
  name: String!
  color: String!
  favBrother(where: CatWhereInput): Cat
}

"""A connection to a list of items."""
type CatConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
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

"""An edge in a connection."""
type CatEdge {
  """The item at the end of the edge."""
  node: Cat!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CatOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  color_ASC
  color_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [CatSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CatSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CatSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CatWhereInput
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
  connect: [CatWhereUniqueInput!]
  disconnect: [CatWhereUniqueInput!]
  delete: [CatWhereUniqueInput!]
  update: [CatUpdateWithWhereUniqueNestedInput!]
  upsert: [CatUpsertWithWhereUniqueNestedInput!]
}

input CatUpdateOneInput {
  create: CatCreateInput
  connect: CatWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CatUpdateDataInput
  upsert: CatUpsertNestedInput
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
  """Logical AND on all given filters."""
  AND: [CatWhereInput!]

  """Logical OR on all given filters."""
  OR: [CatWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CatWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  color: String

  """All values that are not equal to given value."""
  color_not: String

  """All values that are contained in given list."""
  color_in: [String!]

  """All values that are not contained in given list."""
  color_not_in: [String!]

  """All values less than the given value."""
  color_lt: String

  """All values less than or equal the given value."""
  color_lte: String

  """All values greater than the given value."""
  color_gt: String

  """All values greater than or equal the given value."""
  color_gte: String

  """All values containing the given string."""
  color_contains: String

  """All values not containing the given string."""
  color_not_contains: String

  """All values starting with the given string."""
  color_starts_with: String

  """All values not starting with the given string."""
  color_not_starts_with: String

  """All values ending with the given string."""
  color_ends_with: String

  """All values not ending with the given string."""
  color_not_ends_with: String
  favBrother: CatWhereInput
}

input CatWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Master implements Node {
  id: ID!
  catz(where: CatWhereInput, orderBy: CatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Cat!]
}

"""A connection to a list of items."""
type MasterConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MasterEdge]!
  aggregate: AggregateMaster!
}

input MasterCreateInput {
  catz: CatCreateManyInput
}

"""An edge in a connection."""
type MasterEdge {
  """The item at the end of the edge."""
  node: Master!

  """A cursor for use in pagination."""
  cursor: String!
}

enum MasterOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [MasterSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [MasterSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MasterSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: MasterWhereInput
}

input MasterUpdateInput {
  catz: CatUpdateManyInput
}

input MasterWhereInput {
  """Logical AND on all given filters."""
  AND: [MasterWhereInput!]

  """Logical OR on all given filters."""
  OR: [MasterWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MasterWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  catz_every: CatWhereInput
  catz_some: CatWhereInput
  catz_none: CatWhereInput
}

input MasterWhereUniqueInput {
  id: ID
}

type Mutation {
  createMaster(data: MasterCreateInput!): Master!
  createCat(data: CatCreateInput!): Cat!
  updateMaster(data: MasterUpdateInput!, where: MasterWhereUniqueInput!): Master
  updateCat(data: CatUpdateInput!, where: CatWhereUniqueInput!): Cat
  deleteMaster(where: MasterWhereUniqueInput!): Master
  deleteCat(where: CatWhereUniqueInput!): Cat
  upsertMaster(where: MasterWhereUniqueInput!, create: MasterCreateInput!, update: MasterUpdateInput!): Master!
  upsertCat(where: CatWhereUniqueInput!, create: CatCreateInput!, update: CatUpdateInput!): Cat!
  updateManyMasters(data: MasterUpdateInput!, where: MasterWhereInput): BatchPayload!
  updateManyCats(data: CatUpdateInput!, where: CatWhereInput): BatchPayload!
  deleteManyMasters(where: MasterWhereInput): BatchPayload!
  deleteManyCats(where: CatWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  masters(where: MasterWhereInput, orderBy: MasterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Master]!
  cats(where: CatWhereInput, orderBy: CatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Cat]!
  master(where: MasterWhereUniqueInput!): Master
  cat(where: CatWhereUniqueInput!): Cat
  mastersConnection(where: MasterWhereInput, orderBy: MasterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MasterConnection!
  catsConnection(where: CatWhereInput, orderBy: CatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CatConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  master(where: MasterSubscriptionWhereInput): MasterSubscriptionPayload
  cat(where: CatSubscriptionWhereInput): CatSubscriptionPayload
}
`
      }
    