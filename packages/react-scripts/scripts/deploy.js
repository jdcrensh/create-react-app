'use strict';

require('dotenv').config({silent: true});

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

const appPackage = require(paths.appPackageJson);

let conn;

const handleSuccess = (res) => {
  console.log(chalk.green('OK'));
  return Promise.resolve(res);
};

const handleError = (err) => {
  console.log(chalk.red('ERROR'));
  console.error(err);
  return Promise.reject(err);
};

const connect = () => {
  conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
    version: appPackage.sfdc.apiVersion,
  });
  return Promise.resolve();
};

const login = () => {
  const username = process.env.SF_USERNAME;
  const password = process.env.SF_PASSWORD;
  process.stdout.write(`Logging in as ${username}... `);

  return conn.login(username, password)
    .then(handleSuccess)
    .catch(handleError);
};

const bundle = () => {
  process.stdout.write('Bundling build assets as static resource... ');

  return new Promise(function (resolve, reject) {
    var output = new streamBuffers.WritableStreamBuffer({
      initialSize: (100 * 1024), // start at 100 kilobytes.
      incrementAmount: (10 * 1024), // grow by 10 kilobytes each time buffer overflows.
    });
    var archive = archiver('zip');
    archive.on('end', () => resolve(output));
    archive.on('error', reject);
    archive.pipe(output);
    return glob('**', { cwd: paths.appBuild, nodir: true })
      .then((files) => {
        return Promise.all(files.map((name) => {
          return fs.readFile(path.join(paths.appBuild, name), { encoding: 'utf-8' })
            .then((source) => {
              archive.append(source, { name });
              return Promise.resolve();
            })
            .catch(Promise.reject);
        }));
      })
      .catch(reject)
      .then(() => {
        archive.finalize();
      });
  }).then(handleSuccess).catch(handleError);
};

const deploy = (bundle) => {
  const apexPrefix = appPackage.sfdc.apexPrefix;
  const metadata = {
    fullName: apexPrefix,
    contentType: 'application/zip',
    cacheControl: 'Public',
    content: bundle.getContentsAsString('base64'),
  };
  process.stdout.write(`Deploying bundle as ${apexPrefix}.resource... `);

  return conn.metadata.upsert('StaticResource', metadata)
    .then((res) => res.success ? Promise.resolve(res) : Promise.reject(res))
    .then(handleSuccess)
    .catch(handleError);
};

connect()
  .then(login)
  .then(bundle)
  .then(deploy)
  .then(() => {
    console.log(chalk.green('Completed successfully.'));
  })
;
