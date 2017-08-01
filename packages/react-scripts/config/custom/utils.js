'use strict';

const getFunctionName = obj => {
  const funcNameRegex = /(function (.{1,})\(|class (.{1,}))/;
  const results = funcNameRegex.exec(obj.constructor.toString());
  return results && results.length > 1 ? /\w+ (\w+)/.exec(results[1])[1] : '';
};

const filterPlugins = (config, filter) =>
  config.plugins.filter(p => filter[getFunctionName(p)] !== false);

const findLoaderConfig = (config, name) => {
  let loader = config.module.rules.find(
    rule => (rule.loader || '').indexOf(name) > -1
  );
  if (!loader) {
    // config.module.rules[4].loader[2].options
    config.module.rules.some(rule => {
      if (Array.isArray(rule.loader)) {
        return (loader = rule.loader.find(
          r => (r.loader || '').indexOf(name) > -1
        ));
      }
      return false;
    });
  }
  if (!loader) {
    config.module.rules.some(rule => {
      const loaders = rule.use || [];
      loader = loaders.find(m => (m.loader || '').indexOf(name) > -1);
      return loader;
    });
  }
  return loader;
};

module.exports = {
  getFunctionName,
  filterPlugins,
  findLoaderConfig,
};
