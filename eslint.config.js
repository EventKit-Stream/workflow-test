import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
// // @ts-ignore -- no types for this plugin
// import drizzle from "eslint-plugin-drizzle";
import perfectionist from "eslint-plugin-perfectionist";


export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      // drizzle,
      perfectionist
    },
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      // "drizzle/enforce-delete-with-where": [
      //   "error",
      //   { drizzleObjectName: ["db", "ctx.db"] },
      // ],
      // "drizzle/enforce-update-with-where": [
      //   "error",
      //   { drizzleObjectName: ["db", "ctx.db"] },
      // ],
      "perfectionist/sort-imports": ["error", {
        tsconfigRootDir: ".",
      }],
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
        allowImportExportEverywhere: true,
      },
    },
    // Exclude JavaScript config files from TypeScript rules
    ignores: ["*.js", "*.cjs", "*.mjs"],
  },
);
