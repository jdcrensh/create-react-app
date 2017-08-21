'use strict';

const {
  findCssLoader,
  filterPlugins,
  isEnabled,
} = require('react-scripts-plugin-utils');

module.exports = {
  webpack: (config, { env }) => {
    if (
      env.NODE_ENV === 'production' &&
      isEnabled(env.CRA_PLUGIN_NO_MINIFY || 'true')
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
