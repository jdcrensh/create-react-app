'use strict';

const { filterPlugins, findCssLoader } = require('./utils');

module.exports = {
  apply: (config, { env }) => {
    if (env === 'production') {
      // remove UglifyJsPlugin
      config = {
        ...config,
        plugins: filterPlugins(config, {
          UglifyJsPlugin: false,
        }),
      };
      // disable css minify
      const cssLoader = findCssLoader(config);
      cssLoader.options = {
        ...cssLoader.options,
        minimize: false,
      };
    }
    return config;
  },
};
