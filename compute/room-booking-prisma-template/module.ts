import { module } from "@prisma/composer";
import { postgres } from "@prisma/composer-prisma-cloud/orm";

import { appContract } from "./src/prisma/composer.ts";
import app from "./service.ts";

export default module("room-booking-prisma-template", ({ provision }) => {
  const database = provision(
    postgres({
      name: "database",
      contract: appContract,
      config: "./prisma.config.ts",
    }),
    { id: "database" },
  );

  provision(app, { deps: { database } });
});
