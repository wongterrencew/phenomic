"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _package = require("../../package.json");

var _definitions = require("./definitions.js");

var _definitions2 = _interopRequireDefault(_definitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as validators from "./validators.js"

_yargs2.default.version(function () {
  return _package.version;
}).help().showHelpOnFail().epilogue("For more information about the configuration, " + "https://phenomic.io/");

Object.keys(_definitions2.default).forEach(function (optName) {
  var option = _definitions2.default[optName];

  // for now all flags are common
  _yargs2.default.global(optName);

  // check type
  // eg: yargs.boolean(someflag) to ensure that the type is correct
  if (option.type && _yargs2.default[option.type]) {
    _yargs2.default[option.type](optName);
  }

  if (option.default) {
    _yargs2.default.default(optName, option.default);
  }

  if (option.description) {
    _yargs2.default.describe(optName, option.description);
  }

  // made by hand for now, we might revisit option this later
  // if (validators[optName]) {
  //   yargs.check(() => {
  //
  //   })
  // }
});

exports.default = _yargs2.default;