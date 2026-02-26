import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to your .env file.");
}

const allowInvalidCert = process.env.DB_ALLOW_INVALID_CERT === "true";

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: !allowInvalidCert },
  synchronize: true,
  logging: false,
  entities: [User, Post],
});

async function main() {
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);
  const postRepository = dataSource.getRepository(Post);

  // Create a user with a post.
  const user = userRepository.create({
    email: `alice${Date.now()}@prisma.io`,
    name: "Alice",
    posts: [
      postRepository.create({
        title: "Hello from Prisma Postgres via TypeORM!",
        content: "This is my first post",
        published: true,
      }),
    ],
  });
  const savedUser = await userRepository.save(user);
  console.log("Created user with post:", savedUser);

  // Query all published posts with their author.
  const posts = await postRepository.find({
    where: { published: true },
    relations: { author: true },
  });
  console.log("All published posts:", posts);

  // Update a post.
  const firstPost = posts[0];
  if (!firstPost) {
    throw new Error("No post found to update.");
  }

  firstPost.title = "Hello from Prisma Postgres via TypeORM! (updated)";
  const updatedPost = await postRepository.save(firstPost);
  console.log("Updated post:", updatedPost);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });
