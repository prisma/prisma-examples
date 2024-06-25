import { z } from "zod";

export const UserFeatureFlagsSchema = z
  .object({
    EXAMPLE_FEATURE_FLAG: z.boolean().optional(),
    EXAMPLE_FEATURE_FLAG_STRING: z.string().optional(),
  })
  .default({});

export type UserFeatureFlags = z.infer<typeof UserFeatureFlagsSchema>;
