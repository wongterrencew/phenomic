"use strict";

var _child_process = require("child_process");

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _bins = require("../_utils/bins.js");

var _package = require("../../package.json");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (nodeVersion, npmVersion, yarnVersion) {
  var requirements = _package2.default.engines;
  nodeVersion = nodeVersion || process.version;

  npmVersion = npmVersion || (0, _child_process.execSync)(_bins.npm + " --version").toString().trim();

  try {
    yarnVersion = yarnVersion !== undefined ? yarnVersion : (0, _child_process.execSync)(_bins.yarn + " --version").toString().trim();
  } catch (e) {
    // nothing, assuming yarn does not exist
  }

  if (!(_semver2.default.satisfies(nodeVersion, requirements.node) && (_semver2.default.satisfies(npmVersion, requirements.npm) || yarnVersion && _semver2.default.satisfies(yarnVersion, requirements.yarn)))) {
    var errorMessage = _chalk2.default.yellow("\n⚠️ " + "Phenomic requires at least " + "node@" + requirements.node + " and " + "npm@" + requirements.npm + " (or yarn@" + requirements.yarn + ")" + "\n\n" + "Your node version is " + nodeVersion + (yarnVersion ? ", " : " and ") + "your npm version is " + npmVersion + (!yarnVersion ? "" : " and " + "your yarn version is " + yarnVersion) + "\n\n" + _chalk2.default.yellow("See 'Setup' instruction in documentation.") + " " + "https://phenomic.io/docs/setup/");

    if (process.env.TESTING) {
      throw new Error(errorMessage);
    }

    console.error(errorMessage);
    process.exit(1);
  }
};