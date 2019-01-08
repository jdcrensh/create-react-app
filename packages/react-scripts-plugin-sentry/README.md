# Integrate sentry.io with Create React App

Integrates sentry.io into the CRA `yarn build` script.

## Install

```bash
yarn add -D react-scripts-plugin-sentry
```

## Configuration

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['sentry'],
};
```

Create a `.sentryclirc` file in project

```ini
[defaults]
org = climate-corporation
project = otc-app
[auth]
token = 5c754cca3cd847b394b3ef48533c74c072eeff07326846709b8c4e0f0bd06941
```

## Release matching

Releases are named as the value of `git describe` by default. To configure this,
you can set `SENTRY_RELEASE_TYPE` in your dotenv to one of: `VERSION` (default),
`COMMITHASH`, `BRANCH` (only if enabled). Variables of the same names are exported
on `process.env`. This is all handled by
[git-revision-webpack-plugin](https://www.npmjs.com/package/git-revision-webpack-plugin),
which you can further customize by setting `GIT_REVISION_CONFIG` in your
dotenv to a JSON blob (see plugin's docs for API), for example:

```
SENTRY_RELEASE_TYPE=VERSION
GIT_REVISION_CONFIG={"lightweightTags": true}
```

For error reports to be matched correctly, make sure your front-end has `raven-js`
configured to use the same value, eg:

```js
import Raven from 'raven-js';

Raven.config('https://xxxxx@sentry.io/12345', {
  release: process.env.VERSION,
}).install();
```

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

- [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
- [salesforce-react-scripts](https://www.npmjs.com/package/salesforce-react-scripts)
