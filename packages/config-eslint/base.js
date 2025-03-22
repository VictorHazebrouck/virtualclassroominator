import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  ...tseslint.configs.recommended,
  { plugins: { turbo: turboPlugin } },
  {
    rules: {
      // indent: ["error", 2],
      "@typescript-eslint/no-explicit-any": "off",
      "no-explicit-any": "off",
      "no-unused-vars": "off",
    },
    ignores: ["dist/**"],
  },
];
