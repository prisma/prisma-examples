# Fullstack Example with Next.js (GraphQL API)

This example shows how to implement a **Fullstack Next.js app with GraphQL** with the following stack:

This example shows how to implement a **fullstack app in TypeScript with :
- [**Next.js**](https://nextjs.org/)**: A [React](https://reactjs.org/) framework
- [**Apollo Client**](https://www.apollographql.com/docs/react/) (frontend),
- [**GraphQL Yoga**](https://the-guild.dev/graphql/yoga-server): GraphQL server
- [**Pothos**](https://pothos-graphql.dev/): Code-first GraphQL schema definition library
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/graphql-nextjs
__INLINE(../_setup-1.md)__
cd graphql-nextjs
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/graphql-nextjs
__INLINE(../_setup-3.md)__

### 2. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx))

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./pages/signup.tsx`](./pages/signup.tsx))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./pages/create.tsx`](./pages/create.tsx))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./pages/drafts.tsx`](./pages/drafts.tsx))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./pages/p/[id].tsx`](./pages/p/[id].tsx)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

__INLINE(../../_using-the-graphql-api-nextjs.md)__

__INLINE(../_evolving-the-app-graphql-nextjs.md)__
__INLINE(../../_next-steps.md)__
