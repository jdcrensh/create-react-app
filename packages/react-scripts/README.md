# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
- [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

# Configuration & Plugin Support (unofficial)

This is an unofficial fork that extends Create React App with an interface for plugins and custom config.

If a `cra.config.js` plugin doesn't exist, there's no difference than if you were using the official package.

## Configuration

An ES5 module exported by `cra.config.js` at the app's root is used for configuration. Each property is optional.

| Property     | Type                  | Description                                |
| ------------ | --------------------- | ------------------------------------------ |
| [plugins]    | <code>array</code>    | plugin references or names. default: `[]`  |
| [apply]      | <code>function</code> | webpack config. default: identity function |
| [babel]      | <code>function</code> | babel config. default: identity function   |

### Example

```js
module.exports = {
  // Load plugins by name and/or by reference. Loading plugins by name is for
  // convenience, eg. `'css-modules'` is the same as `require('react-scripts-plugin-css-modules')`
  plugins: ['no-minify', require('./my-internal-plugin')],

  // Webpack configuration
  apply: (config, { env, paths }) => {
    return config;
  },
  
  // Babel configuration
  babel: (config, { env, paths }) => {
    return config;
  },
};
```

## Plugins

A plugin is simply an exported custom config _without_ the `plugins` property.

## Available Plugins

* [react-scripts-plugin-babelrc](https://www.npmjs.com/package/react-scripts-plugin-babelrc)
* [react-scripts-plugin-no-hashes](https://www.npmjs.com/package/react-scripts-plugin-no-hashes)
* [react-scripts-plugin-no-minify](https://www.npmjs.com/package/react-scripts-plugin-no-minify)
