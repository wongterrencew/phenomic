"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config, files) {
  (0, _log2.default)(files.length + " files written", "info");

  var promises = [];

  if (config.CNAME) {
    promises.push(writeFile((0, _path.join)(config.cwd, config.destination, "CNAME"), config.baseUrl.hostname).then(function () {
      return (0, _log2.default)("CNAME created with '" + config.baseUrl.hostname + "'");
    }));
  }

  if (config.nojekyll) {
    promises.push(writeFile((0, _path.join)(config.cwd, config.destination, ".nojekyll"), "").then(function () {
      return (0, _log2.default)(".nojekyll created");
    }));
  }

  return Promise.all(promises).then(function () {
    return (0, _log.plainLog)(_chalk2.default.green("Build successful") + " " + (0, _log.totalElapsedTime)());
  });
};

var _path = require("path");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _pify2 = require("pify");

var _pify3 = _interopRequireDefault(_pify2);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _log = require("../_utils/log");

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _pify = (0, _pify3.default)(_fs2.default),
    writeFile = _pify.writeFile;