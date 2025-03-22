/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = {
  plugins: ["prettier-plugin-brace-style"],
  braceStyle: "allman",
  semi: true,
  trailingComma: "all",
  tabWidth: 4,
  printWidth: 100,
};
