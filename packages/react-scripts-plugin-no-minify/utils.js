'use strict';

const filterPlugins = (config, filter) =>
  config.plugins.filter(p => filter[getFunctionName(p)] !== false);

const getFunctionName = obj => {
  const funcNameRegex = /(function (.{1,})\(|class (.{1,}))/;
  const results = funcNameRegex.exec(obj.constructor.toString());
  return results && results.length > 1 ? /\w+ (\w+)/.exec(results[1])[1] : '';
};

const findCssLoader = config => {
  const rule = findRule(config, '.css');
  const loaders = rule.loader || rule.use;
  return loaders.find(l => l.loader.indexOf('css-loader') > -1);
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

const isEnabled = value => value && value !== 'false';

module.exports = { filterPlugins, findCssLoader, isEnabled };
