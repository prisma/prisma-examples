
## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all published posts and their authors

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

<details><summary><strong>See more API operations</strong></summary>

### Retrieve the drafts of a user

```graphql
{
  draftsByUser(
    userUniqueInput: {
      email: "mahmoud@prisma.io"
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


### Create a new user

```graphql
mutation {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io" }) {
    id
  }
}
```

### Create a new draft

```graphql
mutation {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    id
    viewCount
    published
    author {
      id
      name
    }
  }
}
```

### Publish/unpublish an existing post

```graphql
mutation {
  togglePublishPost(id: __POST_ID__) {
    id
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  togglePublishPost(id: 5) {
    id
    published
  }
}
```

### Increment the view count of a post

```graphql
mutation {
  incrementPostViewCount(id: __POST_ID__) {
    id
    viewCount
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  incrementPostViewCount(id: 5) {
    id
    viewCount
  }
}
```

### Search for posts that contain a specific string in their title or content

```graphql
{
  feed(
    searchString: "prisma"
  ) {
    id
    title
    content
    published
  }
}
```

### Paginate and order the returned posts

```graphql
{
  feed(
    skip: 2
    take: 2
    orderBy: { updatedAt: desc }
  ) {
    id
    updatedAt
    title
    content
    published
  }
}
```

### Retrieve a single post

```graphql
{
  postById(id: __POST_ID__ ) {
    id
    title
    content
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
{
  postById(id: 5 ) {
    id
    title
    content
    published
  }
}
```

### Delete a post

```graphql
mutation {
  deletePost(id: __POST_ID__) {
    id
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  deletePost(id: 5) {
    id
  }
}
```

</details>