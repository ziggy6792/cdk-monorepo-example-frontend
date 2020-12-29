const baseConfig = require('awesome-tools/eslint.config.js');

module.exports = {
  ...baseConfig,
  globals: {
    ...baseConfig.globals,
    anotherGlobal: true,
  },
};
