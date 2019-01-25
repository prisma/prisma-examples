// GENERATED TYPES FOR PRISMA PLUGIN. /!\ DO NOT EDIT MANUALLY

import {
  ArgDefinition,
  ContextValue,
  RootValue,
} from 'nexus/dist/types'
import { GraphQLResolveInfo } from 'graphql'

import * as prisma from './prisma-client'

// Types for Query

type QueryObject =
  | QueryFields
  | { name: 'post', args?: QueryPostArgs[] | false, alias?: string  } 
  | { name: 'posts', args?: QueryPostsArgs[] | false, alias?: string  } 
  | { name: 'postsConnection', args?: QueryPostsConnectionArgs[] | false, alias?: string  } 
  | { name: 'user', args?: QueryUserArgs[] | false, alias?: string  } 
  | { name: 'users', args?: QueryUsersArgs[] | false, alias?: string  } 
  | { name: 'usersConnection', args?: QueryUsersConnectionArgs[] | false, alias?: string  } 
  | { name: 'node', args?: QueryNodeArgs[] | false, alias?: string  } 

type QueryFields =
  | 'post'
  | 'posts'
  | 'postsConnection'
  | 'user'
  | 'users'
  | 'usersConnection'
  | 'node'


type QueryPostArgs =
  | 'where'
type QueryPostsArgs =
  | 'where'
  | 'orderBy'
  | 'skip'
  | 'after'
  | 'before'
  | 'first'
  | 'last'
type QueryPostsConnectionArgs =
  | 'where'
  | 'orderBy'
  | 'skip'
  | 'after'
  | 'before'
  | 'first'
  | 'last'
type QueryUserArgs =
  | 'where'
type QueryUsersArgs =
  | 'where'
  | 'orderBy'
  | 'skip'
  | 'after'
  | 'before'
  | 'first'
  | 'last'
type QueryUsersConnectionArgs =
  | 'where'
  | 'orderBy'
  | 'skip'
  | 'after'
  | 'before'
  | 'first'
  | 'last'
type QueryNodeArgs =
  | 'id'
  

export interface QueryFieldDetails<GenTypes = GraphQLNexusGen> {
  post: {
    args: Record<QueryPostArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { where: PostWhereUniqueInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post | null> | prisma.Post | null;
  }
  posts: {
    args: Record<QueryPostsArgs, ArgDefinition>
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { where?: PostWhereInput | null, orderBy?: prisma.PostOrderByInput | null, skip?: number | null, after?: string | null, before?: string | null, first?: number | null, last?: number | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post[]> | prisma.Post[];
  }
  postsConnection: {
    args: Record<QueryPostsConnectionArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { where?: PostWhereInput | null, orderBy?: prisma.PostOrderByInput | null, skip?: number | null, after?: string | null, before?: string | null, first?: number | null, last?: number | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.PostConnection> | prisma.PostConnection;
  }
  user: {
    args: Record<QueryUserArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { where: UserWhereUniqueInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User | null> | prisma.User | null;
  }
  users: {
    args: Record<QueryUsersArgs, ArgDefinition>
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { where?: UserWhereInput | null, orderBy?: prisma.UserOrderByInput | null, skip?: number | null, after?: string | null, before?: string | null, first?: number | null, last?: number | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User[]> | prisma.User[];
  }
  usersConnection: {
    args: Record<QueryUsersConnectionArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { where?: UserWhereInput | null, orderBy?: prisma.UserOrderByInput | null, skip?: number | null, after?: string | null, before?: string | null, first?: number | null, last?: number | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.UserConnection> | prisma.UserConnection;
  }
  node: {
    args: Record<QueryNodeArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Query">,
      args: { id: string }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Node | null> | prisma.Node | null;
  }
}
  

// Types for Post

type PostObject =
  | PostFields
  | { name: 'id', args?: [] | false, alias?: string  } 
  | { name: 'createdAt', args?: [] | false, alias?: string  } 
  | { name: 'updatedAt', args?: [] | false, alias?: string  } 
  | { name: 'published', args?: [] | false, alias?: string  } 
  | { name: 'title', args?: [] | false, alias?: string  } 
  | { name: 'content', args?: [] | false, alias?: string  } 
  | { name: 'author', args?: [] | false, alias?: string  } 

type PostFields =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'published'
  | 'title'
  | 'content'
  | 'author'



  

export interface PostFieldDetails<GenTypes = GraphQLNexusGen> {
  id: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  createdAt: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  updatedAt: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  published: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<boolean> | boolean;
  }
  title: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  content: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string | null> | string | null;
  }
  author: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Post">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User> | prisma.User;
  }
}
  

// Types for User

type UserObject =
  | UserFields
  | { name: 'id', args?: [] | false, alias?: string  } 
  | { name: 'email', args?: [] | false, alias?: string  } 
  | { name: 'name', args?: [] | false, alias?: string  } 
  | { name: 'posts', args?: UserPostsArgs[] | false, alias?: string  } 

type UserFields =
  | 'id'
  | 'email'
  | 'name'
  | 'posts'


type UserPostsArgs =
  | 'where'
  | 'orderBy'
  | 'skip'
  | 'after'
  | 'before'
  | 'first'
  | 'last'
  

export interface UserFieldDetails<GenTypes = GraphQLNexusGen> {
  id: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "User">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  email: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "User">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  name: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "User">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string | null> | string | null;
  }
  posts: {
    args: Record<UserPostsArgs, ArgDefinition>
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "User">,
      args: { where?: PostWhereInput | null, orderBy?: prisma.PostOrderByInput | null, skip?: number | null, after?: string | null, before?: string | null, first?: number | null, last?: number | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post[]> | prisma.Post[];
  }
}
  

// Types for PostConnection

type PostConnectionObject =
  | PostConnectionFields
  | { name: 'pageInfo', args?: [] | false, alias?: string  } 
  | { name: 'edges', args?: [] | false, alias?: string  } 
  | { name: 'aggregate', args?: [] | false, alias?: string  } 

type PostConnectionFields =
  | 'pageInfo'
  | 'edges'
  | 'aggregate'



  

export interface PostConnectionFieldDetails<GenTypes = GraphQLNexusGen> {
  pageInfo: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostConnection">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.PageInfo> | prisma.PageInfo;
  }
  edges: {
    args: {}
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostConnection">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.PostEdge[]> | prisma.PostEdge[];
  }
  aggregate: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostConnection">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.AggregatePost> | prisma.AggregatePost;
  }
}
  

// Types for PageInfo

type PageInfoObject =
  | PageInfoFields
  | { name: 'hasNextPage', args?: [] | false, alias?: string  } 
  | { name: 'hasPreviousPage', args?: [] | false, alias?: string  } 
  | { name: 'startCursor', args?: [] | false, alias?: string  } 
  | { name: 'endCursor', args?: [] | false, alias?: string  } 

type PageInfoFields =
  | 'hasNextPage'
  | 'hasPreviousPage'
  | 'startCursor'
  | 'endCursor'



  

export interface PageInfoFieldDetails<GenTypes = GraphQLNexusGen> {
  hasNextPage: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PageInfo">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<boolean> | boolean;
  }
  hasPreviousPage: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PageInfo">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<boolean> | boolean;
  }
  startCursor: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "PageInfo">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string | null> | string | null;
  }
  endCursor: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "PageInfo">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string | null> | string | null;
  }
}
  

// Types for PostEdge

type PostEdgeObject =
  | PostEdgeFields
  | { name: 'node', args?: [] | false, alias?: string  } 
  | { name: 'cursor', args?: [] | false, alias?: string  } 

type PostEdgeFields =
  | 'node'
  | 'cursor'



  

export interface PostEdgeFieldDetails<GenTypes = GraphQLNexusGen> {
  node: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostEdge">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post> | prisma.Post;
  }
  cursor: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostEdge">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
}
  

// Types for AggregatePost

type AggregatePostObject =
  | AggregatePostFields
  | { name: 'count', args?: [] | false, alias?: string  } 

type AggregatePostFields =
  | 'count'



  

export interface AggregatePostFieldDetails<GenTypes = GraphQLNexusGen> {
  count: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "AggregatePost">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<number> | number;
  }
}
  

// Types for UserConnection

type UserConnectionObject =
  | UserConnectionFields
  | { name: 'pageInfo', args?: [] | false, alias?: string  } 
  | { name: 'edges', args?: [] | false, alias?: string  } 
  | { name: 'aggregate', args?: [] | false, alias?: string  } 

type UserConnectionFields =
  | 'pageInfo'
  | 'edges'
  | 'aggregate'



  

export interface UserConnectionFieldDetails<GenTypes = GraphQLNexusGen> {
  pageInfo: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserConnection">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.PageInfo> | prisma.PageInfo;
  }
  edges: {
    args: {}
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserConnection">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.UserEdge[]> | prisma.UserEdge[];
  }
  aggregate: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserConnection">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.AggregateUser> | prisma.AggregateUser;
  }
}
  

// Types for UserEdge

type UserEdgeObject =
  | UserEdgeFields
  | { name: 'node', args?: [] | false, alias?: string  } 
  | { name: 'cursor', args?: [] | false, alias?: string  } 

type UserEdgeFields =
  | 'node'
  | 'cursor'



  

export interface UserEdgeFieldDetails<GenTypes = GraphQLNexusGen> {
  node: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserEdge">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User> | prisma.User;
  }
  cursor: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserEdge">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
}
  

// Types for AggregateUser

type AggregateUserObject =
  | AggregateUserFields
  | { name: 'count', args?: [] | false, alias?: string  } 

type AggregateUserFields =
  | 'count'



  

export interface AggregateUserFieldDetails<GenTypes = GraphQLNexusGen> {
  count: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "AggregateUser">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<number> | number;
  }
}
  

// Types for Mutation

type MutationObject =
  | MutationFields
  | { name: 'createPost', args?: MutationCreatePostArgs[] | false, alias?: string  } 
  | { name: 'updatePost', args?: MutationUpdatePostArgs[] | false, alias?: string  } 
  | { name: 'updateManyPosts', args?: MutationUpdateManyPostsArgs[] | false, alias?: string  } 
  | { name: 'upsertPost', args?: MutationUpsertPostArgs[] | false, alias?: string  } 
  | { name: 'deletePost', args?: MutationDeletePostArgs[] | false, alias?: string  } 
  | { name: 'deleteManyPosts', args?: MutationDeleteManyPostsArgs[] | false, alias?: string  } 
  | { name: 'createUser', args?: MutationCreateUserArgs[] | false, alias?: string  } 
  | { name: 'updateUser', args?: MutationUpdateUserArgs[] | false, alias?: string  } 
  | { name: 'updateManyUsers', args?: MutationUpdateManyUsersArgs[] | false, alias?: string  } 
  | { name: 'upsertUser', args?: MutationUpsertUserArgs[] | false, alias?: string  } 
  | { name: 'deleteUser', args?: MutationDeleteUserArgs[] | false, alias?: string  } 
  | { name: 'deleteManyUsers', args?: MutationDeleteManyUsersArgs[] | false, alias?: string  } 

type MutationFields =
  | 'createPost'
  | 'updatePost'
  | 'updateManyPosts'
  | 'upsertPost'
  | 'deletePost'
  | 'deleteManyPosts'
  | 'createUser'
  | 'updateUser'
  | 'updateManyUsers'
  | 'upsertUser'
  | 'deleteUser'
  | 'deleteManyUsers'


type MutationCreatePostArgs =
  | 'data'
type MutationUpdatePostArgs =
  | 'data'
  | 'where'
type MutationUpdateManyPostsArgs =
  | 'data'
  | 'where'
type MutationUpsertPostArgs =
  | 'where'
  | 'create'
  | 'update'
type MutationDeletePostArgs =
  | 'where'
type MutationDeleteManyPostsArgs =
  | 'where'
type MutationCreateUserArgs =
  | 'data'
type MutationUpdateUserArgs =
  | 'data'
  | 'where'
type MutationUpdateManyUsersArgs =
  | 'data'
  | 'where'
type MutationUpsertUserArgs =
  | 'where'
  | 'create'
  | 'update'
type MutationDeleteUserArgs =
  | 'where'
type MutationDeleteManyUsersArgs =
  | 'where'
  

export interface MutationFieldDetails<GenTypes = GraphQLNexusGen> {
  createPost: {
    args: Record<MutationCreatePostArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { data: PostCreateInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post> | prisma.Post;
  }
  updatePost: {
    args: Record<MutationUpdatePostArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { data: PostUpdateInput, where: PostWhereUniqueInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post | null> | prisma.Post | null;
  }
  updateManyPosts: {
    args: Record<MutationUpdateManyPostsArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { data: PostUpdateManyMutationInput, where?: PostWhereInput | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.BatchPayload> | prisma.BatchPayload;
  }
  upsertPost: {
    args: Record<MutationUpsertPostArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { where: PostWhereUniqueInput, create: PostCreateInput, update: PostUpdateInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post> | prisma.Post;
  }
  deletePost: {
    args: Record<MutationDeletePostArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { where: PostWhereUniqueInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post | null> | prisma.Post | null;
  }
  deleteManyPosts: {
    args: Record<MutationDeleteManyPostsArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { where?: PostWhereInput | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.BatchPayload> | prisma.BatchPayload;
  }
  createUser: {
    args: Record<MutationCreateUserArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { data: UserCreateInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User> | prisma.User;
  }
  updateUser: {
    args: Record<MutationUpdateUserArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { data: UserUpdateInput, where: UserWhereUniqueInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User | null> | prisma.User | null;
  }
  updateManyUsers: {
    args: Record<MutationUpdateManyUsersArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { data: UserUpdateManyMutationInput, where?: UserWhereInput | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.BatchPayload> | prisma.BatchPayload;
  }
  upsertUser: {
    args: Record<MutationUpsertUserArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User> | prisma.User;
  }
  deleteUser: {
    args: Record<MutationDeleteUserArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { where: UserWhereUniqueInput }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User | null> | prisma.User | null;
  }
  deleteManyUsers: {
    args: Record<MutationDeleteManyUsersArgs, ArgDefinition>
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "Mutation">,
      args: { where?: UserWhereInput | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.BatchPayload> | prisma.BatchPayload;
  }
}
  

// Types for BatchPayload

type BatchPayloadObject =
  | BatchPayloadFields
  | { name: 'count', args?: [] | false, alias?: string  } 

type BatchPayloadFields =
  | 'count'



  

export interface BatchPayloadFieldDetails<GenTypes = GraphQLNexusGen> {
  count: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "BatchPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<undefined> | undefined;
  }
}
  

// Types for Subscription

type SubscriptionObject =
  | SubscriptionFields
  | { name: 'post', args?: SubscriptionPostArgs[] | false, alias?: string  } 
  | { name: 'user', args?: SubscriptionUserArgs[] | false, alias?: string  } 

type SubscriptionFields =
  | 'post'
  | 'user'


type SubscriptionPostArgs =
  | 'where'
type SubscriptionUserArgs =
  | 'where'
  

export interface SubscriptionFieldDetails<GenTypes = GraphQLNexusGen> {
  post: {
    args: Record<SubscriptionPostArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Subscription">,
      args: { where?: PostSubscriptionWhereInput | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.PostSubscriptionPayload | null> | prisma.PostSubscriptionPayload | null;
  }
  user: {
    args: Record<SubscriptionUserArgs, ArgDefinition>
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "Subscription">,
      args: { where?: UserSubscriptionWhereInput | null }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.UserSubscriptionPayload | null> | prisma.UserSubscriptionPayload | null;
  }
}
  

// Types for PostSubscriptionPayload

type PostSubscriptionPayloadObject =
  | PostSubscriptionPayloadFields
  | { name: 'mutation', args?: [] | false, alias?: string  } 
  | { name: 'node', args?: [] | false, alias?: string  } 
  | { name: 'updatedFields', args?: [] | false, alias?: string  } 
  | { name: 'previousValues', args?: [] | false, alias?: string  } 

type PostSubscriptionPayloadFields =
  | 'mutation'
  | 'node'
  | 'updatedFields'
  | 'previousValues'



  

export interface PostSubscriptionPayloadFieldDetails<GenTypes = GraphQLNexusGen> {
  mutation: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.MutationType> | prisma.MutationType;
  }
  node: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "PostSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.Post | null> | prisma.Post | null;
  }
  updatedFields: {
    args: {}
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string[]> | string[];
  }
  previousValues: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "PostSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.PostPreviousValues | null> | prisma.PostPreviousValues | null;
  }
}
  

// Types for PostPreviousValues

type PostPreviousValuesObject =
  | PostPreviousValuesFields
  | { name: 'id', args?: [] | false, alias?: string  } 
  | { name: 'createdAt', args?: [] | false, alias?: string  } 
  | { name: 'updatedAt', args?: [] | false, alias?: string  } 
  | { name: 'published', args?: [] | false, alias?: string  } 
  | { name: 'title', args?: [] | false, alias?: string  } 
  | { name: 'content', args?: [] | false, alias?: string  } 

type PostPreviousValuesFields =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'published'
  | 'title'
  | 'content'



  

export interface PostPreviousValuesFieldDetails<GenTypes = GraphQLNexusGen> {
  id: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  createdAt: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  updatedAt: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  published: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<boolean> | boolean;
  }
  title: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "PostPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  content: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "PostPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string | null> | string | null;
  }
}
  

// Types for UserSubscriptionPayload

type UserSubscriptionPayloadObject =
  | UserSubscriptionPayloadFields
  | { name: 'mutation', args?: [] | false, alias?: string  } 
  | { name: 'node', args?: [] | false, alias?: string  } 
  | { name: 'updatedFields', args?: [] | false, alias?: string  } 
  | { name: 'previousValues', args?: [] | false, alias?: string  } 

type UserSubscriptionPayloadFields =
  | 'mutation'
  | 'node'
  | 'updatedFields'
  | 'previousValues'



  

export interface UserSubscriptionPayloadFieldDetails<GenTypes = GraphQLNexusGen> {
  mutation: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.MutationType> | prisma.MutationType;
  }
  node: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "UserSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.User | null> | prisma.User | null;
  }
  updatedFields: {
    args: {}
    description: string
    list: true
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string[]> | string[];
  }
  previousValues: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "UserSubscriptionPayload">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<prisma.UserPreviousValues | null> | prisma.UserPreviousValues | null;
  }
}
  

// Types for UserPreviousValues

type UserPreviousValuesObject =
  | UserPreviousValuesFields
  | { name: 'id', args?: [] | false, alias?: string  } 
  | { name: 'email', args?: [] | false, alias?: string  } 
  | { name: 'name', args?: [] | false, alias?: string  } 

type UserPreviousValuesFields =
  | 'id'
  | 'email'
  | 'name'



  

export interface UserPreviousValuesFieldDetails<GenTypes = GraphQLNexusGen> {
  id: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  email: {
    args: {}
    description: string
    list: false
    nullable: false
    resolve: (
      root: RootValue<GenTypes, "UserPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string> | string;
  }
  name: {
    args: {}
    description: string
    list: false
    nullable: true
    resolve: (
      root: RootValue<GenTypes, "UserPreviousValues">,
      args: {  }  ,
      context: ContextValue<GenTypes>,
      info?: GraphQLResolveInfo
    ) => Promise<string | null> | string | null;
  }
}
  


export interface PostWhereUniqueInput {
  id?: string | null
}
  
export interface PostWhereInput {
  id?: string | null
  id_not?: string | null
  id_in: string[]
  id_not_in: string[]
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  createdAt?: string | null
  createdAt_not?: string | null
  createdAt_in: string[]
  createdAt_not_in: string[]
  createdAt_lt?: string | null
  createdAt_lte?: string | null
  createdAt_gt?: string | null
  createdAt_gte?: string | null
  updatedAt?: string | null
  updatedAt_not?: string | null
  updatedAt_in: string[]
  updatedAt_not_in: string[]
  updatedAt_lt?: string | null
  updatedAt_lte?: string | null
  updatedAt_gt?: string | null
  updatedAt_gte?: string | null
  published?: boolean | null
  published_not?: boolean | null
  title?: string | null
  title_not?: string | null
  title_in: string[]
  title_not_in: string[]
  title_lt?: string | null
  title_lte?: string | null
  title_gt?: string | null
  title_gte?: string | null
  title_contains?: string | null
  title_not_contains?: string | null
  title_starts_with?: string | null
  title_not_starts_with?: string | null
  title_ends_with?: string | null
  title_not_ends_with?: string | null
  content?: string | null
  content_not?: string | null
  content_in: string[]
  content_not_in: string[]
  content_lt?: string | null
  content_lte?: string | null
  content_gt?: string | null
  content_gte?: string | null
  content_contains?: string | null
  content_not_contains?: string | null
  content_starts_with?: string | null
  content_not_starts_with?: string | null
  content_ends_with?: string | null
  content_not_ends_with?: string | null
  author?: UserWhereInput | null
  AND: PostWhereInput[]
  OR: PostWhereInput[]
  NOT: PostWhereInput[]
}
  
export interface UserWhereInput {
  id?: string | null
  id_not?: string | null
  id_in: string[]
  id_not_in: string[]
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  email?: string | null
  email_not?: string | null
  email_in: string[]
  email_not_in: string[]
  email_lt?: string | null
  email_lte?: string | null
  email_gt?: string | null
  email_gte?: string | null
  email_contains?: string | null
  email_not_contains?: string | null
  email_starts_with?: string | null
  email_not_starts_with?: string | null
  email_ends_with?: string | null
  email_not_ends_with?: string | null
  name?: string | null
  name_not?: string | null
  name_in: string[]
  name_not_in: string[]
  name_lt?: string | null
  name_lte?: string | null
  name_gt?: string | null
  name_gte?: string | null
  name_contains?: string | null
  name_not_contains?: string | null
  name_starts_with?: string | null
  name_not_starts_with?: string | null
  name_ends_with?: string | null
  name_not_ends_with?: string | null
  posts_every?: PostWhereInput | null
  posts_some?: PostWhereInput | null
  posts_none?: PostWhereInput | null
  AND: UserWhereInput[]
  OR: UserWhereInput[]
  NOT: UserWhereInput[]
}
  
export interface UserWhereUniqueInput {
  id?: string | null
  email?: string | null
}
  
export interface PostCreateInput {
  published?: boolean | null
  title: string
  content?: string | null
  author: UserCreateOneWithoutPostsInput
}
  
export interface UserCreateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput | null
  connect?: UserWhereUniqueInput | null
}
  
export interface UserCreateWithoutPostsInput {
  email: string
  name?: string | null
}
  
export interface PostUpdateInput {
  published?: boolean | null
  title?: string | null
  content?: string | null
  author?: UserUpdateOneRequiredWithoutPostsInput | null
}
  
export interface UserUpdateOneRequiredWithoutPostsInput {
  create?: UserCreateWithoutPostsInput | null
  update?: UserUpdateWithoutPostsDataInput | null
  upsert?: UserUpsertWithoutPostsInput | null
  connect?: UserWhereUniqueInput | null
}
  
export interface UserUpdateWithoutPostsDataInput {
  email?: string | null
  name?: string | null
}
  
export interface UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}
  
export interface PostUpdateManyMutationInput {
  published?: boolean | null
  title?: string | null
  content?: string | null
}
  
export interface UserCreateInput {
  email: string
  name?: string | null
  posts?: PostCreateManyWithoutAuthorInput | null
}
  
export interface PostCreateManyWithoutAuthorInput {
  create: PostCreateWithoutAuthorInput[]
  connect: PostWhereUniqueInput[]
}
  
export interface PostCreateWithoutAuthorInput {
  published?: boolean | null
  title: string
  content?: string | null
}
  
export interface UserUpdateInput {
  email?: string | null
  name?: string | null
  posts?: PostUpdateManyWithoutAuthorInput | null
}
  
export interface PostUpdateManyWithoutAuthorInput {
  create: PostCreateWithoutAuthorInput[]
  delete: PostWhereUniqueInput[]
  connect: PostWhereUniqueInput[]
  disconnect: PostWhereUniqueInput[]
  update: PostUpdateWithWhereUniqueWithoutAuthorInput[]
  upsert: PostUpsertWithWhereUniqueWithoutAuthorInput[]
  deleteMany: PostScalarWhereInput[]
  updateMany: PostUpdateManyWithWhereNestedInput[]
}
  
export interface PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}
  
export interface PostUpdateWithoutAuthorDataInput {
  published?: boolean | null
  title?: string | null
  content?: string | null
}
  
export interface PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}
  
export interface PostScalarWhereInput {
  id?: string | null
  id_not?: string | null
  id_in: string[]
  id_not_in: string[]
  id_lt?: string | null
  id_lte?: string | null
  id_gt?: string | null
  id_gte?: string | null
  id_contains?: string | null
  id_not_contains?: string | null
  id_starts_with?: string | null
  id_not_starts_with?: string | null
  id_ends_with?: string | null
  id_not_ends_with?: string | null
  createdAt?: string | null
  createdAt_not?: string | null
  createdAt_in: string[]
  createdAt_not_in: string[]
  createdAt_lt?: string | null
  createdAt_lte?: string | null
  createdAt_gt?: string | null
  createdAt_gte?: string | null
  updatedAt?: string | null
  updatedAt_not?: string | null
  updatedAt_in: string[]
  updatedAt_not_in: string[]
  updatedAt_lt?: string | null
  updatedAt_lte?: string | null
  updatedAt_gt?: string | null
  updatedAt_gte?: string | null
  published?: boolean | null
  published_not?: boolean | null
  title?: string | null
  title_not?: string | null
  title_in: string[]
  title_not_in: string[]
  title_lt?: string | null
  title_lte?: string | null
  title_gt?: string | null
  title_gte?: string | null
  title_contains?: string | null
  title_not_contains?: string | null
  title_starts_with?: string | null
  title_not_starts_with?: string | null
  title_ends_with?: string | null
  title_not_ends_with?: string | null
  content?: string | null
  content_not?: string | null
  content_in: string[]
  content_not_in: string[]
  content_lt?: string | null
  content_lte?: string | null
  content_gt?: string | null
  content_gte?: string | null
  content_contains?: string | null
  content_not_contains?: string | null
  content_starts_with?: string | null
  content_not_starts_with?: string | null
  content_ends_with?: string | null
  content_not_ends_with?: string | null
  AND: PostScalarWhereInput[]
  OR: PostScalarWhereInput[]
  NOT: PostScalarWhereInput[]
}
  
export interface PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}
  
export interface PostUpdateManyDataInput {
  published?: boolean | null
  title?: string | null
  content?: string | null
}
  
export interface UserUpdateManyMutationInput {
  email?: string | null
  name?: string | null
}
  
export interface PostSubscriptionWhereInput {
  mutation_in: prisma.MutationType[]
  updatedFields_contains?: string | null
  updatedFields_contains_every: string[]
  updatedFields_contains_some: string[]
  node?: PostWhereInput | null
  AND: PostSubscriptionWhereInput[]
  OR: PostSubscriptionWhereInput[]
  NOT: PostSubscriptionWhereInput[]
}
  
export interface UserSubscriptionWhereInput {
  mutation_in: prisma.MutationType[]
  updatedFields_contains?: string | null
  updatedFields_contains_every: string[]
  updatedFields_contains_some: string[]
  node?: UserWhereInput | null
  AND: UserSubscriptionWhereInput[]
  OR: UserSubscriptionWhereInput[]
  NOT: UserSubscriptionWhereInput[]
}
  

export type enumTypesNames =
  | 'PostOrderByInput'
  | 'UserOrderByInput'
  | 'MutationType'
  

export interface PluginTypes {
  fields: {
    Query: QueryObject
    Post: PostObject
    User: UserObject
    PostConnection: PostConnectionObject
    PageInfo: PageInfoObject
    PostEdge: PostEdgeObject
    AggregatePost: AggregatePostObject
    UserConnection: UserConnectionObject
    UserEdge: UserEdgeObject
    AggregateUser: AggregateUserObject
    Mutation: MutationObject
    BatchPayload: BatchPayloadObject
    Subscription: SubscriptionObject
    PostSubscriptionPayload: PostSubscriptionPayloadObject
    PostPreviousValues: PostPreviousValuesObject
    UserSubscriptionPayload: UserSubscriptionPayloadObject
    UserPreviousValues: UserPreviousValuesObject
  }
  fieldsDetails: {
    Query: QueryFieldDetails
    Post: PostFieldDetails
    User: UserFieldDetails
    PostConnection: PostConnectionFieldDetails
    PageInfo: PageInfoFieldDetails
    PostEdge: PostEdgeFieldDetails
    AggregatePost: AggregatePostFieldDetails
    UserConnection: UserConnectionFieldDetails
    UserEdge: UserEdgeFieldDetails
    AggregateUser: AggregateUserFieldDetails
    Mutation: MutationFieldDetails
    BatchPayload: BatchPayloadFieldDetails
    Subscription: SubscriptionFieldDetails
    PostSubscriptionPayload: PostSubscriptionPayloadFieldDetails
    PostPreviousValues: PostPreviousValuesFieldDetails
    UserSubscriptionPayload: UserSubscriptionPayloadFieldDetails
    UserPreviousValues: UserPreviousValuesFieldDetails
  }
  enumTypesNames: enumTypesNames
}

declare global {
  interface GraphQLNexusGen extends PluginTypes {}
}
  