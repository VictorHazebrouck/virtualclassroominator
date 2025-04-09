/**
 * @type {import("prettier").Config}
 */
export const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-brace-style",
    "prettier-plugin-merge",
  ],
  tailwindStylesheet: "./src/app.css",
  tailwindAttributes: ["className"],
  braceStyle: "allman",
  semi: true,
  trailingComma: "all",
  tabWidth: 4,
  printWidth: 100,
};
