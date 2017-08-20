# Plugin to disable minification for Create React App

Disable build minification in your CRA app's build output.

## Install

```bash
yarn add -D cra-plugin-no-minify
```

That's it. Your production build will no longer be minified.

## Configuration (dotenv)

* CRA_PLUGIN_NO_MINIFY - Set to `false` to disable this plugin's behavior. Defaults to `true`.

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
* [salesforce-react-scripts](https://www.npmjs.com/package/salesforce-react-scripts)
