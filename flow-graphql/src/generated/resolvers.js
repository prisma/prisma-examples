/**
 * @flow
 */
import { GraphQLResolveInfo } from 'graphql'

export interface ITypeMap {
  Context: any;

  QueryParent: any;
  MutationParent: any;
  PostParent: any;
  UserParent: any;
}

export type Query_Feed_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>[]

export type Query_Drafts_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>[]

// Type for argument
export type Query_Post_Args = {
  id: string,
}

export type Query_Post_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
  args: Query_Post_Args,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'> | null

export type Query_Type<T> = {
  feed: (
    parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>[],
  drafts: (
    parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>[],
  post: (
    parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
    args: Query_Post_Args,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'> | null,
}

// Type for argument
export type Mutation_CreateDraft_Args = {
  title: string,
  content: string,
  authorEmail: string,
}

export type Mutation_CreateDraft_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
  args: Mutation_CreateDraft_Args,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>

// Type for argument
export type Mutation_DeletePost_Args = {
  id: string,
}

export type Mutation_DeletePost_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
  args: Mutation_DeletePost_Args,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'> | null

// Type for argument
export type Mutation_Publish_Args = {
  id: string,
}

export type Mutation_Publish_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
  args: Mutation_Publish_Args,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'> | null

export type Mutation_Type<T> = {
  createDraft: (
    parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
    args: Mutation_CreateDraft_Args,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>,
  deletePost: (
    parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
    args: Mutation_DeletePost_Args,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'> | null,
  publish: (
    parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
    args: Mutation_Publish_Args,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'> | null,
}

export type Post_Id_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_CreatedAt_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_UpdatedAt_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_IsPublished_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => boolean

export type Post_Title_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_Content_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_Author_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'UserParent'>

export type Post_Type<T> = {
  id: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  createdAt: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  updatedAt: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  isPublished: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => boolean,
  title: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  content: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  author: (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'UserParent'>,
}

export type User_Id_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type User_Email_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type User_Name_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type User_Posts_Resolver<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>[]

export type User_Type<T> = {
  id: (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  email: (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  name: (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string,
  posts: (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>[],
}

export type IResolvers<T> = {
  Query: Query_Type<T>,
  Mutation: Mutation_Type<T>,
  Post: Post_Type<T>,
  User: User_Type<T>,
}
