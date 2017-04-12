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

let conn;

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
  return Promise.resolve()
    .then(check('SF_LOGIN_URL'))
    .then(check('SF_USERNAME'))
    .then(check('SF_PASSWORD'));
};

const connect = () => {
  conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
    version: sfdc.apiVersion,
  });
  return Promise.resolve();
};

const login = () => {
  const username = process.env.SF_USERNAME;
  const password = process.env.SF_PASSWORD;
  process.stdout.write(`Logging in as ${username}... `);

  return conn.login(username, password).then(logAndResolve).catch(logAndReject);
};

const bundle = () => {
  process.stdout.write('Bundling build assets as static resource... ');

  return new Promise(function(resolve, reject) {
    var output = new streamBuffers.WritableStreamBuffer({
      initialSize: 100 * 1024, // start at 100 kilobytes.
      incrementAmount: 10 * 1024, // grow by 10 kilobytes each time buffer overflows.
    });
    var archive = archiver('zip');
    archive.on('end', () => resolve(output));
    archive.on('error', reject);
    archive.pipe(output);
    return glob('**', { cwd: paths.appBuild, nodir: true })
      .then(files => {
        return Promise.all(
          files.map(name => {
            return fs
              .readFile(path.join(paths.appBuild, name), { encoding: 'utf-8' })
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

const deployBundle = bundle => {
  const prefix = sfdc.prefix;
  const metadata = {
    fullName: prefix,
    contentType: 'application/zip',
    cacheControl: 'Public',
    content: bundle.getContentsAsString('base64'),
  };
  process.stdout.write(`Deploying bundle as ${prefix}.resource... `);

  return conn.metadata
    .upsert('StaticResource', metadata)
    .then(res => res.success ? Promise.resolve(res) : Promise.reject(res))
    .then(logAndResolve)
    .catch(logAndReject);
};

const deployPage = () => {
  const { prefix, apiVersion } = sfdc;
  process.stdout.write(`Deploying ${prefix}.page... `);

  const source = fs.readFileSync(path.join(paths.appBuild, 'visualforce.page'));
  return conn.metadata
    .upsert('ApexPage', {
      fullName: prefix,
      label: prefix,
      description: prefix,
      apiVersion: apiVersion,
      availableInTouch: true,
      confirmationTokenRequired: false,
      content: new Buffer(source).toString('base64'),
    })
    .then(res => res.success ? Promise.resolve(res) : Promise.reject(res))
    .then(logAndResolve)
    .catch(logAndReject);
};

checkEnv()
  .then(connect)
  .then(login)
  .then(bundle)
  .then(deployBundle)
  .then(deployPage)
  .catch(err => {
    console.error(err);
    return Promise.reject(err);
  })
  .then(() => {
    console.log(chalk.green('Completed successfully.'));
  });
