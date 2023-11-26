module.exports = {
  /**
   * Using prettier v2 instead v3:
   * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/176#issuecomment-1621926950
   */
  bracketSpacing: true,
  bracketSameLine: false,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 110,
  arrowParens: "always",
  endOfLine: "auto",
  importOrder: [
    // Mocks must be at the top as they contain vi.mock calls
    "(.*)/__mocks__/(.*)",
    "<THIRD_PARTY_MODULES>",
    "^@(ttbs|ee)/(.*)$",
    "^@lib/(.*)$",
    "^@components/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    /**
     * **NOTE** tailwind plugin must come last!
     * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
     */
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: ["apps/website/lib/utils/wordlist/wordlist.ts"],
      options: {
        quoteProps: "consistent",
      },
    },
  ],
};
