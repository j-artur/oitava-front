/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  quoteProps: "consistent",
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cn", "cva"],
  tailwindAttributes: ["class", "containerClass", "labelClass"],
};
