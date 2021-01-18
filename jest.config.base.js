module.exports = {
    // preset: 'ts-jest',

    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest',
    },
    moduleNameMapper: {},
    collectCoverageFrom: [
        'src/**/*.tsx',
        'src/**/*.ts',
        '!**/dist/**',
        '!**/node_modules/**',
        '!**/build/**',
        '!**/stack.ts',
        '!**/cdk.out/**',
        '!**/test/**',
        '!**/node_modules/**',
        '!**/coverage/**',
    ],
    coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
    transformIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
    watchPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
    coverageProvider: 'v8',
    testEnvironment: 'node',
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns: ['/dist/', '/build/'],
    // modulePaths: ['node_modules', '<rootDir>/test/'],
    verbose: true,

    collectCoverage: false,
};

// module.exports = {
//     // preset: 'ts-jest',

//     transform: {
//         '^.+\\.[jt]sx?$': 'ts-jest',
//     },
//     moduleNameMapper: {},
//     collectCoverageFrom: ['**.ts', '**.tsx'],
//     testEnvironment: 'node',
//     watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
//     // modulePaths: ['node_modules', '<rootDir>/test/'],
//     verbose: true,

//     collectCoverage: true,
// };
