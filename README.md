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

[![test](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=latest)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+branch%3Alatest)
[![keep-prisma-dependencies-updated](https://github.com/prisma/prisma-examples/workflows/keep-prisma-dependencies-updated/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Akeep-prisma-dependencies-updated)
[![keep-dev-branches-in-sync-with-latest](https://github.com/prisma/prisma-examples/workflows/keep-dev-branches-in-sync-with-latest/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Akeep-dev-branches-in-sync-with-latest)

[View full CI status](#ci-status)

</div>

<hr>

This repository contains a number of ready-to-run example projects demonstrating various use cases of Prisma. Pick an example and follow the instructions in the corresponding README.

You can also find links to [real-world and production ready examples](#real-world--production-ready-example-projects-with-prisma) further below in this README.

Are you missing an example? Please feel free to [open an issue](https://github.com/prisma/prisma-examples/issues/new) (read the [contribution guidelines](./CONTRIBUTING.md) for more info).

<!-- Please keep the absolute URLs so it's easier to copy&paste to prisma/prisma/README.md  -->

## TypeScript

### Fullstack

| Demo                                                                                                                          | Description                                                                                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`rest-nextjs-api-routes`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes)           | [Next.js](https://nextjs.org/) app with a REST API (using [Next.js API routes](https://nextjs.org/docs/api-routes/introduction))                                                                     |
| [`rest-nextjs-api-routes-auth`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes-auth) | [Next.js](https://nextjs.org/) app with a REST API (using [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)) and authentication (using [NextAuth.js](https://next-auth.js.org/)) |
| [`rest-nextjs-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-express)                 | [Next.js](https://nextjs.org/) app with a REST API (using [Express](https://expressjs.com/))                                                                                                         |
| [`graphql-nextjs`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nextjs)                           | [Next.js](https://nextjs.org/) app with a GraphQL API (using [Apollo Server](https://github.com/apollographql/apollo-server) and [GraphQL Nexus](https://github.com/graphql-nexus/nexus))            |

### Backend only

| Demo                                                                                                                      | Description                                                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-apollo-server)         | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) and [Nexus Schema](https://github.com/graphql-nexus/schema)                             |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth)                           | GraphQL server with email-password authentication & permissions                                                                                                                      |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-sdl-first)                 | GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/)                                                               |
| [`graphql-subscriptions`](https://github.com/prisma/prisma-examples/tree/latest/typescript/subscriptions-pubsub)          | GraphQL server with realtime subscriptions based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) and [Nexus Schema](https://github.com/graphql-nexus/schema) |
| [`graphql-typegraphql`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-typegraphql)             | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server) and [TypeGraphQL](https://github.com/MichalLytek/type-graphql)
| [`graphql-typegraphql-crud`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-typegraphql-crud)             | CRUD GraphQL API based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server) and [TypeGraphQL](https://github.com/MichalLytek/type-graphql)                                 |
| [`graphql-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-express)                     | GraphQL server based on [Express](https://expressjs.com/) and [Nexus Schema](https://github.com/graphql-nexus/schema)                                                                |
| [`graphql-express-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-express-sdl-first) | GraphQL server based on [Express](https://expressjs.com/) and the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/)                         |
| [`graphql-fastify`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-fastify) | GraphQL server based on [Fastify](https://fastify.io/), [Mercurius](https://mercurius.dev/), and the SDL-first approach of [`graphql-tools`](https://www.graphql-tools.com/docs/generate-schema/)                         |
| [`graphql-fastify-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-fastify-sdl-first) | GraphQL server based on [Fastify](https://fastify.io/), [Mercurius](https://mercurius.dev/), and the SDL-first approach of [`graphql-tools`](https://www.graphql-tools.com/docs/generate-schema/)                         |
| [`graphql-hapi`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-hapi)                     | GraphQL server based on [Hapi](https://hapi.dev/) and [Nexus Schema](https://github.com/graphql-nexus/schema)                                                                |
| [`graphql-hapi-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-hapi-sdl-first) | GraphQL server based on [Hapi](https://hapi.dev/) and the SDL-first approach of [Apollo Server Hapi](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-hapi)                         |
| [`graphql-nestjs`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nestjs)                       | GraphQL server based on [NestJS](https://nestjs.com/) (code-first)                                                                                                                   |
| [`graphql-nestjs-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nestjs-sdl-first)   | GraphQL server based on [NestJS](https://nestjs.com/) and the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/)                             |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql) | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server) and [Nexus Schema](https://github.com/graphql-nexus/schema) |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/latest/typescript/grpc) | gRPC API including runnable client scripts for testing |
| [`postgis-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/postgis-express) | Demo of spatial queries using [Postgis](http://postgis.net/) and [Express](https://expressjs.com/) |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express) | REST API with [Express](https://expressjs.com/) |
| [`rest-fastify`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-fastify) | REST API with [Fastify](https://www.fastify.io/) |
| [`rest-koa`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-koa) | REST API with [Koa](https://koajs.com/) |
| [`rest-hapi`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-hapi) | REST API with [hapi](https://hapi.dev/) |
| [`rest-nestjs`](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nestjs) | REST API with [NestJS](https://docs.nestjs.com/) |
| [`script`](https://github.com/prisma/prisma-examples/tree/latest/typescript/script) | Usage of Prisma Client JS in a TypeScript script |
| [`testing-express`](https://github.com/prisma/prisma-examples/tree/latest/typescript/testing-express) | Demo of integration tests with [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest) and [Express](https://expressjs.com/) |

## JavaScript (Node.js)

### Fullstack

| Demo                                                                                          | Description                                                                                                                      |
| :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| [`rest-nextjs`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-nextjs) | [Next.js](https://nextjs.org/) app with a REST API (using [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)) |
| [`rest-nuxtjs`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-nuxtjs) | [NuxtJS](https://nuxtjs.org/) app with a REST API                                                                                |

### Backend only

| Demo                                                                                                              | Description                                                                                                            |
| :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [`graphql-apollo-server`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-apollo-server) | GraphQL server based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)                           |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-auth)                   | GraphQL server with email-password authentication & permissions                                                        |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/javascript/graphql-sdl-first)         | GraphQL server based on the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/) |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/latest/javascript/grpc)                                   | gRPC API including runnable client scripts for testing                                                                 |
| [`rest-express`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-express)                   | REST API with [Express](https://expressjs.com/)                                                                        |
| [`rest-fastify`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-fastify)                   | REST API with [Fastify](https://www.fastify.io/)                                                                       |
| [`rest-koa`](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-koa)                   | REST API with [Koa](https://koajs.com/)                                                                        |
| [`script`](https://github.com/prisma/prisma-examples/tree/latest/javascript/script)                               | Usage of Prisma Client JS in a Node.js script                                                                          |

## Deployment platforms

The projects in the [`deployment-platforms`](./deployment-platforms) directory show what "Prisma Client"-based deployment setups look like for various deployment providers. Learn more about [deployment](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/deployment) in the Prisma documentation.

## Real-world & production-ready example projects with Prisma

- [Coolify](https://github.com/coollabsio/coolify): An open-source & self-hostable Heroku / Netlify alternative
- [dub](https://dub.sh/): An open-source link shortener with built-in analytics + free custom domains.
- [Umami](https://github.com/mikecao/umami): A simple, fast, privacy-focused alternative to Google Analytics
- [Rallly](https://github.com/lukevella/rallly): A self-hostable doodle poll alternative. (based on Next.js, tRPC, and TailwindCSS)
- [snoopForms](https://github.com/snoopForms/snoopforms?ref=reactjsexample.com): An open-source alternative to Typeform (easy online surveys)
- [Typebot](https://github.com/baptisteArno/typebot.io): A conversational form builder that you can self-host
- [Cal.com](https://github.com/calcom/cal.com): An open-source alternative to Calendly (calender-based event scheduling service)
- [Beam](https://github.com/planetscale/beam): A simple tool that allows members to write posts to share across your organization (based on Next.js)
- [`ironfish-api`](https://github.com/iron-fish/ironfish-api): Public API for Iron Fish (A novel cryptocurrency focused on privacy and accessibility)
- [Indie Stack](https://github.com/remix-run/indie-stack): Remix Stack for deploying to Fly with SQLite, authentication, testing, linting, formatting
- [Blues Stack](https://github.com/remix-run/blues-stack): Remix Stack for deploying to Fly with PostgreSQL, authentication, testing, linting, formatting
- [Tottem](https://github.com/poulainv/tottem): Fullstack app for "social library management" (based on Next.js)

<hr>

## About this repository

The `latest` branch of this repository contains the examples with the latest stable version of Prisma CLI and Prisma Client (`@latest` on npm). These dependencies are kept up to date with a GitHub Action workflow, which updates them every time a new version of Prisma is released.

There are also the automated branches `dev` and `patch-dev`, which mirror the code from `latest` (synced via a GitHub Action workflow), but they use the respective development channels of Prisma CLI and Prisma Client from npm instead (`@dev` and `@patch-dev`, also updated via a GitHub Action workflow). Thanks to the test coverage of all projects, this can point us to incompatibilities early.

## Security

If you have a security issue to report, please contact us at [security@prisma.io](mailto:security@prisma.io?subject=[GitHub]%20Prisma%202%20Security%20Report%20Examples)

## CI status

| CI Status                                                                                                                                                                                              | Branch      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| [![test latest](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=latest)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+branch%3Alatest)            | `latest`    |
| [![test dev](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=dev)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+-branch%3Apatch-dev+branch%3Adev) | `dev`       |
| [![test patch-dev](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=patch-dev)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+branch%3Apatch-dev)   | `patch-dev` |

| CI Status                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![keep-prisma-dependencies-updated](https://github.com/prisma/prisma-examples/workflows/keep-prisma-dependencies-updated/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Akeep-prisma-dependencies-updated)                |
| [![keep-dev-branches-in-sync-with-latest](https://github.com/prisma/prisma-examples/workflows/keep-dev-branches-in-sync-with-latest/badge.svg)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Akeep-dev-branches-in-sync-with-latest) |

