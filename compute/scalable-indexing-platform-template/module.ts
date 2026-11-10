import { module } from "@prisma/composer";
import { postgres } from "@prisma/composer-prisma-cloud/orm";

import { appContract } from "./src/prisma/composer.ts";
import app from "./service.ts";

export default module("dev-shelf-frontend", ({ provision }) => {
  // A Prisma Postgres database per deploy. Composer applies the committed
  // migrations in ./migrations before the app starts.
  const database = provision(
    postgres({
      name: "database",
      contract: appContract,
      config: "./prisma.config.ts",
    }),
    { id: "database" },
  );

  provision(app, { deps: { db: database } });
});
