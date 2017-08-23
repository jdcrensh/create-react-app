# Example Custom Template for Create React App

This is an example package containing a custom template that will override the default project template when a project is initialized by `create-react-app`.

In your own package, make sure the module name begins with `react-scripts-template-`, like this one does.

## :warning: Compatability

This is **not** a supported feature of the official Create React App. It is, however, supported by the following forks:

* [@jdcrensh/react-scripts](https://www.npmjs.com/package/@jdcrensh/react-scripts)

## Initialization

Initialize with the `--template` flag.

_Sidenote: This is similar to `--internal-testing-template`, except that it takes a package name instead of a filesystem path._

```bash
create-react-app --scripts-version @jdcrensh/react-scripts --template example
```

_Note that the value of `--template` may be the npm package's name without `react-scripts-template-`._

### Using scoped templates

npm [scoped modules](https://docs.npmjs.com/misc/scope) are also supported, by naming or prefixing the module with `@scope/react-scripts-template`, eg. `@scope/react-scripts-template` or `@scope/react-scripts-template-foobar`.

Scoped templates can then be used like:

```bash
```

> Naming convention inspired by [ESLint Sharable Configs](https://eslint.org/docs/developer-guide/shareable-configs).

## Structure

### The `template` directory

A `react-scripts-template-*` package must contain a [`template`](./template) directory, which will be used _instead of_ the [default template directory](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts/template).

### Gitignore

The [`gitignore`](./template/gitignore) file will be renamed to `.gitignore` upon initialization. _This is CRA's standard functionality._

### Dependencies

You can include additional dependencies (or devDependencies) in the initialization by listing them in [`.template.dependencies.json`](./template/.template.dependencies.json). `react` and `react-dom` will always be included. Packages listed here will be copied into `package.json` and installed. The `.template.dependencies.json` file _will not be added_ to the initialized app. _This is CRA's standard functionality._
