# typescript-graphql

This example demonstrates how to implement a **GraphQL server with TypeScript** based on Prisma & [graphql-yoga](https://github.com/prisma/graphql-yoga).

## Get started

### 1. Download example & Install dependencies

Clone the repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/typescript-graphql
yarn install # or `npm install`
```

### 2. Deploy the Prisma API

You will now deploy the Prisma API that's backing this example. This requires you to have [Docker](https://www.docker.com) installed on your machine (if you don't have Docker follow the collapsed instructions below the code block):

```
docker-compose up -d

cd prisma

# provided as a script in package.json
yarn prisma deploy
```

<details>
 <summary><strong>I don't have Docker installed on my machine</strong></summary>

To deploy your service to a Demo server (rather than locally with Docker), follow these steps:

- Run the following command:
  ```
  yarn prisma deploy --new
  ```
- In the interactive CLI wizard:
  - Select the **Demo server**
  - For all following questions, choose the suggested values by just hitting **Enter**

</details>

### 3. Start the server

```
yarn start
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).
