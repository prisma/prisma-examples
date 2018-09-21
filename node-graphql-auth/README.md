# node-graphql-auth

This example demonstrates how to implement a **GraphQL server with an email-password-based authentication workflow** based on Prisma & [graphql-yoga](https://github.com/prisma/graphql-yoga).

## Get started

### 1. Download example & Install dependencies

Clone the repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/node-graphql-auth
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

To deploy your service to a demo server (rather than locally with Docker), follow these steps:

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

### 4. Explore the API of your GraphQL server

#### Open a Playground

You can either start the [desktop app](https://github.com/prisma/graphql-playground) via

```sh
yarn playground
```

Or you can open a Playground by navigating to [http://localhost:4000](http://localhost:4000) in your browser.

#### Register a new user with the `signup` mutation

You can send the following mutation in the Playground to sign up a new user and retrieve an authentication token for them:

```graphql
mutation {
  signup(name: "Alice", email: "alice@prisma.io", password: "graphql") {
    token
  }
}
```

#### Logging in an existing user with the `login` mutation

This mutation will log in an existing user by requesting a new authentication token for them:

```graphql
mutation {
  login(email: "alice@prisma.io", password: "graphql") {
    token
  }
}
```

#### Checking whether a user is currently logged in with the `me` query

For this query, you need to make sure a valid authentication token is sent along with the `Bearer`-prefix in the `Authorization` header of the request. Inside the Playground, you can set HTTP headers in the bottom-left corner:

![](https://imgur.com/bEGUtO0.png)

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

If the token is valid, the server will return the `id`, `name`, `email` of the `User` node that it belongs to.
