'use strict';

const fs = require('fs');
const {
  configPath,
  resolvePluginPath,
  validatePlugins,
} = require('./configure.utils');

const config = fs.existsSync(configPath) ? require(configPath) : {};
validatePlugins(config.plugins);

const plugins = config.plugins.map(p => {
  let opts = {};
  if (Array.isArray(p)) {
    opts = p.length > 1 ? p[1] : {};
    p = p[0];
  }
  const plugin = require(resolvePluginPath(p));
  if (typeof plugin.init === 'function') {
    plugin.init(opts);
  }
  return plugin;
});

const webpack = config =>
  plugins.reduce(
    (config, plugin) =>
      typeof plugin.webpack === 'function'
        ? plugin.webpack(config, { paths: require('./paths') })
        : config,
    config
  );

const paths = (helpers, paths) =>
  plugins.reduce(
    (paths, plugin) =>
      typeof plugin.paths === 'function'
        ? plugin.paths(paths, { helpers })
        : paths,
    paths
  );

module.exports = { webpack, paths };
