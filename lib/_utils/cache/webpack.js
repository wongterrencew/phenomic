"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _hardSourceWebpackPlugin = require("hard-source-webpack-plugin");

var _hardSourceWebpackPlugin2 = _interopRequireDefault(_hardSourceWebpackPlugin);

var _nodeObjectHash = require("node-object-hash");

var _nodeObjectHash2 = _interopRequireDefault(_nodeObjectHash);

var _findCacheDir = require("find-cache-dir");

var _findCacheDir2 = _interopRequireDefault(_findCacheDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
  if (!config.cache) {
    return [];
  }

  var cacheDir = (0, _findCacheDir2.default)({
    name: "phenomic/webpack-hard-source-cache/[confighash]/"
  });

  return [new _hardSourceWebpackPlugin2.default({
    cacheDirectory: (0, _path.join)(cacheDir),
    recordsPath: (0, _path.join)(cacheDir, "records.json"),
    configHash: function configHash(config) {
      return new _nodeObjectHash2.default().hash(config);
    },
    environmentPaths: {
      root: config.cwd,
      files: ["package.json", "webpack.config.js"]
    }
  })];
};