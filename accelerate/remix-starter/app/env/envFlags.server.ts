import z from "zod";
import { generateErrorMessage } from "zod-error";

export const serverEnvSchema = z.object({
  DIRECT_DATABASE_URL: z.string(),
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Zod will filter all the keys not specified on the schema */
function buildEnv(): ServerEnv {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error: unknown) {
    console.error("Warning: invalid server env vars!");
    console.error(
      generateErrorMessage((error as z.ZodError).issues, {
        delimiter: { error: "\n" },
      }),
    );

    return {} as ServerEnv;
  }
}

export const SERVER_ENV = buildEnv();
