/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);
const base = require('../../jest.config.base.js');
const package = require('./package.json');

module.exports = {
    ...base,
    name: package.name,
    displayName: package.name,
    roots: ['<rootDir>/src'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: {
        ...moduleNameMapper,
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/_mocks_/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/../../setup-tests.ts'],

    testEnvironment: 'jsdom',
};
