'use strict';

var paths = require('./paths');
var appPackageJson = require(paths.appPackageJson);

if (!appPackageJson.sfdc) {
  appPackageJson.sfdc = {};
}
if (!appPackageJson.sfdc.prefix) {
  appPackageJson.sfdc.prefix = 'MyReactApp';
}
if (!appPackageJson.sfdc.apiVersion) {
  appPackageJson.sfdc.apiVersion = '37.0';
}

module.exports = appPackageJson.sfdc;
