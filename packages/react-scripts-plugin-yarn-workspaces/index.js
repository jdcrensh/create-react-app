'use strict';

const getWorkspaces = require('get-yarn-workspaces');

module.exports = {
  apply: (config, paths) => {
    const babel = config.module.rules
      .find(rule => 'oneOf' in rule)
      .oneOf.find(rule => /babel-loader/.test(rule.loader));

    if (!Array.isArray(babel.include)) {
      babel.include = [babel.include];
    }
    babel.include = babel.include.concat(getWorkspaces(paths.appRoot));
    return config;
  },
};
