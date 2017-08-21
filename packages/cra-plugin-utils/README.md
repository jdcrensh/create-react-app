# Core utilities for Create React App plugins

This package provides the core functionality for building plugins for Create React App. 

_Note: This plugin system is unsupported by the CRA team and will not work with the official `react-scripts` dependency. Plugins will only work with supporting forks._

## What is a plugin?

* Naming convension for plugin modules is `cra-plugin-NAME` (scoped modules are supported).
* Plugins are loaded via the `plugins` array in `cra.config.js`.
* A plugin is a simple module exporting the feature(s) that it supports.
* Plugins have some access to Create React App internals through an `options` object passed to it. If there's an aspect of the internals that aren't provided, open a PR to request it.

## Install

```bash
yarn add cra-plugin-utils
```

## Features

### Webpack

A Webpack plugin has full control over Create React App's Webpack config.
It will be passed the config object and some options.

#### `webpack(config, options)`

* `config` - the webpack configuration
* `options.env` - value of `process.env`
* `options.paths` - the exported [paths object](https://github.com/jdcrensh/create-react-app/blob/custom/packages/react-scripts/config/paths.js)

#### Example

`cra-plugin-example/index.js`

```js
module.exports = {
  webpack: (config, options) => {
    // ... update config ...
    return config;
  },
};
```

## Exporting Multiple Plugins

Export as an array if your module contains multiple plugins.

```js
module.exports = [
  require('./foo'),
  require('./bar'),
];
```

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
