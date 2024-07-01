import { globalEnvSchema } from "../app/env/globalEnv";
import { serverEnvSchema } from "../app/env/envFlags.server";

const serverEnvResult = serverEnvSchema.safeParse(process.env);
const clientEnvResult = globalEnvSchema.safeParse(process.env);

if (!serverEnvResult.success || !clientEnvResult.success) {
  process.exit(-1);
}

console.log("Client and server env vars are valid!");
