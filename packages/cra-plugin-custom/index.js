'use strict';

const fs = require('fs');
const path = require('path');

const webpack = (config, options) => {
  const customizerPath = path.resolve(
    options.paths.appPath,
    options.env.CRA_PLUGIN_CUSTOM_PATH || 'config.js'
  );
  if (fs.existsSync(customizerPath)) {
    const { webpack } = require(customizerPath);
    config = webpack(config, options);
  } else {
    console.warn(`\nCustomizer module does not exist: ${customizerPath}\n`);
  }
  return config;
};

module.exports = { webpack };
