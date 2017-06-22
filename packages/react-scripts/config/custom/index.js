'use strict';

module.exports = config => {
  const customizers = [];
  return customizers.reduce((config, plugin) => plugin(config), config);
};
