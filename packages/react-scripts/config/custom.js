'use strict';

const path = require('path');
const paths = require('./paths');

const requirePlugins = () => {
  const pkgJson = require(paths.appPackageJson);
  const deps = Object.keys(
    Object.assign({}, pkgJson.devDependencies, pkgJson.dependencies)
  );
  return deps
    .filter(dep => /^(@.+\/)?cra-plugin-(?!utils).+$/.test(dep))
    .map(p => require(path.resolve(paths.appSrc, '..', 'node_modules', p)));
};

module.exports = config =>
  requirePlugins().reduce((config, plugin) => {
    if (typeof plugin.webpack === 'function') {
      config = plugin.webpack(config, { env: process.env, paths });
    }
    return config;
  }, config);
