"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = config;
exports.testConfig = testConfig;

var _path = require("path");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _yargs = require("./yargs.js");

var _yargs2 = _interopRequireDefault(_yargs);

var _definitions = require("./definitions.js");

var _definitions2 = _interopRequireDefault(_definitions);

var _minimalValidator = require("./minimal-validator.js");

var _minimalValidator2 = _interopRequireDefault(_minimalValidator);

var _validators = require("./validators.js");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// eslint-disable-next-line import/no-namespace


function config() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$argv = _ref.argv,
      argv = _ref$argv === undefined ? [] : _ref$argv,
      _ref$pkg = _ref.pkg,
      pkg = _ref$pkg === undefined ? {} : _ref$pkg;

  var userJSConfig = pkg.phenomic || {};

  _yargs2.default.strict();

  var defaultAndCLIconfig = _yargs2.default.parse(argv);

  // delete unwanted yargs parameters
  delete defaultAndCLIconfig.$0;
  delete defaultAndCLIconfig._;
  delete defaultAndCLIconfig.help;
  delete defaultAndCLIconfig.version;

  // validate user parameters
  var errors = [].concat(_toConsumableArray((0, _minimalValidator2.default)(userJSConfig, _definitions2.default)));

  var config = _extends({}, defaultAndCLIconfig, userJSConfig, process.env.TESTING && userJSConfig.cwd === undefined && {
    cwd: (0, _path.join)(__dirname, "__tests__")
  });

  // validation/adjustement for each options
  Object.keys(validators).forEach(function (key) {
    // eslint-disable-next-line import/namespace
    validators[key]({
      pkg: pkg,
      config: config,
      definitions: _definitions2.default,
      errors: errors
    });
  });

  if (errors.length > 0) {
    var errorMessage = "\n⚠️ " + "phenomic: " + _chalk2.default.yellow("your config is invalid. Please fix the errors:") + "\n\n" + _chalk2.default.red("- " + errors.join("\n- ")) + "\n\n" + _chalk2.default.yellow("See 'Configuration' section in documentation.") + " " + "https://phenomic.io/docs/usage/configuration/";
    if (process.env.TESTING) {
      throw new Error(errorMessage);
    }
    // else
    console.error(errorMessage);
    process.exit(1);
  }

  return config;
}

function testConfig(cfg) {
  return config({
    pkg: { phenomic: cfg }
  });
}