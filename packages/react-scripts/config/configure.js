'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const paths = require('./paths');

const isPlainObject = o => typeof o == 'object' && o.constructor == Object;

const loadPlugins = (plugins = []) => {
  return plugins.map(p => {
    if (isPlainObject(p)) {
      return p;
    } else if (typeof p === 'string') {
      const pluginPath = path.resolve(
        paths.appNodeModules,
        `react-scripts-plugin-${p}`
      );
      if (fs.existsSync(pluginPath)) {
        return require(pluginPath);
      } else {
        console.log(
          chalk.red(`Could not resolve plugin '${p}', has it been installed?\n`)
        );
        process.exit(1);
      }
    }
    console.log(
      chalk.red(`Value found in plugins is invalid: ${JSON.stringify(p)}\n`)
    );
    process.exit(1);
  });
};

const loadConfig = () => {
  if (fs.existsSync(paths.configPath)) {
    const conf = require(paths.configPath);
    conf.plugins = loadPlugins(conf.plugins);
    return conf;
  }
  return { plugins: [] };
};

const conf = loadConfig();

const webpack = config =>
  conf.plugins.concat([conf]).reduce((config, plugin) => {
    if (typeof plugin.apply === 'function') {
      config = plugin.apply(config, { env: process.env, paths });
    }
    return config;
  }, config);

module.exports = { webpack };
