"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// module.exports is used
// eslint-disable-next-line import/default


var _webpackSources = require("webpack-sources");

var _enhanceCollection = require("../enhance-collection");

var _enhanceCollection2 = _interopRequireDefault(_enhanceCollection);

var _minify = require("../loader/minify.js");

var _minify2 = _interopRequireDefault(_minify);

var _plugin = require("../loader/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

var _feed = require("./feed");

var _feed2 = _interopRequireDefault(_feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PhenomicLoaderFeedWebpackPlugin(options) {
  this.options = options;
}

PhenomicLoaderFeedWebpackPlugin.prototype.apply = function (compiler) {
  var _this = this;

  compiler.plugin("compilation", function (compilation /* , params */) {
    compilation.plugin("additional-assets", function (callback) {
      if (!_plugin2.default.collection) {
        throw new Error("Missing Phenomic collection in webpack compilation object. " + "This probably means you are playing with fire.");
      }
      var collection = (0, _minify2.default)(_plugin2.default.collection);

      var feeds = _this.options.feeds || [];
      var feedsOptions = _this.options.feedsOptions || {};
      Object.keys(feeds).forEach(function (name) {
        var _feeds$name = feeds[name],
            feedOptions = _feeds$name.feedOptions,
            collectionOptions = _feeds$name.collectionOptions;

        compilation.assets[name] = new _webpackSources.RawSource((0, _feed2.default)({
          feedOptions: _extends({}, feedsOptions, feedOptions),
          destination: name,
          collection: (0, _enhanceCollection2.default)(collection, collectionOptions).map(function (item) {
            var fullItem = _plugin2.default.collection.find(function (fullItem) {
              return item.__url === fullItem.__url;
            });
            return _extends({}, item, {
              // null should not happen, but flow ask for secure code :)
              description: fullItem ? fullItem.body : null
            });
          })
        }));
      });

      callback();
    });
  });
};

module.exports = PhenomicLoaderFeedWebpackPlugin;