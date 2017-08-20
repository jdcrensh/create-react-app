# Utilities for Create React App plugins

Provides some utility functions to help with writing Create React App plugins.

## Install

```bash
yarn add -D cra-plugin-utils
```

## Webpack Utilities

### `filterPlugins(config, filter)`

Returns a filtered array of plugins.

* config - the webpack config
* filter - an object keyed by plugin names and boolean values. If
           value is `false`, the named plugin will be filtered out.

#### Example

```javascript
const { filterPlugins } = require('cra-plugin-utils');

const webpack = (config, env) => {
  if (env === 'production') {
    config.plugins = filterPlugins(config, {
      UglifyJsPlugin: false,
    });
  }
  return config;
};

module.exports = { webpack };
```

### `findCssLoader(config)`

Locates and returns the css-loader config.

* config - the webpack config

### `findRule(config, ext)`

Locates and returns the rule config that matches `ext`.

* config - the webpack config
* ext - a string representing the rule to match on, eg. `.css`

### `isEnabled(value)`

Returns `false` if string value is "false" or blank, returns `true` otherwise.

* value - string value from `process.env` that may be `true`|`false`
