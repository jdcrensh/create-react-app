'use strict';

const runAll = require('lint-staged/src/runAll');
const getConfig = require('lint-staged/src/getConfig').getConfig;
const validateConfig = require('lint-staged/src/getConfig').validateConfig;
const printErrors = require('lint-staged/src/printErrors');
const lintStagedConfig = require('./utils/lintStagedConfig');

const config = validateConfig(getConfig(lintStagedConfig));

runAll({}, config).catch(err => {
  printErrors(err);
  process.exit(1);
});
