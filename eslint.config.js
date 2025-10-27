import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import ts from '@typescript-eslint/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      'plugin:@typescript-eslint/recommended',
      reactHooks.configs['recommended-latest'],
      'plugin:prettier/recommended'
    ],
    plugins: {
      prettier,
      '@typescript-eslint': ts
    },
    rules: {
      'prettier/prettier': ['error']
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
])
