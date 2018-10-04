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

declare module 'QueryResolvers' {
  // Type for GraphQL type
  declare type FeedType<T> = (
    parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>[]

  // Type for GraphQL type
  declare type DraftsType<T> = (
    parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>[]

  // Type for argument
  declare type ArgsPost = {
    id: string,
  }

  // Type for GraphQL type
  declare type PostType<T> = (
    parent: $PropertyType<T & ITypeMap, 'QueryParent'>,
    args: ArgsPost,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'> | null

  declare type Type = {
    feed: FeedType,
    drafts: DraftsType,
    post: PostType,
  }

  declare module.exports: {
    feed: FeedType,
    drafts: DraftsType,
    post: PostType,
  }
}

declare module 'MutationResolvers' {
  // Type for argument
  declare type ArgsCreateDraft = {
    title: string,
    content: string,
    authorEmail: string,
  }

  // Type for GraphQL type
  declare type CreateDraftType<T> = (
    parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
    args: ArgsCreateDraft,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>

  // Type for argument
  declare type ArgsDeletePost = {
    id: string,
  }

  // Type for GraphQL type
  declare type DeletePostType<T> = (
    parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
    args: ArgsDeletePost,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'> | null

  // Type for argument
  declare type ArgsPublish = {
    id: string,
  }

  // Type for GraphQL type
  declare type PublishType<T> = (
    parent: $PropertyType<T & ITypeMap, 'MutationParent'>,
    args: ArgsPublish,
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'> | null

  declare type Type = {
    createDraft: CreateDraftType,
    deletePost: DeletePostType,
    publish: PublishType,
  }

  declare module.exports: {
    createDraft: CreateDraftType,
    deletePost: DeletePostType,
    publish: PublishType,
  }
}

declare module 'PostResolvers' {
  // Type for GraphQL type
  declare type IdType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type CreatedAtType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type UpdatedAtType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type IsPublishedType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => boolean

  // Type for GraphQL type
  declare type TitleType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type ContentType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type AuthorType<T> = (
    parent: $PropertyType<T & ITypeMap, 'PostParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'UserParent'>

  declare type Type = {
    id: IdType,
    createdAt: CreatedAtType,
    updatedAt: UpdatedAtType,
    isPublished: IsPublishedType,
    title: TitleType,
    content: ContentType,
    author: AuthorType,
  }

  declare module.exports: {
    id: IdType,
    createdAt: CreatedAtType,
    updatedAt: UpdatedAtType,
    isPublished: IsPublishedType,
    title: TitleType,
    content: ContentType,
    author: AuthorType,
  }
}

declare module 'UserResolvers' {
  // Type for GraphQL type
  declare type IdType<T> = (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type EmailType<T> = (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type NameType<T> = (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => string

  // Type for GraphQL type
  declare type PostsType<T> = (
    parent: $PropertyType<T & ITypeMap, 'UserParent'>,
    args: {},
    ctx: $PropertyType<T & ITypeMap, 'Context'>,
    info: GraphQLResolveInfo,
  ) => $PropertyType<T & ITypeMap, 'PostParent'>[]

  declare type Type = {
    id: IdType,
    email: EmailType,
    name: NameType,
    posts: PostsType,
  }

  declare module.exports: {
    id: IdType,
    email: EmailType,
    name: NameType,
    posts: PostsType,
  }
}

declare type IResolvers<T> = {
  Query: QueryResolvers.Type<T & ITypeMap>,
  Mutation: MutationResolvers.Type<T & ITypeMap>,
  Post: PostResolvers.Type<T & ITypeMap>,
  User: UserResolvers.Type<T & ITypeMap>,
}
