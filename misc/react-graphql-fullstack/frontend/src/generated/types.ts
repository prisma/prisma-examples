export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>,
  not?: Maybe<Scalars['Boolean']>,
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>,
  not?: Maybe<Scalars['DateTime']>,
  in?: Maybe<Array<Scalars['DateTime']>>,
  notIn?: Maybe<Array<Scalars['DateTime']>>,
  lt?: Maybe<Scalars['DateTime']>,
  lte?: Maybe<Scalars['DateTime']>,
  gt?: Maybe<Scalars['DateTime']>,
  gte?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  signupUser: User,
  deletePost?: Maybe<Post>,
  createDraft: Post,
  publish?: Maybe<Post>,
};


export type MutationSignupUserArgs = {
  data: UserCreateInput
};


export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput
};


export type MutationCreateDraftArgs = {
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  authorEmail?: Maybe<Scalars['String']>
};


export type MutationPublishArgs = {
  id?: Maybe<Scalars['ID']>
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>,
  not?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Scalars['String']>>,
  notIn?: Maybe<Array<Scalars['String']>>,
  lt?: Maybe<Scalars['String']>,
  lte?: Maybe<Scalars['String']>,
  gt?: Maybe<Scalars['String']>,
  gte?: Maybe<Scalars['String']>,
  contains?: Maybe<Scalars['String']>,
  startsWith?: Maybe<Scalars['String']>,
  endsWith?: Maybe<Scalars['String']>,
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  published: Scalars['Boolean'],
  author?: Maybe<User>,
};

export type PostCreateManyWithoutPostsInput = {
  create?: Maybe<Array<PostCreateWithoutAuthorInput>>,
  connect?: Maybe<Array<PostWhereUniqueInput>>,
};

export type PostCreateWithoutAuthorInput = {
  id?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  published?: Maybe<Scalars['Boolean']>,
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
};

export type PostFilter = {
  every?: Maybe<PostWhereInput>,
  some?: Maybe<PostWhereInput>,
  none?: Maybe<PostWhereInput>,
};

export type PostWhereInput = {
  id?: Maybe<StringFilter>,
  createdAt?: Maybe<DateTimeFilter>,
  updatedAt?: Maybe<DateTimeFilter>,
  published?: Maybe<BooleanFilter>,
  title?: Maybe<StringFilter>,
  content?: Maybe<NullableStringFilter>,
  AND?: Maybe<Array<PostWhereInput>>,
  OR?: Maybe<Array<PostWhereInput>>,
  NOT?: Maybe<Array<PostWhereInput>>,
  author?: Maybe<UserWhereInput>,
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>,
};

export type Query = {
   __typename?: 'Query',
  post?: Maybe<Post>,
  filterPosts: Array<Post>,
  feed: Array<Post>,
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput
};


export type QueryFilterPostsArgs = {
  where?: Maybe<PostWhereInput>
};

export enum Role {
  Author = 'AUTHOR',
  Admin = 'ADMIN'
}

export type StringFilter = {
  equals?: Maybe<Scalars['String']>,
  not?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Scalars['String']>>,
  notIn?: Maybe<Array<Scalars['String']>>,
  lt?: Maybe<Scalars['String']>,
  lte?: Maybe<Scalars['String']>,
  gt?: Maybe<Scalars['String']>,
  gte?: Maybe<Scalars['String']>,
  contains?: Maybe<Scalars['String']>,
  startsWith?: Maybe<Scalars['String']>,
  endsWith?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  posts: Array<Post>,
  role: Role,
};

export type UserCreateInput = {
  id?: Maybe<Scalars['ID']>,
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  role: Role,
  posts?: Maybe<PostCreateManyWithoutPostsInput>,
};

export type UserWhereInput = {
  id?: Maybe<StringFilter>,
  email?: Maybe<StringFilter>,
  name?: Maybe<NullableStringFilter>,
  posts?: Maybe<PostFilter>,
  role?: Maybe<Role>,
  AND?: Maybe<Array<UserWhereInput>>,
  OR?: Maybe<Array<UserWhereInput>>,
  NOT?: Maybe<Array<UserWhereInput>>,
};

export type CreateDraftMutationVariables = {
  title: Scalars['String'],
  content: Scalars['String'],
  authorEmail: Scalars['String']
};


export type CreateDraftMutation = (
  { __typename?: 'Mutation' }
  & { createDraft: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content'>
  ) }
);

export type PostQueryVariables = {
  id: Scalars['ID']
};


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'published'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type PublishMutationVariables = {
  id: Scalars['ID']
};


export type PublishMutation = (
  { __typename?: 'Mutation' }
  & { publish: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'published'>
  )> }
);

export type DeletePostMutationVariables = {
  id: Scalars['ID']
};


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  )> }
);

export type DraftsQueryVariables = {};


export type DraftsQuery = (
  { __typename?: 'Query' }
  & { filterPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content' | 'title' | 'published'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type FeedQueryVariables = {};


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content' | 'title' | 'published'>
    & { author: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'role'>
    )> }
  )> }
);

export type SignupUserMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String']
};


export type SignupUserMutation = (
  { __typename?: 'Mutation' }
  & { signupUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);
