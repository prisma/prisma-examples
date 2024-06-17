# Nuxt Example App Using Prisma Nuxt Module

This example app showcases the usage of the [Prisma Nuxt module](https://github.com/prisma/nuxt-prisma).

- The [`usePrismaClient` composable](./components/FirstUser.server.vue)
- [Custom PrismaClient instance](./lib/prisma.ts) extended with an `exists` method, leveraging Prisma Client extensions to verify item existence within a model.

## Getting started

1. Clone the repository, navigate into it and install dependencies:

   ```terminal
   git clone git@github.com:prisma/prisma-examples.git --depth=1
   cd prisma-examples/typescript/nuxtjs-prisma-nuxt-module
   npm install
   ```

2. Create a `.env` file:

   ```terminal
   DATABASE_URL="file:./dev.db"
   ```

3. Start the development server:

   ```terminal
   npm run dev
   ```

4. Follow the instructions in the terminal to launch Prisma Studio integrated in the Nuxt devtools within your browser.

## Resources

- [Github repository](https://github.com/prisma/nuxt-prisma)
- [Documentation](https://pris.ly/prisma-nuxt)
- [Changelog](https://www.prisma.io/changelog)
