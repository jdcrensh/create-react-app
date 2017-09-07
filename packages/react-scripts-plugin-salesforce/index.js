'use strict';

module.exports = {
  webpack: config => {
    return config;
  },

  paths: paths => {
    if (process.env.NODE_ENV === 'production') {
      const name = process.env.REACT_APP_SF_STATIC_RESOURCE || 'MyApp';
      paths.servedPath = `{!$Resource.${name}}/`;
    }
    return paths;
  },

  extractTextPluginOptions: () => ({
    publicPath: undefined,
  }),
};
