"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// module.exports is used
// eslint-disable-next-line import/default


exports.default = function (config) {
  // log(JSON.stringify(config, null, 2))

  var makeWebpackConfigModule = (0, _dynamicRequire2.default)((0, _path.join)(config.cwd, config["webpackConfig"]));
  var makeWebpackConfig = typeof makeWebpackConfigModule.default === "function" ? makeWebpackConfigModule.default
  // : makeWebpackConfigModule
  // @todo remove block below and uncomment line above
  : typeof makeWebpackConfigModule === "function" ? makeWebpackConfigModule
  // deprecated
  : makeWebpackConfigModule.makeConfig;

  // deprecated
  if (makeWebpackConfigModule.makeConfig) {
    (0, _log2.default)("Your webpack config should now directly export a function.\n" + "No need to export a makeConfig() function anymore as webpack@2 " + "natively support a function. " + "(makeConfig() is currently deprecated and support will be remove in a " + "futur release). ", "warning");
  }

  if (typeof makeWebpackConfig !== "function") {
    throw new Error("Your webpack config must export a function. " + "This function will be called with a single argument " + "(Phenomic configuration object) and must return a valid webpack config.");
  }

  config.webpackConfig = makeWebpackConfig(config);
  config.webpackConfigBrowser = (0, _configBrowser2.default)(config);
  config.webpackConfigNode = (0, _configNode2.default)(config);

  var destination = (0, _path.join)(config.cwd, config.destination);
  _fsExtra2.default.emptyDirSync(destination);

  process.env.BABEL_ENV = "webpack-" + (process.env.NODE_ENV || "development");

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets) {
      (0, _log2.default)("Copying assets", function () {
        var copyDest = (0, _path.join)(destination, config.assets.route);
        _fsExtra2.default.copySync(config.assets.path, copyDest);
      });
    }

    var webpackPromise = function webpackPromise(webpackConfig) {
      return new Promise(function (resolve, reject) {
        try {
          (0, _webpack2.default)(webpackConfig, _log2.default, resolve);
        } catch (e) {
          reject(e);
        }
      });
    };

    (0, _log2.default)("Building client files", webpackPromise(config.webpackConfigBrowser)).then(function (clientBundleStats) {
      // Sometimes, webpack does not throw an error, but send it in the
      // callback... PRETTY WEIRD RIGHT?
      // https://github.com/webpack/webpack/issues/2217#issuecomment-249364851
      if (clientBundleStats instanceof Error) {
        throw clientBundleStats;
      }
      return (0, _log2.default)("Preparing static build", webpackPromise(config.webpackConfigNode)).then(function () {
        return clientBundleStats;
      });
    }).then(function (clientBundleStats) {
      return (0, _log2.default)("Building static files", function () {
        var staticBuild = (0, _dynamicRequire2.default)((0, _path.join)(config.webpackConfigNode.output.path, config.webpackConfigNode.output.filename));
        // transpilation shit
        // https://github.com/webpack/webpack/issues/4039
        return (typeof staticBuild.default === "function" ? staticBuild.default : staticBuild)(_extends({}, config, {
          collection: _plugin2.default.collection,
          assetsFiles: (0, _sortAssets2.default)(clientBundleStats.toJson().assetsByChunkName)
        }));
      });
    }).then(function (files) {
      return (0, _postBuild2.default)(config, files);
    }).then(function () {
      return config.server && (0, _server2.default)(config);
    }).catch(function (err) {
      (0, _log2.default)(_chalk2.default.red("Build failed"), "error");
      setTimeout(function () {
        throw (0, _errorFormatter2.default)(err);
      }, 1);
    });
  } else if (config.server) {
    (0, _server2.default)(config);
  } else {
    throw new Error(_chalk2.default.red("phenomic: CLI needs --static or --server"));
  }
};

var _path = require("path");

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _log = require("../_utils/log");

var _log2 = _interopRequireDefault(_log);

var _errorFormatter = require("../_utils/error-formatter");

var _errorFormatter2 = _interopRequireDefault(_errorFormatter);

var _plugin = require("../loader/plugin.js");

var _plugin2 = _interopRequireDefault(_plugin);

var _webpack = require("./webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _sortAssets = require("./webpack/sortAssets.js");

var _sortAssets2 = _interopRequireDefault(_sortAssets);

var _server = require("./server.js");

var _server2 = _interopRequireDefault(_server);

var _postBuild = require("./post-build.js");

var _postBuild2 = _interopRequireDefault(_postBuild);

var _configBrowser = require("./webpack/config.browser.js");

var _configBrowser2 = _interopRequireDefault(_configBrowser);

var _configNode = require("./webpack/config.node.js");

var _configNode2 = _interopRequireDefault(_configNode);

var _dynamicRequire = require("./dynamic-require.js");

var _dynamicRequire2 = _interopRequireDefault(_dynamicRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }