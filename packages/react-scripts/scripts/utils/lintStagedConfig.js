// @remove-file-on-eject
'use strict';

module.exports = {
  '*.js': ['eslint --fix', 'git add'],
  '*.{json,css,scss}': ['prettier --write', 'git add'],
};
