# Fullstack Authentication Example with Next.js and NextAuth.js

This example shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) (frontend), [Next.js API routes](https://nextjs.org/docs/api-routes/introduction) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend). It also demonstrates how to implement authentication using [NextAuth.js](https://next-auth.js.org/). The example uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

Note that the app uses a mix of server-side rendering with `getServerSideProps` (SSR) and static site generation with `getStaticProps` (SSG). When possible, SSG is used to make database queries already at build-time (e.g. when fetching the [public feed](./pages/index.tsx)). Sometimes, the user requesting data needs to be authenticated, so SSR is being used to render data dynamically on the server-side (e.g. when viewing a user's [drafts](./pages/drafts.tsx)).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/rest-nextjs-api-routes-auth
__INLINE(../_setup-1.md)__
cd rest-nextjs-api-routes-auth
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/rest-nextjs-api-routes-auth
__INLINE(../_setup-3.md)__

### 3. Configuring your authentication provider

In order to get this example to work, you need to configure the [GitHub](https://next-auth.js.org/providers/github) and/or [Email](https://next-auth.js.org/providers/email) authentication providers from NextAuth.js.

#### Configuring the GitHub authentication provider

<details><summary>Expand to learn how you can configure the GitHub authentication provider</summary>

First, log into your [GitHub](https://github.com/) account.

Then, navigate to [**Settings**](https://github.com/settings/profile), then open to [**Developer Settings**](https://github.com/settings/apps), then switch to [**OAuth Apps**](https://github.com/settings/developers).

![](https://res.cloudinary.com/practicaldev/image/fetch/s--fBiGBXbE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/4eQrMAs.png)

Clicking on the **Register a new application** button will redirect you to a registration form to fill out some information for your app. The **Authorization callback URL** should be the Next.js `/api/auth` route.

An important thing to note here is that the **Authorization callback URL** field only supports a single URL, unlike e.g. Auth0, which allows you to add additional callback URLs separated with a comma. This means if you want to deploy your app later with a production URL, you will need to set up a new GitHub OAuth app.

![](https://res.cloudinary.com/practicaldev/image/fetch/s--v7s0OEs_--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/tYtq5fd.png)

Click on the **Register application** button, and then you will be able to find your newly generated **Client ID** and **Client Secret**. Copy and paste this info into the [`.env`](./env) file in the root directory.

The resulting section in the `.env` file might look like this:

```
# GitHub oAuth
GITHUB_ID=6bafeb321963449bdf51
GITHUB_SECRET=509298c32faa283f28679ad6de6f86b2472e1bff
```

</details>

#### Configuring the Email authentication provider

You can [follow the instructions in the NextAuth.js documentation](https://next-auth.js.org/providers/email#configuration) to configure the Email authentication provider. Once your email authentication provider is configured, you can set the environment variables in [`.env`](./env) accordingly.

### 4. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

__INLINE(../_evolving-the-app-rest-nextjs.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__