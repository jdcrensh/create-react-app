'use strict';

const loadConfig = require('./loadConfig');
const paths = require('./paths');

const configureWebpack = env => configFactory => {
  const conf = loadConfig();
  return conf.plugins.concat([conf]).reduce((config, plugin) => {
    if (typeof plugin.apply === 'function') {
      config = plugin.apply(config, { env, paths });
    }
    return config;
  }, configFactory(env));
};

module.exports = configureWebpack;
