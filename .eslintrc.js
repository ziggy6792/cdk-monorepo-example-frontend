// eslint-disable-next-line no-undef
module.exports = {
    env: {
        node: true,
    },
    extends: ['airbnb-base', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'prettier'],

    rules: {
        // 'no-console': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-plusplus': 'off',
        'no-nested-ternary': 'off',
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        'no-param-reassign': 'off',
        'func-names': 'off',
        'no-restricted-imports': ['error', { patterns: ['../*', '..'] }],
        'max-len': [
            'error',
            160,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
            },
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-absolute-path': 'off',
    },
};
