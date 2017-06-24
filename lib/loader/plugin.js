"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { RawSource } from "webpack-sources"

// Use the path of the plugin/loader directory to avoid conflicts on the
// loaderContext
var NS = _fs2.default.realpathSync(__dirname);

function PhenomicLoaderWebpackPlugin() {}

// Phenomic collection cache: it avoid to have to re-read content files
// between client and static build!
// We can do without this (eg: emitting a json + read the json later),
// but this will be an issue to consider for big websites.
PhenomicLoaderWebpackPlugin.collection = [];

PhenomicLoaderWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin("compilation", function (compilation /* , params */) {
    compilation.plugin("normal-module-loader", function (loaderContext, module) {
      loaderContext[NS] = function (loaderResult) {
        return module.meta[NS] = loaderResult;
      };
    });

    compilation.plugin("additional-assets", function (callback) {
      var results = compilation.modules.map(function (module) {
        return module && module.meta && module.meta[NS];
      }).filter(function (result) {
        return result && (typeof result === "undefined" ? "undefined" : _typeof(result)) === "object";
      });

      PhenomicLoaderWebpackPlugin.collection = results;
      // const collection = JSON.stringify(results, null, 2)
      // compilation.assets["phenomic.collection.json"] =
      //   new RawSource(collection)

      callback();
    });
  });
};

module.exports = PhenomicLoaderWebpackPlugin;