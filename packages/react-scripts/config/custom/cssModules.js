'use strict';

const { findCssLoader, isEnabled } = require('./utils');

module.exports = config => {
  if (isEnabled(process.env.ENABLE_CSS_MODULES)) {
    const cssLoader = findCssLoader(config);
    cssLoader.options = Object.assign(
      {
        modules: true,
        localIdentName: '[local]--[hash:base64:5]',
      },
      cssLoader.options
    );
  }
  return config;
};
