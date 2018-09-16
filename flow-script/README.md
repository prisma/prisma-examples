# flow-script

This example demonstrates how to use the Prisma client in a simple Flow script.

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
cd prisma-examples/flow-script
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

To deploy your service to a demo server (rather than locally with Docker), follow these steps:

- Run the following command:
  ```
  yarn prisma deploy --new
  ```
- In the interactive CLI wizard:
  - Select the **Demo server**
  - For all following questions, choose the suggested values by just hitting **Enter**

</details>

### 4. Run the script

```
yarn start
```
