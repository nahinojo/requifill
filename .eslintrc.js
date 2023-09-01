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
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'arrow-body-style': ['error', 'always'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', { minItems: 3 }],
    'implicit-arrow-linebreak': ['error', 'below'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    'sort-keys': ['error', 'asc', { natural: true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
