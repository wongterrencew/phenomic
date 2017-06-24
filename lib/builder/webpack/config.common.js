"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunkNameBrowser = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _webpack = require("webpack");

var _package = require("../../../package.json");

var _package2 = _interopRequireDefault(_package);

var _webpack2 = require("../../_utils/cache/webpack.js");

var _webpack3 = _interopRequireDefault(_webpack2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var chunkNameBrowser = exports.chunkNameBrowser = "phenomic.browser";

var wrap = JSON.stringify;

exports.default = function (config) {
  var _config$webpackConfig = config.webpackConfig,
      webpackConfig = _config$webpackConfig === undefined ? {} : _config$webpackConfig;


  return _extends({}, webpackConfig, {
    plugins: [].concat(_toConsumableArray(webpackConfig.plugins ? webpackConfig.plugins : []), _toConsumableArray((0, _webpack3.default)(config)), [new _webpack.DefinePlugin({ "process.env": {
        NODE_ENV: wrap(config.production ? "production" : process.env.NODE_ENV),

        PHENOMIC_USER_PATHNAME: wrap(process.env.PHENOMIC_USER_PATHNAME),
        PHENOMIC_USER_URL: wrap(_url2.default.format(config.baseUrl)),
        PHENOMIC_NAME: wrap(_package2.default.name[0].toUpperCase() + _package2.default.name.slice(1)),
        PHENOMIC_VERSION: wrap(_package2.default.version),
        PHENOMIC_HOMEPAGE: wrap(_package2.default.homepage),
        PHENOMIC_REPOSITORY: wrap(_package2.default.repository)
      } })])
  });
};