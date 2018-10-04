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

export type Query_FeedType<T> = (
  parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>[]

export type Query_DraftsType<T> = (
  parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>[]

// Type for argument
export type Query_ArgsPost = {
  id: string,
}

export type Query_PostType<T> = (
  parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
  args: Query_ArgsPost,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'> | null

export type QueryResolvers<T> = {
  // Type for GraphQL type
  FeedType: Query_FeedType<T>,

  // Type for GraphQL type
  DraftsType: Query_DraftsType<T>,

  // Type for GraphQL type
  PostType: Query_PostType<T>,

  Type: {
    feed: Query_FeedType<T>,
    drafts: Query_DraftsType<T>,
    post: Query_PostType<T>,
  },
}

// Type for argument
export type Mutation_ArgsCreateDraft = {
  title: string,
  content: string,
  authorEmail: string,
}

export type Mutation_CreateDraftType<T> = (
  parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
  args: Mutation_ArgsCreateDraft,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>

// Type for argument
export type Mutation_ArgsDeletePost = {
  id: string,
}

export type Mutation_DeletePostType<T> = (
  parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
  args: Mutation_ArgsDeletePost,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'> | null

// Type for argument
export type Mutation_ArgsPublish = {
  id: string,
}

export type Mutation_PublishType<T> = (
  parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
  args: Mutation_ArgsPublish,
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'> | null

export type MutationResolvers<T> = {
  // Type for GraphQL type
  CreateDraftType: Mutation_CreateDraftType<T>,

  // Type for GraphQL type
  DeletePostType: Mutation_DeletePostType<T>,

  // Type for GraphQL type
  PublishType: Mutation_PublishType<T>,

  Type: {
    createDraft: Mutation_CreateDraftType<T>,
    deletePost: Mutation_DeletePostType<T>,
    publish: Mutation_PublishType<T>,
  },
}

export type Post_IdType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_CreatedAtType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_UpdatedAtType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_IsPublishedType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => boolean

export type Post_TitleType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_ContentType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type Post_AuthorType<T> = (
  parent: $PropertyType<T & ITypeMap, 'PostParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'UserParent'>

export type PostResolvers<T> = {
  // Type for GraphQL type
  IdType: Post_IdType<T>,

  // Type for GraphQL type
  CreatedAtType: Post_CreatedAtType<T>,

  // Type for GraphQL type
  UpdatedAtType: Post_UpdatedAtType<T>,

  // Type for GraphQL type
  IsPublishedType: Post_IsPublishedType<T>,

  // Type for GraphQL type
  TitleType: Post_TitleType<T>,

  // Type for GraphQL type
  ContentType: Post_ContentType<T>,

  // Type for GraphQL type
  AuthorType: Post_AuthorType<T>,

  Type: {
    id: Post_IdType<T>,
    createdAt: Post_CreatedAtType<T>,
    updatedAt: Post_UpdatedAtType<T>,
    isPublished: Post_IsPublishedType<T>,
    title: Post_TitleType<T>,
    content: Post_ContentType<T>,
    author: Post_AuthorType<T>,
  },
}

export type User_IdType<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type User_EmailType<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type User_NameType<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => string

export type User_PostsType<T> = (
  parent: $PropertyType<T & ITypeMap, 'UserParent'>,
  args: {},
  ctx: $PropertyType<T & ITypeMap, 'Context'>,
  info: GraphQLResolveInfo,
) => $PropertyType<T & ITypeMap, 'PostParent'>[]

export type UserResolvers<T> = {
  // Type for GraphQL type
  IdType: User_IdType<T>,

  // Type for GraphQL type
  EmailType: User_EmailType<T>,

  // Type for GraphQL type
  NameType: User_NameType<T>,

  // Type for GraphQL type
  PostsType: User_PostsType<T>,

  Type: {
    id: User_IdType<T>,
    email: User_EmailType<T>,
    name: User_NameType<T>,
    posts: User_PostsType<T>,
  },
}

export type IResolvers<T> = {
  Query: $PropertyType<QueryResolvers<T>, 'Type'>,
  Mutation: $PropertyType<MutationResolvers<T>, 'Type'>,
  Post: $PropertyType<PostResolvers<T>, 'Type'>,
  User: $PropertyType<UserResolvers<T>, 'Type'>,
}
