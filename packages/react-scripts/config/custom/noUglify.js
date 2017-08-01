'use strict';

const { findLoaderConfig, filterPlugins } = require('./utils');

module.exports = config => {
  const res = Object.assign({}, config);
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.DISABLE_MINIFICATION === 'true'
  ) {
    // remove UglifyJsPlugin
    res.plugins = filterPlugins(res, {
      UglifyJsPlugin: false,
    });
    // disable css minify
    const cssLoader = findLoaderConfig(res, 'css-loader');
    cssLoader.options = Object.assign(cssLoader.options, {
      minimize: false,
    });
  }
  return res;
};
