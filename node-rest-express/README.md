# node-rest-express

This example demonstrates how to implement a **REST API** using [Express.JS](https://expressjs.com/de/) and Prisma.

## Get started

### 1. Download example & Install dependencies

Clone the repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/node-rest-express
yarn install # or `npm install`
```

### 2. Deploy the Prisma API

You will now deploy the Prisma API that's backing this example. This requires you to have [Docker](https://www.docker.com) installed on your machine (if you don't have Docker follow the collapsed instructions below the code block):

```
docker-compose up -d

# provided as a dev dependency in package.json
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

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/houses`](http://localhost:3000/houses).
