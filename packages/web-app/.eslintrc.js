const baseConfig = require('../../.eslintrc.js');

module.exports = {
  ...baseConfig,
  globals: {
    ...baseConfig.globals,
  },
  ignorePatterns: ['build', '*.config.js', 'node_modules'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  // plugins: ['react', '@typescript-eslint', 'jest'],
  // plugins: ['react', '@typescript-eslint', 'prettier'],
  plugins: [],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    // quotes: [2, 'single', { avoidEscape: true }],
    ...baseConfig.rules,
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/prop-types': 'off',
    'linebreak-style': 'off',
  },
};
