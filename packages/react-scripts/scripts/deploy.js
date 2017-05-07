'use strict';

require('dotenv').config({ silent: true });

const chalk = require('chalk');
const Promise = require('promise');
const promisify = require('promisify-node');
const fs = promisify('fs');
const path = require('path');
const jsforce = require('jsforce');
const streamBuffers = require('stream-buffers');
const archiver = require('archiver');
const glob = promisify('glob');
const paths = require('../config/paths');
const sfdc = require('../config/sfdc');

const SF_LOGIN_URL = 'SF_LOGIN_URL';
const SF_USERNAME = 'SF_USERNAME';
const SF_PASSWORD = 'SF_PASSWORD';

const logAndResolve = res => {
  console.log(chalk.green('OK'));
  return Promise.resolve(res);
};

const logAndReject = err => {
  console.log(chalk.red('ERROR'));
  return Promise.reject(err);
};

const check = v => {
  if (!process.env[v]) {
    return Promise.reject(`${v} is not configured. Check ${chalk.bold(chalk.cyan('.env'))} file`);
  }
  return Promise.resolve();
};

const checkEnv = () => {
  return Promise.all([check(SF_LOGIN_URL), check(SF_USERNAME), check(SF_PASSWORD)]);
};

const connect = () => {
  return Promise.resolve(
    new jsforce.Connection({
      loginUrl: process.env[SF_LOGIN_URL],
      version: sfdc.apiVersion,
    })
  );
};

const login = conn => () => {
  const username = process.env[SF_USERNAME];
  const password = process.env[SF_PASSWORD];
  process.stdout.write(`Logging in as ${username}... `);

  return conn.login(username, password).then(logAndResolve).catch(logAndReject);
};

const bundle = () => {
  process.stdout.write('Bundling build assets as static resource... ');

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
    .then(logAndResolve)
    .catch(logAndReject);
};

const deployBundle = conn => bundle => {
  const prefix = sfdc.prefix;
  const metadata = {
    fullName: prefix,
    contentType: 'application/zip',
    cacheControl: 'Private',
    content: bundle.getContentsAsString('base64'),
  };
  process.stdout.write(`Deploying bundle as ${prefix}.resource... `);

  return conn.metadata
    .upsert('StaticResource', metadata)
    .then(res => (res.success ? logAndResolve(res) : logAndReject(res)));
};

const deployDefaultController = conn => () => {
  const prefix = sfdc.prefix;
  const apiVersion = sfdc.apiVersion;
  const apexController = `${prefix}Controller`;
  process.stdout.write(`Checking for ${apexController}... `);
  return conn.tooling
    .sobject('ApexClass')
    .findOne({ Name: apexController })
    .then(res => (res == null ? Promise.reject() : logAndResolve()))
    .catch(() => {
      console.log(chalk.yellow('MISSING'));
      process.stdout.write(`Deploying ${apexController}... `);
      const body = `public with sharing class ${apexController} {}`;
      return conn.tooling
        .sobject('ApexClass')
        .create({ apiVersion, body })
        .then(res => (res.success ? logAndResolve(res) : logAndReject(res)));
    });
};

const deployPage = conn => () => {
  const prefix = sfdc.prefix;
  const apiVersion = sfdc.apiVersion;
  process.stdout.write(`Deploying ${prefix}.page... `);

  const source = fs.readFileSync(path.join(paths.appBuild, 'visualforce.html'));
  return conn.metadata
    .upsert('ApexPage', {
      fullName: prefix,
      label: prefix,
      description: prefix,
      apiVersion,
      availableInTouch: true,
      confirmationTokenRequired: false,
      content: new Buffer(source).toString('base64'),
    })
    .then(res => (res.success ? logAndResolve(res) : logAndReject(res)));
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
    console.log();
    console.error(err);
    return Promise.reject(err);
  })
  .then(() => {
    console.log();
    console.log(chalk.green('Completed successfully.'));
  });
