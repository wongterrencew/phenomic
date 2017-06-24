"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (webpackConfig, log, cb) {
  (0, _webpack2.default)(webpackConfig, function (err, stats) {
    if (err) {
      throw err;
    }

    if (stats.hasErrors()) {
      stats.compilation.errors.forEach(function (item) {
        return log(_chalk2.default.red(item.stack || item));
      });
      throw new Error("webpack build failed with errors");
    }

    if (stats.hasWarnings()) {
      stats.compilation.warnings.forEach(function (item) {
        return log(_chalk2.default.yellow("Warning: %s", item.message));
      });
    }

    cb(stats);
  });
};

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }