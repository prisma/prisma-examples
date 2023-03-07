# Fullstack Example with SvelteKit (REST API)

This example shows how to implement a **fullstack app with [SvelteKit](https://kit.svelte.dev/)** using [Svelte](https://svelte.dev/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template javascript/rest-sveltekit
__INLINE(../_setup-1.md)__
cd rest-sveltekit
__INLINE(../_setup-2.md)__
cd prisma-examples/javascript/rest-sveltekit
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

__INLINE(../../_using-the-rest-api-sveltekit.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../_next-steps-rest-sveltekit.md)__
