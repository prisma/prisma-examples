# typescript-cli-example

This example demonstrates how to implement a **Todo-app as a CLI tool** with TypeScript and Prisma.

## Get started

### 1. Install the Prisma CLI

```
yarn global add prisma
# or
npm install -g prisma
```

### 2. Download example & Install dependencies

Clone the repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/typescript-cli-example
yarn install # or `npm install`
```

### 3. Deploy the Prisma API

You will now deploy the Prisma API that's backing this example. This requires you to have [Docker](https://www.docker.com) installed on your machine (if you don't have Docker follow the collapsed instructions below the code block):

```
docker-compose up -d
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

### 4. Use the app

```
yarn cli
```

#### Add a Todo item

```sh
yarn cli add Groceries
```

#### List all Todo items

```sh
yarn cli list
```

#### Delete a Todo item

```sh
yarn cli delete Groceries
```
