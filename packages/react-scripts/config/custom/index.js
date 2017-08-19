'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('../paths');

module.exports = config => {
  config = require('./cssModules')(config);
  config = require('./noFileHash')(config);
  config = require('./noUglify')(config);

  if (process.env.WEBPACK_CUSTOMIZER_PATH) {
    const customizerPath = path.resolve(
      paths.appPath,
      process.env.WEBPACK_CUSTOMIZER_PATH
    );
    if (fs.existsSync(customizerPath)) {
      const customizer = require(customizerPath);
      config = customizer(config, process.env.NODE_ENV);
    } else {
      console.warn(`Webpack customizer file does not exist: ${customizerPath}`);
    }
  }
  return config;
};
