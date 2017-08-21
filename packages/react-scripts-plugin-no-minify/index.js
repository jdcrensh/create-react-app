'use strict';

const { filterPlugins, findCssLoader, isEnabled } = require('./utils');

module.exports = {
  apply: config => {
    if (
      process.env.NODE_ENV === 'production' &&
      isEnabled(process.env.CRA_PLUGIN_NO_MINIFY || 'true')
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
  },
};
