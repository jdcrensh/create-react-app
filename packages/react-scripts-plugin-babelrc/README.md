# Babelrc Plugin for Create React App

Enable `.babelrc` in your CRA app. 

## Install

```bash
yarn add -D react-scripts-plugin-babelrc
```

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['babelrc'],
};
```

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
