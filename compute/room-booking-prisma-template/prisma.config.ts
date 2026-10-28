import { definePrismaConfig } from "prisma/config";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";
import { defineConfig as composer } from "@prisma/composer/config";
import { nodeBuild } from "@prisma/composer/node/control";
import { nextjsBuild } from "@prisma/composer/nextjs/control";
import { prismaCloud, prismaState } from "@prisma/composer-prisma-cloud/control";

// The prisma CLI does not read env files by itself. Load .env.local when there
// is one, so `cp .env.example .env.local` is all the local setup the db:*
// scripts need. Not .env: `next build` copies .env into the standalone output
// that `prisma deploy` uploads, and a local database URL has no business there.
try {
  process.loadEnvFile(".env.local");
} catch (error) {
  // no .env.local: use the environment as it is (CI, Composer deploys)
  if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
}

export default definePrismaConfig({
  skills: {
    agents: [],
  },
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: process.env.DATABASE_URL!,
    },
  }),
  composer: composer({
    extensions: [prismaCloud({ region: "us-east-1" }), nodeBuild(), nextjsBuild()],
    state: prismaState(),
  }),
});
