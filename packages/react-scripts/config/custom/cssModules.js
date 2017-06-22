'use strict';

module.exports = options => {
  if (process.env.ENABLE_CSS_MODULES === 'true') {
    return Object.assign(
      {
        modules: true,
        localIdentName: '[local]--[hash:base64:5]',
      },
      options
    );
  }
  return options;
};
