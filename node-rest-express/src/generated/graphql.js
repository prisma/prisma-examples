module.exports = {
        typeDefs: `type AggregateHouse {
  count: Int!
}

type AggregateWindow {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type House implements Node {
  id: ID!
  windows(where: WindowWhereInput, orderBy: WindowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Window!]
  name: String!
}

"""A connection to a list of items."""
type HouseConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [HouseEdge]!
  aggregate: AggregateHouse!
}

input HouseCreateInput {
  name: String!
  windows: WindowCreateManyInput
}

"""An edge in a connection."""
type HouseEdge {
  """The item at the end of the edge."""
  node: House!

  """A cursor for use in pagination."""
  cursor: String!
}

enum HouseOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [HouseSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [HouseSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [HouseSubscriptionWhereInput!]

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
  node: HouseWhereInput
}

input HouseUpdateInput {
  name: String
  windows: WindowUpdateManyInput
}

input HouseWhereInput {
  """Logical AND on all given filters."""
  AND: [HouseWhereInput!]

  """Logical OR on all given filters."""
  OR: [HouseWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [HouseWhereInput!]
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
  windows_every: WindowWhereInput
  windows_some: WindowWhereInput
  windows_none: WindowWhereInput
}

input HouseWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createHouse(data: HouseCreateInput!): House!
  createWindow(data: WindowCreateInput!): Window!
  updateHouse(data: HouseUpdateInput!, where: HouseWhereUniqueInput!): House
  updateWindow(data: WindowUpdateInput!, where: WindowWhereUniqueInput!): Window
  deleteHouse(where: HouseWhereUniqueInput!): House
  deleteWindow(where: WindowWhereUniqueInput!): Window
  upsertHouse(where: HouseWhereUniqueInput!, create: HouseCreateInput!, update: HouseUpdateInput!): House!
  upsertWindow(where: WindowWhereUniqueInput!, create: WindowCreateInput!, update: WindowUpdateInput!): Window!
  updateManyHouses(data: HouseUpdateInput!, where: HouseWhereInput): BatchPayload!
  updateManyWindows(data: WindowUpdateInput!, where: WindowWhereInput): BatchPayload!
  deleteManyHouses(where: HouseWhereInput): BatchPayload!
  deleteManyWindows(where: WindowWhereInput): BatchPayload!
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
  houses(where: HouseWhereInput, orderBy: HouseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [House]!
  windows(where: WindowWhereInput, orderBy: WindowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Window]!
  house(where: HouseWhereUniqueInput!): House
  window(where: WindowWhereUniqueInput!): Window
  housesConnection(where: HouseWhereInput, orderBy: HouseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HouseConnection!
  windowsConnection(where: WindowWhereInput, orderBy: WindowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): WindowConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  house(where: HouseSubscriptionWhereInput): HouseSubscriptionPayload
  window(where: WindowSubscriptionWhereInput): WindowSubscriptionPayload
}

type Window implements Node {
  id: ID!
  size: Int!
}

"""A connection to a list of items."""
type WindowConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
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

"""An edge in a connection."""
type WindowEdge {
  """The item at the end of the edge."""
  node: Window!

  """A cursor for use in pagination."""
  cursor: String!
}

enum WindowOrderByInput {
  id_ASC
  id_DESC
  size_ASC
  size_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """Logical AND on all given filters."""
  AND: [WindowSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [WindowSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [WindowSubscriptionWhereInput!]

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
  node: WindowWhereInput
}

input WindowUpdateDataInput {
  size: Int
}

input WindowUpdateInput {
  size: Int
}

input WindowUpdateManyInput {
  create: [WindowCreateInput!]
  connect: [WindowWhereUniqueInput!]
  disconnect: [WindowWhereUniqueInput!]
  delete: [WindowWhereUniqueInput!]
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
  """Logical AND on all given filters."""
  AND: [WindowWhereInput!]

  """Logical OR on all given filters."""
  OR: [WindowWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [WindowWhereInput!]
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
  size: Int

  """All values that are not equal to given value."""
  size_not: Int

  """All values that are contained in given list."""
  size_in: [Int!]

  """All values that are not contained in given list."""
  size_not_in: [Int!]

  """All values less than the given value."""
  size_lt: Int

  """All values less than or equal the given value."""
  size_lte: Int

  """All values greater than the given value."""
  size_gt: Int

  """All values greater than or equal the given value."""
  size_gte: Int
}

input WindowWhereUniqueInput {
  id: ID
}
`
      }
    