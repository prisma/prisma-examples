# Prisma 2 Examples

This repository contains a number of ready-to-run examples demonstrating various use cases of the Prisma 2. Pick an example and follow the instructions in the corresponding README.

Are you missing an example? Please feel free to [open an issue](https://github.com/prisma/prisma-examples/issues/new) (read the [contribution guidelines](./CONTRIBUTING.md) for more info).

> **Note**: The examples in the [`deployment-platforms`](./deployment-platforms) and [`experimental`](./experimental) directories are currently outdated but will be updated soon.

<!-- Please keep the absolute URLs so it's easier to copy&paste to prisma/prisma/README.md  -->

## TypeScript

### Fullstack

| Demo | Description |
|:------|:----------|
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/rest-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a REST API |
| [`graphql-nextjs`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/graphql-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a GraphQL API |

### Backend only

| Demo | Description |
|:------|:----------|
| [`script`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/script) | Simple usage of Prisma Client JS in a TypeScript script |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/graphql) | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga) |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/graphql-apollo-server) | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/graphql-sdl-first) | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/graphql-auth) | GraphQL server with email-password authentication & permissions |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/rest-express) | Simple REST API with Express.JS |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/prisma2/typescript/grpc) | Simple gRPC API |

## JavaScript (Node.js)

### Fullstack

| Demo | Description |
|:------|:----------|
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/rest-nextjs) | Simple [Next.js](https://nextjs.org/) app (React) with a REST API |

### Backend only

| Demo | Description |
|:------|:----------|
| [`script`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/script) | Simple usage of Prisma Client JS in a Node.js script |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/graphql) | Simple GraphQL server based on [`graphql-yoga`](https://github.com/prisma-labs/graphql-yoga) |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/graphql-apollo-server) | Simple GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/graphql-auth) | GraphQL server with email-password authentication & permissions |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/graphql-sdl-first) | Simple GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) (Apollo) |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/rest-express) | Simple REST API with Express.JS |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/prisma2/javascript/grpc) | Simple gRPC API |

## Experimental

The [`experimental`](./experimental) directory contains the same examples as the `javascript` and `typescript` directories. The main difference is that it uses Prisma to perform database migrations which are currently an experimental feature.

## Deployment platform

The projects in the [`deployment-platforms`](./deployment-platforms) directory show what "Prisma Client"-based deployment setups look like for various deployment providers. Note that they are currently unmaintained but will be updated soon.