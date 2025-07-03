import eslintPluginNext from "eslint-plugin-next";
import tailwindcss from "eslint-plugin-tailwindcss";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Import legacy Next.js config
  ...compat.extends("next/core-web-vitals"),

  // Custom rules using flat config format
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      next: eslintPluginNext,
      tailwindcss,
    },
    rules: {
      // Optional: customize rules
      "tailwindcss/no-custom-classname": "off",
    },
  },
];
