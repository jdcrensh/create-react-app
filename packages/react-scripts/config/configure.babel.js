'use strict';

const loadConfig = require('./loadConfig');
const paths = require('./paths');

const configureBabel = env => config => {
  const conf = loadConfig();
  conf.plugins.concat([conf]).reduce((config, plugin) => {
    if (typeof plugin.babel === 'function') {
      config = plugin.babel(config, { env, paths });
    }
    return config;
  }, config);
};

module.exports = configureBabel;
