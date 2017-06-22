'use strict';

const path = require('path');
const paths = require('../paths');

module.exports = config => {
  if (process.env.WEBPACK_CUSTOMIZER_PATH) {
    const customizerPath = path.resolve(
      paths.appPath,
      process.env.WEBPACK_CUSTOMIZER_PATH
    );
    config = require(customizerPath)(config, process.env.NODE_ENV);
  }
  return config;
};
