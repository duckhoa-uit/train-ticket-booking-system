export default {
  "(apps|packages)/**/*.{js,ts,jsx,tsx}": ["prettier --write", "eslint --fix"],
  "*.json": ["prettier --write"],
  "packages/prisma/schema.prisma": ["npx prisma format"],
  // "**/*.ts?(x)": () => "npm run type-check",
};
