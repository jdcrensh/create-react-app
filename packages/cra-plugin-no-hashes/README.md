# Plugin to disable file hashes for Create React App

Disables file hashes (ie. `main.35dbe941.js`) in your CRA app's build output. 

## Install

```bash
yarn add -D cra-plugin-no-hashes
```

That's it. Next time you run `react-scripts build`, your build files will not be hashed.

## Configuration (dotenv)

* CRA_PLUGIN_NO_HASHES - Set to `false` to disable this plugin's behavior. Defaults to `true`.

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
* [salesforce-react-scripts](https://www.npmjs.com/package/salesforce-react-scripts)
