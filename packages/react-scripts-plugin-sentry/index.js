'use strict';

const path = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const SentryPlugin = require('@sentry/webpack-plugin');

module.exports = {
  apply: (config, { env, paths }) => {
    if (env !== 'production') {
      return config;
    }
    const revisionConfig = process.env.GIT_REVISION_CONFIG
      ? JSON.parse(process.env.GIT_REVISION_CONFIG)
      : undefined;

    const gitRevisionPlugin = new GitRevisionPlugin(revisionConfig);

    const release = (function(type) {
      switch (type) {
        case 'VERSION':
          return gitRevisionPlugin.version();
        case 'COMMITHASH':
          return gitRevisionPlugin.commithash();
        case 'BRANCH':
          return gitRevisionPlugin.branch();
        default:
          this('VERSION');
      }
    })(process.env.SENTRY_RELEASE_TYPE);

    config.plugins = [
      ...config.plugins,
      new SentryPlugin({
        release,
        configFile: path.resolve(paths.appPath, '.sentryclirc'),
        include: path.resolve(paths.appPath, 'build/static/js'),
        urlPrefix: '~/static/js',
      }),
      new GitRevisionPlugin(),
    ];
    return config;
  },
};
