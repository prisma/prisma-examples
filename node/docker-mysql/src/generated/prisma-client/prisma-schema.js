module.exports = {
  typeDefs: /* GraphQL */ `
    type AggregateComment {
      count: Int!
    }

    type AggregatePost {
      count: Int!
    }

    type AggregateUser {
      count: Int!
    }

    type BatchPayload {
      count: Long!
    }

    type Comment {
      id: ID!
      text: String!
      writtenBy: User!
    }

    type CommentConnection {
      pageInfo: PageInfo!
      edges: [CommentEdge]!
      aggregate: AggregateComment!
    }

    input CommentCreateInput {
      text: String!
      writtenBy: UserCreateOneWithoutCommentsInput!
    }

    input CommentCreateManyInput {
      create: [CommentCreateInput!]
      connect: [CommentWhereUniqueInput!]
    }

    input CommentCreateManyWithoutWrittenByInput {
      create: [CommentCreateWithoutWrittenByInput!]
      connect: [CommentWhereUniqueInput!]
    }

    input CommentCreateWithoutWrittenByInput {
      text: String!
    }

    type CommentEdge {
      node: Comment!
      cursor: String!
    }

    enum CommentOrderByInput {
      id_ASC
      id_DESC
      text_ASC
      text_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type CommentPreviousValues {
      id: ID!
      text: String!
    }

    input CommentScalarWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      text: String
      text_not: String
      text_in: [String!]
      text_not_in: [String!]
      text_lt: String
      text_lte: String
      text_gt: String
      text_gte: String
      text_contains: String
      text_not_contains: String
      text_starts_with: String
      text_not_starts_with: String
      text_ends_with: String
      text_not_ends_with: String
      AND: [CommentScalarWhereInput!]
      OR: [CommentScalarWhereInput!]
      NOT: [CommentScalarWhereInput!]
    }

    type CommentSubscriptionPayload {
      mutation: MutationType!
      node: Comment
      updatedFields: [String!]
      previousValues: CommentPreviousValues
    }

    input CommentSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: CommentWhereInput
      AND: [CommentSubscriptionWhereInput!]
      OR: [CommentSubscriptionWhereInput!]
      NOT: [CommentSubscriptionWhereInput!]
    }

    input CommentUpdateDataInput {
      text: String
      writtenBy: UserUpdateOneRequiredWithoutCommentsInput
    }

    input CommentUpdateInput {
      text: String
      writtenBy: UserUpdateOneRequiredWithoutCommentsInput
    }

    input CommentUpdateManyDataInput {
      text: String
    }

    input CommentUpdateManyInput {
      create: [CommentCreateInput!]
      update: [CommentUpdateWithWhereUniqueNestedInput!]
      upsert: [CommentUpsertWithWhereUniqueNestedInput!]
      delete: [CommentWhereUniqueInput!]
      connect: [CommentWhereUniqueInput!]
      disconnect: [CommentWhereUniqueInput!]
      deleteMany: [CommentScalarWhereInput!]
      updateMany: [CommentUpdateManyWithWhereNestedInput!]
    }

    input CommentUpdateManyMutationInput {
      text: String
    }

    input CommentUpdateManyWithoutWrittenByInput {
      create: [CommentCreateWithoutWrittenByInput!]
      delete: [CommentWhereUniqueInput!]
      connect: [CommentWhereUniqueInput!]
      disconnect: [CommentWhereUniqueInput!]
      update: [CommentUpdateWithWhereUniqueWithoutWrittenByInput!]
      upsert: [CommentUpsertWithWhereUniqueWithoutWrittenByInput!]
      deleteMany: [CommentScalarWhereInput!]
      updateMany: [CommentUpdateManyWithWhereNestedInput!]
    }

    input CommentUpdateManyWithWhereNestedInput {
      where: CommentScalarWhereInput!
      data: CommentUpdateManyDataInput!
    }

    input CommentUpdateWithoutWrittenByDataInput {
      text: String
    }

    input CommentUpdateWithWhereUniqueNestedInput {
      where: CommentWhereUniqueInput!
      data: CommentUpdateDataInput!
    }

    input CommentUpdateWithWhereUniqueWithoutWrittenByInput {
      where: CommentWhereUniqueInput!
      data: CommentUpdateWithoutWrittenByDataInput!
    }

    input CommentUpsertWithWhereUniqueNestedInput {
      where: CommentWhereUniqueInput!
      update: CommentUpdateDataInput!
      create: CommentCreateInput!
    }

    input CommentUpsertWithWhereUniqueWithoutWrittenByInput {
      where: CommentWhereUniqueInput!
      update: CommentUpdateWithoutWrittenByDataInput!
      create: CommentCreateWithoutWrittenByInput!
    }

    input CommentWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      text: String
      text_not: String
      text_in: [String!]
      text_not_in: [String!]
      text_lt: String
      text_lte: String
      text_gt: String
      text_gte: String
      text_contains: String
      text_not_contains: String
      text_starts_with: String
      text_not_starts_with: String
      text_ends_with: String
      text_not_ends_with: String
      writtenBy: UserWhereInput
      AND: [CommentWhereInput!]
      OR: [CommentWhereInput!]
      NOT: [CommentWhereInput!]
    }

    input CommentWhereUniqueInput {
      id: ID
    }

    scalar DateTime

    scalar Long

    type Mutation {
      createComment(data: CommentCreateInput!): Comment!
      updateComment(
        data: CommentUpdateInput!
        where: CommentWhereUniqueInput!
      ): Comment
      updateManyComments(
        data: CommentUpdateManyMutationInput!
        where: CommentWhereInput
      ): BatchPayload!
      upsertComment(
        where: CommentWhereUniqueInput!
        create: CommentCreateInput!
        update: CommentUpdateInput!
      ): Comment!
      deleteComment(where: CommentWhereUniqueInput!): Comment
      deleteManyComments(where: CommentWhereInput): BatchPayload!
      createPost(data: PostCreateInput!): Post!
      updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
      updateManyPosts(
        data: PostUpdateManyMutationInput!
        where: PostWhereInput
      ): BatchPayload!
      upsertPost(
        where: PostWhereUniqueInput!
        create: PostCreateInput!
        update: PostUpdateInput!
      ): Post!
      deletePost(where: PostWhereUniqueInput!): Post
      deleteManyPosts(where: PostWhereInput): BatchPayload!
      createUser(data: UserCreateInput!): User!
      updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
      updateManyUsers(
        data: UserUpdateManyMutationInput!
        where: UserWhereInput
      ): BatchPayload!
      upsertUser(
        where: UserWhereUniqueInput!
        create: UserCreateInput!
        update: UserUpdateInput!
      ): User!
      deleteUser(where: UserWhereUniqueInput!): User
      deleteManyUsers(where: UserWhereInput): BatchPayload!
    }

    enum MutationType {
      CREATED
      UPDATED
      DELETED
    }

    interface Node {
      id: ID!
    }

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }

    type Post {
      id: ID!
      createdAt: DateTime!
      updatedAt: DateTime!
      title: String!
      content: String
      published: Boolean!
      author: User!
      comments(
        where: CommentWhereInput
        orderBy: CommentOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Comment!]
    }

    type PostConnection {
      pageInfo: PageInfo!
      edges: [PostEdge]!
      aggregate: AggregatePost!
    }

    input PostCreateInput {
      title: String!
      content: String
      published: Boolean
      author: UserCreateOneWithoutPostsInput!
      comments: CommentCreateManyInput
    }

    input PostCreateManyWithoutAuthorInput {
      create: [PostCreateWithoutAuthorInput!]
      connect: [PostWhereUniqueInput!]
    }

    input PostCreateWithoutAuthorInput {
      title: String!
      content: String
      published: Boolean
      comments: CommentCreateManyInput
    }

    type PostEdge {
      node: Post!
      cursor: String!
    }

    enum PostOrderByInput {
      id_ASC
      id_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
      title_ASC
      title_DESC
      content_ASC
      content_DESC
      published_ASC
      published_DESC
    }

    type PostPreviousValues {
      id: ID!
      createdAt: DateTime!
      updatedAt: DateTime!
      title: String!
      content: String
      published: Boolean!
    }

    input PostScalarWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      title: String
      title_not: String
      title_in: [String!]
      title_not_in: [String!]
      title_lt: String
      title_lte: String
      title_gt: String
      title_gte: String
      title_contains: String
      title_not_contains: String
      title_starts_with: String
      title_not_starts_with: String
      title_ends_with: String
      title_not_ends_with: String
      content: String
      content_not: String
      content_in: [String!]
      content_not_in: [String!]
      content_lt: String
      content_lte: String
      content_gt: String
      content_gte: String
      content_contains: String
      content_not_contains: String
      content_starts_with: String
      content_not_starts_with: String
      content_ends_with: String
      content_not_ends_with: String
      published: Boolean
      published_not: Boolean
      AND: [PostScalarWhereInput!]
      OR: [PostScalarWhereInput!]
      NOT: [PostScalarWhereInput!]
    }

    type PostSubscriptionPayload {
      mutation: MutationType!
      node: Post
      updatedFields: [String!]
      previousValues: PostPreviousValues
    }

    input PostSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: PostWhereInput
      AND: [PostSubscriptionWhereInput!]
      OR: [PostSubscriptionWhereInput!]
      NOT: [PostSubscriptionWhereInput!]
    }

    input PostUpdateInput {
      title: String
      content: String
      published: Boolean
      author: UserUpdateOneRequiredWithoutPostsInput
      comments: CommentUpdateManyInput
    }

    input PostUpdateManyDataInput {
      title: String
      content: String
      published: Boolean
    }

    input PostUpdateManyMutationInput {
      title: String
      content: String
      published: Boolean
    }

    input PostUpdateManyWithoutAuthorInput {
      create: [PostCreateWithoutAuthorInput!]
      delete: [PostWhereUniqueInput!]
      connect: [PostWhereUniqueInput!]
      disconnect: [PostWhereUniqueInput!]
      update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
      upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
      deleteMany: [PostScalarWhereInput!]
      updateMany: [PostUpdateManyWithWhereNestedInput!]
    }

    input PostUpdateManyWithWhereNestedInput {
      where: PostScalarWhereInput!
      data: PostUpdateManyDataInput!
    }

    input PostUpdateWithoutAuthorDataInput {
      title: String
      content: String
      published: Boolean
      comments: CommentUpdateManyInput
    }

    input PostUpdateWithWhereUniqueWithoutAuthorInput {
      where: PostWhereUniqueInput!
      data: PostUpdateWithoutAuthorDataInput!
    }

    input PostUpsertWithWhereUniqueWithoutAuthorInput {
      where: PostWhereUniqueInput!
      update: PostUpdateWithoutAuthorDataInput!
      create: PostCreateWithoutAuthorInput!
    }

    input PostWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      title: String
      title_not: String
      title_in: [String!]
      title_not_in: [String!]
      title_lt: String
      title_lte: String
      title_gt: String
      title_gte: String
      title_contains: String
      title_not_contains: String
      title_starts_with: String
      title_not_starts_with: String
      title_ends_with: String
      title_not_ends_with: String
      content: String
      content_not: String
      content_in: [String!]
      content_not_in: [String!]
      content_lt: String
      content_lte: String
      content_gt: String
      content_gte: String
      content_contains: String
      content_not_contains: String
      content_starts_with: String
      content_not_starts_with: String
      content_ends_with: String
      content_not_ends_with: String
      published: Boolean
      published_not: Boolean
      author: UserWhereInput
      comments_every: CommentWhereInput
      comments_some: CommentWhereInput
      comments_none: CommentWhereInput
      AND: [PostWhereInput!]
      OR: [PostWhereInput!]
      NOT: [PostWhereInput!]
    }

    input PostWhereUniqueInput {
      id: ID
    }

    type Query {
      comment(where: CommentWhereUniqueInput!): Comment
      comments(
        where: CommentWhereInput
        orderBy: CommentOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Comment]!
      commentsConnection(
        where: CommentWhereInput
        orderBy: CommentOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): CommentConnection!
      post(where: PostWhereUniqueInput!): Post
      posts(
        where: PostWhereInput
        orderBy: PostOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Post]!
      postsConnection(
        where: PostWhereInput
        orderBy: PostOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): PostConnection!
      user(where: UserWhereUniqueInput!): User
      users(
        where: UserWhereInput
        orderBy: UserOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [User]!
      usersConnection(
        where: UserWhereInput
        orderBy: UserOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): UserConnection!
      node(id: ID!): Node
    }

    type Subscription {
      comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
      post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
      user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
    }

    type User {
      id: ID!
      email: String!
      name: String
      posts(
        where: PostWhereInput
        orderBy: PostOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Post!]
      comments(
        where: CommentWhereInput
        orderBy: CommentOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Comment!]
    }

    type UserConnection {
      pageInfo: PageInfo!
      edges: [UserEdge]!
      aggregate: AggregateUser!
    }

    input UserCreateInput {
      email: String!
      name: String
      posts: PostCreateManyWithoutAuthorInput
      comments: CommentCreateManyWithoutWrittenByInput
    }

    input UserCreateOneWithoutCommentsInput {
      create: UserCreateWithoutCommentsInput
      connect: UserWhereUniqueInput
    }

    input UserCreateOneWithoutPostsInput {
      create: UserCreateWithoutPostsInput
      connect: UserWhereUniqueInput
    }

    input UserCreateWithoutCommentsInput {
      email: String!
      name: String
      posts: PostCreateManyWithoutAuthorInput
    }

    input UserCreateWithoutPostsInput {
      email: String!
      name: String
      comments: CommentCreateManyWithoutWrittenByInput
    }

    type UserEdge {
      node: User!
      cursor: String!
    }

    enum UserOrderByInput {
      id_ASC
      id_DESC
      email_ASC
      email_DESC
      name_ASC
      name_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type UserPreviousValues {
      id: ID!
      email: String!
      name: String
    }

    type UserSubscriptionPayload {
      mutation: MutationType!
      node: User
      updatedFields: [String!]
      previousValues: UserPreviousValues
    }

    input UserSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: UserWhereInput
      AND: [UserSubscriptionWhereInput!]
      OR: [UserSubscriptionWhereInput!]
      NOT: [UserSubscriptionWhereInput!]
    }

    input UserUpdateInput {
      email: String
      name: String
      posts: PostUpdateManyWithoutAuthorInput
      comments: CommentUpdateManyWithoutWrittenByInput
    }

    input UserUpdateManyMutationInput {
      email: String
      name: String
    }

    input UserUpdateOneRequiredWithoutCommentsInput {
      create: UserCreateWithoutCommentsInput
      update: UserUpdateWithoutCommentsDataInput
      upsert: UserUpsertWithoutCommentsInput
      connect: UserWhereUniqueInput
    }

    input UserUpdateOneRequiredWithoutPostsInput {
      create: UserCreateWithoutPostsInput
      update: UserUpdateWithoutPostsDataInput
      upsert: UserUpsertWithoutPostsInput
      connect: UserWhereUniqueInput
    }

    input UserUpdateWithoutCommentsDataInput {
      email: String
      name: String
      posts: PostUpdateManyWithoutAuthorInput
    }

    input UserUpdateWithoutPostsDataInput {
      email: String
      name: String
      comments: CommentUpdateManyWithoutWrittenByInput
    }

    input UserUpsertWithoutCommentsInput {
      update: UserUpdateWithoutCommentsDataInput!
      create: UserCreateWithoutCommentsInput!
    }

    input UserUpsertWithoutPostsInput {
      update: UserUpdateWithoutPostsDataInput!
      create: UserCreateWithoutPostsInput!
    }

    input UserWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      email: String
      email_not: String
      email_in: [String!]
      email_not_in: [String!]
      email_lt: String
      email_lte: String
      email_gt: String
      email_gte: String
      email_contains: String
      email_not_contains: String
      email_starts_with: String
      email_not_starts_with: String
      email_ends_with: String
      email_not_ends_with: String
      name: String
      name_not: String
      name_in: [String!]
      name_not_in: [String!]
      name_lt: String
      name_lte: String
      name_gt: String
      name_gte: String
      name_contains: String
      name_not_contains: String
      name_starts_with: String
      name_not_starts_with: String
      name_ends_with: String
      name_not_ends_with: String
      posts_every: PostWhereInput
      posts_some: PostWhereInput
      posts_none: PostWhereInput
      comments_every: CommentWhereInput
      comments_some: CommentWhereInput
      comments_none: CommentWhereInput
      AND: [UserWhereInput!]
      OR: [UserWhereInput!]
      NOT: [UserWhereInput!]
    }

    input UserWhereUniqueInput {
      id: ID
      email: String
    }
  `,
}
