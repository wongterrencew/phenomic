"use strict";

var _webpackSources = require("webpack-sources");

var _sitemap = require("sitemap");

var _sitemap2 = _interopRequireDefault(_sitemap);

var _enhanceCollection = require("../enhance-collection");

var _enhanceCollection2 = _interopRequireDefault(_enhanceCollection);

var _minify = require("../loader/minify.js");

var _minify2 = _interopRequireDefault(_minify);

var _plugin = require("../loader/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PhenomicLoaderSitemapWebpackPlugin(options) {
  this.options = options;
}
// module.exports is used
// eslint-disable-next-line import/default


PhenomicLoaderSitemapWebpackPlugin.prototype.apply = function (compiler) {
  var _this = this;

  compiler.plugin("compilation", function (compilation /* , params */) {
    compilation.plugin("additional-assets", function (callback) {
      if (!_plugin2.default.collection) {
        throw new Error("Missing Phenomic collection in webpack compilation object. " + "This probably means you are playing with fire.");
      }

      var collection = (0, _minify2.default)(_plugin2.default.collection);

      var _ref = _this.options || {},
          site_url = _ref.site_url,
          collectionOptions = _ref.collectionOptions;

      if (!site_url) {
        throw new Error("Missing `site_url` option in sitemap configuration. ");
      }

      var sitemap = _sitemap2.default.createSitemap({
        hostname: site_url,
        urls: (0, _enhanceCollection2.default)(collection, collectionOptions).map(function (item) {
          return { url: item.__url };
        })
      });

      compilation.assets["sitemap.xml"] = new _webpackSources.RawSource(sitemap.toString());

      callback();
    });
  });
};

module.exports = PhenomicLoaderSitemapWebpackPlugin;