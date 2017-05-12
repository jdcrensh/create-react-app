'use strict';

var _ = require('lodash');
var paths = require('./paths');
var appPackageJson = require(paths.appPackageJson);

if (!appPackageJson.sfdc) {
  appPackageJson.sfdc = {};
}
if (!appPackageJson.sfdc.prefix) {
  appPackageJson.sfdc.prefix = _.capitalize(_.camelCase(appPackageJson.name));
}
if (!appPackageJson.sfdc.apiVersion) {
  appPackageJson.sfdc.apiVersion = '37.0';
}

module.exports = appPackageJson.sfdc;
