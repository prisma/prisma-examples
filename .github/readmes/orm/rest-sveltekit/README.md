# Fullstack Example with SvelteKit (REST API)

This example shows how to implement a **fullstack app in TypeScript with [SvelteKit](https://kit.svelte.dev/)** using [Svelte](https://svelte.dev/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/rest-sveltekit
__INLINE(../_setup-1.md)__
cd rest-sveltekit
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/rest-sveltekit
__INLINE(../_setup-3.md)__

### 3. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:5173/`](http://localhost:5173/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./src/routes/+page.svelte`](./src/routes/+page.svelte))

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./src/routes/signup/+page.svelte`](./src/routes/signup/+page.svelte))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./src/routes/create/+page.svelte`](./src/routes/create/+page.svelte))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./src/routes/drafts/+page.svelte`](./src/routes/drafts/+page.svelte))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./src/routes/p/[id]/+page.svelte`](./src/routes/p/[id]/+page.svelte)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

The `load` functions interact with the server to get data into your pages while the `actions` function mutates your data. Both these funcitons are defined in the `+page.server.ts` in the respective route folders.

### `LOAD`
- `/`: Fetch all *published* posts
- `/drafts`: Fetch all *drafted* posts
- `/p/:id`: Fetch a *single* post by its `id`

### `ACTIONS`
- `/create`: Create a new post
    - `default` action body:
        - `title: String` (required): The title of the post
        - `content: String` (required): The content of the post
        - `authorEmail: String` (required): The email of the user that creates the post
- `/p/:id`:
    - `publishPost` action: Publish a post by its `id`
    - `deletePost` action: Delete a post by its `id`
- `/signup`: Create a new user
    - `default` action body:
        - `email: String` (required): The email address of the user
        - `name: String` (required): The name of the user

__INLINE(../_evolving-the-app-sveltekit.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
