'use strict';

module.exports = config => {
  const customizers = [
    require('./noFileHash'),
    require('./noUglify'),
    require('./webpack'),
  ];
  return customizers.reduce((config, plugin) => plugin(config), config);
};
