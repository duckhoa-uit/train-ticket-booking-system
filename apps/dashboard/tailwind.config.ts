/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const base = require("@ttbs/config/tailwind-preset");

const config: Config = {
  ...base,
  content: [
    ...base.content,
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  plugins: [...base.plugins, require("tailwindcss-animate")],
};
export default config;
