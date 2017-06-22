'use strict';

module.exports = config => {
  const customizers = [require('./noFileHash'), require('./webpack')];
  return customizers.reduce((config, plugin) => plugin(config), config);
};
