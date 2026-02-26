import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { and, eq, sql } from "drizzle-orm";
import postgres from "postgres";
import { posts, users } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to your .env file.");
}

const client = postgres(process.env.DATABASE_URL, { ssl: "require" });
const db = drizzle(client);

async function main() {
  // Ensure schema exists so this example can run standalone.
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY,
      "email" varchar(255) NOT NULL UNIQUE,
      "name" varchar(255)
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "posts" (
      "id" serial PRIMARY KEY,
      "title" text NOT NULL,
      "content" text,
      "published" boolean NOT NULL DEFAULT false,
      "author_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE
    )
  `);

  // Create a user with a post.
  const [newUser] = await db
    .insert(users)
    .values({
      email: `alice${Date.now()}@prisma.io`,
      name: "Alice",
    })
    .returning();

  if (!newUser) {
    throw new Error("Failed to create user.");
  }

  const [newPost] = await db
    .insert(posts)
    .values({
      title: "Hello from Prisma Postgres via Drizzle!",
      content: "This is my first post",
      published: true,
      authorId: newUser.id,
    })
    .returning();

  if (!newPost) {
    throw new Error("Failed to create post.");
  }

  console.log("Created user with post:", { ...newUser, post: newPost });

  // Query all published posts and include each author.
  const publishedPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      published: posts.published,
      author: {
        id: users.id,
        email: users.email,
        name: users.name,
      },
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true));

  console.log("All published posts:", publishedPosts);

  // Update one post.
  const [updatedPost] = await db
    .update(posts)
    .set({ title: "Hello from Prisma Postgres via Drizzle! (updated)" })
    .where(and(eq(posts.id, newPost.id), eq(posts.authorId, newUser.id)))
    .returning();

  console.log("Updated post:", updatedPost);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end({ timeout: 5 });
  });
