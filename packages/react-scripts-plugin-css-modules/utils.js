'use strict';

const findCssLoader = config => {
  const rule = findRule(config, '.css');
  const loaders = rule.loader || rule.use;
  return loaders.find(
    l => typeof l.loader === 'string' && l.loader.indexOf('css-loader') > -1
  );
};

const findRule = (config, ext) => {
  const _find = rules =>
    rules.find(r => r.test instanceof RegExp && r.test.test(ext));
  const rules = config.module.rules;
  let rule = _find(rules);
  if (!rule) {
    rule = _find(rules.find(r => r.oneOf).oneOf);
  }
  return rule;
};

module.exports = { findCssLoader };
