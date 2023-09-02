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
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-closing-tag-location': ['error', 'tag-aligned'],
    'react/jsx-first-prop-new-line': ['error', 'always'],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-pascal-case': ['error'],
    'react/jsx-wrap-multilines': ['error', {
      arrow: 'parens-new-line',
      assignment: 'parens-new-line',
      condition: 'parens-new-line',
      declaration: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
      return: 'parens-new-line'
    }],
    'sort-keys': ['error', 'asc', { natural: true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
