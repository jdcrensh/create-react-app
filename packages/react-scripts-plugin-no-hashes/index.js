'use strict';

const { isEnabled } = require('react-scripts-plugin-utils');

module.exports = {
  webpack: (config, { env }) => {
    if (
      env.NODE_ENV === 'production' &&
      isEnabled(env.CRA_PLUGIN_NO_HASHES || 'true')
    ) {
      const walk = obj => {
        const paths = {
          object: k => walk(obj[k]),
          string: k => {
            obj[k] = obj[k].replace(/\[\w*?hash:\d+\]\./, '');
          },
        };
        if (obj != null) {
          Object.keys(obj)
            .filter(k => paths[typeof obj[k]])
            .forEach(k => paths[typeof obj[k]](k));
        }
      };
      walk(config);
    }
    return config;
  },
};
