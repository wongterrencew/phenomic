"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = exports.cwd = undefined;

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _multili = require("multili");

var _multili2 = _interopRequireDefault(_multili);

var _configNode = require("../../builder/webpack/config.node.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizeWinPath = function normalizeWinPath(path) {
  return path.replace(/\\/g, "\\\\");
};

var cwd = exports.cwd = normalizeWinPath(process.cwd());
var cache = normalizeWinPath(_configNode.cacheDir);

var reSep = normalizeWinPath(_path2.default.sep);
var webpackNodeModulesRE = new RegExp("webpack:" + reSep + reSep + "?~", "gm");
var cleanStaticBuildPathRE = new RegExp(cache + reSep, "gm");
var cwdRE = new RegExp(cwd + reSep, "g");
var homeRE = new RegExp(_os2.default.homedir(), "g");

var cleanPaths = function cleanPaths(string) {
  return string
  // normalize windows path
  .replace(/\\+g/, "/")
  // cleanup
  .replace(cleanStaticBuildPathRE, "").replace(webpackNodeModulesRE, "node_modules").replace(cwdRE, "").replace(homeRE, "~");
};

var notDefinedRE = /\s+(.*)( is not defined.*)/gm;
var help = exports.help = _chalk2.default.yellow("\n\n" + "If you are seeing this message during the static build, that means you are" + "probably using an API only available in the browser (such as 'window', " + "'document', 'Element'...). Note that a module can be responsible for this." + "\n" + "In order to prevent this error, you can simply avoid calling the code " + "responsible when the dependency is not available. " + "\n\n" + "Examples:\n" +
/* eslint-disable max-len */
(0, _multili2.default)("\nFor a single API:\n\n  const element = (typeof document !== \"undefined\") ? document.querySelector(\".something\") : null\n\n  if (element) {\n    // do your thing with your element\n  }\n\nFor a module:\n\n  const clipboard = (typeof window !== \"undefined\") ? require(\"clipboard\") : null\n\n  // then later\n\n  if (clipboard) {\n    // do your thing using the module\n  }\n  ")
/* eslint-enable max-len */
);
var enhanceError = function enhanceError(error) {
  if (error.message.match(notDefinedRE) || error.stack.match(notDefinedRE)) {
    error.stack += help;
  }
};

exports.default = function (error) {
  error.message = "\n\n" + _chalk2.default.red(error.message) + "\n";

  // sometimes paths are in message
  // eg: errors thrown by webpack loaders/plugin
  error.message = cleanPaths(error.message);
  error.stack = cleanPaths(error.stack);
  enhanceError(error);

  return error;
};