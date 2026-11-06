import  prisma  from "../src/lib/prisma";

async function main() {
  console.log("⚡ Starting 1,000,000 Users and Resources high-throughput seed...");
  const startTime = Date.now();

  // 1. Bulk generate 1,000,000 Users directly inside PostgreSQL
  console.log("📦 Generating 1,000,000 Users via PostgreSQL generate_series...");
  const usersStart = Date.now();
  await prisma.$executeRawUnsafe(`
    INSERT INTO "User" (id, email, username, name, "createdAt", "updatedAt")
    SELECT
      gen_random_uuid()::text,
      'dev_' || s.i || '@devshelf.io',
      'dev_' || s.i,
      'Developer ' || s.i,
      NOW() - ((s.i % 365) || ' days')::INTERVAL,
      NOW()
    FROM generate_series(1, 1000000) AS s(i)
    ON CONFLICT (email) DO NOTHING;
  `);
  console.log(`✅ 1,000,000 Users inserted in ${((Date.now() - usersStart) / 1000).toFixed(2)}s!`);

  // 2. Bulk generate 1,000,000 DevShelf Resources based on data.ts schema
  console.log("📦 Generating 1,000,000 DevShelf Resources via PostgreSQL generate_series...");
  const resourcesStart = Date.now();
  await prisma.$executeRawUnsafe(`
    INSERT INTO "Resource" (id, title, description, url, category, difficulty, tags, stars, author, "createdAt", "updatedAt")
    SELECT
      gen_random_uuid()::text,
      (ARRAY[
        'Build an LLM from Scratch with PyTorch & Triton',
        'Full-Stack Next.js 15 & PostgreSQL Architecture Guide',
        'Kubernetes Zero-to-Production on Bare Metal',
        'Modern Cryptography & Web Security Handbook',
        'Distributed Systems & Raft Consensus in Go',
        'React Native & Expo: Native Audio Synthesizer',
        'TypeScript Clean Architecture & Hexagonal Domain Design',
        'Computer Vision with YOLOv11 & OpenCV Pipelines',
        'Terraform & AWS Enterprise Multi-Region Infrastructure',
        'High-Performance Rust Microservices with Axum & Tokio'
      ])[1 + (s.i % 10)] || ' #' || s.i,
      'End-to-end production guide with benchmarks and system architecture design.',
      'https://github.com/devshelf/blueprint-' || s.i,
      (ARRAY['Web Dev', 'Machine Learning', 'DevOps', 'Cybersecurity', 'Cloud Computing', 'Mobile Dev'])[1 + (s.i % 6)],
      (ARRAY['Beginner', 'Intermediate', 'Advanced'])[1 + (s.i % 3)],
      ARRAY['#TypeScript', '#PostgreSQL', '#Nextjs', '#Prisma', '#Docker'],
      (floor(random() * 45000))::INT,
      'Author ' || (s.i % 250),
      NOW() - ((s.i % 180) || ' days')::INTERVAL,
      NOW()
    FROM generate_series(1, 1000000) AS s(i);
  `);
  console.log(`✅ 1,000,000 Resources inserted in ${((Date.now() - resourcesStart) / 1000).toFixed(2)}s!`);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`🎉 Total 2,000,000 records seeded successfully in ${totalTime}s!`);
}

main()
  .catch((e) => {
    console.error("❌ 1M Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

