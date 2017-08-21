# Plugin to disable file hashes for Create React App

Disables file hashes (ie. `main.35dbe941.js`) in your CRA app's build output. 

## Install

```bash
yarn add -D react-scripts-plugin-no-hashes
```

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['no-hashes'],
};
```

## Configuration (dotenv)

* `CRA_PLUGIN_NO_HASHES` - Set to `false` to disable this plugin's behavior. Defaults to `true`.

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
