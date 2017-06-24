"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _grayMatter = require("gray-matter");

var _grayMatter2 = _interopRequireDefault(_grayMatter);

var _pathToUri = require("../_utils/path-to-uri");

var _pathToUri2 = _interopRequireDefault(_pathToUri);

var _urlify = require("../_utils/urlify");

var _urlify2 = _interopRequireDefault(_urlify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use the path of the loader directory to avoid conflicts on the loaderContext
var NS = _fs2.default.realpathSync(__dirname);

var loader = function loader(input) {
  var _this = this;

  var webpackInstance = this;

  loader.getCollection = function () {
    return _this[NS];
  };

  var options = _extends({}, webpackInstance.options.phenomic, _loaderUtils2.default.getOptions(webpackInstance));

  // removed
  if (options.feeds) {
    throw new Error("Phenomic loader `feed` option has been changed since 0.17.0. " + "The changelog was not mentionning this breaking change. " + "Sorry about that. " + "Please visit https://phenomic.io/docs/usage/feeds/ to know how to " + "migrate (spoiler: it's easy). ");
  }

  var context = options.context || webpackInstance.options.context;
  var plugins = options.plugins || require("../loader-preset-markdown").default;

  var relativePath = _path2.default.relative(context, webpackInstance.resourcePath);

  var frontMatter = (0, _grayMatter2.default)(input);
  var pluginsResult = plugins.reduce(function (result, plugin) {
    return plugin({
      frontMatter: frontMatter,
      result: result,
      options: options
    });
  }, {});

  var tmpUrl = (0, _urlify2.default)(pluginsResult.head && pluginsResult.head.route
  // custom route
  ? pluginsResult.head.route
  // default route
  : relativePath);
  tmpUrl = tmpUrl.substring(0, 1) === "/" ? tmpUrl.slice(1) : tmpUrl;

  var url = (0, _urlify2.default)(tmpUrl);
  var resourceUrl = (0, _urlify2.default)(tmpUrl, true);
  var contentHash = _loaderUtils2.default.getHashDigest(input);
  var dataUrl = resourceUrl + "." + contentHash + ".json";

  var metadata = {
    __filename: (0, _pathToUri2.default)(relativePath),
    __url: (0, _pathToUri2.default)("/", url),
    __resourceUrl: (0, _pathToUri2.default)("/", resourceUrl),
    __dataUrl: (0, _pathToUri2.default)("/", dataUrl)
  };

  var result = _extends({}, pluginsResult, metadata);

  webpackInstance.emitFile(dataUrl, JSON.stringify(result));

  if (typeof webpackInstance[NS] !== "function") {
    throw new Error("You are using phenomic loader without the corresponding plugin. " + "This plugin should be added automatically by Phenomic, so if you are " + "facing this issue, you are probably playing with the fire. " + "To get more information, you can reach us on our community chat. " + "https://phenomic.io/");
  }
  webpackInstance[NS](result);

  return "module.exports = " + JSON.stringify((0, _pathToUri2.default)("/", dataUrl));
};

module.exports = loader;