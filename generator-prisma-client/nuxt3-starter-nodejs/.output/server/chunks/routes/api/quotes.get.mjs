import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { PrismaPg } from '@prisma/adapter-pg';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as runtime from '@prisma/client/runtime/client';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';

const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
    },
    "output": {
      "value": "/Users/jkomyno/work/prisma/prisma-examples-ama/generator-prisma-client/nuxt3-starter-nodejs/lib/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "client"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "queryCompiler"
    ],
    "sourceFilePath": "/Users/jkomyno/work/prisma/prisma-examples-ama/generator-prisma-client/nuxt3-starter-nodejs/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.11.0",
  "engineVersion": "9c30299f5a0ea26a96790e13f796dc6094db3173",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": 'generator client {\n  provider        = "prisma-client"\n  output          = "../lib/generated/prisma"\n  previewFeatures = ["driverAdapters", "queryCompiler"]\n}\n\ndatasource db {\n  provider  = "postgresql"\n  url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}\n\nenum QuoteKind {\n  Fact\n  Opinion\n}\n\nmodel Quotes {\n  id        Int       @id @default(autoincrement())\n  quote     String\n  kind      QuoteKind @default(Opinion)\n  createdAt DateTime  @default(now())\n}\n',
  "inlineSchemaHash": "291d7f203aadf7bbce62eb81bcd54b94ff4ead1a273ad9c5f673691438faa902",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
};
config.runtimeDataModel = JSON.parse('{"models":{"Quotes":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"quote","kind":"scalar","type":"String"},{"name":"kind","kind":"enum","type":"QuoteKind"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.engineWasm = void 0;
config.compilerWasm = {
  getRuntime: async () => await import('@prisma/client/runtime/query_compiler_bg.postgresql.mjs'),
  getQueryCompilerWasmModule: async () => {
    const dynamicRequireFn = async (name) => typeof globalThis.__non_webpack_require__ === "function" ? Promise.resolve(globalThis.__non_webpack_require__(name)) : await import(
      /* webpackIgnore: true */
      name
    );
    const { readFile } = await dynamicRequireFn("node:fs/promises");
    const { createRequire } = await dynamicRequireFn("node:module");
    const _require = createRequire(globalThis._importMeta_.url);
    const wasmModulePath = _require.resolve("@prisma/client/runtime/query_compiler_bg.postgresql.wasm");
    const wasmModuleBytes = await readFile(wasmModulePath);
    return new globalThis.WebAssembly.Module(wasmModuleBytes);
  }
};
function getPrismaClientClass(dirname) {
  config.dirname = dirname;
  return runtime.getPrismaClient(config);
}

const __dirname = path.dirname(fileURLToPath(globalThis._importMeta_.url));
const PrismaClient = getPrismaClientClass(__dirname);

function getDb({ connectionString }) {
  const pool = new PrismaPg({ connectionString });
  const prisma2 = new PrismaClient({ adapter: pool });
  return prisma2;
}
const prisma = getDb({ connectionString: process.env.DIRECT_URL });

const quotes_get = defineEventHandler(async (event) => {
  const quotes = await prisma.quotes.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return quotes;
});

export { quotes_get as default };
//# sourceMappingURL=quotes.get.mjs.map
