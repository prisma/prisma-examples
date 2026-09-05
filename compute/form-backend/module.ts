import { module } from "@prisma/composer";
import { envSecret } from "@prisma/composer-prisma-cloud";
import { pnPostgres } from "@prisma/composer-prisma-cloud/prisma-next";

import { appContract } from "./src/prisma/composer.ts";
import app from "./src/service.ts";

export default module("form-backend", ({ provision }) => {
  const database = provision(
    pnPostgres({
      name: "database",
      contract: appContract,
      config: "./prisma.config.ts",
    }),
    { id: "database" },
  );

  provision(app, {
    deps: { database },
    input: { adminPassword: envSecret("ADMIN_PASSWORD") },
  });
});
