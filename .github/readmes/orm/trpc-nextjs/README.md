# Fullstack Example with Next.js (tRPC)

This example shows how to implement a **Fullstack Next.js app with the t3 stack** with the following tools:

This example shows how to implement a **fullstack app in TypeScript with :
- [**Next.js**](https://nextjs.org/)**: A [React](https://reactjs.org/) framework
- [**tRPC**](https://trpc.io/)
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

> Check out the [t3](https://create.t3.gg/) to learn how to create a production ready example.

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/trpc-nextjs
__INLINE(../_setup-1.md)__
cd trpc-nextjs
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/trpc-nextjs
__INLINE(../_setup-3.md)__

### 3. Start the app

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

## Using the tRPC API

The application has the following queries and mutations:
### Queries
- `feed`: Fetch all *published* posts
- `drafts`: Fetch all *drafted* posts
- `postById`: Fetch a *single* post by `id`
- `filterPosts`: filter posts containing a specific `searchString` input

### Mutations
- `createDraft`: Create a new post
    - Inputs:
        - `title: String` (required): The title of the post
        - `content: String` : The content of the post
        - `authorEmail: String` (required): The email of the post's author
- `publishPost`: Publish a post by its `id`
- `deletePost`: Delete a post by its `id`
- `signup`: Create a new user
    - Inputs:
        - `email: String` (required): The email address of the user
        - `name: String`: The name of the user



__INLINE(../_evolving-the-app-rest-nextjs.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
