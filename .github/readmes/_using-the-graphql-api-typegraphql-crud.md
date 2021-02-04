## Using the GraphQL API

`typegraphql-prisma` emits the generated TypeGraphql classes to `@generated/typegraphql-prisma` that is located in the `node_modules` whenever `npx prisma generate` is invoked. It also generates a number of model classes, enums and CRUD resolvers and relations resolver based on your `schema.prisma` file. CRUD resolvers support the following operations that are 1:1 matching with the `PrismaClient` API:

- create
- update
- delete
- findUnique
- findFirst
- findMany
- updateMany
- deleteMany
- upsert
- aggregate
- groupBy

Below are example operations that you can send to the API using the GraphQL Playground. You can explore other operations in the Docs section of the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all published posts and their authors

```graphql
query {
  posts {
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
  createUser(data: {
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
  createPost(
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
  updatePost(data: { published: { set: true } }, where: { id: __POST_ID__ }){
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Search for posts with a specific title or content

```graphql
{
  posts(
    where: {
      OR: { content: { contains: "graphql" }, title: { contains: "graphql" } }
    }
  ) {
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
  post(where: { id: __POST_ID__ }) {
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
mutation{
  deletePost(where:{id: __POST_ID__}){
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>
