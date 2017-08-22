'use strict';

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

const pushRule = (config, rule) => {
  const rules = config.module.rules.find(r => r.oneOf).oneOf;
  const fileRule = rules.pop();
  rules.push(rule);
  rules.push(fileRule);
};

module.exports = { findRule, pushRule };
