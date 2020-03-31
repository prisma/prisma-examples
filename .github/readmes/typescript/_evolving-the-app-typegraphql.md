## Evolving the app

Evolving the application typically requires four subsequent steps:

1. Migrating the database schema using SQL
1. Updating your Prisma schema by introspecting the database with `prisma introspect`
1. Generating Prisma Client to match the new database schema with `prisma generate`
1. Using the updated Prisma Client in your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Change your database schema using SQL

The first step would be to add a new table, e.g. called `Profile`, to the database. In SQLite, you can do so by running the following SQL statement:

```sql
CREATE TABLE "Profile" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "bio" TEXT,
  "user" INTEGER NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE SET NULL
);
```

To run the SQL statement against the database, you can use the `sqlite3` CLI in your terminal, e.g.:

```bash
sqlite3 dev.db \
'CREATE TABLE "Profile" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "bio" TEXT,
  "user" INTEGER NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE SET NULL
);'
```

Note that we're adding a unique constraint to the foreign key on `user`, this means we're expressing a 1:1 relationship between `User` and `Profile`, i.e.: "one user has one profile".

While your database now is already aware of the new table, you're not yet able to perform any operations against it using Prisma Client. The next two steps will update the Prisma Client API to include operations against the new `Profile` table.

### 2. Introspect your database

The Prisma schema is the foundation for the generated Prisma Client API. Therefore, you first need to make sure the new `Profile` table is represented in it as well. The easiest way to do so is by introspecting your database:

```
npx prisma introspect
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run Prisma 2 CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g @prisma/cli`. When using Yarn, you can run: `yarn prisma dev`.

The `introspect` command updates your `schema.prisma` file. It now includes the `Profile` model and its 1:1 relation to `User`:

```prisma
model Post {
  author    User?
  content   String?
  id        Int     @id
  published Boolean @default(false)
  title     String
}

model User {
  email   String   @unique
  id      Int      @id
  name    String?
  post    Post[]
  profile Profile?
}

model Profile {
  bio  String?
  id   Int     @id
  user User
}
```

### 3. Generate Prisma Client

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

```
npx prisma generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.

### 4. Use the updated Prisma Client in your application code

#### Option A: Expose `Profile` operations via TypeGraphQL

You can use TypeGraphQL to expose the new `Profile` model.

Create a new file named `src\Profile.ts` and add the following code:

```ts
import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'
import { User } from './User'

@ObjectType()
export class Profile {
  @Field(type => ID)
  id: number

  @Field(type => User, { nullable: true })
  user?: User | null

  @Field(type => String, { nullable: true })
  bio?: string | null
}
```

Create a new file named `src\ProfileCreateInput.ts` with the following code:

```ts
import 'reflect-metadata'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { User } from './User'

@InputType()
export class ProfileCreateInput {
  @Field(type => String, { nullable: true })
  bio?: string | null
}
```

Add the `bio` field to `.src\User.ts` and import the `Profile` class.

```ts
  @Field(type => Profile, { nullable: true })
  bio?: Profile | null;
```

Add the `bio` field to `src\UserCreateInput.ts` and import the `ProfileCreateInput` class:

```ts
  @Field(type => ProfileCreateInput, { nullable: true })
  bio?: ProfileCreateInput | null;
```

Extend the `src\UserResolver.ts` class with an additional field resolver:

```ts
  @FieldResolver()
  async bio(@Root() user: User, @Ctx() ctx: Context): Promise<Profile> {
    return (await ctx.prisma.user.findOne({
      where: {
        id: user.id
      }
    }).profile())!
  }
```

Update the `signupUser` mutation to include the option to create a profile when you sign up a new user:

```ts
  @Mutation(returns => User)
  async signupUser(
    @Arg("data") data: UserCreateInput,
    @Ctx() ctx: Context): Promise<User> {
    try {
      return await ctx.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          profile: {
            create: {
              bio: data.bio?.bio
            }
          }
        }
      });
    }
    catch (error) {
      throw error;
    }
  }
```

Run the following mutation to create a user with a profile:

```
mutation {
  signupUser(data: {email:"katla@prisma.io", bio: { bio: "Sometimes I'm an Icelandic volcano, sometimes I'm a dragon from a book."}})
  {
    id,
    email,
    posts {
      title
    }
    bio {
      id,
      bio
    }
  }
}
```

Run the following query to return a user and their profile:

```
query {
  user(id:1) {
    email,
    bio {
      id,
      bio
    }
    posts {
      title,
      content
      }
  }
}
```

#### Option B: Use the `PrismaClient` instance directly

As the Prisma Client API was updated, you can now also invoke "raw" operations via `prisma.profile` directly.

##### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    user: {
      connect: { email: 'alice@prisma.io' },
    },
  },
})
```

##### Create a new user with a new profile

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

##### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: 'alice@prisma.io' },
  data: {
    profile: {
      update: {
        bio: 'Hello Friends',
      },
    },
  },
})
```
