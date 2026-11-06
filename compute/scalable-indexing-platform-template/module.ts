import { module } from "@prisma/composer";
import { rawPostgres } from "@prisma/composer-prisma-cloud";
import app from "./service.ts";

export default module("dev-shelf-frontend", ({ provision }) => {
  const database = provision(rawPostgres({ name: "database" }));
  provision(app, { deps: { db: database } });
});
