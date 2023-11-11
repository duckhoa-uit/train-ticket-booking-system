import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "constants.ts",
    "cn.ts",
    "dayjs.ts",
    "errors.ts",
    "get-safe-redirect-url.ts",
    "index.ts",
    "password.ts",
    "slugify.ts",
  ],
  format: ["cjs", "esm"],
  minify: isProduction,
  sourcemap: true,
  splitting: true,
});
