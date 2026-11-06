import nextjs from "@prisma/composer/nextjs";
import { compute, rawPostgres } from "@prisma/composer-prisma-cloud";

export default compute({
  name: "app",
  deps: { db: rawPostgres() },
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
