import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { makePrismaBindingClass, BasePrismaOptions, Options } from 'prisma-lib'

export interface Exists {
  master: (where?: MasterWhereInput) => Promise<boolean>
  cat: (where?: CatWhereInput) => Promise<boolean>
}

export interface Node {}

export interface Prisma {
  $exists: Exists;
  $request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>;
  $delegate: Delegate;
  $getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;

  /**
   * Queries
  */

    masters: (args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<MasterNode>>;
    cats: (args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<CatNode>>;
    master: (where: MasterWhereUniqueInput) => Master;
    cat: (where: CatWhereUniqueInput) => Cat;
    mastersConnection: (args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => MasterConnection;
    catsConnection: (args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => CatConnection;
    node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
  */

    createMaster: (data: MasterCreateInput) => Master;
    createCat: (data: CatCreateInput) => Cat;
    updateMaster: (args: { data: MasterUpdateInput, where: MasterWhereUniqueInput }) => Master;
    updateCat: (args: { data: CatUpdateInput, where: CatWhereUniqueInput }) => Cat;
    deleteMaster: (where: MasterWhereUniqueInput) => Master;
    deleteCat: (where: CatWhereUniqueInput) => Cat;
    upsertMaster: (args: { where: MasterWhereUniqueInput, create: MasterCreateInput, update: MasterUpdateInput }) => Master;
    upsertCat: (args: { where: CatWhereUniqueInput, create: CatCreateInput, update: CatUpdateInput }) => Cat;
    updateManyMasters: (args: { data: MasterUpdateInput, where?: MasterWhereInput }) => BatchPayload;
    updateManyCats: (args: { data: CatUpdateInput, where?: CatWhereInput }) => BatchPayload;
    deleteManyMasters: (where?: MasterWhereInput) => BatchPayload;
    deleteManyCats: (where?: CatWhereInput) => BatchPayload;
}

export interface Delegate {
  (
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo,
    options?: Options,
  ): Promise<any>
  query: DelegateQuery
  mutation: DelegateMutation
}

export interface DelegateQuery {
    masters: <T = Promise<Array<MasterNode>>>(args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    cats: <T = Promise<Array<CatNode>>>(args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    master: <T = Promise<Partial<MasterNode | null>>>(where: MasterWhereUniqueInput) => T;
    cat: <T = Promise<Partial<CatNode | null>>>(where: CatWhereUniqueInput) => T;
    mastersConnection: <T = Promise<Partial<MasterConnectionNode>>>(args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    catsConnection: <T = Promise<Partial<CatConnectionNode>>>(args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    node: <T = Promise<Partial<NodeNode | null>>>(args: { id: ID_Output , info?: GraphQLResolveInfo, options?: Options}) => T
}

export interface DelegateMutation {
    createMaster: <T = Promise<Partial<MasterNode>>>(where: MasterCreateInput) => T;
    createCat: <T = Promise<Partial<CatNode>>>(where: CatCreateInput) => T;
    updateMaster: <T = Promise<Partial<MasterNode | null>>>(args: { data: MasterUpdateInput, where: MasterWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    updateCat: <T = Promise<Partial<CatNode | null>>>(args: { data: CatUpdateInput, where: CatWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    deleteMaster: <T = Promise<Partial<MasterNode | null>>>(where: MasterWhereUniqueInput) => T;
    deleteCat: <T = Promise<Partial<CatNode | null>>>(where: CatWhereUniqueInput) => T;
    upsertMaster: <T = Promise<Partial<MasterNode>>>(args: { where: MasterWhereUniqueInput, create: MasterCreateInput, update: MasterUpdateInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    upsertCat: <T = Promise<Partial<CatNode>>>(args: { where: CatWhereUniqueInput, create: CatCreateInput, update: CatUpdateInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    updateManyMasters: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: MasterUpdateInput, where?: MasterWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    updateManyCats: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: CatUpdateInput, where?: CatWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    deleteManyMasters: <T = Promise<Partial<BatchPayloadNode>>>(where?: MasterWhereInput) => T;
    deleteManyCats: <T = Promise<Partial<BatchPayloadNode>>>(where?: CatWhereInput) => T
}

export interface BindingConstructor<T> {
  new(options?: BasePrismaOptions): T
}

/**
 * Types
*/

export type MasterOrderByInput =   'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type CatOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'color_ASC' |
  'color_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface MasterCreateInput {
  catz?: CatCreateManyInput
}

export interface MasterWhereInput {
  AND?: MasterWhereInput[] | MasterWhereInput
  OR?: MasterWhereInput[] | MasterWhereInput
  NOT?: MasterWhereInput[] | MasterWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  catz_every?: CatWhereInput
  catz_some?: CatWhereInput
  catz_none?: CatWhereInput
}

export interface CatUpsertWithWhereUniqueNestedInput {
  where: CatWhereUniqueInput
  update: CatUpdateDataInput
  create: CatCreateInput
}

export interface CatCreateInput {
  name: String
  color: String
  favBrother?: CatCreateOneInput
}

export interface CatUpsertNestedInput {
  update: CatUpdateDataInput
  create: CatCreateInput
}

export interface CatCreateOneInput {
  create?: CatCreateInput
  connect?: CatWhereUniqueInput
}

export interface CatUpdateOneInput {
  create?: CatCreateInput
  connect?: CatWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: CatUpdateDataInput
  upsert?: CatUpsertNestedInput
}

export interface CatSubscriptionWhereInput {
  AND?: CatSubscriptionWhereInput[] | CatSubscriptionWhereInput
  OR?: CatSubscriptionWhereInput[] | CatSubscriptionWhereInput
  NOT?: CatSubscriptionWhereInput[] | CatSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CatWhereInput
}

export interface CatUpdateDataInput {
  name?: String
  color?: String
  favBrother?: CatUpdateOneInput
}

export interface MasterWhereUniqueInput {
  id?: ID_Input
}

export interface MasterSubscriptionWhereInput {
  AND?: MasterSubscriptionWhereInput[] | MasterSubscriptionWhereInput
  OR?: MasterSubscriptionWhereInput[] | MasterSubscriptionWhereInput
  NOT?: MasterSubscriptionWhereInput[] | MasterSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: MasterWhereInput
}

export interface CatCreateManyInput {
  create?: CatCreateInput[] | CatCreateInput
  connect?: CatWhereUniqueInput[] | CatWhereUniqueInput
}

export interface MasterUpdateInput {
  catz?: CatUpdateManyInput
}

export interface CatUpdateManyInput {
  create?: CatCreateInput[] | CatCreateInput
  connect?: CatWhereUniqueInput[] | CatWhereUniqueInput
  disconnect?: CatWhereUniqueInput[] | CatWhereUniqueInput
  delete?: CatWhereUniqueInput[] | CatWhereUniqueInput
  update?: CatUpdateWithWhereUniqueNestedInput[] | CatUpdateWithWhereUniqueNestedInput
  upsert?: CatUpsertWithWhereUniqueNestedInput[] | CatUpsertWithWhereUniqueNestedInput
}

export interface CatUpdateWithWhereUniqueNestedInput {
  where: CatWhereUniqueInput
  data: CatUpdateDataInput
}

export interface CatUpdateInput {
  name?: String
  color?: String
  favBrother?: CatUpdateOneInput
}

export interface CatWhereUniqueInput {
  id?: ID_Input
}

export interface CatWhereInput {
  AND?: CatWhereInput[] | CatWhereInput
  OR?: CatWhereInput[] | CatWhereInput
  NOT?: CatWhereInput[] | CatWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  color?: String
  color_not?: String
  color_in?: String[] | String
  color_not_in?: String[] | String
  color_lt?: String
  color_lte?: String
  color_gt?: String
  color_gte?: String
  color_contains?: String
  color_not_contains?: String
  color_starts_with?: String
  color_not_starts_with?: String
  color_ends_with?: String
  color_not_ends_with?: String
  favBrother?: CatWhereInput
}

/*
 * An object with an ID

 */
export interface NodeNode {
  id: ID_Output
}

export interface CatPreviousValuesNode {
  id: ID_Output
  name: String
  color: String
}

export interface CatPreviousValues extends Promise<CatPreviousValuesNode> {
  id: () => Promise<ID_Output>
  name: () => Promise<String>
  color: () => Promise<String>
}

export interface BatchPayloadNode {
  count: Long
}

export interface BatchPayload extends Promise<BatchPayloadNode> {
  count: () => Promise<Long>
}

export interface MasterNode extends Node {
  id: ID_Output
}

export interface Master extends Promise<MasterNode>, Node {
  id: () => Promise<ID_Output>
  catz: (args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<CatNode>>
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfoNode {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo extends Promise<PageInfoNode> {
  hasNextPage: () => Promise<Boolean>
  hasPreviousPage: () => Promise<Boolean>
  startCursor: () => Promise<String>
  endCursor: () => Promise<String>
}

export interface MasterSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface MasterSubscriptionPayload extends Promise<MasterSubscriptionPayloadNode> {
  mutation: () => Promise<MutationType>
  node: () => Master
  updatedFields: () => Promise<String[]>
  previousValues: () => MasterPreviousValues
}

export interface AggregateCatNode {
  count: Int
}

export interface AggregateCat extends Promise<AggregateCatNode> {
  count: () => Promise<Int>
}

export interface CatNode extends Node {
  id: ID_Output
  name: String
  color: String
}

export interface Cat extends Promise<CatNode>, Node {
  id: () => Promise<ID_Output>
  name: () => Promise<String>
  color: () => Promise<String>
  favBrother: (args?: { where?: CatWhereInput }) => Cat
}

/*
 * A connection to a list of items.

 */
export interface MasterConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface MasterConnection extends Promise<MasterConnectionNode> {
  pageInfo: () => PageInfo
  edges: () => Promise<Array<MasterEdgeNode>>
  aggregate: () => AggregateMaster
}

/*
 * An edge in a connection.

 */
export interface CatEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface CatEdge extends Promise<CatEdgeNode> {
  node: () => Cat
  cursor: () => Promise<String>
}

export interface MasterPreviousValuesNode {
  id: ID_Output
}

export interface MasterPreviousValues extends Promise<MasterPreviousValuesNode> {
  id: () => Promise<ID_Output>
}

/*
 * A connection to a list of items.

 */
export interface CatConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface CatConnection extends Promise<CatConnectionNode> {
  pageInfo: () => PageInfo
  edges: () => Promise<Array<CatEdgeNode>>
  aggregate: () => AggregateCat
}

export interface CatSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface CatSubscriptionPayload extends Promise<CatSubscriptionPayloadNode> {
  mutation: () => Promise<MutationType>
  node: () => Cat
  updatedFields: () => Promise<String[]>
  previousValues: () => CatPreviousValues
}

/*
 * An edge in a connection.

 */
export interface MasterEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface MasterEdge extends Promise<MasterEdgeNode> {
  node: () => Master
  cursor: () => Promise<String>
}

export interface AggregateMasterNode {
  count: Int
}

export interface AggregateMaster extends Promise<AggregateMasterNode> {
  count: () => Promise<Int>
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/**
 * Type Defs
*/

const typeDefs = `type AggregateCat {
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

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs, endpoint: 'https://eu1.prisma.sh/lol/tut/dev'})
export const prisma = new Prisma()
