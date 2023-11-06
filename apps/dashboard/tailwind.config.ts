/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const base = require("@ttbs/config/tailwind-preset");

const config: Config = {
  ...base,
  plugins: [...base.plugins, require("tailwindcss-animate")],
};
export default config;
