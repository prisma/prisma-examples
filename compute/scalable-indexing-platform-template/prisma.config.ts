import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as defineComposerConfig } from "@prisma/composer/config";
import { nextjsBuild } from "@prisma/composer/nextjs/control";
import { prismaCloud, prismaState } from "@prisma/composer-prisma-cloud/control";

export default definePrismaConfig({
  composer: defineComposerConfig({
    entry: "./module.ts",
    extensions: [prismaCloud({ region: "ap-southeast-1" }), nextjsBuild()],
    state: prismaState(),
  }),
});
