'use strict';

const { findCssLoader, filterPlugins, isEnabled } = require('./utils');

module.exports = config => {
  if (
    process.env.NODE_ENV === 'production' &&
    isEnabled(process.env.DISABLE_MINIFICATION)
  ) {
    // remove UglifyJsPlugin
    config.plugins = filterPlugins(config, {
      UglifyJsPlugin: false,
    });
    // disable css minify
    const cssLoader = findCssLoader(config);
    cssLoader.options = Object.assign(cssLoader.options, {
      minimize: false,
    });
  }
  return config;
};
