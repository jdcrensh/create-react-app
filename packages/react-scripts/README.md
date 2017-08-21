# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/jdcrensh/create-react-app/tree/salesforce).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/jdcrensh/create-react-app/blob/salesforce/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/jdcrensh/create-react-app/blob/salesforce/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

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

Update your deployment credentials in `.env.local`

### Deploy

`yarn build && yarn deploy`

The deploy script will:

1) Bundle the `build` directory and deploy it as a static resource (eg MyReactApp.resource),
2) Create a blank Apex controller (eg MyReactAppController) if one does not exist,
3) Deploy a Visualforce page (eg MyReactApp.page) using the template at `public/visualforce.html`

### Service Workers

Service workers, such as the one included in Create React App, are not currently supported.

## Configuration & Plugin Support (unofficial)

This is an unofficial fork that extends Create React App with an interface for plugins and general configuration.

## Configuration

The ES5 module exported by `cra.config.js` at the app's root is used for configuration. The config module expects the same interface as plugins do with exception to the `plugins` property.

### Example

```js
module.exports = {
  // Load plugins by name and/or by reference. Loading plugins by name is for
  // convenience, eg. `'css-modules'` is the same as `require('react-scripts-plugin-css-modules')`
  plugins: ['css-modules', require('./my-internal-plugin')],

  // Webpack configuration
  apply: (config, options) => {
    return config;
  },
};
```

## Plugin Listing

* [react-scripts-plugin-css-modules](https://www.npmjs.com/package/react-scripts-plugin-css-modules)
* [react-scripts-plugin-no-hashes](https://www.npmjs.com/package/react-scripts-plugin-no-hashes)
* [react-scripts-plugin-no-minify](https://www.npmjs.com/package/react-scripts-plugin-no-minify)
