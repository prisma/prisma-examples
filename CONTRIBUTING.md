# Contribution Guidelines

## Goals of the Prisma examples

This repository contains a number of examples that show the _minimalistic_ setup for using Prisma for specific use cases. We're trying to remove all unnecessary complexity from the examples to keep them as simple as possible.

## Example structure

For each language, there should be one example that shows how to:

- use Prisma client in a **script**
- build a **GraphQL server** using Prisma client
- build a **GraphQL server** using Prisma client **with authentication and permissions**
- build a **GraphQL server** using Prisma client **with realtime GraphQL subscriptions**
- build a **REST API** with Prisma client
- build a **CLI** application with Prisma client

The datamodel and developed APIs should be consistent across languages. This enables easier testing of the examples. The domain for all applications (except the CLI app) is a simple blogging application. 

Here's an overview of the used datamodels and APIs:

<details><summary>script</summary>

`datamodel.prisma`:

```graphql
type User {
  id: ID! @unique
  email: String! @unique
  name: String
  posts: [Post!]!
}

type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  content: String
  author: User!
}
```

</details>

<details><summary>graphql</summary>

`datamodel.prisma`:

```graphql
type User {
  id: ID! @unique
  email: String! @unique
  name: String
  posts: [Post!]!
}

type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  content: String
  author: User!
}
```

`schema.graphql`:

```graphql
scalar DateTime

type Query {
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(id: ID!): Post
}

type Mutation {
  signupUser(email: String!, name: String): User!
  createDraft(title: String!, content: String, authorEmail: String!): Post!
  deletePost(id: ID!): Post
  publish(id: ID!): Post
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
  author: User!
}

type User {
  id: ID!
  email: String!
  name: String
  posts: [Post!]!
}
```

</details>

<details><summary>graphql-auth</summary>

`datamodel.prisma`:

```graphql
type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  content: String
  author: User!
}

type User {
  id: ID! @unique
  email: String! @unique
  password: String!
  name: String
  posts: [Post!]!
}
```

`schema.graphql`:

```graphql
scalar DateTime

type Query {
  me: User
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(id: ID!): Post
}

type Mutation {
  createDraft(title: String!, content: String): Post!
  deletePost(id: ID!): Post
  publish(id: ID!): Post
  signup(email: String!, password: String!, name: String): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User!
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
  author: User!
}

type User {
  id: ID!
  email: String!
  name: String
  posts: [Post!]!
}
```

</details>

<details><summary>graphql-subscriptions</summary>

`datamodel.prisma`:

```graphql
type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  content: String
}
```

`schema.graphql`:

```graphql
scalar DateTime

type Query {
  feed: [Post!]!
  filterPosts(searchString: String): [Post!]!
  post(id: ID!): Post
}

type Mutation {
  createDraft(title: String!, content: String): Post!
  deletePost(id: ID!): Post
  publish(id: ID!): Post
}

type Subscription {
  posts: Post
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
}
```

</details>

<details><summary>rest</summary>

`datamodel.prisma`:

```graphql
type User {
  id: ID! @unique
  email: String! @unique
  name: String
  posts: [Post!]!
}

type Post {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  content: String
  author: User!
}
```

### API

#### `GET`

- `/post/:id`: Fetch a single post by its `id`
- `/feed`: Fetch all _published_ posts
- `/filterPosts?searchString={searchString}`: Filter posts by `title` or `content`

#### `POST`

- `/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

#### `PUT`

- `/publish/:id`: Publish a post by its `id`

#### `DELETE`
  
- `/post/:id`: Delete a post by its `id`


</details>

<details><summary>cli</summary>

`datamodel.prisma`:

```graphql
type Todo {
  id: ID! @unique
  title: String! @unique
  createdAt: DateTime!
}
```

</details>


## Ways to contribute

### Adding a new example

### Improving an existing example

### Improving a README