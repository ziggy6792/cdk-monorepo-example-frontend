const baseConfig = require('../../.eslintrc.js');

module.exports = {
    ...baseConfig,
    globals: {
        ...baseConfig.globals,
    },
    ignorePatterns: ['build', '*.config.js', 'node_modules', 'src/gql/types/', 'src/generated-types.tsx'],
    extends: ['airbnb-typescript', 'airbnb/hooks', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
    // plugins: ['react', '@typescript-eslint', 'jest'],
    plugins: ['react', '@typescript-eslint', 'prettier'],
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
        ...baseConfig.rules,
        'react/destructuring-assignment': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/prop-types': 'off',
        'linebreak-style': 'off',
    },
};
