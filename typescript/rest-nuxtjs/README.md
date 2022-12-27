Create an enviromental file and name it `.env` and place it in the root folder of the project. JWT_TOKEN_SECRET of your choice but for this example just paste the one below
    `JWT_TOKEN_SECRET="PleaseChangeMe!"`

Open your terminal and install the node dependencies
    `npm i`

Next run the prisma migration
    `npx prisma migrate dev --name init`

Next run seed to add the first batch of users into the DB. To learn more about DB seeds read this (https://www.prisma.io/docs/guides/database/seed-database#seeding-your-database-via-any-language-with-a-bash-script)
    `npm run seed`

Now switch on your Nuxt server
    `npm run dev`

In another terminal open Prisma Studio
    `npx prisma studio`

Start adding users

This current example uses SQlite as its DB source for Prisma but you can use MySQL, MSSQL, PostgreSQL, MongoDB, CockroachDB 

If you want to know more about Prisma ORM visit there link here https://www.prisma.io/