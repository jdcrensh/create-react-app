# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

# Forked for Salesforce

This is a fork of `react-scripts`. Along with the base scripts off the official
distribution, this fork includes customizations to for Visualforce page.

## Install

```bash
npm install -g create-react-app
create-react-app my-react-app --scripts-version @jdcrensh/react-scripts
```

## Configure

### Credentials
Copy `.env.example` to `.env` and update your deployment credentials.

### Packaging Options

Update the `sfdc` options in your `package.json`:




## Deploy

The `deploy` script makes it trivial to bundle and deploy your app directly to Salesforce.

### Usage

`yarn build && yarn deploy`

The deploy script will:

1) Bundle the `build` directory and deploy it as a static resource (eg MyReactApp.resource),
2) Create a blank Apex controller (eg MyReactAppController) if one does not exist,
3) Deploy a Visualforce page (eg MyReactApp.page) using the template at `public/visualforce.html`
