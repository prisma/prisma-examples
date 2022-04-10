import gql from 'graphql-tag';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  publish?: Maybe<Post>;
  signupUser?: Maybe<User>;
};


export type MutationCreateDraftArgs = {
  authorEmail?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationPublishArgs = {
  postId?: InputMaybe<Scalars['String']>;
};


export type MutationSignupUserArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  drafts?: Maybe<Array<Maybe<Post>>>;
  feed?: Maybe<Array<Maybe<Post>>>;
  filterPosts?: Maybe<Array<Maybe<Post>>>;
  post?: Maybe<Post>;
};


export type QueryFilterPostsArgs = {
  searchString?: InputMaybe<Scalars['String']>;
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};


export const CreateDraftMutation = gql`
    mutation CreateDraftMutation($title: String!, $content: String, $authorEmail: String!) {
  createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const Drafts = gql`
    query Drafts {
  drafts {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const Feed = gql`
    query Feed {
  feed {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const PostQuery = gql`
    query PostQuery($postId: String!) {
  post(postId: $postId) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const PublishMutation = gql`
    mutation PublishMutation($postId: String!) {
  publish(postId: $postId) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const DeleteMutation = gql`
    mutation DeleteMutation($postId: String!) {
  deletePost(postId: $postId) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export const SignupMutation = gql`
    mutation SignupMutation($name: String, $email: String!) {
  signupUser(name: $name, email: $email) {
    id
    name
    email
  }
}
    `;
export type CreateDraftMutationMutationVariables = Exact<{
  title: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  authorEmail: Scalars['String'];
}>;


export type CreateDraftMutationMutation = { __typename?: 'Mutation', createDraft?: { __typename?: 'Post', id?: number | null, title?: string | null, content?: string | null, published?: boolean | null, author?: { __typename?: 'User', id?: number | null, name?: string | null } | null } | null };

export type DraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsQuery = { __typename?: 'Query', drafts?: Array<{ __typename?: 'Post', id?: number | null, title?: string | null, content?: string | null, published?: boolean | null, author?: { __typename?: 'User', id?: number | null, name?: string | null } | null } | null> | null };

export type FeedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedQuery = { __typename?: 'Query', feed?: Array<{ __typename?: 'Post', id?: number | null, title?: string | null, content?: string | null, published?: boolean | null, author?: { __typename?: 'User', id?: number | null, name?: string | null } | null } | null> | null };

export type PostQueryQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQueryQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id?: number | null, title?: string | null, content?: string | null, published?: boolean | null, author?: { __typename?: 'User', id?: number | null, name?: string | null } | null } | null };

export type PublishMutationMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PublishMutationMutation = { __typename?: 'Mutation', publish?: { __typename?: 'Post', id?: number | null, title?: string | null, content?: string | null, published?: boolean | null, author?: { __typename?: 'User', id?: number | null, name?: string | null } | null } | null };

export type DeleteMutationMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeleteMutationMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id?: number | null, title?: string | null, content?: string | null, published?: boolean | null, author?: { __typename?: 'User', id?: number | null, name?: string | null } | null } | null };

export type SignupMutationMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
}>;


export type SignupMutationMutation = { __typename?: 'Mutation', signupUser?: { __typename?: 'User', id?: number | null, name?: string | null, email?: string | null } | null };


export const CreateDraftMutationDocument = gql`
    mutation CreateDraftMutation($title: String!, $content: String, $authorEmail: String!) {
  createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export type CreateDraftMutationMutationFn = Apollo.MutationFunction<CreateDraftMutationMutation, CreateDraftMutationMutationVariables>;

/**
 * __useCreateDraftMutationMutation__
 *
 * To run a mutation, you first call `useCreateDraftMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftMutationMutation, { data, loading, error }] = useCreateDraftMutationMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      authorEmail: // value for 'authorEmail'
 *   },
 * });
 */
export function useCreateDraftMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftMutationMutation, CreateDraftMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftMutationMutation, CreateDraftMutationMutationVariables>(CreateDraftMutationDocument, options);
      }
export type CreateDraftMutationMutationHookResult = ReturnType<typeof useCreateDraftMutationMutation>;
export type CreateDraftMutationMutationResult = Apollo.MutationResult<CreateDraftMutationMutation>;
export type CreateDraftMutationMutationOptions = Apollo.BaseMutationOptions<CreateDraftMutationMutation, CreateDraftMutationMutationVariables>;
export const DraftsDocument = gql`
    query Drafts {
  drafts {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useDraftsQuery__
 *
 * To run a query within a React component, call `useDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDraftsQuery(baseOptions?: Apollo.QueryHookOptions<DraftsQuery, DraftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftsQuery, DraftsQueryVariables>(DraftsDocument, options);
      }
export function useDraftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftsQuery, DraftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftsQuery, DraftsQueryVariables>(DraftsDocument, options);
        }
export type DraftsQueryHookResult = ReturnType<typeof useDraftsQuery>;
export type DraftsLazyQueryHookResult = ReturnType<typeof useDraftsLazyQuery>;
export type DraftsQueryResult = Apollo.QueryResult<DraftsQuery, DraftsQueryVariables>;
export const FeedDocument = gql`
    query Feed {
  feed {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const PostQueryDocument = gql`
    query PostQuery($postId: String!) {
  post(postId: $postId) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;

/**
 * __usePostQueryQuery__
 *
 * To run a query within a React component, call `usePostQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQueryQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQueryQuery(baseOptions: Apollo.QueryHookOptions<PostQueryQuery, PostQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQueryQuery, PostQueryQueryVariables>(PostQueryDocument, options);
      }
export function usePostQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQueryQuery, PostQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQueryQuery, PostQueryQueryVariables>(PostQueryDocument, options);
        }
export type PostQueryQueryHookResult = ReturnType<typeof usePostQueryQuery>;
export type PostQueryLazyQueryHookResult = ReturnType<typeof usePostQueryLazyQuery>;
export type PostQueryQueryResult = Apollo.QueryResult<PostQueryQuery, PostQueryQueryVariables>;
export const PublishMutationDocument = gql`
    mutation PublishMutation($postId: String!) {
  publish(postId: $postId) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export type PublishMutationMutationFn = Apollo.MutationFunction<PublishMutationMutation, PublishMutationMutationVariables>;

/**
 * __usePublishMutationMutation__
 *
 * To run a mutation, you first call `usePublishMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishMutationMutation, { data, loading, error }] = usePublishMutationMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePublishMutationMutation(baseOptions?: Apollo.MutationHookOptions<PublishMutationMutation, PublishMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishMutationMutation, PublishMutationMutationVariables>(PublishMutationDocument, options);
      }
export type PublishMutationMutationHookResult = ReturnType<typeof usePublishMutationMutation>;
export type PublishMutationMutationResult = Apollo.MutationResult<PublishMutationMutation>;
export type PublishMutationMutationOptions = Apollo.BaseMutationOptions<PublishMutationMutation, PublishMutationMutationVariables>;
export const DeleteMutationDocument = gql`
    mutation DeleteMutation($postId: String!) {
  deletePost(postId: $postId) {
    id
    title
    content
    published
    author {
      id
      name
    }
  }
}
    `;
export type DeleteMutationMutationFn = Apollo.MutationFunction<DeleteMutationMutation, DeleteMutationMutationVariables>;

/**
 * __useDeleteMutationMutation__
 *
 * To run a mutation, you first call `useDeleteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutationMutation, { data, loading, error }] = useDeleteMutationMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMutationMutation, DeleteMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMutationMutation, DeleteMutationMutationVariables>(DeleteMutationDocument, options);
      }
export type DeleteMutationMutationHookResult = ReturnType<typeof useDeleteMutationMutation>;
export type DeleteMutationMutationResult = Apollo.MutationResult<DeleteMutationMutation>;
export type DeleteMutationMutationOptions = Apollo.BaseMutationOptions<DeleteMutationMutation, DeleteMutationMutationVariables>;
export const SignupMutationDocument = gql`
    mutation SignupMutation($name: String, $email: String!) {
  signupUser(name: $name, email: $email) {
    id
    name
    email
  }
}
    `;
export type SignupMutationMutationFn = Apollo.MutationFunction<SignupMutationMutation, SignupMutationMutationVariables>;

/**
 * __useSignupMutationMutation__
 *
 * To run a mutation, you first call `useSignupMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutationMutation, { data, loading, error }] = useSignupMutationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignupMutationMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutationMutation, SignupMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutationMutation, SignupMutationMutationVariables>(SignupMutationDocument, options);
      }
export type SignupMutationMutationHookResult = ReturnType<typeof useSignupMutationMutation>;
export type SignupMutationMutationResult = Apollo.MutationResult<SignupMutationMutation>;
export type SignupMutationMutationOptions = Apollo.BaseMutationOptions<SignupMutationMutation, SignupMutationMutationVariables>;