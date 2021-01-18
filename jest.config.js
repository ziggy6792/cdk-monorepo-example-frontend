/* eslint-disable @typescript-eslint/no-var-requires */

const base = require('./jest.config.base.js');

module.exports = {
    projects: ['<rootDir>/packages/*/jest.config.js'],
};
