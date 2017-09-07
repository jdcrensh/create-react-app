'use strict';

const { findCssLoader } = require('./utils');

module.exports = {
  webpack: config => {
    const cssLoader = findCssLoader(config);
    cssLoader.options = Object.assign(cssLoader.options, {
      modules: true,
      localIdentName: '[local]--[hash:base64:5]',
    });
    return config;
  },
};
