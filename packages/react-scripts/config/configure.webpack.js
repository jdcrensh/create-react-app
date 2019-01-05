'use strict';

const loadConfig = require('./loadConfig');
const paths = require('./paths');

const configureWebpack = (config, env) => {
  const conf = loadConfig();
  return conf.plugins.concat([conf]).reduce((config, plugin) => {
    if (typeof plugin.apply === 'function') {
      config = plugin.apply(config, { env, paths });
    }
    return config;
  }, config);
};

module.exports = configureWebpack;
