'use strict';

const fs = require('fs');
const {
  configPath,
  resolvePluginPath,
  validatePlugins,
} = require('./configure.utils');

class Configure {
  constructor() {
    const config = fs.existsSync(configPath) ? require(configPath) : {};
    this.plugins = this.loadPlugins(config.plugins || []);
  }

  loadPlugins(plugins) {
    validatePlugins(plugins);
    return plugins.map(p => {
      let opts = {};
      if (Array.isArray(p)) {
        opts = p.length > 1 ? p[1] : {};
        p = p[0];
      }
      const plugin = require(resolvePluginPath(p));
      typeof plugin.init === 'function' && plugin.init(opts);
      return plugin;
    });
  }

  webpack(config) {
    return this.plugins.reduce((config, plugin) => {
      if (typeof plugin.webpack === 'function') {
        config = plugin.webpack(config, { paths: require('./paths') });
      }
      return config;
    }, config);
  }

  paths(helpers, paths) {
    return this.plugins.reduce((paths, plugin) => {
      if (typeof plugin.paths === 'function') {
        return plugin.paths(paths, { helpers });
      }
      return paths;
    }, paths);
  }
}

module.exports = new Configure();
