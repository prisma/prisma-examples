## Evolving the app

Evolving the application typically requires four subsequent steps:

1. Update your Prisma schema
1. Save and migrate the database schema using Prisma Migrate
1. Generate Prisma Client to match the new schema with `prisma2 generate`
1. Use the updated Prisma Client in your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a single profile (1:1 relationship) and write a short bio about themselves and add a link to an image.

### 1. Update your Prisma schema

The first step would be to add a new model to the Prisma schema, e.g. called `Profile`. Prisma Migrate will create a corresponding table in the database.

To define a `1:1` relationship between `User` and `Profile`, you need to specify the relation field on both models as follows:

Add the Profile model with a `user` field of type `User`:

```prisma
model Profile {
  id       Int    @id @default(autoincrement())
  user     User
  bio      String
  imageURL String?
}
```

Add the `Profile` relation field to the `User` model:

```diff
model User {
   id      Int      @id @default(autoincrement())
   email   String   @unique
   name    String?
   posts   Post[]
+  profile Profile?
}
```

### 2. Save and run the migration

#### Save the migration

To migrate the database schema you first need to save the migration as follows:

```
npx prisma2 migrate save --name 'add-profile' --experimental
```

The CLI will output the planned changes and save the migration files in `prisma/migrations/20200313000000-add-profile/` (they contain details about required migrations steps and SQL operations).

#### Run the migration

Now that the migration has been saved you can run the migration as follows:

```
npx prisma2 migrate up --experimental
```

This will actually perform the schema migration against the database.

Assuming everything went right, the CLI should output:

```
🚀    Done with 1 migration
```

### 3. Generate Prisma Client

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

```
npx prisma2 generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.

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
