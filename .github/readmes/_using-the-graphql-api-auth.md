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


### Register a new user

You can send the following mutation in the Playground to sign up a new user and retrieve an authentication token for them:

```graphql
mutation {
  signup(name: "Sarah", email: "sarah@prisma.io", password: "HelloWorld42") {
    token
  }
}
```

### Log in an existing user

This mutation will log in an existing user by requesting a new authentication token for them.

```graphql
mutation {
  login(email: "sarah@prisma.io", password: "HelloWorld42") {
    token
  }
}
```

If you seeded the database with sample data in step 2. of this README, you can use the following `email` and `password` combinations (from [`prisma/seed.ts`](./prisma/seed.ts)) for the `login` mutation as well:

| Email               | Password         |
| :------------------ | :--------------- |
| `alice@prisma.io`   | `myPassword42`   |
| `nilu@prisma.io`    | `random42`       |
| `mahmoud@prisma.io` | `iLikeTurtles42` |

### Check whether a user is currently logged in with the `me` query

For this query, you need to make sure a valid authentication token is sent along with the `Bearer`-prefix in the `Authorization` header of the request:

```json
{
  "Authorization": "Bearer __YOUR_TOKEN__"
}
```

With a real token, this looks similar to this:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanAydHJyczFmczE1MGEwM3kxaWl6c285IiwiaWF0IjoxNTQzNTA5NjY1fQ.Vx6ad6DuXA0FSQVyaIngOHYVzjKwbwq45flQslnqX04"
}
```

Inside the Playground, you can set HTTP headers in the bottom-left corner:

![](https://imgur.com/ToRcCTj.png)

Once you've set the header, you can send the following query to check whether the token is valid:

```graphql
{
  me {
    id
    name
    email
  }
}
```

### Create a new draft

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground.

```graphql
mutation {
  createDraft(
    data: {
      title: "Join the Prisma Slack"
      content: "https://slack.prisma.io"
    }
  ) {
    id
    published
  }
}
```

### Publish an existing post

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. The authentication token must belong to the user who created the post.

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

### Search for posts with a specific title or content

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

### Retrieve a single post

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground.

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

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. The authentication token must belong to the user who created the post.

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

### Retrieve the drafts of a user

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. 

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

</details>


### Authenticating GraphQL requests

In this example, you authenticate your GraphQL requests using the `Authorization` header field of the HTTP requests which are sent from clients to your GraphQL server. The required authentication token is returned by successful `signup` and `login` mutations.

Using the GraphQL Playground, the `Authorization` header can be configured in the **HTTP HEADERS** tab in the bottom-left corner of the GraphQL Playground. The values for the HTTP headers are defined in JSON format. Note that the authentication token needs to be sent with the `Bearer `-prefix:

```json
{
  "Authorization": "Bearer __YOUR_TOKEN__"
}
```

With a "real" authentication token, it looks similar to this:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanAydHJyczFmczE1MGEwM3kxaWl6c285IiwiaWF0IjoxNTQzNTA5NjY1fQ.Vx6ad6DuXA0FSQVyaIngOHYVzjKwbwq45flQslnqX04"
}
```

As mentioned before, you can set HTTP headers in the bottom-left corner of the GraphQL Playground:

![](https://imgur.com/ToRcCTj.png)

### Authorization rules

The following [authorization rules](./src/permissions/index.ts) are defined for the GraphQL API via GraphQL Shield:

| Operation name           | Operation type | Rule                  | Description                                                                              |
| :----------------------- | :------------- | :-------------------- | :--------------------------------------------------------------------------------------- |
| `me`                     | Query          | `isAuthenticatedUser` | Requires a user to be authenticated                                                      |
| `draftsByUser`           | Query          | `isAuthenticatedUser` | Requires a user to be authenticated                                                      |
| `postById`               | Query          | `isAuthenticatedUser` | Requires a user to be authenticated                                                      |
| `createDraft`            | Mutation       | `isAuthenticatedUser` | Requires a user to be authenticated                                                      |
| `deletePost`             | Mutation       | `isPostOwner`         | Requires the authenticated user to be the author of the post to be deleted               |
| `incrementPostViewCount` | Mutation       | `isAuthenticatedUser` | Requires a user to be authenticated                                                      |
| `togglePublishPost`      | Mutation       | `isPostOwner`         | Requires the authenticated user to be the author of the post to be published/unpublished |

The `isAuthenticatedUser` rule requires you to send a valid authentication token. The `isPostOwner` rule additionaly requires the user to whom this authentication token belongs to be the author of the post on which the operation is applied.
