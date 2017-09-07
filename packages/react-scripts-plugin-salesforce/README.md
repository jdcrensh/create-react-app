# Salesforce plugin for Create React App

Develop and deploy apps created with Create React App to Salesforce.

## Install

```bash
yarn add -D react-scripts-plugin-salesforce
```

Add to `cra.config.js`

```js
module.exports = {
  plugins: ['salesforce'],
};
```

## Configuration (dotenv)

### Credentials

Update your deployment credentials in `.env.local` (should be gitignore'd):

* `SF_LOGIN_URL` - Login URL, eg: https://login.salesforce.com or "test" for sandboxes.
* `SF_USERNAME` - Username of deploying user
* `SF_PASSWORD` - Password + security token of deploying user 

## Naming of deployed controller, page, static resource

By default, naming is inferred from the name field in `package.json` when the project is created. For example, if the app's name is `my-react-app`, the name `MyReactApp` will be used.

These variables should be configured in your app's `.env` file.

* `REACT_APP_SF_PREFIX` - Will be set to the app's name when the project is first created, as described above.
* `REACT_APP_SF_CONTROLLER` - The page's controller name. An empty class will be deployed if it does not already exist. This value is used in `public/visualforce.html` and may be used in your application code to reference `@RemoteAction` methods, eg. `window[process.env.REACT_APP_SF_CONTROLLER].getContacts`. Defaults to `${REACT_APP_SF_PREFIX}Controller`
* `REACT_APP_SF_PAGE` - Name of the generated VisualForce page. The page is generated using `public/visualforce.html`. Defaults to the value of `REACT_APP_SF_PREFIX`.
* `REACT_APP_SF_STATIC_RESOURCE` - Name of the static resource containing containing the contents of `/build`. Defaults to the value of `REACT_APP_SF_PREFIX`.

## Deployment

`yarn build && yarn deploy`

The deploy script will:

1) Bundle the `build` directory and deploy it as a static resource (eg MyReactApp.resource),
2) Create a blank Apex controller (eg MyReactAppController) if one does not exist,
3) Deploy a Visualforce page (eg MyReactApp.page) using the template at `public/visualforce.html`

## Service Workers

Service workers, such as the one included in Create React App, are not currently supported.

## Compatability

The official Create React App does not have a supported plugin system.
This plugin is compatable with the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)
