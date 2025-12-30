import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const main = async () => {
  console.log("Seeding database...");

  const connectionString = Deno.env.get("DATABASE_URL");
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  console.time("Seeding complete 🌱");

  // Clear existing tasks
  await prisma.task.deleteMany();

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Set up Prisma",
        description: "Initialize Prisma with Deno and configure the schema",
        completed: true,
      },
      {
        title: "Create Task API",
        description: "Implement CRUD endpoints for tasks",
        completed: true,
      },
      {
        title: "Deploy to Deno Deploy",
        description: "Configure and deploy the application",
        completed: false,
      },
      {
        title: "Add authentication",
        description: "Implement user authentication with Deno KV",
        completed: false,
      },
      {
        title: "Write tests",
        description: "Add unit and integration tests",
        completed: false,
      },
    ],
  });

  console.timeEnd("Seeding complete 🌱");

  const tasks = await prisma.task.findMany();
  console.log(`Created ${tasks.length} tasks`);
};

main()
  .then(() => {
    console.log("Process completed");
    Deno.exit(0);
  })
  .catch((e) => {
    console.error(e);
    Deno.exit(1);
  });
