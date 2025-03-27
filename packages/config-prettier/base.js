/**
 * @type {import("prettier").Config}
 */
export const config = {
  plugins: ["prettier-plugin-brace-style"],
  braceStyle: "allman",
  semi: true,
  trailingComma: "all",
  tabWidth: 4,
  printWidth: 100,
};
