import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
   eslint.configs.recommended,
   {
      files: ['src/**/*.ts'],
      languageOptions: {
         parser: tsparser,
         parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
         },
      },
      plugins: {
         '@typescript-eslint': tseslint,
         prettier: prettierPlugin,
      },
      rules: {
         ...tseslint.configs.recommended.rules,
         'prettier/prettier': 'error',
         'no-undef': 'off',
         '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
         '@typescript-eslint/no-explicit-any': 'warn',
      },
   },
   prettier,
]
