import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { BasePrismaOptions, Options } from 'prisma-lib'

export interface Query {
    masters: (args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<MasterNode>> ,
    cats: (args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<CatNode>> ,
    master: (args: { where: MasterWhereUniqueInput }) => Master ,
    cat: (args: { where: CatWhereUniqueInput }) => Cat ,
    mastersConnection: (args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => MasterConnection ,
    catsConnection: (args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => CatConnection ,
    node: (args: { id: ID_Output }) => Node 
  }

export interface Mutation {
    createMaster: (args: { data: MasterCreateInput }) => Master ,
    createCat: (args: { data: CatCreateInput }) => Cat ,
    updateMaster: (args: { data: MasterUpdateInput, where: MasterWhereUniqueInput }) => Master ,
    updateCat: (args: { data: CatUpdateInput, where: CatWhereUniqueInput }) => Cat ,
    deleteMaster: (args: { where: MasterWhereUniqueInput }) => Master ,
    deleteCat: (args: { where: CatWhereUniqueInput }) => Cat ,
    upsertMaster: (args: { where: MasterWhereUniqueInput, create: MasterCreateInput, update: MasterUpdateInput }) => Master ,
    upsertCat: (args: { where: CatWhereUniqueInput, create: CatCreateInput, update: CatUpdateInput }) => Cat ,
    updateManyMasters: (args: { data: MasterUpdateInput, where?: MasterWhereInput }) => BatchPayload ,
    updateManyCats: (args: { data: CatUpdateInput, where?: CatWhereInput }) => BatchPayload ,
    deleteManyMasters: (args?: { where?: MasterWhereInput }) => BatchPayload ,
    deleteManyCats: (args?: { where?: CatWhereInput }) => BatchPayload 
  }

export interface Subscription {
    master: <T = Promise<Partial<MasterSubscriptionPayloadNode | null>>>(args?: { where?: MasterSubscriptionWhereInput , info?: GraphQLResolveInfo, options?: Options}) => Promise<AsyncIterator<T>> ,
    cat: <T = Promise<Partial<CatSubscriptionPayloadNode | null>>>(args?: { where?: CatSubscriptionWhereInput , info?: GraphQLResolveInfo, options?: Options}) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Master: (where?: MasterWhereInput) => Promise<boolean>
  Cat: (where?: CatWhereInput) => Promise<boolean>
}

export interface Node {}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate: Delegate;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
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
  subscription: Subscription
}

export interface DelegateQuery {
    masters: <T = Promise<Array<MasterNode>>>(args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T ,
    cats: <T = Promise<Array<CatNode>>>(args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T ,
    master: <T = Promise<Partial<MasterNode | null>>>(args: { where: MasterWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    cat: <T = Promise<Partial<CatNode | null>>>(args: { where: CatWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    mastersConnection: <T = Promise<Partial<MasterConnectionNode>>>(args?: { where?: MasterWhereInput, orderBy?: MasterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T ,
    catsConnection: <T = Promise<Partial<CatConnectionNode>>>(args?: { where?: CatWhereInput, orderBy?: CatOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T ,
    node: <T = Promise<Partial<NodeNode | null>>>(args: { id: ID_Output , info?: GraphQLResolveInfo, options?: Options}) => T 
  }

export interface DelegateMutation {
    createMaster: <T = Promise<Partial<MasterNode>>>(args: { data: MasterCreateInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    createCat: <T = Promise<Partial<CatNode>>>(args: { data: CatCreateInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    updateMaster: <T = Promise<Partial<MasterNode | null>>>(args: { data: MasterUpdateInput, where: MasterWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    updateCat: <T = Promise<Partial<CatNode | null>>>(args: { data: CatUpdateInput, where: CatWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    deleteMaster: <T = Promise<Partial<MasterNode | null>>>(args: { where: MasterWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    deleteCat: <T = Promise<Partial<CatNode | null>>>(args: { where: CatWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    upsertMaster: <T = Promise<Partial<MasterNode>>>(args: { where: MasterWhereUniqueInput, create: MasterCreateInput, update: MasterUpdateInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    upsertCat: <T = Promise<Partial<CatNode>>>(args: { where: CatWhereUniqueInput, create: CatCreateInput, update: CatUpdateInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    updateManyMasters: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: MasterUpdateInput, where?: MasterWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    updateManyCats: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: CatUpdateInput, where?: CatWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    deleteManyMasters: <T = Promise<Partial<BatchPayloadNode>>>(args?: { where?: MasterWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T ,
    deleteManyCats: <T = Promise<Partial<BatchPayloadNode>>>(args?: { where?: CatWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T 
  }

export interface BindingConstructor<T> {
  new(options?: BasePrismaOptions): T
}

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs, endpoint: 'https://eu1.prisma.sh/lol/prisma/dev'})
export const prisma = new Prisma()

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
  id: ID_Output
  name: String
  color: String
}

export interface BatchPayloadNode {
  count: Long
}

export interface BatchPayload extends Promise<BatchPayloadNode> {
  count: Long
}

export interface MasterNode extends Node {
  id: ID_Output
}

export interface Master extends Promise<MasterNode>, Node {
  id: ID_Output
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
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor: String
  endCursor: String
}

export interface MasterSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String
}

export interface MasterSubscriptionPayload extends Promise<MasterSubscriptionPayloadNode> {
  mutation: MutationType
  node: () => Master
  updatedFields: String
  previousValues: () => MasterPreviousValues
}

export interface AggregateCatNode {
  count: Int
}

export interface AggregateCat extends Promise<AggregateCatNode> {
  count: Int
}

export interface CatNode extends Node {
  id: ID_Output
  name: String
  color: String
}

export interface Cat extends Promise<CatNode>, Node {
  id: ID_Output
  name: String
  color: String
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
  cursor: String
}

export interface MasterPreviousValuesNode {
  id: ID_Output
}

export interface MasterPreviousValues extends Promise<MasterPreviousValuesNode> {
  id: ID_Output
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
  updatedFields?: String
}

export interface CatSubscriptionPayload extends Promise<CatSubscriptionPayloadNode> {
  mutation: MutationType
  node: () => Cat
  updatedFields: String
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
  cursor: String
}

export interface AggregateMasterNode {
  count: Int
}

export interface AggregateMaster extends Promise<AggregateMasterNode> {
  count: Int
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