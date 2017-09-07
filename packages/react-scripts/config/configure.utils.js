'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// path config logic copied from ../paths.js
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

let configPath = resolveApp('cra.config.js');
let appNodeModules = resolveApp('node_modules');

// @remove-on-eject-begin
const ownPackageJson = require('../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();

if (
  !reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1
) {
  const resolveOwn = relativePath =>
    path.resolve(__dirname, '..', relativePath);
  configPath = resolveOwn('template/cra.config.js');
  appNodeModules = resolveOwn('node_modules');
}
// @remove-on-eject-end

const fail = message => {
  console.log(chalk.bold.red(new Error(message).stack));
  process.exit(1);
};

const resolvePluginPath = name => {
  const pluginPath =
    name.indexOf('./') !== 0
      ? path.resolve(appNodeModules, `react-scripts-plugin-${name}`)
      : name;
  if (fs.existsSync(pluginPath)) {
    return pluginPath;
  }
  return;
};

const validatePlugins = plugins => {
  if (!Array.isArray(plugins)) {
    fail(`Property 'plugins' must be an array`);
  }
  plugins.forEach((p, i) => {
    if (Array.isArray(p)) {
      if (p.length) {
        if (typeof p[0] !== 'string') {
          fail(`First element of array at index ${i} must be a string`);
        } else {
          p = p[0];
        }
      } else {
        fail(`Array at index ${i} cannot be empty`);
      }
    }
    if (typeof p !== 'string') {
      fail(`Expected a string or array at index ${i}`);
    }
    if (!resolvePluginPath(p)) {
      fail(`Could not resolve plugin '${p}'`);
    }
  });
};

module.exports = {
  configPath,
  fail,
  resolvePluginPath,
  validatePlugins,
};
