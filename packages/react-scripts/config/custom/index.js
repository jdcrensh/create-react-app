'use strict';

module.exports = config => {
  const customizers = [require('./noFileHash')];
  return customizers.reduce((config, plugin) => plugin(config), config);
};
