# Fullstack Example with SvelteKit Actions and Load Functions

This example shows how to implement a **fullstack app in TypeScript with [SvelteKit](https://kit.svelte.dev/)** using SvelteKit's [actions](https://kit.svelte.dev/docs/form-actions) and [load](https://kit.svelte.dev/docs/form-actions#loading-data) functions and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/sveltekit
__INLINE(../_setup-1.md)__
cd sveltekit
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/sveltekit
__INLINE(../_setup-3.md)__

### 3. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:5173/`](http://localhost:5173/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./src/routes/+page.svelte`](./src/routes/+page.svelte))

![home page](https://user-images.githubusercontent.com/49971500/214607585-2b21d5ea-7810-4f58-b866-f58f267e48a2.png)

**Signup** (located in [`./src/routes/signup/+page.svelte`](./src/routes/signup/+page.svelte))

![Sign up page](https://user-images.githubusercontent.com/49971500/214607832-be532abb-c28a-496c-b5b9-54295ab40edf.png)

**Create post (draft)** (located in [`./src/routes/create/+page.svelte`](./src/routes/create/+page.svelte))

![Create Post page](https://user-images.githubusercontent.com/49971500/214608388-022b23c6-05c5-4892-9839-a9e8c2de37c7.png)

**Drafts** (located in [`./src/routes/drafts/+page.svelte`](./src/routes/drafts/+page.svelte))

![View Draft[(https://user-images.githubusercontent.com/49971500/214608068-8a8b2b12-f47b-434f-b668-14fdd1df9edd.png)

**View post** (located in [`./src/routes/p/[id]/+page.svelte`](./src/routes/p/[id]/+page.svelte)) (delete or publish here)

![View Post](https://user-images.githubusercontent.com/49971500/214607411-9b470fa3-bc88-4b14-86e6-9ec18fd2e3dd.png)

</details>

## Using the SvelteKit Actions and Load functions

The `load` functions interact with the server to get data into your pages while the `actions` function mutates your data. Both these functions are defined in the `+page.server.ts` in the respective route folders.

### `LOAD`
- `/`: Fetch all *published* posts
- `/drafts`: Fetch all *drafted* posts
- `/p/:id`: Fetch a *single* post by its `id`

### `ACTIONS`
- `/create`: Create a new post
    - `default` action body:
        - `title: String` (required): The title of the post
        - `content: String` (required): The content of the post
        - `authorEmail: String` (required): The email post's author
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
