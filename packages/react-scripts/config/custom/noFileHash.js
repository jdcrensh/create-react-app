'use strict';

module.exports = config => {
  const res = Object.assign({}, config);
  if (process.env.DISABLE_FILE_HASH === 'true') {
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
    walk(res);
  }
  return res;
};
