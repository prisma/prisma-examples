# Fullstack Example with NuxtJs (REST API)

This example shows how to implement a **fullstack app with [NuxtJs](https://nuxtjs.org//)** using [Vue](https://vuejs.org/) (frontend), [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/javascript/rest-nuxtjs
__INLINE(../_setup-1.md)__
cd rest-nuxtjs
__INLINE(../_setup-2.md)__
cd prisma-examples/javascript/rest-nuxtjs
__INLINE(../_setup-3.md)__

### 3. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.vue`](./pages/index.vue)

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./pages/signup.vue`](./pages/signup.vue))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./pages/create.vue`](./pages/create.vue))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./pages/drafts.vue`](./pages/drafts.vue))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./pages/p/_id.vue`](./pages/p/_id.vue)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

__INLINE(../../_using-the-rest-api-nuxtjs.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../_next-steps-rest-nuxtjs.md)__
