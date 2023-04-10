module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  ignorePatterns: ['dist/**'],
  overrides: [{
    files: ['*.js'],
    parser: 'espree'
  }],
  parserOptions: {
    ecmaVersion: 'latest',
    project: true,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'arrow-body-style': ['error', 'always'],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'implicit-arrow-linebreak': ['error', 'below'],
    indent: ['error', 2],
    'max-len': 'error',
    'sort-keys': ['error', 'asc', { natural: true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
