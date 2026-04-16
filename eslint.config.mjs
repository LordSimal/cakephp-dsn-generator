import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import reactCompiler from 'eslint-plugin-react-compiler'
import tseslint from 'typescript-eslint'

const typedConfigFiles = ['**/*.{ts,tsx,mts,cts}']

const typedLintConfigs = tseslint.configs.recommended.map((config) => ({
  ...config,
  files: config.files ?? typedConfigFiles,
}))

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: typedConfigFiles,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...typedLintConfigs,
  reactCompiler.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          semi: false,
          tabWidth: 2,
          singleQuote: true,
          printWidth: 80,
          endOfLine: 'auto',
          arrowParens: 'always',
          plugins: ['prettier-plugin-tailwindcss'],
          tailwindStylesheet: './src/app/globals.css',
        },
        {
          usePrettierrc: false,
        },
      ],
    },
  },
])
