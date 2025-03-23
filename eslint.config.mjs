import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import js from "@eslint/js";
import next from "eslint-config-next";

const config = [
  js.configs.recommended,
  ...next.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  prettierConfig,
];

export default config;
