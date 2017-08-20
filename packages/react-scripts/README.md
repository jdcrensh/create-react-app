# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/jdcrensh/create-react-app/tree/custom).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/jdcrensh/create-react-app/blob/custom/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/jdcrensh/create-react-app/blob/custom/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

## Unofficial Fork

This fork adds support for plugins.

* The naming convension for modules is `cra-plugin-NAME`, scopes are also supported.
* A plugin is a simple module exporting the features that it supports.
* Plugins have some access to Create React App internals through an options object passed to it.
* Plugins are loaded dynamically, provided that they're listed in the app's `dependencies` or `devDependencies`.

### Features

#### Webpack

A Webpack plugin has full control over Create React App's Webpack config.
It will be passed the config object and some options.

`webpack(config, options)`

* `config` - the webpack configuration
* `options.env` - value of `process.env`
* `options.paths` - the exported [paths object](https://github.com/jdcrensh/create-react-app/blob/custom/packages/react-scripts/config/paths.js)

##### Example

`index.js`
```js
'use strict';

const webpack = (config, { env, paths }) => {
  if (env.NODE_ENV === 'production') {
    console.log('building for production');
  } else if (env.NODE_ENV === 'development') {
    console.log('building for local development');
  }
  return config;
};

module.exports = { webpack };
```

## Plugin Listing

* [cra-plugin-css-modules](https://www.npmjs.com/package/cra-plugin-css-modules)
* [cra-plugin-custom](https://www.npmjs.com/package/cra-plugin-custom)
* [cra-plugin-no-hashes](https://www.npmjs.com/package/cra-plugin-no-hashes)
* [cra-plugin-no-minify](https://www.npmjs.com/package/cra-plugin-no-minify)
