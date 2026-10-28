import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    // Applies the migrations to TEST_DATABASE_URL before the integration tests.
    globalSetup: ["tests/global-setup.ts"],
    // The integration tests share one database; run files one after another.
    fileParallelism: false,
    testTimeout: 30_000,
  },
});
