'use strict';

process.env.NODE_ENV = 'production';

require('../config/env');

const chalk = require('chalk');
const Promise = require('promise');
const promisify = require('promisify-node');
const fs = promisify('fs');
const path = require('path');
const jsforce = require('jsforce');
const streamBuffers = require('stream-buffers');
const archiver = require('archiver');
const glob = promisify('glob');
const status = require('node-status');
const paths = require('../config/paths');
const appPkg = require(paths.appPackageJson);

const SF_LOGIN_URL = 'SF_LOGIN_URL';
const SF_USERNAME = 'SF_USERNAME';
const SF_PASSWORD = 'SF_PASSWORD';

const apiVersion = process.env.SF_API_VERSION;

const job = status.addItem('job', { steps: [] });

let started = false;

const pushStep = step => {
  job.steps.push(chalk.bold(step));
  if (!started) {
    console.log();
    started = true;
    status.start({
      interval: 80,
      pattern: '{spinner.cyan} {job.step}',
    });
  }
};

const resolve = res => {
  job.doneStep(true);
  return Promise.resolve(res);
};

const reject = err => {
  job.doneStep(false);
  return Promise.reject(err);
};

const check = v => {
  if (!process.env[v]) {
    return Promise.reject(
      `${v} is not configured. Check ${chalk.bold(chalk.cyan('.env.local'))}`
    );
  }
  return Promise.resolve();
};

const checkEnv = () => {
  return Promise.all([
    check(SF_LOGIN_URL),
    check(SF_USERNAME),
    check(SF_PASSWORD),
  ]);
};

const connect = () => {
  return Promise.resolve(
    new jsforce.Connection({
      loginUrl: process.env[SF_LOGIN_URL],
      version: apiVersion,
    })
  );
};

const login = conn => () => {
  const username = process.env[SF_USERNAME];
  const password = process.env[SF_PASSWORD];
  pushStep(`Logging in as ${username}`);
  return conn
    .login(username, password)
    .then(resolve)
    .catch(reject);
};

const bundle = () => {
  pushStep('Bundling build assets as static resource');
  return new Promise((resolve, reject) => {
    const output = new streamBuffers.WritableStreamBuffer({
      initialSize: 100 * 1024, // start at 100 kilobytes.
      incrementAmount: 10 * 1024, // grow by 10 kilobytes each time buffer overflows.
    });
    const archive = archiver('zip');
    archive.on('end', () => resolve(output));
    archive.on('error', reject);
    archive.pipe(output);
    return glob('**', { cwd: paths.appBuild, nodir: true })
      .then(files => {
        return Promise.all(
          files.map(name => {
            return fs
              .readFile(path.join(paths.appBuild, name))
              .then(source => {
                archive.append(source, { name });
                return Promise.resolve();
              })
              .catch(Promise.reject);
          })
        );
      })
      .catch(reject)
      .then(() => archive.finalize());
  })
    .then(resolve)
    .catch(reject);
};

const description = () => {
  return `Generated by ${appPkg.name} (${appPkg.repository}); DO NOT EDIT`;
};

const deployBundle = conn => bundle => {
  const fullName = process.env.REACT_APP_SF_STATIC_RESOURCE;
  const metadata = {
    fullName,
    description: description(),
    contentType: 'application/zip',
    cacheControl: 'Public',
    content: bundle.getContentsAsString('base64'),
  };
  pushStep(`Deploying bundle as ${fullName}.resource`);

  return conn.metadata
    .upsert('StaticResource', metadata)
    .then(res => (res.success ? resolve(res) : reject(res)));
};

const deployDefaultController = conn => () => {
  const fullName = process.env.REACT_APP_SF_CONTROLLER;
  pushStep(`Checking for ${fullName}`);
  return conn.tooling
    .sobject('ApexClass')
    .findOne({ Name: fullName })
    .then(resolve)
    .then(res => {
      if (res != null) {
        return Promise.resolve();
      }
      pushStep(`Creating ${fullName}`);
      const body = `public with sharing class ${fullName} {}`;
      return conn.tooling
        .sobject('ApexClass')
        .create({ apiVersion, body })
        .then(res => (res.success ? resolve(res) : reject(res)));
    });
};

const deployPage = conn => () => {
  const fullName = process.env.REACT_APP_SF_PAGE;
  pushStep(`Deploying ${fullName}.page`);

  const source = fs.readFileSync(path.join(paths.appBuild, 'visualforce.html'));
  return conn.metadata
    .upsert('ApexPage', {
      fullName: fullName,
      label: fullName,
      description: description(),
      apiVersion,
      availableInTouch: true,
      confirmationTokenRequired: false,
      content: new Buffer(source).toString('base64'),
    })
    .then(res => (res.success ? resolve(res) : reject(res)));
};

Promise.resolve()
  .then(checkEnv)
  .then(connect)
  .then(conn => {
    return Promise.resolve()
      .then(login(conn))
      .then(bundle)
      .then(deployBundle(conn))
      .then(deployDefaultController(conn))
      .then(deployPage(conn));
  })
  .catch(err => {
    status.stop();
    console.log();
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    status.stop();
    console.log();
    console.log(chalk.green('Completed successfully.'));
  });