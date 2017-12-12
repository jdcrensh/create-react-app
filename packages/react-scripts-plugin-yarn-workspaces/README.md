# Yarn Workspaces plugin for Create React App

Use yarn workspaces in your CRA app. 

## Install

```bash
yarn add -D react-scripts-plugin-yarn-workspaces
```

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['yarn-workspaces'],
};
```

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
