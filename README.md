<br />

<div align="center">
  <h1>Prisma Examples</h1>
  <p><h3 align="center">Ready-to-run Prisma example projects 🚀</h3></p>
  <a href="https://www.prisma.io/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/docs/">Docs</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.prisma.io/blog">Blog</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://slack.prisma.io/">Slack</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/prisma">Twitter</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.youtube.com/watch?v=0RhtQgIs-TE&list=PLn2e1F9Rfr6k9PnR_figWOcSHgc_erDr5&index=1">Demo videos</a>
</div>

<hr>

This repository contains a number of ready-to-run examples demonstrating various use cases of Prisma. Pick an example and follow the instructions in the corresponding README.

Are you missing an example? Please feel free to [open an issue](https://github.com/prisma/prisma-examples/issues/new) (read the [contribution guidelines](./CONTRIBUTING.md) for more info).

<!-- Please keep the absolute URLs so it's easier to copy&paste to prisma/prisma/README.md  -->

## TypeScript

### Fullstack

| Demo                                                                                                 | Description                                                          |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/master/typescript/rest-nextjs)       | Simple [Next.js](https://nextjs.org/) app (React) with a REST API    |
| [`graphql-nextjs`](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a GraphQL API |

### Backend only

| Demo                                                                                                               | Description                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`script`](https://github.com/prisma/prisma-examples/tree/master/typescript/script)                               | Simple usage of Prisma Client JS in a TypeScript script                                                                                                     |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql)                             | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga) and [Nexus Schema](https://github.com/graphql-nexus/schema)    |
| [`graphql-typegraphql`](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-typegraphql)     | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga) and [TypeGraphQL](https://github.com/MichalLytek/type-graphql) |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-apollo-server) | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                                         |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-sdl-first)         | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo)                      |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-auth)                   | GraphQL server with email-password authentication & permissions                                                                                             |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/master/typescript/rest-express)                   | Simple REST API with Express.JS                                                                                                                             |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/master/typescript/grpc)                                   | Simple gRPC API                                                                                                                                             |

## JavaScript (Node.js)

### Fullstack

| Demo                                                                                           | Description                                                       |
| :--------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/master/javascript/rest-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a REST API |

### Backend only

| Demo                                                                                                               | Description                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| [`script`](https://github.com/prisma/prisma-examples/tree/master/javascript/script)                               | Simple usage of Prisma Client JS in a Node.js script                                                                                   |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql)                             | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga)                                           |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql-apollo-server) | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql-auth)                   | GraphQL server with email-password authentication & permissions                                                                        |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/master/javascript/graphql-sdl-first)         | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/master/javascript/rest-express)                   | Simple REST API with Express.JS                                                                                                        |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/master/javascript/grpc)                                   | Simple gRPC API                                                                                                                        |

## Experimental

The [`experimental`](./experimental) directory contains the same examples as the `javascript` and `typescript` directories. The main difference is that it uses [Prisma Migrate](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) to perform database migrations which are currently an experimental feature.

## Deployment platform

The projects in the [`deployment-platforms`](./deployment-platforms) directory show what "Prisma Client"-based deployment setups look like for various deployment providers. Learn more about [deployment](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/deployment) in the Prisma documentation.