"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheDir = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require("path");

var _webpack = require("webpack");

var _findCacheDir = require("find-cache-dir");

var _findCacheDir2 = _interopRequireDefault(_findCacheDir);

var _configCommon = require("./config.common.js");

var _configCommon2 = _interopRequireDefault(_configCommon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UglifyJsPlugin = _webpack.optimize.UglifyJsPlugin;

var chunkNameNode = "phenomic.node";
var cacheDir = exports.cacheDir = (0, _findCacheDir2.default)({ name: "phenomic/webpack-node-build" });

var defaultExternals = [
// we could consider node_modules as externals deps
// and so use something like
// /^[A-Za-z0-9-_]/
// to not bundle all deps in the static build (for perf)
// the problem is that if people rely on node_modules for stuff
// like css, this breaks their build.

// Glamor integration
"glamor", "glamor/server",

// Aprodite integration
"aphrodite"];

var sourceMapSupport = require.resolve("source-map-support/register")
// windows support
.replace(/\\/g, "/");

var requireSourceMapSupport = "require('" + sourceMapSupport + "');";

exports.default = function (config) {
  var webpackConfig = (0, _configCommon2.default)(config);

  return _extends({}, webpackConfig, {

    entry: _defineProperty({}, chunkNameNode, (0, _path.join)(config.cwd, config.scriptNode)),

    output: _extends({}, webpackConfig.output, {
      path: cacheDir,
      libraryTarget: "commonjs2",
      filename: (0, _path.basename)(config.scriptNode, ".js") + ".bundle.js"
    }),

    target: "node",

    // externals for package/relative name
    externals: [].concat(_toConsumableArray(webpackConfig.externals || defaultExternals), [

    // keep the loader plugin cache in memory
    "phenomic/lib/loader/index", "phenomic/lib/loader/plugin"]),

    // sourcemaps
    devtool: "#source-map",
    plugins: [].concat(_toConsumableArray(webpackConfig.plugins.filter(function (plugin) {
      return !(plugin instanceof UglifyJsPlugin);
    }) || []), [new _webpack.BannerPlugin({
      banner: requireSourceMapSupport,
      raw: true,
      entryOnly: false
    })])
  });
};