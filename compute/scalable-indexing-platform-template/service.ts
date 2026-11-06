import nextjs from "@prisma/composer/nextjs";
import { compute, postgres } from "@prisma/composer-prisma-cloud";

export default compute({
  name: "app",
  deps: { db: postgres() },
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
