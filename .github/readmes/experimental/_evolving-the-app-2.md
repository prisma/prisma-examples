### 4. Use the updated Prisma Client in your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Here are some examples:

#### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    imageURL: 'https://cdn.com/alice.png',
    user: {
      connect: { email: 'alice@prisma.io' },
    },
  },
})
```

#### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    email: 'john@prisma.io',
    name: 'John',
    profile: {
      create: {
        bio: 'Hello World',
      },
    },
  },
})
```

#### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: 'alice@prisma.io' },
  data: {
    profile: {
      update: {
        bio: 'Hello Friends',
        imageURL: 'https://cdn.com/john.png',
      },
    },
  },
})
```
