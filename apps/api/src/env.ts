// src/env.mjs
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const envNumberSchema = z
  .string()
  // transform to number
  .transform((s) => parseInt(s, 10))
  // make sure transform worked
  .pipe(z.number());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    PORT: envNumberSchema,
    REDIS_HOST: z.string(),
    REDIS_PORT: envNumberSchema,
  },
  runtimeEnvStrict: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
});
