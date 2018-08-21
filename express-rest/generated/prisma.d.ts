import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { BasePrismaOptions, Options } from 'prisma-lib'

export interface Query     houses: (args?: { where?: HouseWhereInput, orderBy?: HouseOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<HouseNode>>;
    windows: (args?: { where?: WindowWhereInput, orderBy?: WindowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<WindowNode>>;
    house: (where: HouseWhereUniqueInput) => House;
    window: (where: WindowWhereUniqueInput) => Window;
    housesConnection: (args?: { where?: HouseWhereInput, orderBy?: HouseOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => HouseConnection;
    windowsConnection: (args?: { where?: WindowWhereInput, orderBy?: WindowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => WindowConnection;
    node: (args: { id: ID_Output }) => Node

export interface Mutation     createHouse: (data: HouseCreateInput) => House;
    createWindow: (data: WindowCreateInput) => Window;
    updateHouse: (args: { data: HouseUpdateInput, where: HouseWhereUniqueInput }) => House;
    updateWindow: (args: { data: WindowUpdateInput, where: WindowWhereUniqueInput }) => Window;
    deleteHouse: (where: HouseWhereUniqueInput) => House;
    deleteWindow: (where: WindowWhereUniqueInput) => Window;
    upsertHouse: (args: { where: HouseWhereUniqueInput, create: HouseCreateInput, update: HouseUpdateInput }) => House;
    upsertWindow: (args: { where: WindowWhereUniqueInput, create: WindowCreateInput, update: WindowUpdateInput }) => Window;
    updateManyHouses: (args: { data: HouseUpdateInput, where?: HouseWhereInput }) => BatchPayload;
    updateManyWindows: (args: { data: WindowUpdateInput, where?: WindowWhereInput }) => BatchPayload;
    deleteManyHouses: (where?: HouseWhereInput) => BatchPayload;
    deleteManyWindows: (where?: WindowWhereInput) => BatchPayload

export interface Subscription     house: <T = Promise<Partial<HouseSubscriptionPayloadNode | null>>>(where?: HouseSubscriptionWhereInput) => Promise<AsyncIterator<T>>;
    window: <T = Promise<Partial<WindowSubscriptionPayloadNode | null>>>(where?: WindowSubscriptionWhereInput) => Promise<AsyncIterator<T>>

export interface Exists   house: (where?: HouseWhereInput) => Promise<boolean>
  window: (where?: WindowWhereInput) => Promise<boolean>

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

export interface DelegateQuery     houses: <T = Promise<Array<HouseNode>>>(args?: { where?: HouseWhereInput, orderBy?: HouseOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    windows: <T = Promise<Array<WindowNode>>>(args?: { where?: WindowWhereInput, orderBy?: WindowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    house: <T = Promise<Partial<HouseNode | null>>>(where: HouseWhereUniqueInput) => T;
    window: <T = Promise<Partial<WindowNode | null>>>(where: WindowWhereUniqueInput) => T;
    housesConnection: <T = Promise<Partial<HouseConnectionNode>>>(args?: { where?: HouseWhereInput, orderBy?: HouseOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    windowsConnection: <T = Promise<Partial<WindowConnectionNode>>>(args?: { where?: WindowWhereInput, orderBy?: WindowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int , info?: GraphQLResolveInfo, options?: Options}) => T;
    node: <T = Promise<Partial<NodeNode | null>>>(args: { id: ID_Output , info?: GraphQLResolveInfo, options?: Options}) => T

export interface DelegateMutation     createHouse: <T = Promise<Partial<HouseNode>>>(where: HouseCreateInput) => T;
    createWindow: <T = Promise<Partial<WindowNode>>>(where: WindowCreateInput) => T;
    updateHouse: <T = Promise<Partial<HouseNode | null>>>(args: { data: HouseUpdateInput, where: HouseWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    updateWindow: <T = Promise<Partial<WindowNode | null>>>(args: { data: WindowUpdateInput, where: WindowWhereUniqueInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    deleteHouse: <T = Promise<Partial<HouseNode | null>>>(where: HouseWhereUniqueInput) => T;
    deleteWindow: <T = Promise<Partial<WindowNode | null>>>(where: WindowWhereUniqueInput) => T;
    upsertHouse: <T = Promise<Partial<HouseNode>>>(args: { where: HouseWhereUniqueInput, create: HouseCreateInput, update: HouseUpdateInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    upsertWindow: <T = Promise<Partial<WindowNode>>>(args: { where: WindowWhereUniqueInput, create: WindowCreateInput, update: WindowUpdateInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    updateManyHouses: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: HouseUpdateInput, where?: HouseWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    updateManyWindows: <T = Promise<Partial<BatchPayloadNode>>>(args: { data: WindowUpdateInput, where?: WindowWhereInput , info?: GraphQLResolveInfo, options?: Options}) => T;
    deleteManyHouses: <T = Promise<Partial<BatchPayloadNode>>>(where?: HouseWhereInput) => T;
    deleteManyWindows: <T = Promise<Partial<BatchPayloadNode>>>(where?: WindowWhereInput) => T

export interface BindingConstructor<T> {
  new(options?: BasePrismaOptions): T
}

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs, endpoint: 'https://eu1.prisma.sh/lol/house/dev'})
export const prisma = new Prisma()

/**
 * Types
*/

export type HouseOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type WindowOrderByInput =   'id_ASC' |
  'id_DESC' |
  'size_ASC' |
  'size_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface HouseWhereUniqueInput {
  id?: ID_Input
}

export interface HouseCreateInput {
  name: String
  windows?: WindowCreateManyInput
}

export interface WindowUpdateDataInput {
  size?: Int
}

export interface HouseWhereInput {
  AND?: HouseWhereInput[] | HouseWhereInput
  OR?: HouseWhereInput[] | HouseWhereInput
  NOT?: HouseWhereInput[] | HouseWhereInput
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
  windows_every?: WindowWhereInput
  windows_some?: WindowWhereInput
  windows_none?: WindowWhereInput
}

export interface WindowUpdateWithWhereUniqueNestedInput {
  where: WindowWhereUniqueInput
  data: WindowUpdateDataInput
}

export interface HouseSubscriptionWhereInput {
  AND?: HouseSubscriptionWhereInput[] | HouseSubscriptionWhereInput
  OR?: HouseSubscriptionWhereInput[] | HouseSubscriptionWhereInput
  NOT?: HouseSubscriptionWhereInput[] | HouseSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: HouseWhereInput
}

export interface WindowWhereInput {
  AND?: WindowWhereInput[] | WindowWhereInput
  OR?: WindowWhereInput[] | WindowWhereInput
  NOT?: WindowWhereInput[] | WindowWhereInput
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
  size?: Int
  size_not?: Int
  size_in?: Int[] | Int
  size_not_in?: Int[] | Int
  size_lt?: Int
  size_lte?: Int
  size_gt?: Int
  size_gte?: Int
}

export interface WindowCreateManyInput {
  create?: WindowCreateInput[] | WindowCreateInput
  connect?: WindowWhereUniqueInput[] | WindowWhereUniqueInput
}

export interface WindowCreateInput {
  size: Int
}

export interface HouseUpdateInput {
  name?: String
  windows?: WindowUpdateManyInput
}

export interface WindowUpdateManyInput {
  create?: WindowCreateInput[] | WindowCreateInput
  connect?: WindowWhereUniqueInput[] | WindowWhereUniqueInput
  disconnect?: WindowWhereUniqueInput[] | WindowWhereUniqueInput
  delete?: WindowWhereUniqueInput[] | WindowWhereUniqueInput
  update?: WindowUpdateWithWhereUniqueNestedInput[] | WindowUpdateWithWhereUniqueNestedInput
  upsert?: WindowUpsertWithWhereUniqueNestedInput[] | WindowUpsertWithWhereUniqueNestedInput
}

export interface WindowUpdateInput {
  size?: Int
}

export interface WindowUpsertWithWhereUniqueNestedInput {
  where: WindowWhereUniqueInput
  update: WindowUpdateDataInput
  create: WindowCreateInput
}

export interface WindowWhereUniqueInput {
  id?: ID_Input
}

export interface WindowSubscriptionWhereInput {
  AND?: WindowSubscriptionWhereInput[] | WindowSubscriptionWhereInput
  OR?: WindowSubscriptionWhereInput[] | WindowSubscriptionWhereInput
  NOT?: WindowSubscriptionWhereInput[] | WindowSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: WindowWhereInput
}

/*
 * An object with an ID

 */
export interface NodeNode {
  id: ID_Output
}

export interface AggregateWindowNode {
  count: Int
}

export interface AggregateWindow extends Promise<AggregateWindowNode> {
  count: () => Promise<Int>
}

export interface BatchPayloadNode {
  count: Long
}

export interface BatchPayload extends Promise<BatchPayloadNode> {
  count: () => Promise<Long>
}

export interface WindowPreviousValuesNode {
  id: ID_Output
  size: Int
}

export interface WindowPreviousValues extends Promise<WindowPreviousValuesNode> {
  id: () => Promise<ID_Output>
  size: () => Promise<Int>
}

export interface WindowNode extends Node {
  id: ID_Output
  size: Int
}

export interface Window extends Promise<WindowNode>, Node {
  id: () => Promise<ID_Output>
  size: () => Promise<Int>
}

export interface HouseSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface HouseSubscriptionPayload extends Promise<HouseSubscriptionPayloadNode> {
  mutation: () => Promise<MutationType>
  node: () => House
  updatedFields: () => Promise<String[]>
  previousValues: () => HousePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface WindowConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface WindowConnection extends Promise<WindowConnectionNode> {
  pageInfo: () => PageInfo
  edges: () => Promise<Array<WindowEdgeNode>>
  aggregate: () => AggregateWindow
}

export interface HousePreviousValuesNode {
  id: ID_Output
  name: String
}

export interface HousePreviousValues extends Promise<HousePreviousValuesNode> {
  id: () => Promise<ID_Output>
  name: () => Promise<String>
}

export interface HouseNode extends Node {
  id: ID_Output
  name: String
}

export interface House extends Promise<HouseNode>, Node {
  id: () => Promise<ID_Output>
  windows: (args?: { where?: WindowWhereInput, orderBy?: WindowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }) => Promise<Array<WindowNode>>
  name: () => Promise<String>
}

export interface AggregateHouseNode {
  count: Int
}

export interface AggregateHouse extends Promise<AggregateHouseNode> {
  count: () => Promise<Int>
}

/*
 * An edge in a connection.

 */
export interface WindowEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface WindowEdge extends Promise<WindowEdgeNode> {
  node: () => Window
  cursor: () => Promise<String>
}

/*
 * An edge in a connection.

 */
export interface HouseEdgeNode {
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface HouseEdge extends Promise<HouseEdgeNode> {
  node: () => House
  cursor: () => Promise<String>
}

/*
 * A connection to a list of items.

 */
export interface HouseConnectionNode {

}

/*
 * A connection to a list of items.

 */
export interface HouseConnection extends Promise<HouseConnectionNode> {
  pageInfo: () => PageInfo
  edges: () => Promise<Array<HouseEdgeNode>>
  aggregate: () => AggregateHouse
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

export interface WindowSubscriptionPayloadNode {
  mutation: MutationType
  updatedFields?: String[]
}

export interface WindowSubscriptionPayload extends Promise<WindowSubscriptionPayloadNode> {
  mutation: () => Promise<MutationType>
  node: () => Window
  updatedFields: () => Promise<String[]>
  previousValues: () => WindowPreviousValues
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number