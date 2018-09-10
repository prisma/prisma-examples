# node cli example

This example demonstrates how to implement a data store with Prisma for a CLI tool (In this case a simple todo list).

### 1. Deploy the Prisma database service

You can now [deploy](https://www.prisma.io/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov) the Prisma service (note that this requires you to have [Docker](https://www.docker.com) installed on your machine - if that's not the case, follow the collapsed instructions below the code block):

```sh
# Ensure docker is running the server's dependencies
docker-compose up
# Deploy the server
cd prisma
prisma deploy
```

<details>
 <summary><strong>I don't have <a href="https://www.docker.com">Docker</a> installed on my machine</strong></summary>

To deploy your service to a demo server (rather than locally with Docker), please follow [this link](https://www.prisma.io/docs/quickstart/).

</details>

### 2. Explore the CLI Tool

The Prisma database service that's backing your GraphQL server is now available. This means you can now start to test the CLI Tool:

#### Add a Todo item

```sh
npm run cli -- add First todo item
```

#### List all Todo items

```sh
npm run cli -- list
```

#### Delete a Todo item

```sh
npm run cli -- delete First todo item
```

### 3. Explore the generated Prisma API

The easiest way to explore this deployed service and play with the API generated from the data model is by using the [GraphQL Playground](https://github.com/graphcool/graphql-playground).

### Open a Playground

You can either start the [desktop app](https://github.com/graphcool/graphql-playground) via

```sh
yarn playground
```

Or you can open a Playground by navigating to [http://localhost:4466/cli-tool](http://localhost:4466/cli-tool) in your browser.

### Run the following query

```graphql
query Todoes {
 todoes(orderBy: id_DESC) {
  id
  title
 }
}
```
