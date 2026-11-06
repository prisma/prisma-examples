import  prisma  from "../src/lib/prisma";
import { INITIAL_RESOURCES } from "../src/lib/data";

async function main() {
  console.log("🌱 Starting DevShelf initial seed...");

  // 1. Seed sample users
  const anas = await prisma.user.upsert({
    where: { email: "anas@devshelf.io" },
    update: {},
    create: {
      email: "anas@devshelf.io",
      username: "anas",
      name: "Anas",
    },
  });

  const sampleUsers = [
    { email: "alice@prisma.io", username: "alice", name: "Alice" },
    { email: "bob@prisma.io", username: "bob", name: "Bob" },
    { email: "carol@prisma.io", username: "carol", name: "Carol" },
  ];

  for (const u of sampleUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }

  console.log("✅ Seeded core users (Anas, Alice, Bob, Carol).");

  // 2. Seed 20 curated DevShelf resources from data.ts
  for (const item of INITIAL_RESOURCES) {
    await prisma.resource.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        description: item.description,
        url: item.url,
        category: item.category,
        difficulty: item.difficulty,
        tags: item.tags,
        stars: item.stars || 0,
        author: item.author || "DevShelf Contributor",
      },
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        url: item.url,
        category: item.category,
        difficulty: item.difficulty,
        tags: item.tags,
        stars: item.stars || 0,
        author: item.author || "DevShelf Contributor",
        userId: anas.id,
      },
    });
  }

  console.log(`✅ Seeded ${INITIAL_RESOURCES.length} DevShelf curated learning resources.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
