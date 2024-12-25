import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs
    }
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'eol-last': ['warn', 'always'],  
      'no-multiple-empty-lines': ['error', { 
        'max': 1,
        'maxEOF': 1
      }],
      '@stylistic/js/comma-spacing': ['error', { 'before': false, 'after': true } ],
      'object-curly-spacing': ['warn', 'always'],
      'indent': ['warn', 2],
      'quotes': ['warn', 'single'],
      'semi': ['error', 'never'],
      'no-extra-semi': 'error', 
      'comma-dangle': ['warn', 'never'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  {
    ignores: ['dist/*']
  }
]
