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

    DATABASE_URL: z.string().url(),
    JWT_ACCESS_TOKEN_PRIVATE_KEY: z.string(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: z.string(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: z.string(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: z.string(),

    // CLERK_SECRET_KEY: z.string().min(1),

    API_PORT: envNumberSchema,
    REDIS_HOST: z.string(),
    REDIS_PORT: envNumberSchema,
  },
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env["NODE_ENV"],
    DATABASE_URL: process.env["DATABASE_URL"],
    JWT_ACCESS_TOKEN_PRIVATE_KEY: process.env["JWT_ACCESS_TOKEN_PRIVATE_KEY"],
    JWT_ACCESS_TOKEN_PUBLIC_KEY: process.env["JWT_ACCESS_TOKEN_PUBLIC_KEY"],
    JWT_REFRESH_TOKEN_PRIVATE_KEY: process.env["JWT_REFRESH_TOKEN_PRIVATE_KEY"],
    JWT_REFRESH_TOKEN_PUBLIC_KEY: process.env["JWT_REFRESH_TOKEN_PUBLIC_KEY"],
    // CLERK_SECRET_KEY: process.env["CLERK_SECRET_KEY"],
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
    API_PORT: process.env["API_PORT"],
    REDIS_HOST: process.env["REDIS_HOST"],
    REDIS_PORT: process.env["REDIS_PORT"],
  },
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],
});
