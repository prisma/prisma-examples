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

<div align="center">

[![test](https://github.com/prisma/prisma-examples/workflows/test/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest)
[![test](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=dev)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+branch%3Adev+-branch%3Apatch-dev)
[![test](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=patch-dev)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+branch%3Apatch-dev)
<br>
[![keep-prisma-dependencies-updated](https://github.com/prisma/prisma-examples/workflows/keep-prisma-dependencies-updated/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Akeep-prisma-dependencies-updated)
[![keep-dev-branches-in-sync-with-latest](https://github.com/prisma/prisma-examples/workflows/keep-dev-branches-in-sync-with-latest/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Akeep-dev-branches-in-sync-with-latest)

</div>

<hr>

This repository contains a number of ready-to-run examples demonstrating various use cases of Prisma. Pick an example and follow the instructions in the corresponding README.

Are you missing an example? Please feel free to [open an issue](https://github.com/prisma/prisma-examples/issues/new) (read the [contribution guidelines](./CONTRIBUTING.md) for more info).

<!-- Please keep the absolute URLs so it's easier to copy&paste to prisma/prisma/README.md  -->

## TypeScript

### Fullstack

| Demo                                                                                                | Description                                                          |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs)       | Simple [Next.js](https://nextjs.org/) app (React) with a REST API    |
| [`graphql-nextjs`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a GraphQL API |

### Backend only

| Demo                                                                                                              | Description                                                                                                                                                 |
| :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`script`](https://github.com/prisma/prisma-examples/tree/latest/typescript/script)                               | Simple usage of Prisma Client JS in a TypeScript script                                                                                                     |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql)                             | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga) and [Nexus Schema](https://github.com/graphql-nexus/schema)    |
| [`graphql-typegraphql`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-typegraphql)     | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga) and [TypeGraphQL](https://github.com/MichalLytek/type-graphql) |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-apollo-server) | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                                         |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-sdl-first)         | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo)                      |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth)                   | GraphQL server with email-password authentication & permissions                                                                                             |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express)                   | Simple REST API with Express.JS                                                                                                                             |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/latest/typescript/grpc)                                   | Simple gRPC API                                                                                                                                             |
| [`postgis-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/postgis-express)             | Querying for Postgis datatypes with Express                                                                                                                 |
| [`testing-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/testing-express)             | Integration testing with express                                                                                                                            |

## JavaScript (Node.js)

### Fullstack

| Demo                                                                                          | Description                                                       |
| :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a REST API |

### Backend only

| Demo                                                                                                              | Description                                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| [`script`](https://github.com/prisma/prisma-examples/tree/latest/javascript/script)                               | Simple usage of Prisma Client JS in a Node.js script                                                                                   |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql)                             | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga)                                           |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-apollo-server) | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                                    |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-auth)                   | GraphQL server with email-password authentication & permissions                                                                        |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-sdl-first)         | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-express)                   | Simple REST API with Express.JS                                                                                                        |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/latest/javascript/grpc)                                   | Simple gRPC API                                                                                                                        |
| [`rest-fastify`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-fastify)                   | Simple REST API with Fastify                                                                                                           |

## Experimental

The [`experimental`](./experimental) directory contains the same examples as the `javascript` and `typescript` directories. The main difference is that it uses [Prisma Migrate](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) to perform database migrations which are currently an experimental feature.

## Deployment platform

The projects in the [`deployment-platforms`](./deployment-platforms) directory show what "Prisma Client"-based deployment setups look like for various deployment providers. Learn more about [deployment](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/deployment) in the Prisma documentation.

<hr>

## About this repository

The `latest` branch of this repository contains the examples with the latest stable version of Prisma CLI and Prisma Client (`@latest` on npm). These dependencies are kept up to date with a GitHub Action workflow, which updates them every time a new version of Prisma is released.

There are also the automated branches `dev` and `patch-dev`, which mirror the code from `latest` (synced via a GitHub Action workflow), but they use the respective development channels of Prisma CLI and Prisma Client from npm instead (`@dev` and `@patch-dev`, also updated via a GitHub Action workflow). Thanks to the test coverage of all projects, this can point us to incompatibilities early.

## Security

If you have a security issue to report, please contact us at [security@prisma.io](mailto:security@prisma.io?subject=[GitHub]%20Prisma%202%20Security%20Report%20Examples)
