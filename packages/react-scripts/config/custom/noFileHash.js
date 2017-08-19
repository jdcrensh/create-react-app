'use strict';

const { isEnabled } = require('./utils');

module.exports = config => {
  if (
    process.env.NODE_ENV === 'production' &&
    isEnabled(process.env.DISABLE_FILE_HASH)
  ) {
    const walk = obj => {
      const paths = {
        object: k => walk(obj[k]),
        string: k => {
          obj[k] = obj[k].replace(/\[\w*?hash:\d+\]\./, '');
        },
      };
      if (obj != null) {
        Object.keys(obj)
          .filter(k => paths[typeof obj[k]])
          .forEach(k => paths[typeof obj[k]](k));
      }
    };
    walk(config);
  }
  return config;
};
