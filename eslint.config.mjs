import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { next } from "eslint-config-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      // custom rules can go here if needed
    },
  },
];

export default eslintConfig;
