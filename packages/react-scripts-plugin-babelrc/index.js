'use strict';

const findBabelRule = config => {
  let rules = config.module.rules.find(r => r.oneOf).oneOf;
  return rules.find(
    r => typeof r.loader === 'string' && r.loader.includes('babel-loader')
  );
};

module.exports = {
  apply: config => {
    const babelRule = findBabelRule(config);
    babelRule.options.babelrc = true;
    return config;
  },
};
