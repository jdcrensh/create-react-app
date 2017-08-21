# CSS Modules Plugin for Create React App

Enable [CSS Modules](https://github.com/css-modules/css-modules) in your CRA app. 

## Install

```bash
yarn add -D react-scripts-plugin-css-modules
```

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['css-modules'],
};
```

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
