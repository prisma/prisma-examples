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
  <a href="https://pris.ly/discord/">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://twitter.com/prisma">Twitter</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.youtube.com/watch?v=0RhtQgIs-TE&list=PLn2e1F9Rfr6k9PnR_figWOcSHgc_erDr5&index=1">Demo videos</a>
</div>

<hr>

<div align="center">

[![test](https://github.com/prisma/prisma-examples/workflows/test/badge.svg?branch=latest)](https://github.com/prisma/prisma-examples/actions?query=workflow%3Atest+branch%3Alatest)

[View full CI status](#ci-status)

</div>

<hr>

This repository contains a number of ready-to-run example projects demonstrating various use cases of Prisma. Pick an example and follow the instructions in the corresponding README.

You can also find links to [real-world and production ready examples](#real-world--production-ready-example-projects-with-prisma) further below in this README.

Are you missing an example? Please feel free to [open an issue](https://github.com/prisma/prisma-examples/issues/new) (read the [contribution guidelines](./CONTRIBUTING.md) for more info).

<!-- Please keep the absolute URLs so it's easier to copy&paste to prisma/prisma/README.md  -->

## Prisma Accelerate

The [`accelerate`](./accelerate) folder contains examples of projects using [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) for connection pooling and global caching.

| Demo                                            | Description                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| [`starter`](./accelerate/starter) | A simple starter project using Prisma Accelerate's caching and connection pooling |
| [`nextjs-starter`](./accelerate/nextjs-starter) | A Next.js project using Prisma Accelerate's caching and connection pooling |
| [`svelte-starter`](./accelerate/svelte-starter/) | A SvelteKit project using Prisma Accelerate's caching and connection pooling |
| [`solidstart-starter`](./accelerate/solidstart-starter/) | A Solidstart project using Prisma Accelerate's caching and connection pooling |
| [`remix-starter`](./accelerate/remix-starter/) | A Remix project using Prisma Accelerate's caching and connection pooling |
| [`nuxt-starter`](./accelerate/nuxtjs-starter/) | A Nuxt.js project using Prisma Accelerate's caching and connection pooling |
| [`astro-starter`](./accelerate/astro-starter/) | An Astro project using Prisma Accelerate's caching and connection pooling |

## Prisma Optimize

The [`optimize`](./optimize) folder contains examples of projects using [Prisma Optimize](https://www.prisma.io/data-platform/optimize) to identify and improve the performance of slow queries.

| Demo                                                                     | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [`starter`](./optimize/starter)                                             | A Prisma Optimize starter app                                               |
| [`optimize-excessive-rows`](./optimize/optimize-excessive-rows)                         | An example app demonstrating the "Excessive number of rows returned" recommendation provided by Optimize. |
| [`optimize-full-table-scan`](./optimize/optimize-full-table-scan)                 | An example app demonstrating the "Full table scans caused by `LIKE` operations" recommendation provided by Optimize.                                |
| [`optimize-unindexed-column`](./optimize/optimize-unindexed-column)                 | An example app demonstrating the "Query filtering on an unindexed column" recommendation provided by Optimize.                     |

## Prisma ORM

### Fullstack

| Demo                                                                   | Description                                                              |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`nextjs-api-routes`](https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs-api-routes)           | [Next.js](https://nextjs.org/) app with a REST API (using [Next.js API routes](https://nextjs.org/docs/api-routes/introduction))                                                                     |
| [`nextjs-graphql`](https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs-graphql)                           | [Next.js](https://nextjs.org/) app with a GraphQL API (using [Apollo Server](https://github.com/apollographql/apollo-server) and [GraphQL Nexus](https://github.com/graphql-nexus/nexus))            |                                                                                                                                       |
| [`nextjs-trpc`](https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs-trpc)                                 | [Next.js](https://nextjs.org/) app with [tRPC ](https://trpc.io/)                                                                                                                                    |
| [`nuxt`](https://github.com/prisma/prisma-examples/tree/latest/orm/nuxt)                                 | [Nuxt.js](https://nuxt.com/) app with a REST API                                                                                                                                                     |
| [`sveltekit`](https://github.com/prisma/prisma-examples/tree/latest/orm/sveltekit)                                     | [SvelteKit](https://kit.svelte.dev/) app using SvelteKit's [actions](https://kit.svelte.dev/docs/form-actions) and [load](https://kit.svelte.dev/docs/form-actions#loading-data) functions           |     | [SvelteKit](https://kit.svelte.dev/) app using SvelteKit's [actions](https://kit.svelte.dev/docs/form-actions) and [load](https://kit.svelte.dev/docs/form-actions#loading-data) functions |
| [`remix`](https://github.com/prisma/prisma-examples/tree/latest/orm/remix)                                             | [Remix](https://remix.run/) app                                                                                                                                                                      |
| [`nuxt-prisma-module`](https://github.com/prisma/prisma-examples/tree/latest/orm/nuxt-prisma-module)                                             | A nuxt example app using the [Prisma Nuxt module](https://github.com/prisma/nuxt-prisma)                                                                                                                                                                     |

### Backend only

| Demo                                                                                                                      | Description                                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`graphql-auth`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql-auth)                           | GraphQL server with email-password authentication & permissions                                                                                                                                   |
| [`graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql-sdl-first)                 | GraphQL server based on [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)                                                                                                                 |
| [`graphql-subscriptions`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql-subscriptions)          | GraphQL server with realtime subscriptions based on [`apollo-server`](https://www.apollographql.com/docs/apollo-server/) and [Nexus Schema](https://github.com/graphql-nexus/schema)              |
| [`graphql-typegraphql`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql-typegraphql)             | GraphQL server based on [`@apollo/server`](https://www.apollographql.com/docs/apollo-server) and [TypeGraphQL](https://github.com/MichalLytek/type-graphql)                                       |
| [`graphql-typegraphql-crud`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql-typegraphql-crud)   | CRUD GraphQL API based on [`@apollo/server`](https://www.apollographql.com/docs/apollo-server) and [TypeGraphQL](https://github.com/MichalLytek/type-graphql)                                     |
| [`fastify-graphql`](https://github.com/prisma/prisma-examples/tree/latest/orm/fastify-graphql)                     | GraphQL server based on [Fastify](https://fastify.io/), [Mercurius](https://mercurius.dev/), and the SDL-first approach of [`graphql-tools`](https://www.graphql-tools.com/docs/generate-schema/) |
| [`fastify-graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/orm/fastify-graphql-sdl-first) | GraphQL server based on [Fastify](https://fastify.io/), [Mercurius](https://mercurius.dev/), and the SDL-first approach of [`graphql-tools`](https://www.graphql-tools.com/docs/generate-schema/) |
| [`hapi-graphql`](https://github.com/prisma/prisma-examples/tree/latest/orm/hapi-graphql)                           | GraphQL server based on [Hapi](https://hapi.dev/) and [Nexus Schema](https://github.com/graphql-nexus/schema)                                                                                     |
| [`hapi-graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/orm/hapi-graphql-sdl-first)       | GraphQL server based on [Hapi](https://hapi.dev/) and the SDL-first approach of [Apollo Server Integration for Hapi](https://www.npmjs.com/package/@as-integrations/hapi)                         |
| [`nest-graphql`](https://github.com/prisma/prisma-examples/tree/latest/orm/nest-graphql)                       | GraphQL server based on [NestJS](https://nestjs.com/) (code-first)                                                                                                                                |
| [`nest-graphql-sdl-first`](https://github.com/prisma/prisma-examples/tree/latest/orm/nest-graphql-sdl-first)   | GraphQL server based on [NestJS](https://nestjs.com/) and the SDL-first approach of [`graphql-tools`](https://www.apollographql.com/docs/graphql-tools/)                                          |
| [`graphql`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql)                                     | GraphQL server based on [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) and [Pothos](https://pothos-graphql.dev/)                                                                       |
| [`graphql-nexus`](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql-nexus)                         | GraphQL server based on [`@apollo/server`](https://www.apollographql.com/docs/apollo-server) and [Nexus Schema](https://github.com/graphql-nexus/schema)                                          |
| [`grpc`](https://github.com/prisma/prisma-examples/tree/latest/orm/grpc)                                           | gRPC API including runnable client scripts for testing                                                                                                                                            |
| [`postgis-express`](https://github.com/prisma/prisma-examples/tree/latest/orm/postgis-express)                     | Demo of spatial queries using [Postgis](http://postgis.net/) and [Express](https://expressjs.com/)                                                                                                |
| [`express`](https://github.com/prisma/prisma-examples/tree/latest/orm/express)                           | REST API with [Express](https://expressjs.com/)                                                                                                                                                   |
| [`fastify`](https://github.com/prisma/prisma-examples/tree/latest/orm/fastify)                           | REST API with [Fastify](https://www.fastify.io/)                                                                                                                                                  |
| [`koa`](https://github.com/prisma/prisma-examples/tree/latest/orm/koa)                                   | REST API with [Koa](https://koajs.com/)                                                                                                                                                           |
| [`hapi`](https://github.com/prisma/prisma-examples/tree/latest/orm/hapi)                                 | REST API with [hapi](https://hapi.dev/)                                                                                                                                                           |
| [`nest`](https://github.com/prisma/prisma-examples/tree/latest/orm/nest)     | REST API with [NestJS](https://docs.nestjs.com/)                                                                                                                                                  |
| [`script`](https://github.com/prisma/prisma-examples/tree/latest/orm/script)                                       | Usage of Prisma Client JS in a TypeScript script                                                                                                                                                  |
| [`testing-express`](https://github.com/prisma/prisma-examples/tree/latest/orm/testing-express)                     | Demo of integration tests with [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest) and [Express](https://expressjs.com/)                                            |                                              |

## Deployment platforms

The projects in the [`deployment-platforms`](./deployment-platforms) directory show what "Prisma Client"-based deployment setups look like for various deployment providers. Learn more about [deployment](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/deployment) in the Prisma documentation.

## Real-world & production-ready example projects with Prisma

- [Inbox Zero](https://github.com/elie222/inbox-zero): Open source email management tools to reach inbox zero fast
- [NextCRM](https://github.com/pdovhomilja/nextcrm-app): An open-source Customer Relationship Management system (CRM)
- [Papermark](https://github.com/mfts/papermark/): An open-source DocSend alternative with built-in analytics and custom domains
- [Hoppscotch](https://github.com/hoppscotch/hoppscotch): An open-source API development ecosystem
- [FeastQR](https://github.com/jakubczarnowski/FeastQR): An open-source SaaS online menu system for restaurants
- [Formbricks](https://github.com/formbricks/formbricks): An open-source survey and experience management tool
- [OpenformStack](https://github.com/naveennaidu/OpenformStack): An open-source form backend that allows you to collect form submissions without writing any backend code
- [Documenso](https://documenso.com/): An open-source alternative to Docusign
- [abby](https://github.com/tryabby/abby): An open-source feature flag, remote config and A/B testing platform for developers
- [ghostfolio](https://ghostfol.io/en/start): An open-source dashboard for your personal finances
- [revert](https://www.revert.dev/): An open-source unified API to build B2B product integrations
- [Scholarsome](https://scholarsome.com/): An interactive, studying system
- [Dittofeed](https://www.dittofeed.com): An open-source customer engagement; intuitive marketing tools that scale
- [Trigger.dev](https://trigger.dev/): Effortless automation built for developers (Zapier alternative)
- [Webstudio](https://github.com/webstudio-is/webstudio-designer): A NoCode visual design tool for building apps and websites
- [Dyrector](https://github.com/dyrector-io/dyrectorio): A self-hosted container management platform
- [reduced.to](https://github.com/origranot/reduced.to): An open-source link shortener
- [Linen](https://github.com/Linen-dev/linen.dev): An open-source alternative to Slack and Discord with lots of great features
- [Coolify](https://github.com/coollabsio/coolify): An open-source & self-hostable Heroku / Netlify alternative
- [Dub.co](https://dub.co): An open-source link management platform for modern marketing teams
- [Umami](https://github.com/mikecao/umami): A simple, fast, privacy-focused alternative to Google Analytics
- [Rallly](https://github.com/lukevella/rallly): A self-hostable doodle poll alternative (based on Next.js, tRPC, and TailwindCSS)
- [Typebot](https://github.com/baptisteArno/typebot.io): A conversational form builder that you can self-host
- [Cal.com](https://github.com/calcom/cal.com): An open-source alternative to Calendly (calender-based event scheduling service)
- [Beam](https://github.com/planetscale/beam): A simple tool that allows members to write posts to share across your organization (based on Next.js)
- [Dundring](https://github.com/sivertschou/dundring): An in-browser training application created to control and track you training with a smart bike trainer
- [Expense.fyi](https://github.com/gokulkrishh/expense.fyi): A tool for tracking and managing expenses
- [Letterpad](https://github.com/letterpad/letterpad): A publishing platform for creatives
- [Teable](https://github.com/teableio/teable): A no-code real-time database built on Postgres with a simple interface for enterprise-level app development.
<hr>

## Starter kits

- [T3 Stack](https://create.t3.gg/): Starter kit based on Next.js, TypeScript, tRPC, Prisma, Tailwind CSS, and NextAuth.js.
- [Indie Stack](https://github.com/remix-run/indie-stack): Remix Stack for deploying to Fly with SQLite, authentication, testing, linting, and formatting.
- [Blues Stack](https://github.com/remix-run/blues-stack): Remix Stack for deploying to Fly with PostgreSQL, authentication, testing, linting, and formatting.
- [NestJS Prisma Starter](https://github.com/notiz-dev/nestjs-prisma-starter): NestJS, Prisma, and authentication starter template.
- [Supastarter](https://supastarter.dev/): Full-stack SaaS starter kit using Next.js/Nuxt.js/SvelteKit and Prisma with authentication, emails, payment, testing, linting, and formatting.
- [Saas Kit Prisma](https://github.com/Saas-Starter-Kit/Saas-Kit-prisma): Full-stack SaaS starter kit using React.js, Next.js, TypeScript, Tailwind, Shadcn, Stripe, NextAuth, Prisma, Postgres, and Playwright.
- [Saas Kit Prisma by BoxyHQ](https://github.com/boxyhq/saas-starter-kit): An open-source enterprise SaaS starter kit using Prisma ORM.
- [NextReady](https://nextready.dev): A ready-to-use Next.js boilerplate with Prisma, TypeScript, Tailwind CSS, and more.

## Badges

[![Made with Prisma](http://made-with.prisma.io/dark.svg)](https://prisma.io) [![Made with Prisma](http://made-with.prisma.io/indigo.svg)](https://prisma.io)

Built something awesome with Prisma? 🌟 Show it off with these [badges](https://github.com/prisma/presskit?tab=readme-ov-file#badges), perfect for your readme or website.

```
[![Made with Prisma](http://made-with.prisma.io/dark.svg)](https://prisma.io)
```

```
[![Made with Prisma](http://made-with.prisma.io/indigo.svg)](https://prisma.io)
```

## Security

If you have a security issue to report, please contact us at [security@prisma.io](mailto:security@prisma.io?subject=[GitHub]%20Prisma%202%20Security%20Report%20Examples)
