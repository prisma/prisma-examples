# node-cli-example

This example demonstrates how to implement a **Todo-app as a CLI tool** with Node.JS and Prisma.

## How to use

### 1. Download example & install dependencies

Clone the repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/node/node-cli-app
npm install
```

### 2. Install the Prisma CLI

You need to have the Prisma CLI installed on your machine to run this example. If you don't have it yet, execute the following command to install it globally on your machine:

```
npm install -g prisma
```

### 3. Set up Prisma & database

For this example, you'll use a free _demo database_ (AWS Aurora) hosted in Prisma Cloud. To setup your database and connect it with Prisma, run the following command:

```
prisma deploy
```

This launches an interactive CLI wizard, here's what to do:

1. Select the **Demo server**
1. **Authenticate** with Prisma Cloud when the browser opens and go back to the terminal
1. For all following questions, select the suggested values by hitting **Enter**

<details>
 <summary><strong>I want to run Prisma locally via Docker</strong></summary>

1. Ensure you have Docker installed on your machine. If no, you can get it from [here](https://store.docker.com/search?offering=community&type=edition).
1. Create `docker-compose.yml` for MySQL (see [here](https://www.prisma.io/docs/prisma-server/database-connector-POSTGRES-jgfr/) for Postgres):
    ```yml
    version: '3'
    services:
      prisma:
        image: prismagraphql/prisma:1.21
        restart: always
        ports:
        - "4466:4466"
        environment:
          PRISMA_CONFIG: |
            port: 4466
            databases:
              default:
                connector: mysql
                host: mysql
                port: 3306
                user: root
                password: prisma
                migrations: true
      mysql:
        image: mysql:5.7
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: prisma
        volumes:
          - mysql:/var/lib/mysql
    volumes:
      mysql:
    ```
1. Run `docker-compose up -d`
1. Run `prisma deploy`

</details>

### 4. Use the app

```
npm run cli
```

#### Add a `Todo` item

```sh
npm run cli add Groceries
```

#### List all `Todo` items

```sh
npm run cli list
```

#### Delete a `Todo` item

```sh
npm run cli delete Groceries
```
