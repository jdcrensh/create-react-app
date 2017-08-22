# SCSS Modules Plugin for Create React App

Enable [SCSS](http://sass-lang.com) in your CRA app.

## Install

```bash
yarn add -D react-scripts-plugin-scss
```

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['scss'],
};
```

## Note on SCSS Modules

This plugin may be used in conjunction with the [`css-modules`](https://www.npmjs.com/package/react-scripts-plugin-css-modules) plugin to support SCSS Modules. For it to work properly, `css-modules` must be listed **before** `scss`, eg: `plugins: ['css-modules', 'scss']`

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
