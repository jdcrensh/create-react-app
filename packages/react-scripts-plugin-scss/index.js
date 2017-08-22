'use strict';

const clone = require('clone');
const { findRule, pushRule } = require('./utils');

module.exports = {
  apply: config => {
    const scssLoader = {
      loader: require.resolve('sass-loader'),
      options: { outputStyle: 'compressed' },
    };
    const cssRule = findRule(config, '.css');
    const scssRule = clone(cssRule);
    scssRule.test = /\.s[ac]ss$/;
    if (process.env.NODE_ENV === 'production') {
      scssRule.loader.push(scssLoader);
    } else if (process.env.NODE_ENV === 'development') {
      scssRule.use.push(scssLoader);
    }
    pushRule(config, scssRule);
    return config;
  },
};
