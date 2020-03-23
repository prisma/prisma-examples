## Using the GraphQL API

The schema specifies the API operations of your GraphQL server. TypeGraphQL allows you to define a schema using TypeScript classes and decorators. The schema is generated at runtime, and is defined by the following classes:

- [`./src/PostResolvers.ts`](./src/PostResolvers.ts)
- [`./src/UserResolvers.ts`](./src/UserResolvers.ts)
- [`./src/User.ts`](./src/User.ts)
- [`./src/Post.ts`](./src/Post.ts)
- [`./src/UserCreateInput.ts`](./src/UserCreateInput.ts)
- [`./src/PostCreateInput.ts`](./src/PostCreateInput.ts)

Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all published posts and their authors

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new user

```graphql
mutation {
  signupUser(data: {
    name: "Sarah",
    email: "sarah@prisma.io"
    }
  ) {
    id
  }
}
```

#### Create a new draft

```graphql
mutation {
  createDraft(
    data: {
      title: "Join the Prisma Slack",
      content: "https://slack.prisma.io"
      email: "alice@prisma.io"
    }
  ) {
    id
    published
  }
}
```

#### Publish an existing draft

```graphql
mutation {
  publish(id: __POST_ID__) {
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Search for posts with a specific title or content

```graphql
{
  filterPosts(searchString: "graphql") {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

#### Retrieve a single post

```graphql
{
  post(id: __POST_ID__) {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Delete a post

```graphql
mutation {
  deleteOnePost(id: __POST_ID__) {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>
