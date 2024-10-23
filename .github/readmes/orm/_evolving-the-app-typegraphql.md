## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// schema.prisma

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id      Int      @default(autoincrement()) @id 
  name    String? 
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  userId Int     @unique
+  user   User    @relation(fields: [userId], references: [id])
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev
```

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement new queries and mutations in the GraphQL API.

#### 2.1. Use the updated Prisma Client in your application code

#### 2.1. Create GraphQL type for `Profile` model using TypeGraphQL

You can use TypeGraphQL to expose the new `Profile` model. Create a new file named `src\Profile.ts` and add the following code:

```ts
import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Profile {
  @Field((type) => ID)
  id: number;

  @Field((type) => User, { nullable: true })
  user?: User | null;

  @Field((type) => String, { nullable: true })
  bio?: string | null;
}
```

Create a new file named `src\ProfileCreateInput.ts` with the following code:

```ts
import "reflect-metadata";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";

@InputType()
export class ProfileCreateInput {
  @Field((type) => String, { nullable: true })
  bio?: string | null;
}
```

Add the `profile` field to `src\User.ts` and import the `Profile` class.

```ts
@Field(type => Profile, { nullable: true })
profile?: Profile | null;
```

Add the `profile` field to `src\UserCreateInput.ts` and import the `ProfileCreateInput` class:

```ts
@Field(type => ProfileCreateInput, { nullable: true })
profile?: ProfileCreateInput | null;
```

Extend the `src\UserResolver.ts` class with an additional field resolver:

```ts
@FieldResolver()
async profile(@Root() user: User, @Ctx() ctx: Context): Promise<Profile> {
  return (await ctx.prisma.user.findUnique({
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

```graphql
mutation {
  signupUser(data: {
    email:"katla@prisma.io", 
    profile: { bio: "Sometimes I'm an Icelandic volcano, sometimes I'm a dragon from a book."}
  })
  {
    id
    email
    posts {
      title
    }
    profile {
      id
      bio
    }
  }
}
```

Run the following query to return a user and their profile:

```graphql
query {
  user(id: 1) {
    email
    profile {
      id
      bio
    }
    posts {
      title
      content
    }
  }
}
```

#### 2.2. Update usage of Prisma Client

As the Prisma Client API was updated, you can now also invoke "raw" operations via `prisma.profile` directly.

##### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: "Hello World",
    user: {
      connect: { email: "alice@prisma.io" },
    },
  },
});
```

##### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    email: "john@prisma.io",
    name: "John",
    profile: {
      create: {
        bio: "Hello World",
      },
    },
  },
});
```

##### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: {
    profile: {
      update: {
        bio: "Hello Friends",
      },
    },
  },
});
```
