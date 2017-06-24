"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// module.exports is used
// eslint-disable-next-line import/default


var _path = require("path");

var _webpack = require("../../_utils/offline/webpack.js");

var _plugin = require("../../loader/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

var _configCommon = require("./config.common.js");

var _configCommon2 = _interopRequireDefault(_configCommon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var chunkNameBrowser = "phenomic.browser";

exports.default = function (config) {

  var webpackConfig = (0, _configCommon2.default)(config);

  return _extends({}, webpackConfig, {
    plugins: [new _plugin2.default()].concat(_toConsumableArray(webpackConfig.plugins), _toConsumableArray((0, _webpack.offlinePlugin)(config))),

    entry: _extends({}, config.webpackConfig ? config.webpackConfig.entry : {}, _defineProperty({}, chunkNameBrowser, [(0, _path.join)(config.cwd, config.scriptBrowser)].concat(_toConsumableArray((0, _webpack.offlineEntry)(config)))))
  });
};