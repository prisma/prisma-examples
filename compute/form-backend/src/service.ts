import { secretString } from "@prisma/composer/arktype";
import node from "@prisma/composer/node";
import { compute } from "@prisma/composer-prisma-cloud";
import { pnPostgres } from "@prisma/composer-prisma-cloud/prisma-next";
import { type } from "arktype";

import { appContract } from "./prisma/composer.ts";

export default compute({
  name: "app",
  deps: {
    database: pnPostgres(appContract),
  },
  input: type({
    /** Password for the `/admin` dashboard. Bound from `ADMIN_PASSWORD` in `module.ts`. */
    adminPassword: secretString(),
  }),
  build: node({ module: import.meta.url, dir: "../dist", entry: "server.mjs" }),
});
