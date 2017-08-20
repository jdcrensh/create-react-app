# Config customizer plugin for Create React App

Make customizations to Create React App's config. This essentially lets you
build your own app-specific `cra-plugin` within your app.

At this time, only webpack configs can be customized.

## Install

```bash
yarn add -D cra-plugin-custom
```

## Configuration (dotenv)

* CRA_PLUGIN_CUSTOM_PATH - Set to the filename of a module relative to the app's root. Defaults to `config.js`.

### Example customizer module

`config.js`
```js
module.exports = {
  webpack: (config, env) => {
    /* ... logic to customize config ... */
    return config;
  },
};
```

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
* [salesforce-react-scripts](https://www.npmjs.com/package/salesforce-react-scripts)
