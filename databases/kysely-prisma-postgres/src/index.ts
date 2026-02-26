import "dotenv/config";
import { Generated, Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "pg";

interface UserTable {
  id: Generated<number>;
  email: string;
  name: string | null;
}

interface PostTable {
  id: Generated<number>;
  title: string;
  content: string | null;
  published: boolean;
  author_id: number;
}

interface Database {
  users: UserTable;
  posts: PostTable;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to your .env file.");
}

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
const allowInsecureSsl = process.env.PG_SSL_INSECURE === "true";

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: allowInsecureSsl
        ? { rejectUnauthorized: false }
        : { rejectUnauthorized: true },
    }),
  }),
});
  }),
});

async function main() {
  // Ensure schema exists so this example can run standalone.
  await db.executeQuery(sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY,
      "email" varchar(255) NOT NULL UNIQUE,
      "name" varchar(255)
    )
  `.compile(db));

  await db.executeQuery(sql`
    CREATE TABLE IF NOT EXISTS "posts" (
      "id" serial PRIMARY KEY,
      "title" text NOT NULL,
      "content" text,
      "published" boolean NOT NULL DEFAULT false,
      "author_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE
    )
  `.compile(db));

  // Create a user with a post.
  const createdUser = await db
    .insertInto("users")
    .values({
      email: `alice${Date.now()}@prisma.io`,
      name: "Alice",
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  const createdPost = await db
    .insertInto("posts")
    .values({
      title: "Hello from Prisma Postgres via Kysely!",
      content: "This is my first post",
      published: true,
      author_id: createdUser.id,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log("Created user with post:", { ...createdUser, post: createdPost });

  // Query all published posts and include each author.
  const publishedPosts = await db
    .selectFrom("posts")
    .innerJoin("users", "users.id", "posts.author_id")
    .select([
      "posts.id",
      "posts.title",
      "posts.content",
      "posts.published",
      "users.id as authorId",
      "users.email as authorEmail",
      "users.name as authorName",
    ])
    .where("posts.published", "=", true)
    .execute();

  console.log("All published posts:", publishedPosts);

  // Update one post.
  const updatedPost = await db
    .updateTable("posts")
    .set({ title: "Hello from Prisma Postgres via Kysely! (updated)" })
    .where("id", "=", createdPost.id)
    .where("author_id", "=", createdUser.id)
    .returningAll()
    .executeTakeFirstOrThrow();

  console.log("Updated post:", updatedPost);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.destroy();
  });
