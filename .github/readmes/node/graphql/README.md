# GraphQL Server Example

This example shows how to implement a **GraphQL server with Node.JS** based on Prisma & [graphql-yoga](https://github.com/prisma/graphql-yoga).

__INLINE(../_setup-1.md)__
cd prisma-examples/node/graphql
__INLINE(../_setup-2.md)__

__INLINE(../_start-graphql-server.md)__

### 5. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./src/schema.graphql`](./src/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion feature and query validation features.

<Details><Summary><strong>See API operations</strong></Summary>

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

#### Create a new user

```graphql
mutation {
  signupUser(
    name: "Sarah"
    email: "sarah@prisma.io"
  ) {
    id
  }
}
```

#### Create a new draft

```graphql
mutation {
  createDraft(
    title: "Join the Prisma Slack"
    content: "https://slack.prisma.io"
    authorEmail: "alice@prisma.io"
  ) {
    id
    published
  }
}
```

#### Publish an existing draft

```graphql
mutation {
  publish(id: "__POST_ID__") {
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
  posts(id: "__POST_ID__") {
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
  publish(id: "__POST_ID__") {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>

## Next steps

- Use Prisma with a local database

## Evolving the example

If you want to add a change the GraphQL API, you need to adjust the GraphQL schema in [`./src/schema.graphql`](./src/schema.graphql) and the respective resolver functions.

<Details><Summary><strong>Adding an operation without updating the datamodel</strong></Summary>

To add new operation that can be based on the current [datamodel](./prisma/datamodel.prisma), you first need to add the operation to the GraphQL schema's `Query` or `Mutation` type and then add the corresponding resolver function. 

For example, to add a new mutation that updates a user's name, you can extend the `Mutation` type as follows:

```grapghql
type Mutation {
  signupUser(email: String!, name: String): User!
  createDraft(title: String!, content: String, authorEmail: String!): Post!
  deletePost(id: ID!): Post
  publish(id: ID!): Post
+ updateUserName(id: ID!, newName: String!): User
}
```

Then add the new resolver to the `resolvers` object in [`./src/index.js`](./src/index.js):

```js,diff
const resolvers = {
  // ... 
  Mutation: {
    // ...
+   updateUserName(parent, { id, newName }, context) {
+     return context.prisma.updateUser({
+       where: {
+         id
+       },
+       data: {
+         name: newName
+       }
+     })
+   }
  }
}
```

</Details>

<Details><Summary><strong>Adding an operation and updating the datamodel</strong></Summary>


Some new API features can't be covered with the existing datamodel. For example, you might want to add _comment_ feature to the API, so that users can leave comments on posts.

For that, you first need to adjust the Prisma datamodel in [`./prisma/datamodel.prisma`](./prisma/datamodel.prisma):

```graphql
type User {
  id: ID! @unique
  email: String! @unique
  name: String
  posts: [Post!]!
+ comments: [Comment!]!
}

type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  content: String
  author: User!
+ comments: [Comment!]!
}

+ type Comment {
+   id: ID! @unique
+   text: String!
+   writtenBy: User!
+   post: Post!
+ }
```

After having updated the datamodel, you need to deploy the changes:

```
prisma deploy
```

Note that this also invokes `prisma generate` (because of the `post-deploy` hook in [`prisma.yml`](./prisma/prisma.yml)) which regenerates the Prisma client in [`./src/generated/prisma-client`](./src/generated/prisma-client).

To now enable users to add comments to posts, you need to add the `Comment` type as well as the corresponding operation to the GraphQL schema in [`./src/schema.graphql`](./src/schema.graphql):

```grapghql
type Query {
  # ... as before
}

type Mutation {
  signupUser(email: String!, name: String): User!
  createDraft(title: String!, content: String, authorEmail: String!): Post!
  deletePost(id: ID!): Post
  publish(id: ID!): Post
  updateUserName(id: ID!, newName: String!): User
+ writeComment(text: String!, postId: ID!, userId!: ID!): Comment
}

type User {
  id: ID!
  email: String!
  name: String
  posts: [Post!]!
+ comments: [Comment!]!
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
  author: User!
+ comments: [Comment!]!
}

+ type Comment {
+   id: ID!
+   text: String!
+   writtenBy: User!
+   post: Post!
+ }
```

Next, you need to implement the resolver for the new operation in [`./src/index.js`](./src/index.js):

```js
const resolvers = {
  // ... 
  Mutation: {
    // ...
    writeComment(parent, { postId, userId}, context) {
      return context.prisma.createComment({
        text,
        post: {
          connect: { id: postId }
        },
        writtenBy: {
          connect: { id: userId }
        }
      })
    }
  }
}
```

Finally, because `Comment` has a relation to `Post` and `User`, you need to update the type resolvers as well so that the relation can be properly resolved (learn more about why this is necessary in [this](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e/) blog article):

```js
const resolvers = {
  // ... 
  User: {
    // ...
    comments: ({ id }, args, context) {
      return context.prisma.user({ id }).comments()
    }
  },
  Post: {
    // ...
    comments: ({ id }, args, context) {
      return context.prisma.post({ id }).comments()
    }
  },
  Comment: {
    writtenBy: ({ id }, args, context) {
      return context.prisma.comment({ id }).writtenBy()
    },
    post: ({ id }, args, context) {
      return context.prisma.comment({ id }).post()
    },
  }
}
```

</Details>

## The idea behind the example

The Prisma client is used as a replacement for a traditional ORM in this example. 