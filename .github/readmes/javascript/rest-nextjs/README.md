# Fullstack Example with Next.js (REST API)

This example shows how to implement a **fullstack app** using [React](https://reactjs.org/) (frontend), [Express](https://expressjs.com/) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md) (backend). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-1.md)__
cd prisma-examples/javascript/rest-nextjs
__INLINE(../_setup-2.md)__

### 2. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

**Blog** (located in [`./src/pages/index.ts`](./src/pages/index.ts)

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./src/pages/signup.ts`](./src/pages/signup.ts))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./src/pages/create.ts`](./src/pages/create.ts))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./src/pages/drafts.ts`](./src/pages/drafts.ts))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./src/pages/p/[id].ts`](./src/pages/p/[id].ts)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

__INLINE(../../_using-the-rest-api-nextjs.md)__

__INLINE(../_next-steps-fullstack.md)__