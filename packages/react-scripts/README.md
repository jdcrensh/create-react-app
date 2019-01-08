# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
- [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

## Forked for Salesforce

This is a fork of `react-scripts`. Along with the base scripts off the official
distribution, this includes customizations for Visualforce pages.

### Install

```bash
npm install -g create-react-app
create-react-app my-react-app --scripts-version salesforce-react-scripts
```

### Configure

#### Credentials

Update your deployment credentials in `.env.local`:

- `SF_LOGIN_URL` - Login URL
- `SF_USERNAME` - Username of deploying user
- `SF_PASSWORD` - Password + security token of deploying user

#### Naming of deployed controller, page, static resource

By default, naming is inferred from the name field in `package.json`. For example, if the package's name value is `my-react-app`, the name `MyReactApp` will be used.

These variables may be configured in your app's `.env` file.

- `REACT_APP_SF_PREFIX` - Defaults to the value as described above.
- `REACT_APP_SF_CONTROLLER` - The page's controller name. An empty class will be deployed if it does not already exist. This value is used in `public/visualforce.html` and may be used in your code to reference `@RemoteAction` methods, eg. `window[process.env.REACT_APP_SF_CONTROLLER].myMethod`. Defaults to `${REACT_APP_SF_PREFIX}Controller`
- `REACT_APP_SF_PAGE` - Name of the generated VisualForce page. The page is generated using `public/visualforce.html`. Defaults to the value of `REACT_APP_SF_PREFIX`.
- `REACT_APP_SF_STATIC_RESOURCE` - Name of the static resource containing containing the contents of `/build`. Defaults to `REACT_APP_SF_PREFIX`.

### Deploy

`yarn build && yarn deploy`

The deploy script will:

1. Bundle the `build` directory and deploy it as a static resource (eg MyReactApp.resource),
2. Create a blank Apex controller (eg MyReactAppController) if one does not exist,
3. Deploy a Visualforce page (eg MyReactApp.page) using the template at `public/visualforce.html`

### Service Workers

Service workers, such as the one included in Create React App, are not currently supported.

# Configuration & Plugin Support (unofficial)

This is an unofficial fork that extends Create React App with an interface for plugins and custom config.

If a `cra.config.js` plugin doesn't exist, there's no difference than if you were using the official package.

## Configuration

An ES5 module exported by `cra.config.js` at the app's root is used for configuration. Each property is optional.

| Property  | Type                  | Description                                |
| --------- | --------------------- | ------------------------------------------ |
| [plugins] | <code>array</code>    | plugin references or names. default: `[]`  |
| [apply]   | <code>function</code> | webpack config. default: identity function |
| [babel]   | <code>function</code> | babel config. default: identity function   |

### Example

```js
module.exports = {
  // Load plugins by name and/or by reference. Loading plugins by name is for
  // convenience, eg. `'css-modules'` is the same as `require('react-scripts-plugin-css-modules')`
  plugins: ['no-minify', require('./my-internal-plugin')],

  // Webpack configuration
  apply: (config, { env, paths }) => {
    return config;
  },

  // Babel configuration
  babel: (config, { env, paths }) => {
    return config;
  },
};
```

## Plugins

A plugin is simply an exported custom config _without_ the `plugins` property.

## Available Plugins

- [react-scripts-plugin-babelrc](https://www.npmjs.com/package/react-scripts-plugin-babelrc)
- [react-scripts-plugin-no-hashes](https://www.npmjs.com/package/react-scripts-plugin-no-hashes)
- [react-scripts-plugin-no-minify](https://www.npmjs.com/package/react-scripts-plugin-no-minify)
