"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require("babel-polyfill");

var _path = require("path");

var _yargs = require("../configurator/yargs.js");

var _yargs2 = _interopRequireDefault(_yargs);

var _index = require("../configurator/index.js");

var _index2 = _interopRequireDefault(_index);

var _log = require("../_utils/log");

var _log2 = _interopRequireDefault(_log);

var _index3 = require("./commands/setup/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runner = function runner() {
  (0, _log2.default)("Phenomic is starting", "info");
  var cwd = process.cwd();
  var pkg = require((0, _path.join)(cwd, "package.json"));
  var config = (0, _index2.default)({ argv: process.argv, pkg: pkg });

  // lazyload builder to avoid issue when webpack is no installed yet
  // @todo move runner() out of this file so setup can work without
  // lazyloading via "require()"
  var builder = require("../builder/index.js").default;
  builder(config);
};

var startAndBuildOptions = {
  "webpack-config": {
    type: "string",
    describe: "Webpack config (must export a function)",
    default: "webpack.config.js"
  },
  "script-browser": {
    type: "string",
    describe: "Phenomic entry point (browser)",
    default: (0, _path.join)("scripts", "phenomic.browser.js")
  },
  "script-node": {
    type: "string",
    describe: "Phenomic entry point (node)",
    default: (0, _path.join)("scripts", "phenomic.node.js")
  }
};

_yargs2.default.command("setup", "setup a project", {
  test: {
    describe: "Test mode (don't use this option)."
  }
}, _index4.default);

_yargs2.default.command("start", "start your project (server / development mode)", _extends({}, startAndBuildOptions, {
  dev: { default: true },
  server: { default: true },
  open: { default: true }
}), runner);

_yargs2.default.command("build", "build your project (static / production mode)", _extends({}, startAndBuildOptions, {
  production: { default: true },
  static: { default: true }
}), runner);

_yargs2.default.parse(process.argv);