# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

# Custom fork options (.env)

Variable | Usage
:--- | :---
NODE_PATH | Path relative to the app's root. If set, imported modules may be resolved from this path; eg. `NODE_PATH=src` will let you change something like `import x from '../../components/x'` to `import x from 'components/x'`. Be careful of name clashes with dependencies.
ENABLE_CSS_MODULES | When set to `true`, [CSS Modules](https://github.com/css-modules/css-modules) will be turned on for the app. Defaults to `false`.
DISABLE_FILE_HASH | When set to `true`, hash strings will not be added to filenames (eg. main.35dbe941.js). Defaults to `false`.
DISABLE_MINIFICATION | When set to `true`, built files will not be minified. This can be useful for debugging production builds. Defaults to `false`.
WEBPACK_CUSTOMIZER_PATH | Webpack's configuration may be customized by setting this to the filename of a webpack customizer module relative to the app's root. The module provides the original config which may be modified then returned. The second parameter will be the value of `process.env.NODE_ENV`. Minimal source example: `module.exports = (config, env) => config`
